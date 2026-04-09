import type { Metadata } from 'next'
import BottomNav from '@/components/BottomNav'
import Disclaimer from '@/components/Disclaimer'
import Checklist from '@/components/Checklist'
import type { CheckItem } from '@/components/Checklist'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Personal Finance — SASSA Grants, Tax, UIF, PAYE',
  description:
    'Step-by-step guidance on SASSA grants, SARS income tax, UIF claims, PAYE, and budgeting for South Africans. Free, plain-language guides.',
}

// ── SASSA grant data ───────────────────────────────────────────────────────
const grants = [
  { name: 'Child Support Grant', amount: 'R530/month', who: 'Caregivers of children under 18', color: 'green' },
  { name: 'Old Age Grant',        amount: 'R2,180/month', who: 'South Africans aged 60+', color: 'blue' },
  { name: 'Disability Grant',     amount: 'R2,180/month', who: 'People unable to work due to disability', color: 'blue' },
  { name: 'SRD Grant',            amount: 'R370/month',  who: 'Unemployed adults 18–59 with no income', color: 'amber' },
  { name: 'Foster Child Grant',   amount: 'R1,180/month', who: 'Foster parents with a court order', color: 'green' },
  { name: 'Care Dependency',      amount: 'R2,180/month', who: 'Caregivers of children with severe disability', color: 'green' },
]

const sassaSteps: CheckItem[] = [
  { id: 's1', title: 'Check if you qualify', description: 'Go to sassa.gov.za and read the requirements for your specific grant. Income limits vary per grant.', time: '5 min', link: { label: 'Check eligibility at sassa.gov.za', url: 'https://sassa.gov.za' } },
  { id: 's2', title: 'Get your documents ready', description: 'You will need: SA ID (green barcoded or Smart ID), proof of income or bank statement, birth certificate of child (for Child Support Grant), medical certificate (for Disability Grant).', time: '10 min', warning: 'Make sure your ID is not expired. Home Affairs can help if you need a new one.' },
  { id: 's3', title: 'Apply — SRD Grant (online)', description: 'For the R370 SRD Grant only: apply at srd.sassa.gov.za using your phone number and ID number. Takes about 10 minutes.', time: '10 min', link: { label: 'Apply for SRD Grant online', url: 'https://srd.sassa.gov.za' } },
  { id: 's4', title: 'Apply — All other grants (SASSA office)', description: 'Visit your nearest SASSA office or South African Post Office. Take all your documents. Arrive early — queues can be long.', time: '2–3 hours', warning: 'Never pay anyone to apply for you. SASSA applications are always 100% free.' },
  { id: 's5', title: 'Wait for approval (2–3 months)', description: 'SASSA will send you an SMS when your application is approved or declined. You can check your status online or call 0800 60 10 11 (free call).', link: { label: 'Check SRD status online', url: 'https://srd.sassa.gov.za' } },
  { id: 's6', title: 'Choose how to receive your money', description: 'Options: SASSA card (collect at Post Office or ATM), direct bank deposit, or cash payment point. Set this up when you apply.', time: '5 min' },
]

// ── Tax registration steps ─────────────────────────────────────────────────
const taxSteps: CheckItem[] = [
  { id: 't1', title: 'Register on SARS eFiling', description: 'Go to efiling.sars.gov.za, click "Register", and follow the steps. You need your SA ID number, personal details, and a bank account.', time: '15 min', link: { label: 'Register at efiling.sars.gov.za', url: 'https://efiling.sars.gov.za' } },
  { id: 't2', title: 'Get your tax reference number', description: 'SARS will give you a 10-digit income tax reference number. Save this — you will use it for the rest of your life.', time: '5 min' },
  { id: 't3', title: 'Wait for tax season (July–November)', description: 'Each year between July and November, SARS opens tax season. You log into eFiling and submit your income details for the previous year.', time: 'Annual' },
  { id: 't4', title: 'Complete your ITR12 return', description: 'Most salary earners are "auto-assessed" — SARS pre-fills your return using IRP5 data from your employer. You just check it and accept.', time: '20–30 min', link: { label: 'File your return on eFiling', url: 'https://efiling.sars.gov.za' } },
  { id: 't5', title: 'Pay or receive a refund', description: 'If you paid too much PAYE during the year, SARS refunds you automatically within 7 days. If you owe, pay before the deadline to avoid penalties.', warning: 'Never miss the November filing deadline — late submission can result in penalties of R250+/month.' },
]

// ── UIF steps ──────────────────────────────────────────────────────────────
const uifSteps: CheckItem[] = [
  { id: 'u1', title: 'Check that you qualify', description: 'You must have worked for at least 13 weeks and contributed to UIF. Domestic workers and part-time workers also qualify.', time: '5 min' },
  { id: 'u2', title: 'Get your UI-2.7 form from your employer', description: 'Your employer must give you this form when you leave. It confirms your employment history and UIF contributions.', time: '1–2 days', warning: 'If your employer refuses to give this form, contact the Dept of Labour at 0800 843 843.' },
  { id: 'u3', title: 'Gather all documents', description: 'You need: SA ID, UI-2.7 form from employer, UI-19 form, last 6 months payslips, 3 months bank statements, and proof of registration at a Labour Centre.', time: '30 min' },
  { id: 'u4', title: 'Apply online or at a Labour Centre', description: 'Apply online at uifecc.labour.gov.za or visit your nearest Department of Employment and Labour office in person.', time: '1–2 hours', link: { label: 'Apply online at labour.gov.za', url: 'https://uifecc.labour.gov.za' }, warning: 'Apply within 6 months of losing your job or you may lose your claim entirely.' },
  { id: 'u5', title: 'Register as a work seeker', description: 'You must register as a work seeker at your nearest Labour Centre every month to continue receiving UIF payments.', time: 'Monthly' },
]

// ── Tax brackets ───────────────────────────────────────────────────────────
const brackets = [
  { range: 'R0 – R95,750',          rate: '0%',  note: 'No tax. You keep everything.' },
  { range: 'R95,751 – R237,100',    rate: '18%', note: '18c tax for every rand above R95,750' },
  { range: 'R237,101 – R370,500',   rate: '26%', note: 'R25,461 + 26c above R237,100' },
  { range: 'R370,501 – R512,800',   rate: '31%', note: 'R60,141 + 31c above R370,500' },
  { range: 'R512,801 – R673,000',   rate: '36%', note: 'R104,255 + 36c above R512,800' },
  { range: 'R673,001 – R857,900',   rate: '39%', note: 'R161,997 + 39c above R673,000' },
  { range: 'Above R857,900',        rate: '41–45%', note: 'Higher rates apply' },
]

const tabs = [
  { id: 'sassa',  label: 'SASSA',    icon: '🏛️' },
  { id: 'tax',    label: 'Tax',      icon: '💰' },
  { id: 'uif',    label: 'UIF',      icon: '📋' },
  { id: 'paye',   label: 'PAYE',     icon: '💼' },
  { id: 'budget', label: 'Budgeting',icon: '📊' },
  { id: 'docs',   label: 'Documents',icon: '🪪' },
]

export default function PersonalPage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-green-700 px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-green-200 text-sm mb-2 block">← Back</Link>
          <h1 className="font-display font-bold text-white text-2xl">Personal Finance</h1>
          <p className="text-green-100 text-sm mt-1">Tax, SASSA, UIF, PAYE, and everyday money</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-4 space-y-5">

        {/* Tab anchors — each section is its own anchor */}
        {/* ── SASSA ─────────────────────────────────────────────────────── */}
        <section id="sassa">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🏛️</span>
            <h2 className="font-display font-semibold text-xl text-sand-900">SASSA Grants</h2>
          </div>

          <div className="alert-green mb-4">
            💡 SASSA provides social grants to South Africans who need financial support.
            Applying is always <strong>100% free</strong> — never pay anyone to apply for you.
          </div>

          <p className="section-label">Available grants (2024/25)</p>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {grants.map(g => (
              <div key={g.name} className="card p-3">
                <p className="font-semibold text-sm text-sand-900 leading-tight">{g.name}</p>
                <p className="text-green-600 font-bold text-base mt-1">{g.amount}</p>
                <p className="text-xs text-sand-500 mt-1 leading-snug">{g.who}</p>
              </div>
            ))}
          </div>

          <p className="section-label">How to apply — step by step</p>
          <Checklist id="sassa-apply" items={sassaSteps} accentColor="green" />

          <div className="alert-amber mt-4">
            ⚠️ <strong>Common scam alert:</strong> People often advertise services to "help you apply for SASSA" and charge R200–R500.
            This is a scam. SASSA is completely free. Report scams to 0800 60 10 11.
          </div>
        </section>

        <hr className="border-sand-200" />

        {/* ── TAX ───────────────────────────────────────────────────────── */}
        <section id="tax">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💰</span>
            <h2 className="font-display font-semibold text-xl text-sand-900">Income Tax (SARS)</h2>
          </div>

          <div className="alert-blue mb-4">
            💡 You only pay income tax if you earn more than <strong>R95,750 per year</strong> (under age 65).
            This is called the "tax-free threshold". Below this, you pay zero tax.
          </div>

          <p className="section-label">2024/25 tax brackets (under age 65)</p>
          <div className="card overflow-hidden p-0 mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-sand-100">
                  <th className="text-left p-3 text-xs font-semibold text-sand-600">Annual Income</th>
                  <th className="text-left p-3 text-xs font-semibold text-sand-600">Tax Rate</th>
                  <th className="text-left p-3 text-xs font-semibold text-sand-600 hidden sm:table-cell">What it means</th>
                </tr>
              </thead>
              <tbody>
                {brackets.map((b, i) => (
                  <tr key={i} className={`border-t border-sand-100 ${i === 0 ? 'bg-green-50' : ''}`}>
                    <td className="p-3 text-sand-900 font-medium text-xs">{b.range}</td>
                    <td className={`p-3 font-bold text-xs ${i === 0 ? 'text-green-600' : 'text-sand-900'}`}>{b.rate}</td>
                    <td className="p-3 text-sand-500 text-xs hidden sm:table-cell">{b.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-2 mb-5">
            <Link href="/tools#tax" className="btn-primary flex-1 text-sm">
              Use Tax Calculator →
            </Link>
          </div>

          <p className="section-label">How to register for tax — step by step</p>
          <Checklist id="sars-register" items={taxSteps} accentColor="green" />
        </section>

        <hr className="border-sand-200" />

        {/* ── UIF ───────────────────────────────────────────────────────── */}
        <section id="uif">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📋</span>
            <h2 className="font-display font-semibold text-xl text-sand-900">UIF — Unemployment Insurance</h2>
          </div>

          <div className="alert-green mb-4">
            💡 UIF is money your employer contributes on your behalf every month. If you lose your job,
            get retrenched, or go on maternity leave, you can claim it back.
          </div>

          <div className="card mb-4">
            <p className="font-semibold text-sm mb-2">How much will I receive?</p>
            <p className="text-sm text-sand-600 leading-relaxed">
              UIF pays approximately <strong>38–58% of your salary</strong>, for 1 day for every 4 days you worked,
              up to a maximum of 365 days. The higher your salary, the lower the percentage — UIF is designed
              to support lower-income workers more.
            </p>
          </div>

          <p className="section-label">How to claim UIF — step by step</p>
          <Checklist id="uif-claim" items={uifSteps} accentColor="blue" />
        </section>

        <hr className="border-sand-200" />

        {/* ── PAYE ──────────────────────────────────────────────────────── */}
        <section id="paye">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💼</span>
            <h2 className="font-display font-semibold text-xl text-sand-900">PAYE — Pay As You Earn</h2>
          </div>

          <div className="alert-blue mb-4">
            💡 PAYE means your employer deducts your income tax from your salary every month
            before paying you. You never have to calculate it yourself — your employer does it for you.
          </div>

          <div className="card mb-4">
            <p className="font-semibold text-sm mb-3">What does PAYE look like on your payslip?</p>
            <div className="bg-sand-50 rounded-xl p-4 font-mono text-sm space-y-1">
              <div className="flex justify-between"><span className="text-sand-600">Gross salary</span><span className="font-semibold">R15,000</span></div>
              <div className="flex justify-between text-red-500"><span>− PAYE (income tax)</span><span>− R1,485</span></div>
              <div className="flex justify-between text-red-500"><span>− UIF (1%)</span><span>− R150</span></div>
              <div className="border-t border-sand-200 mt-2 pt-2 flex justify-between"><span className="font-semibold text-green-700">Take-home pay</span><span className="font-bold text-green-700">R13,365</span></div>
            </div>
          </div>

          <div className="card space-y-3">
            <div className="flex gap-3">
              <span className="step-number bg-green-500 w-7 h-7 text-xs">1</span>
              <div><p className="font-semibold text-sm">Give your employer your tax number</p><p className="text-xs text-sand-500 mt-0.5">When you start a new job, give your SARS income tax number to your employer. No number yet? Register free at efiling.sars.gov.za.</p></div>
            </div>
            <div className="flex gap-3">
              <span className="step-number bg-green-500 w-7 h-7 text-xs">2</span>
              <div><p className="font-semibold text-sm">Your employer deducts PAYE each month</p><p className="text-xs text-sand-500 mt-0.5">They calculate how much tax you owe for the year, divide by 12, and deduct it from your monthly salary.</p></div>
            </div>
            <div className="flex gap-3">
              <span className="step-number bg-green-500 w-7 h-7 text-xs">3</span>
              <div><p className="font-semibold text-sm">Get your IRP5 at year end</p><p className="text-xs text-sand-500 mt-0.5">Your employer gives you an IRP5 showing total income earned and tax paid. Use this to file your annual tax return — SARS may owe you a refund!</p></div>
            </div>
          </div>

          <div className="mt-3">
            <Link href="/tools#salary" className="btn-primary w-full text-sm">
              Calculate your take-home salary →
            </Link>
          </div>
        </section>

        <hr className="border-sand-200" />

        {/* ── BUDGETING ─────────────────────────────────────────────────── */}
        <section id="budget">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📊</span>
            <h2 className="font-display font-semibold text-xl text-sand-900">Budgeting Basics</h2>
          </div>

          <div className="alert-green mb-4">
            💡 A budget is simply writing down how much money comes in each month and where it goes.
            This helps you spot where you're overspending and where you can save.
          </div>

          <p className="section-label">The 50/30/20 rule — simple budgeting</p>
          <div className="space-y-2 mb-4">
            {[
              { pct: '50%', label: 'Needs', examples: 'Rent, food, transport, electricity, school fees', color: 'bg-green-500' },
              { pct: '30%', label: 'Wants', examples: 'Eating out, entertainment, clothing, data', color: 'bg-blue-500' },
              { pct: '20%', label: 'Savings & debt', examples: 'Emergency fund, savings, debt repayment, stokvels', color: 'bg-amber-500' },
            ].map(r => (
              <div key={r.pct} className="card flex items-center gap-4">
                <div className={`${r.color} rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{r.pct}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{r.label}</p>
                  <p className="text-xs text-sand-500 mt-0.5">{r.examples}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/tools#budget" className="btn-primary w-full text-sm">
            Open Budget Tool →
          </Link>
        </section>

        <hr className="border-sand-200" />

        {/* ── DOCUMENTS ─────────────────────────────────────────────────── */}
        <section id="docs">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🪪</span>
            <h2 className="font-display font-semibold text-xl text-sand-900">Essential SA Documents</h2>
          </div>

          <div className="space-y-3">
            {[
              { icon: '🪪', title: 'Smart ID Card', how: 'Apply at Home Affairs or online at dha.gov.za. Cost: R140. Bring your birth certificate.', link: { label: 'Apply at dha.gov.za', url: 'https://www.dha.gov.za' }, time: '2–4 weeks' },
              { icon: '📄', title: 'Birth Certificate', how: 'Apply at Home Affairs within 30 days of birth (free). Late registration requires proof of age and witnesses.', time: '2–4 weeks' },
              { icon: '📬', title: 'Proof of Address', how: 'Banks accept: utility bill, affidavit from police station (if no bills), bank statement, or municipal rates account.', time: 'Immediate' },
              { icon: '🏦', title: 'Open a Bank Account', how: 'You need your SA ID + proof of address. Capitec, Tymebank, and FNB eWallet are easiest for first-time account holders. Tymebank is completely free to open.', time: '15–30 min' },
            ].map(d => (
              <div key={d.title} className="card">
                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">{d.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-sand-900">{d.title}</p>
                    <p className="text-xs text-sand-500 mt-1 leading-relaxed">{d.how}</p>
                    {d.link && (
                      <a href={d.link.url} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline mt-1 block">
                        🔗 {d.link.label} →
                      </a>
                    )}
                    <span className="badge-green mt-2">⏱ {d.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Disclaimer />
      </div>

      <BottomNav />
    </div>
  )
}
