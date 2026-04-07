import type { Metadata } from 'next'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import Disclaimer from '@/components/Disclaimer'
import Checklist from '@/components/Checklist'
import type { CheckItem } from '@/components/Checklist'

export const metadata: Metadata = {
  title: 'Run a Business in South Africa — VAT, Payroll, Tax Filing',
  description:
    'How to run a business in South Africa. VAT registration, filing taxes, payroll and PAYE, expense tracking, and free tools for small business owners.',
}

const vatSteps: CheckItem[] = [
  { id: 'v1', title: 'Confirm you need to register', description: 'VAT registration is compulsory if your annual turnover exceeds R1 million. You can register voluntarily if you earn above R50,000 per year — this lets you claim back VAT you paid on expenses.', time: '5 min', warning: 'If you hit R1 million turnover, you MUST register within 21 days or face penalties.' },
  { id: 'v2', title: 'Log into SARS eFiling and open VAT101', description: 'Go to efiling.sars.gov.za → click "Registration, Amendments and Verification" → select "VAT" → complete the VAT101 form.', time: '30 min', link: { label: 'Open eFiling', url: 'https://efiling.sars.gov.za' } },
  { id: 'v3', title: 'Upload your supporting documents', description: 'Required: 3 months bank statements showing business turnover, proof of business address, company registration documents (CIPC certificate), and SA ID.', time: '15 min' },
  { id: 'v4', title: 'Wait for SARS to process (6–10 weeks)', description: 'SARS will verify your application. They may contact you for additional documents or to schedule a visit to your business premises.', time: '6–10 weeks' },
  { id: 'v5', title: 'Receive your VAT registration number', description: 'SARS issues a VAT registration certificate with your unique VAT number. Display this on all your invoices.', time: 'Once approved' },
  { id: 'v6', title: 'Add VAT to your invoices', description: 'All invoices must show: your VAT number, the amount excluding VAT, the VAT amount (15%), and the total including VAT.', time: 'Ongoing' },
  { id: 'v7', title: 'Submit VAT201 returns every 2 months', description: 'Log into eFiling and submit your VAT return. Output VAT (VAT you collected from customers) minus Input VAT (VAT you paid on expenses) = what you pay to SARS.', time: 'Every 2 months', warning: 'Late VAT returns attract a 10% penalty on the outstanding amount.' },
]

const payrollSteps: CheckItem[] = [
  { id: 'p1', title: 'Register as an employer with SARS', description: 'Go to efiling.sars.gov.za → "Register, Amendments and Verification" → register as PAYE employer. This is free and required before you can pay staff legally.', time: '20 min', link: { label: 'efiling.sars.gov.za', url: 'https://efiling.sars.gov.za' } },
  { id: 'p2', title: 'Register with UIF (Department of Labour)', description: 'Register your business at labour.gov.za. You contribute 1% of each employee\'s gross salary, and they contribute 1% (total 2% per employee).', time: '20 min', link: { label: 'labour.gov.za', url: 'https://labour.gov.za' } },
  { id: 'p3', title: 'SDL — Skills Development Levy (if payroll > R500K/year)', description: 'If your total annual payroll exceeds R500,000, you must pay 1% of payroll as the Skills Development Levy (SDL). This funds SETA training programmes.', time: '—' },
  { id: 'p4', title: 'Set up payroll software', description: 'SimplePay.co.za is free for 1 employee and affordable for more. It calculates PAYE, UIF, and SDL automatically and generates compliant payslips.', time: '1 hour', link: { label: 'Try SimplePay.co.za', url: 'https://www.simplepay.co.za' } },
  { id: 'p5', title: 'Submit EMP201 monthly on eFiling', description: 'Every month by the 7th, submit your EMP201 showing PAYE, UIF, and SDL deducted, and pay the amount to SARS. Late payment = 10% penalty.', time: 'Monthly — by 7th', warning: 'EMP201 is due by the 7th of every month. Missing it triggers automatic penalties.' },
  { id: 'p6', title: 'Reconcile at year end (EMP501)', description: 'At the end of each tax year (February), submit the EMP501 reconciliation on eFiling and issue IRP5 certificates to all employees.', time: 'Annual' },
]

const freeSystems = [
  { icon: '🧾', title: 'Invoicing', tool: 'Wave (free)', desc: 'Create professional invoices in minutes. Tracks who has paid and who hasn\'t.', link: 'https://waveapps.com' },
  { icon: '📊', title: 'Accounting', tool: 'Wave (free)', desc: 'Tracks income, expenses, and produces basic profit/loss reports.', link: 'https://waveapps.com' },
  { icon: '💼', title: 'Payroll', tool: 'SimplePay.co.za', desc: 'First employee free. Handles PAYE, UIF, payslips automatically.', link: 'https://www.simplepay.co.za' },
  { icon: '📁', title: 'Document storage', tool: 'Google Drive (free)', desc: 'Store all receipts, invoices, and records. 15GB free. Organise by year and month.', link: 'https://drive.google.com' },
  { icon: '📝', title: 'Tax filing', tool: 'SARS eFiling (free)', desc: 'All SARS filings — VAT, PAYE, income tax — are done here for free.', link: 'https://efiling.sars.gov.za' },
  { icon: '✍️', title: 'Contracts', tool: 'Google Docs (free)', desc: 'Always have written agreements with clients. A simple Word document is better than nothing.', link: 'https://docs.google.com' },
]

export default function RunBusinessPage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-amber-700 px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-amber-200 text-sm mb-2 block">← Back</Link>
          <h1 className="font-display font-700 text-white text-2xl">Run a Business</h1>
          <p className="text-amber-100 text-sm mt-1">VAT, payroll, tax filing, expenses, and systems</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-4 space-y-5">

        {/* ── VAT ───────────────────────────────────────────────────────── */}
        <section id="vat">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🧾</span>
            <h2 className="font-display font-600 text-xl">VAT Registration</h2>
          </div>

          <div className="alert-blue mb-4">
            💡 VAT is 15% added to the price of most goods and services. You collect it from customers
            on behalf of SARS. You only need to register if you earn more than <strong>R1 million per year</strong>.
          </div>

          {/* VAT example */}
          <div className="card bg-green-50 border-green-100 mb-4">
            <p className="font-600 text-sm mb-2 text-green-800">Simple VAT example:</p>
            <div className="space-y-1 font-mono text-sm">
              <div className="flex justify-between text-sand-700"><span>You sell a product for</span><span className="font-600">R1,150</span></div>
              <div className="flex justify-between text-sand-500"><span>Your price (excl. VAT)</span><span>R1,000</span></div>
              <div className="flex justify-between text-sand-500"><span>VAT you collected (15%)</span><span>R150</span></div>
              <div className="border-t border-green-200 pt-1 flex justify-between text-green-700 font-600"><span>You send R150 to SARS, keep R1,000</span><span>→</span></div>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Link href="/tools#vat" className="btn-primary flex-1 text-sm">VAT Calculator →</Link>
          </div>

          <Checklist id="vat-register" items={vatSteps} accentColor="amber" />
        </section>

        <hr className="border-sand-200" />

        {/* ── TAX FILING ────────────────────────────────────────────────── */}
        <section id="tax">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📑</span>
            <h2 className="font-display font-600 text-xl">Filing Business Tax</h2>
          </div>

          <div className="alert-green mb-4">
            💡 As a business owner, you must file a tax return each year. For a Pty Ltd, this is the
            <strong> ITR14</strong>. For a sole proprietor, it's included in your personal <strong>ITR12</strong>.
          </div>

          <div className="space-y-3">
            {[
              { num: 1, title: 'Keep records throughout the year', body: 'Save all invoices, receipts, and bank statements. You need these to calculate your taxable income (revenue minus expenses). Use Wave or Google Drive.', tag: '📄 Keep for 5 years' },
              { num: 2, title: 'Know your financial year end', body: 'Most companies use February year end. Your ITR14 (company tax return) must be filed within 12 months of your financial year end.', tag: '📅 Annual' },
              { num: 3, title: 'Pay provisional tax (if applicable)', body: 'If your tax bill will exceed R30,000, you must pay provisional tax in 2 instalments during the year (August and February). This is called IRP6.', tag: '⚠️ Avoid penalties' },
              { num: 4, title: 'Claim all legitimate expenses', body: 'You can deduct: rent, internet, phone (business portion), fuel (business trips), equipment, staff costs, marketing, bank fees, and accounting fees. Each one reduces your taxable profit.', tag: '✓ Reduces tax bill' },
              { num: 5, title: 'File your ITR14 on eFiling', body: 'Log into efiling.sars.gov.za and complete your company income tax return. Pty Ltd company tax rate is 27% of taxable profit.', tag: '🖥️ Done online' },
            ].map(s => (
              <div key={s.num} className="card">
                <div className="flex gap-3">
                  <span className="step-number bg-amber-500">{s.num}</span>
                  <div>
                    <p className="font-600 text-sm">{s.title}</p>
                    <p className="text-xs text-sand-500 mt-1 leading-relaxed">{s.body}</p>
                    <span className="badge-amber mt-2">{s.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-sand-200" />

        {/* ── PAYROLL ───────────────────────────────────────────────────── */}
        <section id="payroll">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">👥</span>
            <h2 className="font-display font-600 text-xl">Payroll & Employing Staff</h2>
          </div>

          <div className="alert-blue mb-4">
            💡 If you employ people, you must deduct PAYE (income tax), UIF, and sometimes SDL from
            their salaries every month, and pay this to SARS by the 7th of each month.
          </div>

          <div className="card mb-4 bg-sand-50">
            <p className="font-600 text-sm mb-2">Monthly payroll example (R10,000 employee):</p>
            <div className="space-y-1 font-mono text-sm">
              <div className="flex justify-between text-sand-700"><span>Gross salary</span><span>R10,000</span></div>
              <div className="flex justify-between text-red-500"><span>− PAYE (deducted from employee)</span><span>− R542</span></div>
              <div className="flex justify-between text-red-500"><span>− UIF employee (1%)</span><span>− R100</span></div>
              <div className="border-t border-sand-200 pt-1 flex justify-between font-600 text-sand-900"><span>Employee receives</span><span>R9,358</span></div>
              <div className="border-t border-sand-200 pt-1 flex justify-between text-amber-600"><span>+ UIF employer (1% — you pay)</span><span>R100</span></div>
              <div className="flex justify-between text-amber-600"><span>You pay SARS monthly</span><span>R742</span></div>
            </div>
          </div>

          <Checklist id="payroll-setup" items={payrollSteps} accentColor="blue" />
        </section>

        <hr className="border-sand-200" />

        {/* ── EXPENSES ──────────────────────────────────────────────────── */}
        <section id="expenses">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📁</span>
            <h2 className="font-display font-600 text-xl">Tracking Expenses</h2>
          </div>

          <div className="alert-green mb-4">
            💡 Tracking every expense does two things: it shows you where your money is going,
            and it reduces your tax bill by letting you claim legitimate deductions.
          </div>

          <div className="space-y-3">
            {[
              { icon: '🏦', rule: 'Separate bank accounts', detail: 'ALWAYS keep business and personal spending in separate bank accounts. If you mix them, SARS can disallow your expense claims.' },
              { icon: '📸', rule: 'Save every receipt', detail: 'Take a photo of paper receipts immediately. Store in a Google Drive folder. Organise by month. SARS requires 5 years of records.' },
              { icon: '📊', rule: 'Record income and expenses weekly', detail: 'Even 30 minutes a week is enough. Use Wave (free) to import your bank statement and categorise transactions.' },
              { icon: '✅', rule: 'Know what you can deduct', detail: 'Deductible: business rent, internet, phone (business %), fuel (business trips), equipment, staff, marketing, bank fees, accountant fees. NOT deductible: personal expenses, fines, entertainment without business purpose.' },
            ].map(r => (
              <div key={r.rule} className="card flex gap-3">
                <span className="text-xl flex-shrink-0">{r.icon}</span>
                <div>
                  <p className="font-600 text-sm">{r.rule}</p>
                  <p className="text-xs text-sand-500 mt-1 leading-relaxed">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <Link href="/tools#profit" className="btn-primary w-full text-sm">Calculate your profit →</Link>
          </div>
        </section>

        <hr className="border-sand-200" />

        {/* ── SYSTEMS ───────────────────────────────────────────────────── */}
        <section id="systems">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">⚙️</span>
            <h2 className="font-display font-600 text-xl">Free Business Systems</h2>
          </div>

          <div className="alert-amber mb-4">
            💡 You don't need expensive software. These free tools handle everything a small South African
            business needs.
          </div>

          <div className="grid grid-cols-2 gap-2">
            {freeSystems.map(s => (
              <a
                key={s.title}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover p-4"
              >
                <span className="text-2xl">{s.icon}</span>
                <p className="font-600 text-sm mt-2">{s.title}</p>
                <p className="text-xs text-green-600 font-500 mt-0.5">{s.tool}</p>
                <p className="text-xs text-sand-500 mt-1 leading-snug">{s.desc}</p>
              </a>
            ))}
          </div>
        </section>

        <Disclaimer />
      </div>

      <BottomNav />
    </div>
  )
}
