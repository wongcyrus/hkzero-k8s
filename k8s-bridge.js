/**
 * ============================================================================
 * k8s-bridge.js: Kubernetes Grader WebSocket Bridge & HUD Controller for HK Zero
 * ============================================================================
 * 
 * [DISCLAIMER & ATTRIBUTION / 版權與免責聲明]
 * This client is an UNOFFICIAL, reverse-engineered educational demonstration
 * developed for Kubernetes grading pedagogy. No official permission was obtained
 * from the creators of Hong Kong Zero (港域時空).
 * 
 * All original game assets, 3D street models, and audiovisual media belong
 * entirely to the creators of Hong Kong Zero (https://hongkongzero.com/).
 * Please see DISCLAIMER.md for full attribution, fair use, and takedown details.
 * ============================================================================
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'k8s-student-portal-state-v1';
  let ws = null;
  let isConnected = false;
  let isChecking = false;
  let lastTriggerTime = 0;

  // Active configuration
  const config = {
    apiKey: '',
    game: 'game01',
    wsUrl: '',
    npc: 'hkzero'
  };

  /**
   * Initialize configuration from URL params or LocalStorage
   */
  function loadConfig() {
    const params = new URLSearchParams(window.location.search);
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
      console.warn('[k8s-bridge] Failed to parse localStorage state', e);
    }

    config.apiKey = params.get('apiKey') || saved.apiKey || '';
    config.game = params.get('game') || saved.game || 'game01';
    config.wsUrl = params.get('wsUrl') || saved.wsUrl || '';
    config.npc = params.get('npc') || 'hkzero';

    console.info('[k8s-bridge] Config resolved:', {
      hasApiKey: Boolean(config.apiKey),
      game: config.game,
      wsUrl: config.wsUrl
    });
  }

  function saveConfig(apiKey, game, wsUrl) {
    config.apiKey = apiKey.trim();
    config.game = game.trim() || 'game01';
    config.wsUrl = wsUrl.trim();

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        apiKey: config.apiKey,
        game: config.game,
        wsUrl: config.wsUrl
      }));
    } catch (e) {
      console.warn('[k8s-bridge] Failed to save to localStorage', e);
    }
  }

  /**
   * WebSocket Connection Management
   */
  function connectWebSocket(onSuccess, onError) {
    if (!config.wsUrl || !config.apiKey) {
      updateHudStatus('offline', 'K8S: NO KEY');
      return;
    }

    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    updateHudStatus('connecting', 'K8S: CONNECTING...');
    try {
      ws = new WebSocket(config.wsUrl);
    } catch (e) {
      console.error('[k8s-bridge] WebSocket constructor error', e);
      updateHudStatus('offline', 'K8S: ERROR');
      onError?.(e);
      return;
    }

    ws.onopen = () => {
      console.info('[k8s-bridge] Connected to WebSocket Gateway');
      isConnected = true;
      updateHudStatus('online', 'K8S: ONLINE');

      // Subscribe to grading session
      const subscribeMsg = {
        action: 'subscribe',
        apiKey: config.apiKey,
        game: config.game
      };
      ws.send(JSON.stringify(subscribeMsg));
      console.info('[k8s-bridge] Sent subscribe message', subscribeMsg);
      onSuccess?.();
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        console.info('[k8s-bridge] Received message from backend:', payload);
        handleBackendMessage(payload);
      } catch (err) {
        console.error('[k8s-bridge] Failed to parse message:', event.data, err);
      }
    };

    ws.onerror = (err) => {
      console.error('[k8s-bridge] WebSocket error:', err);
      updateHudStatus('offline', 'K8S: ERROR');
      onError?.(err);
    };

    ws.onclose = () => {
      console.warn('[k8s-bridge] WebSocket disconnected');
      isConnected = false;
      updateHudStatus('offline', 'K8S: OFFLINE');
    };
  }

  /**
   * Handle incoming messages from AWS SAM backend (k8s-grader-api)
   */
  function handleBackendMessage(msg) {
    const status = msg.status || (msg.statusCode === 200 ? 'COMPLETED' : 'UNKNOWN');
    const message = msg.message || msg.progress_message || msg.body || '';
    const reportUrl = msg.report_url || msg.reportUrl || '';
    const score = msg.score !== undefined ? msg.score : null;

    if (status === 'RUNNING') {
      showRunningState(message || 'Executing automated test suite against Kubernetes cluster...');
    } else if (status === 'COMPLETED') {
      isChecking = false;
      showPassedState({
        title: '✅ Phase Completed',
        message: message || 'All Kubernetes checks passed! Pods deployed and healthy.',
        score,
        reportUrl
      });
    } else if (status === 'FAILED') {
      isChecking = false;
      showFailedState({
        title: '❌ Verification Failed',
        message: message || 'Checks failed. Please review your Kubernetes manifests.',
        reportUrl
      });
    } else if (status === 'ERROR') {
      isChecking = false;
      showFailedState({
        title: '⚠️ Execution Error',
        message: message || 'Failed to communicate with grader service.',
        reportUrl
      });
    }
  }

  /**
   * Send 'talk' action to trigger real-time grading
   */
  function sendTrigger(actionType, details) {
    const now = Date.now();
    if (now - lastTriggerTime < 2500) {
      console.info('[k8s-bridge] Trigger throttled');
      return;
    }
    lastTriggerTime = now;

    if (!config.apiKey || !config.wsUrl) {
      showConfigModal();
      return;
    }

    if (!ws || ws.readyState !== WebSocket.OPEN) {
      connectWebSocket(() => {
        sendTrigger(actionType, details);
      });
      return;
    }

    isChecking = true;
    pauseGame();
    showRunningState(`Triggered by ${actionType}. Connecting to Kubernetes test cluster...`);

    const payload = {
      action: 'talk',
      apiKey: config.apiKey,
      game: config.game,
      npc: config.npc
    };

    console.info('[k8s-bridge] Sending trigger to backend:', payload);
    ws.send(JSON.stringify(payload));
  }

  /**
   * Game Pause & Resume Helpers
   */
  function pauseGame() {
    try {
      document.exitPointerLock?.();
      if (typeof window.__pauseGameHook === 'function') {
        window.__pauseGameHook();
      }
    } catch (e) {
      console.warn('[k8s-bridge] Pause hook error', e);
    }
  }

  function resumeGame() {
    hideOverlay();
    try {
      if (typeof window.__resumeGameHook === 'function') {
        window.__resumeGameHook();
      }
      const canvas = document.getElementById('world') || document.querySelector('canvas');
      canvas?.requestPointerLock?.();
    } catch (e) {
      console.warn('[k8s-bridge] Resume hook error', e);
    }
  }

  /**
   * DOM Elements Injection & Management
   */
  function injectDomElements() {
    // 1. HUD Badge
    const hudBadge = document.createElement('div');
    hudBadge.id = 'k8s-hud-badge';
    hudBadge.innerHTML = `
      <div class="k8s-dot connecting" id="k8s-hud-dot"></div>
      <span id="k8s-hud-text">K8S: CONNECTING...</span>
    `;
    hudBadge.onclick = () => showConfigModal();
    document.body.appendChild(hudBadge);

    // 2. Grader Overlay Modal
    const overlay = document.createElement('div');
    overlay.id = 'k8s-grader-overlay';
    overlay.className = 'hidden';
    overlay.innerHTML = `
      <div class="k8s-card">
        <div class="k8s-header">
          <div class="k8s-tagline"><span class="k8s-red-bar"></span> KUBERNETES AUTOMATED ASSESSMENT</div>
          <h2 class="k8s-title" id="k8s-overlay-title">Task Verification</h2>
          <div class="k8s-subtitle" id="k8s-overlay-subtitle">Phase: Challenge Evaluation</div>
        </div>
        <div class="k8s-body">
          <div class="k8s-status-box" id="k8s-status-container">
            <div class="k8s-spinner" id="k8s-status-spinner"></div>
            <div id="k8s-status-desc">Executing cluster inspection...</div>
          </div>
          <div id="k8s-extra-info" style="font-size: 11px; color: #8ba2af; margin-top: 10px;"></div>
        </div>
        <div class="k8s-actions" id="k8s-overlay-actions">
          <button class="k8s-btn" id="k8s-resume-btn" style="display: none;">Continue Mission →</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // 3. Config Modal
    const configModal = document.createElement('div');
    configModal.id = 'k8s-config-modal';
    configModal.className = 'modal-backdrop';
    configModal.style.display = 'none';
    configModal.style.zIndex = '100000';
    configModal.innerHTML = `
      <div class="modal" style="border: 1px solid #4a6878; background: #0c151df0; padding: 30px; box-shadow: 0 10px 40px #000;">
        <div class="eyebrow" style="color: #a7bcc8; font-size: 10px; letter-spacing: 2px;"><span class="red-line"></span> TERMINAL CONFIGURATION</div>
        <h2 style="font-size: 26px; margin: 16px 0 10px; color: #fff;">戰術評分終端配置</h2>
        <p style="font-size: 12px; color: #9bb0bc; line-height: 1.8;">請設定 Kubernetes Grader API Key 與 WebSocket 閘道位址：</p>
        
        <div style="display: flex; flex-direction: column; gap: 14px; margin: 20px 0;">
          <div>
            <label style="font-size: 10px; color: #869da8; letter-spacing: 1.5px; display: block; margin-bottom: 5px;">STUDENT API KEY</label>
            <input id="k8s-input-apikey" type="text" placeholder="k8s-student-xxxxxxxx"
                   style="width: 100%; padding: 10px; background: #14202a; border: 1px solid #ffffff30; color: #eeeae1; font-family: monospace; font-size: 12px;">
          </div>
          <div>
            <label style="font-size: 10px; color: #869da8; letter-spacing: 1.5px; display: block; margin-bottom: 5px;">GAME / TASK ID</label>
            <input id="k8s-input-game" type="text" value="game01"
                   style="width: 100%; padding: 10px; background: #14202a; border: 1px solid #ffffff30; color: #eeeae1; font-family: monospace; font-size: 12px;">
          </div>
          <div>
            <label style="font-size: 10px; color: #869da8; letter-spacing: 1.5px; display: block; margin-bottom: 5px;">WEBSOCKET GATEWAY URL</label>
            <input id="k8s-input-wsurl" type="text" placeholder="wss://xxxxxxxx.execute-api.us-east-1.amazonaws.com/prod"
                   style="width: 100%; padding: 10px; background: #14202a; border: 1px solid #ffffff30; color: #eeeae1; font-family: monospace; font-size: 12px;">
          </div>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 25px;">
          <button id="k8s-btn-save-config" class="primary" style="flex: 1; justify-content: center; height: 44px;">
            儲存並連接 <span>→</span>
          </button>
          <button id="k8s-btn-cancel-config" class="secondary" style="width: 90px; justify-content: center; height: 44px;">
            關閉
          </button>
        </div>

        <div style="font-size: 10px; color: #768d99; margin-top: 18px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; line-height: 1.6;">
          💖 <strong>致謝原創作者</strong>：由衷感謝 Arthur 及《港域時空》團隊打造出如此震撼的 3D 香港街景遊戲！本系統僅作為 Kubernetes 實作評測之教學複製品（未獲官方授權）。請前往支持正版：<a href="https://hongkongzero.com/" target="_blank" rel="noopener" style="color: #8bbcd8;">hongkongzero.com</a>｜<a href="./DISCLAIMER.md" target="_blank" style="color: #8bbcd8;">詳細致謝與聲明</a>
        </div>
      </div>
    `;
    document.body.appendChild(configModal);

    // 4. Persistent Educational Disclaimer Banner
    const disclaimerBanner = document.createElement('div');
    disclaimerBanner.id = 'k8s-disclaimer-banner';
    disclaimerBanner.innerHTML = `
      <div>
        <span class="disclaimer-tag">教學用複製品 / EDUCATIONAL CLONE</span>
        💖 特別鳴謝原創作者 Arthur 與團隊的卓越創作！本客戶端僅供 Kubernetes 教學研究，請務必支持正版：<a href="https://hongkongzero.com/" target="_blank" rel="noopener">hongkongzero.com</a>｜<a href="./DISCLAIMER.md" target="_blank">致謝與免責聲明</a>
      </div>
      <button class="disclaimer-dismiss" onclick="document.getElementById('k8s-disclaimer-banner').style.display='none'">我知道了 (Dismiss)</button>
    `;
    document.body.appendChild(disclaimerBanner);

    // Event handlers for config modal
    document.getElementById('k8s-btn-save-config').onclick = () => {
      const apiKey = document.getElementById('k8s-input-apikey').value;
      const game = document.getElementById('k8s-input-game').value;
      const wsUrl = document.getElementById('k8s-input-wsurl').value;

      if (!apiKey || !wsUrl) {
        alert('請輸入完整的 API Key 與 WebSocket URL！');
        return;
      }

      saveConfig(apiKey, game, wsUrl);
      hideConfigModal();
      connectWebSocket();
    };

    document.getElementById('k8s-btn-cancel-config').onclick = () => {
      hideConfigModal();
    };

    document.getElementById('k8s-resume-btn').onclick = () => {
      resumeGame();
    };
  }

  function updateHudStatus(state, text) {
    const dot = document.getElementById('k8s-hud-dot');
    const label = document.getElementById('k8s-hud-text');
    if (dot && label) {
      dot.className = `k8s-dot ${state}`;
      label.textContent = text;
    }
  }

  function showConfigModal() {
    loadConfig();
    pauseGame();
    const modal = document.getElementById('k8s-config-modal');
    document.getElementById('k8s-input-apikey').value = config.apiKey;
    document.getElementById('k8s-input-game').value = config.game;
    document.getElementById('k8s-input-wsurl').value = config.wsUrl;
    if (modal) modal.style.display = 'grid';
  }

  function hideConfigModal() {
    const modal = document.getElementById('k8s-config-modal');
    if (modal) modal.style.display = 'none';
  }

  function showRunningState(message) {
    const overlay = document.getElementById('k8s-grader-overlay');
    const title = document.getElementById('k8s-overlay-title');
    const subtitle = document.getElementById('k8s-overlay-subtitle');
    const container = document.getElementById('k8s-status-container');
    const spinner = document.getElementById('k8s-status-spinner');
    const desc = document.getElementById('k8s-status-desc');
    const extra = document.getElementById('k8s-extra-info');
    const resumeBtn = document.getElementById('k8s-resume-btn');

    title.textContent = '評估測試執行中...';
    subtitle.textContent = `Target: ${config.game} | Node: ${config.npc}`;
    container.className = 'k8s-status-box running';
    spinner.style.display = 'block';
    desc.textContent = message;
    extra.innerHTML = '';
    resumeBtn.style.display = 'none';

    overlay.classList.remove('hidden');
  }

  function showPassedState({ title, message, score, reportUrl }) {
    const overlay = document.getElementById('k8s-grader-overlay');
    const titleEl = document.getElementById('k8s-overlay-title');
    const subtitle = document.getElementById('k8s-overlay-subtitle');
    const container = document.getElementById('k8s-status-container');
    const spinner = document.getElementById('k8s-status-spinner');
    const desc = document.getElementById('k8s-status-desc');
    const extra = document.getElementById('k8s-extra-info');
    const resumeBtn = document.getElementById('k8s-resume-btn');

    titleEl.textContent = title;
    subtitle.textContent = `Score: ${score !== null ? score : 'Passed'} | Cluster Verified`;
    container.className = 'k8s-status-box passed';
    spinner.style.display = 'none';
    desc.textContent = message;

    if (reportUrl) {
      extra.innerHTML = `<a href="${reportUrl}" target="_blank" style="color: #6ee7b7; text-decoration: underline;">檢視 Pytest 詳細評分報告 ↗</a>`;
    } else {
      extra.innerHTML = '';
    }

    resumeBtn.textContent = '繼續作戰 (Continue) →';
    resumeBtn.className = 'k8s-btn';
    resumeBtn.style.display = 'inline-flex';
    overlay.classList.remove('hidden');
  }

  function showFailedState({ title, message, reportUrl }) {
    const overlay = document.getElementById('k8s-grader-overlay');
    const titleEl = document.getElementById('k8s-overlay-title');
    const subtitle = document.getElementById('k8s-overlay-subtitle');
    const container = document.getElementById('k8s-status-container');
    const spinner = document.getElementById('k8s-status-spinner');
    const desc = document.getElementById('k8s-status-desc');
    const extra = document.getElementById('k8s-extra-info');
    const resumeBtn = document.getElementById('k8s-resume-btn');

    titleEl.textContent = title;
    subtitle.textContent = 'Cluster State Mismatch';
    container.className = 'k8s-status-box failed';
    spinner.style.display = 'none';
    desc.textContent = message;

    if (reportUrl) {
      extra.innerHTML = `<a href="${reportUrl}" target="_blank" style="color: #fca5a5; text-decoration: underline;">檢視錯誤診斷報告 ↗</a>`;
    } else {
      extra.innerHTML = '';
    }

    resumeBtn.textContent = '關閉並調整叢集配置 (Retry)';
    resumeBtn.className = 'k8s-btn secondary';
    resumeBtn.style.display = 'inline-flex';
    overlay.classList.remove('hidden');
  }

  function hideOverlay() {
    const overlay = document.getElementById('k8s-grader-overlay');
    if (overlay) overlay.classList.add('hidden');
  }

  /**
   * Public Hook APIs
   */
  window.triggerK8sTask = function (actionType, details) {
    sendTrigger(actionType, details);
  };

  window.onMonsterKilled = function (enemy) {
    console.info('[k8s-bridge] Monster killed event intercepted:', enemy);
    sendTrigger('kill-thing', enemy);
  };

  window.onItemPickedUp = function (item) {
    console.info('[k8s-bridge] Item picked up event intercepted:', item);
    sendTrigger('pickup-thing', item);
  };

  // Bootstrapping when DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    injectDomElements();
    connectWebSocket();
  });

  // Expose global K8sBridge object
  window.K8sBridge = {
    config,
    connect: connectWebSocket,
    sendTrigger,
    showConfigModal,
    pauseGame,
    resumeGame
  };
})();
