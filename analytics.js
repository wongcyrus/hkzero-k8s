/* Only public game milestones; never send free text or feedback contents. */
(() => {
  'use strict';
  const game = document.currentScript?.dataset.game;
  // Home of each game on each host that serves it; any other host (local previews included) sends nothing.
  // The hosts mirror src/game-hosts.mjs, which this classic script cannot import; src/analytics.test.mjs compares the two.
  // No prototype on either level: a hostname or data-game of `constructor`, `name` and the like must find nothing.
  const homes = {
    __proto__: null,
    'arthurchinai.com': {__proto__: null, 'after-the-jackpot':'/after-the-jackpot/', 'wu-gift':'/wu-gift', 'causewaybay-snow':'/whiteout-hong-kong/'},
    'whiteouthk.com': {__proto__: null, 'causewaybay-snow':'/'},
    'preview.whiteouthk.com': {__proto__: null, 'causewaybay-snow':'/'},
    'hongkongzero.com': {__proto__: null, 'causewaybay-snow':'/'},
    'preview.hongkongzero.com': {__proto__: null, 'causewaybay-snow':'/'}
  };
  const home = homes[location.hostname]?.[game];
  if (typeof home !== 'string') return;
  const allowed = new Set(['briefing_view','game_start_click','game_start','game_resume','game_end','level_start','level_end','lucky_draw','feedback_submit','subscribe_submit','game_ready','game_error','coop_create','coop_join','coop_level_end','map_select','map_picker_view','entry_view','mission_progress','run_retry','run_abandon','load_stage','page_checkpoint','performance_sample','coop_connection','explore_end','game_pause','pvp_connection','pvp_create','pvp_join','pvp_match_start','pvp_match_end','chat_ping','chat_quick','chat_text','coop_revive','coop_medkit_pickup','inapp_detected','inapp_open_click','inapp_arrival','share_click','weapon_switch','account_login_start','account_login','account_login_fail','account_import','account_logout','account_delete','board_view']);
  window.dataLayer = window.dataLayer || [];
  function tag(){window.dataLayer.push(arguments);}
  const page = new URL(home, location.origin);
  const query = new URLSearchParams(location.search);
  const maps = new Set((document.currentScript?.dataset.maps || 'causeway-bay').split(','));
  const mapId = maps.has(query.get('map')) ? query.get('map') : 'causeway-bay';
  const buildId = document.currentScript?.dataset.buildId;
  const build = /^[a-f0-9]{16}$/.test(buildId||'') ? {build_id:buildId} : {};
  for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
    if(query.has(key)) page.searchParams.set(key,query.get(key).slice(0,100));
  }
  let referrer='';
  try {const r=new URL(document.referrer);referrer=r.origin+r.pathname;} catch {}
  tag('js',new Date());
  tag('config','G-B7SGTB86RL',{page_location:page.href,page_referrer:referrer,game_id:game,map:mapId,...build,
    allow_google_signals:false,allow_ad_personalization_signals:false});
  const began=Date.now(),activeLoads=new Map();let screen='loading_runtime',context=()=>({}),checkpointCount=0,hiddenSent=false,pagehideSent=false;
  const intent=query.get('go')==='explore'?'explore':query.get('go')==='briefing'?'mission':null;
  window.GameAnalytics = {setContext(read){if(typeof read==='function')context=read;},track(name,fields={}) {
    try {
      if(!allowed.has(name))return;
      if(name==='load_stage'){if(fields.phase==='started')activeLoads.set(fields.stage,Date.now());else if(fields.phase!=='retry')activeLoads.delete(fields.stage);}
      const screens={entry_view:'menu',map_picker_view:'maps',map_select:'navigating',briefing_view:'briefing',game_ready:'menu',game_start:'playing',game_pause:'paused',game_resume:'playing',level_end:'result',run_abandon:'menu',explore_end:'menu',game_error:'error'};
      if(screens[name])screen=screens[name];
      const currentMap=context()?.map;
      const safe={game_id:game,map:maps.has(currentMap)?currentMap:mapId,...build};
      if(intent&&['load_stage','game_ready'].includes(name))safe.mode=intent;
      // reason vocabulary: webgl_<none|null|lost|other>[_nowasm], context_lost, runtime_<http<status>|network|syntax|eval|fetch>, load_<code>, equipment_<code>, frame_<code> (the render loop's first uncaught exception, once per page; src/frame-loop.mjs); GPU codes: gpu_timeout_compile, gpu_timeout_fence, gpu_failed, gpu_context_lost. Codes come from errorCode in src/hosted-assets.mjs. load_stage phase=retry: a download fetched again (reason = the failed attempt's code) or an old page reloading to the new release (reason=stale). error_at: <rt|en|bt|an>-<line>-<column> of the first frame in our own script, or ex (src/error-site.mjs).
      if(typeof fields.map==='string'&&maps.has(fields.map))safe.map=fields.map;
      for(const key of ['ending','mode','outcome','reason','milestone','stage','phase','end_reason','retry_from','play_mode','weapon','error_at'])if(typeof fields[key]==='string'&&/^[a-z0-9_-]{1,40}$/.test(fields[key]))safe[key]=fields[key];
      if(Number.isInteger(fields.level)&&fields.level>=0&&fields.level<=100)safe.level=fields.level;
      if(Number.isInteger(fields.objective_index)&&fields.objective_index>=1&&fields.objective_index<=10)safe.objective_index=fields.objective_index;
      // Versus: how many of the match's players were bots, and whether the room was a standing one (ANALYTICS.md).
      if(Number.isInteger(fields.bots)&&fields.bots>=0&&fields.bots<=8)safe.bots=fields.bots;
      if(fields.standing===0||fields.standing===1)safe.standing=fields.standing;
      if(typeof fields.duration_seconds==='number'&&Number.isFinite(fields.duration_seconds)&&fields.duration_seconds>=0&&fields.duration_seconds<=86400)safe.duration_seconds=Math.round(fields.duration_seconds*1000)/1000;
      // level_end's score (src/score-rules.mjs): a whole number the game computed; never a board rank, a name or an id.
      if(Number.isInteger(fields.score)&&fields.score>=0&&fields.score<=1000000)safe.score=fields.score;
      tag('event',name,safe);
    } catch {} // Analytics must never interrupt gameplay.
  }};
  function checkpoint(phase){try{
    if(checkpointCount>=40)return;
    if(phase==='visible'){if(!hiddenSent&&!pagehideSent)return;hiddenSent=false;pagehideSent=false;}else if(phase==='pagehide'){if(pagehideSent)return;pagehideSent=true;}else{if(hiddenSent)return;hiddenSent=true;}
    const current=context()||{},load=[...activeLoads.keys()].at(-1),started=load?activeLoads.get(load):began;
    window.GameAnalytics.track('page_checkpoint',{...current,stage:load?'loading_'+load:(current.stage||screen),phase,duration_seconds:(Date.now()-started)/1000,...(!current.mode&&intent?{mode:intent}:{})});checkpointCount++;
  }catch{}}
  document.addEventListener?.('visibilitychange',()=>checkpoint(document.hidden?'hidden':'visible'));
  window.addEventListener?.('pagehide',()=>checkpoint('pagehide'));
  const script=document.createElement('script');script.async=true;
  script.src='https://www.googletagmanager.com/gtag/js?id=G-B7SGTB86RL';
  document.head.appendChild(script);
})();
