/* =============================================
   FINDOM TRACKER - v3 with FAG-TAX
   ============================================= */

const CONFIG = {
  firebase: {
    apiKey: "AIzaSyDMTYQlzwTCgywhiewqAZITyxQxfkTvLM4",
    authDomain: "fido-f4647.firebaseapp.com",
    projectId: "fido-f4647",
    storageBucket: "fido-f4647.firebasestorage.app",
    messagingSenderId: "975545325317",
    appId: "1:975545325317:web:ce9a1fdc7f9080f314c96c"
  },
  passwords: { dom: "dom123" }
};

const CATEGORIES = {
  tribut:   { label: 'TRIBUT',   icon: '🟢', color: '#2ecc71' },
  strafe:   { label: 'STRAFE',   icon: '🔴', color: '#cc0000' },
  training: { label: 'TRAINING', icon: '🟡', color: '#f1c40f' },
  'fag-tax': { label: 'FAG-TAX', icon: '💰', color: '#b44dff' }
};

const TAGLINES = {
  dom: 'WEM GEHÖRT SEIN GELD?',
  sub: 'WEM GEHÖRST DU, LOSER?'
};

const FAG_TAX_MESSAGES = [
  '💰 Nochmal 1€ weniger auf deinem Konto – nur für den Anblick meines Dashboards. Du Loser.',
  '👑 Schon wieder 1€ verbrannt für ein bisschen Augenfutter. Was für ein Würstchen.',
  '💸 1€ weg. Für NICHTS. Außer um mir beim Lachen zuzusehen. Danke, Fag.',
  '🐷 Klingel klingelt: −1€ von deinem Konto. Nur weil du hergeschaut hast. Geiler Fakt, oder?',
  '🔴 Deine Existenz ist teuer: 1€ pro Login. Heute auch schon 1€ ärmer. Guter Junge.',
  '💀 1€. Für diesen Screen. Du bezahlst dafür, dass ich dich ignoriere. Wie armselig.',
  '🎯 Wieder 1€ gezahlt – ohne Gegenleistung. Perfektes Zahlschwein. Weitere 1€ folgen.',
  '🔥 −1€ auf deinem Konto. Plus die nächsten Minuten werden weiter abkassiert. Wie fühlt sich Armut an?',
  '👋 Hallo Fag. Schön dich zu sehen. Schade nur, dass dich dieser Gruß 1€ kostet.',
  '💎 Premium-Loser-Service: Du zahlst 1€ und ich sehe nur dein Geld. Nicht dich.'
];

const DEGRADING = {
  sub: [
    { min: 0,     max: 50,    msg: 'Lächerlich. Ein Wurm wie du sollte sich schämen. Dein Hunger nach Unterwerfung ist größer als dein Portemonnaie.' },
    { min: 50,    max: 200,   msg: 'Du glaubst das reicht? Deine Existenz ist nur durch deine Zahlungen gerechtfertigt. Mehr. IMMER MEHR.' },
    { min: 200,   max: 500,   msg: 'Endlich. Du beginnst zu verstehen, wofür du gemacht bist. Zu zahlen. Zu dienen. Zu gehorchen.' },
    { min: 500,   max: 1000,  msg: 'Dein Geld fließt zu mir. So wie es sein muss. Du bist mein Eigentum und jeder Euro beweist es.' },
    { min: 1000,  max: 2000,  msg: 'Perfektes Loser-Schwein. Deine Konten leeren sich für deinen Herrn. Genau so wie es sich gehört.' },
    { min: 2000,  max: 5000,  msg: 'Du hast deine Seele verkauft – für die Ehre, mir zu dienen. Es gibt kein Zurück. Nur noch ZAHLEN.' },
    { min: 5000,  max: Infinity, msg: 'DEINE SCHULD IST DEINE IDENTITÄT. DU EXISTIERT NUR NOCH, UM MICH ZU BEREICHERN. DEIN GANZES LEBEN IST MEIN EIGENTUM.' }
  ],
  dom: [
    { min: 0,     max: 50,    msg: 'Dieser Wurm traut sich mit Kleingeld an. Zerdrücke ihn, bis er blutet.' },
    { min: 50,    max: 200,   msg: 'Dein Geldsklave lernt langsam. Aber er muss tiefer fallen. Saug ihn aus.' },
    { min: 200,   max: 500,   msg: 'Guter Drain. Dein Schwein gibt dir alles. Und du nimmst. IMMER WEITER.' },
    { min: 500,   max: 1000,  msg: 'Herrlich. Jeder Euro in deiner Tasche ist ein Stück seiner Würde. Pure Unterwerfung.' },
    { min: 1000,  max: 2000,  msg: 'Deine Kontrolle ist absolut. Er arbeitet, du genießt. Er zahlt, du nimmst. Perfekte Balance der Macht.' },
    { min: 2000,  max: 5000,  msg: 'Sein ganzes Einkommen ist deins. Du hast ihn vollkommen gebrochen. Er existiert nur für deine Bereicherung.' },
    { min: 5000,  max: Infinity, msg: 'ER IST DEIN OBJEKT. SEIN GELD, SEIN WILLE, SEIN LEBEN – ALLES GEHÖRT DIR. DU BIST SEIN GOTT.' }
  ]
};

const FAG_CONFIG_DEFAULTS = {
  enabled: true,
  loginsEnabled: true,
  minutesEnabled: true,
  taxEnabled: true,
  counterVisible: true,
  perLogin: 1,
  perMinute: 1,
  taxRate: 0.03,
  taxStartDate: new Date('2026-07-01')
};

// =============================================
// STATE
// =============================================
let currentUser = null;
let payments = [];
let subs = [];
let sessions = [];
let fagTaxes = [];
let unsubscribePayments = null;
let unsubscribeSubs = null;
let unsubscribeSessions = null;
let unsubscribeFagTaxes = null;
let db = null;
let filterSubId = 'all';
let editingSubId = null;
let heartbeatInterval = null;
let liveInterval = null;
let currentSessionId = null;
let currentSessionStart = 0;
let accountChecks = [];
let unsubscribeAccountChecks = null;


// =============================================
// DOM REFS
// =============================================
const $ = id => document.getElementById(id);
const qs = (sel, ctx) => (ctx || document).querySelector(sel);
const qsa = (sel, ctx) => (ctx || document).querySelectorAll(sel);

const viewLogin = $('view-login'), viewDashboard = $('view-dashboard');
const setupMessage = $('setup-message'), dashboardMain = $('dashboard-main');
const loginUsername = $('login-username'), loginUsernameGrp = $('login-username-group');
const loginPassword = $('login-password'), loginBtn = $('login-btn');
const loginError = $('login-error'), taglineEl = $('tagline');
const tabs = qsa('.tab'), logoutBtn = $('logout-btn');
const dashTitle = $('dash-title'), dashSubtitle = $('dash-subtitle');
const dashMessage = $('dash-message'), totalAmount = $('total-amount');
const totalLabel = $('total-label'), domPanel = $('dom-panel');
const paymentsTbody = $('payments-tbody'), emptyState = $('empty-state');
const actionTh = $('action-th'), thSub = $('th-sub');
const paymentForm = $('payment-form'), inputAmount = $('input-amount');
const inputCategory = $('input-category'), inputSub = $('input-sub');
const inputDescription = $('input-description'), inputDate = $('input-date'), formFeedback = $('form-feedback');
const userBadge = $('user-badge'), subForm = $('sub-form');
const subUsername = $('sub-username'), subPassword = $('sub-password');
const subDisplay = $('sub-display'), subFeedback = $('sub-feedback');
const subsList = $('subs-list'), filterSub = $('filter-sub');

// Fag-Tax DOM refs
const fagTaxOverview = $('fagtax-overview');
const loginOverlay = $('login-overlay');
const overlayMsg = $('overlay-msg');
const overlaySub = $('overlay-sub');
const overlayBtn = $('overlay-btn');

// Modal & Toast refs
const modalOverlay = $('modal-overlay');
const modalTitle = $('modal-title');
const modalBody = $('modal-body');
const modalFooter = $('modal-footer');
const modalCloseBtn = $('modal-close-btn');
const toastContainer = $('toast-container');


// =============================================
// FIREBASE INIT
// =============================================
function initFirebase() {
  if (!isFirebaseConfigured()) { showSetupScreen(); return false; }
  try {
    firebase.initializeApp(CONFIG.firebase);
    db = firebase.firestore();
    db.settings({ merge: true });
    return true;
  } catch (e) { return false; }
}

function isFirebaseConfigured() {
  return CONFIG.firebase.apiKey && CONFIG.firebase.apiKey !== 'DEIN_API_KEY'
    && CONFIG.firebase.projectId && CONFIG.firebase.projectId !== 'DEIN_PROJECT_ID';
}

function showSetupScreen() {
  viewLogin.style.display = 'none';
  viewDashboard.style.display = 'flex';
  dashboardMain.style.display = 'none';
  setupMessage.style.display = 'flex';
}

// =============================================
// AUTH
// =============================================
function checkSession() {
  try {
    const raw = localStorage.getItem('findom_session');
    if (!raw) return false;
    const user = JSON.parse(raw);
    if (user && user.role) { currentUser = user; return true; }
  } catch (_) {}
  return false;
}

function saveSession() {
  try { localStorage.setItem('findom_session', JSON.stringify(currentUser)); } catch (_) {}
}

async function loginDom(password) {
  if (CONFIG.passwords.dom !== password) return false;
  currentUser = { username: 'herr', role: 'dom', label: 'HERR', icon: '👑' };
  saveSession();
  return true;
}

async function loginSub(username, password) {
  if (!db) return false;
  try {
    const snap = await db.collection('subs')
      .where('username', '==', username.toLowerCase().trim())
      .where('password', '==', password)
      .where('active', '==', true).get();
    if (snap.empty) return false;
    const d = snap.docs[0], data = d.data();
    currentUser = {
      uid: d.id, username: data.username, password: data.password,
      displayName: data.displayName || data.username,
      role: 'sub', label: 'ZAHL SCHWEIN', icon: '🐷'
    };
    saveSession();
    await closeStaleSessions();
    await startSession();
    return true;
  } catch (e) { return false; }
}

function logout() {
  if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
  if (liveInterval) { clearInterval(liveInterval); liveInterval = null; }
  if (currentSessionId) { closeSessionSync(currentSessionId); currentSessionId = null; currentSessionStart = 0; }
  window.removeEventListener('beforeunload', handleBeforeUnload);
  if (unsubscribePayments) { unsubscribePayments(); unsubscribePayments = null; }
  if (unsubscribeSubs) { unsubscribeSubs(); unsubscribeSubs = null; }
  if (unsubscribeSessions) { unsubscribeSessions(); unsubscribeSessions = null; }
  if (unsubscribeFagTaxes) { unsubscribeFagTaxes(); unsubscribeFagTaxes = null; }
  currentUser = null; payments = []; subs = []; sessions = []; fagTaxes = [];
  try { localStorage.removeItem('findom_session'); } catch (_) {}
  showLoginView();
}

// =============================================
// SESSION TRACKING
// =============================================
async function startSession() {
  if (!db || !currentUser || currentUser.role !== 'sub') return;
  try {
    const ref = await db.collection('sessions').add({
      subId: currentUser.uid,
      username: currentUser.username,
      loginTime: firebase.firestore.FieldValue.serverTimestamp(),
      lastHeartbeat: firebase.firestore.FieldValue.serverTimestamp(),
      logoutTime: null,
      durationMinutes: 0,
      durationSeconds: 0,
      active: true
    });
    currentSessionId = ref.id;
    currentSessionStart = Date.now();
    if (heartbeatInterval) clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(() => heartbeat(), 30000);
    window.addEventListener('beforeunload', handleBeforeUnload);
  } catch (e) { console.error('Session start error:', e); }
}

async function heartbeat() {
  if (!db || !currentSessionId) return;
  try {
    await db.collection('sessions').doc(currentSessionId).update({
      lastHeartbeat: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (_) {}
}

function handleBeforeUnload() {
  if (currentSessionId) {
    closeSessionSync(currentSessionId);
  }
}

async function closeSessionSync(sessionId) {
  if (!db || !sessionId) return;
  try {
    const snap = await db.collection('sessions').doc(sessionId).get();
    if (!snap.exists) return;
    const data = snap.data();
    if (!data.active) return;
    const loginMs = data.loginTime ? data.loginTime.seconds * 1000 : Date.now();
    const nowMs = Date.now();
    const mins = Math.round((nowMs - loginMs) / 60000);
    const secs = Math.round((nowMs - loginMs) / 1000);
    await db.collection('sessions').doc(sessionId).update({
      logoutTime: new Date(),
      durationMinutes: Math.max(1, mins),
      durationSeconds: Math.max(60, secs),
      active: false
    });
  } catch (_) {}
  if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
  if (liveInterval) { clearInterval(liveInterval); liveInterval = null; }
  currentSessionId = null; currentSessionStart = 0;
  window.removeEventListener('beforeunload', handleBeforeUnload);
}

async function closeSession(sessionId) {
  if (!db || !sessionId) return;
  try {
    const snap = await db.collection('sessions').doc(sessionId).get();
    if (!snap.exists) return;
    const data = snap.data();
    if (!data.active) return;
    const loginMs = data.loginTime ? data.loginTime.seconds * 1000 : Date.now();
    const nowMs = Date.now();
    const mins = Math.round((nowMs - loginMs) / 60000);
    const secs = Math.round((nowMs - loginMs) / 1000);
    await db.collection('sessions').doc(sessionId).update({
      logoutTime: firebase.firestore.FieldValue.serverTimestamp(),
      durationMinutes: Math.max(1, mins),
      durationSeconds: Math.max(60, secs),
      active: false
    });
  } catch (e) { console.error('Session close error:', e); }
  if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
  if (liveInterval) { clearInterval(liveInterval); liveInterval = null; }
  currentSessionId = null; currentSessionStart = 0;
  window.removeEventListener('beforeunload', handleBeforeUnload);
}

async function closeStaleSessions() {
  if (!db) return;
  try {
    const snap = await db.collection('sessions')
      .where('subId', '==', currentUser.uid)
      .where('active', '==', true).get();
    const cutoff = Date.now() - 5 * 60 * 1000;
    snap.forEach(doc => {
      const data = doc.data();
      const hb = data.lastHeartbeat ? data.lastHeartbeat.seconds * 1000 : 0;
      if (hb < cutoff) {
        const loginMs = data.loginTime ? data.loginTime.seconds * 1000 : hb;
        const mins = Math.round((cutoff - loginMs) / 60000);
        const secs = Math.round((cutoff - loginMs) / 1000);
        db.collection('sessions').doc(doc.id).update({
          logoutTime: new Date(cutoff),
          durationMinutes: Math.max(1, mins),
          durationSeconds: Math.max(60, secs),
          active: false
        });
      }
    });
  } catch (_) {}
}

function startAllSessionsListener() {
  if (unsubscribeSessions) unsubscribeSessions();
  if (!currentUser || currentUser.role !== 'dom') return;
  const weekStart = getLastFriday();
  const activeSubIds = subs.filter(s => s.active !== false).map(s => s.id);
  if (activeSubIds.length === 0) { sessions = []; renderFagTaxOverview(); return; }

  let loaded = 0;
  sessions = [];
  activeSubIds.forEach(subId => {
    db.collection('sessions')
      .where('subId', '==', subId)
      .get()
      .then(snap => {
        snap.forEach(d => {
          const data = { id: d.id, ...d.data() };
          if (data.loginTime && data.loginTime.seconds && data.loginTime.seconds * 1000 >= weekStart.getTime()) {
            sessions.push(data);
          }
        });
        loaded++;
        if (loaded === activeSubIds.length) renderFagTaxOverview();
      })
      .catch(err => {
        console.warn('AllSessions fetch error:', err.message);
        loaded++;
        if (loaded === activeSubIds.length) renderFagTaxOverview();
      });
  });
}

async function fetchSubSessions(subId) {
  if (!db) return [];
  const weekStart = getLastFriday();
  try {
    const snap = await db.collection('sessions')
      .where('subId', '==', subId)
      .get();
    const results = [];
    snap.forEach(d => {
      const s = { id: d.id, ...d.data() };
      if (s.loginTime && s.loginTime.seconds && s.loginTime.seconds * 1000 >= weekStart.getTime()) {
        results.push(s);
      }
    });
    return results;
  } catch (e) {
    return [];
  }
}

// =============================================
// VIEW MANAGEMENT
// =============================================
function showLoginView() {
  loginError.textContent = ''; loginPassword.value = ''; loginUsername.value = '';
  viewLogin.style.display = 'flex'; viewDashboard.style.display = 'none';
  dashboardMain.style.display = 'flex'; setupMessage.style.display = 'none';
  updateLoginFields();
}

function showDashboardView() {
  viewLogin.style.display = 'none'; viewDashboard.style.display = 'flex';
  dashboardMain.style.display = 'flex'; setupMessage.style.display = 'none';
  renderDashboard();
  startPaymentListener();
  if (currentUser.role === 'dom') {
    startSubsListener();
    startFagTaxesListener();
    startAllSessionsListener();
    startAccountChecksListener();
    setTimeout(() => autoCreateFagTaxes(), 3000);
  }
  if (currentUser.role === 'sub') {
    startFagTaxesListener();
    showLoginMessage();
    renderSubFagTaxView();
  }
}

function updateLoginFields() {
  const role = qs('.tab.active').dataset.role;
  taglineEl.textContent = TAGLINES[role] || TAGLINES.dom;
  loginUsernameGrp.style.display = role === 'sub' ? 'block' : 'none';
}

// =============================================
// LOGIN OVERLAY MESSAGE
// =============================================
function showLoginMessage() {
  const sub = subs.find(s => s.id === currentUser.uid);
  if (!sub) return;
  const cfg = sub.fagTax || {};
  if (cfg.loginsEnabled === false) return;
  const idx = Math.floor(Math.random() * FAG_TAX_MESSAGES.length);
  const cost = (cfg.perLogin || 1).toFixed(2).replace('.', ',');
  overlayMsg.textContent = FAG_TAX_MESSAGES[idx].replace('1€', cost + '€').replace('1€', cost + '€');
  overlaySub.textContent = `−${cost}€ • ${currentUser.displayName || currentUser.username}`;
  loginOverlay.style.display = 'flex';
}

overlayBtn.addEventListener('click', () => {
  loginOverlay.style.display = 'none';
});

// =============================================
// SUBS CRUD
// =============================================
function startSubsListener() {
  if (unsubscribeSubs) unsubscribeSubs();
  unsubscribeSubs = db.collection('subs')
    .onSnapshot(snap => {
      subs = [];
      snap.forEach(doc => {
        const data = doc.data();
        if (!data.fagTax) data.fagTax = { ...FAG_CONFIG_DEFAULTS };
        subs.push({ id: doc.id, ...data });
      });
      subs.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
      renderSubs();
      populateSubSelects();
      renderFagTaxOverview();
      ensureDefaultSub();
    }, err => console.warn('Subs listener error:', err.message));
}

async function ensureDefaultSub() {
  if (subs.length > 0) return;
  try {
    await db.collection('subs').add({
      username: 'c6skinslave', password: 'sub123',
      displayName: 'C6 Skin Slave',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      active: true,
      fagTax: { ...FAG_CONFIG_DEFAULTS }
    });
  } catch (e) { console.error(e); }
}

async function addSub(username, password, displayName) {
  try {
    await db.collection('subs').add({
      username: username.toLowerCase().trim(), password,
      displayName: displayName.trim() || username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      active: true,
      fagTax: { ...FAG_CONFIG_DEFAULTS }
    });
    return true;
  } catch (e) { return false; }
}

async function updateSubPassword(id, pwd) {
  if (!pwd || pwd.length < 3) return false;
  try { await db.collection('subs').doc(id).update({ password: pwd }); return true; } catch (_) { return false; }
}
async function updateSubDisplay(id, name) {
  if (!name || !name.trim()) return false;
  try { await db.collection('subs').doc(id).update({ displayName: name.trim() }); return true; } catch (_) { return false; }
}
async function updateSubUsername(id, username) {
  const clean = username.toLowerCase().trim();
  if (!clean || clean.length < 2) return false;
  if (subs.some(s => s.id !== id && s.active !== false && s.username === clean)) return false;
  try { await db.collection('subs').doc(id).update({ username: clean }); return true; } catch (_) { return false; }
}
async function deleteSub(id) {
  try {
    const cols = ['sessions', 'payments', 'fagTaxes', 'accountChecks'];
    for (const col of cols) {
      const snap = await db.collection(col).where('subId', '==', id).get();
      const del = snap.docs.map(d => d.ref.delete());
      await Promise.all(del);
    }
    await db.collection('subs').doc(id).delete();
    showToast('Sau + alle Daten gelöscht', 'error');
    return true;
  } catch (_) { return false; }
}
async function updateSubFagTax(id, updates) {
  try {
    await db.collection('subs').doc(id).update(
      Object.keys(updates).reduce((acc, k) => {
        acc[`fagTax.${k}`] = updates[k];
        return acc;
      }, {})
    );
    return true;
  } catch (_) { return false; }
}

// =============================================
// FAG-TAX SYSTEM
// =============================================
function startFagTaxesListener() {
  if (unsubscribeFagTaxes) unsubscribeFagTaxes();
  const q = currentUser.role === 'dom'
    ? db.collection('fagTaxes').orderBy('createdAt', 'desc')
    : db.collection('fagTaxes')
        .where('subId', '==', currentUser.uid);
  unsubscribeFagTaxes = q.onSnapshot(snap => {
    fagTaxes = [];
    snap.forEach(d => fagTaxes.push({ id: d.id, ...d.data() }));
    if (currentUser.role !== 'dom') {
      fagTaxes.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    }
    if (currentUser.role === 'dom') {
      renderFagTaxOverview();
    } else {
      renderSubFagTaxView();
    }
  }, err => console.warn('FagTax listener error:', err.message));
}

function getWeekStart() {
  const d = new Date();
  while (d.getDay() !== 5) d.setDate(d.getDate() - 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getLastFriday() {
  const d = new Date();
  const day = d.getDay();
  if (day === 5) {
    d.setDate(d.getDate() - 7);
  } else {
    while (d.getDay() !== 5) d.setDate(d.getDate() - 1);
  }
  d.setHours(0, 0, 0, 0);
  return d;
}

function getSubFagConfig(sub) {
  return sub && sub.fagTax ? { ...FAG_CONFIG_DEFAULTS, ...sub.fagTax } : { ...FAG_CONFIG_DEFAULTS };
}

function countWeeklyLogins(subId, sessions) {
  const weekStart = getLastFriday();
  return sessions.filter(s =>
    s.subId === subId &&
    s.loginTime && s.loginTime.seconds &&
    s.loginTime.seconds * 1000 >= weekStart.getTime()
  ).length;
}

function sumWeeklyMinutes(subId, sessions) {
  const weekStart = getLastFriday();
  return sessions.filter(s =>
    s.subId === subId &&
    s.loginTime && s.loginTime.seconds &&
    s.loginTime.seconds * 1000 >= weekStart.getTime()
  ).reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
}

function sumWeeklySeconds(subId, sessions) {
  const weekStart = getLastFriday();
  return sessions.filter(s =>
    s.subId === subId &&
    s.loginTime && s.loginTime.seconds &&
    s.loginTime.seconds * 1000 >= weekStart.getTime()
  ).reduce((sum, s) => {
    return sum + (s.durationSeconds || s.durationMinutes * 60 || 0);
  }, 0);
}

function getLiveSessionSeconds() {
  if (!currentSessionId) return 0;
  const active = sessions.find(s => s.id === currentSessionId);
  if (active) {
    if (active.active === false) return 0;
    if (!active.loginTime || !active.loginTime.seconds) return 0;
    return Math.round((Date.now() - active.loginTime.seconds * 1000) / 1000);
  }
  if (currentSessionStart > 0) {
    return Math.round((Date.now() - currentSessionStart) / 1000);
  }
  return 0;
}

function calcYearTotalPayments(subId, payments) {
  const start = new Date('2026-07-01').getTime();
  return payments.filter(p => {
    const match = p.subId === subId;
    const ts = p.createdAt ? p.createdAt.seconds * 1000 : 0;
    return match && ts >= start;
  }).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
}

function sumWeeklyChecks(subId, weekStartDate) {
  const weekStart = weekStartDate || getLastFriday();
  return accountChecks
    .filter(c => c.subId === subId && c.createdAt && c.createdAt.seconds && c.createdAt.seconds * 1000 >= weekStart.getTime())
    .reduce((s, c) => s + (c.amount || 0), 0);
}

function startAccountChecksListener() {
  if (unsubscribeAccountChecks) unsubscribeAccountChecks();
  const weekStart = getLastFriday();
  let query = db.collection('accountChecks');
  if (currentUser.role === 'sub') {
    query = query.where('subId', '==', currentUser.uid);
  }
  unsubscribeAccountChecks = query.onSnapshot(snap => {
    accountChecks = [];
    snap.forEach(d => accountChecks.push({ id: d.id, ...d.data() }));
    if (currentUser.role === 'dom') {
      renderFagTaxOverview();
    }
  }, err => {
    console.warn('AccountChecks listener error:', err.message);
  });
}

function getKW(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

function getDueDate(weekStartDate) {
  const d = new Date(weekStartDate);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 7); // Friday = Fälligkeitstag
  return d;
}

function calculateLateInterest(amount, weekStartDate, enabled = false) {
  if (!enabled || !amount || amount <= 0) return 0;
  const now = new Date();
  const due = getDueDate(weekStartDate);
  const msLate = now.getTime() - due.getTime();
  if (msLate < 0) return 0; // still within payment period (Fri 00:00 – Fri 23:59)
  const daysLate = Math.floor(msLate / (24 * 60 * 60 * 1000)); // 0=Fri due, 1=Sat...
  if (daysLate < 1) return 0;
  let total = amount;
  for (let day = 1; day <= daysLate; day++) {
    total += total * (day / 100);
  }
  return Math.round((total - amount) * 100) / 100;
}

function calculateLateInterestDays(weekStartDate) {
  if (!weekStartDate) return 0;
  const due = getDueDate(weekStartDate);
  const msLate = Date.now() - due.getTime();
  if (msLate < 0) return 0;
  const daysLate = Math.floor(msLate / (24 * 60 * 60 * 1000));
  return Math.max(0, daysLate);
}

function generateCheckAmount() {
  return 1 + Math.random() * 2;
}

async function subCheckAccount() {
  if (currentUser.role !== 'sub' || !db) return;
  const amount = generateCheckAmount();
  const rounded = Math.round(amount * 100) / 100;
  try {
    await db.collection('accountChecks').add({
      subId: currentUser.uid,
      amount: rounded,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    const costStr = rounded.toFixed(2).replace('.', ',');

    // Fetch current week data directly (no listener needed)
    const weekStart = getLastFriday();
    const [snapSessions, snapPayments] = await Promise.all([
      db.collection('sessions').where('subId', '==', currentUser.uid).get(),
      db.collection('payments').where('paidBy', '==', currentUser.username).get()
    ]);
    const weekSessions = [];
    snapSessions.forEach(d => {
      const data = d.data();
      if (data.loginTime && data.loginTime.seconds && data.loginTime.seconds * 1000 >= weekStart.getTime()) {
        weekSessions.push(data);
      }
    });
    const logins = weekSessions.length;
    const totalSecs = weekSessions.reduce((sum, s) => sum + (s.durationSeconds || s.durationMinutes * 60 || 0), 0);
    // Add live seconds for current session
    let liveSecs = 0;
    if (currentSessionId) {
      const active = weekSessions.find(s => s.id === currentSessionId);
      if (active && active.loginTime && active.loginTime.seconds && active.active !== false) {
        liveSecs = Math.round((Date.now() - active.loginTime.seconds * 1000) / 1000);
      }
    }
    const totalSeconds = totalSecs + liveSecs;
    const yearTotal = snapPayments.docs.reduce((sum, d) => {
      const ts = d.data().createdAt ? d.data().createdAt.seconds * 1000 : 0;
      if (ts >= new Date('2026-07-01').getTime()) return sum + (parseFloat(d.data().amount) || 0);
      return sum;
    }, 0);

    const sub = subs.find(s => s.id === currentUser.uid);
    const cfg = sub ? getSubFagConfig(sub) : FAG_CONFIG_DEFAULTS;
    const perLogin = cfg.perLogin || 1;
    const perSec = (cfg.perMinute || 1) / 60;
    const taxRate = cfg.taxRate || 0.03;
    const loginCost = logins * perLogin;
    const timeCost = totalSeconds * perSec;
    const taxAmount = yearTotal * taxRate;
    const totalWeek = loginCost + timeCost + taxAmount + rounded; // includes this check cost

    const insultIndex = Math.floor(Math.random() * 8);
    const insults = [
      `Du hast diese Woche ${logins} Login(s) gehabt und warst ${formatDuration(totalSeconds)} online. Kosten: ${loginCost.toFixed(2).replace('.',',')}€ Logins + ${timeCost.toFixed(2).replace('.',',')}€ Zeit + ${taxAmount.toFixed(2).replace('.',',')}€ Steuer. GESAMT: ${totalWeek.toFixed(2).replace('.',',')}€. −${costStr}€ für diese Auskunft.`,
      `HIER IST DEIN KONTOSTAND, LOSER: ${logins} Logins, ${formatDuration(totalSeconds)} online. ${loginCost.toFixed(2).replace('.',',')}€ + ${timeCost.toFixed(2).replace('.',',')}€ + ${taxAmount.toFixed(2).replace('.',',')}€ = ${totalWeek.toFixed(2).replace('.',',')}€. Dafür hast du ${costStr}€ bezahlt. Lächerlich.`,
      `Du wolltest es wissen? Ja? ${logins}x eingeloggt, ${formatDuration(totalSeconds)} Rumgehangen. ${loginCost.toFixed(2).replace('.',',')}€ + ${timeCost.toFixed(2).replace('.',',')}€ + ${taxAmount.toFixed(2).replace('.',',')}€ Steuer. ${totalWeek.toFixed(2).replace('.',',')}€. −${costStr}€ Prüfgebühr. Und? Besser jetzt?`,
      `Kontoprüfung abgeschlossen. Befund: Du bist ${logins} Mal gekrochen und warst ${formatDuration(totalSeconds)} online. Schuld: ${totalWeek.toFixed(2).replace('.',',')}€ (inkl. ${costStr}€ für diese Nachricht). Zahl einfach.`,
    ];
    const msg = insults[insultIndex % insults.length];
    showAlert('🐷 KONTOPRÜFUNG', msg);

    window.__ftSessions = weekSessions;
    renderSubFagTaxCounters();
  } catch (e) {
    showAlert('FEHLER', 'Fehler bei Kontoprüfung. Versuch es nochmal, Loser.');
  }
}

async function autoCreateFagTaxes() {
  if (!db || currentUser.role !== 'dom') return;
  const weekStart = getLastFriday();
  const existing = fagTaxes.some(f =>
    f.weekStart && f.weekStart.seconds &&
    Math.abs(f.weekStart.seconds * 1000 - weekStart.getTime()) < 86400000
  );
  if (existing) return;
  const activeSubs = subs.filter(s => s.active !== false && s.fagTax && s.fagTax.enabled !== false);
  if (activeSubs.length === 0) return;

  for (const sub of activeSubs) {
    const cfg = getSubFagConfig(sub);
    const subSessions = await fetchSubSessions(sub.id);
    const logins = cfg.loginsEnabled ? countWeeklyLogins(sub.id, subSessions) : 0;
    const seconds = cfg.minutesEnabled ? sumWeeklySeconds(sub.id, subSessions) : 0;
    const yearTotal = cfg.taxEnabled ? calcYearTotalPayments(sub.id, payments) : 0;
    const loginCost = logins * (cfg.perLogin || 1);
    const perSec = (cfg.perMinute || 1) / 60;
    const minuteCost = seconds * perSec;
    const taxAmount = yearTotal * (cfg.taxRate || 0.03);
    const baseAmount = loginCost + minuteCost + taxAmount;
    if (baseAmount <= 0) continue;

    // Carried interest from previous PAID FagTax (interest generated when marking paid)
    const prevFTs = fagTaxes
      .filter(f => f.subId === sub.id && f.weekStart && f.weekStart.seconds)
      .sort((a, b) => b.weekStart.seconds - a.weekStart.seconds);
    const prevFT = prevFTs.find(f => f.weekStart.seconds * 1000 < weekStart.getTime());
    const carriedInterest = [];
    if (prevFT && prevFT.paid && prevFT.interestAmount > 0) {
      const prevKW = getKW(new Date(prevFT.weekStart.seconds * 1000));
      carriedInterest.push({ sourceKW: String(prevKW), amount: prevFT.interestAmount });
    }
    const carriedSum = carriedInterest.reduce((s, c) => s + c.amount, 0);
    const totalAmount = Math.round((baseAmount + carriedSum) * 100) / 100;
    if (totalAmount <= 0) continue;

    try {
      await db.collection('fagTaxes').add({
        subId: sub.id, username: sub.username,
        displayName: sub.displayName || sub.username,
        weekStart: weekStart,
        loginsCount: logins, minutesCount: Math.ceil(seconds / 60),
        secondsCount: seconds, loginCost, minuteCost,
        yearTotal, taxAmount, baseAmount,
        carriedInterest: carriedInterest.length > 0 ? carriedInterest : [],
        totalAmount,
        lateInterest: false, paid: false, paidAt: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) { console.error('Auto FagTax error:', e); }
  }
}

async function markFagTaxPaid(ft) {
  if (!ft) return;
  const sub = subs.find(s => s.id === ft.subId);
  if (!sub) return;
  const ws = ft.weekStart && ft.weekStart.seconds ? new Date(ft.weekStart.seconds * 1000) : new Date(ft.weekStart);
  const dueDate = getDueDate(ws);
  const kw = getKW(ws);
  const baseAmount = ft.baseAmount || ft.totalAmount || 0;
  const carried = ft.carriedInterest || [];
  const carriedSum = carried.reduce((s, c) => s + (c.amount || 0), 0);
  const billTotal = Math.round((baseAmount + carriedSum) * 100) / 100;
  const todayStr = new Date().toISOString().split('T')[0];
  const dueStr = dueDate.toISOString().split('T')[0];

  // Build carried interest breakdown HTML
  let carriedHTML = '';
  for (const ci of carried) {
    carriedHTML += `<div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--purple);padding-left:8px">
      <span>↳ Zinsen aus Rechnung KW ${ci.sourceKW}:</span><span style="font-weight:900">${(ci.amount || 0).toFixed(2).replace('.',',')}€</span>
    </div>`;
  }

  let bodyHTML = `
    <p style="margin-bottom:12px;font-weight:700;font-size:1.1rem">FAG-TAX KW ${kw} — ${escapeHtml(sub.displayName || sub.username)}</p>
    <p style="font-size:0.7rem;color:var(--text-dim);margin-bottom:8px">Fällig am: <strong>${dueDate.toLocaleDateString('de-DE')}</strong> (Freitag)</p>
    <div style="margin-bottom:16px;padding:12px;background:var(--bg-hover);border-radius:8px">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span>Basis (Logins+Zeit+Steuer):</span><span style="font-weight:900">${baseAmount.toFixed(2).replace('.', ',')}€</span>
      </div>
      ${carriedHTML}
      <hr style="border-color:var(--border);margin:8px 0">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span style="font-weight:900">Rechnungsbetrag:</span><span style="font-weight:900">${billTotal.toFixed(2).replace('.', ',')}€</span>
      </div>
      <div id="ft-interest-preview" style="display:flex;justify-content:space-between;color:var(--purple)">
        <span>Verzugszinsen (auf Gesamtbetrag):</span><span style="font-weight:900">0,00€</span>
      </div>
      <hr style="border-color:var(--border);margin:8px 0">
      <div id="ft-total-preview" style="display:flex;justify-content:space-between;font-size:1.1rem">
        <span style="font-weight:900">GESAMT ZAHLUNG:</span><span style="font-weight:900;color:var(--red)">${billTotal.toFixed(2).replace('.', ',')}€</span>
      </div>
    </div>
    <label style="display:flex;align-items:center;gap:8px;margin-bottom:12px;cursor:pointer">
      <input type="checkbox" id="ft-pay-interest" ${ft.lateInterest ? 'checked' : ''}>
      <span style="font-weight:700;font-size:0.85rem">🔥 Verzugszinsen berechnen</span>
    </label>
    <label style="display:block;font-weight:700;font-size:0.85rem;margin-bottom:4px">
      Wann hat die Sau bezahlt?
      <input type="date" id="ft-pay-date" value="${todayStr}" min="${dueStr}" max="${todayStr}"
             style="display:block;width:100%;margin-top:4px;padding:8px;background:var(--bg);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-mono)">
    </label>
  `;

  modalTitle.textContent = '💳 ZAHLUNG EINTRAGEN';
  modalBody.innerHTML = bodyHTML;
  modalFooter.innerHTML = `
    <button class="btn btn--ghost" id="modal-cancel">ABBRECHEN</button>
    <button class="btn btn--danger" id="modal-confirm">ZAHLUNG BESTÄTIGEN</button>
  `;
  modalOverlay.style.display = 'flex';

  const closeModal = () => { modalOverlay.style.display = 'none'; };
  const cancelBtn = document.getElementById('modal-cancel');
  const confirmBtn = document.getElementById('modal-confirm');
  const dateInput = document.getElementById('ft-pay-date');
  const interestCheck = document.getElementById('ft-pay-interest');
  const interestPreview = document.getElementById('ft-interest-preview');
  const totalPreview = document.getElementById('ft-total-preview');

  function updatePreview() {
    const payDate = dateInput ? new Date(dateInput.value + 'T12:00:00') : new Date();
    const calcInterest = interestCheck ? interestCheck.checked : ft.lateInterest;
    let intAmt = 0;
    if (calcInterest && !isNaN(payDate.getTime())) {
      intAmt = calculateLateInterestToDate(billTotal, ws, payDate);
    }
    const total = billTotal + intAmt;
    if (interestPreview) {
      interestPreview.innerHTML = `<span>Verzugszinsen (auf Gesamtbetrag):</span><span style="font-weight:900">${intAmt.toFixed(2).replace('.', ',')}€</span>`;
    }
    if (totalPreview) {
      totalPreview.innerHTML = `<span style="font-weight:900">GESAMT ZAHLUNG:</span><span style="font-weight:900;color:var(--red)">${total.toFixed(2).replace('.', ',')}€</span>`;
    }
  }

  dateInput.addEventListener('change', updatePreview);
  interestCheck.addEventListener('change', updatePreview);
  updatePreview();

  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) closeModal(); };
  modalCloseBtn && (modalCloseBtn.onclick = closeModal);

  cancelBtn.onclick = closeModal;
  confirmBtn.onclick = async () => {
    const payDate = dateInput ? new Date(dateInput.value + 'T12:00:00') : new Date();
    if (isNaN(payDate.getTime())) { showToast('Ungültiges Datum', 'error'); return; }
    confirmBtn.disabled = true;
    confirmBtn.textContent = '...';
    const calcInterest = interestCheck ? interestCheck.checked : ft.lateInterest;
    const intAmt = calcInterest ? calculateLateInterestToDate(billTotal, ws, payDate) : 0;
    const totalPmt = Math.round((billTotal + intAmt) * 100) / 100;

    try {
      const pmtRef = await db.collection('payments').add({
        amount: totalPmt, category: 'fag-tax',
        description: `Fag-Tax KW ${kw}`,
        paidBy: sub.username, subId: sub.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: 'dom'
      });
      await db.collection('fagTaxes').doc(ft.id).update({
        paid: true,
        paidAt: payDate,
        interestAmount: intAmt,
        totalWithInterest: totalPmt,
        paymentId: pmtRef.id
      });

      // Carry interest to the next unpaid FagTax for this sub
      if (intAmt > 0) {
        const nextFT = fagTaxes
          .filter(f => !f.paid && f.subId === sub.id && f.weekStart && f.weekStart.seconds
            && f.weekStart.seconds * 1000 > (ft.weekStart?.seconds ? ft.weekStart.seconds * 1000 : 0))
          .sort((a, b) => a.weekStart.seconds - b.weekStart.seconds)[0];
        if (nextFT) {
          const existingCI = nextFT.carriedInterest || [];
          if (!existingCI.some(c => String(c.sourceKW) === String(kw))) {
            existingCI.push({ sourceKW: String(kw), amount: intAmt });
            const carriedSum = existingCI.reduce((s, c) => s + (c.amount || 0), 0);
            const nextBase = nextFT.baseAmount || nextFT.totalAmount || 0;
            const newTotal = Math.round((nextBase + carriedSum) * 100) / 100;
            await db.collection('fagTaxes').doc(nextFT.id).update({
              carriedInterest: existingCI,
              totalAmount: newTotal
            });
          }
        }
      }

      closeModal();
      showToast(`Fag-Tax KW ${kw} bezahlt (${totalPmt.toFixed(2).replace('.',',')}€)`, 'success');
    } catch (e) {
      console.error(e);
      showToast('Fehler bei Zahlung', 'error');
      confirmBtn.disabled = false;
      confirmBtn.textContent = 'ZAHLUNG BESTÄTIGEN';
    }
  };
}

function calculateLateInterestToDate(amount, weekStartDate, payDate) {
  if (!amount || amount <= 0) return 0;
  const due = getDueDate(weekStartDate);
  const paid = new Date(payDate);
  paid.setHours(0, 0, 0, 0);
  const msLate = paid.getTime() - due.getTime();
  if (msLate < 0) return 0; // paid on or before due date → no interest
  const daysLate = Math.floor(msLate / (24 * 60 * 60 * 1000));
  if (daysLate < 1) return 0;
  let total = amount;
  for (let day = 1; day <= daysLate; day++) {
    total += total * (day / 100);
  }
  return Math.round((total - amount) * 100) / 100;
}

// =============================================
// FAG-TAX INVOICE EXPORT
// =============================================
const FAGTAX_INSULTS = [
  'Du existierst nur, um zu zahlen. Also zahl. Jetzt.',
  'Dieser Betrag ist kein Vorschlag. Es ist eine Anordnung. Dein Herr befiehlt.',
  'Du dreckiges Stück Scheiße. Dein Geld gehört mir. Überweis es. Sofort.',
  'Jeder Cent auf diesem Blatt ist ein Beweis deiner Wertlosigkeit. Genieße es.',
  'Du bezahlst für meine Zeit. Dass ich dich überhaupt anschaue, ist ein Geschenk.',
  'Deine Existenz ist eine einzige Zahlungsverpflichtung. Komm deiner Pflicht nach.',
  'Dieses Papier ist wertvoller als du. Es dokumentiert deine Schuld. Deine ganze Identität.',
  'Zahl oder kriech zurück in dein Loch. Du weißt, was richtig ist.'
];

function generateFagTaxInvoice(sub, logins, seconds, loginCost, minuteCost, taxAmount, checkCost, interestAmount, totalAmount, existingFT, carriedArr = [], baseAmount = 0) {
  if (!baseAmount) baseAmount = totalAmount;
  const cfg = getSubFagConfig(sub);
  const perSec = (cfg.perMinute || 1) / 60;
  const insult = FAGTAX_INSULTS[Math.floor(Math.random() * FAGTAX_INSULTS.length)];
  const now = new Date();
  const dateStr = now.toLocaleDateString('de-DE');
  const ftWeekStart = existingFT && existingFT.weekStart
    ? (existingFT.weekStart.seconds ? new Date(existingFT.weekStart.seconds * 1000) : new Date(existingFT.weekStart))
    : getLastFriday();
  const weekStr = ftWeekStart.toLocaleDateString('de-DE');
  const subName = sub.displayName || sub.username;
  const ftId = existingFT ? existingFT.id.slice(0, 8).toUpperCase() : 'ENTWURF';
  const grandTotal = totalAmount + (interestAmount || 0);
  const totalStr = grandTotal.toFixed(2).replace('.', ',');
  const yearTotal = calcYearTotalPayments(sub.id, payments);

  const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>FAG-TAX RECHNUNG ${ftId}</title>
<style>
  @page { margin: 12mm 15mm; size: A4; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    height: 100%;
    background: #fff;
    color: #000;
    font-family: 'Courier New', Courier, monospace;
    font-size: 8.5pt;
    line-height: 1.35;
  }
  body {
    display: flex;
    flex-direction: column;
    min-height: 267mm;
    padding: 0;
  }
  .page-content { flex: 1; display: flex; flex-direction: column; }
  .header { text-align: center; border-bottom: 2px solid #cc0000; padding-bottom: 8px; margin-bottom: 10px; }
  .header h1 { font-size: 18pt; color: #cc0000; letter-spacing: 6px; font-weight: 900; line-height: 1.1; }
  .header .sub { font-size: 7pt; color: #666; letter-spacing: 3px; margin-top: 2px; }
  .header .number { font-size: 7pt; color: #999; margin-top: 4px; }
  .meta { display: flex; justify-content: space-between; margin-bottom: 8px; gap: 10px; }
  .meta-box { border: 1.5px solid #cc0000; padding: 6px 10px; width: 48%; }
  .meta-box h3 { font-size: 6.5pt; color: #cc0000; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
  .meta-box p { font-size: 8pt; color: #000; }
  .meta-box .small { font-size: 6.5pt; color: #999; }
  .divider { text-align: center; color: #cc0000; font-size: 12pt; letter-spacing: 6px; margin: 6px 0; }
  table { width: 100%; border-collapse: collapse; margin: 6px 0; }
  thead th { background: #000; color: #fff; padding: 5px 6px; font-size: 6.5pt; letter-spacing: 2px; text-transform: uppercase; text-align: left; }
  tbody td { padding: 5px 6px; border-bottom: 1px solid #ccc; font-size: 8pt; }
  tbody tr:last-child td { border-bottom: none; }
  .ta-right { text-align: right; }
  .ta-center { text-align: center; }
  .total-row td { font-weight: 900; font-size: 10pt; padding: 7px 6px; border-top: 2px solid #cc0000; }
  .total-row .amount { color: #cc0000; font-size: 13pt; }
  .insult-box { margin: 8px 0; padding: 8px; background: #fef2f2; border: 1.5px solid #cc0000; border-radius: 3px; }
  .insult-box p { font-size: 7.5pt; font-style: italic; color: #cc0000; text-align: center; }
  .payment-info { margin: 8px 0; padding: 7px 10px; background: #f5f5f5; border: 1px solid #ccc; }
  .payment-info h4 { font-size: 6.5pt; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
  .payment-info p { font-size: 7pt; color: #333; }
  .signature { margin-top: auto; padding-top: 8px; text-align: right; }
  .signature p { font-size: 8pt; }
  .signature .name { font-weight: 900; color: #cc0000; font-size: 11pt; }
  .footer { padding-top: 6px; border-top: 1px solid #ccc; font-size: 6pt; color: #999; text-align: center; letter-spacing: 1.5px; }
  @media print { body { padding: 0; } .no-print { display: none; } }
</style></head>
<body>
  <div class="page-content">
  <div class="header">
    <h1>💰 FAG·TAX</h1>
    <p class="sub">R E C H N U N G &mdash; ZAHLUNGSSOLL</p>
    <p class="number">Rechnung Nr. <strong>FT-${ftId}</strong></p>
  </div>

  <div class="meta">
    <div class="meta-box">
      <h3>👑 Gläubiger (Herr)</h3>
      <p><strong>HERR</strong></p>
      <p class="small">Dein Herr und Gebieter • Eigentümer deines Geldes</p>
    </div>
    <div class="meta-box">
      <h3>🐷 Schuldner (Sau)</h3>
      <p><strong>${escapeHtml(subName)}</strong></p>
      <p class="small">@${escapeHtml(sub.username)} • Status: ZAHLENDER LOSER</p>
    </div>
  </div>

  <div class="divider">✕ ✕ ✕ ✕ ✕</div>

  <p style="font-size:9pt;color:#666;margin-bottom:12px;letter-spacing:2px">
    ABRECHNUNGSZEITRAUM: ${weekStr} – ${dateStr}
  </p>

  <table>
    <thead>
      <tr><th>POS.</th><th>LEISTUNG</th><th>MENGE</th><th class="ta-right">EINZELPREIS</th><th class="ta-right">GESAMT</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Login-Gebühren (du zahlst fürs Anschauen, Loser)</td>
        <td>${logins} Logins</td>
        <td class="ta-right">${(cfg.perLogin || 1).toFixed(2).replace('.',',')}€</td>
        <td class="ta-right">${loginCost.toFixed(2).replace('.', ',')}€</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Zeit-Gebühren (jede Sekunde kostet dich Geld)</td>
        <td>${formatDuration(seconds)}</td>
        <td class="ta-right">${perSec.toFixed(4).replace('.',',')}€/Sek</td>
        <td class="ta-right">${minuteCost.toFixed(2).replace('.', ',')}€</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Fag-Tax Steuer (3% auf Jahrestribut)</td>
        <td>${yearTotal.toFixed(2).replace('.', ',')}€ Jahresbasis</td>
        <td class="ta-right">3%</td>
        <td class="ta-right">${taxAmount.toFixed(2).replace('.', ',')}€</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Kontoprüfungen (Neugier bestraft)</td>
        <td>${accountChecks.filter(c => c.subId === sub.id && c.createdAt && c.createdAt.seconds && c.createdAt.seconds * 1000 >= ftWeekStart.getTime()).length} Prüfungen</td>
        <td class="ta-right">1,00–3,99€/Stk</td>
        <td class="ta-right">${checkCost.toFixed(2).replace('.', ',')}€</td>
      </tr>
      ${(carriedArr || []).map((c, idx) => `<tr>
        <td>${5 + idx}</td>
        <td>Verzugszinsen aus Rechnung KW ${c.sourceKW} (vorgetragen)</td>
        <td>—</td>
        <td class="ta-right">—</td>
        <td class="ta-right" style="color:#cc0000">${(c.amount || 0).toFixed(2).replace('.', ',')}€</td>
      </tr>`).join('')}
      ${interestAmount > 0 ? `<tr>
        <td>${5 + (carriedArr || []).length}</td>
        <td>Verzugszinsen (täglich steigend, ${calculateLateInterestDays(existingFT ? existingFT.weekStart : null)} Tage verspätet)</td>
        <td>—</td>
        <td class="ta-right">—</td>
        <td class="ta-right" style="color:#cc0000">${interestAmount.toFixed(2).replace('.', ',')}€</td>
      </tr>` : ''}
    </tbody>
  </table>

  <table>
    <tr class="total-row">
      <td colspan="4" style="text-align:right;font-weight:900;letter-spacing:4px">GESAMTSCHULD:</td>
      <td class="ta-right amount" style="font-weight:900;color:#cc0000;font-size:18pt">${totalStr}€</td>
    </tr>
    <tr><td colspan="5" style="text-align:center;color:#999;font-size:8pt;padding-top:4px;letter-spacing:2px">
      in Worten: ${numberToGerman(grandTotal)} Euro
    </td></tr>
  </table>

  <div class="insult-box">
    <p>"${insult}"</p>
  </div>

  <div class="payment-info">
    <h4>💳 Zahlungsinformationen</h4>
    <p><strong>IBAN:</strong> DE12 3456 7890 1234 5678 90</p>
    <p><strong>BIC:</strong> FINDOM01</p>
    <p><strong>Verwendungszweck:</strong> <code>FT-${ftId} / ${escapeHtml(sub.username)}</code></p>
    <p style="margin-top:8px;color:#cc0000;font-weight:900;">⚠ Zahlungsziel: SOFORT / OHNE VERZUG</p>
  </div>

  <div class="signature">
    <p>Mit der gebührenden Verachtung,</p>
    <p class="name">👑 HERR</p>
    <p style="font-size:8pt;color:#999;letter-spacing:2px">Dein Herr und Gebieter</p>
  </div>

  <div class="footer">
    <p>FAG-TAX SYSTEM v3 • Alle Preise inkl. Demütigung • Kein Umtausch • Kein Widerruf • Nur Zahlung</p>
    <p style="margin-top:2px">Diese Rechnung wurde automatisch generiert. Einspruch zwecklos.</p>
  </div>
  </div>

  <div class="no-print" style="text-align:center;margin-top:20px;padding:12px;background:#eee;border-radius:4px">
    <button onclick="window.print()" style="padding:12px 40px;background:#cc0000;color:#fff;border:none;border-radius:4px;font-size:14px;cursor:pointer;font-weight:900;letter-spacing:3px">📄 ALS PDF DRUCKEN / SPEICHERN</button>
    <p style="margin-top:8px;font-size:9px;color:#999">Oder Strg+P / Cmd+P</p>
  </div>
</body></html>`;

  const w = window.open('', '_blank');
  if (!w) { showAlert('PDF EXPORT', 'Popup-Blocker verhindert PDF-Export. Bitte Popups erlauben.'); return; }
  w.document.write(html);
  w.document.close();
}

function numberToGerman(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace('.',',') + ' Millionen';
  const euro = Math.floor(n);
  const cent = Math.round((n - euro) * 100);
  if (euro === 0 && cent === 0) return 'Null Euro';
  const units = ['', 'Eins', 'Zwei', 'Drei', 'Vier', 'Fünf', 'Sechs', 'Sieben', 'Acht', 'Neun', 'Zehn', 'Elf', 'Zwölf', 'Dreizehn', 'Vierzehn', 'Fünfzehn', 'Sechzehn', 'Siebzehn', 'Achtzehn', 'Neunzehn'];
  const tens = ['', 'Zehn', 'Zwanzig', 'Dreißig', 'Vierzig', 'Fünfzig', 'Sechzig', 'Siebzig', 'Achtzig', 'Neunzig'];
  function under1000(x) {
    if (x === 0) return '';
    let res = '';
    if (x >= 100) { res += units[Math.floor(x / 100)] + 'hundert'; x %= 100; }
    if (x >= 20) {
      if (x % 10 !== 0) res += units[x % 10] + 'und';
      res += tens[Math.floor(x / 10)];
    } else if (x > 0) {
      res += units[x];
    }
    return res;
  }
  let result = '';
  let remaining = euro;
  if (remaining >= 1000) {
    const t = Math.floor(remaining / 1000);
    result += under1000(t) + 'tausend';
    remaining %= 1000;
  }
  result += under1000(remaining);
  result += ' Euro';
  if (cent > 0) result += ' und ' + under1000(cent) + ' Cent';
  else result += ' und Null Cent';
  return result;
}

// =============================================
// PAYMENTS CRUD
// =============================================
function startPaymentListener() {
  if (unsubscribePayments) unsubscribePayments();
  paymentsTbody.innerHTML = '<tr><td colspan="6" class="loading-cell">LADE ZAHLUNGEN...</td></tr>';
  let query = currentUser.role === 'dom'
    ? db.collection('payments').orderBy('createdAt', 'desc')
    : db.collection('payments').where('paidBy', '==', currentUser.username);
  unsubscribePayments = query.onSnapshot(snap => {
    payments = [];
    snap.forEach(doc => payments.push({ id: doc.id, ...doc.data() }));
    if (currentUser.role !== 'dom') {
      payments.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    }
    renderPayments();
    updateTotals();
    if (currentUser.role === 'dom') renderFagTaxOverview();
  }, error => {
    paymentsTbody.innerHTML = `<tr><td colspan="6" class="loading-cell" style="color:var(--red)">FEHLER: ${escapeHtml(error.message)}</td></tr>`;
  });
}

async function addPayment(amount, category, description, subId, dateStr) {
  const sub = subs.find(s => s.id === subId);
  const paidBy = sub ? sub.username : 'sub';
  let createdAt;
  if (dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    createdAt = isNaN(d.getTime()) ? firebase.firestore.FieldValue.serverTimestamp() : d;
  } else {
    createdAt = firebase.firestore.FieldValue.serverTimestamp();
  }
  try {
    await db.collection('payments').add({
      amount: parseFloat(amount), category, description: description.trim(),
      createdAt,
      paidBy, subId: subId || null, createdBy: currentUser.role
    });
    return true;
  } catch (e) { return false; }
}

async function deletePayment(id) {
  try { await db.collection('payments').doc(id).delete(); showToast('Zahlung gelöscht', 'error'); } catch (_) {}
}

// =============================================
// RENDERING
// =============================================
function renderDashboard() {
  if (currentUser.role === 'dom') {
    dashTitle.textContent = '👑 DEIN EINKOMMEN, HERR';
    dashSubtitle.textContent = 'Deine Säue. Ihr Geld. Dein Besitz.';
    domPanel.style.display = 'block';
    actionTh.style.display = 'table-cell';
    thSub.style.display = 'table-cell';
  } else {
    const name = currentUser.displayName || currentUser.username;
    dashTitle.textContent = `🐷 DEINE DIENSTE, ${name.toUpperCase()}`;
    dashSubtitle.textContent = 'Kriech her und sieh, was du deinem Herrn gegeben hast. Loser.';
    domPanel.style.display = 'none';
    actionTh.style.display = 'none';
    thSub.style.display = 'none';
  }
  userBadge.textContent = currentUser.icon + ' ' + (currentUser.displayName || currentUser.label);
}

function renderPayments() {
  let filtered = payments;
  if (currentUser.role === 'dom' && filterSubId !== 'all')
    filtered = payments.filter(p => p.subId === filterSubId || p.paidBy === filterSubId);

  if (filtered.length === 0) {
    paymentsTbody.innerHTML = '';
    emptyState.style.display = 'block';
    emptyState.textContent = currentUser.role === 'dom'
      ? 'Diese Sau hat noch nichts gezahlt. Zerdrücke sie.'
      : 'Du hast noch NICHTS gezahlt? Dein Herr wartet. Loser.';
    return;
  }
  emptyState.style.display = 'none';
  const isDom = currentUser.role === 'dom';

  paymentsTbody.innerHTML = filtered.map(p => {
    const raw = parseFloat(p.amount) || 0;
    const amountStr = raw.toFixed(2).replace('.', ',') + '€';
    let dateStr = '—';
    if (p.createdAt && p.createdAt.seconds)
      dateStr = new Date(p.createdAt.seconds * 1000).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const cat = CATEGORIES[p.category] || { label: p.category || '?', icon: '❓', color: '#666' };
    let subName = '';
    if (isDom) {
      const s = subs.find(x => x.id === p.subId || x.username === p.paidBy);
      subName = s ? (s.displayName || s.username) : (p.paidBy || '?');
    }
    return `<tr>
      <td class="date">${dateStr}</td>
      <td class="amount">${amountStr}</td>
      <td><span class="category-badge" style="border-color:${cat.color};color:${cat.color}">${cat.icon} ${cat.label}</span></td>
      ${isDom ? `<td class="sub-cell">🐷 ${escapeHtml(subName)}</td>` : ''}
      <td class="desc" title="${escapeHtml(p.description)}">${escapeHtml(p.description)}</td>
      ${isDom ? `<td><button class="btn btn--sm btn--danger" data-id="${p.id}" title="Löschen">✕</button></td>` : ''}
    </tr>`;
  }).join('');
  qsa('#payments-tbody [title="Löschen"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const ok = await showConfirm('ZAHLUNG LÖSCHEN', 'Zahlung wirklich löschen?');
      if (ok) deletePayment(btn.dataset.id);
    });
  });
}

function updateTotals() {
  let filtered = payments;
  let subLabel = '';
  if (currentUser.role === 'sub') {
    filtered = payments.filter(p => p.paidBy === currentUser.username);
    subLabel = currentUser.displayName || currentUser.username;
  } else if (filterSubId !== 'all') {
    filtered = payments.filter(p => p.subId === filterSubId || p.paidBy === filterSubId);
    const s = subs.find(x => x.id === filterSubId || x.username === filterSubId);
    subLabel = s ? (s.displayName || s.username) : '';
  }
  const total = filtered.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const formatted = total.toFixed(2).replace('.', ',') + '€';
  totalAmount.textContent = formatted;
  totalLabel.textContent = currentUser.role === 'dom' && subLabel ? `${subLabel.toUpperCase()} GESAMT` : 'GESAMT';
  const allTotal = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const allFormatted = allTotal.toFixed(2).replace('.', ',') + '€';
  const msgs = currentUser.role === 'dom' ? DEGRADING.dom : DEGRADING.sub;
  const useTotal = currentUser.role === 'dom' ? allTotal : total;
  let matched = msgs[msgs.length - 1].msg;
  for (const m of msgs) { if (useTotal >= m.min && useTotal < m.max) { matched = m.msg; break; } }
  if (currentUser.role === 'dom') {
    const name = subLabel || 'dein Schwein';
    dashMessage.innerHTML = total > 0
      ? `<strong>${name}</strong> hat dir bisher <strong>${formatted}</strong> überwiesen.<br>${matched}`
      : `Deine Säue gaben dir insgesamt <strong>${allFormatted}</strong>.<br>${matched}`;
  } else {
    dashMessage.innerHTML = `Du hast deinem Herrn bereits <strong>${formatted}</strong> überwiesen.<br>${matched}`;
  }
}

// =============================================
// SUBS UI
// =============================================
function renderSubs() {
  const active = subs.filter(s => s.active !== false);
  if (active.length === 0) { subsList.innerHTML = '<p class="empty-subs">Noch keine Säue angelegt.</p>'; return; }

  subsList.innerHTML = active.map(s => {
    const totalPaid = payments.filter(p => p.subId === s.id || p.paidBy === s.username)
      .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    const totalStr = totalPaid.toFixed(2).replace('.', ',') + '€';
    const cfg = getSubFagConfig(s);
    const isEditing = editingSubId === s.id;

    if (isEditing) {
      return `<div class="sub-edit-row" data-id="${s.id}">
        <div class="sub-edit-fields">
          <input type="text" class="sub-edit-user" value="${escapeHtml(s.username)}" placeholder="Benutzername">
          <input type="text" class="sub-edit-name" value="${escapeHtml(s.displayName || s.username)}" placeholder="Anzeigename">
          <input type="text" class="sub-edit-pw" value="${escapeHtml(s.password || '')}" placeholder="Passwort">
        </div>
        <div class="sub-edit-actions">
          <button class="btn btn--sm btn--success" data-id="${s.id}">💾</button>
          <button class="btn btn--sm btn--ghost">✕</button>
        </div>
      </div>`;
    }

    return `<div class="sub-row" data-id="${s.id}">
      <div class="sub-info">
        <span class="sub-name">🐷 ${escapeHtml(s.displayName || s.username)}</span>
        <span class="sub-uname">@${escapeHtml(s.username)}</span>
        <span class="sub-total" style="color:var(--red)">${totalStr}</span>
      </div>
      <div class="sub-actions">
        <button class="btn btn--sm btn--primary" data-id="${s.id}" title="Bearbeiten">✎</button>
        <button class="btn btn--sm btn--danger" data-id="${s.id}" title="Löschen">🗑</button>
      </div>
      <div class="sub-config-row">
        <label class="sub-config-toggle">
          <input type="checkbox" class="cfg-toggle" data-id="${s.id}" data-key="enabled" ${cfg.enabled ? 'checked' : ''}> FAG-TAX
        </label>
        <label class="sub-config-toggle">
          <input type="checkbox" class="cfg-toggle" data-id="${s.id}" data-key="loginsEnabled" ${cfg.loginsEnabled ? 'checked' : ''}> LOGINS
        </label>
        <label class="sub-config-toggle">
          <input type="checkbox" class="cfg-toggle" data-id="${s.id}" data-key="minutesEnabled" ${cfg.minutesEnabled ? 'checked' : ''}> MINUTEN
        </label>
        <label class="sub-config-toggle">
          <input type="checkbox" class="cfg-toggle" data-id="${s.id}" data-key="taxEnabled" ${cfg.taxEnabled ? 'checked' : ''}> STEUER
        </label>
        <label class="sub-config-toggle">
          <input type="checkbox" class="cfg-toggle" data-id="${s.id}" data-key="counterVisible" ${cfg.counterVisible ? 'checked' : ''}> ZÄHLER
        </label>
      </div>
    </div>`;
  }).join('');

  qsa('.sub-actions .btn--primary[title="Bearbeiten"]').forEach(b => {
    b.addEventListener('click', () => { editingSubId = b.dataset.id; renderSubs(); });
  });
  qsa('.sub-edit-actions .btn--success').forEach(b => {
    b.addEventListener('click', async () => {
      const row = b.closest('.sub-edit-row');
      const user = qs('.sub-edit-user', row).value;
      const name = qs('.sub-edit-name', row).value;
      const pw = qs('.sub-edit-pw', row).value;
      let ok = true;
      if (user) { const r = await updateSubUsername(b.dataset.id, user); if (!r) { showAlert('FEHLER', 'Benutzername ungültig oder bereits vergeben!'); ok = false; } }
      if (ok && name) { const r = await updateSubDisplay(b.dataset.id, name); if (!r) { showAlert('FEHLER', 'Name ungültig!'); ok = false; } }
      if (ok && pw) { if (pw.length < 3) { showAlert('FEHLER', 'Passwort muss mind. 3 Zeichen haben!'); ok = false; } else { await updateSubPassword(b.dataset.id, pw); } }
      if (ok) editingSubId = null;
    });
  });
  qsa('.sub-edit-actions .btn--ghost').forEach(b => {
    b.addEventListener('click', () => { editingSubId = null; renderSubs(); });
  });
  qsa('.sub-actions .btn--danger[title="Löschen"]').forEach(b => {
    b.addEventListener('click', async () => {
      const ok = await showConfirm('SAU LÖSCHEN', 'Diese Sau + alle Zahlungen/Sessions/FagTaxes wirklich ENDGÜLTIG löschen?');
      if (ok) deleteSub(b.dataset.id);
    });
  });
  qsa('.cfg-toggle').forEach(cb => {
    cb.addEventListener('change', async () => {
      await updateSubFagTax(cb.dataset.id, { [cb.dataset.key]: cb.checked });
    });
  });
}

function populateSubSelects() {
  const active = subs.filter(s => s.active !== false);
  [inputSub, filterSub].forEach(sel => {
    const cur = sel.value;
    if (sel === filterSub) sel.innerHTML = '<option value="all">🐷 ALLE SÄUE</option>';
    else sel.innerHTML = '';
    active.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = `🐷 ${s.displayName || s.username}`;
      sel.appendChild(opt);
    });
    if (cur && [...sel.options].some(o => o.value === cur)) sel.value = cur;
  });
}

// =============================================
// =============================================
// FAG-TAX RENDERING (DOM)
// =============================================
function showSubFagTaxDetails(subId, ftWeekStart, ftId) {
  const sub = subs.find(s => s.id === subId);
  if (!sub) return;
  const cfg = getSubFagConfig(sub);
  const name = sub.username || sub.name || 'Unbekannt';
  const weekStart = ftWeekStart ? new Date(ftWeekStart) : getLastFriday();
  const ft = ftId ? fagTaxes.find(f => f.id === ftId) : null;

  const logins = ft ? (ft.loginsCount || 0) : 0;
  const storedSecs = ft ? (ft.secondsCount || 0) : 0;
  const yearTotal = calcYearTotalPayments(sub.id, payments);
  const checkSum = sumWeeklyChecks(sub.id, weekStart);

  const perLogin = cfg.perLogin || 1;
  const perSec = (cfg.perMinute || 1) / 60;
  const taxRate = cfg.taxRate || 0.03;
  const loginCost = logins * perLogin;
  const timeCost = storedSecs * perSec;
  const taxAmount = yearTotal * taxRate;
  const totalWeek = Math.round((loginCost + timeCost + taxAmount + checkSum) * 100) / 100;

  const fmt = v => v.toFixed(2).replace('.', ',') + '€';
  const durationStr = formatDuration(storedSecs);

  const kw = getKW(weekStart);
  const weekLabel = ftWeekStart ? `KW ${kw}` : `KW ${kw} (aktuell)`;
  showModal('🐷 ' + escapeHtml(name) + ' – ' + weekLabel, `
    <div class="modal-fagtax-details" style="max-width:420px">
      <div style="font-size:0.7rem;color:var(--text-dim);margin-bottom:1rem">${weekLabel}</div>
      <div class="fagtax-details-grid">
        <div class="fagtax-detail-card">
          <div class="fagtax-detail-label">👤 Logins</div>
          <div class="fagtax-detail-value">${logins}</div>
        </div>
        <div class="fagtax-detail-card">
          <div class="fagtax-detail-label">⏱ Online (KW)</div>
          <div class="fagtax-detail-value">${durationStr}</div>
        </div>
      </div>
      <div class="fagtax-details-costs" style="margin-top:0.6rem">
        <div class="fagtax-cost-row">
          <span>📈 Logins (${fmt(perLogin)}/Login)</span>
          <span class="fagtax-cost-amount">${fmt(loginCost)}</span>
        </div>
        <div class="fagtax-cost-row">
          <span>⏱ Zeit (${fmt(perSec * 60)}/Min)</span>
          <span class="fagtax-cost-amount">${fmt(timeCost)}</span>
        </div>
        <div class="fagtax-cost-row">
          <span>💰 Steuer (${(taxRate * 100).toFixed(0)}% v. ${fmt(yearTotal)})</span>
          <span class="fagtax-cost-amount">${fmt(taxAmount)}</span>
        </div>
        <div class="fagtax-cost-row">
          <span>🔍 Kontoprüfungen</span>
          <span class="fagtax-cost-amount">${fmt(checkSum)}</span>
        </div>
        <div class="fagtax-cost-row fagtax-cost-row--total">
          <span>💀 GESAMT</span>
          <span class="fagtax-cost-amount" style="color:var(--red);font-weight:900">${fmt(totalWeek)}</span>
        </div>
      </div>
    </div>
  `);
}

function renderFagTaxOverview() {
  if (!fagTaxOverview) return;
  if (fagTaxes.length === 0) {
    fagTaxOverview.innerHTML = '<p style="text-align:center;padding:20px;color:var(--text-dim);font-weight:700">Noch keine Fag-Taxes vorhanden.</p>';
    return;
  }

  // Group FagTaxes by weekStart desc
  const weekMap = {};
  fagTaxes.forEach(ft => {
    const ws = ft.weekStart && ft.weekStart.seconds
      ? new Date(ft.weekStart.seconds * 1000)
      : new Date(ft.weekStart);
    const key = ws.getTime();
    if (!weekMap[key]) weekMap[key] = [];
    weekMap[key].push(ft);
  });
  const weeks = Object.keys(weekMap).map(Number).sort((a, b) => b - a);

  let html = '<div class="fagtax-weekly-overview">';
  html += '<h4>📊 FAG-TAX ÜBERSICHT (ALLE WOCHEN)</h4>';

  // Wochenabschluss button
  html += `<div style="margin:10px 0;text-align:center"><button id="btn-week-close" class="btn btn--primary" style="font-size:0.7rem">📅 AKTUELLE WOCHE BERECHNEN</button></div>`;

  // Export unpaid button
  const unpaid = fagTaxes.filter(f => !f.paid);
  if (unpaid.length > 0) {
    html += `<div style="margin:10px 0 16px;text-align:center"><button id="btn-export-unpaid" class="btn btn--danger">📄 ALLE OFFENEN EXPORTIEREN</button></div>`;
  }

  weeks.forEach(wsKey => {
    const weekFTs = weekMap[wsKey];
    const wsDate = new Date(wsKey);
    const kw = getKW(wsDate);
    const wsStr = wsDate.toLocaleDateString('de-DE');
    wsDate.setDate(wsDate.getDate() + 6);
    const weStr = wsDate.toLocaleDateString('de-DE');

    html += `<div class="ft-week-group" style="margin-bottom:20px;padding:12px;background:var(--bg-hover);border-radius:8px;border:1px solid var(--border)">`;
    html += `<h5 style="margin:0 0 10px 0;font-size:0.8rem;letter-spacing:2px">📅 KW ${kw} <span style="font-weight:400;color:var(--text-dim)">(${wsStr} – ${weStr})</span></h5>`;

    // Table for this week
    html += `<table class="fagtax-table" style="font-size:0.65rem"><thead><tr>
      <th>SAU</th><th>€ BASIS</th><th>€ ZINSEN</th><th>GESAMT</th><th>STATUS</th><th>AKTIONEN</th>
    </tr></thead><tbody>`;

    // Sort by sub name
    weekFTs.sort((a, b) => (a.displayName || a.username || '').localeCompare(b.displayName || b.username || ''));

    weekFTs.forEach(ft => {
      const sub = subs.find(s => s.id === ft.subId);
      const name = sub ? (sub.displayName || sub.username) : (ft.displayName || ft.username || '?');
      const isPaid = ft.paid;

      // For unpaid FagTaxes, recalculate baseAmount from live data
      let baseAmount;
      if (isPaid) {
        baseAmount = ft.baseAmount || ft.totalAmount || 0;
      } else {
        if (sub) {
          const cfg = getSubFagConfig(sub);
          const logins = ft.loginsCount || 0;
          const seconds = ft.secondsCount || 0;
          const yearTotal = calcYearTotalPayments(sub.id, payments);
          const loginCost = logins * (cfg.perLogin || 1);
          const perSec = (cfg.perMinute || 1) / 60;
          const minuteCost = seconds * perSec;
          const taxAmount = yearTotal * (cfg.taxRate || 0.03);
          const ftWS = ft.weekStart?.seconds ? new Date(ft.weekStart.seconds * 1000) : null;
          const checkCost = sumWeeklyChecks(sub.id, ftWS);
          baseAmount = Math.round((loginCost + minuteCost + taxAmount + checkCost) * 100) / 100;
        } else {
          baseAmount = ft.baseAmount || ft.totalAmount || 0;
        }
      }

      const carried = ft.carriedInterest || [];
      const carriedSum = carried.reduce((s, c) => s + (c.amount || 0), 0);
      const paidIntAmt = ft.interestAmount || 0;
      const totalPaid = ft.totalWithInterest || (baseAmount + carriedSum);

      let statusStr = '';
      let actionsStr = '';

      // Interest column: carried items for unpaid, stored interest for paid
      let intColHTML = '<span style="color:var(--text-dim)">0,00€</span>';
      if (isPaid) {
        if (paidIntAmt > 0) {
          intColHTML = `<span style="color:var(--purple);font-weight:900">${paidIntAmt.toFixed(2).replace('.',',')}€</span>`;
        } else {
          intColHTML = '<span style="color:var(--text-dim);font-size:0.5rem">—</span>';
        }
      } else if (carried.length > 0) {
        const lines = carried.map(c =>
          `<div style="font-size:0.5rem;line-height:1.4">Zinsen KW ${c.sourceKW}: <strong>${(c.amount || 0).toFixed(2).replace('.',',')}€</strong></div>`
        ).join('');
        intColHTML = `<div style="color:var(--purple);font-weight:700">${lines}</div>`;
      }

      if (isPaid) {
        let paidDateStr = '?';
        if (ft.paidAt) {
          if (ft.paidAt.seconds) paidDateStr = new Date(ft.paidAt.seconds * 1000).toLocaleDateString('de-DE');
          else if (ft.paidAt instanceof Date) paidDateStr = ft.paidAt.toLocaleDateString('de-DE');
          else if (typeof ft.paidAt === 'string') paidDateStr = new Date(ft.paidAt).toLocaleDateString('de-DE');
        }
        statusStr = `<span style="color:var(--green);font-weight:900">✅ ${paidDateStr}</span>`;
        actionsStr = `<button class="btn btn--sm btn--cyan" data-ftid="${ft.id}">📄 PDF</button>`;
      } else {
        statusStr = `<span style="color:var(--red);font-weight:900">❌ OFFEN</span>`;
        actionsStr = `
          <button class="btn btn--sm btn--success" data-ftid="${ft.id}">BEZAHLT</button>
          <button class="btn btn--sm btn--cyan" data-ftid="${ft.id}">📄 PDF</button>
        `;
      }

      const baseStr = baseAmount.toFixed(2).replace('.', ',') + '€';
      const totalStr = (isPaid ? totalPaid : (baseAmount + carriedSum)).toFixed(2).replace('.', ',') + '€';

      html += `<tr>
        <td><span class="ft-sub-link" data-subid="${ft.subId}" data-ftid="${ft.id}" data-weekstart="${ft.weekStart?.seconds ? ft.weekStart.seconds * 1000 : ''}" style="cursor:pointer;border-bottom:1px dashed var(--text-dim)">🐷 ${escapeHtml(name)}</span></td>
        <td>${baseStr}</td>
        <td style="font-size:0.6rem">${intColHTML}</td>
        <td style="color:var(--red);font-weight:900">${totalStr}</td>
        <td>${statusStr}</td>
        <td style="white-space:nowrap">${actionsStr}</td>
      </tr>`;
    });

    html += '</tbody></table></div>';
  });

  html += '</div>';
  fagTaxOverview.innerHTML = html;

  // Event handlers
  fagTaxOverview.querySelectorAll('.btn--sm.btn--success').forEach(b => {
    b.addEventListener('click', () => {
      const ft = fagTaxes.find(f => f.id === b.dataset.ftid);
      if (ft) markFagTaxPaid(ft);
    });
  });

  fagTaxOverview.querySelectorAll('.btn--sm.btn--cyan').forEach(b => {
    b.addEventListener('click', () => {
      const ft = fagTaxes.find(f => f.id === b.dataset.ftid);
      if (ft) exportSingleFagTaxInvoice(ft);
    });
  });

  fagTaxOverview.querySelectorAll('.ft-sub-link').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const ws = el.dataset.weekstart ? parseInt(el.dataset.weekstart) : null;
      showSubFagTaxDetails(el.dataset.subid, ws, el.dataset.ftid);
    });
  });

  const btnWeekClose = document.getElementById('btn-week-close');
  if (btnWeekClose) {
    btnWeekClose.addEventListener('click', async () => {
      btnWeekClose.disabled = true;
      btnWeekClose.textContent = '⏳ BERECHNE...';
      await autoCreateFagTaxes();
      btnWeekClose.textContent = '📅 AKTUELLE WOCHE BERECHNEN';
      btnWeekClose.disabled = false;
      showToast('Fag-Tax für aktuelle Woche berechnet', 'success');
    });
  }

  const btnExport = document.getElementById('btn-export-unpaid');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      const unpaidFTs = fagTaxes.filter(f => !f.paid);
      if (unpaidFTs.length === 0) return;
      if (unpaidFTs.length > 5) {
        showConfirm('EXPORT', `${unpaidFTs.length} Rechnungen werden geöffnet. Popups erlaubt?`)
          .then(ok => { if (ok) unpaidFTs.forEach(ft => exportSingleFagTaxInvoice(ft)); });
      } else {
        unpaidFTs.forEach(ft => exportSingleFagTaxInvoice(ft));
      }
    });
  }
}

function exportSingleFagTaxInvoice(ft) {
  if (!ft) return;
  const sub = subs.find(s => s.id === ft.subId);
  if (!sub) return;
  const cfg = getSubFagConfig(sub);
  const logins = ft.loginsCount || 0;
  const seconds = ft.secondsCount || ft.minutesCount * 60 || 0;
  const loginCost = ft.loginCost || 0;
  const minuteCost = ft.minuteCost || 0;
  const taxAmount = ft.taxAmount || 0;
  const checkCost = 0;
  const baseAmount = ft.baseAmount || ft.totalAmount || 0;
  const carried = ft.carriedInterest || [];
  const totalAmount = ft.totalAmount || baseAmount;
  const interestAmount = ft.interestAmount || 0;
  generateFagTaxInvoice(sub, logins, seconds, loginCost, minuteCost, taxAmount, checkCost, interestAmount, totalAmount, ft, carried, baseAmount);
}

// =============================================
// FAG-TAX RENDERING (SUB)
// =============================================
function formatDuration(totalSecs) {
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  if (h > 0) return `${h} Std ${m} Min ${s} Sek`;
  if (m > 0) return `${m} Min ${s} Sek`;
  return `${s} Sek`;
}

function renderSubFagTaxView() {
  if (currentUser.role !== 'sub') return;

  // Remove old counter UI if it exists
  const oldUI = $('sub-fagtax-ui');
  if (oldUI) oldUI.remove();

  // Clean up any live interval
  if (liveInterval) {
    clearInterval(liveInterval);
    liveInterval = null;
  }

  // Get current open Fag-Tax for display hint
  const currentFT = fagTaxes.find(f => !f.paid && f.subId === currentUser.uid);
  let openHint = '';
  if (currentFT) {
    const baseAmt = currentFT.baseAmount || currentFT.totalAmount || 0;
    const carried = currentFT.carriedInterest || [];
    const carriedSum = carried.reduce((s, c) => s + (c.amount || 0), 0);
    const total = baseAmt + carriedSum;
    const ws = currentFT.weekStart ? (currentFT.weekStart.seconds ? new Date(currentFT.weekStart.seconds * 1000) : currentFT.weekStart) : null;
    const kw = getKW(ws);

    let detailLines = '';
    if (carried.length > 0) {
      detailLines = carried.map(c =>
        `<div style="font-size:0.6rem;color:var(--purple)">↳ Zinsen aus KW ${c.sourceKW}: ${(c.amount || 0).toFixed(2).replace('.',',')}€</div>`
      ).join('');
    }
    openHint = `<div class="ft-current-bill" style="margin-bottom:16px">
      <div class="ft-bill-label">📄 OFFENE FAG-TAX (KW ${kw})</div>
      <div style="font-size:0.65rem;color:var(--text-dim);margin:4px 0">Basis: ${baseAmt.toFixed(2).replace('.',',')}€</div>
      ${detailLines}
      <div class="ft-bill-amount">${total.toFixed(2).replace('.', ',')}€</div>
      <div class="ft-bill-detail">${carriedSum > 0 ? 'inkl. Verzugszinsen aus VORWOCHEN' : 'noch nicht bezahlt'}</div>
    </div>`;
  }

  // Build Fag-Tax section (no counters, only button + history)
  let html = `
    <section class="sub-fagtax-section" id="sub-fagtax-ui">
      <h3>💰 F A G - T A X</h3>
      ${openHint}
      <div style="text-align:center;padding:8px 0 16px 0">
        <p style="font-family:var(--font);font-size:0.65rem;color:var(--text-dim);font-weight:700;letter-spacing:2px;margin-bottom:12px">
          Du willst wissen, wie tief du diese Woche schon steckst?<br>Dafür zahlst du. Neugier hat ihren Preis.
        </p>
        <button id="btn-sub-check-account" class="btn-check-account">🔍 KONTO PRÜFEN (1–3€ GEBÜHR)</button>
      </div>
    </section>
  `;

  // Insert before payments section
  const ref = dashboardMain ? qs('#payments-card') : null;
  if (ref) ref.insertAdjacentHTML('beforebegin', html);

  const checkBtn = $('btn-sub-check-account');
  if (checkBtn) {
    checkBtn.addEventListener('click', subCheckAccount);
  }

  // Render history below
  renderSubFagTaxHistory();
}

function renderSubFagTaxCounters() {
  if (currentUser.role !== 'sub') return;

  const sub = subs.find(s => s.id === currentUser.uid);
  const cfg = sub ? getSubFagConfig(sub) : FAG_CONFIG_DEFAULTS;

  // Fetch current week data
  const weekStart = getLastFriday();
  const subSessions = [];
  if (window.__ftSessions) {
    window.__ftSessions.forEach(s => {
      if (s.loginTime && s.loginTime.seconds && s.loginTime.seconds * 1000 >= weekStart.getTime()) {
        subSessions.push(s);
      }
    });
  }

  const logins = subSessions.length;
  const closedSecs = subSessions.reduce((sum, s) => sum + (s.durationSeconds || s.durationMinutes * 60 || 0), 0);
  const liveSecs = cfg.minutesEnabled ? getLiveSessionSeconds() : 0;
  const totalSecs = closedSecs + liveSecs;

  const loginCost = logins * (cfg.perLogin || 1);
  const perSec = (cfg.perMinute || 1) / 60;
  const timeCost = totalSecs * perSec;
  const yearTotal = calcYearTotalPayments(currentUser.uid, payments);
  const taxAmount = yearTotal * (cfg.taxRate || 0.03);
  const checkCost = sumWeeklyChecks(currentUser.uid);
  const totalNow = loginCost + timeCost + taxAmount + checkCost;

  const currentFT = fagTaxes.find(f => !f.paid && f.subId === currentUser.uid);
  let carriedSum = 0;
  let carriedLines = '';
  if (currentFT) {
    const carriedArr = currentFT.carriedInterest || [];
    carriedSum = carriedArr.reduce((s, c) => s + (c.amount || 0), 0);
    if (carriedArr.length > 0) {
      carriedLines = carriedArr.map(c =>
        `<div style="font-size:0.5rem;color:var(--purple)">Zinsen aus KW ${c.sourceKW}: +${(c.amount || 0).toFixed(2).replace('.',',')}€</div>`
      ).join('');
    }
  }
  const totalWithInterest = totalNow + carriedSum;

  const timeDisplay = formatDuration(totalSecs);
  const timeCostStr = timeCost.toFixed(2).replace('.', ',') + '€';

  const bill = currentFT ? (currentFT.baseAmount || currentFT.totalAmount || 0) : 0;

  const counterHtml = `
    <section class="sub-fagtax-section" id="sub-fagtax-ui">
      <h3>💰 F A G - T A X</h3>
      <div style="text-align:center;padding:0 0 8px 0">
        <p style="font-family:var(--font);font-size:0.6rem;color:var(--text-dim);font-weight:600;letter-spacing:2px">
          🔓 EINBLICK FREIGESCHALTET
        </p>
      </div>
      <div class="fagtax-counter-grid">
        <div class="ft-counter-item" style="border:2px solid var(--red-dark)">
          <div class="ft-counter-label">LOGINS DIESE WOCHE</div>
          <div class="ft-counter-value" style="font-size:1.5rem">${logins}</div>
          <div class="ft-counter-cost">= ${loginCost.toFixed(2).replace('.', ',')}€</div>
        </div>
        <div class="ft-counter-item" style="border:2px solid var(--red-dark)">
          <div class="ft-counter-label">ZEIT ONLINE</div>
          <div class="ft-counter-value" id="ft-live-time" style="font-size:1rem;color:var(--red)">${timeDisplay}</div>
          <div class="ft-counter-cost" id="ft-live-cost">= ${timeCostStr} (${perSec.toFixed(4).replace('.',',')}€/Sek)</div>
        </div>
        <div class="ft-counter-item" style="border:1px solid var(--border)">
          <div class="ft-counter-label">JAHRES-TRIBUT (3%)</div>
          <div class="ft-counter-value" style="font-size:0.9rem">${yearTotal.toFixed(0)}€</div>
          <div class="ft-counter-cost">STEUER: ${taxAmount.toFixed(2).replace('.', ',')}€</div>
        </div>
        <div class="ft-counter-item" style="border:2px solid var(--orange)">
          <div class="ft-counter-label">KONTOPRÜFUNGEN</div>
          <div class="ft-counter-value" style="font-size:1rem;color:var(--orange)">${checkCost.toFixed(2).replace('.', ',')}€</div>
          <div class="ft-counter-cost">BISHER GEZAHLT</div>
        </div>
        <div class="ft-counter-item" style="border-color:var(--red-dark);grid-column:1 / -1;max-width:300px;margin:0 auto">
          <div class="ft-counter-label">LAUFENDE KOSTEN</div>
          <div class="ft-counter-value" id="ft-live-total" style="color:var(--red);font-size:1.6rem">${totalWithInterest.toFixed(2).replace('.', ',')}€</div>
          <div class="ft-counter-cost">SEIT LETZTEM FREITAG${carriedSum > 0 ? ` (+${carriedSum.toFixed(2).replace('.', ',')}€ Zinsen aus VORWOCHEN)` : ''}</div>
          ${carriedLines}
        </div>
      </div>
      ${bill > 0 ? `<div class="ft-current-bill">
        <div class="ft-bill-label">AKTUELLE FAG-TAX (OFFEN)</div>
        <div class="ft-bill-amount">${(bill + carriedSum).toFixed(2).replace('.', ',')}€</div>
        <div class="ft-bill-detail">${carriedSum > 0 ? `davon ${carriedSum.toFixed(2).replace('.', ',')}€ Verzugszinsen aus VORWOCHEN` : 'zu zahlen bis nächsten Freitag'}</div>
      </div>` : ''}
    </section>
  `;

  let existing = $('sub-fagtax-ui');
  if (existing) {
    existing.outerHTML = counterHtml;
  } else {
  const ref = dashboardMain ? qs('#payments-card') : null;
    if (ref) ref.insertAdjacentHTML('beforebegin', counterHtml);
  }

  // Start live 1-second counter if not already running
  if (!liveInterval) {
    liveInterval = setInterval(() => {
      const timeEl = $('ft-live-time');
      const costEl = $('ft-live-cost');
      const totalEl = $('ft-live-total');
      if (!timeEl) { clearInterval(liveInterval); liveInterval = null; return; }

      const liveSecs = cfg.minutesEnabled ? getLiveSessionSeconds() : 0;
      const total = closedSecs + liveSecs;
      const timeVal = formatDuration(total);
      const costVal = (total * perSec).toFixed(2).replace('.', ',') + '€';
      const fullTotal = (loginCost + (total * perSec) + taxAmount + checkCost + carriedSum).toFixed(2).replace('.', ',') + '€';

      if (timeEl) timeEl.textContent = timeVal;
      if (costEl) costEl.textContent = '= ' + costVal;
      if (totalEl) totalEl.textContent = fullTotal;
    }, 1000);
  }
}

function renderSubFagTaxHistory() {
  if (currentUser.role !== 'sub') return;
  const paid = fagTaxes.filter(f => f.paid);
  const existing = $('sub-fagtax-history');
  if (existing) existing.remove();

  const totalPaid = paid.reduce((s, f) => s + (f.totalAmount || 0), 0);
  const totalStr = totalPaid.toFixed(2).replace('.', ',') + '€';

  // Find current unpaid Fag-Tax for this sub
  const currentFT = fagTaxes.find(f => !f.paid && f.subId === currentUser.uid);
  let carriedSum = 0;
  let carriedSub = '';
  if (currentFT) {
    const carriedArr = currentFT.carriedInterest || [];
    carriedSum = carriedArr.reduce((s, c) => s + (c.amount || 0), 0);
    if (carriedArr.length > 0) {
      carriedSub = carriedArr.map(c =>
        `Zinsen KW ${c.sourceKW}: ${(c.amount || 0).toFixed(2).replace('.',',')}€`
      ).join(' • ');
    }
  }

  let html = `<div class="sub-fagtax-section" id="sub-fagtax-history" style="margin-top:20px">
    <h3>📜 FAG-TAX VERLAUF</h3>`;

  // Show open Fag-Tax at top
  if (currentFT) {
    const baseAmt = currentFT.baseAmount || currentFT.totalAmount || 0;
    const total = baseAmt + carriedSum;
    const ftTotal = (total).toFixed(2).replace('.', ',') + '€';
    const kw2 = currentFT.weekStart ? getKW(currentFT.weekStart.seconds ? new Date(currentFT.weekStart.seconds * 1000) : currentFT.weekStart) : '';
    html += `<div class="ft-history-item" style="border-color:var(--red);background:var(--bg-hover-red)">
      <span style="flex:1;font-weight:900;color:var(--red)">📄 OFFEN KW ${kw2}</span>
      <span style="flex:2;font-size:0.6rem;color:var(--text-dim)">${carriedSub || '—'}</span>
      <span class="ft-history-paid" style="font-weight:900;color:var(--red);font-size:0.85rem">${ftTotal}</span>
    </div>`;
  }

  if (paid.length === 0) {
    html += `<p style="color:var(--text-dim);font-weight:700;text-align:center;padding:10px;font-size:0.7rem">Noch keine Fag-Taxes bezahlt.</p>`;
  } else {
    html += `<p style="font-size:0.7rem;color:var(--text-dim);font-weight:700;margin-bottom:12px">Gesamt bezahlt: <strong style="color:var(--red)">${totalStr}</strong></p>`;
    paid.slice(0, 20).forEach(f => {
      const total = (f.totalWithInterest || f.totalAmount || 0).toFixed(2).replace('.', ',') + '€';
      let dateStr = '';
      if (f.paidAt && f.paidAt.seconds) dateStr = new Date(f.paidAt.seconds * 1000).toLocaleDateString('de-DE');
      const breakdown = [];
      if (f.loginCost > 0) breakdown.push(`${f.loginsCount || 0} Logins = ${(f.loginCost || 0).toFixed(2).replace('.', ',')}€`);
      if (f.minuteCost > 0) breakdown.push(`${f.minutesCount || 0} Min = ${(f.minuteCost || 0).toFixed(2).replace('.', ',')}€`);
      if (f.taxAmount > 0) breakdown.push(`Steuer (${(f.taxAmount || 0).toFixed(2).replace('.', ',')}€)`);
      const carriedArr = f.carriedInterest || [];
      if (carriedArr.length > 0) {
        carriedArr.forEach(c => breakdown.push(`Zinsen KW ${c.sourceKW}: ${(c.amount || 0).toFixed(2).replace('.',',')}€`));
      }
      if (f.interestAmount > 0) {
        breakdown.push(`+${f.interestAmount.toFixed(2).replace('.', ',')}€ Verzug`);
      }
      const kw = f.weekStart ? getKW(f.weekStart.seconds ? new Date(f.weekStart.seconds * 1000) : f.weekStart) : '';
      const kwLabel = kw ? `KW ${kw}` : '';
      html += `<div class="ft-history-item">
        <span style="flex:1">${dateStr} ${kwLabel}</span>
        <span style="flex:2;font-size:0.6rem;color:var(--text-dim)">${breakdown.join(' • ')}</span>
        <span class="ft-history-paid" style="font-weight:900">${total} ✅</span>
      </div>`;
    });
  }

  html += '</div>';

  const section = qs('#payments-card');
  if (section) section.insertAdjacentHTML('afterend', html);
}

// =============================================
// MODAL SYSTEM
// =============================================
function showModal(title, bodyHTML, confirmText, onConfirm, cancelText) {
  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHTML;

  let footerHTML = '';
  if (confirmText && onConfirm) {
    footerHTML = `<button class="btn btn--ghost" id="modal-cancel">${cancelText || 'ABBRECHEN'}</button>
<button class="btn btn--danger" id="modal-confirm">${confirmText}</button>`;
  } else {
    footerHTML = `<button class="btn btn--primary" id="modal-ok">OK</button>`;
  }
  modalFooter.innerHTML = footerHTML;
  modalOverlay.style.display = 'flex';
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) hideModal(); };
  modalCloseBtn.onclick = hideModal;

  const okBtn = document.getElementById('modal-ok');
  if (okBtn) okBtn.onclick = hideModal;
  const cancelBtn = document.getElementById('modal-cancel');
  const confirmBtn = document.getElementById('modal-confirm');
  if (cancelBtn) cancelBtn.onclick = hideModal;
  if (confirmBtn) confirmBtn.onclick = () => { hideModal(); onConfirm(); };
}

function hideModal() {
  modalOverlay.style.display = 'none';
}

function showAlert(title, message) {
  showModal(title, `<p>${escapeHtml(message)}</p>`);
}

function showConfirm(title, message) {
  return new Promise(resolve => {
    showModal(title, `<p>${escapeHtml(message)}</p>`, 'BESTÄTIGEN', () => resolve(true), 'ABBRECHEN');
    const cancelBtn = document.getElementById('modal-cancel');
    if (cancelBtn) {
      cancelBtn.onclick = () => { hideModal(); resolve(false); };
    }
    modalCloseBtn.onclick = () => { hideModal(); resolve(false); };
    modalOverlay.onclick = (e) => { if (e.target === modalOverlay) { hideModal(); resolve(false); } };
  });
}

// =============================================
// TOAST SYSTEM
// =============================================
function showToast(message, type, duration) {
  if (!toastContainer) return;
  type = type || 'info';
  duration = duration || 4000;
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<span class="toast-msg">${escapeHtml(message)}</span>`;
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast--visible'));
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// =============================================
// HELPERS
// =============================================
function escapeHtml(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// =============================================
// EVENT HANDLERS
// =============================================
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    loginError.textContent = ''; loginPassword.value = ''; loginUsername.value = '';
    updateLoginFields();
  });
});

loginBtn.addEventListener('click', async () => {
  const activeTab = qs('.tab.active');
  const role = activeTab.dataset.role;
  const password = loginPassword.value;
  const username = loginUsername.value;

  if (!password) {
    loginError.textContent = 'PASSWORT EINGEBEN, DU WERTLOSER HUND';
    loginPassword.classList.add('shake');
    setTimeout(() => loginPassword.classList.remove('shake'), 400);
    return;
  }

  let ok = false;
  if (role === 'dom') {
    ok = await loginDom(password);
  } else {
    if (!username) {
      loginError.textContent = 'BENUTZERNAME EINGEBEN, DU NUTZLOSES STÜCK';
      loginUsername.classList.add('shake');
      setTimeout(() => loginUsername.classList.remove('shake'), 400);
      return;
    }
    ok = await loginSub(username, password);
  }

  if (ok) {
    showDashboardView();
  } else {
    loginError.textContent = role === 'dom' ? 'FALSCHES PASSWORT. KRIECH IN DEINEN KÄFIG.' : 'FALSCHER BENUTZERNAME ODER PASSWORT. DU WAGST ES?';
    loginPassword.value = '';
    loginPassword.classList.add('shake');
    setTimeout(() => loginPassword.classList.remove('shake'), 400);
  }
});

loginPassword.addEventListener('keydown', e => { if (e.key === 'Enter') loginBtn.click(); });
loginUsername.addEventListener('keydown', e => { if (e.key === 'Enter') loginBtn.click(); });
logoutBtn.addEventListener('click', logout);

paymentForm.addEventListener('submit', async e => {
  e.preventDefault();
  const amount = inputAmount.value, category = inputCategory.value, description = inputDescription.value.trim(), subId = inputSub.value;
  if (!amount || !category || !description || !subId) {
    formFeedback.textContent = '✕ ALLE FELDER AUSFÜLLEN, DU UNFÄHIGER K N E C H T';
    formFeedback.style.color = 'var(--red)'; return;
  }
  const val = parseFloat(amount);
  if (isNaN(val) || val <= 0) {
    formFeedback.textContent = '✕ KEINE GÜLTIGE ZAHL! WILLST DU MICH VERARSCHEN?';
    formFeedback.style.color = 'var(--red)'; return;
  }
  formFeedback.textContent = 'TRAGE EIN...'; formFeedback.style.color = 'var(--text-dim)';
  const btn = qs('.btn--primary[type="submit"]', paymentForm); btn.disabled = true; btn.textContent = '...';
  const ok = await addPayment(amount, category, description, subId, inputDate.value);
  btn.disabled = false; btn.textContent = 'ZAHLUNG EINTRAGEN';
  if (ok) {
    inputAmount.value = ''; inputCategory.value = ''; inputDescription.value = ''; inputDate.value = '';
    formFeedback.textContent = '✓ GEBUCHT. SEIN GELD FLIESST ZU DIR.';
    formFeedback.style.color = 'var(--green)';
    showToast('Zahlung erfolgreich eingetragen', 'success');
    setTimeout(() => { formFeedback.textContent = ''; }, 4000);
  } else {
    formFeedback.textContent = 'FEHLER: ZAHLUNG NICHT GESPEICHERT!';
    formFeedback.style.color = 'var(--red)';
    showToast('Zahlung fehlgeschlagen', 'error');
  }
});

subForm.addEventListener('submit', async e => {
  e.preventDefault();
  const username = subUsername.value.trim(), password = subPassword.value.trim(), display = subDisplay.value.trim();
  if (!username || !password) {
    subFeedback.textContent = '✕ BENUTZERNAME + PASSWORT EINGEBEN!';
    subFeedback.style.color = 'var(--red)'; return;
  }
  if (subs.some(s => s.active !== false && s.username === username.toLowerCase())) {
    subFeedback.textContent = '✕ DIESER BENUTZERNAME EXISTIERT BEREITS!';
    subFeedback.style.color = 'var(--red)'; return;
  }
  const ok = await addSub(username, password, display);
  if (ok) {
    subUsername.value = ''; subPassword.value = ''; subDisplay.value = '';
    subFeedback.textContent = '✓ NEUES SCHWEIN HINZUGEFÜGT!';
    subFeedback.style.color = 'var(--green)';
    showToast('Neues Schwein hinzugefügt', 'success');
    setTimeout(() => { subFeedback.textContent = ''; }, 3000);
  } else {
    subFeedback.textContent = 'FEHLER BEIM HINZUFÜGEN!';
    subFeedback.style.color = 'var(--red)';
    showToast('Fehler beim Hinzufügen', 'error');
  }
});

// =============================================
// INIT
// =============================================
filterSub.addEventListener('change', () => {
  filterSubId = filterSub.value;
  renderPayments();
  updateTotals();
});

(function boot() {
  if (initFirebase()) {
    if (checkSession()) {
      showDashboardView();
    } else {
      showLoginView();
    }
  }
})();
