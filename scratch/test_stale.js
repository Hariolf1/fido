
const cutoff = Date.now() - 5 * 60 * 1000;

function testStale(data) {
  let loginMs = data.loginTime ? (data.loginTime.seconds ? data.loginTime.seconds * 1000 : data.loginTime) : 0;
  if (loginMs instanceof Date) loginMs = loginMs.getTime();
  
  const hb = data.lastHeartbeat ? (data.lastHeartbeat.seconds ? data.lastHeartbeat.seconds * 1000 : data.lastHeartbeat) : 0;
  const hbMs = hb instanceof Date ? hb.getTime() : hb;

  if (hbMs < cutoff) {
    if (!loginMs || isNaN(loginMs)) loginMs = hbMs || cutoff; 
    
    const mins = Math.round((cutoff - loginMs) / 60000);
    const secs = Math.round((cutoff - loginMs) / 1000);
    return { mins, secs };
  }
  return 'not stale';
}

console.log('Stale with loginTime:', testStale({ loginTime: { seconds: (Date.now() - 3600000)/1000 }, lastHeartbeat: { seconds: (Date.now() - 600000)/1000 } }));
console.log('Stale without loginTime:', testStale({ loginTime: null, lastHeartbeat: { seconds: (Date.now() - 600000)/1000 } }));
console.log('Stale with nothing:', testStale({ loginTime: null, lastHeartbeat: null }));
