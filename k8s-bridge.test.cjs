const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');

const bridgeSource = readFileSync(require.resolve('./k8s-bridge.js'), 'utf8');

function createBridge(pageUrl = 'https://example.test/hkzero/?apiKey=test&wsUrl=wss%3A%2F%2Fexample.test') {
  const elements = new Map();
  const listeners = {};
  const timers = [];
  const menuButtons = [];
  let socket;
  let roll = 0;
  let now = 10000;
  let started = 0;
  let paused = 0;
  let resumed = 0;

  class Element {
    constructor(id = '') {
      this.id = id;
      this.hidden = false;
      this.value = '';
      this.style = {};
      this.listeners = {};
      this.classList = { add() {}, remove() {} };
    }

    set innerHTML(html) {
      for (const [, id] of html.matchAll(/\bid="([^"]+)"/g)) {
        elements.set(id, new Element(id));
      }
    }

    setAttribute() {}
    addEventListener(name, handler) { this.listeners[name] = handler; }
    closest(selectors) { return selectors.split(', ').includes(`#${this.id}`) ? this : null; }
    showModal() { this.open = true; }
    close() { this.open = false; this.listeners.close?.(); }
    get valueAsNumber() { return Number(this.value); }

    click() {
      const event = {
        target: this,
        preventDefault() {},
        stopImmediatePropagation() { this.stopped = true; }
      };
      listeners.click?.(event);
      if (!event.stopped) this.onclick?.();
    }
  }

  class WebSocket {
    static OPEN = 1;
    static CONNECTING = 0;

    constructor() {
      socket = this;
      this.readyState = WebSocket.OPEN;
      this.sent = [];
    }

    send(message) { this.sent.push(JSON.parse(message)); }
  }

  const document = {
    body: { appendChild(element) { elements.set(element.id, element); } },
    createElement() { return new Element(); },
    getElementById(id) { return elements.get(id); },
    querySelector(selector) {
      return selector === '#menu .menu-actions'
        ? { appendChild(button) { menuButtons.push(button); } }
        : null;
    },
    addEventListener(name, handler) { listeners[name] = handler; },
    exitPointerLock() {}
  };
  const window = {
    location: {
      href: pageUrl,
      search: new URL(pageUrl).search,
      assign(href) { this.href = href; }
    },
    addEventListener(name, handler) { listeners[name] = handler; },
    setTimeout(handler) { timers.push(handler); return timers.length; },
    __pauseGameHook() { paused++; },
    __resumeGameHook() { resumed++; }
  };
  const random = Object.create(Math);
  random.random = () => roll;
  const clock = class extends Date { static now() { return now; } };

  runInNewContext(bridgeSource, {
    document, window, WebSocket, Element, Math: random, Date: clock, URL, URLSearchParams,
    localStorage: { getItem() { return null; } },
    console: { info() {}, warn() {}, error() {} },
    alert(message) { throw new Error(message); }
  });
  listeners.DOMContentLoaded();
  socket.onopen();

  const begin = new Element('begin-mission');
  begin.onclick = () => { started++; };
  const retry = new Element('retry');
  retry.onclick = () => { started++; };
  const checks = () => socket.sent.filter(message => message.action === 'talk').length;
  const selectChance = (button, percent) => {
    button.click();
    assert.equal(elements.get('k8s-kill-chance-dialog').open, true);
    const input = elements.get('k8s-kill-chance');
    assert.equal(input.value, '50');
    input.value = String(percent);
    elements.get('k8s-kill-chance-confirm').click();
    assert.equal(elements.get('k8s-kill-chance-dialog').open, false);
    assert.equal(elements.get('k8s-disclaimer-banner').style.display, 'none');
  };
  const completeAndResume = () => {
    socket.onmessage({ data: JSON.stringify({ status: 'COMPLETED' }) });
    elements.get('k8s-resume-btn').click();
  };
  return {
    window, begin, retry, timers, menuButtons, checks, selectChance, completeAndResume,
    setRoll(value) { roll = value; },
    advanceTime(ms) { now += ms; },
    get started() { return started; },
    get paused() { return paused; },
    get resumed() { return resumed; }
  };
}

test('district menu button returns to picker while preserving grader parameters', () => {
  const game = createBridge(
    'https://example.test/hkzero/?apiKey=test&wsUrl=wss%3A%2F%2Fexample.test&map=mong-kok&go=briefing&level=3'
  );
  assert.equal(game.menuButtons.length, 1);
  assert.equal(game.menuButtons[0].textContent, '選擇地區 →');
  game.menuButtons[0].click();
  assert.equal(
    game.window.location.href,
    'https://example.test/hkzero/?apiKey=test&wsUrl=wss%3A%2F%2Fexample.test'
  );
  assert.equal(createBridge().menuButtons.length, 0);
});

test('50% default skips a roll at the boundary and triggers below it', () => {
  const game = createBridge();
  game.selectChance(game.begin, 50);
  assert.equal(game.started, 1);
  game.setRoll(0.5);
  game.window.onMonsterKilled({});
  assert.equal(game.checks(), 0);
  assert.equal(game.paused, 0);
  game.setRoll(0.49);
  game.window.onMonsterKilled({});
  assert.equal(game.checks(), 1);
  assert.equal(game.paused, 1);
});

test('NPC-caused deaths never trigger grading', () => {
  const game = createBridge();
  game.selectChance(game.begin, 100);
  game.setRoll(0);
  game.window.onMonsterKilled({}, { playerKill: false });
  assert.equal(game.checks(), 0);
  assert.equal(game.paused, 0);
  game.window.onMonsterKilled({}, { playerKill: true });
  assert.equal(game.checks(), 1);
});

test('10% skips most kills; active checks never backlog on resume', () => {
  const game = createBridge();
  game.selectChance(game.begin, 10);
  game.setRoll(0.9);
  game.window.onMonsterKilled({});
  assert.equal(game.checks(), 0);
  game.setRoll(0.09);
  game.window.onMonsterKilled({});
  assert.equal(game.checks(), 1);
  for (let kill = 0; kill < 5; kill++) game.window.onMonsterKilled({});
  game.completeAndResume();
  assert.equal(game.checks(), 1);
  assert.equal(game.timers.length, 0);
  assert.equal(game.resumed, 1);
  game.advanceTime(3000);
  game.setRoll(0.9);
  game.window.onMonsterKilled({});
  assert.equal(game.checks(), 1);
});

test('retry resets the choice to 50%; pickups never trigger grading', () => {
  const game = createBridge();
  game.selectChance(game.begin, 10);
  game.selectChance(game.retry, 100);
  assert.equal(game.started, 2);
  game.setRoll(0.99);
  game.window.onMonsterKilled({});
  assert.equal(game.checks(), 1);
  game.completeAndResume();
  game.advanceTime(3000);
  game.window.onItemPickedUp({});
  assert.equal(game.checks(), 1);
});
