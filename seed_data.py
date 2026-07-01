#!/usr/bin/env python3
"""Seed Firestore with plausible Fag-Tax test data v5.

Interest logic:
- Interest is NOT added to the current invoice
- When a FagTax is unpaid past its due date (Friday), the accrued interest
  is carried forward and added as line items to the NEXT week's FagTax
- Each carried interest is declared as "Zinsen aus Rechnung KW xx"
- If multiple FagTaxes are unpaid, each contributes its own carried-interest line

Scenarios:
- alpha: consistent payer, pays 1-7 days late (small carried interest)
- beta:  1-2 weeks late, carried interest on every invoice
- gamma: always pays on due date or 1 day late (almost no carried interest)
- delta: regularly late (1-2 weeks), carries interest
- eps:   3 consecutive unpaid weeks (KW 24/25/26), cumulated carried interest
"""
import requests, json, datetime, random, sys

PROJECT = "fido-f4647"
API_KEY = "AIzaSyDMTYQlzwTCgywhiewqAZITyxQxfkTvLM4"
BASE = f"https://firestore.googleapis.com/v1/projects/{PROJECT}/databases/(default)/documents"

random.seed(42)


def add_doc(collection, body):
    url = f"{BASE}/{collection}?key={API_KEY}"
    r = requests.post(url, json=body)
    if r.status_code >= 400:
        print(f"  ERROR: {r.text[:300]}", file=sys.stderr)
        return None
    return r.json().get("name", "").split("/")[-1]


def ts(dt):
    return {"timestampValue": dt.strftime("%Y-%m-%dT%H:%M:%SZ")}


def get_friday(dt):
    """Return the Friday of the week containing dt."""
    d = dt - datetime.timedelta(days=dt.weekday())
    d -= datetime.timedelta(days=3)
    d = d.replace(hour=0, minute=0, second=0, microsecond=0)
    return d


def calc_interest(amount, due_date, up_to_date):
    """Compound interest with daily increasing rate (1% day1, 2% day2, …)."""
    days = (up_to_date - due_date).days
    if days <= 0 or amount <= 0:
        return 0.0
    total = float(amount)
    for d in range(1, days + 1):
        total += total * (d / 100)
    return round(total - amount, 2)


def carried_interest_entry(source_kw, amt):
    return {"mapValue": {"fields": {
        "sourceKW": {"stringValue": str(source_kw)},
        "amount": {"doubleValue": amt}
    }}}


# === CONFIG ===
today = datetime.datetime(2026, 7, 1)
current_friday = get_friday(today)  # June 26 (current billing week)

# ====== CREATE SUBS ======
print("=== CREATING SUBS ===")
subs_data = [
    ("alpha", "pass1", "Alpha Slave",   datetime.datetime(2026, 4, 17)),
    ("beta",  "pass2", "Beta Pig",      datetime.datetime(2026, 5, 8)),
    ("gamma", "pass3", "Gamma Loser",   datetime.datetime(2026, 5, 29)),
    ("delta", "pass4", "Delta Fag",     datetime.datetime(2026, 6, 12)),
    ("eps",   "pass5", "Epsilon Wurm",  datetime.datetime(2026, 4, 17)),
]

sub_ids = {}
for uname, pw, display, created in subs_data:
    body = {"fields": {
        "username": {"stringValue": uname},
        "password": {"stringValue": pw},
        "displayName": {"stringValue": display},
        "createdAt": ts(created),
        "active": {"booleanValue": True},
        "fagTax": {"mapValue": {"fields": {
            "enabled": {"booleanValue": True},
            "loginsEnabled": {"booleanValue": True},
            "minutesEnabled": {"booleanValue": True},
            "taxEnabled": {"booleanValue": True},
            "counterVisible": {"booleanValue": True},
            "perLogin": {"doubleValue": 1.0},
            "perMinute": {"doubleValue": 1.0},
            "taxRate": {"doubleValue": 0.03},
            "taxStartDate": {"timestampValue": "2026-07-01T00:00:00Z"}
        }}}
    }}
    sid = add_doc("subs", body)
    sub_ids[uname] = sid
    print(f"  {uname} / {pw}  ({display}) -> {sid}")


# ====== FAG-TAX SCENARIOS PER SUB ======
print("\n=== CREATING FAG-TAXES & PAYMENTS ===")
total_fts = 0
total_pmts = 0


# Track all created FagTaxes per sub for carry-forward calculation
all_fag_taxes = {}

for uname, pw, display, created in subs_data:
    sid = sub_ids[uname]
    first_friday = get_friday(created)
    if first_friday < created:
        first_friday += datetime.timedelta(weeks=1)

    week = first_friday
    week_num = 0
    all_fag_taxes[uname] = []

    while week <= current_friday:
        kw_num = int((week - datetime.datetime(2026, 1, 1)).days / 7) + 1

        # Randomish but plausible usage data
        if uname == "alpha":
            logins = random.randint(3, 8)
            mins = random.randint(30, 90)
        elif uname == "beta":
            logins = random.randint(5, 12)
            mins = random.randint(60, 150)
        elif uname == "gamma":
            logins = random.randint(2, 5)
            mins = random.randint(20, 60)
        elif uname == "delta":
            logins = random.randint(4, 10)
            mins = random.randint(40, 120)
        elif uname == "eps":
            logins = random.randint(6, 15)
            mins = random.randint(60, 180)
        else:
            logins = random.randint(1, 10)
            mins = random.randint(5, 120)

        login_cost = round(logins * 1.0, 2)
        min_cost = round(mins * 1.0, 2)
        year_total = random.uniform(50, 800)
        tax_amt = round(year_total * 0.03, 2)
        check_cost = round(random.uniform(0, 3), 2)
        base_amount = round(login_cost + min_cost + tax_amt + check_cost, 2)

        # === SCENARIO SELECTION ===
        if uname == "alpha":
            # First weeks clean (on_time), then increasingly late
            if week_num < 4:
                scenario = "on_time"
            elif week_num < 7:
                scenario = "minor_late"
            elif week_num < 9:
                scenario = "week_late"
            else:
                scenario = "very_late"  # z.B. KW 25: 30+ Tage zu spät → klare Zinsen
        elif uname == "beta":
            if week_num == 1:
                scenario = "very_late"  # KW 20: 30+ Tage zu spät → massive Zinsen sichtbar
            elif week_num < 4:
                scenario = "on_time"
            elif week_num < 6:
                scenario = "minor_late"
            else:
                scenario = "week_late"
        elif uname == "gamma":
            scenario = "on_time"
        elif uname == "delta":
            if week_num < 2:
                scenario = "on_time"
            else:
                scenario = "week_late"
        elif uname == "eps":
            eps_unpaid_start = datetime.datetime(2026, 6, 12)
            if week >= eps_unpaid_start and week <= current_friday:
                scenario = "unpaid"
            elif week_num < 3:
                scenario = "on_time"
            elif week_num < 6:
                scenario = "minor_late"
            else:
                scenario = "week_late"
        else:
            scenario = "on_time"

        # === CARRIED INTEREST FROM PREVIOUS PAID FagTax ===
        # When a FagTax is paid late, the interest generated is carried to the NEXT week
        carried_list = []
        prev_records = all_fag_taxes.get(uname, [])
        if prev_records:
            prev = prev_records[-1]  # most recent previous FagTax
            if prev["paid"] and prev["interest_amount"] > 0:
                carried_list.append((prev["kw"], prev["interest_amount"]))

        carried_sum = round(sum(c[1] for c in carried_list), 2)
        total_amount = round(base_amount + carried_sum, 2)

        # === DETERMINE PAYMENT ===
        # Billing week: Friday to Thursday. Due date = following Friday (week + 7)
        due_date = week + datetime.timedelta(days=7)

        if scenario == "on_time":
            delay_days = random.choice([0, 1])
            is_paid = True
            late_interest = delay_days > 0
        elif scenario == "minor_late":
            delay_days = random.randint(1, 7)
            is_paid = True
            late_interest = delay_days >= 1
        elif scenario == "week_late":
            delay_weeks = random.randint(1, 2)
            delay_days = delay_weeks * 7 + random.randint(0, 3)
            is_paid = True
            late_interest = True
        elif scenario == "always_interest":
            delay_weeks = random.randint(1, 2)
            delay_days = delay_weeks * 7 + random.randint(0, 2)
            is_paid = True
            late_interest = True
        elif scenario == "very_late":
            delay_days = random.randint(10, 18)
            is_paid = True
            late_interest = True
        elif scenario == "unpaid":
            is_paid = False
            late_interest = True
            delay_days = 0
        else:
            is_paid = True
            delay_days = 0
            late_interest = False

        paid_date = due_date + datetime.timedelta(days=delay_days) if is_paid else None

        # Clamp to today
        if is_paid and paid_date and paid_date > today:
            is_paid = False
            paid_date = None
            late_interest = True

        # Payment total = totalAmount (includes carried interest)
        payment_total = total_amount

        # Interest on late payment of the full bill (totalAmount) from its due date
        interest_amt = 0
        total_with_interest = total_amount
        if is_paid and late_interest and delay_days >= 1:
            int_amt = calc_interest(total_amount, due_date, paid_date)
            interest_amt = round(int_amt, 2)
            total_with_interest = round(total_amount + interest_amt, 2)

        # Build carriedInterest Firestore array
        carried_ft = []
        for src_kw, c_amt in carried_list:
            carried_ft.append(carried_interest_entry(src_kw, c_amt))

        ft_fields = {
            "subId": {"stringValue": sid},
            "username": {"stringValue": uname},
            "displayName": {"stringValue": display},
            "weekStart": ts(week),
            "loginsCount": {"integerValue": str(logins)},
            "minutesCount": {"integerValue": str(mins)},
            "secondsCount": {"integerValue": str(mins * 60)},
            "loginCost": {"doubleValue": login_cost},
            "minuteCost": {"doubleValue": min_cost},
            "yearTotal": {"doubleValue": round(year_total, 2)},
            "taxAmount": {"doubleValue": tax_amt},
            "checkCost": {"doubleValue": check_cost},
            "baseAmount": {"doubleValue": base_amount},
            "carriedInterest": {"arrayValue": {"values": carried_ft}} if carried_ft else {"arrayValue": {"values": []}},
            "totalAmount": {"doubleValue": total_amount},
            "paid": {"booleanValue": is_paid},
            "lateInterest": {"booleanValue": late_interest},
            "interestAmount": {"doubleValue": interest_amt},
            "totalWithInterest": {"doubleValue": total_with_interest},
            "createdAt": ts(week + datetime.timedelta(hours=12)),
        }
        if paid_date:
            ft_fields["paidAt"] = ts(paid_date)
        else:
            ft_fields["paidAt"] = {"nullValue": None}

        ft_id = add_doc("fagTaxes", {"fields": ft_fields})
        if ft_id:
            total_fts += 1

        # Track for carry-forward calculation
        all_fag_taxes[uname].append({
            "kw": kw_num,
            "week_friday": week,
            "base_amount": base_amount,
            "paid": is_paid,
            "late_interest": late_interest,
            "total_amount": total_amount,
            "interest_amount": interest_amt,
        })

        # === CREATE PAYMENT ===
        if is_paid:
            add_doc("payments", {"fields": {
                "paidBy": {"stringValue": uname},
                "subId": {"stringValue": sid},
                "amount": {"doubleValue": total_with_interest},
                "category": {"stringValue": "fag-tax"},
                "description": {"stringValue": f"Fag-Tax KW {kw_num}"},
                "createdAt": ts(paid_date),
                "createdBy": {"stringValue": "dom"}
            }})
            total_pmts += 1

            if random.random() < 0.3:
                add_doc("payments", {"fields": {
                    "paidBy": {"stringValue": uname},
                    "subId": {"stringValue": sid},
                    "amount": {"doubleValue": round(random.uniform(10, 100), 2)},
                    "category": {"stringValue": random.choice(["tribut", "strafe", "training"])},
                    "description": {"stringValue": random.choice([
                        "Wochen-Tribut", "Zu spät gemeldet", "Trainingseinheit",
                        "Brave-Sau-Bonus", "Frechheitssteuer"
                    ])},
                    "createdAt": ts(paid_date + datetime.timedelta(hours=random.randint(1, 48))),
                    "createdBy": {"stringValue": "dom"}
                }})
                total_pmts += 1

        week += datetime.timedelta(weeks=1)
        week_num += 1

# ====== SESSIONS ======
print("\n=== CREATING SESSIONS ===")
session_count = 0
for uname, sid in sub_ids.items():
    for _ in range(random.randint(3, 8)):
        day_offset = random.randint(0, 6)
        hour = random.randint(8, 22)
        login_dt = current_friday + datetime.timedelta(days=day_offset, hours=hour)
        duration = random.randint(60, 3600)
        did = add_doc("sessions", {"fields": {
            "subId": {"stringValue": sid},
            "username": {"stringValue": uname},
            "loginTime": ts(login_dt),
            "lastHeartbeat": ts(login_dt + datetime.timedelta(seconds=duration)),
            "durationMinutes": {"integerValue": str(duration // 60)},
            "durationSeconds": {"integerValue": str(duration)},
            "active": {"booleanValue": False}
        }})
        if did:
            session_count += 1
print(f"  Created {session_count} sessions")

# ====== ACCOUNT CHECKS ======
print("\n=== CREATING ACCOUNT CHECKS ===")
check_count = 0
for uname, sid in sub_ids.items():
    for _ in range(random.randint(1, 3)):
        amt = round(1 + random.random() * 2, 2)
        did = add_doc("accountChecks", {"fields": {
            "subId": {"stringValue": sid},
            "amount": {"doubleValue": amt},
            "createdAt": ts(current_friday + datetime.timedelta(days=random.randint(0, 6)))
        }})
        if did:
            check_count += 1
print(f"  Created {check_count} checks")

print("\n=== DONE ===")
print(f"  FagTaxes: {total_fts}, Payments: {total_pmts}")
print("\nLogin credentials:")
for uname, pw, display, _ in subs_data:
    print(f"  {uname} / {pw}")
