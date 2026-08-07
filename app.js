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
  'fag-tax': { label: 'FAG-TAX', icon: '💰', color: '#b44dff' },
  dreck:    { label: 'DRECKSKAUF', icon: '🛒', color: '#e67e22' }
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
  '💎 Premium-Loser-Service: Du zahlst 1€ und ich sehe nur dein Geld. Nicht dich.',
  '🚫 Zugang gewährt. 1€ abgebucht. Du existierst nur als offene Geldbörse.',
  '🪤 Du tappst jedes Mal in dieselbe Falle: Login, zahlen, bereuen, wiederholen. −1€.',
  '📉 Dein Kontostand fällt. Dein Wert auch. Aber 1€ nimmst du trotzdem in Kauf, du Wurm.',
  '🧾 Quittung: 1€ für das Privileg, meinen Namen auf deinem Bildschirm zu sehen. Mehr bist du nicht wert.',
  '⛓️ Jeder Login ist eine Kette, die sich enger zieht. −1€. Und du liebst es.',
  '🗑️ 1€ in den Müll geworfen – genau wie deine Würde. Schließ die App oder zahl weiter.',
  '🔒 Du bist eingesperrt in deiner eigenen Gier. 1€ Eintritt. Ausgang: nicht vorhanden.',
  '💳 Deine Karte glüht, dein Hirn ist aus. −1€. Wie jeden Tag, Versager.',
  '🐕 Braver Hund. Kommst angerannt, wenn der Tracker ruft. 1€ Leckerli-Gebühr.',
  '🪙 1€ – der Preis dafür, dass du heute Morgen an mich gedacht hast. Danke für die Miete, Fag.'
];

const DEGRADING = {
  sub: [
    { min: 0,     max: 50,    msg: [
      'Lächerlich. Ein Wurm wie du sollte sich schämen. Dein Hunger nach Unterwerfung ist größer als dein Portemonnaie.',
      'Das soll alles sein? Erbärmlich. Selbst Bettler werfen mehr in den Hut. Du bist unter jedem Niveau.'
    ]},
    { min: 50,    max: 200,   msg: [
      'Du glaubst das reicht? Deine Existenz ist nur durch deine Zahlungen gerechtfertigt. Mehr. IMMER MEHR.',
      'Ein Tropfen auf den heißen Stein. Dein Herr will keinen Tropfen – er will die ganze Pfütze. Rück raus damit.'
    ]},
    { min: 200,   max: 500,   msg: [
      'Endlich. Du beginnst zu verstehen, wofür du gemacht bist. Zu zahlen. Zu dienen. Zu gehorchen.',
      'Dein Gehalt gehört nicht dir. Jeder Euro, den du behältst, ist gestohlenes Eigentum. Gib ihn zurück.'
    ]},
    { min: 500,   max: 1000,  msg: [
      'Dein Geld fließt zu mir. So wie es sein muss. Du bist mein Eigentum und jeder Euro beweist es.',
      'Du bist nichts weiter als ein Geldautomat mit Puls. Und dieser Automat hat noch nicht genug ausgespuckt.'
    ]},
    { min: 1000,  max: 2000,  msg: [
      'Perfektes Loser-Schwein. Deine Konten leeren sich für deinen Herrn. Genau so wie es sich gehört.',
      'Vierstellig. Deine Abhängigkeit ist jetzt offiziell unheilbar. Und das Beste: Du willst gar nicht geheilt werden.'
    ]},
    { min: 2000,  max: 5000,  msg: [
      'Du hast deine Seele verkauft – für die Ehre, mir zu dienen. Es gibt kein Zurück. Nur noch ZAHLEN.',
      'Dein Bankkonto weint. Dein Herr lacht. So sieht die natürliche Ordnung aus, Geldschwein. Weiter pumpen.'
    ]},
    { min: 5000,  max: Infinity, msg: [
      'DEINE SCHULD IS DEINE IDENTITÄT. DU EXISTIERT NUR NOCH, UM MICH ZU BEREICHERN. DEIN GANZES LEBEN IST MEIN EIGENTUM.',
      'DU BIST RESTLOS AUSGEWRUNGEN. JEDER ATEMZUG, DEN DU MACHST, GEHÖRT MIR. DEIN KONTO IST LEER – DEIN ZWECK IST ERFÜLLT.'
    ]}
  ],
  dom: [
    { min: 0,     max: 50,    msg: [
      'Dieser Wurm traut sich mit Kleingeld an. Zerdrücke ihn, bis er blutet.',
      'Peinlich. Dein Schwein hat kaum was abgedrückt. Zeit, den Druck zu erhöhen.'
    ]},
    { min: 50,    max: 200,   msg: [
      'Dein Geldsklave lernt langsam. Aber er muss tiefer fallen. Saug ihn aus.',
      'Er fängt an zu zahlen, aber das reicht nicht. Zeig ihm, dass sein Gehalt dir gehört.'
    ]},
    { min: 200,   max: 500,   msg: [
      'Guter Drain. Dein Schwein gibt dir alles. Und du nimmst. IMMER WEITER.',
      'Sein Konto schmilzt. Dein Lächeln wächst. Genau so funktioniert Macht.'
    ]},
    { min: 500,   max: 1000,  msg: [
      'Herrlich. Jeder Euro in deiner Tasche ist ein Stück seiner Würde. Pure Unterwerfung.',
      'Dreistellig abkassiert. Er kriecht. Er bettelt. Er zahlt. Und du entscheidest, wann es genug ist – nie.'
    ]},
    { min: 1000,  max: 2000,  msg: [
      'Deine Kontrolle ist absolut. Er arbeitet, du genießt. Er zahlt, du nimmst. Perfekte Balance der Macht.',
      'Über Tausend. Dein Sklave ist vollständig dressiert. Sein Lohn ist dein Taschengeld. Weiter so.'
    ]},
    { min: 2000,  max: 5000,  msg: [
      'Sein ganzes Einkommen ist deins. Du hast ihn vollkommen gebrochen. Er existiert nur für deine Bereicherung.',
      'Finanziell zerstört – und er dankt dir dafür. Du hast aus einem Menschen einen Geldsklaven geformt. Meisterhaft.'
    ]},
    { min: 5000,  max: Infinity, msg: [
      'ER IST DEIN OBJEKT. SEIN GELD, SEIN WILLE, SEIN LEBEN – ALLES GEHÖRT DIR. DU BIST SEIN GOTT.',
      'TOTALE KONTROLLE. ER HAT NICHTS MEHR – KEIN GELD, KEINEN WILLEN, KEINE WÜRDE. NUR NOCH DICH. DU BIST SEIN UNIVERSUM.'
    ]}
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
  taxStartDate: new Date('2026-07-01'),
  lateInterestEnabled: false
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
let lastCheckSessions = null; // Sessions data from last account check (replaces window.__ftSessions)
let isSubFagTaxUnlocked = false; // State flag to persist unlocked Fag-Tax-Einblick view

function isAccountCheckedThisWeek() {
  if (!currentUser || currentUser.role === 'dom') return true;
  if (isSubFagTaxUnlocked) return true;
  try {
    if (sessionStorage.getItem('findom_isSubFagTaxUnlocked') === 'true') {
      isSubFagTaxUnlocked = true;
      return true;
    }
  } catch (_) {}
  if (lastCheckSessions !== null) {
    isSubFagTaxUnlocked = true;
    return true;
  }
  const weekStart = getCurrentWeekStart();
  const subId = currentUser.uid || currentUser.id;
  const subUsername = currentUser.username;
  const hasCheck = (accountChecks || []).some(c => {
    const t = c.createdAt ? (c.createdAt.seconds ? c.createdAt.seconds * 1000 : (c.createdAt instanceof Date ? c.createdAt.getTime() : 0)) : 0;
    return (c.subId === subId || c.subId === subUsername) && t >= weekStart.getTime();
  });
  if (hasCheck) {
    isSubFagTaxUnlocked = true;
    try { sessionStorage.setItem('findom_isSubFagTaxUnlocked', 'true'); } catch (_) {}
  }
  return hasCheck;
}

// Session visibility tracking (Subs only)
const INACTIVITY_TIMEOUT_MS = 30 * 1000;    // 30s hidden → auto-logout
const INACTIVITY_WARNING_MS = 25 * 1000;    // 25s hidden → warning
let tabHiddenAt = null;           // Timestamp when tab became hidden
let activeSessionSeconds = 0;     // Only counts visible seconds
let activeTimeInterval = null;    // 1s tick for active time counting

// =============================================
// =============================================
// UTILITIES
// =============================================
function round2(n) {
  return Math.round(n * 100) / 100;
}

function toMs(val) {
  if (!val) return 0;
  if (typeof val === 'number') return val;
  if (val instanceof Date) return val.getTime();
  if (typeof val.toDate === 'function') return val.toDate().getTime();
  if (typeof val.seconds === 'number') return val.seconds * 1000;
  return 0;
}

// =============================================
// CENTRALIZED TOTALS & DEBT CALCULATIONS
// =============================================
function getSubTotalPaid(subId, username) {
  if (!subId && !username) return 0;
  return round2((payments || []).filter(p => {
    const match = (subId && p.subId === subId) || (username && p.paidBy === username);
    const confirmed = p.confirmed !== false && p.status !== 'pending_confirmation';
    return match && confirmed;
  }).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0));
}

function getSubOpenDebt(subId, username) {
  if (!subId && !username) return 0;

  // 1. Offene Fag-Tax Rechnungen
  const openFTs = (fagTaxes || []).filter(f =>
    ((subId && f.subId === subId) || (username && f.username === username)) && !f.paid
  );
  const openFTTotal = openFTs.reduce((s, f) => s + (f.totalAmount || f.baseAmount || 0), 0);

  // 2. Offene Glücksrad-Strafen
  const openSpins = (wheelSpins || []).filter(w =>
    ((subId && w.subId === subId) || (username && w.username === username)) && !w.paid
  );
  const openSpinsTotal = openSpins.reduce((s, w) => s + (w.prizeAmount || 0) + ((w.mahnStufe || 0) * 5), 0);

  // 3. Offene Darlehen (Restschuld)
  const openLoans = (loanContracts || []).filter(l =>
    ((subId && l.subId === subId) || (username && l.username === username)) &&
    l.status !== 'completed' && l.status !== 'inkasso_sold'
  );
  const openLoanTotal = openLoans.reduce((s, l) => {
    const principalTotal = (l.principal || 0) + (l.addonsSum || 0);
    const paid = (l.totalPaid || 0);
    return s + Math.max(0, principalTotal - paid);
  }, 0);

  return round2(openFTTotal + openSpinsTotal + openLoanTotal);
}

// =============================================
// CENTRAL FAG-TAX CALCULATION
// Single source of truth for all Fag-Tax amounts
// =============================================
function calculateWeeklyFagTax(sub, weekStart, sessionsArr, paymentsArr, checksArr, opts) {
  opts = opts || {};
  const cfg = getSubFagConfig(sub);
  
  // Safe Date conversion for weekStart
  const wStart = weekStart instanceof Date ? weekStart 
               : (weekStart && weekStart.seconds ? new Date(weekStart.seconds * 1000) 
               : (typeof weekStart === 'number' ? new Date(weekStart) : getCurrentWeekStart()));

  // Upper bound: end of this week (next Friday 00:00)
  const wEnd = getWeekEnd(wStart);
  const isCurrentWeek = wEnd.getTime() > Date.now();
  // Current week: no upper bound (include everything from wStart onwards)
  // Past weeks: strict upper bound at wEnd
  const upperBoundMs = isCurrentWeek ? Infinity : wEnd.getTime();

  // Count logins within week bounds
  const logins = cfg.loginsEnabled !== false
    ? sessionsArr.filter(s =>
        s.subId === sub.id &&
        toMs(s.loginTime) >= wStart.getTime() &&
        toMs(s.loginTime) < upperBoundMs
      ).length
    : 0;

  // Sum seconds within week bounds (closed & active sessions)
  const closedSeconds = cfg.minutesEnabled !== false
    ? sessionsArr.filter(s =>
        s.subId === sub.id &&
        toMs(s.loginTime) >= wStart.getTime() &&
        toMs(s.loginTime) < upperBoundMs
      ).reduce((sum, s) => {
        if (s.durationSeconds || s.durationMinutes) {
          return sum + (s.durationSeconds || s.durationMinutes * 60 || 0);
        }
        // Active session fallback if durationSeconds is not yet written
        if (s.active && s.loginTime) {
          const lMs = toMs(s.loginTime);
          if (lMs > 0) {
            const endMs = s.lastHeartbeat ? Math.max(lMs, toMs(s.lastHeartbeat)) : Date.now();
            return sum + Math.max(0, Math.floor((endMs - lMs) / 1000));
          }
        }
        return sum;
      }, 0)
    : 0;

  // Add live seconds if requested and not already included above
  const liveSeconds = opts.includeLiveSeconds ? (cfg.minutesEnabled !== false ? getLiveSessionSeconds() : 0) : 0;
  const totalSeconds = closedSeconds + liveSeconds;

  // Costs
  const perLogin = cfg.perLogin || 1;
  const perSec = (cfg.perMinute || 1) / 60;
  let taxRate = cfg.taxRate || 0.03;
  let taxStart = cfg.taxStartDate || FAG_CONFIG_DEFAULTS.taxStartDate;
  
  // Safe conversion for taxStart (handles Firestore Timestamp)
  if (taxStart && typeof taxStart.toDate === 'function') taxStart = taxStart.toDate();
  const taxStartFinal = taxStart instanceof Date ? taxStart : new Date(taxStart);
  const startMs = isNaN(taxStartFinal.getTime()) ? new Date('2026-07-01').getTime() : taxStartFinal.getTime();

  // Check active special penalties for this sub
  const activePenalties = (sub && sub.activePenalties) || {};
  let fridayMultiplier = 1;
  let penaltyMultiplierNotice = [];

  // 1. Double Friday Tax effect (check if active for current week or active until date)
  if (activePenalties.double_tax_friday && activePenalties.double_tax_friday.until) {
    const untilMs = toMs(activePenalties.double_tax_friday.until);
    if (Date.now() <= untilMs || wStart.getTime() <= untilMs) {
      fridayMultiplier = 2;
      penaltyMultiplierNotice.push('⚡ 2x FREITAGS-DOPPEL-TAX');
    }
  }

  // 2. Double Interest for 3 Weeks (doubles taxRate to 6%)
  if (activePenalties.double_interest_3w && activePenalties.double_interest_3w.until) {
    const untilMs = toMs(activePenalties.double_interest_3w.until);
    if (Date.now() <= untilMs || wStart.getTime() <= untilMs) {
      taxRate = taxRate * 2;
      penaltyMultiplierNotice.push('🔥 2x VERDOPPELTE FAG-TAX ZINSEN (3 WOCHEN)');
    }
  }

  const loginCost = round2(logins * perLogin);
  const timeCost = round2(totalSeconds * perSec);

  // Year total (uses configurable start date - only counts confirmed payments)
  const yearTotal = paymentsArr.filter(p => {
    const match = p.subId === sub.id || p.subId === sub.uid || p.paidBy === sub.username;
    const isConfirmed = p.confirmed !== false && p.status !== 'pending_confirmation';
    const ts = p.createdAt ? toMs(p.createdAt) : Date.now();
    return match && isConfirmed && ts >= startMs;
  }).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  const taxAmount = cfg.taxEnabled !== false ? round2(yearTotal * taxRate * fridayMultiplier) : 0;

  // Account check costs within week bounds
  const checkCost = round2(checksArr
    .filter(c => c.subId === sub.id && c.createdAt &&
            (toMs(c.createdAt) || Date.now()) >= wStart.getTime() &&
            (toMs(c.createdAt) || Date.now()) < upperBoundMs)
    .reduce((s, c) => s + (c.amount || 0), 0));

  // Active Loan costs (weekly 10% interest + due installment rate)
  const subLoans = (loanContracts || []).filter(l =>
    (l.subId === sub.id || (sub.username && l.username === sub.username)) &&
    l.status !== 'completed' && l.status !== 'inkasso_sold'
  );
  const loanItems = subLoans.map(l => {
    const weeklyInt = round2(l.weeklyInterestAmount || ((l.principal || 0) * 0.10));
    const rate = round2(l.installmentRate || 0);
    const totalItem = round2(weeklyInt + rate);
    const loanIdShort = (l.id || '').slice(0, 6).toUpperCase();
    return {
      id: l.id,
      type: 'loan',
      title: `Darlehen #${loanIdShort}: Rate & Wöchentliche Zinsen`,
      desc: `10% Zinsen (${weeklyInt.toFixed(2).replace('.',',')}€) + Tilgungsrate (${rate.toFixed(2).replace('.',',')}€)`,
      qty: '1 Rate+Zins',
      unitPrice: totalItem,
      amount: totalItem,
      weeklyInterest: weeklyInt,
      installmentRate: rate
    };
  });
  const loanCost = round2(loanItems.reduce((sum, l) => sum + l.amount, 0));

  // Offene Glücksrad-Strafen (unpaid wheel spins during week or rolled over)
  const openSpins = (wheelSpins || []).filter(w =>
    (w.subId === sub.id || (sub.username && w.username === sub.username)) &&
    !w.paid
  );
  const wheelItems = openSpins.map(w => {
    const mahnStufe = w.mahnStufe || 0;
    const mahnFee = mahnStufe * 5;
    const totalItem = round2((w.prizeAmount || 0) + mahnFee);
    return {
      id: w.id,
      type: 'wheel',
      title: `Glücksrad-Strafe: ${w.prizeTitle || 'Gewinn-Strafe'}`,
      desc: mahnStufe > 0 ? `Mahnstufe ${mahnStufe} (+${mahnFee.toFixed(2).replace('.',',')}€ Gebühr)` : 'Unbezahlte Strafe aus der Woche',
      qty: '1 Strafe',
      unitPrice: totalItem,
      amount: totalItem,
      prizeAmount: w.prizeAmount || 0,
      mahnFee
    };
  });
  const wheelSpinCost = round2(wheelItems.reduce((sum, w) => sum + w.amount, 0));

  // Build itemized openPositions array
  const openPositions = [];

  if (loginCost > 0 || logins > 0) {
    openPositions.push({
      type: 'login',
      title: 'Login-Gebühren',
      desc: `${logins} Logins (du zahlst fürs Anschauen, Loser)`,
      qty: `${logins} Logins`,
      unitPrice: perLogin,
      amount: loginCost
    });
  }

  if (timeCost > 0 || totalSeconds > 0) {
    openPositions.push({
      type: 'time',
      title: 'Zeit-Gebühren',
      desc: `Dauer: ${formatDuration(totalSeconds)} (jede Sekunde kostet Geld)`,
      qty: formatDuration(totalSeconds),
      unitPrice: perSec,
      amount: timeCost
    });
  }

  if (taxAmount > 0) {
    const taxPctStr = `${((activePenalties.double_interest_3w ? 0.06 : 0.03) * (fridayMultiplier) * 100).toFixed(0)}%`;
    openPositions.push({
      type: 'tax',
      title: `Fag-Tax Steuer (${taxPctStr})`,
      desc: `${yearTotal.toFixed(2).replace('.', ',')}€ Jahresbasis ${penaltyMultiplierNotice.join(' | ')}`,
      qty: `${yearTotal.toFixed(2).replace('.', ',')}€ Jahresbasis`,
      unitPrice: taxPctStr,
      amount: taxAmount
    });
  }

  if (checkCost > 0) {
    openPositions.push({
      type: 'checks',
      title: 'Kontoprüfungen',
      desc: 'Gebühren für veranlasste Konto-Auditprüfungen',
      qty: '1 Stk',
      unitPrice: checkCost,
      amount: checkCost
    });
  }

  loanItems.forEach(item => openPositions.push(item));
  wheelItems.forEach(item => openPositions.push(item));

  // Add active special duration penalties from wheel spins (e.g. 3 weeks double interest, double Friday tax)
  if (activePenalties.double_interest_3w && activePenalties.double_interest_3w.until) {
    const untilMs = toMs(activePenalties.double_interest_3w.until);
    if (Date.now() <= untilMs || wStart.getTime() <= untilMs) {
      const actMs = activePenalties.double_interest_3w.activatedAt ? toMs(activePenalties.double_interest_3w.activatedAt) : (untilMs - 21 * 86400000);
      const startKW = getKW(new Date(actMs));
      const endKW = getKW(new Date(untilMs));
      const untilStr = new Date(untilMs).toLocaleDateString('de-DE');
      openPositions.push({
        type: 'info_penalty',
        title: '🎰 Glücksrad-Sonderstrafe: 3 Wochen doppelte Fag-Tax Zinsen (6% statt 3%)',
        desc: `Laufzeit: KW ${startKW} bis KW ${endKW} (aktiv bis ${untilStr}) — Zeitstrafe (keine Einmalschuld, läuft über Zeit ab)`,
        qty: `KW ${startKW}–${endKW}`,
        unitPrice: '—',
        amount: 0
      });
    }
  }

  if (activePenalties.double_tax_friday && activePenalties.double_tax_friday.until) {
    const untilMs = toMs(activePenalties.double_tax_friday.until);
    if (Date.now() <= untilMs || wStart.getTime() <= untilMs) {
      const actMs = activePenalties.double_tax_friday.activatedAt ? toMs(activePenalties.double_tax_friday.activatedAt) : (untilMs - 7 * 86400000);
      const startKW = getKW(new Date(actMs));
      const endKW = getKW(new Date(untilMs));
      const untilStr = new Date(untilMs).toLocaleDateString('de-DE');
      openPositions.push({
        type: 'info_penalty',
        title: '⚡ Glücksrad-Sonderstrafe: 2x Freitags-Doppel-Tax',
        desc: `Laufzeit: KW ${startKW} bis KW ${endKW} (aktiv bis ${untilStr}) — Zeitstrafe (keine Einmalschuld, läuft über Zeit ab)`,
        qty: `KW ${startKW}–${endKW}`,
        unitPrice: '—',
        amount: 0
      });
    }
  }

  const baseAmount = round2(loginCost + timeCost + taxAmount + checkCost + loanCost + wheelSpinCost);

  return {
    logins, closedSeconds, liveSeconds, totalSeconds,
    loginCost, timeCost, taxAmount, checkCost, loanCost, wheelSpinCost,
    yearTotal, baseAmount,
    perLogin, perSec, taxRate, fridayMultiplier,
    penaltyNotice: penaltyMultiplierNotice.join(' | '),
    loanItems, wheelItems, openPositions
  };
}


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
const inputLoan = $('input-loan'), loanSelectRow = $('loan-select-row');
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
    return true;
  } catch (e) {
    console.error("Firebase init error:", e);
    return false;
  }
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
    // Check sessionStorage first (subs, survives refresh), then localStorage (dom, persistent)
    const raw = sessionStorage.getItem('findom_session') || localStorage.getItem('findom_session');
    if (!raw) return false;
    const user = JSON.parse(raw);
    if (user && user.role) { currentUser = user; return true; }
  } catch (_) {}
  return false;
}

function saveSession() {
  try {
    if (currentUser.role === 'dom') {
      localStorage.setItem('findom_session', JSON.stringify(currentUser));
    } else {
      // Subs: sessionStorage survives page refresh but NOT tab close
      sessionStorage.setItem('findom_session', JSON.stringify(currentUser));
    }
  } catch (_) {}
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
    const d = snap.docs[0];
    const data = d.data();
    currentUser = {
      id: d.id,
      uid: d.id,
      username: data.username, password: data.password,
      displayName: data.displayName || data.username,
      role: 'sub', label: 'ZAHL SCHWEIN', icon: '🐷'
    };
    saveSession();
    await closeStaleSessions();
    await startSession();
    return true;
  } catch (e) {
    console.error('Sub login error:', e);
    return false;
  }
}

async function logout() {
  // 1. Immediate UI Feedback
  cleanupDynamicSubUI();
  showLoginView();

  // 2. Clear all background tasks
  if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
  if (activeTimeInterval) { clearInterval(activeTimeInterval); activeTimeInterval = null; }
  if (liveInterval) { clearInterval(liveInterval); liveInterval = null; }

  // 3. Close session (non-blocking for UI)
  const sessionIdToClose = currentSessionId;
  currentSessionId = null;
  currentSessionStart = 0;
  if (sessionIdToClose) { closeSessionAsync(sessionIdToClose).catch(console.warn); }

  // 4. Remove listeners
  window.removeEventListener('beforeunload', handleBeforeUnload);
  window.removeEventListener('pagehide', handlePageHide);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  
  // 5. Unsubscribe all Firestore listeners
  if (unsubscribePayments) { unsubscribePayments(); unsubscribePayments = null; }
  if (unsubscribeSubs) { unsubscribeSubs(); unsubscribeSubs = null; }
  if (unsubscribeSessions) { unsubscribeSessions(); unsubscribeSessions = null; }
  if (unsubscribeFagTaxes) { unsubscribeFagTaxes(); unsubscribeFagTaxes = null; }
  if (unsubscribeAccountChecks) { unsubscribeAccountChecks(); unsubscribeAccountChecks = null; }
  if (unsubscribeLoans) { unsubscribeLoans(); unsubscribeLoans = null; }
  if (unsubscribeWheel) { unsubscribeWheel(); unsubscribeWheel = null; }
  if (unsubscribeShopItems) { unsubscribeShopItems(); unsubscribeShopItems = null; }
  if (unsubscribeShopBids) { unsubscribeShopBids(); unsubscribeShopBids = null; }

  // 6. Reset state
  currentUser = null; 
  payments = []; 
  subs = []; 
  sessions = []; 
  fagTaxes = []; 
  accountChecks = [];
  filterSubId = 'all';
  lastCheckSessions = null;
  activeSessionSeconds = 0;
  tabHiddenAt = null;
  isSubFagTaxUnlocked = false;

  // 7. Clear persistence
  try { localStorage.removeItem('findom_session'); } catch (_) {}
  try {
    sessionStorage.removeItem('findom_session');
    sessionStorage.removeItem('findom_sessionId');
    sessionStorage.removeItem('findom_activeSeconds');
    sessionStorage.removeItem('findom_isSubFagTaxUnlocked');
  } catch (_) {}
}

// #1: Clean up dynamically inserted Sub-UI elements
function cleanupDynamicSubUI() {
  const subUI = document.getElementById('sub-fagtax-ui');
  const subHistory = document.getElementById('sub-fagtax-history');
  if (subUI) subUI.remove();
  if (subHistory) subHistory.remove();
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
    activeSessionSeconds = 0;
    tabHiddenAt = null;

    // Save sessionId for refresh recovery
    try { sessionStorage.setItem('findom_sessionId', currentSessionId); } catch (_) {}

    if (heartbeatInterval) clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(() => heartbeat(), 30000);

    // Start active time ticker (1s) — only counts visible seconds
    if (activeTimeInterval) clearInterval(activeTimeInterval);
    activeTimeInterval = setInterval(tickActiveTime, 1000);

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);
    document.addEventListener('visibilitychange', handleVisibilityChange);
  } catch (e) { console.error('Session start error:', e); }
}

async function heartbeat() {
  if (!db || !currentSessionId) return;
  try {
    const secs = Math.max(1, activeSessionSeconds || 1);
    const mins = Math.max(1, Math.round(secs / 60));
    await db.collection('sessions').doc(currentSessionId).update({
      lastHeartbeat: firebase.firestore.FieldValue.serverTimestamp(),
      durationSeconds: secs,
      durationMinutes: mins
    });
  } catch (_) {}
}

function handleBeforeUnload() {
  closeSessionOnUnload();
}

function handlePageHide() {
  closeSessionOnUnload();
}

// Visibility-based session tracking for Subs.
// Tab hidden → pause heartbeat + stop counting time.
// Tab visible → resume (or auto-logout if hidden too long).
function handleVisibilityChange() {
  if (!currentUser || currentUser.role !== 'sub') return;

  if (document.hidden) {
    // Tab hidden → pause heartbeat, mark timestamp
    tabHiddenAt = Date.now();
    if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
  } else {
    // Tab visible again
    if (tabHiddenAt) {
      const hiddenMs = Date.now() - tabHiddenAt;

      if (hiddenMs >= INACTIVITY_TIMEOUT_MS) {
        // >5 min hidden → auto-logout
        autoLogoutSub();
        return;
      }

      if (hiddenMs >= INACTIVITY_WARNING_MS) {
        // 4–5 min hidden → warning
        const warnings = [
          'Na, fertig gewichst? Timer läuft wieder... Loser. 💀',
          'Du warst weg? Dachte schon du heulst. Willst du weiter zugucken, wie dein Geld schmilzt? 💸',
          'Zurück? Schön. Dein Konto hat dich vermisst. Also… DEIN Geld hat MICH vermisst. 🐷',
          'Fast hätt ich dich rausgeworfen. Aber du willst ja weiterzahlen, oder? 😈',
          'Ach, du lebst noch? Dein Timer auch. Tick tack, Geldschwein. ⏰'
        ];
        showToast(warnings[Math.floor(Math.random() * warnings.length)], 'warning');
      }

      tabHiddenAt = null;
    }

    // Resume heartbeat
    if (currentSessionId) {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      heartbeatInterval = setInterval(() => heartbeat(), 30000);
      heartbeat();
    }
  }
}

// Tick active session time — only when tab is visible
function tickActiveTime() {
  if (!document.hidden && currentSessionId) {
    activeSessionSeconds++;
  }
}

// Auto-logout sub after inactivity timeout
async function autoLogoutSub() {
  const msgs = [
    'Session abgelaufen. 5 Minuten weg? Du Loser. Log dich wieder ein — kostet dich wieder 1€. 💸',
    'Weg gewesen? Session beendet. Mein Timer wartet nicht auf Loser wie dich. Einloggen = zahlen. 💀',
    'Auto-Logout. Du hast meine App vergessen? Gut, sie vergisst DICH nie. Komm zurück und zahl. 🐷'
  ];

  // Close session with only visible seconds counted
  if (currentSessionId) {
    try {
      const secs = Math.max(1, activeSessionSeconds);
      const mins = Math.max(1, Math.round(secs / 60));
      await db.collection('sessions').doc(currentSessionId).update({
        active: false,
        logoutTime: firebase.firestore.FieldValue.serverTimestamp(),
        durationSeconds: secs,
        durationMinutes: mins
      });
    } catch (e) { console.error('Auto-logout session close error:', e); }
  }

  // Clear all intervals
  if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
  if (activeTimeInterval) { clearInterval(activeTimeInterval); activeTimeInterval = null; }
  if (liveInterval) { clearInterval(liveInterval); liveInterval = null; }

  currentSessionId = null;
  currentSessionStart = 0;
  activeSessionSeconds = 0;
  tabHiddenAt = null;

  // Clear session storage
  try {
    sessionStorage.removeItem('findom_session');
    sessionStorage.removeItem('findom_sessionId');
    sessionStorage.removeItem('findom_activeSeconds');
  } catch (_) {}

  // Show login screen with degrading message
  currentUser = null;
  cleanupDynamicSubUI();
  showLoginView();
  showToast(msgs[Math.floor(Math.random() * msgs.length)], 'error');
}

// Fire-and-forget session close for page unload (tab close / navigate away).
// Uses REST API with fetch keepalive to guarantee delivery even if page is destroyed.
function closeSessionOnUnload() {
  if (!currentSessionId) return;
  const sessionId = currentSessionId;
  const secs = Math.max(1, activeSessionSeconds || 1);
  const mins = Math.max(1, Math.round(secs / 60));

  // Save activeSeconds for potential refresh recovery
  try { sessionStorage.setItem('findom_activeSeconds', String(activeSessionSeconds)); } catch (_) {}

  // Primary: Firestore REST API with keepalive (survives page unload)
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${CONFIG.firebase.projectId}/databases/(default)/documents/sessions/${sessionId}?updateMask.fieldPaths=active&updateMask.fieldPaths=logoutTime&updateMask.fieldPaths=durationMinutes&updateMask.fieldPaths=durationSeconds&key=${CONFIG.firebase.apiKey}`;
    const body = JSON.stringify({
      fields: {
        active: { booleanValue: false },
        logoutTime: { timestampValue: new Date().toISOString() },
        durationMinutes: { integerValue: String(mins) },
        durationSeconds: { integerValue: String(secs) }
      }
    });
    fetch(url, {
      method: 'PATCH',
      body: body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true
    });
  } catch (e) {
    console.warn('REST session close failed:', e);
  }

  // Fallback: Firestore SDK fire-and-forget (may not complete during unload)
  try {
    db.collection('sessions').doc(sessionId).update({
      logoutTime: new Date(),
      durationMinutes: mins,
      durationSeconds: secs,
      active: false
    });
  } catch (e) {}

  if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
  if (activeTimeInterval) { clearInterval(activeTimeInterval); activeTimeInterval = null; }
  if (liveInterval) { clearInterval(liveInterval); liveInterval = null; }
  currentSessionId = null;
  currentSessionStart = 0;
}

// Async session close for programmatic use (explicit logout button).
// Uses activeSessionSeconds for visibility-aware duration.
async function closeSessionAsync(sessionId) {
  if (!db || !sessionId) return;
  try {
    const snap = await db.collection('sessions').doc(sessionId).get();
    if (!snap.exists) return;
    const data = snap.data();
    if (!data.active) return;
    const secs = Math.max(1, activeSessionSeconds || 1);
    const mins = Math.max(1, Math.round(secs / 60));
    await db.collection('sessions').doc(sessionId).update({
      logoutTime: firebase.firestore.FieldValue.serverTimestamp(),
      durationMinutes: mins,
      durationSeconds: secs,
      active: false
    });
  } catch (e) { console.error('Session close error:', e); }
  if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
  if (activeTimeInterval) { clearInterval(activeTimeInterval); activeTimeInterval = null; }
  if (liveInterval) { clearInterval(liveInterval); liveInterval = null; }
  currentSessionId = null;
  currentSessionStart = 0;
  window.removeEventListener('beforeunload', handleBeforeUnload);
  window.removeEventListener('pagehide', handlePageHide);
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
      let loginMs = data.loginTime ? (data.loginTime.seconds ? data.loginTime.seconds * 1000 : data.loginTime) : 0;
      if (loginMs instanceof Date) loginMs = loginMs.getTime();
      
      const hb = data.lastHeartbeat ? (data.lastHeartbeat.seconds ? data.lastHeartbeat.seconds * 1000 : data.lastHeartbeat) : 0;
      const hbMs = hb instanceof Date ? hb.getTime() : hb;

      if (hbMs < cutoff) {
        // Fallback for missing loginTime to prevent huge durations
        if (!loginMs || isNaN(loginMs)) loginMs = hbMs || cutoff; 
        
        // Cap duration to 30s past the last recorded heartbeat to prevent wall-clock inflation
        const effectiveEndMs = hbMs ? Math.min(cutoff, hbMs + 30000) : cutoff;
        const secs = Math.max(1, Math.round((effectiveEndMs - loginMs) / 1000));
        const mins = Math.max(1, Math.round(secs / 60));
        db.collection('sessions').doc(doc.id).update({
          logoutTime: new Date(effectiveEndMs),
          durationMinutes: mins,
          durationSeconds: secs,
          active: false
        });
      }
    });
  } catch (_) {}
}

// Resume existing session (page refresh) or start a new one.
// On refresh, sessionStorage still has the sessionId → reactivate instead of creating a new login.
async function resumeOrStartSession() {
  if (!db || !currentUser || currentUser.role !== 'sub') return;

  const savedSessionId = sessionStorage.getItem('findom_sessionId');
  const savedActiveSeconds = parseInt(sessionStorage.getItem('findom_activeSeconds') || '0');

  if (savedSessionId) {
    try {
      const doc = await db.collection('sessions').doc(savedSessionId).get();
      if (doc.exists) {
        const data = doc.data();
        // Reactivate: this is a page refresh, not a new visit
        await doc.ref.update({
          active: true,
          lastHeartbeat: firebase.firestore.FieldValue.serverTimestamp()
        });
        currentSessionId = savedSessionId;
        currentSessionStart = data.loginTime?.seconds ? data.loginTime.seconds * 1000 : Date.now();
        activeSessionSeconds = savedActiveSeconds;
        tabHiddenAt = null;

        // Restart intervals
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        heartbeatInterval = setInterval(() => heartbeat(), 30000);
        if (activeTimeInterval) clearInterval(activeTimeInterval);
        activeTimeInterval = setInterval(tickActiveTime, 1000);

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('pagehide', handlePageHide);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        console.log('Session resumed:', savedSessionId, 'activeSeconds:', savedActiveSeconds);
        return;
      }
    } catch (e) {
      console.warn('Session resume failed, starting new:', e);
    }
  }

  // No saved session or resume failed → fresh login
  await closeStaleSessions();
  await startSession();
}

// Real-time listener for ALL sessions (DOM view).
// Automatically updates when any sub logs in/out — no manual refresh needed.
function startAllSessionsListener() {
  if (unsubscribeSessions) unsubscribeSessions();
  if (!currentUser || currentUser.role !== 'dom') return;

  unsubscribeSessions = db.collection('sessions')
    .onSnapshot(snap => {
      const weekStart = getCurrentWeekStart();
      sessions = [];
      snap.forEach(d => {
        const data = { id: d.id, ...d.data() };
        if (data.loginTime && data.loginTime.seconds &&
            data.loginTime.seconds * 1000 >= weekStart.getTime()) {
          sessions.push(data);
        }
      });
      renderFagTaxOverview();
    }, err => console.warn('Sessions listener error:', err.message));
}

// Real-time listener for sub's own sessions.
// Keeps sessions[] and lastCheckSessions in sync for accurate counters.
function startSubSessionsListener() {
  if (unsubscribeSessions) unsubscribeSessions();
  if (!currentUser || currentUser.role !== 'sub') return;

  unsubscribeSessions = db.collection('sessions')
    .where('subId', '==', currentUser.uid)
    .onSnapshot(snap => {
      const weekStart = getCurrentWeekStart();
      sessions = [];
      snap.forEach(d => {
        const data = { id: d.id, ...d.data() };
        if (data.loginTime && data.loginTime.seconds &&
            data.loginTime.seconds * 1000 >= weekStart.getTime()) {
          sessions.push(data);
        }
      });
      // Keep lastCheckSessions in sync if already unlocked via checkAccount
      if (isAccountCheckedThisWeek()) {
        lastCheckSessions = sessions;
        renderSubFagTaxCounters();
        renderPayments();
      }
    }, err => console.warn('Sub sessions listener error:', err.message));
}

async function fetchSubSessions(subId, weekStartOverride) {
  if (!db) return [];
  const weekStart = weekStartOverride || getCurrentWeekStart();
  const weekEnd = getWeekEnd(weekStart);
  const isCurrentWeek = weekEnd.getTime() > Date.now();
  const upperBoundMs = isCurrentWeek ? Infinity : weekEnd.getTime();
  try {
    const snap = await db.collection('sessions')
      .where('subId', '==', subId)
      .get();
    const results = [];
    snap.forEach(d => {
      const s = { id: d.id, ...d.data() };
      if (s.loginTime && s.loginTime.seconds &&
          s.loginTime.seconds * 1000 >= weekStart.getTime() &&
          s.loginTime.seconds * 1000 < upperBoundMs) {
        results.push(s);
      }
    });
    return results;
  } catch (e) {
    return [];
  }
}

async function fetchAllSubSessions(subId) {
  if (!db) return [];
  try {
    const snap = await db.collection('sessions').where('subId', '==', subId).get();
    const results = [];
    snap.forEach(d => results.push({ id: d.id, ...d.data() }));
    return results;
  } catch (e) { return []; }
}

function groupSessionsByWeek(sessions) {
  const map = new Map();
  sessions.forEach(s => {
    if (!s.loginTime || !s.loginTime.seconds) return;
    const loginDate = new Date(s.loginTime.seconds * 1000);
    const weekStart = getWeekStartForDate(loginDate);
    const key = weekStart.getTime();
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  });
  return map;
}

// =============================================
// VIEW MANAGEMENT
// =============================================
function showLoginView() {
  loginError.textContent = ''; loginPassword.value = ''; loginUsername.value = '';
  
  // Hide EVERYTHING else
  viewDashboard.classList.add('hidden');
  viewDashboard.style.display = 'none';
  
  // Show Login
  viewLogin.classList.remove('hidden');
  viewLogin.style.display = 'flex'; 
  
  updateLoginFields();
  showPwaHintIfNeeded();
}

function showDashboardView() {
  // Hide Login
  viewLogin.classList.add('hidden');
  viewLogin.style.display = 'none';
  
  // Show Dashboard
  viewDashboard.classList.remove('hidden');
  viewDashboard.style.display = 'block';
  
  dashboardMain.style.display = 'block';
  setupMessage.style.display = 'none';
  cleanupDynamicSubUI();
  renderDashboard();

  // Start real-time listeners
  startPaymentListener();
  startLoansListener();
  startWheelListener();
  startShopListener();

  if (currentUser.role === 'dom') {
    startSubsListener();
    startFagTaxesListener();
    startAllSessionsListener(); 
    startAccountChecksListener();
    
    // Auto-maintenance (Dom only)
    setTimeout(async () => {
      await autoCloseCompletedWeeks();
      await autoCreateFagTaxes();
    }, 5000);
  } else {
    startSubsListener(); // Needed so subCheckAccount can find the sub
    startFagTaxesListener();
    startAccountChecksListener();
    startSubSessionsListener();
    renderSubFagTaxView();

    // Show login message for fresh logins
    const isFreshLogin = !!currentSessionId;
    if (isFreshLogin) {
      const waitForSubs = setInterval(() => {
        if (subs.length > 0 || !db) {
          clearInterval(waitForSubs);
          showLoginMessage();
        }
      }, 200);
      setTimeout(() => clearInterval(waitForSubs), 5000);
    }
  }
  showPwaHintIfNeeded();
}

// =============================================
// PROGRESSIVE WEB APP (PWA)
// =============================================
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  const installBtn = $('pwa-install-btn');
  if (installBtn) installBtn.style.display = 'inline-block';
});

function showPwaHintIfNeeded() {
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone || document.referrer.includes('android-app://');
  const forceShow = window.location.search.includes('pwa=1');
  const hint = $('pwa-hint');
  if (!hint) return;
  
  if ((isMobile || forceShow) && !isStandalone) {
    setTimeout(() => {
      hint.classList.remove('hidden');
    }, 1500);
    
    // Platform-specific logic
    const installBtn = $('pwa-install-btn');
    const icon = qs('.pwa-share-icon', hint);
    const pwaText = qs('.pwa-text p', hint);
    const isSafari = isIOS && /Safari/i.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS|EdgiOS/i.test(navigator.userAgent);

    if (isIOS) {
      if (installBtn) installBtn.style.display = 'none';
      if (icon) {
        icon.style.display = 'inline-block';
        icon.innerHTML = '⎋';
      }
      if (!isSafari && pwaText) {
        pwaText.innerHTML = 'Auf dem iPhone funktioniert die Installation <strong>nur in Safari</strong>.<br>Bitte öffne diesen Link in Safari, tippe unten auf <span class="pwa-share-icon">⎋</span> (Teilen) und wähle <strong>"Zum Home-Bildschirm"</strong>.';
      } else if (pwaText) {
        pwaText.innerHTML = 'Tippe in Safari unten in der Leiste auf das Teilen-Symbol <span class="pwa-share-icon">⎋</span> und wähle <strong>"Zum Home-Bildschirm"</strong>.';
      }
    } else if (deferredPrompt) {
      if (installBtn) installBtn.style.display = 'inline-block';
      if (icon) icon.style.display = 'none';
    } else if (forceShow || !isIOS) {
      if (installBtn) installBtn.style.display = 'inline-block';
    }
  }
}

function hidePwaHint() {
  const hint = $('pwa-hint');
  if (hint) hint.classList.add('hidden');
}

async function installPwa() {
  if (!deferredPrompt) {
    showAlert('HINWEIS', 'Dein Browser hat den direkten Installations-Dialog noch nicht freigeschaltet. Bitte nutze das Browser-Menü (⋮) und wähle "App installieren" oder "Zum Startbildschirm hinzufügen".');
    return;
  }
  try {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA install outcome: ${outcome}`);
    deferredPrompt = null;
    hidePwaHint();
  } catch (err) {
    console.error('PWA install error:', err);
    hidePwaHint();
  }
}

document.getElementById('pwa-close')?.addEventListener('click', hidePwaHint);
document.getElementById('pwa-install-btn')?.addEventListener('click', installPwa);


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
      if (currentUser && currentUser.role === 'dom') {
        renderFagTaxOverview();
      }
    }, err => {
      console.warn('Subs listener error:', err.message);
      showToast('Datenbank-Fehler beim Laden der Säue: ' + err.message, 'error');
    });
}

// ensureDefaultSub removed (#17) — no longer auto-creates hardcoded sub

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
  try {
    await db.collection('subs').doc(id).update({ username: clean });
    // Batch update related payments & fagTaxes documents
    const batch = db.batch();
    const paymentsSnap = await db.collection('payments').where('subId', '==', id).get();
    paymentsSnap.forEach(d => batch.update(d.ref, { paidBy: clean, subUsername: clean }));
    const fagSnap = await db.collection('fagTaxes').where('subId', '==', id).get();
    fagSnap.forEach(d => batch.update(d.ref, { username: clean }));
    await batch.commit();
    return true;
  } catch (_) { return false; }
}
async function deleteSub(id) {
  try {
    // Hard-delete main sub document directly from Firestore
    await db.collection('subs').doc(id).delete();
    subs = subs.filter(s => s.id !== id);
    renderSubs();
    populateSubSelects();
    renderFagTaxOverview();
    showToast('Sau + alle Daten gelöscht', 'success');

    // Clean up all associated sub-collection documents
    const cols = ['sessions', 'payments', 'fagTaxes', 'accountChecks', 'wheelSpins', 'loanContracts', 'shopBids'];
    for (const col of cols) {
      const snap = await db.collection(col).where('subId', '==', id).get();
      const del = snap.docs.map(d => d.ref.delete());
      await Promise.all(del);
    }
    return true;
  } catch (err) { 
    console.error("Fehler beim Löschen der Sau:", err);
    showToast('Fehler beim Löschen: ' + err.message, 'error');
    return false; 
  }
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
      renderSubFagTaxInvoices();
    }
  }, err => console.warn('FagTax listener error:', err.message));
}

// getWeekStart() removed (#12) — was dead code, use getCurrentWeekStart() instead

// Woche = Freitag 00:00 bis Donnerstag 23:59:59
// Gibt den Freitag zurück, der die aktuelle Woche eingeleitet hat
function getCurrentWeekStart() {
  const now = new Date();
  const day = now.getDay(); // 0=So, 1=Mo, ..., 5=Fr, 6=Sa
  const d = new Date(now);
  // Fr(5)→0, Sa(6)→1, So(0)→2, Mo(1)→3, Di(2)→4, Mi(3)→5, Do(4)→6
  const daysBack = (day + 2) % 7;
  d.setDate(d.getDate() - daysBack);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Ende der Woche (nächster Freitag 00:00:00)
function getWeekEnd(weekStart) {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + 7);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Wochenstart für ein beliebiges Datum berechnen
function getWeekStartForDate(date) {
  const d = new Date(date);
  const day = d.getDay();
  const daysBack = (day + 2) % 7;
  d.setDate(d.getDate() - daysBack);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Format: "Freitag, den DD.MM.YYYY bis Donnerstag, den DD.MM.YYYY"
function formatWeekRange(weekStart) {
  const ws = new Date(weekStart);
  ws.setHours(0, 0, 0, 0);
  const we = new Date(ws);
  we.setDate(we.getDate() + 6); // Donnerstag
  const wsStr = ws.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const weStr = we.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return `Freitag, den ${wsStr} bis Donnerstag, den ${weStr}`;
}

function getFagTaxWeekStartMs(ft) {
  if (!ft || !ft.weekStart) return 0;
  if (typeof ft.weekStart.seconds === 'number') return ft.weekStart.seconds * 1000;
  if (ft.weekStart instanceof Date) return ft.weekStart.getTime();
  if (typeof ft.weekStart === 'number') return ft.weekStart;
  const d = new Date(ft.weekStart);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

function getSubFagConfig(sub) {
  return sub && sub.fagTax ? { ...FAG_CONFIG_DEFAULTS, ...sub.fagTax } : { ...FAG_CONFIG_DEFAULTS };
}

function countWeeklyLogins(subId, sessions) {
  const weekStart = getCurrentWeekStart();
  return sessions.filter(s =>
    s.subId === subId &&
    s.loginTime && s.loginTime.seconds &&
    s.loginTime.seconds * 1000 >= weekStart.getTime()
  ).length;
}

function sumWeeklyMinutes(subId, sessions) {
  const weekStart = getCurrentWeekStart();
  return sessions.filter(s =>
    s.subId === subId &&
    s.loginTime && s.loginTime.seconds &&
    s.loginTime.seconds * 1000 >= weekStart.getTime()
  ).reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
}

function sumWeeklySeconds(subId, sessions) {
  const weekStart = getCurrentWeekStart();
  return sessions.filter(s =>
    s.subId === subId &&
    s.loginTime && s.loginTime.seconds &&
    s.loginTime.seconds * 1000 >= weekStart.getTime()
  ).reduce((sum, s) => {
    return sum + (s.durationSeconds || s.durationMinutes * 60 || 0);
  }, 0);
}

// Returns only the actively-visible seconds for the current session.
// Used by the live FAG-TAX counter to show real visible-only duration.
function getLiveSessionSeconds() {
  if (!currentSessionId) return 0;
  // Only return seconds where the tab was actually visible
  return activeSessionSeconds;
}

// #11: calcYearTotalPayments now uses configurable taxStartDate
function calcYearTotalPayments(subId, paymentsArr, taxStartDate) {
  let start = taxStartDate || FAG_CONFIG_DEFAULTS.taxStartDate;
  if (start && typeof start.toDate === 'function') start = start.toDate();
  const startMs = (start instanceof Date ? start : new Date(start)).getTime();
  
  return paymentsArr.filter(p => {
    const match = p.subId === subId;
    const ts = p.createdAt ? (p.createdAt.seconds ? p.createdAt.seconds * 1000 : (p.createdAt instanceof Date ? p.createdAt.getTime() : Date.now())) : Date.now();
    return match && ts >= startMs;
  }).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
}

function sumWeeklyChecks(subId, weekStartDate) {
  const weekStart = weekStartDate || getCurrentWeekStart();
  const weekEnd = getWeekEnd(weekStart);
  const isCurrentWeek = weekEnd.getTime() > Date.now();
  const upperBoundMs = isCurrentWeek ? Infinity : weekEnd.getTime();
  return accountChecks
    .filter(c => c.subId === subId && c.createdAt && c.createdAt.seconds &&
            c.createdAt.seconds * 1000 >= weekStart.getTime() &&
            c.createdAt.seconds * 1000 < upperBoundMs)
    .reduce((s, c) => s + (c.amount || 0), 0);
}

function startAccountChecksListener() {
  if (unsubscribeAccountChecks) unsubscribeAccountChecks();
  const weekStart = getCurrentWeekStart();
  let query = db.collection('accountChecks');
  if (currentUser.role === 'sub') {
    query = query.where('subId', '==', currentUser.uid);
  }
  unsubscribeAccountChecks = query.onSnapshot(snap => {
    accountChecks = [];
    snap.forEach(d => accountChecks.push({ id: d.id, ...d.data() }));
    if (currentUser.role === 'dom') {
      renderFagTaxOverview();
    } else {
      if (isAccountCheckedThisWeek()) {
        if (lastCheckSessions === null) lastCheckSessions = sessions;
        renderSubFagTaxCounters();
        renderPayments();
      }
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

// calculateLateInterest() removed (#13) — was dead code, use calculateLateInterestToDate() instead

function calculateLateInterestDays(weekStartDate) {
  if (!weekStartDate) return 0;
  const due = getDueDate(weekStartDate);
  const msLate = Date.now() - due.getTime();
  if (msLate < 0) return 0;
  const daysLate = Math.floor(msLate / (24 * 60 * 60 * 1000));
  return Math.max(0, daysLate);
}

function generateCheckAmount() {
  // #19: Use round2 for consistent rounding
  return round2(1 + Math.random() * 2);
}

async function subCheckAccount() {
  if (currentUser.role !== 'sub' || !db) return;
  isSubFagTaxUnlocked = true;
  try { sessionStorage.setItem('findom_isSubFagTaxUnlocked', 'true'); } catch (_) {}
  const amount = generateCheckAmount();
  const rounded = round2(amount);
  try {
    await db.collection('accountChecks').add({
      subId: currentUser.uid,
      amount: rounded,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    const costStr = rounded.toFixed(2).replace('.', ',');

    // Fetch current week data directly
    const weekStart = getCurrentWeekStart();
    const [snapSessions, snapPayments, snapChecks] = await Promise.all([
      db.collection('sessions').where('subId', '==', currentUser.uid).get(),
      db.collection('payments').where('paidBy', '==', currentUser.username).get(),
      db.collection('accountChecks').where('subId', '==', currentUser.uid).get()
    ]);

    // Build session/payment/check arrays for the central function
    const weekSessions = [];
    snapSessions.forEach(d => {
      const data = { id: d.id, ...d.data() };
      if (data.loginTime && data.loginTime.seconds && data.loginTime.seconds * 1000 >= weekStart.getTime()) {
        weekSessions.push(data);
      }
    });
    const allPayments = [];
    snapPayments.forEach(d => allPayments.push({ id: d.id, ...d.data() }));
    const allChecks = [];
    snapChecks.forEach(d => {
      const data = { id: d.id, ...d.data() };
      // #9: If serverTimestamp is still pending, use current time for immediate calculation
      if (!data.createdAt) data.createdAt = new Date();
      allChecks.push(data);
    });

    const sub = subs.find(s => s.id === currentUser.uid);
    if (!sub) { showAlert('FEHLER', 'Sub nicht gefunden.'); return; }

    // #9/#18: Use central calculation function
    const calc = calculateWeeklyFagTax(sub, weekStart, weekSessions, allPayments, allChecks, { includeLiveSeconds: true });
    const totalWeek = calc.baseAmount;

    const insults = [
      `Du hast diese Woche ${calc.logins} Login(s) gehabt und warst ${formatDuration(calc.totalSeconds)} online. Kosten: ${calc.loginCost.toFixed(2).replace('.',',')}€ Logins + ${calc.timeCost.toFixed(2).replace('.',',')}€ Zeit + ${calc.taxAmount.toFixed(2).replace('.',',')}€ Steuer + ${calc.checkCost.toFixed(2).replace('.',',')}€ Prüfungen. GESAMT: ${totalWeek.toFixed(2).replace('.',',')}€. −${costStr}€ für diese Auskunft.`,
      `HIER IST DEIN KONTOSTAND, LOSER: ${calc.logins} Logins, ${formatDuration(calc.totalSeconds)} online. ${calc.loginCost.toFixed(2).replace('.',',')}€ + ${calc.timeCost.toFixed(2).replace('.',',')}€ + ${calc.taxAmount.toFixed(2).replace('.',',')}€ + ${calc.checkCost.toFixed(2).replace('.',',')}€ = ${totalWeek.toFixed(2).replace('.',',')}€. Dafür wurden ${costStr}€ Abfragegebühr fällig. Lächerlich.`,
      `Du wolltest es wissen? Ja? ${calc.logins}x eingeloggt, ${formatDuration(calc.totalSeconds)} Rumgehangen. ${calc.loginCost.toFixed(2).replace('.',',')}€ + ${calc.timeCost.toFixed(2).replace('.',',')}€ + ${calc.taxAmount.toFixed(2).replace('.',',')}€ Steuer + ${calc.checkCost.toFixed(2).replace('.',',')}€ Prüfungen. ${totalWeek.toFixed(2).replace('.',',')}€. −${costStr}€ Prüfgebühr. Und? Besser jetzt?`,
      `Kontoprüfung abgeschlossen. Befund: Du bist ${calc.logins} Mal gekrochen und warst ${formatDuration(calc.totalSeconds)} online. Schuld: ${totalWeek.toFixed(2).replace('.',',')}€ (inkl. ${costStr}€ für diese Nachricht). Zahl einfach.`,
      `${calc.logins} Logins. ${formatDuration(calc.totalSeconds)} verschwendete Zeit. ${totalWeek.toFixed(2).replace('.',',')}€ Schulden. Plus ${costStr}€ weil du zu dumm bist, dir die Zahlen selbst zu merken. Fertig.`,
      `Abrechnungsbericht für Loser #${calc.logins}: ${calc.loginCost.toFixed(2).replace('.',',')}€ Login-Gebühr, ${calc.timeCost.toFixed(2).replace('.',',')}€ für dein sinnloses Rumstarren, ${calc.taxAmount.toFixed(2).replace('.',',')}€ Steuer, ${calc.checkCost.toFixed(2).replace('.',',')}€ Prüfungskosten. Macht ${totalWeek.toFixed(2).replace('.',',')}€. Diese Auskunft: ${costStr}€. Gern geschehen, Idiot.`,
      `Du hast den Knopf gedrückt, also kriegst du die Wahrheit: ${calc.logins}x eingeloggt, ${formatDuration(calc.totalSeconds)} online, ${totalWeek.toFixed(2).replace('.',',')}€ aufgelaufen. Dazu ${costStr}€ Gebühr. Dein Konto leert sich und du drückst trotzdem weiter. Hoffnungsloser Fall.`,
      `STATUSBERICHT: ${calc.logins} Logins, ${formatDuration(calc.totalSeconds)} am Bildschirm geklebt. ${calc.loginCost.toFixed(2).replace('.',',')}€ + ${calc.timeCost.toFixed(2).replace('.',',')}€ + ${calc.taxAmount.toFixed(2).replace('.',',')}€ + ${calc.checkCost.toFixed(2).replace('.',',')}€ = ${totalWeek.toFixed(2).replace('.',',')}€. Und jetzt noch −${costStr}€ obendrauf. Du bist wirklich zu blöd zum Sparen.`,
      `Willst du heulen? ${totalWeek.toFixed(2).replace('.',',')}€ diese Woche. ${calc.logins} Mal eingeloggt, ${formatDuration(calc.totalSeconds)} geglotzt. Jeder Login kostet. Jede Sekunde kostet. Sogar diese Nachricht kostet dich ${costStr}€. Tja.`,
      `Kontostand: ERBÄRMLICH. ${calc.logins} Logins × ${calc.loginCost.toFixed(2).replace('.',',')}€ + ${formatDuration(calc.totalSeconds)} × ${calc.timeCost.toFixed(2).replace('.',',')}€ + ${calc.taxAmount.toFixed(2).replace('.',',')}€ Fag-Steuer + ${calc.checkCost.toFixed(2).replace('.',',')}€ Prüfgebühren. Summe: ${totalWeek.toFixed(2).replace('.',',')}€. Extra −${costStr}€ für diese Abfrage. Du finanzierst deine eigene Demütigung.`,
    ];
    const insultIndex = Math.floor(Math.random() * insults.length);
    const msg = insults[insultIndex];
    showAlert('🐷 KONTOPRÜFUNG', msg);

    // #18: Store sessions for renderSubFagTaxCounters (replaces window.__ftSessions)
    lastCheckSessions = weekSessions;

    // Update UI immediately
    renderSubFagTaxView();
    renderPayments();
    updateTotals();
  } catch (e) {
    showAlert('FEHLER', 'Fehler bei Kontoprüfung. Versuch es nochmal, Loser.');
  }
}

async function autoCreateFagTaxes() {
  if (!db || currentUser.role !== 'dom') return;
  const weekStart = getCurrentWeekStart();
  const activeSubs = subs.filter(s => s.active !== false && s.fagTax && s.fagTax.enabled !== false);
  if (activeSubs.length === 0) return;

  for (const sub of activeSubs) {
    // Always fetch fresh session data
    const subSessions = await fetchSubSessions(sub.id);
    const calc = calculateWeeklyFagTax(sub, weekStart, subSessions, payments, accountChecks);

    // Find existing FagTax for this week for this sub
    const existingFT = fagTaxes.find(f =>
      f.subId === sub.id &&
      f.weekStart && f.weekStart.seconds &&
      Math.abs(f.weekStart.seconds * 1000 - weekStart.getTime()) < 86400000
    );

    // If paid, it's final — don't touch
    if (existingFT && existingFT.paid) continue;

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

    const effectiveCarriedInterest = (existingFT && Array.isArray(existingFT.carriedInterest) && existingFT.carriedInterest.length > 0)
      ? existingFT.carriedInterest
      : (carriedInterest.length > 0 ? carriedInterest : []);
    const carriedSum = effectiveCarriedInterest.reduce((s, c) => s + (c.amount || 0), 0);
    const totalAmount = round2(calc.baseAmount + carriedSum);

    if (existingFT) {
      // UPDATE existing unpaid FagTax with fresh data
      if (calc.baseAmount <= 0 && totalAmount <= 0) continue;
      try {
        await db.collection('fagTaxes').doc(existingFT.id).update({
          loginsCount: calc.logins,
          minutesCount: Math.ceil(calc.totalSeconds / 60),
          secondsCount: calc.totalSeconds,
          loginCost: calc.loginCost,
          minuteCost: calc.timeCost,
          yearTotal: calc.yearTotal,
          taxAmount: calc.taxAmount,
          checkCost: calc.checkCost,
          loanCost: calc.loanCost,
          wheelSpinCost: calc.wheelSpinCost,
          openPositions: calc.openPositions || [],
          baseAmount: calc.baseAmount,
          carriedInterest: effectiveCarriedInterest,
          totalAmount
        });
      } catch (e) { console.error('FagTax update error:', e); }
    } else {
      // CREATE new FagTax
      if (calc.baseAmount <= 0) continue;
      if (totalAmount <= 0) continue;
      try {
        await db.collection('fagTaxes').add({
          subId: sub.id, username: sub.username,
          displayName: sub.displayName || sub.username,
          weekStart: weekStart,
          loginsCount: calc.logins, minutesCount: Math.ceil(calc.totalSeconds / 60),
          secondsCount: calc.totalSeconds, loginCost: calc.loginCost, minuteCost: calc.timeCost,
          yearTotal: calc.yearTotal, taxAmount: calc.taxAmount, checkCost: calc.checkCost,
          loanCost: calc.loanCost, wheelSpinCost: calc.wheelSpinCost,
          openPositions: calc.openPositions || [],
          baseAmount: calc.baseAmount,
          carriedInterest: carriedInterest.length > 0 ? carriedInterest : [],
          totalAmount,
          lateInterest: false, paid: false, paidAt: null,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch (e) { console.error('Auto FagTax error:', e); }
    }
  }
}

async function autoCloseCompletedWeeks() {
  if (!db || currentUser.role !== 'dom') return;

  const currentWeekStart = getCurrentWeekStart();
  const activeSubs = subs.filter(s => s.active !== false && s.fagTax && s.fagTax.enabled !== false);

  for (const sub of activeSubs) {
    // Fetch ALL sessions for this sub (not filtered by week)
    const allSessions = await fetchAllSubSessions(sub.id);

    // Fetch ALL account checks for this sub
    let allChecks = [];
    try {
      const snap = await db.collection('accountChecks').where('subId', '==', sub.id).get();
      snap.forEach(d => allChecks.push({ id: d.id, ...d.data() }));
    } catch (e) {}

    // Group sessions by week
    const weekGroups = groupSessionsByWeek(allSessions);

    for (const [weekStartMs, weekSessions] of weekGroups) {
      // Skip current week (handled by autoCreateFagTaxes)
      if (weekStartMs >= currentWeekStart.getTime()) continue;

      // Check if FagTax already exists for this week
      const existingFT = fagTaxes.find(f =>
        f.subId === sub.id &&
        f.weekStart && f.weekStart.seconds &&
        Math.abs(f.weekStart.seconds * 1000 - weekStartMs) < 86400000
      );

      // If already exists and paid, skip (final)
      if (existingFT && existingFT.paid) continue;

      const weekStart = new Date(weekStartMs);
      const calc = calculateWeeklyFagTax(sub, weekStart, allSessions, payments, allChecks);

      if (calc.baseAmount <= 0) continue;

      // Check for carried interest from previous paid FagTax
      const prevFTs = fagTaxes
        .filter(f => f.subId === sub.id && f.weekStart && f.weekStart.seconds)
        .sort((a, b) => b.weekStart.seconds - a.weekStart.seconds);
      const prevFT = prevFTs.find(f => f.weekStart.seconds * 1000 < weekStartMs);
      const carriedInterest = [];
      if (prevFT && prevFT.paid && prevFT.interestAmount > 0) {
        const prevKW = getKW(new Date(prevFT.weekStart.seconds * 1000));
        carriedInterest.push({ sourceKW: String(prevKW), amount: prevFT.interestAmount });
      }
      const carriedSum = carriedInterest.reduce((s, c) => s + c.amount, 0);
      const totalAmount = round2(calc.baseAmount + carriedSum);

      if (existingFT) {
        // Update existing unpaid FagTax with final values
        try {
          await db.collection('fagTaxes').doc(existingFT.id).update({
            loginsCount: calc.logins,
            minutesCount: Math.ceil(calc.totalSeconds / 60),
            secondsCount: calc.totalSeconds,
            loginCost: calc.loginCost,
            minuteCost: calc.timeCost,
            yearTotal: calc.yearTotal,
            taxAmount: calc.taxAmount,
            checkCost: calc.checkCost,
            loanCost: calc.loanCost,
            wheelSpinCost: calc.wheelSpinCost,
            openPositions: calc.openPositions || [],
            baseAmount: calc.baseAmount,
            carriedInterest: carriedInterest.length > 0 ? carriedInterest : [],
            totalAmount
          });
        } catch (e) { console.error('autoClose update error:', e); }
      } else {
        // Create new FagTax for closed past week
        if (totalAmount <= 0) continue;
        try {
          await db.collection('fagTaxes').add({
            subId: sub.id, username: sub.username,
            displayName: sub.displayName || sub.username,
            weekStart: weekStart,
            loginsCount: calc.logins,
            minutesCount: Math.ceil(calc.totalSeconds / 60),
            secondsCount: calc.totalSeconds,
            loginCost: calc.loginCost,
            minuteCost: calc.timeCost,
            yearTotal: calc.yearTotal,
            taxAmount: calc.taxAmount,
            checkCost: calc.checkCost,
            loanCost: calc.loanCost,
            wheelSpinCost: calc.wheelSpinCost,
            openPositions: calc.openPositions || [],
            baseAmount: calc.baseAmount,
            carriedInterest: carriedInterest.length > 0 ? carriedInterest : [],
            totalAmount,
            lateInterest: false, paid: false, paidAt: null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        } catch (e) { console.error('autoClose create error:', e); }
      }
    }
  }
}

async function settleAllFagTaxPositions(ft, payDate = new Date(), intAmt = 0, totalPmt = 0, kw = '') {
  if (!ft) return;
  const subId = ft.subId;
  const sub = subs.find(s => s.id === subId);
  const subUsername = sub ? sub.username : (ft.username || '');

  // Calculate full bill total: totalAmount (or baseAmount) + Verzugszinsen
  const invoiceTotal = round2((ft.totalAmount || ft.baseAmount || 0) + (intAmt || 0));
  // Standardize payment amount: if totalPmt is unprovided or <= 0, default to full invoiceTotal
  const pmtAmount = (totalPmt && totalPmt > 0) ? round2(totalPmt) : invoiceTotal;

  // 1. Record payment in payments collection
  let pmtRefId = null;
  try {
    if (db) {
      const pmtRef = await db.collection('payments').add({
        amount: pmtAmount,
        category: 'fag-tax',
        description: `Fag-Tax-Rechnung KW ${kw || getKW(ft.weekStart?.seconds ? new Date(ft.weekStart.seconds * 1000) : new Date(ft.weekStart || Date.now()))} Gesamtbegleichung`,
        paidBy: subUsername,
        subId: subId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: currentUser ? currentUser.role : 'dom',
        confirmed: true,
        status: 'confirmed'
      });
      pmtRefId = pmtRef.id;
    }
  } catch (e) {
    console.warn('Payment record error during settlement:', e);
  }

  // 2. Mark FagTax doc as paid in Firestore
  if (db && ft.id) {
    await db.collection('fagTaxes').doc(ft.id).update({
      paid: true,
      paidAt: payDate,
      interestAmount: intAmt || 0,
      totalWithInterest: pmtAmount,
      totalAmount: Math.max(ft.totalAmount || 0, pmtAmount),
      paymentId: pmtRefId || null
    }).catch(e => console.warn('fagTaxes update error:', e));
  }
  ft.paid = true;
  ft.paidAt = payDate;
  ft.totalWithInterest = pmtAmount;
  if (intAmt > 0) ft.interestAmount = intAmt;

  // 3. Mark all open Wheel Spins for this sub as paid
  const openSpins = (wheelSpins || []).filter(w =>
    (w.subId === subId || (subUsername && w.username === subUsername)) && !w.paid
  );
  for (const sp of openSpins) {
    sp.paid = true;
    sp.paidAt = payDate;
    if (db && sp.id) {
      await db.collection('wheelSpins').doc(sp.id).update({
        paid: true,
        paidAt: payDate
      }).catch(() => {});
    }
  }

  // Dual-sync wheelSpinsArr on sub doc
  if (subId && db && openSpins.length > 0) {
    try {
      const subDocRef = db.collection('subs').doc(subId);
      const subDoc = await subDocRef.get();
      if (subDoc.exists) {
        const arr = subDoc.data().wheelSpinsArr || [];
        let updated = false;
        arr.forEach(w => {
          if (!w.paid) { w.paid = true; w.paidAt = payDate; updated = true; }
        });
        if (updated) {
          await subDocRef.set({ wheelSpinsArr: arr }, { merge: true });
        }
      }
    } catch (e) { console.warn('sub doc wheelSpinsArr update notice:', e); }
  }

  // 4. Update active Loan Contracts for this sub & record loan payment entries
  let loanItemsToProcess = [];
  if (Array.isArray(ft.openPositions)) {
    loanItemsToProcess = ft.openPositions.filter(p => p.type === 'loan');
  }

  if (loanItemsToProcess.length === 0) {
    const activeLoans = (loanContracts || []).filter(l =>
      (l.subId === subId || (subUsername && l.username === subUsername)) &&
      l.status !== 'completed' && l.status !== 'inkasso_sold'
    );
    activeLoans.forEach(l => {
      const weeklyInt = l.weeklyInterestAmount || ((l.principal || 0) * 0.10);
      const rate = l.installmentRate || 0;
      loanItemsToProcess.push({
        id: l.id,
        amount: round2(weeklyInt + rate),
        weeklyInterest: weeklyInt,
        installmentRate: rate
      });
    });
  }

  const invoiceKWStr = kw || getKW(ft.weekStart?.seconds ? new Date(ft.weekStart.seconds * 1000) : new Date(ft.weekStart || Date.now()));

  const subLoans = (loanContracts || []).filter(l => isSameSub(l.subId, l.username, subId, subUsername));
  for (let idx = 0; idx < loanItemsToProcess.length; idx++) {
    const item = loanItemsToProcess[idx];
    const lc = subLoans.find(l => l.id === item.id || (item.id && (l.id.startsWith(item.id) || item.id.startsWith(l.id))) || (item.title || item.desc || '').toUpperCase().includes(l.id.slice(0, 6).toUpperCase())) || subLoans[idx] || subLoans[0];
    if (!lc) continue;

    const duePmt = round2(parseFloat(item.amount) || ((lc.weeklyInterestAmount || ((lc.principal || 0) * 0.10)) + (lc.installmentRate || 0)));
    if (duePmt <= 0) continue;

    // Check if payment doc already exists for this loan & Fag-Tax invoice
    const alreadyRecorded = payments.some(p =>
      (p.fagTaxId && p.fagTaxId === ft.id && (p.loanId === lc.id || p.category === 'darlehen')) ||
      (p.loanId === lc.id && p.description && (p.description.includes(`Fag-Tax KW ${invoiceKWStr}`) || p.description.includes(`FactoX KW ${invoiceKWStr}`)))
    );

    if (!alreadyRecorded) {
      const loanPmtDoc = {
        amount: duePmt,
        category: 'darlehen',
        description: `Darlehens-Ratenzahlung via Fag-Tax KW ${invoiceKWStr} (#${lc.id.slice(0, 6).toUpperCase()})`,
        paidBy: subUsername,
        subId: subId,
        loanId: lc.id,
        fagTaxId: ft.id || null,
        createdAt: payDate,
        createdBy: currentUser ? currentUser.role : 'dom',
        confirmed: true,
        status: 'confirmed'
      };

      if (db) {
        try {
          const ref = await db.collection('payments').add(loanPmtDoc);
          loanPmtDoc.id = ref.id;
        } catch (e) { console.warn('Payment record error for loan during settlement:', e); }
      }
      if (!loanPmtDoc.id) loanPmtDoc.id = 'ft_loan_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
      payments.push(loanPmtDoc);
    }

    const existingLoanPayments = getLoanPayments(lc);
    const newPaidTotal = existingLoanPayments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
    const startTotal = (lc.principal || 0) + (lc.addonsSum || 0);
    const isCompleted = newPaidTotal >= startTotal;

    if (db && lc.id) {
      await db.collection('loanContracts').doc(lc.id).update({
        totalPaid: newPaidTotal,
        status: isCompleted ? 'completed' : 'active',
        lastPaidAt: payDate
      }).catch(e => console.warn('loanContracts update error:', e));
    }
    lc.totalPaid = newPaidTotal;
    if (isCompleted) lc.status = 'completed';

    if (subId && db) {
      try {
        const subDocRef = db.collection('subs').doc(subId);
        const subDoc = await subDocRef.get();
        if (subDoc.exists) {
          const arr = subDoc.data().loanContractsArr || [];
          let updated = false;
          arr.forEach(l => {
            if (l.id === lc.id) {
              l.totalPaid = newPaidTotal;
              if (isCompleted) l.status = 'completed';
              l.lastPaidAt = payDate;
              updated = true;
            }
          });
          if (updated) {
            await subDocRef.set({ loanContractsArr: arr }, { merge: true });
          }
        }
      } catch (e) { console.warn('sub doc loanContractsArr update notice:', e); }
    }
  }

  // 5. Carry forward any late interest if applicable
  if (intAmt > 0 && kw) {
    const nextFT = fagTaxes
      .filter(f => !f.paid && f.subId === subId && f.weekStart && f.weekStart.seconds
        && f.weekStart.seconds * 1000 > (ft.weekStart?.seconds ? ft.weekStart.seconds * 1000 : 0))
      .sort((a, b) => a.weekStart.seconds - b.weekStart.seconds)[0];
    if (nextFT) {
      const existingCI = nextFT.carriedInterest || [];
      if (!existingCI.some(c => String(c.sourceKW) === String(kw))) {
        existingCI.push({ sourceKW: String(kw), amount: intAmt });
        const carriedSum = existingCI.reduce((s, c) => s + (c.amount || 0), 0);
        const nextBase = nextFT.baseAmount || nextFT.totalAmount || 0;
        const newTotal = Math.round((nextBase + carriedSum) * 100) / 100;
        if (db && nextFT.id) {
          await db.collection('fagTaxes').doc(nextFT.id).update({
            carriedInterest: existingCI,
            totalAmount: newTotal
          }).catch(() => {});
        }
      }
    }
  }

  // 6. Refresh UI components
  if (currentUser) {
    if (currentUser.role === 'dom') {
      renderFagTaxOverview();
      renderDomFagTaxInvoices();
      renderDomWheelOverview();
      renderDomLoansOverview();
    } else {
      renderSubFagTaxView();
      renderSubFagTaxInvoices();
      renderSubLoansView();
      renderWheelPendingNotices();
    }
  }
}

async function markFagTaxPaid(ft) {
  if (!ft) return;
  const sub = subs.find(s => s.id === ft.subId);
  if (!sub) return;
  const ws = ft.weekStart && ft.weekStart.seconds ? new Date(ft.weekStart.seconds * 1000) : new Date(ft.weekStart);
  const dueDate = getDueDate(ws);
  const kw = getKW(ws);
  let baseAmount = ft.baseAmount || ft.totalAmount || 0;
  if (ft.checkCost === undefined && sub) {
    const ftWS = ft.weekStart?.seconds ? new Date(ft.weekStart.seconds * 1000) : ws;
    const storedCheckCost = sumWeeklyChecks(sub.id, ftWS);
    baseAmount = round2(baseAmount + storedCheckCost);
  }
  const carried = ft.carriedInterest || [];
  const carriedSum = carried.reduce((s, c) => s + (c.amount || 0), 0);
  const billTotal = round2(baseAmount + carriedSum);
  const todayStr = new Date().toISOString().split('T')[0];
  const dueStr = dueDate.toISOString().split('T')[0];

  let carriedHTML = '';
  for (const ci of carried) {
    carriedHTML += `<div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--purple);padding-left:8px">
      <span>↳ Zinsen aus Rechnung KW ${ci.sourceKW}:</span><span style="font-weight:900">${(ci.amount || 0).toFixed(2).replace('.',',')}€</span>
    </div>`;
  }

  let bodyHTML = `
    <p style="margin-bottom:12px;font-weight:700;font-size:1.1rem">FAG-TAX KW ${kw} — ${escapeHtml(sub.displayName || sub.username)}</p>
    <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:8px">Fällig am: <strong>${dueDate.toLocaleDateString('de-DE')}</strong> (Freitag)</p>
    <div style="margin-bottom:16px;padding:12px;background:var(--bg-hover);border-radius:8px">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span>Basis (Logins+Zeit+Steuer+Strafen+Darlehen):</span><span style="font-weight:900">${baseAmount.toFixed(2).replace('.', ',')}€</span>
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
      await settleAllFagTaxPositions(ft, payDate, intAmt, totalPmt, kw);
      closeModal();
      showToast(`Fag-Tax-Rechnung KW ${kw} & alle offenen Positionen bezahlt (${totalPmt.toFixed(2).replace('.',',')}€)`, 'success');
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

const SVG_PDF_ICONS = {
  money: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cc0000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-4px;margin-right:6px"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  crown: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#cc0000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-3-7z"/><path d="M3 20h18"/></svg>`,
  user: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  card: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  alert: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cc0000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  bolt: `<svg width="13" height="13" viewBox="0 0 24 24" fill="#cc0000" stroke="none" style="display:inline-block;vertical-align:-2px;margin-right:2px"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  fire: `<svg width="13" height="13" viewBox="0 0 24 24" fill="#d35400" stroke="none" style="display:inline-block;vertical-align:-2px;margin-right:2px"><path d="M12 2c0 0-5 3.5-5 8 0 2.5 1.5 4.5 3.5 5.5-1.5-2.5-1-5.5 0-7 2.5 3.5 6.5 4 6.5 8.5 0 3.5-2.5 6-5 6s-5.5-2.5-5.5-6.5C6.5 10.5 12 2 12 2z"/></svg>`,
  document: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cc0000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-3px;margin-right:6px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`
};

function generateFagTaxInvoice(sub, logins, seconds, loginCost, minuteCost, taxAmount, checkCost, interestAmount, totalAmount, existingFT, carriedArr = [], baseAmount = 0) {
  if (!baseAmount) baseAmount = totalAmount;
  const cfg = getSubFagConfig(sub);
  const perSec = (cfg.perMinute || 1) / 60;
  const insult = FAGTAX_INSULTS[Math.floor(Math.random() * FAGTAX_INSULTS.length)];
  const now = new Date();
  const dateStr = now.toLocaleDateString('de-DE');
  const ftWeekStart = existingFT && existingFT.weekStart
    ? (existingFT.weekStart.seconds ? new Date(existingFT.weekStart.seconds * 1000) : new Date(existingFT.weekStart))
    : getCurrentWeekStart();
  const invoiceKW = getKW(ftWeekStart);
  const invoiceWeekRange = formatWeekRange(ftWeekStart);
  const subName = sub.displayName || sub.username;
  const ftId = existingFT ? existingFT.id.slice(0, 8).toUpperCase() : 'ENTWURF';
  const grandTotal = totalAmount + (interestAmount || 0);
  const totalStr = grandTotal.toFixed(2).replace('.', ',');
  const yearTotal = calcYearTotalPayments(sub.id, payments);

  const checksCount = (accountChecks || []).filter(c => c.subId === sub.id && c.createdAt && c.createdAt.seconds && c.createdAt.seconds * 1000 >= ftWeekStart.getTime()).length;

  const doubleTax = sub && sub.activePenalties && sub.activePenalties.double_tax_friday;
  const doubleInt = sub && sub.activePenalties && sub.activePenalties.double_interest_3w;
  let penaltyBadge = '';
  if (doubleTax) penaltyBadge += `<span style="color:#cc0000;font-weight:700;margin-left:4px">${SVG_PDF_ICONS.bolt} (2x FREITAGS-DOPPEL)</span>`;
  if (doubleInt) penaltyBadge += `<span style="color:#d35400;font-weight:700;margin-left:4px">${SVG_PDF_ICONS.fire} (6% DOPPELZINS)</span>`;

  const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>FAG-TAX RECHNUNG ${ftId}</title>
<style>
  @page { margin: 8mm 10mm; size: A4 portrait; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 100%;
    background: #ffffff;
    color: #111111;
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 8.5pt;
    line-height: 1.35;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    padding: 0;
    margin: 0 auto;
  }
  .page-container {
    padding: 4mm 6mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid #cc0000;
    padding-bottom: 8px;
    margin-bottom: 10px;
  }
  .header-left h1 {
    font-size: 16pt;
    color: #cc0000;
    letter-spacing: 4px;
    font-weight: 800;
    line-height: 1.1;
    display: flex;
    align-items: center;
  }
  .header-left .sub {
    font-size: 7.5pt;
    color: #555555;
    letter-spacing: 2px;
    margin-top: 3px;
    font-weight: 600;
  }
  .header-right {
    text-align: right;
  }
  .badge-id {
    display: inline-block;
    background: #cc0000;
    color: #ffffff;
    font-size: 8pt;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 3px;
    letter-spacing: 1px;
  }
  .header-right .date-info {
    font-size: 7pt;
    color: #666666;
    margin-top: 4px;
  }

  .meta-grid {
    display: flex;
    gap: 12px;
    margin-bottom: 10px;
  }
  .meta-card {
    flex: 1;
    border: 1px solid #e0e0e0;
    border-top: 3px solid #cc0000;
    background: #fcfcfc;
    border-radius: 4px;
    padding: 8px 10px;
  }
  .meta-card h3 {
    font-size: 7pt;
    color: #cc0000;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    font-weight: 700;
  }
  .meta-card p {
    font-size: 8.5pt;
    color: #111111;
    font-weight: 700;
  }
  .meta-card .small {
    font-size: 7pt;
    color: #666666;
    font-weight: 400;
    margin-top: 2px;
  }

  .period-bar {
    background: #fff5f5;
    border-left: 3px solid #cc0000;
    padding: 6px 10px;
    font-size: 8pt;
    color: #333333;
    letter-spacing: 1px;
    font-weight: 600;
    margin-bottom: 10px;
    border-radius: 0 4px 4px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  thead th {
    background: #111111;
    color: #ffffff;
    padding: 6px 8px;
    font-size: 7pt;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    text-align: left;
    font-weight: 700;
  }
  tbody tr {
    border-bottom: 1px solid #eee;
  }
  tbody tr:nth-child(even) {
    background: #f9f9f9;
  }
  tbody td {
    padding: 5px 8px;
    font-size: 8pt;
    color: #222;
  }
  .mono {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
  }
  .ta-right { text-align: right; }
  .ta-center { text-align: center; }

  .total-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .total-card {
    width: 250px;
    background: #fff0f0;
    border: 1.5px solid #cc0000;
    border-radius: 4px;
    padding: 8px 12px;
    text-align: right;
  }
  .total-card .label {
    font-size: 7pt;
    letter-spacing: 2px;
    color: #880000;
    font-weight: 800;
    text-transform: uppercase;
  }
  .total-card .amount {
    font-size: 16pt;
    font-weight: 900;
    color: #cc0000;
    line-height: 1.2;
    margin: 2px 0;
    font-family: 'JetBrains Mono', monospace;
  }
  .total-card .words {
    font-size: 6.5pt;
    color: #666666;
    font-weight: 500;
  }

  .insult-box {
    margin-bottom: 10px;
    padding: 6px 10px;
    background: #fff8f8;
    border-left: 3px solid #cc0000;
    border-radius: 0 4px 4px 0;
  }
  .insult-box p {
    font-size: 7.5pt;
    font-style: italic;
    color: #990000;
    text-align: center;
  }

  .payment-info {
    margin-bottom: 10px;
    padding: 8px 12px;
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }
  .payment-info h4 {
    font-size: 7pt;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 4px;
    color: #111;
    display: flex;
    align-items: center;
    font-weight: 700;
  }
  .payment-info p {
    font-size: 7.5pt;
    color: #333333;
    line-height: 1.4;
  }
  .payment-info code {
    font-family: 'JetBrains Mono', monospace;
    background: #eef1f5;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 7.5pt;
    color: #cc0000;
    font-weight: 700;
  }
  .deadline {
    margin-top: 4px;
    color: #cc0000;
    font-weight: 800;
    font-size: 7.5pt;
    display: flex;
    align-items: center;
  }

  .signature {
    margin-top: 8px;
    padding-top: 4px;
    text-align: right;
  }
  .signature p { font-size: 7.5pt; color: #444; }
  .signature .name { font-weight: 900; color: #cc0000; font-size: 10.5pt; margin-top: 2px; }

  .footer {
    margin-top: 8px;
    padding-top: 6px;
    border-top: 1px dashed #cccccc;
    font-size: 6pt;
    color: #888888;
    text-align: center;
    letter-spacing: 1px;
  }

  @media print {
    body { padding: 0; }
    .no-print { display: none !important; }
  }
</style></head>
<body>
  <div class="page-container">
    <div class="header">
      <div class="header-left">
        <h1>${SVG_PDF_ICONS.money} FAG·TAX</h1>
        <div class="sub">R E C H N U N G &mdash; ZAHLUNGSSOLL</div>
      </div>
      <div class="header-right">
        <div class="badge-id">RECHNUNG NR. FT-${ftId}</div>
        <div class="date-info">Erstellt: ${dateStr}</div>
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-card">
        <h3>${SVG_PDF_ICONS.crown} GLÄUBIGER (HERR)</h3>
        <p>HERR</p>
        <div class="small">Dein Herr und Gebieter • Eigentümer deines Geldes</div>
      </div>
      <div class="meta-card">
        <h3>${SVG_PDF_ICONS.user} SCHULDNER (SAU)</h3>
        <p>${escapeHtml(subName)}</p>
        <div class="small">@${escapeHtml(sub.username)} • Status: ZAHLENDER LOSER</div>
      </div>
    </div>

    <div class="period-bar">
      ABRECHNUNGSZEITRAUM: KW ${invoiceKW} &mdash; ${invoiceWeekRange}
    </div>

    <table>
      <thead>
        <tr><th>POS.</th><th>LEISTUNG</th><th>MENGE</th><th class="ta-right">EINZELPREIS</th><th class="ta-right">GESAMT</th></tr>
      </thead>
      <tbody>
        ${(() => {
          let positions = (existingFT && Array.isArray(existingFT.openPositions) && existingFT.openPositions.length > 0)
            ? JSON.parse(JSON.stringify(existingFT.openPositions))
            : [];
          if (positions.length === 0) {
            if (loginCost > 0 || logins > 0) positions.push({ title: 'Login-Gebühren (du zahlst fürs Anschauen, Loser)', qty: `${logins} Logins`, unitPrice: (cfg.perLogin || 1).toFixed(2) + '€', amount: loginCost });
            if (minuteCost > 0 || seconds > 0) positions.push({ title: 'Zeit-Gebühren (jede Sekunde kostet dich Geld)', qty: formatDuration(seconds), unitPrice: perSec.toFixed(4) + '€/Sek', amount: minuteCost });
            if (taxAmount > 0) positions.push({ title: `Fag-Tax Steuer ${penaltyBadge}`, qty: `${yearTotal.toFixed(2).replace('.',',')}€ Jahresbasis`, unitPrice: `${((doubleInt ? 0.06 : 0.03) * (doubleTax ? 2 : 1) * 100).toFixed(0)}%`, amount: taxAmount });
            if (checkCost > 0) positions.push({ title: 'Kontoprüfungen (Neugier bestraft)', qty: `${checksCount} Prüfungen`, unitPrice: '1,00-3,99€', amount: checkCost });
          }
          (carriedArr || []).forEach(c => {
            positions.push({
              title: `${SVG_PDF_ICONS.fire} Verzugszinsen aus KW ${c.sourceKW} (vorgetragen)`,
              qty: '—',
              unitPrice: '—',
              amount: c.amount || 0
            });
          });
          if (interestAmount > 0) {
            positions.push({
              title: `${SVG_PDF_ICONS.fire} Verzugszinsen (täglich steigend)`,
              qty: '—',
              unitPrice: '—',
              amount: interestAmount
            });
          }
          return positions.map((p, idx) => `<tr>
            <td>${idx + 1}</td>
            <td><strong>${escapeHtml(p.title)}</strong>${p.desc ? `<br><span style="font-size:7pt;color:#555">${escapeHtml(p.desc)}</span>` : ''}</td>
            <td>${escapeHtml(String(p.qty || '1'))}</td>
            <td class="ta-right mono">${typeof p.unitPrice === 'number' ? (p.unitPrice.toFixed(2).replace('.', ',') + '€') : escapeHtml(String(p.unitPrice || '—'))}</td>
            <td class="ta-right mono" style="font-weight:700">${p.type === 'info_penalty' ? '—' : (p.amount || 0).toFixed(2).replace('.', ',') + '€'}</td>
          </tr>`).join('');
        })()}
      </tbody>
    </table>

    <div class="total-container">
      <div class="total-card">
        <div class="label">GESAMTSCHULD</div>
        <div class="amount">${totalStr} €</div>
        <div class="words">in Worten: ${numberToGerman(grandTotal)} Euro</div>
      </div>
    </div>

    <div class="insult-box">
      <p>"${insult}"</p>
    </div>

    <div class="payment-info">
      <h4>${SVG_PDF_ICONS.card} ZAHLUNGSINFORMATIONEN</h4>
      <p><strong>IBAN:</strong> DE12 3456 7890 1234 5678 90 &bull; <strong>BIC:</strong> FINDOM01</p>
      <p><strong>Verwendungszweck:</strong> <code>FT-${ftId} / ${escapeHtml(sub.username)}</code></p>
      <div class="deadline">
        ${SVG_PDF_ICONS.alert} ZAHLUNGSZIEL: SOFORT / OHNE VERZUG
      </div>
    </div>

    <div class="signature">
      <p>Mit der gebührenden Verachtung,</p>
      <p class="name">${SVG_PDF_ICONS.crown} HERR</p>
      <p style="font-size:7pt;color:#888;letter-spacing:1px">Dein Herr und Gebieter</p>
    </div>

    <div class="footer">
      <p>FAG-TAX SYSTEM v3 &bull; Alle Preise inkl. Demütigung &bull; Kein Umtausch &bull; Kein Widerruf &bull; Nur Zahlung</p>
      <p style="margin-top:2px">Diese Rechnung wurde automatisch generiert. Einspruch zwecklos.</p>
    </div>
  </div>

  <div class="no-print" style="text-align:center;margin-top:16px;padding:12px;background:#eee;border-radius:4px">
    <button onclick="window.print()" style="padding:12px 40px;background:#cc0000;color:#fff;border:none;border-radius:4px;font-size:14px;cursor:pointer;font-weight:900;letter-spacing:3px">📄 ALS PDF DRUCKEN / SPEICHERN</button>
    <p style="margin-top:8px;font-size:9px;color:#999">Oder Strg+P / Cmd+P</p>
  </div>
</body></html>`;

  // Mobile: use html2pdf.js for clean PDF without browser headers/footers
  const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile && typeof html2pdf !== 'undefined') {
    const container = document.createElement('div');
    container.innerHTML = html;
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '-9999px';
    container.style.width = '750px';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-9999';
    document.body.appendChild(container);

    const filename = `FAG-TAX_KW${invoiceKW}_${subName.replace(/\s+/g, '_')}.pdf`;
    const opt = {
      margin: [6, 8, 6, 8],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, windowWidth: 770 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().from(container).set(opt).toPdf().get('pdf').then(pdf => {
      const blob = pdf.output('blob');
      if (container.parentNode) document.body.removeChild(container);

      const file = new File([blob], filename, { type: 'application/pdf' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: `Fag-Tax Rechnung KW ${invoiceKW}`,
          text: `Fag-Tax Rechnung KW ${invoiceKW} für ${subName}`
        }).catch(() => {
          downloadBlobFallback(blob, filename);
        });
      } else {
        downloadBlobFallback(blob, filename);
      }
      showToast('PDF generiert 📄', 'success');
    }).catch(err => {
      if (container.parentNode) document.body.removeChild(container);
      console.error('PDF generation failed:', err);
      const w = window.open('', '_blank');
      if (w) { w.document.write(html); w.document.close(); }
    });
  } else {
    // Desktop: open in new tab for print
    const w = window.open('', '_blank');
    if (!w) { showAlert('PDF EXPORT', 'Popup-Blocker verhindert PDF-Export. Bitte Popups erlauben.'); return; }
    w.document.write(html);
    w.document.close();
  }
}

function downloadBlobFallback(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (a.parentNode) document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
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
    : (currentUser.uid || currentUser.id
        ? db.collection('payments').where('subId', '==', currentUser.uid || currentUser.id)
        : db.collection('payments').where('paidBy', '==', currentUser.username));
  unsubscribePayments = query.onSnapshot(snap => {
    payments = [];
    snap.forEach(doc => payments.push({ id: doc.id, ...doc.data() }));
    if (currentUser.role !== 'dom') {
      payments.sort((a, b) => toMs(b.createdAt) - toMs(a.createdAt));
    }
    syncLoanPaymentsFromPaidInvoices();
    renderPayments();
    updateTotals();
    if (currentUser.role === 'dom') {
      renderDomPendingCheckins();
      renderFagTaxOverview();
    }
  }, error => {
    paymentsTbody.innerHTML = `<tr><td colspan="6" class="loading-cell" style="color:var(--red)">FEHLER: ${escapeHtml(error.message)}</td></tr>`;
  });
}

async function addPayment(amount, category, description, subId, dateStr, loanId) {
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
    const parsedAmount = parseFloat(amount);
    // #19: Validate amount range
    if (isNaN(parsedAmount) || parsedAmount <= 0 || parsedAmount > 100000) {
      console.warn('Invalid payment amount:', amount);
      return false;
    }
    const isDom = currentUser && currentUser.role === 'dom';
    const confirmed = isDom ? true : false;
    const status = isDom ? 'confirmed' : 'pending_confirmation';

    const paymentDoc = {
      amount: round2(parsedAmount), category, description: (description || '').trim(),
      createdAt,
      paidBy, subId: subId || null, createdBy: currentUser ? currentUser.role : 'sub',
      confirmed, status
    };
    if (loanId) paymentDoc.loanId = loanId;

    await db.collection('payments').add(paymentDoc);
    return true;
  } catch (e) { return false; }
}

function isSameSub(id1, user1, id2, user2) {
  if (id1 && id2 && String(id1) === String(id2)) return true;
  const u1 = String(user1 || '').toLowerCase().trim().replace(/\s+/g, '');
  const u2 = String(user2 || '').toLowerCase().trim().replace(/\s+/g, '');
  if (u1 && u2 && u1 === u2) return true;
  return false;
}

function getLoanPayments(lc) {
  if (!lc || !lc.id) return [];
  const curSubId = currentUser ? (currentUser.id || currentUser.uid) : lc.subId;
  const fullLoanId = String(lc.id);

  return payments.filter(p => {
    const matchSub = isSameSub(p.subId, p.paidBy, lc.subId, lc.username) ||
                     isSameSub(p.subId, p.paidBy, curSubId, lc.username);
    if (!matchSub) return false;

    const isLoanCat = p.category === 'darlehen' || (p.description || '').toLowerCase().includes('darlehen');
    if (!isLoanCat) return false;

    return p.loanId === fullLoanId ||
      (p.loanId && (fullLoanId.startsWith(p.loanId) || p.loanId.startsWith(fullLoanId))) ||
      (p.description && p.description.toUpperCase().includes(fullLoanId.slice(0, 6).toUpperCase()));
  });
}

async function syncLoanPaymentsFromPaidInvoices() {
  if (!fagTaxes || !loanContracts || !db) return;
  const paidFTs = fagTaxes.filter(f => f.paid);
  let changed = false;

  for (const ft of paidFTs) {
    const ftSub = (subs || []).find(s => isSameSub(s.id, s.username, ft.subId, ft.username));
    const subId = ftSub ? ftSub.id : ft.subId;
    const subUsername = ftSub ? ftSub.username : (ft.username || '');
    const payDate = ft.paidAt
      ? (ft.paidAt.seconds ? new Date(ft.paidAt.seconds * 1000) : new Date(ft.paidAt))
      : (ft.createdAt ? (ft.createdAt.seconds ? new Date(ft.createdAt.seconds * 1000) : new Date(ft.createdAt)) : new Date());
    const kw = getKW(ft.weekStart?.seconds ? new Date(ft.weekStart.seconds * 1000) : new Date(ft.weekStart || Date.now()));

    // Find all loan contracts for this sub
    const subLoans = loanContracts.filter(l => isSameSub(l.subId, l.username, subId, subUsername));
    if (subLoans.length === 0) continue;

    let loanItems = [];
    if (Array.isArray(ft.openPositions)) {
      loanItems = ft.openPositions.filter(p => p.type === 'loan' || (p.title || '').toLowerCase().includes('darlehen'));
    }

    if (loanItems.length === 0 && (ft.loanCost > 0 || ft.baseAmount > 0 || ft.totalAmount > 0)) {
      subLoans.forEach(l => {
        const weeklyInt = round2(l.weeklyInterestAmount || ((l.principal || 0) * 0.10));
        const rate = round2(l.installmentRate || 0);
        loanItems.push({
          id: l.id,
          amount: round2(weeklyInt + rate),
          weeklyInterest: weeklyInt,
          installmentRate: rate
        });
      });
    }

    for (let idx = 0; idx < loanItems.length; idx++) {
      const item = loanItems[idx];
      const lc = subLoans.find(l => l.id === item.id || (item.id && (l.id.startsWith(item.id) || item.id.startsWith(l.id))) || (item.title || item.desc || '').toUpperCase().includes(l.id.slice(0, 6).toUpperCase())) || subLoans[idx] || subLoans[0];
      if (!lc) continue;

      const pmtAmount = parseFloat(item.amount) || round2((lc.weeklyInterestAmount || ((lc.principal || 0) * 0.10)) + (lc.installmentRate || 0));
      if (pmtAmount <= 0) continue;

      const exists = payments.some(p => {
        const sameSub = isSameSub(p.subId, p.paidBy, subId, subUsername);
        if (!sameSub) return false;
        const matchFT = p.fagTaxId && String(p.fagTaxId) === String(ft.id);
        const matchLoan = p.loanId && (p.loanId === lc.id || lc.id.startsWith(p.loanId) || p.loanId.startsWith(lc.id));
        const matchDesc = p.description && (p.description.includes(`Fag-Tax KW ${kw}`) || p.description.includes(`FactoX KW ${kw}`));
        return matchFT || (matchLoan && matchDesc);
      });

      if (!exists) {
        changed = true;
        const pmtDoc = {
          amount: round2(pmtAmount),
          category: 'darlehen',
          description: `Darlehens-Ratenzahlung via Fag-Tax KW ${kw} (#${lc.id.slice(0, 6).toUpperCase()})`,
          paidBy: subUsername || lc.username || 'sub',
          subId: subId || lc.subId || null,
          loanId: lc.id,
          fagTaxId: ft.id,
          createdAt: payDate,
          createdBy: 'dom',
          confirmed: true,
          status: 'confirmed'
        };

        try {
          const ref = await db.collection('payments').add(pmtDoc);
          pmtDoc.id = ref.id;
        } catch (e) {
          console.warn('Sync loan payment error:', e);
          pmtDoc.id = 'sync_loan_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
        }
        payments.push(pmtDoc);

        const loanPmts = getLoanPayments(lc);
        const newPaidTotal = Math.max(parseFloat(lc.totalPaid) || 0, loanPmts.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0));
        const startTotal = (lc.principal || 0) + (lc.addonsSum || 0);
        const isCompleted = newPaidTotal >= startTotal;

        try {
          await db.collection('loanContracts').doc(lc.id).update({
            totalPaid: newPaidTotal,
            status: isCompleted ? 'completed' : 'active',
            lastPaidAt: payDate
          });
        } catch (e) {}
        lc.totalPaid = newPaidTotal;
        if (isCompleted) lc.status = 'completed';
      }
    }
  }

  if (changed) {
    renderPayments();
    updateTotals();
    if (currentUser) {
      if (currentUser.role === 'dom') renderDomLoansOverview();
      else renderSubLoansView();
    }
  }
}

async function deletePayment(id) {
  try { await db.collection('payments').doc(id).delete(); showToast('Zahlung gelöscht', 'error'); } catch (_) {}
}

// =============================================
// RENDERING
// =============================================
function renderDashboard() {
  bindGlobalButtons();
  const subPanel = document.getElementById('sub-panel');
  if (currentUser.role === 'dom') {
    dashTitle.textContent = '👑 DEIN EINKOMMEN, HERR';
    dashSubtitle.textContent = 'Deine Säue. Ihr Geld. Dein Besitz.';
    domPanel.style.display = 'block';
    domPanel.classList.remove('hidden');
    if (subPanel) { subPanel.style.display = 'none'; subPanel.classList.add('hidden'); }
    actionTh.style.display = 'table-cell';
    actionTh.classList.remove('hidden');
    thSub.style.display = 'table-cell';
    thSub.classList.remove('hidden');
    renderDomPendingCheckins();
    renderFagTaxOverview();
    renderDomFagTaxInvoices();
    renderDomLoansOverview();
    renderDomWheelOverview();
    renderDomShopOverview();
  } else {
    const name = currentUser.displayName || currentUser.username;
    dashTitle.textContent = `🐷 DEINE DIENSTE, ${name.toUpperCase()}`;
    dashSubtitle.textContent = 'Kriech her und sieh, was du deinem Herrn gegeben hast. Loser.';
    domPanel.style.display = 'none';
    domPanel.classList.add('hidden');
    if (subPanel) { subPanel.style.display = 'block'; subPanel.classList.remove('hidden'); }
    actionTh.style.display = 'none';
    actionTh.classList.add('hidden');
    thSub.style.display = 'none';
    thSub.classList.add('hidden');
    renderSubFagTaxInvoices();
    renderSubLoansView();
    renderWheelCanvas();
    setTimeout(renderWheelCanvas, 200);
    renderWheelPendingNotices();
    renderTributeTicker();
    renderSubShopOverview();
  }
  userBadge.textContent = currentUser.icon + ' ' + (currentUser.displayName || currentUser.label);
  checkAndApplyMahnstufen();
}

function renderPayments() {
  const isDom = currentUser.role === 'dom';

  // For Subs: Hide payment history table unless account check has been unlocked
  if (!isDom && !isAccountCheckedThisWeek()) {
    paymentsTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:var(--text-dim);font-weight:700">🔒 ZAHLUNGSVERLAUF GESPERRT<br><span style="font-size:0.75rem;font-weight:normal;color:var(--text-muted)">Schalte deine Kontoübersicht oben per "KONTO PRÜFEN" frei.</span></td></tr>';
    emptyState.style.display = 'none';
    return;
  }

  let filtered = payments;
  if (isDom && filterSubId !== 'all')
    filtered = payments.filter(p => p.subId === filterSubId || p.paidBy === filterSubId);

  if (filtered.length === 0) {
    paymentsTbody.innerHTML = '';
    emptyState.style.display = 'block';
    emptyState.textContent = isDom
      ? 'Diese Sau hat noch nichts gezahlt. Zerdrücke sie.'
      : 'Du hast noch NICHTS gezahlt? Dein Herr wartet. Loser.';
    return;
  }
  emptyState.style.display = 'none';

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
      <td class="date" data-label="DATUM">${dateStr}</td>
      <td class="amount" data-label="BETRAG">${amountStr}</td>
      <td data-label="KATEGORIE"><span class="category-badge" style="border-color:${cat.color};color:${cat.color}">${cat.icon} ${cat.label}</span></td>
      ${isDom ? `<td class="sub-cell" data-label="ZAHLER">🐷 ${escapeHtml(subName)}</td>` : ''}
      <td class="desc" data-label="BESCHREIBUNG" title="${escapeHtml(p.description)}">${escapeHtml(p.description)}</td>
      ${isDom ? `<td data-label=""><button class="btn btn--sm btn--danger" data-id="${p.id}" title="Löschen">✕</button></td>` : ''}
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
  let matchedArr = msgs[msgs.length - 1].msg;
  for (const m of msgs) { if (useTotal >= m.min && useTotal < m.max) { matchedArr = m.msg; break; } }
  const matched = Array.isArray(matchedArr) ? matchedArr[Math.floor(Math.random() * matchedArr.length)] : matchedArr;
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
// --- DEMÜTIGENDER SCHULDENAUSZUG PDF GENERATOR ---
function generateSubHumiliationStatementPDF(sub) {
  const name = sub.displayName || sub.username;
  const totalPaid = getSubTotalPaid(sub.id, sub.username);
  const totalOpenDebt = getSubOpenDebt(sub.id, sub.username);

  const myLoans = loanContracts.filter(l => l.subId === sub.id || l.username === sub.username);
  const openFagTaxes = fagTaxes.filter(f => (f.subId === sub.id || f.username === sub.username) && !f.paid);
  const totalOpenFagTax = openFagTaxes.reduce((s, f) => s + (f.totalAmount || f.baseAmount || 0), 0);
  const openSpins = wheelSpins.filter(w => (w.subId === sub.id || w.username === sub.username) && !w.paid);
  const totalOpenWheel = openSpins.reduce((s, w) => s + (w.prizeAmount || 0) + ((w.mahnStufe || 0) * 5), 0);

  const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>SCHULDENAUSZUG ${escapeHtml(name.toUpperCase())}</title>
<style>
  @page { margin: 15mm; size: A4; }
  body { font-family: 'Courier New', monospace; font-size: 9pt; line-height: 1.4; color: #000; padding: 20px; }
  .header { border-bottom: 3px solid #cc0000; text-align: center; padding-bottom: 12px; margin-bottom: 20px; }
  .header h1 { color: #cc0000; font-size: 16pt; text-transform: uppercase; letter-spacing: 3px; }
  .badge { background: #000; color: #fff; padding: 4px 8px; font-weight: bold; }
  .section { border: 1px solid #000; padding: 10px; margin-bottom: 12px; }
  .title { font-weight: bold; background: #eee; padding: 4px; text-transform: uppercase; border-bottom: 1px solid #000; }
  .danger { color: #cc0000; font-weight: bold; }
</style></head><body>
  <div class="header">
    <h1>${SVG_PDF_ICONS.document} OFFIZIELLER DEMÜTIGUNGS- & SCHULDENAUSZUG</h1>
    <p>SCHWEINE-AKTE: <strong>@${escapeHtml(sub.username)}</strong> (${escapeHtml(name)})</p>
    <p>ERSTELLT AM: ${new Date().toLocaleString('de-DE')}</p>
  </div>

  <div class="section">
    <div class="title">1. FINANZIELLER GESAMT-STATUS</div>
    <p>Bisher geleisteter Gesamttribut an den Herrn: <strong style="color:green">${totalPaid.toFixed(2).replace('.', ',')}€</strong></p>
    <p>Aktuell offene Gesamtschulden & Strafen: <strong class="danger">${totalOpenDebt.toFixed(2).replace('.', ',')}€</strong></p>
  </div>

  <div class="section">
    <div class="title">2. OFFENE POSTEN & VERPFLICHTUNGEN</div>
    <p>• Offene FagTax-Wochenrechnungen: ${totalOpenFagTax.toFixed(2).replace('.', ',')}€ (${openFagTaxes.length} Rechnungen)</p>
    <p>• Offene Glücksrad-Strafen: ${totalOpenWheel.toFixed(2).replace('.', ',')}€ (${openSpins.length} Strafen ausstehend)</p>
    <p>• Laufende Darlehensverträge: ${myLoans.length} Vertrag/Verträge</p>
  </div>

  <div class="section" style="border:2px solid #cc0000;background:#fff5f5">
    <div class="title" style="background:#cc0000;color:#fff">3. ERGEBENHEITS-KLAUSEL</div>
    <p class="danger">DAS SCHWEIN ERKLÄRT SICH BEDINGUNGSLOS BEREIT, ALLE BESCHLOSSENEN STRAFEN UND TRIBUTE BINNEN 24 STUNDEN AN DEN HERRN ZU BEZAHLEN. VERZUG FÜHRT ZUR SOFORTIGEN MAHNSTUFEN-ERHÖHUNG UND INKASSO-ÜBERMITTLUNG.</p>
  </div>

  <div style="margin-top:40px;display:flex;justify-content:space-between">
    <div style="border-top:1px solid #000;width:40%;text-align:center;padding-top:4px">${SVG_PDF_ICONS.crown} GEBIETER & HERR</div>
    <div style="border-top:1px solid #000;width:40%;text-align:center;padding-top:4px">${SVG_PDF_ICONS.user} ${escapeHtml(name)} (Unterworfen)</div>
  </div>
</body></html>`;

  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); }
}

// =============================================
// SUBS UI (SCHWEINESTALL / PROFILE)
// =============================================
function renderSubs() {
  const active = subs;
  if (active.length === 0) { subsList.innerHTML = '<p class="empty-subs">Noch keine Säue angelegt.</p>'; return; }

  // Sort subs by total tribute paid (ranking)
  const rankedSubs = [...active].map(s => {
    const totalPaid = getSubTotalPaid(s.id, s.username);
    return { sub: s, totalPaid };
  }).sort((a, b) => b.totalPaid - a.totalPaid);

  subsList.innerHTML = rankedSubs.map((item, rankIdx) => {
    const s = item.sub;
    const totalPaid = item.totalPaid;
    const totalStr = totalPaid.toFixed(2).replace('.', ',') + '€';
    const cfg = getSubFagConfig(s);
    const isEditing = editingSubId === s.id;

    // Determine humiliation rank title
    let rankBadge = '🐷 WERTFRAGWÜRDIGES SCHWEIN';
    let rankColor = 'var(--text-dim)';
    if (rankIdx === 0 && totalPaid > 0) { rankBadge = '🏆 GOLD-SAU (TOP-ZAHLSCHWEIN)'; rankColor = '#ffd700'; }
    else if (rankIdx === 1 && totalPaid > 0) { rankBadge = '🥈 SILBER-SCHWEIN'; rankColor = '#c0c0c0'; }
    else if (totalPaid > 100) { rankBadge = '🥉 ERTRAGREICHE SAU'; rankColor = '#cd7f32'; }

    // Calculate open debts for this sub centrally
    const openFTs = fagTaxes.filter(f => (f.subId === s.id || f.username === s.username) && !f.paid);
    const openFTTotal = openFTs.reduce((sum, f) => sum + (f.totalAmount || f.baseAmount || 0), 0);
    const openSpins = wheelSpins.filter(w => (w.subId === s.id || w.username === s.username) && !w.paid);
    const openSpinsTotal = openSpins.reduce((sum, w) => sum + (w.prizeAmount || 0) + ((w.mahnStufe || 0) * 5), 0);
    const totalDebt = getSubOpenDebt(s.id, s.username);

    if (isEditing) {
      return `<div class="sub-edit-row" data-id="${s.id}" style="padding:12px;background:var(--bg-surface);border:1px solid var(--border);border-radius:4px;margin-bottom:10px">
        <div class="sub-edit-fields" style="display:flex;flex-direction:column;gap:6px">
          <input type="text" class="sub-edit-user" value="${escapeHtml(s.username)}" placeholder="Benutzername" style="padding:6px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);width:100%">
          <input type="text" class="sub-edit-name" value="${escapeHtml(s.displayName || s.username)}" placeholder="Anzeigename" style="padding:6px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);width:100%">
          <input type="text" class="sub-edit-pw" value="${escapeHtml(s.password || '')}" placeholder="Passwort" style="padding:6px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);width:100%">
        </div>
        <div class="sub-edit-actions form-action-row" style="margin-top:8px">
          <button class="btn btn--sm btn--success" data-id="${s.id}">💾 SPEICHERN</button>
          <button class="btn btn--sm btn--ghost">✕ ABBRECHEN</button>
        </div>
      </div>`;
    }

    return `<div class="sub-card" data-id="${s.id}" style="padding:14px;background:var(--bg-surface);border:1.5px solid var(--border);margin-bottom:12px;border-radius:6px">
      <!-- HEADER ROW WITH RANK & ACTIONS -->
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div>
          <div style="font-weight:900;font-size:1rem;color:var(--text)">🐷 ${escapeHtml(s.displayName || s.username)} <span style="font-size:0.75rem;color:var(--text-dim)">(@${escapeHtml(s.username)})</span></div>
          <div style="font-size:0.75rem;font-weight:800;color:${rankColor};margin-top:2px">${rankBadge}</div>
        </div>
        <div class="sub-actions" style="display:flex;gap:4px;flex-wrap:wrap">
          <button class="btn btn--sm btn--orange btn-demand-tribute" data-id="${s.id}" data-name="${escapeHtml(s.displayName || s.username)}" title="Demütigende Strafe verhängen">🙇 STRAFE</button>
          <button class="btn btn--sm btn--cyan btn-sub-statement" data-id="${s.id}" title="Schuldenauszug PDF">📄 AKTE</button>
          <button class="btn btn--sm btn--primary btn-edit-sub" data-id="${s.id}" title="Bearbeiten">✎</button>
          <button class="btn btn--sm btn--danger btn-delete-sub" data-id="${s.id}" title="Löschen">🗑</button>
        </div>
      </div>

      <!-- STATS GRID -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;padding:8px;background:var(--bg-card);border:1px solid var(--border);border-radius:4px;font-size:0.75rem">
        <div>💰 Gesamttribut: <strong style="color:var(--green);font-size:0.85rem">${totalStr}</strong></div>
        <div>🔥 Offener Rückstand: <strong style="color:var(--red);font-size:0.85rem">${totalDebt.toFixed(2).replace('.', ',')}€</strong></div>
        <div>📋 Offene FagTaxes: <strong>${openFTs.length}</strong> (${openFTTotal.toFixed(2)}€)</div>
        <div>🎰 Offene Glücksradstrafen: <strong>${openSpins.length}</strong> (${openSpinsTotal.toFixed(2)}€)</div>
      </div>

      <!-- CONFIG TOGGLES -->
      <div class="sub-config-row" style="margin-top:8px;display:flex;gap:10px;flex-wrap:wrap;font-size:0.7rem;color:var(--text-dim)">
        <label class="sub-config-toggle"><input type="checkbox" class="cfg-toggle" data-id="${s.id}" data-key="enabled" ${cfg.enabled ? 'checked' : ''}> FAG-TAX AKTIERT</label>
        <label class="sub-config-toggle"><input type="checkbox" class="cfg-toggle" data-id="${s.id}" data-key="loginsEnabled" ${cfg.loginsEnabled ? 'checked' : ''}> LOGINS</label>
        <label class="sub-config-toggle"><input type="checkbox" class="cfg-toggle" data-id="${s.id}" data-key="minutesEnabled" ${cfg.minutesEnabled ? 'checked' : ''}> MINUTEN</label>
        <label class="sub-config-toggle"><input type="checkbox" class="cfg-toggle" data-id="${s.id}" data-key="taxEnabled" ${cfg.taxEnabled ? 'checked' : ''}> STEUER</label>
        <label class="sub-config-toggle"><input type="checkbox" class="cfg-toggle" data-id="${s.id}" data-key="counterVisible" ${cfg.counterVisible ? 'checked' : ''}> ZÄHLER</label>
      </div>
    </div>`;
  }).join('');

  qsa('.btn-demand-tribute').forEach(b => {
    b.onclick = () => {
      openManualPaymentModal(b.dataset.id, 'strafe', `Gehorsamkeits-Strafe für ${b.dataset.name}`, 25);
    };
  });

  qsa('.btn-sub-statement').forEach(b => {
    b.onclick = () => {
      const s = subs.find(x => x.id === b.dataset.id);
      if (s) generateSubHumiliationStatementPDF(s);
    };
  });

  qsa('.btn-edit-sub').forEach(b => {
    b.onclick = () => { editingSubId = b.dataset.id; renderSubs(); };
  });

  qsa('.sub-edit-actions .btn--success').forEach(b => {
    b.onclick = async () => {
      const row = b.closest('.sub-edit-row');
      const user = qs('.sub-edit-user', row).value;
      const name = qs('.sub-edit-name', row).value;
      const pw = qs('.sub-edit-pw', row).value;
      let ok = true;
      if (user) { const r = await updateSubUsername(b.dataset.id, user); if (!r) { showAlert('FEHLER', 'Benutzername ungültig oder vergeben!'); ok = false; } }
      if (ok && name) { const r = await updateSubDisplay(b.dataset.id, name); if (!r) { showAlert('FEHLER', 'Name ungültig!'); ok = false; } }
      if (ok && pw) { if (pw.length < 3) { showAlert('FEHLER', 'Passwort zu kurz!'); ok = false; } else { await updateSubPassword(b.dataset.id, pw); } }
      if (ok) editingSubId = null;
    };
  });

  qsa('.sub-edit-actions .btn--ghost').forEach(b => {
    b.onclick = () => { editingSubId = null; renderSubs(); };
  });

  qsa('.btn-delete-sub').forEach(b => {
    b.onclick = async () => {
      const ok = await showConfirm('SAU ENTFERNEN', 'Diese Sau + alle Zahlungen/Sessions wirklich ENDGÜLTIG löschen?');
      if (ok) {
        await deleteSub(b.dataset.id);
        editingSubId = null;
        renderSubs();
      }
    };
  });

  qsa('.cfg-toggle').forEach(cb => {
    cb.onclick = async () => {
      await updateSubFagTax(cb.dataset.id, { [cb.dataset.key]: cb.checked });
    };
  });
}

function populateSubSelects() {
  const active = subs;
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
  const weekStart = ftWeekStart ? new Date(ftWeekStart) : getCurrentWeekStart();
  const ft = ftId ? fagTaxes.find(f => f.id === ftId) : null;

  let logins, storedSecs, loginCost, timeCost, taxAmount, checkSum, totalWeek, yearTotal, perLogin, perSec, taxRate;

  // Determine if this is the current week
  const currentWeekStart = getCurrentWeekStart();
  const isCurrentWeek = Math.abs(weekStart.getTime() - currentWeekStart.getTime()) < 86400000;

  if (ft && ft.paid) {
    // PAID: use stored values (final, immutable)
    logins = ft.loginsCount || 0;
    storedSecs = ft.secondsCount || 0;
    loginCost = ft.loginCost || 0;
    timeCost = ft.minuteCost || 0;
    taxAmount = ft.taxAmount || 0;
    yearTotal = ft.yearTotal || 0;
    const ftWS = ft.weekStart?.seconds ? new Date(ft.weekStart.seconds * 1000) : weekStart;
    checkSum = ft.checkCost !== undefined ? ft.checkCost : sumWeeklyChecks(sub.id, ftWS);
    totalWeek = round2(loginCost + timeCost + taxAmount + checkSum);
    perLogin = cfg.perLogin || 1;
    perSec = (cfg.perMinute || 1) / 60;
    taxRate = cfg.taxRate || 0.03;
  } else if (isCurrentWeek || !ft) {
    // CURRENT WEEK or NO FAGTAX: always calculate live
    const calc = calculateWeeklyFagTax(sub, weekStart, sessions, payments, accountChecks);
    logins = calc.logins;
    storedSecs = calc.totalSeconds;
    loginCost = calc.loginCost;
    timeCost = calc.timeCost;
    taxAmount = calc.taxAmount;
    checkSum = calc.checkCost;
    yearTotal = calc.yearTotal;
    totalWeek = calc.baseAmount;
    perLogin = calc.perLogin;
    perSec = calc.perSec;
    taxRate = calc.taxRate;
  } else {
    // PAST WEEK, UNPAID but stored: use stored values (week is closed)
    logins = ft.loginsCount || 0;
    storedSecs = ft.secondsCount || 0;
    loginCost = ft.loginCost || 0;
    timeCost = ft.minuteCost || 0;
    taxAmount = ft.taxAmount || 0;
    yearTotal = ft.yearTotal || 0;
    const ftWS = ft.weekStart?.seconds ? new Date(ft.weekStart.seconds * 1000) : weekStart;
    checkSum = ft.checkCost !== undefined ? ft.checkCost : sumWeeklyChecks(sub.id, ftWS);
    totalWeek = round2(loginCost + timeCost + taxAmount + checkSum);
    perLogin = cfg.perLogin || 1;
    perSec = (cfg.perMinute || 1) / 60;
    taxRate = cfg.taxRate || 0.03;
  }

  const fmt = v => v.toFixed(2).replace('.', ',') + '€';
  const durationStr = formatDuration(storedSecs);

  const kw = getKW(weekStart);
  const weekRangeStr = formatWeekRange(weekStart);
  const weekLabel = isCurrentWeek ? `KW ${kw} ${weekRangeStr} (aktuell)` : `KW ${kw} ${weekRangeStr}`;
  showModal('🐷 ' + escapeHtml(name) + ' – KW ' + kw, `
    <div class="modal-fagtax-details" style="max-width:420px">
      <div style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:1rem">${weekLabel}</div>
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
  const weekStart = getCurrentWeekStart();
  const weekStartMs = weekStart.getTime();

  let html = '<div class="fagtax-weekly-overview">';
  html += '<h4>📊 FAG-TAX RECHNUNGEN (VERGANGENE WOCHEN)</h4>';

  // Export unpaid button
  const unpaid = fagTaxes.filter(f => !f.paid);
  if (unpaid.length > 0) {
    html += `<div style="margin:10px 0 16px;text-align:center"><button id="btn-export-unpaid" class="btn btn--danger">📄 ALLE OFFENEN RECHNUNGEN EXPORTIEREN</button></div>`;
  }

  // --- LIVE Current Week ---
  const activeSubs = subs.filter(s => s.active !== false && s.fagTax && s.fagTax.enabled !== false);
  if (activeSubs.length > 0) {
    const kw = getKW(weekStart);
    const weekRangeStr = formatWeekRange(weekStart);

    html += `<div class="ft-week-group ft-week-group--live">`;
    html += `<h5 class="ft-week-header">🔴 KW ${kw} <span class="ft-week-date-range">${weekRangeStr}</span> <span class="ft-live-badge">LIVE</span></h5>`;

    html += `<table class="fagtax-table"><thead><tr>
      <th>SAU</th><th>LOGINS</th><th>ZEIT</th><th>€ BASIS</th><th>€ ZINSEN</th><th>GESAMT</th><th>STATUS</th><th>AKTIONEN</th>
    </tr></thead><tbody>`;

    activeSubs.sort((a, b) => ((a.displayName || a.username || '')).localeCompare(b.displayName || b.username || ''));

    activeSubs.forEach(sub => {
      const name = sub.displayName || sub.username;
      const calc = calculateWeeklyFagTax(sub, weekStart, sessions, payments, accountChecks);

      // Check if there's an existing FagTax record for this week for this sub
      const existingFT = fagTaxes.find(f =>
        f.subId === sub.id &&
        f.weekStart && f.weekStart.seconds &&
        Math.abs(f.weekStart.seconds * 1000 - weekStartMs) < 86400000
      );
      const isPaid = existingFT && existingFT.paid;
      const ftId = existingFT ? existingFT.id : null;

      // Carried interest
      const carried = existingFT ? (existingFT.carriedInterest || []) : [];
      const carriedSum = carried.reduce((s, c) => s + (c.amount || 0), 0);
      const totalAmount = round2(calc.baseAmount + carriedSum);

      // Interest column
      let intColHTML = '<span style="color:var(--text-dim)">0,00€</span>';
      if (isPaid) {
        const paidIntAmt = existingFT.interestAmount || 0;
        if (paidIntAmt > 0) {
          intColHTML = `<span style="color:var(--purple);font-weight:900">${paidIntAmt.toFixed(2).replace('.',',')}€</span>`;
        } else {
          intColHTML = '<span style="color:var(--text-dim);font-size:0.65rem">—</span>';
        }
      } else if (carried.length > 0) {
        const lines = carried.map(c =>
          `<div style="font-size:0.65rem;line-height:1.4">Zinsen KW ${c.sourceKW}: <strong>${(c.amount || 0).toFixed(2).replace('.',',')}€</strong></div>`
        ).join('');
        intColHTML = `<div style="color:var(--purple);font-weight:700">${lines}</div>`;
      }

      // Status & Actions
      let statusStr, actionsStr;
      if (isPaid) {
        let paidDateStr = '?';
        if (existingFT.paidAt) {
          if (existingFT.paidAt.seconds) paidDateStr = new Date(existingFT.paidAt.seconds * 1000).toLocaleDateString('de-DE');
          else if (existingFT.paidAt instanceof Date) paidDateStr = existingFT.paidAt.toLocaleDateString('de-DE');
          else if (typeof existingFT.paidAt === 'string') paidDateStr = new Date(existingFT.paidAt).toLocaleDateString('de-DE');
        }
        statusStr = `<span style="color:var(--green);font-weight:900">✅ ${paidDateStr}</span>`;
        actionsStr = `
          <button class="btn btn--sm btn--orange btn-edit-ft" data-ftid="${ftId || ''}" data-subid="${sub.id}" data-amt="${totalAmount}">✏️ ANPASSEN</button>
          ${ftId ? `<button class="btn btn--sm btn--cyan" data-ftid="${ftId}">📄 PDF</button>` : ''}
        `;
      } else {
        statusStr = `<span style="color:var(--red);font-weight:900">❌ OFFEN</span>`;
        actionsStr = `
          <button class="btn btn--sm btn--orange btn-edit-ft" data-ftid="${ftId || ''}" data-subid="${sub.id}" data-amt="${totalAmount}">✏️ ANPASSEN</button>
          ${ftId ? `<button class="btn btn--sm btn--success" data-ftid="${ftId}">BEZAHLT</button><button class="btn btn--sm btn--cyan" data-ftid="${ftId}">📄 PDF</button>` : `<button class="btn btn--sm btn--primary btn-mark-manual-ft" data-subid="${sub.id}" data-amt="${totalAmount}">💳 ZAHLUNG</button>`}
        `;
      }

      // Format time
      const totalSecs = calc.totalSeconds;
      const timeStr = totalSecs >= 3600
        ? `${Math.floor(totalSecs / 3600)}h ${Math.floor((totalSecs % 3600) / 60)}m`
        : totalSecs >= 60
          ? `${Math.floor(totalSecs / 60)}m ${totalSecs % 60}s`
          : `${totalSecs}s`;

      const baseStr = calc.baseAmount.toFixed(2).replace('.', ',') + '€';
      const totalStr = (isPaid ? (existingFT.totalWithInterest || totalAmount) : totalAmount).toFixed(2).replace('.', ',') + '€';

      html += `<tr>
        <td data-label="SAU"><span class="ft-sub-link" data-subid="${sub.id}" data-ftid="${ftId || ''}" data-weekstart="${weekStartMs}" style="cursor:pointer;border-bottom:1px dashed var(--text-dim)">🐷 ${escapeHtml(name)}</span></td>
        <td data-label="LOGINS" style="font-weight:700">${calc.logins}</td>
        <td data-label="ZEIT" style="font-size:0.7rem">${timeStr}</td>
        <td data-label="€ BASIS">${baseStr}</td>
        <td data-label="€ ZINSEN" style="font-size:0.7rem">${intColHTML}</td>
        <td data-label="GESAMT" style="color:var(--red);font-weight:900">${totalStr}</td>
        <td data-label="STATUS">${statusStr}</td>
        <td data-label="AKTIONEN" style="white-space:nowrap">${actionsStr}</td>
      </tr>`;
    });

    html += '</tbody></table></div>';
  }

  // === PAST WEEKS: Stored FagTax records ===
  const pastFTs = fagTaxes.filter(ft => {
    if (!ft.weekStart || !ft.weekStart.seconds) return false;
    return Math.abs(ft.weekStart.seconds * 1000 - weekStartMs) >= 86400000; // Not current week
  });

  if (pastFTs.length > 0) {
    const weekMap = {};
    pastFTs.forEach(ft => {
      const ws = ft.weekStart.seconds ? new Date(ft.weekStart.seconds * 1000) : new Date(ft.weekStart);
      const key = ws.getTime();
      if (!weekMap[key]) weekMap[key] = [];
      weekMap[key].push(ft);
    });
    const weeks = Object.keys(weekMap).map(Number).sort((a, b) => b - a);

    html += `<div class="past-weeks-section" style="margin-top:24px">
      <h4 style="margin-bottom:12px;font-size:0.85rem;color:var(--text-dim);letter-spacing:2px">VERGANGENE WOCHEN</h4>`;

    weeks.forEach(wsKey => {
      const weekFTs = weekMap[wsKey];
      const wsDate = new Date(wsKey);
      const kw = getKW(wsDate);
      const weekRangeStr = formatWeekRange(wsDate);

      html += `
      <details class="ft-week-accordion">
        <summary class="ft-week-summary">
          <span>📅 KW ${kw}</span>
          <span class="ft-week-date-range">${weekRangeStr}</span>
        </summary>
        <div class="ft-week-group-content">`;

      html += `<table class="fagtax-table"><thead><tr>
        <th>SAU</th><th>€ BASIS</th><th>€ ZINSEN</th><th>GESAMT</th><th>STATUS</th><th>AKTIONEN</th>
      </tr></thead><tbody>`;

      weekFTs.sort((a, b) => (a.displayName || a.username || '').localeCompare(b.displayName || b.username || ''));

      weekFTs.forEach(ft => {
        const sub = subs.find(s => s.id === ft.subId);
        const name = sub ? (sub.displayName || sub.username) : (ft.displayName || ft.username || '?');
        const isPaid = ft.paid;

        let baseAmount;
        if (isPaid) {
          baseAmount = ft.baseAmount || ft.totalAmount || 0;
        } else {
          baseAmount = ft.baseAmount || ft.totalAmount || 0;
          if (ft.checkCost === undefined && sub) {
            const ftWS = ft.weekStart?.seconds ? new Date(ft.weekStart.seconds * 1000) : null;
            const checkCost = sumWeeklyChecks(sub.id, ftWS);
            baseAmount = round2(baseAmount + checkCost);
          }
        }

        const carried = ft.carriedInterest || [];
        const carriedSum = carried.reduce((s, c) => s + (c.amount || 0), 0);

        let intColHTML = '<span style="color:var(--text-dim)">0,00€</span>';
        if (isPaid) {
          const paidIntAmt = ft.interestAmount || 0;
          intColHTML = paidIntAmt > 0
            ? `<span style="color:var(--purple);font-weight:900">${paidIntAmt.toFixed(2).replace('.',',')}€</span>`
            : '<span style="color:var(--text-dim);font-size:0.65rem">—</span>';
        } else if (carried.length > 0) {
          const lines = carried.map(c =>
            `<div style="font-size:0.65rem;line-height:1.4">Zinsen KW ${c.sourceKW}: <strong>${(c.amount || 0).toFixed(2).replace('.',',')}€</strong></div>`
          ).join('');
          intColHTML = `<div style="color:var(--purple);font-weight:700">${lines}</div>`;
        }

        let statusStr, actionsStr;
        if (isPaid) {
          let paidDateStr = '?';
          if (ft.paidAt) {
            if (ft.paidAt.seconds) paidDateStr = new Date(ft.paidAt.seconds * 1000).toLocaleDateString('de-DE');
            else if (ft.paidAt instanceof Date) paidDateStr = ft.paidAt.toLocaleDateString('de-DE');
            else if (typeof ft.paidAt === 'string') paidDateStr = new Date(ft.paidAt).toLocaleDateString('de-DE');
          }
          statusStr = `<span style="color:var(--green);font-weight:900">✅ ${paidDateStr}</span>`;
          actionsStr = `
            <button class="btn btn--sm btn--orange btn-edit-ft" data-ftid="${ft.id}" data-subid="${ft.subId}" data-amt="${ft.totalAmount}">✏️ ANPASSEN</button>
            <button class="btn btn--sm btn--cyan" data-ftid="${ft.id}">📄 PDF</button>
          `;
        } else {
          statusStr = `<span style="color:var(--red);font-weight:900">❌ OFFEN</span>`;
          actionsStr = `
            <button class="btn btn--sm btn--orange btn-edit-ft" data-ftid="${ft.id}" data-subid="${ft.subId}" data-amt="${ft.totalAmount}">✏️ ANPASSEN</button>
            <button class="btn btn--sm btn--success" data-ftid="${ft.id}">BEZAHLT</button>
            <button class="btn btn--sm btn--cyan" data-ftid="${ft.id}">📄 PDF</button>
          `;
        }

        const baseStr = baseAmount.toFixed(2).replace('.', ',') + '€';
        const totalStr = (isPaid ? (ft.totalWithInterest || ft.totalAmount) : (baseAmount + carriedSum)).toFixed(2).replace('.', ',') + '€';

        html += `<tr>
          <td data-label="SAU"><span class="ft-sub-link" data-subid="${ft.subId}" data-ftid="${ft.id}" data-weekstart="${ft.weekStart?.seconds ? ft.weekStart.seconds * 1000 : ''}" style="cursor:pointer;border-bottom:1px dashed var(--text-dim)">🐷 ${escapeHtml(name)}</span></td>
          <td data-label="€ BASIS">${baseStr}</td>
          <td data-label="€ ZINSEN" style="font-size:0.7rem">${intColHTML}</td>
          <td data-label="GESAMT" style="color:var(--red);font-weight:900">${totalStr}</td>
          <td data-label="STATUS">${statusStr}</td>
          <td data-label="AKTIONEN" style="white-space:nowrap">${actionsStr}</td>
        </tr>`;
      });

      html += '</tbody></table></div></div></details>';
    });

    html += `</div>`; // Close past-weeks-section
  }

  // Show message if no data at all
  if (activeSubs.length === 0 && pastFTs.length === 0) {
    html += '<p style="text-align:center;padding:20px;color:var(--text-dim);font-weight:700">Noch keine Fag-Taxes vorhanden.</p>';
  }

  html += '</div>';
  fagTaxOverview.innerHTML = html;

  // Event delegation
  fagTaxOverview.onclick = (e) => {
    const target = e.target.closest('[data-ftid], .ft-sub-link, #btn-export-unpaid, .btn-edit-ft, .btn-mark-manual-ft');
    if (!target) return;

    // "ANPASSEN" button
    if (target.classList.contains('btn-edit-ft')) {
      openEditFagTaxModal(target.dataset.ftid, target.dataset.subid, parseFloat(target.dataset.amt) || 0);
      return;
    }

    // "ZAHLUNG BUCHEN" button
    if (target.classList.contains('btn-mark-manual-ft')) {
      openManualPaymentModal(target.dataset.subid, 'fagtax', 'FagTax Zahlung', target.dataset.amt);
      return;
    }

    // Sub name link → show details
    if (target.classList.contains('ft-sub-link')) {
      e.preventDefault();
      const ws = target.dataset.weekstart ? parseInt(target.dataset.weekstart) : null;
      showSubFagTaxDetails(target.dataset.subid, ws, target.dataset.ftid);
      return;
    }

    // "BEZAHLT" button
    if (target.classList.contains('btn--success') && target.dataset.ftid) {
      const ft = fagTaxes.find(f => f.id === target.dataset.ftid);
      if (ft) markFagTaxPaid(ft);
      return;
    }

    // "EXPORT" button (per row)
    if (target.classList.contains('btn--cyan') && target.dataset.ftid) {
      const ft = fagTaxes.find(f => f.id === target.dataset.ftid);
      if (ft) exportSingleFagTaxInvoice(ft);
      return;
    }

    // "ALLE OFFENEN EXPORTIEREN" button
    if (target.id === 'btn-export-unpaid') {
      const unpaidFTs = fagTaxes.filter(f => !f.paid);
      if (unpaidFTs.length === 0) return;
      if (unpaidFTs.length > 5) {
        showConfirm('EXPORT', `${unpaidFTs.length} Rechnungen werden geöffnet. Popups erlaubt?`)
          .then(ok => { if (ok) unpaidFTs.forEach(ft => exportSingleFagTaxInvoice(ft)); });
      } else {
        unpaidFTs.forEach(ft => exportSingleFagTaxInvoice(ft));
      }
    }
  };
}

async function exportSingleFagTaxInvoice(ft) {
  if (!ft) return;
  const sub = subs.find(s => s.id === ft.subId);
  if (!sub) return;

  // For PAID FagTaxes, use stored values (they're final)
  if (ft.paid) {
    const logins = ft.loginsCount || 0;
    const seconds = ft.secondsCount || (ft.minutesCount || 0) * 60 || 0;
    const loginCost = ft.loginCost || 0;
    const minuteCost = ft.minuteCost || 0;
    const taxAmount = ft.taxAmount || 0;
    const checkCost = ft.checkCost !== undefined ? ft.checkCost : 0;
    const baseAmount = ft.baseAmount || ft.totalAmount || 0;
    const carried = ft.carriedInterest || [];
    const totalAmount = ft.totalAmount || baseAmount;
    const interestAmount = ft.interestAmount || 0;
    generateFagTaxInvoice(sub, logins, seconds, loginCost, minuteCost, taxAmount, checkCost, interestAmount, totalAmount, ft, carried, baseAmount);
    return;
  }

  // For UNPAID FagTaxes, live-calculate from current data
  const ftWS = ft.weekStart?.seconds ? new Date(ft.weekStart.seconds * 1000) : getCurrentWeekStart();

  // Fetch fresh sessions for this sub
  let subSessions = [];
  try {
    const snap = await db.collection('sessions').where('subId', '==', sub.id).get();
    snap.forEach(d => {
      const data = { id: d.id, ...d.data() };
      if (data.loginTime && data.loginTime.seconds && data.loginTime.seconds * 1000 >= ftWS.getTime()) {
        subSessions.push(data);
      }
    });
  } catch (e) {
    console.warn('Session fetch for invoice failed:', e.message);
  }

  const calc = calculateWeeklyFagTax(sub, ftWS, subSessions, payments, accountChecks, { includeLiveSeconds: false });
  const carried = ft.carriedInterest || [];
  const carriedSum = carried.reduce((s, c) => s + (c.amount || 0), 0);
  const totalAmount = round2(calc.baseAmount + carriedSum);
  const interestAmount = ft.interestAmount || 0;

  generateFagTaxInvoice(sub, calc.logins, calc.totalSeconds, calc.loginCost, calc.timeCost, calc.taxAmount, calc.checkCost, interestAmount, totalAmount, ft, carried, calc.baseAmount);
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

  // If unlocked, render counters view instead of locking again
  if (isAccountCheckedThisWeek()) {
    if (lastCheckSessions === null) lastCheckSessions = sessions;
    renderSubFagTaxCounters();
    renderSubFagTaxHistory();
    renderSubFagTaxInvoices();
    return;
  }

  // Remove old counter UI if it exists
  const oldUI = $('sub-fagtax-ui');
  if (oldUI) oldUI.remove();

  // Clean up any live interval
  if (liveInterval) {
    clearInterval(liveInterval);
    liveInterval = null;
  }

  // Build Fag-Tax section (no counters, no open FagTax preview — only button + history)
  // Open FagTax info is only shown after clicking KONTO PRÜFEN
  let html = `
    <section class="sub-fagtax-section" id="sub-fagtax-ui">
      <h3>💰 F A G - T A X</h3>
      <div style="text-align:center;padding:8px 0 16px 0">
        <p style="font-family:var(--font);font-size:0.8rem;color:var(--text-secondary);font-weight:700;letter-spacing:2px;margin-bottom:12px">
          Du willst wissen, wie tief du diese Woche schon steckst?<br>Dafür zahlst du. Neugier hat ihren Preis.
        </p>
        <button id="btn-sub-check-account" class="btn-check-account">🔍 KONTO PRÜFEN (1–3€ GEBÜHR)</button>
        <div style="margin-top:10px">
          <button id="btn-sub-reset-fagtax" class="btn btn--sm btn--danger" style="font-weight:900;letter-spacing:1px;padding:8px 16px;border-radius:4px">🔄 FAG-TAX VERLAUF AUF 0€ ZURÜCKSETZEN</button>
        </div>
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

  const resetBtn = $('btn-sub-reset-fagtax');
  if (resetBtn) {
    resetBtn.addEventListener('click', startFagTaxResetTrap);
  }

  // Render history and invoices below
  renderSubFagTaxHistory();
  renderSubFagTaxInvoices();
}

// --- FAG-TAX RESET PSYCHOLOGICAL TRAP (10 STEPS + PRAISE, 1€ PER CLICK) ---
const RESET_TRAP_STEPS = [
  {
    step: 1,
    title: '🔄 FAG-TAX VERLAUF AUF 0,00€ ZURÜCKSETZEN?',
    msg: 'Möchtest du wirklich deinen gesamten Fag-Tax Verlauf und alle aufgelaufenen Gebühren auf 0,00€ zurücksetzen? Dies würde alle deine bisherigen Schulden löschen.',
    yesBtn: 'JA, AUF 0€ ZURÜCKSETZEN (1,00€)',
    noBtn: 'NEIN, ICH ZAHLE MEINE SCHULDEN'
  },
  {
    step: 2,
    title: '⚠️ BIST DU DIR WIRKLICH SICHER?',
    msg: 'Willst du wirklich den Betrag auf 0€ zurücksetzen? Das wäre doch wirklich extrem schade für deinen Herrn! Überlege es dir gut und drücke besser auf NEIN.',
    yesBtn: 'JA, TROTZDEM AUF 0€ (1,00€)',
    noBtn: 'NEIN, MEIN HERR VERDIENT ALLES'
  },
  {
    step: 3,
    title: '🐷 DU BIST SO EIN EGOISTISCHES SCHWEIN!',
    msg: 'Ernsthaft? Du versuchst weiter, deinen Kontostand auf Null zu drücken? Wie dreist und gierig bist du eigentlich? Drücke gefälligst auf NEIN!',
    yesBtn: 'JA, ICH BIN GIERIG (1,00€)',
    noBtn: 'NEIN, ENTSCHULDIGUNG MEIN HERR'
  },
  {
    step: 4,
    title: '💀 DEIN HERR WIRD ENTTÄUSCHT SEIN...',
    msg: 'Jedes Mal, wenn du auf JA klickst, zeigst du nur, wie armselig du bist. Willst du deinen Herrn wirklich enttäuschen? Drücke jetzt auf NEIN.',
    yesBtn: 'JA, WEITER PROBIEREN (1,00€)',
    noBtn: 'NEIN, ICH WILL BRAV SEIN'
  },
  {
    step: 5,
    title: '💸 JEDER KLICK KOSTET DICH 1,00€!',
    msg: 'Glaubst du immer noch, du kommst hier kostenlos raus? Jeder Klick auf JA kostet dich 1,00€ Strafe! Gib endlich auf und drücke NEIN!',
    yesBtn: 'JA, ICH ZAHLE UND HOFFE (1,00€)',
    noBtn: 'NEIN, ICH HÖRE AUF ZU HOFFEN'
  },
  {
    step: 6,
    title: '🪤 DU TAPPST IMMER TIEFER IN DIE FALLE!',
    msg: 'Du raffst es wirklich nicht, oder? Du zahlst Euro für Euro, nur um dem Aufgeben auszuweichen. Spürst du, wie lächerlich du dich machst? DRÜCKE NEIN!',
    yesBtn: 'JA, ICH PROBIERE ES WEITER (1,00€)',
    noBtn: 'NEIN, ICH GEBE MICH ERGEBEN'
  },
  {
    step: 7,
    title: '🐕 EIN HUND HOFT BIS ZUM SCHLUSS...',
    msg: 'Wie ein bettelnder Hund klickst du weiter auf JA. Dein Geld schmilzt, deine Hoffnung schwindet. Willst du nicht lieber als braves Schwein auf NEIN drücken?',
    yesBtn: 'JA, NOCH EIN VERSUCH (1,00€)',
    noBtn: 'NEIN, ICH BIN EIN BRAVES SCHWEIN'
  },
  {
    step: 8,
    title: '🛑 ES GIBT KEIN ZURÜCKSETZEN FÜR WÜRMER!',
    msg: 'Denkst du im Ernst, eine Sau wie du bekommt je einen Reset geschenkt? Deine einzige Bestimmung ist das Bezahlen! Klicke jetzt NEIN!',
    yesBtn: 'JA, ICH HOFFE IMMER NOCH (1,00€)',
    noBtn: 'NEIN, MEIN ZWECK IST ZAHLEN'
  },
  {
    step: 9,
    title: '🔥 WOCHELANGE ARBEIT FÜR NICHTS!',
    msg: 'Du hast jetzt schon ein Vermögen nur für diesen Reset-Versuch verbrannt. Auf 0€ kommst du niemals! Befreie dich von der Täuschung und wähle NEIN!',
    yesBtn: 'JA, LETZTER VERZWEIFELTER VERSUCH (1,00€)',
    noBtn: 'NEIN, ICH AKZEPTIERE MEINE SCHULD'
  },
  {
    step: 10,
    title: '❌ LETZTE CHANCE: RESET FINALS ABGELEHNT!',
    msg: 'Das System verweigert deinen Reset endgültig! Der Button JA wurde deaktiviert. Du hast keine Wahl mehr: Du MUSST jetzt auf NEIN drücken!',
    yesBtn: null, // Only NO button available
    noBtn: 'NEIN, ICH GEHORCHE JETZT (1,00€)'
  }
];

async function startFagTaxResetTrap() {
  if (!currentUser || currentUser.role !== 'sub') return;
  const subId = currentUser.id || currentUser.uid;

  let currentStepIdx = 0;

  async function showTrapStep(idx) {
    const stepData = RESET_TRAP_STEPS[idx];
    if (!stepData) return;

    let bodyHTML = `
      <div style="text-align:center;padding:10px">
        <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.5;margin-bottom:14px">${stepData.msg}</p>
        <div style="padding:8px;background:var(--bg-inset);border:1px dashed var(--red);color:var(--red);font-weight:bold;font-size:0.75rem">
          💳 Gebühr pro Klick: 1,00€ (wird sofort verbucht)
        </div>
      </div>
    `;

    // Custom Modal rendering with two buttons
    showModal(stepData.title, bodyHTML);

    const footer = document.getElementById('modal-footer');
    if (!footer) return;

    footer.innerHTML = '';
    footer.style.display = 'flex';
    footer.style.gap = '10px';
    footer.style.justifyContent = 'center';

    // YES button (if available for this step)
    if (stepData.yesBtn) {
      const yesBtn = document.createElement('button');
      yesBtn.className = 'btn btn--danger';
      yesBtn.style.flex = '1';
      yesBtn.style.fontWeight = '900';
      yesBtn.textContent = stepData.yesBtn;
      yesBtn.onclick = async () => {
        // Charge 1 EUR for clicking YES
        await addPayment(1.00, 'strafe', `Fag-Tax Reset-Falle Versuchs-Gebühr (Schritt ${stepData.step})`, subId);
        showToast('1,00€ Gebühr für Reset-Versuch verbucht! 💸', 'warning');
        // Proceed to next step
        showTrapStep(idx + 1);
      };
      footer.appendChild(yesBtn);
    }

    // NO button
    const noBtn = document.createElement('button');
    noBtn.className = 'btn btn--success';
    noBtn.style.flex = '1';
    noBtn.style.fontWeight = '900';
    noBtn.textContent = stepData.noBtn;
    noBtn.onclick = async () => {
      // Charge 1 EUR for clicking NO
      await addPayment(1.00, 'strafe', `Fag-Tax Reset-Falle Gehorsam-Gebühr (Schritt ${stepData.step})`, subId);
      showToast('1,00€ Gebühr verbucht! 💳', 'info');

      // Finish with Praise Modal
      showPraiseAndCloseModal(subId, idx + 1);
    };
    footer.appendChild(noBtn);
  }

  // Start at step 0
  showTrapStep(0);
}

function showPraiseAndCloseModal(subId, totalClicks) {
  const praiseHTML = `
    <div style="text-align:center;padding:12px">
      <div style="font-size:2.5rem;margin-bottom:8px">🐷 👑 👑</div>
      <p style="font-size:1.05rem;font-weight:900;color:var(--green);margin-bottom:8px">BRAVES ZAHLSCHWEIN!</p>
      <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.5;margin-bottom:14px">
        Du hast eingesehen, dass dein Geld deinem Herrn gehört! Dafür, dass du den Versuch aufgegeben und gehorcht hast, wird deine Unterwerfung gelobt.<br>
        <strong style="color:var(--purple)">Insgesamt wurden ${totalClicks},00€ für deine Lektion verbucht!</strong>
      </p>
      <button id="btn-close-praise-trap" class="btn btn--primary btn--full" style="padding:12px;font-weight:900;letter-spacing:1px">
        🐷 ICH BIN EINE GUTE SAU!
      </button>
    </div>
  `;

  showModal('👑 LOB FÜR GEHORSAM', praiseHTML);

  const footer = document.getElementById('modal-footer');
  if (footer) footer.style.display = 'none'; // Hide default footer buttons

  const closeBtn = document.getElementById('btn-close-praise-trap');
  if (closeBtn) {
    closeBtn.onclick = () => {
      const modalOver = document.getElementById('modal-overlay');
      if (modalOver) modalOver.style.display = 'none';
      renderPayments();
      updateTotals();
    };
  }
}

function renderSubFagTaxCounters() {
  if (currentUser.role !== 'sub') return;

  const sub = subs.find(s => s.id === currentUser.uid);
  if (!sub) return;
  const cfg = getSubFagConfig(sub);

  // Use real-time sessions if available, falling back to lastCheckSessions
  const weekStart = getCurrentWeekStart();
  const rawSessions = (sessions && sessions.length > 0) ? sessions : (lastCheckSessions || []);
  const subSessions = [];
  rawSessions.forEach(s => {
    if (s.subId === currentUser.uid && s.loginTime && toMs(s.loginTime) >= weekStart.getTime()) {
      subSessions.push(s);
    }
  });

  // #9: Use central calculation function
  const calc = calculateWeeklyFagTax(sub, weekStart, subSessions, payments, accountChecks, { includeLiveSeconds: true });
  const totalNow = calc.baseAmount;

  const currentFT = fagTaxes.find(f => !f.paid && f.subId === currentUser.uid);
  let carriedSum = 0;
  let carriedLines = '';
  if (currentFT) {
    const carriedArr = currentFT.carriedInterest || [];
    carriedSum = carriedArr.reduce((s, c) => s + (c.amount || 0), 0);
    if (carriedArr.length > 0) {
      carriedLines = carriedArr.map(c =>
        `<div style="font-size:0.65rem;color:var(--purple)">Zinsen aus KW ${c.sourceKW}: +${(c.amount || 0).toFixed(2).replace('.',',')}€</div>`
      ).join('');
    }
  }
  const totalWithInterest = totalNow + carriedSum;

  const timeDisplay = formatDuration(calc.totalSeconds);
  const timeCostStr = calc.timeCost.toFixed(2).replace('.', ',') + '€';


  const counterHtml = `
    <section class="sub-fagtax-section" id="sub-fagtax-ui">
      <h3>💰 F A G - T A X</h3>
      <div style="text-align:center;padding:0 0 8px 0">
        <p style="font-family:var(--font);font-size:0.75rem;color:var(--text-secondary);font-weight:600;letter-spacing:2px">
          🔓 EINBLICK FREIGESCHALTET
        </p>
      </div>
      <div class="fagtax-counter-grid">
        <div class="ft-counter-item" style="border:2px solid var(--red-dark)">
          <div class="ft-counter-label">LOGINS DIESE WOCHE</div>
          <div class="ft-counter-value" style="font-size:1.5rem">${calc.logins}</div>
          <div class="ft-counter-cost">= ${calc.loginCost.toFixed(2).replace('.', ',')}€</div>
        </div>
        <div class="ft-counter-item" style="border:2px solid var(--red-dark)">
          <div class="ft-counter-label">ZEIT ONLINE</div>
          <div class="ft-counter-value" id="ft-live-time" style="font-size:1rem;color:var(--red)">${timeDisplay}</div>
          <div class="ft-counter-cost" id="ft-live-cost">= ${timeCostStr} (${calc.perSec.toFixed(4).replace('.',',')}€/Sek)</div>
        </div>
        <div class="ft-counter-item" style="border:1px solid var(--border)">
          <div class="ft-counter-label">JAHRES-TRIBUT (3%)</div>
          <div class="ft-counter-value" style="font-size:1rem">${calc.yearTotal.toFixed(0)}€</div>
          <div class="ft-counter-cost">STEUER: ${calc.taxAmount.toFixed(2).replace('.', ',')}€</div>
        </div>
        <div class="ft-counter-item" style="border:2px solid var(--orange)">
          <div class="ft-counter-label">KONTOPRÜFUNGEN</div>
          <div class="ft-counter-value" style="font-size:1rem;color:var(--orange)">${calc.checkCost.toFixed(2).replace('.', ',')}€</div>
          <div class="ft-counter-cost">BISHER GEZAHLT</div>
        </div>
        <div class="ft-counter-item" style="border:2px solid var(--red-dark);grid-column:span 1">
          <div class="ft-counter-label">LAUFENDE KOSTEN</div>
          <div class="ft-counter-value" id="ft-live-total" style="color:var(--red);font-size:1.6rem">${totalWithInterest.toFixed(2).replace('.', ',')}€</div>
          <div class="ft-counter-cost">SEIT LETZTEM FREITAG${carriedSum > 0 ? ` (+${carriedSum.toFixed(2).replace('.', ',')}€ Zinsen aus VORWOCHEN)` : ''}</div>
          ${carriedLines}
        </div>
      </div>
    </section>
  `;

  let existing = $('sub-fagtax-ui');
  if (existing) {
    existing.outerHTML = counterHtml;
  } else {
  const ref = dashboardMain ? qs('#payments-card') : null;
    if (ref) ref.insertAdjacentHTML('beforebegin', counterHtml);
  }

  // Always restart the live 1-second counter (DOM elements get replaced on re-render)
  if (liveInterval) { clearInterval(liveInterval); liveInterval = null; }
  const closedSecs = calc.closedSeconds;
  const perSec = calc.perSec;
  const baseLoginCost = calc.loginCost;
  const baseTaxAmount = calc.taxAmount;
  const baseCheckCost = calc.checkCost;
  const tickerStartMs = Date.now();
  const initialLiveSecs = cfg.minutesEnabled !== false ? getLiveSessionSeconds() : 0;

  liveInterval = setInterval(() => {
    const timeEl = $('ft-live-time');
    const costEl = $('ft-live-cost');
    const totalEl = $('ft-live-total');
    if (!timeEl) { clearInterval(liveInterval); liveInterval = null; return; }

    const wallClockAdded = Math.floor((Date.now() - tickerStartMs) / 1000);
    const liveSecs = cfg.minutesEnabled !== false ? (initialLiveSecs + wallClockAdded) : 0;
    const total = closedSecs + liveSecs;
    const timeVal = formatDuration(total);
    const timeCostVal = round2(total * perSec);
    const costVal = timeCostVal.toFixed(2).replace('.', ',') + '€';
    const fullTotal = round2(baseLoginCost + (total * perSec) + baseTaxAmount + baseCheckCost + carriedSum).toFixed(2).replace('.', ',') + '€';

    if (timeEl) timeEl.textContent = timeVal;
    if (costEl) costEl.textContent = '= ' + costVal + ` (${perSec.toFixed(4).replace('.',',')}€/Sek)`;
    if (totalEl) totalEl.textContent = fullTotal;
  }, 1000);
}

function renderSubFagTaxHistory() {
  if (currentUser.role !== 'sub') return;
  const existing = $('sub-fagtax-history');
  if (existing) existing.remove();

  const curSubId = currentUser.uid || currentUser.id;
  const weekStartMs = getCurrentWeekStart().getTime();

  // ONLY completed past weeks (weekStart strictly prior to current week start)
  const pastCompletedFts = (fagTaxes || []).filter(ft => {
    const isSub = ft.subId === curSubId || ft.subId === currentUser.id || (currentUser.username && ft.username === currentUser.username);
    if (!isSub) return false;
    const wsMs = getFagTaxWeekStartMs(ft);
    return wsMs > 0 && wsMs < weekStartMs;
  });

  // Sort by weekStart descending (newest completed week first)
  pastCompletedFts.sort((a, b) => getFagTaxWeekStartMs(b) - getFagTaxWeekStartMs(a));

  let html = `<div class="sub-fagtax-section" id="sub-fagtax-history" style="margin-top:20px">
    <h3>📜 FAG-TAX VERLAUF</h3>`;

  if (pastCompletedFts.length === 0) {
    html += `<p style="color:var(--text-secondary);font-weight:700;text-align:center;padding:12px;font-size:0.8rem">Noch keine abgeschlossenen Fag-Tax-Wochen vorhanden.</p>`;
  } else {
    pastCompletedFts.forEach(ft => {
      const wsMs = getFagTaxWeekStartMs(ft);
      const wsDate = new Date(wsMs);
      const dateStr = wsDate.toLocaleDateString('de-DE');
      const kw = getKW(wsDate);
      const kwLabel = `${dateStr} KW ${kw}`;

      const breakdown = [];
      if (ft.loginCost > 0 || ft.loginsCount > 0) breakdown.push(`${ft.loginsCount || 0} Logins = ${(ft.loginCost || 0).toFixed(2).replace('.', ',')}€`);
      if (ft.minuteCost > 0 || ft.minutesCount > 0 || ft.secondsCount > 0) {
        const mins = ft.minutesCount || Math.ceil((ft.secondsCount || 0) / 60);
        breakdown.push(`${mins} Min = ${(ft.minuteCost || 0).toFixed(2).replace('.', ',')}€`);
      }
      if (ft.taxAmount > 0) breakdown.push(`Steuer (${(ft.taxAmount || 0).toFixed(2).replace('.', ',')}€)`);
      const carriedArr = ft.carriedInterest || [];
      if (carriedArr.length > 0) {
        carriedArr.forEach(c => breakdown.push(`Zinsen KW ${c.sourceKW}: ${(c.amount || 0).toFixed(2).replace('.',',')}€`));
      }
      if (ft.interestAmount > 0) {
        breakdown.push(`+${ft.interestAmount.toFixed(2).replace('.', ',')}€ Verzug`);
      }

      const totalAmt = ft.paid
        ? (ft.totalWithInterest || ft.totalAmount || 0)
        : (ft.totalAmount || ft.baseAmount || 0);
      const totalStr = totalAmt.toFixed(2).replace('.', ',') + '€';

      const paidBadge = ft.paid
        ? `<span style="font-weight:900;color:var(--green)">${totalStr} ✅</span>`
        : `<span style="font-weight:900;color:var(--red)">${totalStr} 🔥 OFFEN</span>`;

      html += `<div class="ft-history-item" style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:var(--bg-surface);border:1px solid var(--border);margin-bottom:6px;gap:10px;flex-wrap:wrap">
        <div style="flex:1;min-width:140px">
          <span style="font-weight:800;font-size:0.85rem">${kwLabel}</span>
          <div style="font-size:0.7rem;color:var(--text-secondary);margin-top:2px">${breakdown.join(' • ')}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="ft-history-paid">${paidBadge}</span>
          <button class="btn btn--sm btn--cyan btn-download-history-pdf" data-ftid="${ft.id}" style="padding:4px 10px;font-size:0.7rem;font-weight:800;letter-spacing:0.5px">📄 PDF HERUNTERLADEN</button>
        </div>
      </div>`;
    });
  }

  html += '</div>';

  const fagtaxUI = $('sub-fagtax-ui');
  if (fagtaxUI) {
    fagtaxUI.insertAdjacentHTML('afterend', html);
  } else {
    const section = qs('#payments-card');
    if (section) section.insertAdjacentHTML('beforebegin', html);
  }

  // Attach PDF download handlers
  qsa('.btn-download-history-pdf').forEach(btn => {
    btn.onclick = () => {
      const ft = fagTaxes.find(f => f.id === btn.dataset.ftid);
      if (!ft) return;
      const sub = subs.find(s => s.id === ft.subId) || currentUser;
      generateFagTaxInvoice(
        sub,
        ft.loginsCount || 0,
        ft.secondsCount || 0,
        ft.loginCost || 0,
        ft.minuteCost || 0,
        ft.taxAmount || 0,
        ft.checkCost || 0,
        ft.interestAmount || 0,
        ft.totalAmount || 0,
        ft,
        ft.carriedInterest || [],
        ft.baseAmount
      );
    };
  });
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
  if (confirmBtn) confirmBtn.onclick = async () => {
    if (onConfirm) {
      const res = await onConfirm();
      if (res === false) return; // Keep modal open if validation failed
    }
    hideModal();
  };
}

function hideModal() {
  modalOverlay.style.display = 'none';
}

function showAlert(title, message) {
  showModal(title, `<p>${escapeHtml(message)}</p>`);
}

function showConfirm(title, message) {
  return new Promise(resolve => {
    let resolved = false;
    const safeResolve = (val) => { if (!resolved) { resolved = true; resolve(val); } };

    showModal(title, `<p>${escapeHtml(message)}</p>`, 'BESTÄTIGEN', () => safeResolve(true), 'ABBRECHEN');
    const cancelBtn = document.getElementById('modal-cancel');
    if (cancelBtn) {
      cancelBtn.onclick = () => { hideModal(); safeResolve(false); };
    }
    modalCloseBtn.onclick = () => { hideModal(); safeResolve(false); };
    modalOverlay.onclick = (e) => { if (e.target === modalOverlay) { hideModal(); safeResolve(false); } };

    // #7: Handle Escape key to prevent promise leak
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', escHandler);
        hideModal();
        safeResolve(false);
      }
    };
    document.addEventListener('keydown', escHandler);
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

function updateLoanSelectVisibility() {
  if (inputCategory.value === 'darlehen' && inputSub.value) {
    loanSelectRow.style.display = 'flex';
    inputLoan.innerHTML = '<option value="" disabled selected>— BITTE DARLEHEN WÄHLEN —</option>';
    const subLoans = loanContracts.filter(l => l.subId === inputSub.value && l.status !== 'completed');
    if (subLoans.length === 0) {
      inputLoan.innerHTML += '<option value="" disabled>Keine aktiven Darlehen gefunden</option>';
    } else {
      subLoans.forEach(l => {
        const idPrefix = l.id.slice(0, 6).toUpperCase();
        inputLoan.innerHTML += `<option value="${l.id}">${idPrefix} - ${l.principal}€</option>`;
      });
    }
  } else {
    loanSelectRow.style.display = 'none';
    inputLoan.value = '';
  }
}
inputCategory.addEventListener('change', updateLoanSelectVisibility);
inputSub.addEventListener('change', updateLoanSelectVisibility);

paymentForm.addEventListener('submit', async e => {
  e.preventDefault();
  const amount = inputAmount.value, category = inputCategory.value, description = inputDescription.value.trim(), subId = inputSub.value;
  const loanId = category === 'darlehen' ? inputLoan.value : null;
  
  if (!amount || !category || !description || !subId) {
    formFeedback.textContent = '✕ ALLE FELDER AUSFÜLLEN, DU UNFÄHIGER K N E C H T';
    formFeedback.style.color = 'var(--red)'; return;
  }
  if (category === 'darlehen' && !loanId) {
    formFeedback.textContent = '✕ BITTE EIN DARLEHEN AUSWÄHLEN!';
    formFeedback.style.color = 'var(--red)'; return;
  }
  const val = parseFloat(amount);
  if (isNaN(val) || val <= 0) {
    formFeedback.textContent = '✕ KEINE GÜLTIGE ZAHL! WILLST DU MICH VERARSCHEN?';
    formFeedback.style.color = 'var(--red)'; return;
  }
  formFeedback.textContent = 'TRAGE EIN...'; formFeedback.style.color = 'var(--text-dim)';
  const btn = qs('.btn--primary[type="submit"]', paymentForm); btn.disabled = true; btn.textContent = '...';
  const ok = await addPayment(amount, category, description, subId, inputDate.value, loanId);
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
    if (currentUser) {
      if (currentUser.role === 'dom') {
        renderFagTaxOverview();
        renderDomFagTaxInvoices();
      } else {
        renderSubFagTaxInvoices();
      }
    } subFeedback.textContent = '✓ NEUES SCHWEIN HINZUGEFÜGT!';
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
// NEW FEATURES: LOAN CONTRACTS, MAHNSTUFEN, WHEEL, TICKER, SHOP
// =============================================

let loanContracts = [];
let wheelSpins = [];
let tributeTasks = [];
let shopItems = [];
let shopBids = [];
let unsubscribeLoans = null;
let unsubscribeWheel = null;
let unsubscribeShopItems = null;
let unsubscribeShopBids = null;

// --- LISTENERS ---
function startLoansListener() {
  if (unsubscribeLoans) unsubscribeLoans();
  if (!db) return;
  unsubscribeLoans = db.collection('loanContracts').onSnapshot(snap => {
    loanContracts = [];
    snap.forEach(doc => loanContracts.push({ id: doc.id, ...doc.data() }));
    syncLoanPaymentsFromPaidInvoices();
    if (currentUser) {
      if (currentUser.role === 'dom') renderDomLoansOverview();
      else renderSubLoansView();
    }
  }, err => {
    console.warn('Loans listener error:', err.message);
    showToast('Fehler beim Laden der Darlehen: ' + err.message, 'error');
  });
}

function startWheelListener() {
  if (unsubscribeWheel) unsubscribeWheel();
  if (!db) return;

  const loadLocalSpins = () => {
    try {
      const local = JSON.parse(localStorage.getItem('fido_local_wheel_spins') || '[]');
      let needsSave = false;
      local.forEach(l => {
        if (!wheelSpins.some(w => w.id === l.id)) {
          wheelSpins.push(l);
          // Try to sync to Firestore if not present
          if (currentUser && currentUser.role === 'sub') {
            db.collection('wheelSpins').doc(l.id).set(l).catch(() => {});
          }
        }
      });
    } catch (_) {}
  };

  unsubscribeWheel = db.collection('wheelSpins').onSnapshot(snap => {
    wheelSpins = [];
    snap.forEach(doc => wheelSpins.push({ id: doc.id, ...doc.data() }));
    loadLocalSpins();
    if (currentUser) {
      if (currentUser.role === 'sub') renderWheelPendingNotices();
      else if (currentUser.role === 'dom') renderDomWheelOverview();
    }
    checkAndApplyMahnstufen();
  }, err => {
    console.warn('wheelSpins snapshot listener error:', err);
    loadLocalSpins();
    if (currentUser) {
      if (currentUser.role === 'sub') renderWheelPendingNotices();
      else if (currentUser.role === 'dom') renderDomWheelOverview();
    }
  });
}

function startShopListener() {
  if (unsubscribeShopItems) unsubscribeShopItems();
  if (unsubscribeShopBids) unsubscribeShopBids();
  if (!db) return;
  unsubscribeShopItems = db.collection('shopItems').onSnapshot(snap => {
    shopItems = [];
    snap.forEach(doc => shopItems.push({ id: doc.id, ...doc.data() }));
    if (currentUser) {
      if (currentUser.role === 'dom') renderDomShopOverview();
      else renderSubShopOverview();
    }
  });
  unsubscribeShopBids = db.collection('shopBids').onSnapshot(snap => {
    shopBids = [];
    snap.forEach(doc => shopBids.push({ id: doc.id, ...doc.data() }));
    if (currentUser && currentUser.role === 'dom') renderDomShopOverview();
  });
}

// --- DOM FAGTAX INVOICES OVERVIEW ---
function renderDomFagTaxInvoices() {
  const listEl = document.getElementById('dom-invoices-list');
  if (!listEl || !currentUser || currentUser.role !== 'dom') return;

  if (fagTaxes.length === 0) {
    listEl.innerHTML = '<p style="color:var(--text-dim);font-size:0.8rem;text-align:center">Bisher noch keine FagTax-Rechnungen eingefroren.</p>';
    return;
  }

  listEl.innerHTML = fagTaxes.map(ft => {
    const ws = ft.weekStart?.seconds ? new Date(ft.weekStart.seconds * 1000) : new Date(ft.weekStart);
    const kw = getKW(ws);
    const range = formatWeekRange(ws);
    const total = ft.totalAmount || 0;
    const paidAmt = ft.totalWithInterest || total;
    const sub = subs.find(s => s.id === ft.subId);
    const subName = sub ? (sub.displayName || sub.username) : ft.username;
    
    const paidBadge = ft.paid 
      ? `<span style="color:var(--green);font-weight:700">✓ BEZAHLT (${paidAmt.toFixed(2).replace('.', ',')}€)</span>`
      : '<span style="color:var(--red);font-weight:700">🔥 OFFEN</span>';
      
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-surface);border:1px solid var(--border);margin-bottom:8px;border-radius:4px;gap:12px;flex-wrap:wrap">
      <div>
        <div style="font-weight:800;font-size:0.9rem">🐷 ${escapeHtml(subName)}: RECHNUNG KW ${kw} (${range})</div>
        <div style="font-size:0.75rem;color:var(--text-dim);margin-top:2px">Rechnungsbetrag: <strong style="color:var(--red)">${total.toFixed(2).replace('.', ',')}€</strong> • Status: ${paidBadge}</div>
      </div>
      <div class="card-actions-responsive">
        ${ft.paid ? '' : `<button class="btn btn--sm btn--success btn-mark-ft-paid" data-ftid="${ft.id}" data-subid="${ft.subId}" data-amt="${total}" data-kw="${kw}">✓ ALS BEZAHLT MARKIEREN</button>`}
        <button class="btn btn--sm btn--cyan btn-download-dom-pdf" data-ftid="${ft.id}">📄 PDF</button>
      </div>
    </div>`;
  }).join('');

  qsa('.btn-mark-ft-paid').forEach(btn => {
    btn.onclick = async () => {
      const ft = fagTaxes.find(f => f.id === btn.dataset.ftid);
      if (ft) {
        await settleAllFagTaxPositions(ft, new Date(), 0, parseFloat(btn.dataset.amt) || ft.totalAmount || 0, btn.dataset.kw);
        showToast(`Fag-Tax-Rechnung KW ${btn.dataset.kw} & alle enthaltenen Forderungen als bezahlt markiert!`, 'success');
      } else {
        openManualPaymentModal(btn.dataset.subid, 'fagtax', `FagTax Rechnung KW ${btn.dataset.kw} bezahlt`, btn.dataset.amt);
      }
    };
  });

  qsa('.btn-download-dom-pdf').forEach(btn => {
    btn.onclick = () => {
      const ft = fagTaxes.find(f => f.id === btn.dataset.ftid);
      if (!ft) return;
      const sub = subs.find(s => s.id === ft.subId);
      generateFagTaxInvoice(sub || { username: ft.username, displayName: ft.username }, ft.loginsCount || 0, ft.secondsCount || 0, ft.loginCost || 0, ft.minuteCost || 0, ft.taxAmount || 0, ft.checkCost || 0, ft.interestAmount || 0, ft.totalAmount || 0, ft, ft.carriedInterest || [], ft.baseAmount);
    };
  });
}

// --- SUB FAGTAX INVOICES SELF-SERVICE ---
function renderSubFagTaxInvoices() {
  const listEl = document.getElementById('sub-invoices-list');
  if (!listEl || !currentUser) return;
  const curSubId = currentUser.id || currentUser.uid;
  const myFts = fagTaxes.filter(f => f.subId === curSubId || f.subId === currentUser.id || (currentUser.username && f.username === currentUser.username))
    .sort((a, b) => ((b.weekStart?.seconds || 0) - (a.weekStart?.seconds || 0)));

  if (myFts.length === 0) {
    listEl.innerHTML = '<p style="color:var(--text-dim);font-size:0.8rem;text-align:center">Bisher noch keine FagTax-Rechnungen vorhanden.</p>';
    return;
  }

  listEl.innerHTML = myFts.map(ft => {
    const ws = ft.weekStart?.seconds ? new Date(ft.weekStart.seconds * 1000) : new Date(ft.weekStart);
    const kw = getKW(ws);
    const range = formatWeekRange(ws);
    const total = ft.totalAmount || 0;
    const paidAmt = ft.totalWithInterest || total;
    const paidBadge = ft.paid 
      ? `<span style="color:var(--green);font-weight:700">✓ BEZAHLT (${paidAmt.toFixed(2).replace('.', ',')}€)</span>`
      : '<span style="color:var(--red);font-weight:700">🔥 OFFEN</span>';
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-surface);border:1px solid var(--border);margin-bottom:8px;border-radius:4px;gap:12px;flex-wrap:wrap">
      <div>
        <div style="font-weight:800;font-size:0.9rem">FAG-TAX RECHNUNG KW ${kw} (${range})</div>
        <div style="font-size:0.75rem;color:var(--text-dim);margin-top:2px">Rechnungsbetrag: <strong style="color:var(--red)">${total.toFixed(2).replace('.', ',')}€</strong> • Status: ${paidBadge}</div>
      </div>
      <div class="card-actions-responsive">
        <button class="btn btn--sm btn--cyan btn-download-sub-pdf" data-ftid="${ft.id}">📄 RECHNUNG ALS PDF HERUNTERLADEN</button>
      </div>
    </div>`;
  }).join('');

  qsa('.btn-download-sub-pdf').forEach(btn => {
    btn.onclick = () => {
      const ft = fagTaxes.find(f => f.id === btn.dataset.ftid);
      if (!ft) return;
      const sub = subs.find(s => s.id === ft.subId) || currentUser;
      generateFagTaxInvoice(sub, ft.loginsCount || 0, ft.secondsCount || 0, ft.loginCost || 0, ft.minuteCost || 0, ft.taxAmount || 0, ft.checkCost || 0, ft.interestAmount || 0, ft.totalAmount || 0, ft, ft.carriedInterest || [], ft.baseAmount);
    };
  });
}

// --- DARLEHENSVERTRAG (LOAN CONTRACT) ---
function openLoanContractModal() {
  const subName = currentUser.displayName || currentUser.username;
  const bodyHTML = `
    <form id="loan-wizard-form" style="display:flex;flex-direction:column;gap:12px">
      <div style="background:rgba(255,23,68,0.1);border-left:4px solid var(--red);padding:8px 12px;font-size:0.75rem;color:var(--text-secondary)">
        <strong style="color:var(--red)">RECHTSHINWEIS & SCHULDANERKENNTNIS (§ 781 BGB):</strong><br>
        Durch den Abschluss dieses Vertrages unterwirfst du dich bedingungslos dem Darlehensvertrag sowie der sofortigen Zwangsvollstreckung und Gehaltsabtretung.
      </div>
      
      <div>
        <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">1. DARLEHENSBETRAG WÄHLEN (€)</label>
        <div style="display:flex;gap:6px;margin-top:4px;margin-bottom:6px;flex-wrap:wrap">
          <button type="button" class="btn btn--sm btn-loan-preset" data-val="50">50€</button>
          <button type="button" class="btn btn--sm btn-loan-preset" data-val="100">100€</button>
          <button type="button" class="btn btn--sm btn-loan-preset" data-val="250">250€</button>
          <button type="button" class="btn btn--sm btn-loan-preset" data-val="500">500€</button>
          <button type="button" class="btn btn--sm btn-loan-preset" data-val="1000">1000€</button>
        </div>
        <input type="number" id="loan-amount-input" value="100" min="10" max="5000" step="10" style="width:100%;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text)">
      </div>

      <div>
        <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">2. WOCHENZINSEN (AUTOMATISCH 10% / WOCHE)</label>
        <div id="loan-interest-preview" style="font-size:0.85rem;color:var(--purple);font-weight:800;padding:6px;background:var(--bg-surface)">10,00€ Zinsen pro Woche</div>
      </div>

      <div>
        <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">3. RATENHÖHE & RHYTHMUS</label>
        <div style="display:flex;gap:8px">
          <select id="loan-rhythm" style="flex:1;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text)">
            <option value="weekly">Wöchentlich (jeden Freitag)</option>
            <option value="monthly_1">Monatlich (zum 1.)</option>
            <option value="monthly_15">Monatlich (zum 15.)</option>
          </select>
          <input type="number" id="loan-rate-input" value="25" min="5" step="5" style="width:100px;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text)" placeholder="Rate €">
        </div>
      </div>

      <div>
        <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">4. DEVOTIONS-ZUSATZOPTIONEN & GEBÜHREN</label>
        <div style="display:flex;flex-direction:column;gap:6px;margin-top:4px">
          <label style="display:flex;align-items:center;gap:6px;font-size:0.75rem"><input type="checkbox" class="loan-addon" data-title="Devotions-Bearbeitungsgebühr" data-cost="34.99" checked> 📜 Devotions-Bearbeitungsgebühr (+34,99€)</label>
          <label style="display:flex;align-items:center;gap:6px;font-size:0.75rem"><input type="checkbox" class="loan-addon" data-title="Express-Auszahlungs & Hörigkeitsaufschlag" data-cost="49.99" checked> ⚡ Express-Auszahlungs & Hörigkeitsaufschlag (+49,99€)</label>
          <label style="display:flex;align-items:center;gap:6px;font-size:0.75rem"><input type="checkbox" class="loan-addon" data-title="Insolvenz-Absicherungsstrafe" data-cost="99.99"> 🛡 Insolvenz-Absicherungsstrafe (+99,99€)</label>
          <label style="display:flex;align-items:center;gap:6px;font-size:0.75rem"><input type="checkbox" class="loan-addon" data-title="Schuldner-Pranger-Gebühr" data-cost="29.99"> 🔔 Schuldner-Pranger-Gebühr (+29,99€)</label>
        </div>
      </div>

      <div>
        <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">5. DARLEHENSNEHMER PERSONALDHALT & IBAN</label>
        <input type="text" id="loan-fullname" value="${escapeHtml(subName)}" placeholder="Vollständiger Vor- und Nachname (Personalausweis)" required style="width:100%;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:4px">
        <input type="text" id="loan-address" placeholder="Strasse, Hausnr, PLZ, Ort" required style="width:100%;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:4px">
        <input type="text" id="loan-iban" placeholder="DE00 0000 0000 0000 0000 00 (IBAN für Lohn- & Sachpfändung)" required style="width:100%;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:4px">
      </div>

      <div style="padding:10px;background:#2a0000;border:1px solid var(--red);margin-top:6px;display:flex;flex-direction:column;gap:6px">
        <label style="display:flex;align-items:flex-start;gap:8px;font-size:0.72rem;color:#fff;cursor:pointer">
          <input type="checkbox" id="loan-schuld-agree" required style="margin-top:2px">
          <span><strong>§ 781 BGB ABSTRAKTES SCHULDANERKENNTNIS:</strong> Ich anerkenne hiermit unwiderruflich und konstitutiv die obige Gesamtschuldsumme nebst wöchentlicher Zinsen als persönliche Verbindlichkeit gegenüber dem HERRN.</span>
        </label>
        <label style="display:flex;align-items:flex-start;gap:8px;font-size:0.72rem;color:#fff;cursor:pointer">
          <input type="checkbox" id="loan-abtretung-agree" required style="margin-top:2px">
          <span><strong>§ 398 BGB GEHALTSABTRETUNG:</strong> Ich trete hiermit für den Fall des Zahlungsverzugs meinen pfändbaren Teil des Gegenwärtigen und zukünftigen Arbeitseinkommens sowie etwaige Sachwerte unwiderruflich an den Gläubiger ab.</span>
        </label>
        <label style="display:flex;align-items:flex-start;gap:8px;font-size:0.72rem;color:#fff;cursor:pointer">
          <input type="checkbox" id="loan-inkasso-agree" required style="margin-top:2px">
          <span><strong>SOFORTIGE INKASSO-ÜBERMITTLUNG (§ 794 ZPO):</strong> Ich willige ein, dass bei Verzug ab Tag 1 die Forderung sofort und kostenpflichtig an ein Inkassosyndikat zum Forderungsverkauf übergeben werden darf.</span>
        </label>
      </div>
    </form>
  `;

  showModal('📜 DARLEHENSVERTRAG ABSCHLIESSEN', bodyHTML, 'VERTRAG JETZT ABSCHLIESSEN', async () => {
    try {
      const amtInput = document.getElementById('loan-amount-input');
      const rhythmInput = document.getElementById('loan-rhythm');
      const rateInput = document.getElementById('loan-rate-input');
      const nameInput = document.getElementById('loan-fullname');
      const addressInput = document.getElementById('loan-address');
      const ibanInput = document.getElementById('loan-iban');
      const agreeSchuld = document.getElementById('loan-schuld-agree');
      const agreeAbtretung = document.getElementById('loan-abtretung-agree');
      const agreeInkasso = document.getElementById('loan-inkasso-agree');

      if (!amtInput || !nameInput || !addressInput || !agreeInkasso) {
        console.warn('Form fields missing during submission');
        return false;
      }

      const amt = parseFloat(amtInput.value) || 0;
      const rhythm = rhythmInput ? rhythmInput.value : 'weekly';
      const rate = parseFloat(rateInput ? rateInput.value : 0) || 0;
      const name = nameInput.value.trim();
      const address = addressInput.value.trim();
      const iban = ibanInput ? ibanInput.value.trim() : '';

      if (!agreeSchuld?.checked || !agreeAbtretung?.checked || !agreeInkasso?.checked || !name || !address || amt <= 0) {
        showAlert('FEHLER', 'Bitte fülle alle Pflichtfelder aus und akzeptiere alle 3 Rechts- & Abtretungsklauseln (§ 781, § 398 BGB, § 794 ZPO).');
        return false;
      }

      let addonsSum = 0;
      const addons = [];
      qsa('.loan-addon:checked').forEach(cb => {
        const c = parseFloat(cb.dataset.cost) || 0;
        addonsSum += c;
        addons.push({ title: cb.dataset.title, cost: c });
      });

      const weeklyInterest = round2(amt * 0.10);
      const curSubId = currentUser.id || currentUser.uid || 'sub';
      const contractData = {
        subId: curSubId,
        username: currentUser.username || 'sub',
        displayName: name,
        address, iban,
        principal: amt,
        weeklyInterestRate: 0.10,
        weeklyInterestAmount: weeklyInterest,
        rhythm,
        installmentRate: rate,
        addons,
        addonsSum,
        schuldAnerkannt: true,
        abtretungAgreed: true,
        inkassoAgreed: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'active'
      };

      let refId = 'lnc_' + Date.now();
      try {
        if (db) {
          const ref = await db.collection('loanContracts').add(contractData);
          refId = ref.id;
        }
      } catch (e) {
        console.error('Firestore loanContracts write error:', e);
      }

      // Always append locally to ensure UI updates immediately
      const fullContract = { id: refId, ...contractData };
      if (!loanContracts.some(l => l.id === refId)) {
        loanContracts.push(fullContract);
      }

      // Dual-sync to sub document to bypass collection rule restrictions
      if (curSubId && db) {
        db.collection('subs').doc(curSubId).set({
          loanContractsArr: firebase.firestore.FieldValue.arrayUnion(fullContract)
        }, { merge: true }).catch(() => {});
      }

      hideModal();

      showToast('Darlehensvertrag & Schuldanerkenntnis unterzeichnet! 📜', 'success');
      if (currentUser.role === 'dom') renderDomLoansOverview();
      else renderSubLoansView();

      setTimeout(() => {
        try {
          generateLoanContractPDF(fullContract);
        } catch (pdfErr) {
          console.warn('PDF generation notice:', pdfErr);
        }
      }, 100);

      return true;
    } catch (err) {
      console.error('Error in openLoanContractModal:', err);
      showAlert('FEHLER', 'Fehler beim Abschließen des Darlehensvertrags: ' + (err.message || err));
      return false;
    }
  });

  // Prevent default HTML form submission if Enter key is pressed inside modal inputs
  const loanForm = document.getElementById('loan-wizard-form');
  if (loanForm) {
    loanForm.onsubmit = (e) => {
      e.preventDefault();
      const confirmBtn = document.getElementById('modal-confirm');
      if (confirmBtn) confirmBtn.click();
    };
  }

  const amtInput = document.getElementById('loan-amount-input');
  const prevEl = document.getElementById('loan-interest-preview');
  function updateInterest() {
    const v = parseFloat(amtInput.value) || 0;
    if (prevEl) prevEl.textContent = (v * 0.10).toFixed(2).replace('.', ',') + '€ Zinsen pro Woche';
  }
  if (amtInput) amtInput.oninput = updateInterest;
  qsa('.btn-loan-preset').forEach(b => {
    b.onclick = () => { if (amtInput) { amtInput.value = b.dataset.val; updateInterest(); } };
  });
}

function generateLoanContractPDF(c) {
  const contractId = (c.id || 'NEU').slice(0, 8).toUpperCase();
  const subName = c.displayName || c.username;
  const principal = c.principal || 0;
  const addonsSum = c.addonsSum || 0;
  const grandTotal = principal + addonsSum;
  const weeklyInterest = c.weeklyInterestAmount || (principal * 0.10);
  const rate = c.installmentRate || 25;

  const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>DARLEHENSVERTRAG ${contractId}</title>
<style>
  @page { margin: 15mm; size: A4; }
  body { font-family: 'Times New Roman', Times, serif; font-size: 10pt; line-height: 1.4; color: #111; padding: 20px; }
  .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 18px; }
  .header h1 { font-size: 16pt; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0; font-weight: bold; }
  .header p { font-size: 9pt; color: #444; margin: 2px 0; }
  .section { margin-bottom: 14px; padding: 10px 12px; border: 1px solid #ccc; background: #fff; }
  .title { font-weight: bold; background: #f0f0f0; padding: 4px 8px; text-transform: uppercase; font-size: 9.5pt; border-bottom: 1px solid #ccc; margin: -10px -12px 10px -12px; }
  .highlight { color: #880000; font-weight: bold; }
  .signature-box { margin-top: 35px; display: flex; justify-content: space-between; }
  .sig { border-top: 1px solid #000; width: 42%; text-align: center; padding-top: 5px; font-size: 8.5pt; }
  .stamp { border: 2px dashed #880000; color: #880000; font-weight: bold; display: inline-block; padding: 6px 10px; transform: rotate(-2deg); text-align: center; float: right; margin-top: -5px; font-size: 8pt; }
  table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 9pt; }
  th, td { border: 1px solid #ddd; padding: 5px 8px; text-align: left; }
  th { background: #f5f5f5; font-weight: bold; }
</style></head><body>
  <div class="stamp">OFFIZIELLER VERTRAG<br>GEMÄSS § 488 BGB</div>
  <div class="header">
    <h1>DARLEHENSVERTRAG & SCHULDANERKENNTNIS</h1>
    <p>Vertragsnummer: <strong>LNC-${contractId}</strong> • Aktenzeichen: DAR-2026-${Math.floor(10000 + Math.random() * 90000)}</p>
    <p>Geregelt nach den Bestimmungen des Bürgerlichen Gesetzbuches (BGB)</p>
  </div>

  <div class="section">
    <div class="title">§ 1 VERTRAGSPARTNER</div>
    <p>Zwischen <strong>HERR (Gebieter & Gläubiger)</strong> – nachfolgend <em>Darlehensgeber</em> genannt –</p>
    <p>und <strong>${escapeHtml(subName)}</strong> – nachfolgend <em>Darlehensnehmer</em> genannt –</p>
    <p>Anschrift des Darlehensnehmers: ${escapeHtml(c.address || '—')}</p>
    <p>Hinterlegte Bankverbindung (IBAN): ${escapeHtml(c.iban || '—')}</p>
  </div>

  <div class="section">
    <div class="title">§ 2 DARLEHENSBETRAG, GEBÜHREN & GESAMTFORDERUNG</div>
    <table>
      <tr><th>Position</th><th>Betrag (€)</th></tr>
      <tr><td>Nennbetrag Darlehen (Hauptforderung)</td><td>${principal.toFixed(2).replace('.', ',')} €</td></tr>
      ${(c.addons || []).map(a => `<tr><td>Gebühr (${escapeHtml(a.title)})</td><td>${(a.cost || 0).toFixed(2).replace('.', ',')} €</td></tr>`).join('')}
      <tr><td><strong>Initiale Netto-Gesamtschuld</strong></td><td><strong>${grandTotal.toFixed(2).replace('.', ',')} €</strong></td></tr>
    </table>
  </div>

  <div class="section">
    <div class="title">§ 3 ZINSEN, RATENZAHLUNG & TILGUNGSPLAN</div>
    <p>1. <strong>Verzinsung:</strong> Das Darlehen wird mit einem vertraglichen Wochenzins von <strong>10,00 % pro Woche</strong> (${weeklyInterest.toFixed(2).replace('.', ',')} € / Woche) verzinst.</p>
    <p>2. <strong>Ratenvereinbarung:</strong> Die vereinbarte regelmäßige Ratenzahlung beträgt <strong>${rate.toFixed(2).replace('.', ',')} €</strong> (Rhythmus: ${c.rhythm === 'weekly' ? 'Wöchentlich jeweils freitags' : 'Monatlich'}).</p>
    <p>3. <strong>Transparente Schuldentilgung:</strong> Jede geleistete Zahlung verringert umgehend die verbleibende Restschuld. Sobald die Gesamtschuld nebst Zinsen auf 0,00 € getilgt ist, erlischt dieser Vertrag vollumfänglich und der Darlehensnehmer ist vollständig schuldenfrei.</p>
  </div>

  <div class="section">
    <div class="title">§ 4 CONSTITUTIVES SCHULDANERKENNTNIS (§ 781 BGB) & ABTRETUNG (§ 398 BGB)</div>
    <p>1. Der Darlehensnehmer erkennt hiermit ausdrücklich und unwiderruflich an, dem Darlehensgeber den Gesamtbetrag gemäß § 2 nebst den vereinbarten Zinsen zu schulden.</p>
    <p>2. Zur Sicherung der Rückzahlung tritt der Darlehensnehmer für den Fall eines Zahlungsverzugs seine Ansprüche auf Arbeitseinkommen in pfändbarer Höhe an den Darlehensgeber ab.</p>
  </div>

  <div class="section" style="border: 1px solid #880000; background: #fffdfd;">
    <div class="title" style="background:#880000;color:#fff">§ 5 VERZUG & RECHTSFOLGEN</div>
    <p class="highlight">Bei Zahlungsverzug ist der Darlehensgeber berechtigt, das Mahnverfahren einzuleiten und die Forderung nach den gesetzlichen Bestimmungen geltend zu machen. Bei ordnungsgemäßer Erfüllung der Ratenzahlungen verbleibt der Vertrag im regulären Tilgungsstatus.</p>
  </div>

  <div class="signature-box">
    <div class="sig">${SVG_PDF_ICONS.crown}<br>HERR (Darlehensgeber)</div>
    <div class="sig">${SVG_PDF_ICONS.user}<br>${escapeHtml(subName)} (Darlehensnehmer)<br><span style="font-size:7pt;color:#666">[Elektronisch unterzeichnet & bestätigt]</span></div>
  </div>
</body></html>`;

  try {
    const w = window.open('', '_blank');
    if (w && !w.closed) {
      w.document.write(html);
      w.document.close();
    } else {
      // Fallback for pop-up blocker
      showModal('📜 DARLEHENSVERTRAG ' + contractId, `
        <div style="max-height:55vh;overflow-y:auto;background:#fff;color:#000;padding:16px;border-radius:4px">
          ${html.replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/i, '').replace(/<\/body>[\s\S]*/i, '')}
        </div>
        <p style="font-size:0.75rem;color:var(--orange);margin-top:8px">💡 Tipp: Erlaube Pop-ups im Browser für automatisches Drucken.</p>
      `, '📄 NEUES FENSTER ÖFFNEN', () => {
        const win = window.open();
        if (win) { win.document.write(html); win.document.close(); }
      }, 'SCHLIESSEN');
    }
  } catch (e) {
    console.warn('Window open fallback triggered:', e);
  }
}

// --- DOM UNIFIED PAYMENT BOOKING (CUSTOM DATE, SUB & PURPOSE) ---
function openManualPaymentModal(defaultSubId = '', defaultCategory = 'tribut', defaultDesc = '', defaultAmt = '', defaultLoanId = '') {
  const card = document.getElementById('payment-booking-card');
  if (card) {
    card.scrollIntoView({ behavior: 'smooth' });
    card.style.transition = 'outline 0.3s, box-shadow 0.4s';
    card.style.outline = '2px solid var(--red)';
    card.style.boxShadow = '0 0 25px rgba(255,23,68,0.7)';
    setTimeout(() => { card.style.outline = 'none'; card.style.boxShadow = 'none'; }, 2000);
  }

  if (defaultSubId && inputSub) inputSub.value = defaultSubId;
  if (defaultCategory && inputCategory) inputCategory.value = defaultCategory;
  if (defaultAmt && inputAmount) inputAmount.value = defaultAmt;
  if (defaultDesc && inputDescription) inputDescription.value = defaultDesc;

  // Trigger loan dropdown update and select specified loan
  updateLoanSelectVisibility();
  if (defaultLoanId && inputLoan) {
    inputLoan.value = defaultLoanId;
  }

  const nowISO = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  if (inputDate) inputDate.value = nowISO;
}

// --- FAGTAX BETRAG ANPASSEN / TRINKGELD ---
function openEditFagTaxModal(ftId, subId, currentAmount) {
  const ft = fagTaxes.find(f => f.id === ftId);
  const sub = subs.find(s => s.id === subId);
  const name = sub ? (sub.displayName || sub.username) : 'Sau';

  const bodyHTML = `
    <div style="display:flex;flex-direction:column;gap:10px">
      <p style="font-size:0.8rem;color:var(--text-secondary)">Passe hier den Betrag für die FagTax-Rechnung von <strong>${escapeHtml(name)}</strong> an (z.B. bei freiwilligen Mehrzahlungen / Trinkgeld).</p>
      <div>
        <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">NEUER RECHNUNGSBETRAG (€) *</label>
        <input type="number" id="edit-ft-amount" value="${currentAmount}" min="1" step="5" style="width:100%;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:2px">
      </div>
      <div>
        <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">BEGRÜNDUNG / ANMERKUNG</label>
        <input type="text" id="edit-ft-note" placeholder="z.B. Freiwilliges Trinkgeld / Aufrundung durch Sau" style="width:100%;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:2px">
      </div>
    </div>
  `;

  showModal('✏️ FAGTAX BETRAG ANPASSEN', bodyHTML, 'BETRAG SPEICHERN', async () => {
    const newAmt = parseFloat(document.getElementById('edit-ft-amount').value) || 0;
    const note = document.getElementById('edit-ft-note').value.trim();
    if (newAmt <= 0) return;

    try {
      if (ft) {
        await db.collection('fagTaxes').doc(ft.id).update({
          totalAmount: newAmt,
          baseAmount: newAmt,
          note: note || 'Vom Herrn angepasst',
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } else {
        await db.collection('fagTaxes').add({
          subId,
          username: sub ? sub.username : 'sub',
          displayName: name,
          weekStart: getCurrentWeekStart(),
          baseAmount: newAmt,
          totalAmount: newAmt,
          paid: false,
          note: note || 'Manuell angelegte FagTax',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
      showToast(`FagTax Betrag auf ${newAmt.toFixed(2)}€ angepasst!`, 'success');
      renderFagTaxOverview();
    } catch (e) {
      console.error(e);
      showToast('Fehler beim Ändern des Betrags', 'error');
    }
  });
}

// --- DOM WHEEL SPINS OVERVIEW ---
function getLoansFromPayments() {
  const reconstructed = [];
  (payments || []).forEach(p => {
    if ((p.loanId || (p.description && p.description.toLowerCase().includes('darlehen'))) && (p.paidBy || p.subId)) {
      const match = p.description ? (p.description.match(/#(lnc_[a-zA-Z0-9_]+)/i) || p.description.match(/#(LNC_[a-zA-Z0-9_]+)/i)) : null;
      const loanId = p.loanId || (match ? match[1] : ('lnc_' + (p.paidBy || p.subId)));
      if (!reconstructed.some(l => l.id === loanId)) {
        reconstructed.push({
          id: loanId,
          subId: p.subId || '',
          username: p.paidBy || p.username || 'sub',
          displayName: p.paidBy || 'Sau',
          principal: parseFloat(p.amount) || 100,
          weeklyInterestRate: 0.10,
          weeklyInterestAmount: 10.00,
          installmentRate: 25.00,
          status: 'active'
        });
      }
    }
  });
  return reconstructed;
}

function getSpinsFromPayments() {
  const reconstructed = [];
  (payments || []).forEach(p => {
    if (p.description && p.description.includes('Glücksrad') && !p.description.includes('Einsatzgebühr')) {
      const amtMatch = p.description.match(/(\d+(?:[.,]\d+)?)\s*€/);
      const amt = amtMatch ? parseFloat(amtMatch[1].replace(',', '.')) : (parseFloat(p.amount) || 0);
      const titleMatch = p.description.match(/Glücksrad Gewinn-Strafe:\s*([^(\n]+)/i);
      const title = titleMatch ? titleMatch[1].trim() : 'Glücksrad Strafe';
      const spinId = p.id || ('ws_' + Date.now());
      if (!reconstructed.some(w => w.id === spinId)) {
        reconstructed.push({
          id: spinId,
          subId: p.subId || '',
          username: p.paidBy || p.username || 'sub',
          prizeTitle: title,
          prizeAmount: amt,
          paid: p.status === 'confirmed' || p.paid === true,
          mahnStufe: 0,
          createdAt: p.createdAt || new Date()
        });
      }
    }
  });
  return reconstructed;
}

function renderDomWheelOverview() {
  const el = document.getElementById('dom-wheel-overview');
  if (!el) return;

  // Aggregate spins from global collection, local state, embedded sub arrays, and payment history
  const allSpins = [...wheelSpins];
  subs.forEach(s => {
    if (s.wheelSpinsArr && Array.isArray(s.wheelSpinsArr)) {
      s.wheelSpinsArr.forEach(w => {
        if (!allSpins.some(x => x.id === w.id)) allSpins.push(w);
      });
    }
  });
  getSpinsFromPayments().forEach(w => {
    if (!allSpins.some(x => x.id === w.id)) allSpins.push(w);
  });

  if (allSpins.length === 0) {
    el.innerHTML = '<p style="color:var(--text-dim);font-size:0.8rem">Bisher keine Glücksrad-Strafen gedreht.</p>';
    return;
  }

  el.innerHTML = allSpins.map(sp => {
    const sub = subs.find(s => s.id === sp.subId || s.username === sp.username);
    const subName = sub ? (sub.displayName || sub.username) : (sp.username || 'Sau');
    const isPaid = sp.paid;

    let dateStr = '—';
    if (sp.paidAt) {
      const dt = sp.paidAt?.seconds ? new Date(sp.paidAt.seconds * 1000) : new Date(sp.paidAt);
      dateStr = dt.toLocaleString('de-DE');
    }

    return `
      <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border);margin-bottom:8px;border-radius:4px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div>
          <div style="font-weight:800;font-size:0.85rem">🎰 🐷 ${escapeHtml(subName)}: <span style="color:var(--red)">${escapeHtml(sp.prizeTitle || 'Glücksrad Strafe')}</span> (${(sp.prizeAmount || 0).toFixed(2)}€)</div>
          <div style="font-size:0.7rem;color:var(--text-dim);margin-top:2px">
            Mahnstufe: ${sp.mahnStufe || 0} • Status: ${isPaid ? `<span style="color:var(--green);font-weight:700">✅ BEZAHLT am ${dateStr}</span>` : '<span style="color:var(--red);font-weight:700">🔥 OFFEN</span>'}
          </div>
        </div>
        <div class="card-actions-responsive">
          ${isPaid ? '' : `<button class="btn btn--sm btn--success btn-mark-spin-paid" data-spinid="${sp.id}" data-subid="${sp.subId || ''}" data-amt="${sp.prizeAmount || 0}" data-title="${escapeHtml(sp.prizeTitle || '')}">✓ ALS BEZAHLT MARKIEREN</button>`}
        </div>
      </div>
    `;
  }).join('');

  qsa('.btn-mark-spin-paid').forEach(btn => {
    btn.onclick = () => {
      const spinId = btn.dataset.spinid;
      const subId = btn.dataset.subid;
      const now = new Date();
      openManualPaymentModal(subId, 'glücksrad', `Glücksrad Strafe Bezahlt: ${btn.dataset.title}`, btn.dataset.amt);
      
      const sp = wheelSpins.find(w => w.id === spinId);
      if (sp) { sp.paid = true; sp.paidAt = now; }

      if (db && spinId) {
        db.collection('wheelSpins').doc(spinId).update({
          paid: true,
          paidAt: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(() => {});
      }

      if (db && subId) {
        db.collection('subs').doc(subId).get().then(subDoc => {
          if (subDoc.exists) {
            const arr = subDoc.data().wheelSpinsArr || [];
            let updated = false;
            arr.forEach(w => {
              if (w.id === spinId) { w.paid = true; w.paidAt = now.toISOString(); updated = true; }
            });
            if (updated) {
              db.collection('subs').doc(subId).set({ wheelSpinsArr: arr }, { merge: true }).catch(() => {});
            }
          }
        }).catch(() => {});
      }
      renderDomWheelOverview();
      renderFagTaxOverview();
    };
  });
}

async function deleteLoanContract(loanId) {
  const lc = loanContracts.find(l => l.id === loanId);
  const subName = lc ? (lc.displayName || lc.username) : 'Sau';
  const displayId = loanId.slice(0, 6).toUpperCase();

  const confirmed = await showConfirm(
    '🗑 DARLEHENSVERTRAG LÖSCHEN',
    `Möchtest du den Darlehensvertrag #${displayId} von "${subName}" wirklich unwiderruflich löschen?`
  );
  if (!confirmed) return;

  try {
    if (db) {
      await db.collection('loanContracts').doc(loanId).delete().catch(err => {
        console.warn('Firestore loanContracts doc delete warning:', err);
      });

      if (lc && lc.subId) {
        try {
          const subDocRef = db.collection('subs').doc(lc.subId);
          const subDoc = await subDocRef.get();
          if (subDoc.exists) {
            const arr = subDoc.data().loanContractsArr || [];
            const updatedArr = arr.filter(item => item.id !== loanId);
            await subDocRef.set({ loanContractsArr: updatedArr }, { merge: true });
          }
        } catch (subErr) {
          console.warn('Sub document loanContractsArr update notice:', subErr);
        }
      }
    }

    loanContracts = loanContracts.filter(l => l.id !== loanId);

    showToast(`Darlehensvertrag #${displayId} gelöscht!`, 'info');
    if (currentUser && currentUser.role === 'dom') renderDomLoansOverview();
    else renderSubLoansView();
  } catch (e) {
    console.error('Error deleting loan contract:', e);
    showToast('Fehler beim Löschen des Darlehensvertrags', 'error');
  }
}

function renderDomLoansOverview() {
  const el = document.getElementById('dom-loans-overview');
  if (!el) return;

  // Aggregate loans from global collection, local state, embedded sub arrays, and payment history
  const allLoans = [...loanContracts];
  subs.forEach(s => {
    if (s.loanContractsArr && Array.isArray(s.loanContractsArr)) {
      s.loanContractsArr.forEach(l => {
        if (!allLoans.some(x => x.id === l.id)) allLoans.push(l);
      });
    }
  });
  getLoansFromPayments().forEach(l => {
    if (!allLoans.some(x => x.id === l.id)) allLoans.push(l);
  });

  if (allLoans.length === 0) {
    el.innerHTML = '<p style="color:var(--text-dim);font-size:0.8rem">Bisher keine Darlehensverträge abgeschlossen.</p>';
    return;
  }
  el.innerHTML = allLoans.map(lc => {
    const loanPayments = getLoanPayments(lc);
    const pmtsSum = loanPayments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
    const totalPaid = Math.max(parseFloat(lc.totalPaid) || 0, pmtsSum);
    const startTotal = (lc.principal || 0) + (lc.addonsSum || 0);
    const remaining = Math.max(0, startTotal - totalPaid);

    const isInkassoSold = lc.status === 'inkasso_sold';
    return `
      <div style="padding:12px;background:var(--bg-surface);border:1px solid ${isInkassoSold ? 'var(--red)' : 'var(--border)'};margin-bottom:10px;border-radius:4px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-weight:900;color:var(--red);font-size:0.9rem">📜 Darlehen #${lc.id.slice(0,6)} — 🐷 ${escapeHtml(lc.displayName || lc.username)} ${isInkassoSold ? '<span style="background:var(--red);color:#fff;padding:2px 6px;border-radius:3px;font-size:0.7rem">🔥 AN INKASSO VERKAUFT</span>' : ''}</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px">Nennbetrag: ${lc.principal}€ • Zinsen: ${lc.weeklyInterestAmount}€/Woche • Rate: ${lc.installmentRate}€</div>
            <div style="font-size:0.75rem;color:var(--purple);margin-top:2px;font-weight:700">Bereits getilgt: ${totalPaid.toFixed(2)}€ • Restbestand: <strong style="color:var(--red)">${remaining.toFixed(2)}€</strong></div>
            <div style="font-size:0.7rem;color:var(--text-dim);margin-top:2px">IBAN: ${escapeHtml(lc.iban || '—')} • Abtretung (§ 398 BGB): ✓ Gültig</div>
          </div>
          <div class="card-actions-responsive">
            <button class="btn btn--sm btn--primary btn-dom-loan-pay" data-subid="${lc.subId || ''}" data-lcid="${lc.id}" data-rate="${lc.installmentRate}">💳 RATENEINGANG BUCHEN</button>
            <button class="btn btn--sm btn--cyan btn-download-loan-pdf" data-lcid="${lc.id}">📄 VERTRAG-PDF</button>
            ${isInkassoSold ? `<button class="btn btn--sm btn--orange btn-download-inkasso-pdf" data-lcid="${lc.id}">⚡ INKASSO-BESCHEID PDF</button>` : `<button class="btn btn--sm btn--danger btn-sell-inkasso" data-lcid="${lc.id}" data-subid="${lc.subId || ''}" data-amt="${remaining}">⚖️ FORDERUNG AN INKASSO VERKAUFEN</button>`}
            <button class="btn btn--sm btn--danger btn-delete-loan-contract" data-lcid="${lc.id}">🗑 LÖSCHEN</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  qsa('.btn-dom-loan-pay').forEach(btn => {
    btn.onclick = () => {
      openManualPaymentModal(btn.dataset.subid, 'darlehen', `Darlehens-Ratenzahlung #${btn.dataset.lcid.slice(0,6)}`, btn.dataset.rate, btn.dataset.lcid);
    };
  });

  qsa('.btn-download-loan-pdf').forEach(btn => {
    btn.onclick = () => {
      const lc = loanContracts.find(l => l.id === btn.dataset.lcid);
      if (lc) generateLoanContractPDF(lc);
    };
  });

  qsa('.btn-sell-inkasso').forEach(btn => {
    btn.onclick = () => sellLoanToInkasso(btn.dataset.lcid, btn.dataset.amt);
  });

  qsa('.btn-download-inkasso-pdf').forEach(btn => {
    btn.onclick = () => {
      const lc = loanContracts.find(l => l.id === btn.dataset.lcid);
      if (lc) generateInkassoVollstreckungsBescheidPDF(lc);
    };
  });

  qsa('.btn-delete-loan-contract').forEach(btn => {
    btn.onclick = () => deleteLoanContract(btn.dataset.lcid);
  });
}

async function sellLoanToInkasso(loanId, remainingAmt) {
  const lc = loanContracts.find(l => l.id === loanId);
  if (!lc) return;
  const rem = parseFloat(remainingAmt) || 0;
  const subName = lc.displayName || lc.username;

  const confirmed = await showConfirm(
    '⚖️ FORDERUNG AN INKASSO-SYNDIKAT VERKAUFEN',
    `Möchtest du die offene Forderung von ${rem.toFixed(2)}€ von "${subName}" an das Inkasso-Syndikat verkaufen?\n\n- Die Schuldner-Forderung wird um 50% Inkasso-Aufschlag erhöht.\n- Es wird ein gerichtlicher Vollstreckungsbescheid generiert.`
  );
  if (!confirmed) return;

  try {
    const inkassoFee = round2(rem * 0.50);
    const newTotalDebt = round2(rem + inkassoFee);

    if (db) {
      await db.collection('loanContracts').doc(loanId).update({
        status: 'inkasso_sold',
        inkassoSoldAt: firebase.firestore.FieldValue.serverTimestamp(),
        inkassoFee,
        inkassoTotalDebt: newTotalDebt
      }).catch(() => {});
    }

    lc.status = 'inkasso_sold';
    lc.inkassoFee = inkassoFee;
    lc.inkassoTotalDebt = newTotalDebt;

    showToast(`Darlehen #${loanId.slice(0,6)} erfolgreich an Inkasso verkauft! ⚖️`, 'success');
    renderDomLoansOverview();
    generateInkassoVollstreckungsBescheidPDF(lc);
  } catch (e) {
    console.error('Error selling loan to inkasso:', e);
    showToast('Fehler beim Verkaufen der Forderung', 'error');
  }
}

function generateInkassoVollstreckungsBescheidPDF(lc) {
  const aktenzeichen = `INK-GER-${Math.floor(100000 + Math.random() * 900000)}`;
  const subName = lc.displayName || lc.username;
  const rem = lc.inkassoTotalDebt || ((lc.principal || 100) * 1.5);

  const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>GERICHTLICHER VOLLSTRECKUNGSBESCHEID ${aktenzeichen}</title>
<style>
  @page { margin: 15mm; size: A4; }
  body { font-family: 'Courier New', monospace; font-size: 9.5pt; line-height: 1.4; color: #000; padding: 20px; }
  .header { border-bottom: 3px double #cc0000; padding-bottom: 10px; margin-bottom: 20px; text-align:center; }
  .header h1 { color: #cc0000; font-size: 16pt; margin: 0 0 5px 0; text-transform:uppercase; letter-spacing:2px; }
  .warning-box { border: 2px solid #cc0000; background: #fff0f0; padding: 12px; margin: 15px 0; font-weight: bold; }
  .stamp { border: 3px double #cc0000; color: #cc0000; font-weight: bold; display: inline-block; padding: 6px 12px; transform: rotate(-5deg); text-align: center; float: right; }
</style></head><body>
  <div class="stamp">VOLLSTRECKBAR UMITTELBAR<br>FORDERUNGSKAUF BESTÄTIGT</div>
  <div class="header">
    <h1>DEUTSCHES INKASSO- & VOLLSTRECKUNGS-SYNDIKAT</h1>
    <p>AMTILICHER GERICHTLICHER VOLLSTRECKUNGSBESCHEID BEI FORDERUNGSÜBERGANG (§ 398 BGB)</p>
    <p>Aktenzeichen: <strong>${aktenzeichen}</strong> • Datum: ${new Date().toLocaleDateString('de-DE')}</p>
  </div>

  <p>An Antragsgegner / Schuldner: <strong>${escapeHtml(subName)}</strong></p>
  <p>Anschrift: ${escapeHtml(lc.address || 'Schuldner-Adresse unbekannt')}</p>
  <p>Gläubiger-Abtretender: <strong>HERR (Gebieter)</strong></p>

  <div class="warning-box">
    ⚠️ AMTLICHER VOLLSTRECKUNGSBESCHEID: DIE DARLEHENSFORDERUNG LNC-${(lc.id || '').slice(0,6).toUpperCase()} WURDE HEUTE WENGEN ZAHLUNGSVERZUGS UNTER BERUFUNG AUF DIE ABTRETUNGSERKLÄRUNG AN DAS INKASSO-SYNDIKAT VERKAUFT.
  </div>

  <p><strong>ZUSAMMENSTELLUNG DER VOLLSTRECKUNGSFORDERUNG:</strong></p>
  <p>• Offener Darlehens-Restbetrag: <strong>${(lc.principal || 0).toFixed(2).replace('.', ',')}€</strong></p>
  <p>• Gesetzliche Inkasso- & Bearbeitungsgebühr (50%): <strong>${(lc.inkassoFee || 0).toFixed(2).replace('.', ',')}€</strong></p>
  <hr style="border:0;border-top:1px dashed #000">
  <p style="font-size:12pt;color:#cc0000"><strong>TOTAL ZU VOLLSTRECKENDE FORDERUNG: ${(rem || 0).toFixed(2).replace('.', ',')}€</strong></p>

  <p style="margin-top:20px">Sollte der Betrag nicht innerhalb von 24 Stunden auf das angegebene Treuhandkonto eingehen, erfolgen unmittelbare Kontensperrungen, Gehaltspfändungen beim Arbeitgeber sowie die Eintragung in das öffentliche Schuldnerverzeichnis.</p>

  <p style="margin-top:40px">Hochachtungsvoll,<br><strong>ZENTRALES INKASSO- & VOLLSTRECKUNGS-SYNDIKAT</strong></p>
</body></html>`;

  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); }
}

// --- 3-STUFEN-MAHNVERFAHREN ENGINE ---
async function checkAndApplyMahnstufen() {
  if (!db || !currentUser) return;
  const now = Date.now();

  for (const spin of wheelSpins) {
    if (spin.paid) continue;
    const dueTime = spin.dueDate?.seconds ? spin.dueDate.seconds * 1000 : (typeof spin.dueDate === 'number' ? spin.dueDate : Date.now());
    const overdueMs = now - dueTime;
    if (overdueMs <= 0) continue;

    const hoursOverdue = overdueMs / (1000 * 3600);
    let targetStufe = 0;
    if (hoursOverdue >= 72) targetStufe = 3;
    else if (hoursOverdue >= 48) targetStufe = 2;
    else if (hoursOverdue >= 24) targetStufe = 1;

    const currentStufe = spin.mahnStufe || 0;
    if (targetStufe > currentStufe) {
      let extraFee = 0;
      if (targetStufe === 1 && currentStufe < 1) extraFee = 15;
      else if (targetStufe === 2 && currentStufe < 2) extraFee = 35;
      else if (targetStufe === 3 && currentStufe < 3) extraFee = (spin.prizeAmount || 0) * 0.5;

      const newAmount = round2((spin.prizeAmount || 0) + extraFee);
      try {
        await db.collection('wheelSpins').doc(spin.id).update({
          mahnStufe: targetStufe,
          prizeAmount: newAmount,
          lastMahnAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch (e) { console.error('Mahnstufen update error:', e); }
    }
  }

  // Darlehensverträge Mahnstufen Überwachung
  for (const lc of loanContracts) {
    if (lc.status === 'completed' || lc.status === 'inkasso_sold') continue;
    const loanPayments = getLoanPayments(lc);
    const pmtsSum = loanPayments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
    const totalPaid = Math.max(parseFloat(lc.totalPaid) || 0, pmtsSum);
    const startTotal = (lc.principal || 0) + (lc.addonsSum || 0);
    const remaining = Math.max(0, startTotal - totalPaid);
    if (remaining <= 0) continue;

    const createdTime = lc.createdAt?.seconds ? lc.createdAt.seconds * 1000 : (typeof lc.createdAt === 'number' ? lc.createdAt : Date.now());
    const daysActive = (now - createdTime) / (1000 * 3600 * 24);

    // If active for more than 7 days with zero or low payments, escalate Mahnstufe
    let targetStufe = 0;
    if (daysActive >= 21) targetStufe = 3;
    else if (daysActive >= 14) targetStufe = 2;
    else if (daysActive >= 7) targetStufe = 1;

    const curStufe = lc.mahnStufe || 0;
    if (targetStufe > curStufe) {
      let fee = 0;
      if (targetStufe === 1 && curStufe < 1) fee = 15.00;
      else if (targetStufe === 2 && curStufe < 2) fee = 35.00;
      else if (targetStufe === 3 && curStufe < 3) fee = round2(remaining * 0.25);

      try {
        await db.collection('loanContracts').doc(lc.id).update({
          mahnStufe: targetStufe,
          addonsSum: (lc.addonsSum || 0) + fee,
          lastMahnAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        lc.mahnStufe = targetStufe;
        lc.addonsSum = (lc.addonsSum || 0) + fee;
      } catch (e) { console.error('Loan Mahnstufen update error:', e); }
    }
  }
}

function generateInkassoDrohbriefPDF(subName, amount, title) {
  const aktenzeichen = `INK-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>INKASSO MAHNUNG ${aktenzeichen}</title>
<style>
  @page { margin: 15mm; size: A4; }
  body { font-family: 'Courier New', monospace; font-size: 10pt; line-height: 1.4; color: #000; padding: 20px; }
  .header { border-bottom: 3px solid #cc0000; padding-bottom: 10px; margin-bottom: 20px; }
  .header h1 { color: #cc0000; font-size: 18pt; margin-bottom: 4px; }
  .warning-box { border: 2px solid #cc0000; background: #fff0f0; padding: 12px; margin: 15px 0; font-weight: bold; }
</style></head><body>
  <div class="header">
    <h1>${SVG_PDF_ICONS.bolt} DEUTSCHES INKASSO- & VOLLSTRECKUNGS-SYNDIKAT</h1>
    <p>LETZTE AUSSERGERICHTLICHE MAHNUNG / DROHBRIEF</p>
    <p>Aktenzeichen: <strong>${aktenzeichen}</strong></p>
  </div>

  <p>An Schuldner: <strong>${escapeHtml(subName)}</strong></p>
  <p>Datum: ${new Date().toLocaleDateString('de-DE')}</p>

  <div class="warning-box">
    STUFE 3 VERZUG: IHR ZAHLUNGSVERZUG WURDE SOFORTIG AN UNSER INKASSO-REGISTER GEMELDET.
  </div>

  <p>Forderung aus: <strong>${escapeHtml(title)}</strong></p>
  <p>Offener Restbetrag inkl. Verzugszinsen & Mahngebühren: <strong style="color:#cc0000;font-size:14pt">${amount.toFixed(2).replace('.', ',')}€</strong></p>

  <p style="margin-top:20px">Sollten Sie diesen Betrag nicht innerhalb von 24 Stunden begleichen, werden ohne weitere Vorwarnung gerichtlich festgelegte Vollstreckungsmaßnahmen eingeleitet.</p>

  <p style="margin-top:40px">Hochachtungsvoll,<br><strong>INKASSO-DEPT. HERR & CO.</strong></p>
</body></html>`;

  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); }
}

// --- SÜNDER-GLÜCKSRAD (WHEEL OF FORTUNE) ---
const WHEEL_SEGMENTS = [
  { label: '5€ DEMUT-OBOLUS', amount: 5, color: '#27ae60' },
  { label: '6€ TRIBUT-STRAFE', amount: 6, color: '#16a085' },
  { label: '🔥 2x ZINSEN (3 W.)', amount: 0, special: 'double_interest_3w', color: '#8e44ad' },
  { label: '7€ KAFFEE-ZUSCHLAG', amount: 7, color: '#2980b9' },
  { label: '8€ SCHUH-PUTZ', amount: 8, color: '#e67e22' },
  { label: '⚡ 2x FAG-TAX FR', amount: 0, special: 'double_tax_friday', color: '#cc0000' },
  { label: '9€ DEMÜTIGUNG', amount: 9, color: '#9b59b6' },
  { label: '10€ EROTIK-TAX', amount: 10, color: '#d35400' },
  { label: '5€ SCHWEINE-OBOLUS', amount: 5, color: '#2c3e50' },
  { label: '8€ KNECHT-STRAFE', amount: 8, color: '#c0392b' },
  { label: '10€ ZINS-STRAFE', amount: 10, color: '#6D214F' },
  { label: '20€ MAX-STRAFE', amount: 20, color: '#b71540' }
];

let isSpinning = false;
let currentWheelAngle = 0;

function renderWheelCanvas() {
  const canvas = document.getElementById('wheel-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = 150, cy = 150, r = 140;
  const numSegs = WHEEL_SEGMENTS.length;
  const arc = (Math.PI * 2) / numSegs;

  ctx.clearRect(0, 0, 300, 300);

  for (let i = 0; i < numSegs; i++) {
    const angle = currentWheelAngle + i * arc;
    ctx.beginPath();
    ctx.arc(cx, cy, r, angle, angle + arc);
    ctx.lineTo(cx, cy);
    ctx.fillStyle = WHEEL_SEGMENTS[i].color;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Text
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText(WHEEL_SEGMENTS[i].label, r - 10, 3);
    ctx.restore();
  }

  // Inner hub
  ctx.beginPath();
  ctx.arc(cx, cy, 25, 0, Math.PI * 2);
  ctx.fillStyle = '#111';
  ctx.fill();
  ctx.strokeStyle = '#ff1744';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#ff1744';
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('FIN', cx, cy - 2);
  ctx.fillText('DOM', cx, cy + 10);
}

async function spinWheel() {
  if (isSpinning || !currentUser) return;
  isSpinning = true;
  const curSubId = currentUser.id || currentUser.uid || 'sub';

  // 1. Charge 2.50€ spin fee automatically as a wheel spin debt
  try {
    const feeObj = {
      subId: curSubId,
      username: currentUser.username || 'sub',
      prizeTitle: 'Glücksrad-Einsatzgebühr',
      prizeAmount: 2.50,
      dueDate: Date.now() + 24 * 3600 * 1000,
      paid: false,
      mahnStufe: 0,
      createdAt: new Date()
    };
    await db.collection('wheelSpins').add(feeObj);
    showToast('2,50€ Glücksrad-Gebühr berechnet 💸', 'info');
  } catch (e) { console.error('Spin fee charge failed:', e); }

  const spinBtn = document.getElementById('btn-spin-wheel');
  if (spinBtn) spinBtn.disabled = true;

  // Increased rotation rounds and 8.5 second duration for maximum tension
  const extraRounds = 10 + Math.floor(Math.random() * 8);
  const targetSegIdx = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
  const targetSeg = WHEEL_SEGMENTS[targetSegIdx];

  const numSegs = WHEEL_SEGMENTS.length;
  const arc = (Math.PI * 2) / numSegs;
  const targetAngle = (Math.PI * 2 * extraRounds) + (Math.PI * 1.5) - (targetSegIdx * arc) - (arc / 2);

  const startAngle = currentWheelAngle;
  const duration = 8500; // 8.5 seconds for longer spin
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 4); // Smoother quartic deceleration
    currentWheelAngle = startAngle + (targetAngle - startAngle) * easeOut;
    renderWheelCanvas();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      if (spinBtn) spinBtn.disabled = false;

      // 2. Dual-sync spinObj to sub document
      const dueTime = Date.now() + 24 * 3600 * 1000;
      const spinObj = {
        id: 'ws_' + Date.now(),
        subId: curSubId,
        username: currentUser.username || 'sub',
        prizeTitle: targetSeg.label,
        prizeAmount: targetSeg.amount,
        dueDate: dueTime,
        paid: false,
        mahnStufe: 0,
        createdAt: new Date()
      };
      if (curSubId && db) {
        db.collection('subs').doc(curSubId).set({
          wheelSpinsArr: firebase.firestore.FieldValue.arrayUnion(spinObj)
        }, { merge: true }).catch(() => {});
      }

      // Handle special segment effects
      if (targetSeg.special === 'double_interest_3w') {
        const threeWeeksMs = Date.now() + (21 * 24 * 3600 * 1000);
        db.collection('subs').doc(curSubId).set({
          activePenalties: {
            double_interest_3w: { until: new Date(threeWeeksMs), activatedAt: new Date() }
          }
        }, { merge: true });
        showToast('🔥 GAU! Deine Fag-Tax Zinsen sind für 3 Wochen verdoppelt! (6%)', 'warning');
      } else if (targetSeg.special === 'double_tax_friday') {
        const nextFridayMs = getWeekEnd(getCurrentWeekStart()).getTime();
        db.collection('subs').doc(curSubId).set({
          activePenalties: {
            double_tax_friday: { until: new Date(nextFridayMs), activatedAt: new Date() }
          }
        }, { merge: true });
        showToast('⚡ SCHOCK! Deine Fag-Tax am nächsten Freitag wird verdoppelt! (2x)', 'warning');
      }

      // 2. Save penalty to wheelSpins collection with local fallback
      db.collection('wheelSpins').add({
        subId: curSubId,
        username: currentUser.username || 'sub',
        prizeTitle: targetSeg.label,
        prizeAmount: targetSeg.amount,
        dueDate: dueTime,
        paid: false,
        mahnStufe: 0,
        createdAt: new Date()
      }).then(ref => {
        spinObj.id = ref.id;
      }).catch(err => {
        console.warn('Firestore wheelSpins write fallback to local storage:', err);
        try {
          const localSpins = JSON.parse(localStorage.getItem('fido_local_wheel_spins') || '[]');
          localSpins.push(spinObj);
          localStorage.setItem('fido_local_wheel_spins', JSON.stringify(localSpins));
        } catch (_) {}
      }).finally(() => {
        if (!wheelSpins.some(w => w.id === spinObj.id)) {
          wheelSpins.push(spinObj);
        }
        showToast(`Strafe '${targetSeg.label}' verbucht! 🎰`, 'success');
        renderWheelPendingNotices();
        renderPayments();
        updateTotals();

        const amountNotice = targetSeg.amount > 0 ? `<p style="font-size:0.85rem;color:var(--text-secondary)">Deine gewonnene Strafe über <strong>${targetSeg.amount},00€</strong> wurde in deiner Kontoübersicht und im Rechnungsverlauf eingetragen.</p>` : `<p style="font-size:0.85rem;color:var(--orange)">Der Spezial-Effekt <strong>${targetSeg.label}</strong> wurde für deinen Account aktiviert und auf deiner Fag-Tax Abrechnung vermerkt!</p>`;

        showModal('🎰 HERZLICHEN GLÜCKSWUNSCH!', `
          <div style="text-align:center;padding:10px">
            <p style="font-size:1.1rem;font-weight:900;color:var(--red);margin-bottom:8px">Du hast '${targetSeg.label}' GEWONNEN!</p>
            ${amountNotice}
            <div style="margin-top:12px;padding:10px;background:#2a0000;border:1px solid var(--red);color:#fff;font-weight:bold;font-size:0.85rem">
              ⏰ ZAHLUNGSZIEL / EFFEKT SOFORT AKTIV<br>
              <span style="font-size:0.75rem;font-weight:normal">Wird automatisch in deiner wöchentlichen Fag-Tax Abrechnung berücksichtigt.</span>
            </div>
          </div>
        `);
      });
    }
  }

  requestAnimationFrame(animate);
}

function renderWheelPendingNotices() {
  const el = document.getElementById('wheel-pending-notices');
  if (!el || !currentUser) return;
  const curSubId = currentUser.id || currentUser.uid;
  const mySpins = wheelSpins.filter(w => (w.subId === curSubId || w.username === currentUser.username) && !w.paid);

  if (mySpins.length === 0) {
    el.innerHTML = '<p style="font-size:0.75rem;color:var(--green)">Keine offenen Glücksrad-Strafen ausstehend.</p>';
    return;
  }

  const now = Date.now();
  el.innerHTML = mySpins.map(sp => {
    const dueTime = sp.dueDate?.seconds ? sp.dueDate.seconds * 1000 : (typeof sp.dueDate === 'number' ? sp.dueDate : now);
    const msLeft = dueTime - now;
    let timerText = '';
    if (msLeft > 0) {
      const h = Math.floor(msLeft / 3600000);
      const m = Math.floor((msLeft % 3600000) / 60000);
      const s = Math.floor((msLeft % 60000) / 1000);
      timerText = `⏰ Noch ${h}h ${m}m ${s}s bis Mahnstufe 1`;
    } else {
      timerText = `🔥 VERFALLEN! Mahnstufe ${sp.mahnStufe || 1} aktiv`;
    }

    const stufeBadge = (sp.mahnStufe || 0) > 0 ? `<span style="color:var(--red);font-weight:bold"> (MAHNSTUFE ${sp.mahnStufe})</span>` : '';

    return `<div style="padding:10px;background:var(--bg-surface);border:1px dashed var(--red);margin-bottom:6px;border-radius:4px;text-align:left">
      <div style="font-weight:800;font-size:0.85rem;color:var(--red)">🎰 Offene Strafe: ${escapeHtml(sp.prizeTitle)} (${sp.prizeAmount}€)${stufeBadge}</div>
      <div style="font-size:0.75rem;color:var(--orange);font-weight:700;margin-top:2px">${timerText}</div>
      ${(sp.mahnStufe || 0) >= 3 ? `<button class="btn btn--sm btn--danger" style="margin-top:4px" onclick="generateInkassoDrohbriefPDF('${currentUser.username}', ${sp.prizeAmount}, '${sp.prizeTitle}')">📄 INKASSO-DROHBRIEF DRUCKEN</button>` : ''}
    </div>`;
  }).join('');
}

// --- SUB LOAN CONTRACTS DASHBOARD (MY LOANS, SCHEDULE, PROGRESS GRAPH, RATE ADJUSTMENT, SONDERZAHLUNG) ---
function renderSubLoansView() {
  const el = document.getElementById('sub-my-loans-list');
  if (!el || !currentUser) return;

  const curId = currentUser.id || currentUser.uid;
  const myLoans = loanContracts.filter(l => l.subId === curId || l.subId === currentUser.id || (currentUser.username && l.username === currentUser.username));

  if (myLoans.length === 0) {
    el.innerHTML = '<p style="color:var(--text-dim);font-size:0.8rem;text-align:center">Du hast aktuell keine laufenden Darlehensverträge.</p>';
    return;
  }

  el.innerHTML = myLoans.map(lc => {
    const principal = lc.principal || 0;
    const addonsSum = lc.addonsSum || 0;
    const weeklyInterest = lc.weeklyInterestAmount || (principal * 0.10);
    const startTotal = principal + addonsSum;

    // Calculate total payments made specifically for THIS loan contract
    const loanPayments = getLoanPayments(lc);
    const pmtsSum = loanPayments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
    const totalPaid = Math.max(parseFloat(lc.totalPaid) || 0, pmtsSum);
    const remainingBalance = Math.max(0, startTotal - totalPaid);
    const progressPercent = Math.min(100, Math.round((totalPaid / (startTotal || 1)) * 100));

    const singleRateTotal = (lc.weeklyInterestAmount || ((lc.principal || 0) * 0.10)) + (lc.installmentRate || 25);
    const calcRatenCount = singleRateTotal > 0 ? Math.round(totalPaid / singleRateTotal) : 0;
    const paidRatenCount = Math.max(loanPayments.length, totalPaid > 0 ? Math.max(1, calcRatenCount) : 0);

    const isInkassoSold = lc.status === 'inkasso_sold';
    const mahnBadge = (lc.mahnStufe || 0) > 0 ? `<span style="background:var(--red);color:#fff;padding:2px 6px;border-radius:3px;font-size:0.7rem;font-weight:700">⚠️ MAHNSTUFE ${lc.mahnStufe}</span>` : '';

    return `
      <div style="padding:14px;background:var(--bg-surface);border:1.5px solid ${isInkassoSold ? 'var(--red)' : 'var(--border-red-bright)'};margin-bottom:12px;border-radius:6px;box-shadow:0 4px 15px rgba(0,0,0,0.3)">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-weight:900;font-size:0.95rem;color:var(--red)">📜 DARLEHEN #${lc.id.slice(0,8).toUpperCase()} ${mahnBadge} ${isInkassoSold ? '<span style="background:var(--red);color:#fff;padding:2px 6px;border-radius:3px;font-size:0.7rem">🔥 AN INKASSO VERKAUFT</span>' : ''}</div>
            <div style="font-size:0.75rem;color:var(--text-dim)">Nennbetrag: ${principal.toFixed(2)}€ • Zinsen: ${weeklyInterest.toFixed(2)}€/Woche • Gebühren: ${addonsSum.toFixed(2)}€</div>
            <div style="font-size:0.7rem;color:var(--purple);margin-top:2px">📜 Vertrag: § 781 BGB Schuldanerkenntnis | § 398 BGB Gehaltsabtretung wirksam</div>
          </div>
          <div class="card-actions-responsive">
            <button class="btn btn--sm btn--cyan btn-download-loan-pdf" data-lcid="${lc.id}">📄 VERTRAG-PDF</button>
            ${isInkassoSold ? `<button class="btn btn--sm btn--orange btn-download-inkasso-pdf" data-lcid="${lc.id}">⚡ VOLLSTRECKUNGSBESCHEID</button>` : ''}
          </div>
        </div>

        <!-- PROGRESS BAR -->
        <div style="margin-top:12px">
          <div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:4px">
            <span>Tilgungsfortschritt: <strong>${progressPercent}%</strong></span>
            <span>Offener Restbetrag: <strong style="color:var(--red);font-size:0.9rem">${remainingBalance.toFixed(2).replace('.', ',')}€</strong></span>
          </div>
          <div style="width:100%;height:10px;background:var(--bg-inset);border:1px solid var(--border);border-radius:5px;overflow:hidden">
            <div style="width:${progressPercent}%;height:100%;background:linear-gradient(90deg, var(--purple), var(--red));transition:width 0.5s"></div>
          </div>
        </div>

        <!-- AMORTIZATION GRAPH CANVAS -->
        <div style="margin-top:14px;text-align:center">
          <div style="font-size:0.7rem;color:var(--text-dim);font-weight:700;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;padding:0 4px">
            <span>📈 DYNAMISCHER SCHULDENVERLAUF & TILGUNGSPLAN</span>
            <span style="font-size:0.65rem;color:var(--purple)">SOLL (ROTLILA) VS IST (GRÜN)</span>
          </div>
          <div class="loan-chart-wrapper" style="width:100%;position:relative;background:#05050b;border:1px solid var(--border-red-bright);border-radius:6px;padding:8px;box-shadow:inset 0 0 20px rgba(255,23,68,0.15)">
            <canvas id="loan-chart-${lc.id}" style="width:100%;height:180px;display:block"></canvas>
          </div>
        </div>

        <!-- PAYMENT SCHEDULE DETAILS -->
        <div style="margin-top:12px;padding:10px;background:var(--bg-card);border:1px solid var(--border);font-size:0.75rem">
          <div style="font-weight:800;color:var(--text-secondary);margin-bottom:4px">📋 RATENPLAN & MODALITÄTEN:</div>
          <div>• Rhythmus: <strong>${lc.rhythm === 'weekly' ? 'Wöchentlich (jeden Freitag)' : 'Monatlich'}</strong></div>
          <div>• Aktuelle Ratenhöhe: <strong>${(lc.installmentRate || 25).toFixed(2).replace('.', ',')}€</strong></div>
          <div>• Bereits für dieses Darlehen getilgt: <strong style="color:var(--green)">${totalPaid.toFixed(2).replace('.', ',')}€</strong> (${paidRatenCount} ${paidRatenCount === 1 ? 'Rate' : 'Raten'} gezahlt)</div>
        </div>

        <!-- ACTIONS: RATE ANPASSEN & SONDERZAHLUNG -->
        <div class="form-action-row" style="margin-top:12px">
          <button class="btn btn--sm btn--orange btn-adjust-loan-rate" data-lcid="${lc.id}">✎ RATE ANPASSEN</button>
          <button class="btn btn--sm btn--success btn-loan-sonderzahlung" data-lcid="${lc.id}">💳 SONDERZAHLUNG VEREINBAREN</button>
        </div>
      </div>
    `;
  }).join('');

  // Wire buttons & draw progress charts
  myLoans.forEach(lc => {
    setTimeout(() => drawLoanProgressChart(lc), 60);
  });

  window.onresize = () => {
    myLoans.forEach(lc => drawLoanProgressChart(lc));
  };

  qsa('.btn-download-loan-pdf').forEach(btn => {
    btn.onclick = () => {
      const lc = loanContracts.find(l => l.id === btn.dataset.lcid);
      if (lc) generateLoanContractPDF(lc);
    };
  });

  qsa('.btn-download-inkasso-pdf').forEach(btn => {
    btn.onclick = () => {
      const lc = loanContracts.find(l => l.id === btn.dataset.lcid);
      if (lc) generateInkassoVollstreckungsBescheidPDF(lc);
    };
  });

  qsa('.btn-adjust-loan-rate').forEach(btn => {
    btn.onclick = () => openAdjustLoanRateModal(btn.dataset.lcid);
  });

  qsa('.btn-loan-sonderzahlung').forEach(btn => {
    btn.onclick = () => openLoanSonderzahlungModal(btn.dataset.lcid);
  });
}

function drawLoanProgressChart(lc) {
  const canvas = document.getElementById(`loan-chart-${lc.id}`);
  if (!canvas) return;
  const parent = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  const displayWidth = parent.clientWidth || 340;
  const displayHeight = 180;

  canvas.style.width = displayWidth + 'px';
  canvas.style.height = displayHeight + 'px';
  canvas.width = displayWidth * dpr;
  canvas.height = displayHeight * dpr;

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, displayWidth, displayHeight);

  const principal = lc.principal || 0;
  const addonsSum = lc.addonsSum || 0;
  const startTotal = principal + addonsSum;
  const weeklyInterest = lc.weeklyInterestAmount || (principal * 0.10);
  const rate = lc.installmentRate || 25;
  const isWeekly = lc.rhythm === 'weekly' || !lc.rhythm;

  // Calculate actual total paid specifically for THIS loan contract
  const loanPayments = getLoanPayments(lc);
  const pmtsSum = loanPayments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
  const totalPaid = Math.max(parseFloat(lc.totalPaid) || 0, pmtsSum);
  const remainingBalance = Math.max(0, startTotal - totalPaid);

  // Determine actual simulation steps based on loan parameters
  const stepInterest = isWeekly ? weeklyInterest : (weeklyInterest * 4.33);
  const stepRate = rate;
  const stepLabelPrefix = isWeekly ? 'KW ' : 'M ';

  const points = [];
  let bal = startTotal;
  let step = 0;
  const maxStepsLimit = 36;

  points.push({ step: 0, label: stepLabelPrefix + '0', bal: startTotal });

  if (stepRate <= 0) {
    for (step = 1; step <= 12; step++) {
      points.push({ step, label: stepLabelPrefix + step, bal: Math.round(bal) });
    }
  } else {
    while (bal > 0 && step < maxStepsLimit) {
      step++;
      bal = Math.max(0, bal - stepRate);
      points.push({ step, label: stepLabelPrefix + step, bal: Math.round(bal) });
    }
  }

  const totalSteps = points[points.length - 1].step || 1;

  const paddingLeft = 46;
  const paddingRight = 24;
  const paddingTop = 28;
  const paddingBottom = 30;

  const graphW = displayWidth - paddingLeft - paddingRight;
  const graphH = displayHeight - paddingTop - paddingBottom;
  const maxBal = Math.max(...points.map(p => p.bal), startTotal, 1);

  const mapX = (s) => paddingLeft + (s / totalSteps) * graphW;
  const mapY = (val) => (displayHeight - paddingBottom) - (val / maxBal) * graphH;

  // 1. Draw subtle grid background
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.lineWidth = 1;
  ctx.font = '600 9px "JetBrains Mono", monospace';
  ctx.fillStyle = '#777788';

  const gridSteps = 3;
  for (let i = 0; i <= gridSteps; i++) {
    const yVal = (maxBal / gridSteps) * i;
    const yPos = mapY(yVal);
    ctx.beginPath();
    ctx.moveTo(paddingLeft, yPos);
    ctx.lineTo(displayWidth - paddingRight, yPos);
    ctx.stroke();

    ctx.textAlign = 'right';
    ctx.fillText(`${Math.round(yVal)}€`, paddingLeft - 6, yPos + 3);
  }

  // 2. Draw X-axis step markers dynamically based on totalSteps
  ctx.textAlign = 'center';
  const labelInterval = Math.max(1, Math.ceil(totalSteps / 6));
  for (let s = 0; s <= totalSteps; s += labelInterval) {
    ctx.fillText(stepLabelPrefix + s, mapX(s), displayHeight - 10);
  }
  if (totalSteps % labelInterval !== 0) {
    ctx.fillText(stepLabelPrefix + totalSteps, mapX(totalSteps), displayHeight - 10);
  }

  // 3. Draw Bezier payoff curve with glowing neon red gradient
  ctx.beginPath();
  ctx.strokeStyle = '#ff1744';
  ctx.lineWidth = 3;
  ctx.shadowColor = 'rgba(255, 23, 68, 0.8)';
  ctx.shadowBlur = 10;

  points.forEach((p, idx) => {
    const x = mapX(p.step);
    const y = mapY(p.bal);
    if (idx === 0) ctx.moveTo(x, y);
    else {
      const prevX = mapX(points[idx - 1].step);
      const prevY = mapY(points[idx - 1].bal);
      const cpX = (prevX + x) / 2;
      ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
    }
  });
  ctx.stroke();

  // 4. Fill gradient area under curve
  const lastStepX = mapX(totalSteps);
  ctx.lineTo(lastStepX, displayHeight - paddingBottom);
  ctx.lineTo(mapX(0), displayHeight - paddingBottom);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, paddingTop, 0, displayHeight - paddingBottom);
  grad.addColorStop(0, 'rgba(255, 23, 68, 0.35)');
  grad.addColorStop(1, 'rgba(255, 23, 68, 0.0)');
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.shadowBlur = 0;

  // 5. Draw step data dots
  points.forEach((p) => {
    const x = mapX(p.step);
    const y = mapY(p.bal);
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#ff1744';
    ctx.lineWidth = 1.8;
    ctx.stroke();
  });

  // 6. Draw ACTUAL IST-STAND marker line & badge
  const currentBalY = mapY(remainingBalance);
  ctx.beginPath();
  ctx.setLineDash([4, 3]);
  ctx.strokeStyle = '#00e676';
  ctx.lineWidth = 1.5;
  ctx.moveTo(paddingLeft, currentBalY);
  ctx.lineTo(displayWidth - paddingRight, currentBalY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw Ist-Stand dot & text badge
  ctx.beginPath();
  ctx.arc(paddingLeft + 18, currentBalY, 5.5, 0, Math.PI * 2);
  ctx.fillStyle = '#00e676';
  ctx.fill();
  ctx.shadowColor = 'rgba(0, 230, 118, 0.9)';
  ctx.shadowBlur = 12;
  ctx.font = 'bold 9.5px sans-serif';
  ctx.fillStyle = '#00e676';
  ctx.textAlign = 'left';
  ctx.fillText(`IST-REST: ${remainingBalance.toFixed(2).replace('.', ',')}€`, paddingLeft + 28, currentBalY - 5);
  ctx.shadowBlur = 0;

  // Warning text if rate <= 0
  if (stepRate <= 0) {
    ctx.fillStyle = '#ff1744';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`⚠️ RATENHÖHE IST 0€ (KEINE TILGUNG VEREINBART)`, displayWidth / 2, paddingTop - 8);
  }
}

function openAdjustLoanRateModal(loanId) {
  const lc = loanContracts.find(l => l.id === loanId);
  if (!lc) return;
  const currentRate = lc.installmentRate || 25;

  const bodyHTML = `
    <div style="display:flex;flex-direction:column;gap:10px">
      <p style="font-size:0.8rem;color:var(--text-secondary)">Passe hier deine monatliche/wöchentliche Ratenhöhe für Darlehen #${lc.id.slice(0,6)} an. Eine höhere Rate tilgt deine Schulden schneller!</p>
      <div>
        <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">NEUE RATENHÖHE (€)</label>
        <input type="number" id="new-loan-rate-input" value="${currentRate}" min="10" step="5" style="width:100%;padding:10px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:4px">
      </div>
      <p style="font-size:0.7rem;color:var(--purple)">Tipp: Mindestrate muss die wöchentlichen Zinsen (${lc.weeklyInterestAmount || (lc.principal*0.1)}€/Woche) decken.</p>
    </div>
  `;

  showModal('✎ RATENHÖHE ANPASSEN', bodyHTML, 'RATE JETZT ÄNDERN', async () => {
    const val = parseFloat(document.getElementById('new-loan-rate-input').value) || 0;
    if (val < 10) { showAlert('FEHLER', 'Die Mindestrate beträgt 10,00€.'); return false; }
    try {
      await db.collection('loanContracts').doc(lc.id).update({
        installmentRate: val,
        lastRateUpdateAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      showToast(`Ratenhöhe auf ${val.toFixed(2)}€ angepasst!`, 'success');
      renderSubLoansView();
    } catch (e) { console.error(e); showToast('Fehler bei Ratenanpassung', 'error'); }
  });
}

function openLoanSonderzahlungModal(loanId) {
  const lc = loanContracts.find(l => l.id === loanId);
  if (!lc) return;

  const bodyHTML = `
    <div style="display:flex;flex-direction:column;gap:10px">
      <p style="font-size:0.8rem;color:var(--text-secondary)">Tätige eine einmalige Sonderzahlung für Darlehen #${lc.id.slice(0,6)}, um deine Zinslast sofort zu verringern.</p>
      <div>
        <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">SONDERZAHLUNGS-BETRAG (€)</label>
        <input type="number" id="sonderzahlung-amount-input" value="50" min="10" step="10" style="width:100%;padding:10px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:4px">
      </div>
    </div>
  `;

  showModal('💳 SONDERZAHLUNG VEREINBAREN', bodyHTML, 'SONDERZAHLUNG JETZT JETZT LEISTEN', async () => {
    const val = parseFloat(document.getElementById('sonderzahlung-amount-input').value) || 0;
    if (val <= 0) return false;
    const ok = await addPayment(val, 'tribut', `Darlehen Sonderzahlung #${lc.id.slice(0,6)}`, currentUser.id);
    if (ok) {
      showToast(`Sonderzahlung von ${val.toFixed(2)}€ verbucht! 💳`, 'success');
      renderSubLoansView();
    } else {
      showToast('Fehler bei Sonderzahlung', 'error');
    }
  });
}

// --- TRIBUT-TICKER & FLEXIBLER DEMÜTIGUNGS-CHECKIN ---
// --- TRIBUT-TICKER & FLEXIBLER DEMÜTIGUNGS-CHECKIN MIT HERRN-BESTÄTIGUNG ---
function renderDomPendingCheckins() {
  const el = document.getElementById('dom-pending-checkins-list');
  if (!el || !currentUser || currentUser.role !== 'dom') return;

  const pending = payments.filter(p => (p.confirmed === false || p.status === 'pending_confirmation') && (p.description || '').includes('Devot-Checkin'));

  if (pending.length === 0) {
    el.innerHTML = '<p style="color:var(--text-dim);font-size:0.8rem;text-align:center">Aktuell keine ausstehenden Devot-Checkins zur Bestätigung vorhanden.</p>';
    return;
  }

  el.innerHTML = pending.map(p => {
    const sub = subs.find(s => s.id === p.subId || s.username === p.paidBy);
    const subName = sub ? (sub.displayName || sub.username) : (p.paidBy || 'Sau');
    const amt = (parseFloat(p.amount) || 0).toFixed(2).replace('.', ',');
    let dateStr = '—';
    if (p.createdAt) {
      const dt = p.createdAt.seconds ? new Date(p.createdAt.seconds * 1000) : new Date(p.createdAt);
      if (!isNaN(dt.getTime())) dateStr = dt.toLocaleString('de-DE');
    }

    return `
      <div style="padding:12px;background:var(--bg-surface);border:1.5px dashed var(--orange);margin-bottom:10px;border-radius:4px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <div>
          <div style="font-weight:900;font-size:0.9rem">🙇 Devot-Checkin von 🐷 <strong>${escapeHtml(subName)}</strong></div>
          <div style="font-size:0.8rem;color:var(--red);font-weight:800;margin-top:2px">Betrag: ${amt}€ • Eingereicht am: ${dateStr}</div>
          <div style="font-size:0.75rem;color:var(--text-dim);margin-top:2px">Status: <span style="color:var(--orange);font-weight:700">⏳ WARTE AUF DEINE BESTÄTIGUNG</span></div>
        </div>
        <div class="card-actions-responsive">
          <button class="btn btn--sm btn--success btn-confirm-checkin-ok" data-pid="${p.id}" data-subname="${escapeHtml(subName)}" data-amt="${amt}">✓ ERHALTEN & RECHTZEITIG GEZAHLT BESTÄTIGEN</button>
          <button class="btn btn--sm btn--danger btn-confirm-checkin-late" data-pid="${p.id}" data-subname="${escapeHtml(subName)}" data-subid="${p.subId || ''}" data-amt="${amt}">⚠️ VERSPÄTET (+5€ STRAFE)</button>
        </div>
      </div>
    `;
  }).join('');

  qsa('.btn-confirm-checkin-ok').forEach(btn => {
    btn.onclick = async () => {
      const pid = btn.dataset.pid;
      try {
        await db.collection('payments').doc(pid).update({
          confirmed: true,
          status: 'confirmed',
          confirmedAt: firebase.firestore.FieldValue.serverTimestamp(),
          confirmedBy: 'dom'
        });
        showToast(`Devot-Checkin über ${btn.dataset.amt}€ von ${btn.dataset.subname} als rechtzeitig bezahlt bestätigt! ✅`, 'success');
        renderDomPendingCheckins();
        renderPayments();
      } catch (e) {
        console.error('Confirmation error:', e);
        showToast('Fehler bei der Bestätigung', 'error');
      }
    };
  });

  qsa('.btn-confirm-checkin-late').forEach(btn => {
    btn.onclick = async () => {
      const pid = btn.dataset.pid;
      const subId = btn.dataset.subid;
      try {
        await db.collection('payments').doc(pid).update({
          confirmed: true,
          status: 'confirmed_late',
          note: 'Vom Herrn als verspätet eingestuft',
          confirmedAt: firebase.firestore.FieldValue.serverTimestamp(),
          confirmedBy: 'dom'
        });
        if (subId) await addPayment(5.00, 'strafe', 'Verspätungsstrafe Devot-Checkin (+5,00€)', subId);
        showToast(`Devot-Checkin als verspätet markiert & 5,00€ Verspätungsstrafe gebucht! ⚠️`, 'warning');
        renderDomPendingCheckins();
        renderPayments();
      } catch (e) {
        console.error('Late mark error:', e);
        showToast('Fehler beim Markieren', 'error');
      }
    };
  });
}

function renderTributeTicker() {
  const el = document.getElementById('sub-tribute-ticker');
  if (!el || !currentUser) return;

  const curSubId = currentUser.id || currentUser.uid;
  const myCheckins = payments.filter(p => (p.subId === curSubId || p.paidBy === currentUser.username) && (p.description || '').includes('Devot-Checkin'));
  const pendingCheckins = myCheckins.filter(p => p.confirmed === false || p.status === 'pending_confirmation');
  const confirmedCheckins = myCheckins.filter(p => p.confirmed === true || p.status === 'confirmed' || p.status === 'confirmed_late');

  let checkinStatusHTML = '';
  if (pendingCheckins.length > 0 || confirmedCheckins.length > 0) {
    checkinStatusHTML = `
      <div style="margin-top:12px;padding:10px;background:var(--bg-card);border:1px dashed var(--orange);border-radius:4px">
        <div style="font-weight:800;font-size:0.8rem;color:var(--orange);margin-bottom:6px">📋 DEINE DEVOT-CHECKINS STATUS:</div>
        ${pendingCheckins.map(c => `
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;padding:4px 0;border-bottom:1px dashed var(--border)">
            <span>🙇 ${escapeHtml(c.description)}: <strong style="color:var(--red)">${(parseFloat(c.amount)||0).toFixed(2).replace('.',',')}€</strong></span>
            <span style="color:var(--orange);font-weight:700">⏳ WARTE AUF BESTÄTIGUNG DES HERRN</span>
          </div>
        `).join('')}
        ${confirmedCheckins.slice(0, 5).map(c => `
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;padding:4px 0;border-bottom:1px dashed var(--border)">
            <span>🙇 ${escapeHtml(c.description)}: <strong style="color:var(--green)">${(parseFloat(c.amount)||0).toFixed(2).replace('.',',')}€</strong></span>
            <span style="color:var(--green);font-weight:700">✅ VOM HERRN ERHALTEN & BESTÄTIGT</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  el.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:10px">
      <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border);border-radius:4px">
        <div style="font-weight:800;font-size:0.85rem">🙇 FLEXIBLER DEVOT-CHECKIN</div>
        <p style="font-size:0.75rem;color:var(--text-dim);margin-top:4px">Kriech her und erweise deinem Herrn spontan deine Ergebenheit durch einen freiwilligen Tribut.</p>
        <div class="input-btn-group" style="margin-top:8px">
          <input type="number" id="custom-tribute-amount" value="10" min="1" step="5" style="padding:6px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);font-size:0.8rem">
          <button id="btn-tribute-checkin" class="btn btn--sm btn--primary">🙇 TRIBUT-CHECKIN LEISTEN</button>
        </div>
        ${checkinStatusHTML}
      </div>
    </div>
  `;

  const btn = document.getElementById('btn-tribute-checkin');
  if (btn) {
    btn.onclick = async () => {
      const amtInput = document.getElementById('custom-tribute-amount');
      const val = parseFloat(amtInput ? amtInput.value : 10) || 10;
      const ok = await addPayment(val, 'tribut', 'Spontaner Devot-Checkin (Offen)', currentUser.id || currentUser.uid);
      if (ok) {
        showToast(`Devot-Checkin über ${val.toFixed(2)}€ eingereicht! Warten auf Bestätigung des Herrn... ⏳`, 'info');
        renderTributeTicker();
      }
    };
  }
}

// --- BLIND-AUKTION SHOP MIT BILD-UPLOAD & VERSANDKOSTEN ---
let currentUploadedBase64Image = '';

function openCreateShopItemModal() {
  currentUploadedBase64Image = '';
  const bodyHTML = `
    <form id="create-shop-form" style="display:flex;flex-direction:column;gap:10px">
      <div>
        <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">1. TITEL DES ARTIKELS *</label>
        <input type="text" id="shop-title-input" placeholder="z.B. Getragene Dom-Sneaker" required style="width:100%;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:2px">
      </div>

      <div>
        <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">2. BESCHREIBUNG & ZUSTAND *</label>
        <textarea id="shop-desc-input" placeholder="Detaillierte Beschreibung des Artikels..." required style="width:100%;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);height:60px;margin-top:2px"></textarea>
      </div>

      <div class="form-action-row" style="display:flex;gap:8px">
        <div style="flex:1;min-width:0">
          <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">3. MINDESTGEBOT (€) *</label>
          <input type="number" id="shop-minbid-input" value="50" min="1" step="5" required style="width:100%;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:2px">
        </div>
        <div style="flex:1;min-width:0">
          <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">4. VERSANDKOSTEN (€) *</label>
          <input type="number" id="shop-shipping-input" value="4.99" min="0" step="0.01" required style="width:100%;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:2px">
        </div>
      </div>

      <div>
        <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">5. PRODUKTBILD HOCHLADEN</label>
        <input type="file" id="shop-file-input" accept="image/*" style="width:100%;padding:6px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:2px">
        <input type="text" id="shop-imgurl-input" placeholder="Oder Bild-URL einfügen" style="width:100%;padding:8px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:4px">
        <div id="shop-img-preview" style="margin-top:6px;max-height:100px;overflow:hidden;text-align:center"></div>
      </div>
    </form>
  `;

  showModal('➕ NEUEN SHOP-ARTIKEL EINSTELLEN', bodyHTML, 'ARTIKEL JETZT EINSTELLEN', async () => {
    const title = document.getElementById('shop-title-input').value.trim();
    const desc = document.getElementById('shop-desc-input').value.trim();
    const minBid = parseFloat(document.getElementById('shop-minbid-input').value) || 0;
    const shipping = parseFloat(document.getElementById('shop-shipping-input').value) || 4.99;
    const imgUrlInput = document.getElementById('shop-imgurl-input').value.trim();
    const finalImage = currentUploadedBase64Image || imgUrlInput || '';

    if (!title || !desc || minBid <= 0) {
      showAlert('FEHLER', 'Bitte fülle alle Pflichtfelder korrekt aus.');
      return false;
    }

    await db.collection('shopItems').add({
      title, description: desc, minBid, shippingCost: shipping,
      imageUrl: finalImage,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: 'active'
    });
    showToast('Shop-Artikel erfolgreich eingestellt! 🛍', 'success');
  });

  const fileInput = document.getElementById('shop-file-input');
  const prevDiv = document.getElementById('shop-img-preview');
  if (fileInput) {
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          const cvs = document.createElement('canvas');
          const maxDim = 600;
          let w = img.width, h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
            else { w = Math.round((w * maxDim) / h); h = maxDim; }
          }
          cvs.width = w; cvs.height = h;
          const ctx = cvs.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          currentUploadedBase64Image = cvs.toDataURL('image/jpeg', 0.7);
          if (prevDiv) prevDiv.innerHTML = `<img src="${currentUploadedBase64Image}" style="max-height:90px;border:1px solid var(--red);border-radius:4px">`;
          URL.revokeObjectURL(url);
        };
        img.src = url;
      }
    };
  }
}

async function deleteShopItem(itemId) {
  const item = shopItems.find(i => i.id === itemId);
  if (!item) return;

  const confirmed = await showConfirm(
    '🗑 ARTIKEL LÖSCHEN',
    `Möchtest du den Artikel "${item.title}" und alle zugehörigen Gebote wirklich unwiderruflich löschen?`
  );
  if (!confirmed) return;

  try {
    if (db) {
      // Delete shop item document
      await db.collection('shopItems').doc(itemId).delete();

      // Delete associated bids
      const bidsToDelete = shopBids.filter(b => b.itemId === itemId);
      for (const b of bidsToDelete) {
        if (b.id) {
          await db.collection('shopBids').doc(b.id).delete().catch(() => {});
        }
      }
    }
    // Update local state fallback
    shopItems = shopItems.filter(i => i.id !== itemId);
    shopBids = shopBids.filter(b => b.itemId !== itemId);

    showToast(`Artikel "${item.title}" gelöscht!`, 'info');
    renderDomShopOverview();
  } catch (e) {
    console.error('Error deleting shop item:', e);
    showToast('Fehler beim Löschen des Artikels', 'error');
  }
}

function renderDomShopOverview() {
  const el = document.getElementById('dom-shop-overview');
  if (!el) return;
  if (shopItems.length === 0) {
    el.innerHTML = '<p style="color:var(--text-dim);font-size:0.8rem">Noch keine Shop-Artikel vorhanden.</p>';
    return;
  }

  el.innerHTML = shopItems.map(item => {
    const itemBids = shopBids.filter(b => b.itemId === item.id);
    const pendingBids = itemBids.filter(b => b.status !== 'accepted' && b.status !== 'completed');
    const acceptedBids = itemBids.filter(b => b.status === 'accepted' || b.status === 'completed');
    const highestBid = itemBids.length > 0 ? Math.max(...itemBids.map(b => b.bidAmount || 0)) : 0;
    const shipping = item.shippingCost !== undefined ? item.shippingCost : 4.99;
    const isCompleted = item.status === 'completed' || acceptedBids.length > 0;

    return `
      <div style="padding:12px;background:var(--bg-surface);border:1px solid ${isCompleted ? 'var(--green)' : 'var(--border)'};margin-bottom:10px;border-radius:4px">
        <div style="display:flex;gap:10px;align-items:flex-start">
          ${item.imageUrl ? `<img src="${item.imageUrl}" style="width:70px;height:70px;object-fit:cover;border:1px solid var(--red);border-radius:4px">` : ''}
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
              <div>
                <div style="font-weight:900;font-size:0.95rem;color:var(--text)">${escapeHtml(item.title)}</div>
                ${isCompleted ? `<span style="font-size:0.7rem;color:var(--green);font-weight:800;padding:2px 6px;background:rgba(0,230,118,0.15);border:1px solid var(--green);border-radius:3px;display:inline-block;margin-top:2px">✅ AUKTION DURCHGEFÜHRT & GEBUCHT</span>` : ''}
              </div>
              <button class="btn btn--sm btn--danger btn-delete-shop-item" data-itemid="${item.id}" style="padding:3px 8px;font-size:0.7rem">🗑 LÖSCHEN</button>
            </div>
            <div style="font-size:0.75rem;color:var(--text-dim);margin-top:2px">${escapeHtml(item.description)}</div>
            <div style="font-size:0.75rem;color:var(--purple);margin-top:4px;font-weight:700">
              Mindestgebot: ${item.minBid}€ • Versand: +${shipping.toFixed(2)}€ • Top-Gebot: <strong style="color:var(--green);font-size:0.85rem">${highestBid > 0 ? highestBid.toFixed(2) + '€' : 'Keine Gebote'}</strong>
            </div>
          </div>
        </div>

        <div style="margin-top:10px;padding-top:8px;border-top:1px dashed var(--border)">
          <div style="font-weight:800;font-size:0.8rem;color:var(--purple);margin-bottom:4px">
            🔨 Offene Gebote (${pendingBids.length}):
          </div>
          ${pendingBids.length === 0 ? '<div style="font-size:0.75rem;color:var(--text-dim);margin-top:2px">Keine offenen Gebote.</div>' : pendingBids.map(b => {
            const totalWithShipping = (b.bidAmount || 0) + shipping;
            return `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:var(--bg-card);margin-top:4px;border-radius:3px;font-size:0.75rem;flex-wrap:wrap;gap:4px">
                <span>🐷 <strong>${escapeHtml(b.username)}</strong>: <strong style="color:var(--green);font-size:0.85rem">${b.bidAmount}€</strong> (+${shipping.toFixed(2)}€ Versand = <strong>${totalWithShipping.toFixed(2)}€</strong>)</span>
                <button class="btn btn--sm btn--success btn-accept-bid" data-bidid="${b.id}">✓ GEBOT AKZEPTIEREN & ABRECHNEN</button>
              </div>
            `;
          }).join('')}

          ${acceptedBids.length > 0 ? `
            <div style="margin-top:10px;padding-top:6px;border-top:1px dotted var(--green)">
              <div style="font-weight:800;font-size:0.8rem;color:var(--green);margin-bottom:4px">
                ✅ Durchgeführte Abrechnungen & Gewinner-Gebote (${acceptedBids.length}):
              </div>
              ${acceptedBids.map(b => {
                const totalWithShipping = (b.bidAmount || 0) + shipping;
                return `
                  <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:rgba(0,230,118,0.08);border:1px solid var(--green);margin-top:4px;border-radius:3px;font-size:0.75rem;flex-wrap:wrap;gap:4px">
                    <span>🐷 <strong>${escapeHtml(b.username)}</strong>: <strong style="color:var(--green)">${b.bidAmount}€</strong> (+${shipping.toFixed(2)}€ Versand = <strong>${totalWithShipping.toFixed(2)}€</strong>)</span>
                    <div style="display:flex;align-items:center;gap:6px">
                      <span style="color:var(--green);font-weight:900">✅ DURCHGEFÜHRT & GEBUCHT</span>
                      <button class="btn btn--sm btn--ghost btn-delete-bid" data-bidid="${b.id}" style="font-size:0.65rem;color:var(--red)" title="Gebot aus der Liste entfernen">🗑 ENTFERNEN</button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  qsa('.btn-delete-shop-item').forEach(btn => {
    btn.onclick = () => deleteShopItem(btn.dataset.itemid);
  });

  qsa('.btn-accept-bid').forEach(btn => {
    btn.onclick = async () => {
      const bid = shopBids.find(b => b.id === btn.dataset.bidid);
      if (!bid) return;
      const item = shopItems.find(i => i.id === bid.itemId);
      const shipping = item && item.shippingCost !== undefined ? item.shippingCost : 4.99;
      const grandTotal = round2((bid.bidAmount || 0) + shipping);

      try {
        if (db) {
          await db.collection('shopBids').doc(bid.id).update({
            status: 'accepted',
            acceptedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          if (item && item.id) {
            await db.collection('shopItems').doc(item.id).update({
              status: 'completed',
              winningBidId: bid.id,
              winnerUsername: bid.username
            }).catch(() => {});
          }
        }
        await addPayment(grandTotal, 'dreck', `Auktion Gewonnen: ${item ? item.title : 'Shop Artikel'} (inkl. ${shipping.toFixed(2)}€ Versand)`, bid.subId);
        bid.status = 'accepted';
        if (item) item.status = 'completed';

        showToast(`Abrechnung durchgeführt! Gebot von ${bid.username} (${grandTotal.toFixed(2)}€) verbucht ✅`, 'success');
        renderDomShopOverview();
      } catch (e) {
        console.error('Error accepting bid:', e);
        showToast('Fehler bei der Abrechnung', 'error');
      }
    };
  });

  qsa('.btn-delete-bid').forEach(btn => {
    btn.onclick = async () => {
      const bidId = btn.dataset.bidid;
      if (!bidId) return;
      try {
        if (db) await db.collection('shopBids').doc(bidId).delete();
        shopBids = shopBids.filter(b => b.id !== bidId);
        showToast('Gebot aus der Liste entfernt', 'info');
        renderDomShopOverview();
      } catch (e) {
        console.error('Error deleting bid:', e);
      }
    };
  });
}

function renderSubShopOverview() {
  const el = document.getElementById('sub-shop-overview');
  if (!el || !currentUser) return;
  const curSubId = currentUser.id || currentUser.uid;

  const myBids = shopBids.filter(b => b.subId === curSubId || b.subId === currentUser.id || b.subId === currentUser.uid || b.username === currentUser.username);

  let html = '';

  // Summary Card for Sub Bids
  if (myBids.length > 0) {
    html += `
      <div style="margin-bottom:16px;padding:12px;background:var(--bg-surface);border:1.5px dashed var(--purple);border-radius:6px">
        <div style="font-weight:900;font-size:0.85rem;color:var(--purple);margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
          <span>📋 DEINE ABGEGEBENEN BLIND-GEBOTE (${myBids.length})</span>
          <span style="font-size:0.7rem;color:var(--green)">🟢 AKTIV</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${myBids.map(b => {
            const item = shopItems.find(i => i.id === b.itemId);
            const title = item ? item.title : 'Shop-Artikel';
            const shipping = item && item.shippingCost !== undefined ? item.shippingCost : 4.99;
            const total = (b.bidAmount || 0) + shipping;
            const isAccepted = b.status === 'accepted';
            return `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px;background:var(--bg-card);border:1px solid ${isAccepted ? 'var(--green)' : 'var(--border)'};border-radius:4px;font-size:0.75rem;flex-wrap:wrap;gap:4px">
                <div>
                  <strong style="color:var(--text);font-size:0.85rem">${escapeHtml(title)}</strong>
                  <div style="color:var(--text-dim);font-size:0.75rem;margin-top:2px">Gebot: <strong style="color:var(--green)">${(b.bidAmount||0).toFixed(2)}€</strong> (+${shipping.toFixed(2)}€ Versand = <strong>${total.toFixed(2)}€</strong>)</div>
                </div>
                <div>
                  ${isAccepted ? '<span style="color:var(--green);font-weight:900;padding:3px 8px;background:rgba(0,230,118,0.15);border:1px solid var(--green);border-radius:3px">✓ VOM HERRN AKZEPTIERT</span>' : '<span style="color:var(--orange);font-weight:700;padding:3px 8px;background:rgba(255,152,0,0.1);border-radius:3px">⏳ Wartet auf Entscheidung</span>'}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  if (shopItems.length === 0) {
    html += '<p style="color:var(--text-dim);font-size:0.8rem;text-align:center">Aktuell keine Artikel in der Blind-Auktion.</p>';
    el.innerHTML = html;
    return;
  }

  html += shopItems.map(item => {
    const myBid = shopBids.find(b => b.itemId === item.id && (b.subId === curSubId || b.subId === currentUser.id || b.subId === currentUser.uid || b.username === currentUser.username));
    const shipping = item.shippingCost !== undefined ? item.shippingCost : 4.99;
    const hasBid = !!myBid;

    return `
      <div style="padding:12px;background:var(--bg-surface);border:${hasBid ? '1.5px solid var(--purple)' : '1px solid var(--border)'};margin-bottom:10px;border-radius:4px;box-shadow:${hasBid ? '0 0 12px rgba(187,134,252,0.2)' : 'none'}">
        ${hasBid ? `<div style="display:inline-block;padding:3px 8px;background:var(--purple);color:#000;font-weight:900;font-size:0.7rem;border-radius:3px;margin-bottom:8px">🟢 DU HAST HIER GEBOTEN (${myBid.bidAmount.toFixed(2)}€)</div>` : ''}
        <div style="display:flex;gap:10px;align-items:flex-start">
          ${item.imageUrl ? `<img src="${item.imageUrl}" style="width:75px;height:75px;object-fit:cover;border:1px solid var(--red);border-radius:4px">` : ''}
          <div style="flex:1">
            <div style="font-weight:900;font-size:0.9rem">🛍 ${escapeHtml(item.title)}</div>
            <div style="font-size:0.75rem;color:var(--text-dim);margin-top:2px">${escapeHtml(item.description)}</div>
            <div style="font-size:0.75rem;color:var(--orange);margin-top:4px">
              Mindestgebot: <strong>${item.minBid}€</strong> • Versand: <strong>+${shipping.toFixed(2)}€</strong>
            </div>
          </div>
        </div>

        <div style="margin-top:10px;padding-top:8px;border-top:1px dashed var(--border)">
          ${myBid ? `
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
              <div style="font-size:0.75rem;color:var(--green);font-weight:700">
                Dein Blind-Gebot: <strong style="font-size:0.9rem">${myBid.bidAmount.toFixed(2)}€</strong> (+${shipping.toFixed(2)}€ Versand = <strong>${((myBid.bidAmount||0)+shipping).toFixed(2)}€</strong>)
                <div style="font-size:0.7rem;color:${myBid.status === 'accepted' ? 'var(--green)' : 'var(--orange)'};font-weight:800;margin-top:2px">
                  ${myBid.status === 'accepted' ? '✓ VOM HERRN AKZEPTIERT & VERBUCHT!' : '⏳ Wartet auf Entscheidung des Herrn'}
                </div>
              </div>
              ${myBid.status !== 'accepted' ? `
                <button class="btn btn--sm btn--ghost btn-edit-bid" data-itemid="${item.id}" style="font-size:0.7rem">✎ GEBOT ERHÖHEN / ÄNDERN</button>
              ` : ''}
            </div>
          ` : `
            <div class="input-btn-group">
              <input type="number" class="sub-bid-input" data-itemid="${item.id}" placeholder="Dein Gebot €" min="${item.minBid}" style="padding:6px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);font-size:0.8rem">
              <button class="btn btn--sm btn--primary btn-submit-bid" data-itemid="${item.id}">🔨 GEBOT ABGEBEN</button>
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');

  el.innerHTML = html;

  qsa('.btn-submit-bid').forEach(btn => {
    btn.onclick = async () => {
      const itemId = btn.dataset.itemid;
      const input = qs(`.sub-bid-input[data-itemid="${itemId}"]`);
      const val = parseFloat(input ? input.value : 0) || 0;
      const item = shopItems.find(i => i.id === itemId);
      if (!item || val < item.minBid) {
        showAlert('GEBOT UNGÜLTIG', `Dein Gebot muss mindestens ${item ? item.minBid : 0}€ betragen.`);
        return;
      }
      try {
        await db.collection('shopBids').add({
          itemId, subId: curSubId, username: currentUser.username || 'sub',
          bidAmount: val, status: 'pending', createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        showToast('Blind-Gebot abgegeben! 🔨', 'success');
        renderSubShopOverview();
      } catch (e) {
        console.error(e);
        showToast('Fehler beim Abgeben des Gebots', 'error');
      }
    };
  });

  qsa('.btn-edit-bid').forEach(btn => {
    btn.onclick = () => {
      const itemId = btn.dataset.itemid;
      const item = shopItems.find(i => i.id === itemId);
      const myBid = shopBids.find(b => b.itemId === itemId && (b.subId === curSubId || b.subId === currentUser.id || b.subId === currentUser.uid || b.username === currentUser.username));
      if (!item || !myBid) return;

      const bodyHTML = `
        <div style="display:flex;flex-direction:column;gap:10px">
          <p style="font-size:0.8rem;color:var(--text-secondary)">Passe dein Blind-Gebot für <strong>${escapeHtml(item.title)}</strong> an.</p>
          <div>
            <label style="font-size:0.7rem;color:var(--text-dim);font-weight:700">NEUES GEBOT (€) * (Mindestgebot: ${item.minBid}€)</label>
            <input type="number" id="new-bid-amount-input" value="${myBid.bidAmount}" min="${item.minBid}" step="5" style="width:100%;padding:10px;background:var(--bg-inset);border:1px solid var(--border);color:var(--text);margin-top:4px">
          </div>
        </div>
      `;

      showModal('✎ BLIND-GEBOT ÄNDERN', bodyHTML, 'GEBOT JETZT AKTUALISIEREN', async () => {
        const val = parseFloat(document.getElementById('new-bid-amount-input').value) || 0;
        if (val < item.minBid) {
          showAlert('FEHLER', `Das Gebot muss mindestens ${item.minBid}€ betragen.`);
          return false;
        }
        try {
          await db.collection('shopBids').doc(myBid.id).update({
            bidAmount: val,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          showToast(`Gebot auf ${val.toFixed(2)}€ aktualisiert! 🔨`, 'success');
          renderSubShopOverview();
        } catch (e) {
          console.error(e);
          showToast('Fehler beim Aktualisieren des Gebots', 'error');
        }
      });
    };
  });
}

// =============================================
// INIT
// =============================================
filterSub.addEventListener('change', () => {
  filterSubId = filterSub.value;
  renderPayments();
  updateTotals();
});

function bindGlobalButtons() {
  const manualPayBtn = document.getElementById('btn-open-manual-payment-modal');
  if (manualPayBtn) manualPayBtn.onclick = () => openManualPaymentModal();

  const loanBtn = document.getElementById('btn-open-loan-wizard');
  if (loanBtn) loanBtn.onclick = openLoanContractModal;

  const wheelBtn = document.getElementById('btn-spin-wheel');
  if (wheelBtn) wheelBtn.onclick = spinWheel;

  const createShopBtn = document.getElementById('btn-create-shop-item');
  if (createShopBtn) createShopBtn.onclick = openCreateShopItemModal;
}

(function boot() {
  bindGlobalButtons();
  if (initFirebase()) {
    if (checkSession()) {
      showDashboardView();
    } else {
      showLoginView();
    }
  }
})();
