'use client'
import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import { calcIncomeTax, calcVAT, calcProfit, calcBudget, fmtRand, fmtPct, type AgeGroup } from '@/lib/tax'

// ── Result card helper ────────────────────────────────────────────────────
function ResultRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-xl ${highlight ? 'bg-green-100' : 'bg-white'}`}>
      <p className="text-xs text-sand-500">{label}</p>
      <p className={`font-display font-700 text-base mt-0.5 ${highlight ? 'text-green-700' : 'text-sand-900'}`}>{value}</p>
    </div>
  )
}

function Hint({ text }: { text: string }) {
  return (
    <div className="bg-sand-100 rounded-xl p-4 mt-3 text-sm text-sand-600 leading-relaxed">
      {text}
    </div>
  )
}

// ── Income Tax Calculator ─────────────────────────────────────────────────
function TaxCalc() {
  const [income, setIncome] = useState('')
  const [age, setAge]       = useState<AgeGroup>('u65')
  const [result, setResult] = useState<ReturnType<typeof calcIncomeTax> | null>(null)

  const calc = () => {
    const n = parseFloat(income.replace(/[^0-9.]/g, ''))
    if (!n || n < 0) return
    setResult(calcIncomeTax(n, age))
  }

  return (
    <div className="space-y-3">
      <div className="alert-blue text-sm">
        You only pay tax if you earn above <strong>R95,750/year</strong> (under 65).
        Below that threshold, you pay nothing.
      </div>

      <div>
        <label className="block text-sm font-500 text-sand-700 mb-1">Annual income (R)</label>
        <input className="input-field" type="number" placeholder="e.g. 240 000" value={income}
          onChange={e => setIncome(e.target.value)} onKeyDown={e => e.key === 'Enter' && calc()} />
      </div>
      <div>
        <label className="block text-sm font-500 text-sand-700 mb-1">Your age</label>
        <div className="flex gap-2">
          {(['u65', '65to75', 'o75'] as AgeGroup[]).map(a => (
            <button key={a} onClick={() => setAge(a)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-500 border transition-all
                ${age === a ? 'bg-green-500 text-white border-green-500' : 'bg-white text-sand-700 border-sand-200 hover:border-green-300'}`}>
              {a === 'u65' ? 'Under 65' : a === '65to75' ? '65 – 74' : '75+'}
            </button>
          ))}
        </div>
      </div>
      <button onClick={calc} className="btn-primary w-full">Calculate my tax</button>

      {result && (
        <div className="tab-content space-y-3">
          <div className="result-card">
            <p className="text-xs text-green-600 font-500 mb-1">Annual tax owed</p>
            <p className="font-display font-700 text-3xl text-green-700">{fmtRand(result.annualTax)}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-sand-100 rounded-xl p-3">
            <ResultRow label="Monthly PAYE" value={fmtRand(result.monthlyTax)} />
            <ResultRow label="Effective rate" value={fmtPct(result.effectiveRate)} />
            <ResultRow label="Take-home/month" value={fmtRand(result.takeHomeMonthly)} highlight />
            <ResultRow label="Tax bracket" value={result.bracketLabel} />
          </div>
          <Hint text={
            result.belowThreshold
              ? `✓ Your income is below the tax-free threshold. You owe no income tax. You may still need to file a SARS return if your employer requires it.`
              : `📌 You owe ${fmtRand(result.annualTax)} in tax per year — that's ${fmtRand(result.monthlyTax)}/month deducted from your salary as PAYE. Your effective rate is ${fmtPct(result.effectiveRate)} — you keep the rest.`
          } />
        </div>
      )}
    </div>
  )
}

// ── VAT Calculator ────────────────────────────────────────────────────────
function VATCalc() {
  const [amount, setAmount] = useState('')
  const [incl, setIncl]     = useState(true)
  const [result, setResult] = useState<ReturnType<typeof calcVAT> | null>(null)

  const calc = () => {
    const n = parseFloat(amount.replace(/[^0-9.]/g, ''))
    if (!n || n < 0) return
    setResult(calcVAT(n, incl))
  }

  return (
    <div className="space-y-3">
      <div className="alert-blue text-sm">South Africa's VAT rate is <strong>15%</strong>. Basic food items (bread, maize, milk) are zero-rated.</div>
      <div>
        <label className="block text-sm font-500 text-sand-700 mb-1">Amount (R)</label>
        <input className="input-field" type="number" placeholder="e.g. 1 150" value={amount}
          onChange={e => setAmount(e.target.value)} onKeyDown={e => e.key === 'Enter' && calc()} />
      </div>
      <div>
        <label className="block text-sm font-500 text-sand-700 mb-1">This amount is...</label>
        <div className="flex gap-2">
          <button onClick={() => setIncl(true)} className={`flex-1 py-2.5 rounded-xl text-sm font-500 border transition-all ${incl ? 'bg-green-500 text-white border-green-500' : 'bg-white text-sand-700 border-sand-200 hover:border-green-300'}`}>
            VAT inclusive
          </button>
          <button onClick={() => setIncl(false)} className={`flex-1 py-2.5 rounded-xl text-sm font-500 border transition-all ${!incl ? 'bg-green-500 text-white border-green-500' : 'bg-white text-sand-700 border-sand-200 hover:border-green-300'}`}>
            VAT exclusive
          </button>
        </div>
      </div>
      <button onClick={calc} className="btn-primary w-full">Calculate VAT</button>
      {result && (
        <div className="tab-content grid grid-cols-2 gap-2 bg-sand-100 rounded-xl p-3">
          <ResultRow label="Price excl. VAT" value={fmtRand(result.excl)} />
          <ResultRow label="VAT (15%)" value={fmtRand(result.vat)} />
          <ResultRow label="Price incl. VAT" value={fmtRand(result.incl)} highlight />
          <ResultRow label="VAT rate" value="15%" />
        </div>
      )}
    </div>
  )
}

// ── Salary Breakdown ──────────────────────────────────────────────────────
function SalaryCalc() {
  const [gross, setGross]   = useState('')
  const [age, setAge]       = useState<AgeGroup>('u65')
  const [result, setResult] = useState<any>(null)

  const calc = () => {
    const m = parseFloat(gross.replace(/[^0-9.]/g, ''))
    if (!m || m < 0) return
    const r = calcIncomeTax(m * 12, age)
    const uif = Math.min(m * 0.01, 177.12)
    setResult({ ...r, monthlyGross: m, uif: Math.round(uif), net: Math.round(m - r.monthlyTax - uif) })
  }

  return (
    <div className="space-y-3">
      <div className="alert-blue text-sm">Enter your <strong>gross salary</strong> — the amount before any deductions.</div>
      <div>
        <label className="block text-sm font-500 text-sand-700 mb-1">Gross monthly salary (R)</label>
        <input className="input-field" type="number" placeholder="e.g. 15 000" value={gross}
          onChange={e => setGross(e.target.value)} onKeyDown={e => e.key === 'Enter' && calc()} />
      </div>
      <div>
        <label className="block text-sm font-500 text-sand-700 mb-1">Age</label>
        <div className="flex gap-2">
          {(['u65', '65to75', 'o75'] as AgeGroup[]).map(a => (
            <button key={a} onClick={() => setAge(a)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-500 border transition-all
                ${age === a ? 'bg-green-500 text-white border-green-500' : 'bg-white text-sand-700 border-sand-200 hover:border-green-300'}`}>
              {a === 'u65' ? 'Under 65' : a === '65to75' ? '65 – 74' : '75+'}
            </button>
          ))}
        </div>
      </div>
      <button onClick={calc} className="btn-primary w-full">Show my take-home pay</button>
      {result && (
        <div className="tab-content space-y-3">
          <div className="result-card">
            <p className="text-xs text-green-600 font-500 mb-1">Monthly take-home pay</p>
            <p className="font-display font-700 text-3xl text-green-700">{fmtRand(result.net)}</p>
          </div>
          <div className="bg-sand-50 rounded-xl p-4 font-mono text-sm space-y-1.5">
            <div className="flex justify-between text-sand-700"><span>Gross salary</span><span className="font-600">{fmtRand(result.monthlyGross)}</span></div>
            <div className="flex justify-between text-red-500"><span>− PAYE (income tax)</span><span>− {fmtRand(result.monthlyTax)}</span></div>
            <div className="flex justify-between text-red-500"><span>− UIF (1%)</span><span>− {fmtRand(result.uif)}</span></div>
            <div className="border-t border-sand-200 pt-2 flex justify-between text-green-700 font-700"><span>Take-home</span><span>{fmtRand(result.net)}</span></div>
          </div>
          <Hint text="UIF is capped at R177.12/month. Medical aid, pension fund, and other deductions are not included in this estimate as they vary by employer." />
        </div>
      )}
    </div>
  )
}

// ── Profit Calculator ─────────────────────────────────────────────────────
function ProfitCalc() {
  const [rev, setRev]   = useState('')
  const [cogs, setCogs] = useState('')
  const [exp, setExp]   = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcProfit> | null>(null)

  const calc = () => {
    const r = parseFloat(rev.replace(/[^0-9.]/g, '')) || 0
    const c = parseFloat(cogs.replace(/[^0-9.]/g, '')) || 0
    const e = parseFloat(exp.replace(/[^0-9.]/g, '')) || 0
    if (!r) return
    setResult(calcProfit(r, c, e))
  }

  return (
    <div className="space-y-3">
      <div className="alert-green text-sm">Profit = Revenue − Cost of goods − Operating expenses</div>
      {[
        { label: 'Monthly revenue (R)', val: rev, set: setRev, placeholder: 'e.g. 50 000' },
        { label: 'Cost of goods sold (R)', val: cogs, set: setCogs, placeholder: 'e.g. 20 000 (what it costs to make/buy what you sell)' },
        { label: 'Other monthly expenses (R)', val: exp, set: setExp, placeholder: 'e.g. 10 000 (rent, salaries, marketing)' },
      ].map(f => (
        <div key={f.label}>
          <label className="block text-sm font-500 text-sand-700 mb-1">{f.label}</label>
          <input className="input-field" type="number" placeholder={f.placeholder} value={f.val} onChange={e => f.set(e.target.value)} />
        </div>
      ))}
      <button onClick={calc} className="btn-primary w-full">Calculate profit</button>
      {result && (
        <div className="tab-content space-y-3">
          <div className={`rounded-xl p-4 ${result.netProfit >= 0 ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
            <p className="text-xs font-500 mb-1" style={{ color: result.netProfit >= 0 ? '#0F6E56' : '#A32D2D' }}>Monthly net profit</p>
            <p className="font-display font-700 text-3xl" style={{ color: result.netProfit >= 0 ? '#085041' : '#791F1F' }}>{fmtRand(result.netProfit)}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-sand-100 rounded-xl p-3">
            <ResultRow label="Gross profit" value={fmtRand(result.grossProfit)} />
            <ResultRow label="Profit margin" value={fmtPct(result.margin)} />
            <ResultRow label="Annual profit" value={fmtRand(result.annualProfit)} highlight />
            <ResultRow label="VAT threshold"
              value={result.vatRequired ? '⚠️ Must register' : result.vatWarning ? '⚠️ Getting close' : '✓ Below R1M'} />
          </div>
          <Hint text={
            result.netProfit < 0
              ? `⚠️ Your business is making a loss. Expenses exceed income by ${fmtRand(Math.abs(result.netProfit))}/month. Identify your biggest expense and see if it can be reduced.`
              : result.margin < 10
              ? `⚠️ Profit margin of ${fmtPct(result.margin)} is thin. Look at your biggest expenses — even a 10% reduction in costs can make a big difference.`
              : `✓ Profit margin of ${fmtPct(result.margin)} looks healthy. Set aside about 27% of profit for company income tax. Annual profit of ${fmtRand(result.annualProfit)}.`
          } />
        </div>
      )}
    </div>
  )
}

// ── Budget Tool ───────────────────────────────────────────────────────────
function BudgetTool() {
  const [income, setIncome]         = useState('')
  const [rent, setRent]             = useState('')
  const [food, setFood]             = useState('')
  const [transport, setTransport]   = useState('')
  const [utilities, setUtilities]   = useState('')
  const [debt, setDebt]             = useState('')
  const [other, setOther]           = useState('')
  const [result, setResult]         = useState<ReturnType<typeof calcBudget> | null>(null)

  const n = (v: string) => parseFloat(v.replace(/[^0-9.]/g, '')) || 0

  const calc = () => {
    const inc = n(income)
    if (!inc) return
    setResult(calcBudget(inc, n(rent), n(food), n(transport), n(utilities), n(debt), n(other)))
  }

  const fields = [
    { label: 'Monthly income (take-home, R)', val: income, set: setIncome, ph: 'e.g. 12 000' },
    { label: 'Housing / Rent (R)', val: rent, set: setRent, ph: 'e.g. 3 500' },
    { label: 'Food & groceries (R)', val: food, set: setFood, ph: 'e.g. 2 000' },
    { label: 'Transport (taxi, petrol, bus) (R)', val: transport, set: setTransport, ph: 'e.g. 1 200' },
    { label: 'Electricity, water, airtime, data (R)', val: utilities, set: setUtilities, ph: 'e.g. 800' },
    { label: 'Debt repayments (R)', val: debt, set: setDebt, ph: 'e.g. 500' },
    { label: 'Everything else (R)', val: other, set: setOther, ph: 'e.g. 1 000' },
  ]

  return (
    <div className="space-y-3">
      {fields.map(f => (
        <div key={f.label}>
          <label className="block text-sm font-500 text-sand-700 mb-1">{f.label}</label>
          <input className="input-field" type="number" placeholder={f.ph} value={f.val} onChange={e => f.set(e.target.value)} />
        </div>
      ))}
      <button onClick={calc} className="btn-primary w-full">Show my budget</button>
      {result && (
        <div className="tab-content space-y-3">
          <div className={`rounded-xl p-4 ${result.inDeficit ? 'bg-red-50 border border-red-100' : 'bg-green-50 border border-green-100'}`}>
            <p className="text-xs font-500 mb-1" style={{ color: result.inDeficit ? '#A32D2D' : '#0F6E56' }}>
              {result.inDeficit ? 'Monthly shortfall' : 'Money left over each month'}
            </p>
            <p className="font-display font-700 text-3xl" style={{ color: result.inDeficit ? '#791F1F' : '#085041' }}>
              {fmtRand(result.surplus)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-sand-100 rounded-xl p-3">
            <ResultRow label="Total expenses" value={fmtRand(result.total)} />
            <ResultRow label="% of income spent" value={fmtPct(result.pctSpent)} />
            <ResultRow label="Savings potential" value={fmtRand(result.savingsPotential) + '/month'} highlight />
          </div>
          <Hint text={
            result.inDeficit
              ? `⚠️ You are spending ${fmtRand(Math.abs(result.surplus))} more than you earn each month. This will lead to debt. Start by reducing your biggest expense — usually housing or transport.`
              : result.pctSpent > 90
              ? `⚠️ You're spending ${fmtPct(result.pctSpent)} of your income. Try to save at least 10% (${fmtRand(n(income) * 0.1)}/month) as an emergency fund.`
              : `✓ You have ${fmtRand(result.surplus)} left over each month. Try to save at least ${fmtRand(result.savingsPotential)}/month. Aim for 3 months of expenses (${fmtRand(result.total * 3)}) as an emergency fund.`
          } />
        </div>
      )}
    </div>
  )
}

// ── Can I Afford This? ────────────────────────────────────────────────────
function AffordCalc() {
  const [income, setIncome]   = useState('')
  const [expenses, setExp]    = useState('')
  const [cost, setCost]       = useState('')
  const [monthly, setMonthly] = useState('')
  const [result, setResult]   = useState<any>(null)

  const n = (v: string) => parseFloat(v.replace(/[^0-9.]/g, '')) || 0

  const calc = () => {
    const inc = n(income); const exp = n(expenses)
    const c = n(cost);     const m   = n(monthly)
    if (!inc) return
    const surplus    = inc - exp
    const newSurplus = surplus - m
    const canMonthly = m <= surplus * 0.3
    const canOnce    = c <= surplus
    let verdict: string, hint: string, good: boolean

    if (m > 0) {
      if (canMonthly && newSurplus > 0) {
        verdict = '✓ Yes, you can afford this'
        hint = `Adding ${fmtRand(m)}/month leaves you with ${fmtRand(newSurplus)} spare. This is manageable. Make sure you still have an emergency fund.`
        good = true
      } else if (newSurplus > 0) {
        verdict = '⚠️ Proceed with caution'
        hint = `This payment is more than 30% of your surplus. Possible, but one unexpected expense could put you in trouble. Consider saving up first.`
        good = false
      } else {
        verdict = '✗ Not right now'
        hint = `Adding ${fmtRand(m)}/month would leave a shortfall of ${fmtRand(Math.abs(newSurplus))}. This would likely lead to debt. Save ${fmtRand(Math.ceil(c / Math.max(surplus * 0.2, 1)))}/month and you could afford it in ${Math.ceil(c / Math.max(surplus * 0.2, 1))} months.`
        good = false
      }
    } else {
      if (canOnce) {
        verdict = '✓ Yes, you can afford this once-off'
        hint = `This purchase of ${fmtRand(c)} is within your current surplus of ${fmtRand(surplus)}. Just make sure you won't be left without an emergency fund.`
        good = true
      } else {
        verdict = '✗ Not right now'
        hint = `You need ${fmtRand(c - surplus)} more. Save ${fmtRand(Math.ceil(c / 3))}/month and you could afford it in about 3 months.`
        good = false
      }
    }
    setResult({ verdict, hint, good })
  }

  return (
    <div className="space-y-3">
      {[
        { label: 'Monthly take-home pay (R)', val: income, set: setIncome, ph: 'e.g. 13 000' },
        { label: 'Total monthly expenses (R)', val: expenses, set: setExp, ph: 'e.g. 10 000' },
        { label: 'Cost of item / purchase (R)', val: cost, set: setCost, ph: 'e.g. 5 000' },
        { label: 'Monthly payment if on credit (R)', val: monthly, set: setMonthly, ph: 'e.g. 500 (enter 0 if once-off)' },
      ].map(f => (
        <div key={f.label}>
          <label className="block text-sm font-500 text-sand-700 mb-1">{f.label}</label>
          <input className="input-field" type="number" placeholder={f.ph} value={f.val} onChange={e => f.set(e.target.value)} />
        </div>
      ))}
      <button onClick={calc} className="btn-primary w-full">Can I afford it?</button>
      {result && (
        <div className="tab-content space-y-3">
          <div className={`rounded-xl p-5 ${result.good ? 'bg-green-50 border border-green-100' : 'bg-amber-50 border border-amber-100'}`}>
            <p className={`font-display font-700 text-xl ${result.good ? 'text-green-700' : 'text-amber-700'}`}>{result.verdict}</p>
          </div>
          <Hint text={result.hint} />
        </div>
      )}
    </div>
  )
}

// ── Main Tools Page ───────────────────────────────────────────────────────
const tools = [
  { id: 'tax',    icon: '💰', label: 'Income Tax',    sub: 'How much tax do I pay?',       component: TaxCalc },
  { id: 'vat',    icon: '🧾', label: 'VAT',           sub: 'Add or remove 15% VAT',         component: VATCalc },
  { id: 'salary', icon: '💼', label: 'Salary',        sub: 'Gross → net take-home',         component: SalaryCalc },
  { id: 'profit', icon: '📊', label: 'Profit',        sub: 'Revenue − costs',               component: ProfitCalc },
  { id: 'budget', icon: '📋', label: 'Budget',        sub: 'Where does my money go?',       component: BudgetTool },
  { id: 'afford', icon: '❓', label: 'Afford This?',  sub: 'Can I afford this purchase?',   component: AffordCalc },
]

export default function ToolsPage() {
  const [active, setActive] = useState('tax')
  const ActiveTool = tools.find(t => t.id === active)?.component ?? TaxCalc

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-green-700 px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-green-200 text-sm mb-2 block">← Back</Link>
          <h1 className="font-display font-700 text-white text-2xl">Calculators & Tools</h1>
          <p className="text-green-100 text-sm mt-1">Simple tools — clear answers, plain English</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-4">
        {/* Tool selector */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {tools.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`p-3 rounded-xl text-left border transition-all
                ${active === t.id
                  ? 'bg-green-50 border-green-400 shadow-sm'
                  : 'bg-white border-sand-200 hover:border-green-200'}`}>
              <div className="text-2xl mb-1">{t.icon}</div>
              <p className={`text-xs font-600 leading-tight ${active === t.id ? 'text-green-700' : 'text-sand-800'}`}>{t.label}</p>
              <p className="text-[10px] text-sand-400 mt-0.5 leading-tight">{t.sub}</p>
            </button>
          ))}
        </div>

        {/* Active calculator */}
        <div className="card mb-5 tab-content" key={active}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{tools.find(t => t.id === active)?.icon}</span>
            <div>
              <h2 className="font-display font-600 text-lg">{tools.find(t => t.id === active)?.label} Calculator</h2>
              <p className="text-xs text-sand-500">{tools.find(t => t.id === active)?.sub}</p>
            </div>
          </div>
          <ActiveTool />
        </div>

        <p className="text-xs text-sand-400 text-center mb-4">
          These calculators use official SA tax rates (2024/25). Results are estimates — consult a tax professional for advice.
        </p>
      </div>

      <BottomNav />
    </div>
  )
}
