
const round2 = n => Math.round(n * 100) / 100;
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

function getSubFagConfig(sub) {
  return sub && sub.fagTax ? { ...FAG_CONFIG_DEFAULTS, ...sub.fagTax } : { ...FAG_CONFIG_DEFAULTS };
}

function calculateWeeklyFagTax(sub, weekStart, sessionsArr, paymentsArr, checksArr, opts) {
  opts = opts || {};
  const cfg = getSubFagConfig(sub);
  
  const wStart = weekStart instanceof Date ? weekStart 
               : (weekStart && weekStart.seconds ? new Date(weekStart.seconds * 1000) 
               : (typeof weekStart === 'number' ? new Date(weekStart) : new Date()));

  const logins = sessionsArr.length;
  const totalSeconds = 0;

  const perLogin = cfg.perLogin || 1;
  const perSec = (cfg.perMinute || 1) / 60;
  const taxRate = cfg.taxRate || 0.03;
  let taxStart = cfg.taxStartDate || FAG_CONFIG_DEFAULTS.taxStartDate;
  
  if (taxStart && typeof taxStart.toDate === 'function') taxStart = taxStart.toDate();
  const taxStartFinal = taxStart instanceof Date ? taxStart : new Date(taxStart);
  const startMs = isNaN(taxStartFinal.getTime()) ? new Date('2026-07-01').getTime() : taxStartFinal.getTime();

  const loginCost = round2(logins * perLogin);
  const timeCost = 0;

  const yearTotal = paymentsArr.filter(p => {
    const match = p.subId === sub.id;
    const ts = p.createdAt ? (p.createdAt.seconds ? p.createdAt.seconds * 1000 : (p.createdAt instanceof Date ? p.createdAt.getTime() : Date.now())) : Date.now();
    return match && ts >= startMs;
  }).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  const taxAmount = cfg.taxEnabled !== false ? round2(yearTotal * taxRate) : 0;
  return { yearTotal, taxAmount };
}

// TEST CASES
const sub = { id: 'sub1', fagTax: { taxStartDate: { toDate: () => new Date('2026-07-01') } } };
const payments = [
  { subId: 'sub1', amount: 100, createdAt: { seconds: new Date('2026-07-02').getTime() / 1000 } }, // In range
  { subId: 'sub1', amount: 50, createdAt: null }, // Pending, should use Date.now() -> In range
  { subId: 'sub1', amount: 200, createdAt: { seconds: new Date('2026-06-30').getTime() / 1000 } } // Out of range
];

const result = calculateWeeklyFagTax(sub, new Date(), [], payments, []);
console.log('Test 1 (Timestamp in cfg):', result);

const sub2 = { id: 'sub1' }; // No cfg, uses default Date
const result2 = calculateWeeklyFagTax(sub2, new Date(), [], payments, []);
console.log('Test 2 (Default Date):', result2);
