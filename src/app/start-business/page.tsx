import type { Metadata } from 'next'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import Disclaimer from '@/components/Disclaimer'
import Checklist from '@/components/Checklist'
import type { CheckItem } from '@/components/Checklist'

export const metadata: Metadata = {
  title: 'Start a Business in South Africa — CIPC Registration Guide',
  description:
    'How to register a business in South Africa with CIPC. Step-by-step guide to choosing a business type, registering online for R175, and opening a business bank account.',
}

const bizTypes = [
  {
    title: 'Sole Proprietor',
    badge: 'Best for starting small',
    badgeColor: 'badge-green',
    pros: ['No registration needed — just trade under your name', 'Zero cost to start', 'Simplest option, least admin'],
    cons: ['You are personally responsible for all debts', 'Harder to get business loans'],
    best: 'Testing an idea, freelancing, informal trading',
  },
  {
    title: 'Private Company (Pty Ltd)',
    badge: 'Best for growth',
    badgeColor: 'badge-blue',
    pros: ['Your personal assets are protected', 'More professional to clients and banks', 'Easier to get funding', 'Register for R175 on BizPortal'],
    cons: ['More admin (annual returns, etc.)', 'Costs R100+/year to maintain'],
    best: 'Growing a business, taking on clients, hiring staff',
  },
  {
    title: 'Non-Profit Company (NPC)',
    badge: 'Best for community work',
    badgeColor: 'badge-amber',
    pros: ['Tax exemptions available', 'Can receive donations and grants', 'Builds community trust'],
    cons: ['Profits cannot be paid out to members', 'More complex to set up'],
    best: 'NGOs, community organisations, charities',
  },
]

const cipcSteps: CheckItem[] = [
  { id: 'c1', title: 'Go to BizPortal.gov.za', description: 'This is the official free government portal for registering a business. Do NOT pay third-party websites — they charge R500–R2,000 for something you can do yourself for R175.', time: '2 min', link: { label: 'Open BizPortal', url: 'https://bizportal.gov.za' }, warning: 'Never pay a third party to register for you — it costs R175 on BizPortal, not R500+.' },
  { id: 'c2', title: 'Create a free BizPortal account', description: 'Click "Register" and create an account using your email address and SA ID number. Check your email for a verification link.', time: '5 min' },
  { id: 'c3', title: 'Reserve your company name (R50)', description: 'Choose 3 name options in order of preference. CIPC checks if your name is available. If your first choice is taken, they try the second, then third.', time: '5 min', warning: 'Choose names carefully — no rude words, no names that copy existing companies.' },
  { id: 'c4', title: 'Complete your Memorandum of Incorporation (MOI)', description: 'BizPortal will ask you simple questions about your business. Just answer them — the system fills in the legal document for you automatically.', time: '10 min' },
  { id: 'c5', title: 'Pay the registration fee (R125)', description: 'Total cost: R50 (name) + R125 (registration) = R175. Pay by credit/debit card or EFT. Keep your proof of payment.', time: '5 min' },
  { id: 'c6', title: 'Wait 5–10 business days', description: 'CIPC will send your registration certificate (CoR14.3) to your email. This is your proof that your company legally exists.', time: '5–10 days' },
  { id: 'c7', title: 'Register your company for income tax with SARS', description: 'Log into efiling.sars.gov.za and register your new company. You will use your CIPC registration number. This is required for all businesses.', time: '20 min', link: { label: 'Register at efiling.sars.gov.za', url: 'https://efiling.sars.gov.za' } },
]

const bankSteps: CheckItem[] = [
  { id: 'b1', title: 'Separate business and personal money', description: 'Never mix your personal and business bank accounts. If you do, it creates tax problems and looks unprofessional to clients.', time: '— (rule)' },
  { id: 'b2', title: 'Get your documents ready', description: 'You will need: CIPC registration certificate, SA ID, proof of business address, and sometimes a minimum deposit.', time: '10 min' },
  { id: 'b3', title: 'Choose your bank', description: 'Capitec Business (from R0/month), Tymebank Business (free to open), FNB Business (from R69/month). Capitec and Tymebank are easiest for new businesses.', time: '5 min', warning: 'Compare monthly fees before choosing — they vary significantly.' },
  { id: 'b4', title: 'Apply online or in-branch', description: 'Most banks allow online applications. Tymebank can be opened in 10 minutes at Pick n Pay or Boxer. Capitec and FNB allow online applications too.', time: '15–30 min' },
]

const complianceSteps: CheckItem[] = [
  { id: 'comp1', title: 'Register for income tax (SARS)', description: 'Required for all companies. Register at efiling.sars.gov.za using your CIPC registration number.', time: '20 min', link: { label: 'efiling.sars.gov.za', url: 'https://efiling.sars.gov.za' } },
  { id: 'comp2', title: 'Register as employer (if you have staff)', description: 'Register on SARS eFiling as a PAYE employer so you can deduct income tax from employee salaries.', time: '15 min' },
  { id: 'comp3', title: 'Register with UIF (if you have staff)', description: 'Register your business at labour.gov.za. You and each employee each contribute 1% of salary to UIF.', time: '20 min', link: { label: 'labour.gov.za', url: 'https://labour.gov.za' } },
  { id: 'comp4', title: 'File your annual CIPC return', description: 'Due within 30 days after your company registration anniversary each year. Done at cipc.co.za. Costs from R100/year.', time: 'Annual', link: { label: 'cipc.co.za', url: 'https://www.cipc.co.za' } },
  { id: 'comp5', title: 'Register for VAT (only if required)', description: 'Only register for VAT if your annual turnover exceeds R1 million. Below R1 million, VAT registration is optional. See "Run a Business" section.', time: '—' },
  { id: 'comp6', title: 'Keep records and invoices', description: 'SARS requires you to keep financial records for 5 years. Use free software like Wave (waveapps.com) or Google Sheets.', time: 'Ongoing' },
]

export default function StartBusinessPage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-blue-700 px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-blue-200 text-sm mb-2 block">← Back</Link>
          <h1 className="font-display font-bold text-white text-2xl">Start a Business</h1>
          <p className="text-blue-100 text-sm mt-1">Register, open a bank account, stay compliant</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-4 space-y-5">

        {/* ── CHOOSE BUSINESS TYPE ──────────────────────────────────────── */}
        <section id="type">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🤔</span>
            <h2 className="font-display font-semibold text-xl">Step 1: Choose Your Business Type</h2>
          </div>

          <div className="alert-blue mb-4">
            💡 Before you register anything, choose the right type of business. This affects your taxes,
            legal protection, and how you can grow.
          </div>

          <div className="space-y-3">
            {bizTypes.map(b => (
              <div key={b.title} className="card">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-display font-semibold text-base text-sand-900">{b.title}</p>
                  <span className={`badge ${b.badgeColor} whitespace-nowrap text-xs`}>{b.badge}</span>
                </div>
                <p className="text-xs text-sand-500 mb-2">Best for: {b.best}</p>
                <div className="space-y-1">
                  {b.pros.map(p => (
                    <div key={p} className="flex gap-2 text-xs text-sand-700"><span className="text-green-500">✓</span>{p}</div>
                  ))}
                  {b.cons.map(c => (
                    <div key={c} className="flex gap-2 text-xs text-sand-500"><span className="text-sand-300">✗</span>{c}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-sand-200" />

        {/* ── CIPC REGISTRATION ─────────────────────────────────────────── */}
        <section id="cipc">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🏢</span>
            <h2 className="font-display font-semibold text-xl">Step 2: Register with CIPC</h2>
          </div>

          <div className="alert-green mb-4">
            💡 CIPC (Companies and Intellectual Property Commission) is where you officially register
            your business. It costs <strong>R175</strong> and takes <strong>5–10 business days</strong>.
            You can do it entirely online.
          </div>

          <div className="bg-sand-100 rounded-xl p-4 mb-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-sm">Total cost to register</p>
              <p className="text-xs text-sand-500 mt-0.5">Name reservation + company registration</p>
            </div>
            <p className="font-display font-bold text-2xl text-green-600">R175</p>
          </div>

          <Checklist id="cipc-register" items={cipcSteps} accentColor="blue" />
        </section>

        <hr className="border-sand-200" />

        {/* ── BANK ACCOUNT ──────────────────────────────────────────────── */}
        <section id="bank">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🏦</span>
            <h2 className="font-display font-semibold text-xl">Step 3: Open a Business Bank Account</h2>
          </div>

          <div className="alert-blue mb-4">
            💡 You need a separate bank account for your business. Mixing personal and business money
            causes tax problems and makes it look like you're not running a serious business.
          </div>

          <Checklist id="biz-bank" items={bankSteps} accentColor="blue" />
        </section>

        <hr className="border-sand-200" />

        {/* ── COMPLIANCE ────────────────────────────────────────────────── */}
        <section id="checklist">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">✅</span>
            <h2 className="font-display font-semibold text-xl">Step 4: Compliance Checklist</h2>
          </div>

          <div className="alert-amber mb-4">
            💡 After registering, complete these steps. Missing them can lead to fines or penalties later.
          </div>

          <Checklist id="compliance" items={complianceSteps} accentColor="green" />
        </section>

        {/* CTA to run business */}
        <div className="card bg-amber-50 border-amber-100">
          <p className="font-semibold text-sm mb-1">Now that you've registered...</p>
          <p className="text-sm text-sand-600 mb-3">Head to "Run a Business" to learn about VAT, payroll, tax filing, and keeping good records.</p>
          <Link href="/run-business" className="btn-primary text-sm w-full">
            Go to Run a Business →
          </Link>
        </div>

        <Disclaimer />
      </div>

      <BottomNav />
    </div>
  )
}
