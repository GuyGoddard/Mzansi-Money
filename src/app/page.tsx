import type { Metadata } from 'next'
import Link from 'next/link'
import SAFlag from '@/components/SAFlag'
import Disclaimer from '@/components/Disclaimer'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'Free Financial Help for South Africans — SASSA, Tax, Business',
  description:
    'Step-by-step financial guidance for South Africans. SASSA grants, SARS tax, CIPC business registration, UIF, VAT. Free, simple, no jargon.',
}

const pathways = [
  {
    href: '/personal',
    color: 'green',
    icon: '👤',
    title: 'Personal Finance',
    sub: 'Tax, SASSA, UIF, PAYE, budgeting',
    count: '8 topics',
    border: 'border-l-green-500',
    badge: 'badge-green',
  },
  {
    href: '/start-business',
    color: 'blue',
    icon: '🚀',
    title: 'Start a Business',
    sub: 'CIPC, business type, bank account',
    count: '6 steps',
    border: 'border-l-blue-500',
    badge: 'badge-blue',
  },
  {
    href: '/run-business',
    color: 'amber',
    icon: '📈',
    title: 'Run a Business',
    sub: 'VAT, payroll, tax filing, expenses',
    count: '7 topics',
    border: 'border-l-amber-500',
    badge: 'badge-amber',
  },
]

const quickTools = [
  { href: '/tools#tax',    icon: '💰', label: 'Income Tax Calculator' },
  { href: '/tools#vat',    icon: '🧾', label: 'VAT Calculator' },
  { href: '/tools#salary', icon: '💼', label: 'Salary Breakdown' },
  { href: '/tools#profit', icon: '📊', label: 'Profit Calculator' },
  { href: '/tools#budget', icon: '📋', label: 'Budget Tool' },
  { href: '/tools#afford', icon: '❓', label: 'Can I Afford This?' },
]

const topSearches = [
  {
    href: '/personal#sassa',
    icon: '🏛️',
    title: 'How do I apply for a SASSA grant?',
    sub: 'Check eligibility and apply for SRD, child support, old age and disability grants.',
    time: '20 min',
    badge: 'badge-green',
  },
  {
    href: '/personal#tax',
    icon: '💰',
    title: 'Do I need to pay tax? How much will I pay?',
    sub: 'Find out if your income is above the tax threshold and use our free calculator.',
    time: '10 min',
    badge: 'badge-green',
  },
  {
    href: '/start-business#cipc',
    icon: '🏢',
    title: 'How do I register my business in South Africa?',
    sub: 'Register a Pty Ltd or sole proprietor with CIPC — step-by-step with costs.',
    time: '30 min',
    badge: 'badge-blue',
  },
  {
    href: '/personal#uif',
    icon: '📋',
    title: 'How do I claim UIF after losing my job?',
    sub: 'Who qualifies, what documents you need, and exactly how to claim.',
    time: '15 min',
    badge: 'badge-green',
  },
]

const languages = ['English', 'isiZulu', 'isiXhosa', 'Afrikaans', 'Sesotho', 'Setswana', 'Xitsonga', 'Tshivenda']

export default function Home() {
  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-700 via-green-500 to-green-400 px-4 pt-6 pb-8">
        <div className="max-w-2xl mx-auto">
          <SAFlag className="mb-4" />
          <h1 className="font-display text-white text-3xl font-bold leading-tight mb-2">
            Mzansi Money Guide
          </h1>
          <p className="text-green-50 text-base mb-5 leading-relaxed">
            Free, step-by-step financial help for every South African.<br />
            No jargon. No confusion. Just clear next steps.
          </p>

          {/* Language pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {languages.map(lang => (
              <span
                key={lang}
                className="text-xs px-3 py-1.5 rounded-full bg-white/15 text-white border border-white/25 cursor-pointer hover:bg-white/25 transition-colors"
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Search */}
          <Link href="/personal#sassa" className="block">
            <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm">
              <span className="text-sand-400 text-lg">🔍</span>
              <span className="text-sand-400 text-base">What do you need help with?</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-4 space-y-6">

        <Disclaimer />

        {/* Pathways */}
        <div>
          <p className="section-label">Choose your pathway</p>
          <div className="space-y-3">
            {pathways.map(p => (
              <Link key={p.href} href={p.href} className="block">
                <div className={`card-hover border-l-4 ${p.border}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{p.icon}</span>
                    <div className="flex-1">
                      <p className="font-display font-semibold text-base text-sand-900">{p.title}</p>
                      <p className="text-sm text-sand-500 mt-0.5">{p.sub}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`badge ${p.badge}`}>{p.count}</span>
                      <span className="text-sand-300 text-lg">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Tools */}
        <div>
          <p className="section-label">Quick calculators</p>
          <div className="grid grid-cols-3 gap-2">
            {quickTools.map(t => (
              <Link key={t.href} href={t.href} className="block">
                <div className="card-hover p-3 text-center">
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <p className="text-xs font-medium text-sand-700 leading-tight">{t.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Most Searched */}
        <div>
          <p className="section-label">Most searched topics</p>
          <div className="card divide-y divide-sand-100">
            {topSearches.map((s, i) => (
              <Link key={i} href={s.href} className="block">
                <div className="flex gap-3 py-4 first:pt-0 last:pb-0 hover:bg-sand-50 -mx-5 px-5 transition-colors">
                  <span className="text-2xl flex-shrink-0">{s.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-sand-900 leading-snug">{s.title}</p>
                    <p className="text-xs text-sand-500 mt-1 leading-relaxed">{s.sub}</p>
                    <span className={`badge ${s.badge} mt-2`}>⏱ {s.time}</span>
                  </div>
                  <span className="text-sand-300 self-center">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/27600000000?text=Hi%2C+I+need+help+with+my+finances"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[#25D366] rounded-2xl p-4"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">📱</span>
            <div>
              <p className="font-display font-semibold text-white text-base">Get help on WhatsApp</p>
              <p className="text-sm text-white/85 mt-0.5">Ask our free bot about tax, SASSA, or business registration</p>
            </div>
          </div>
        </a>

        {/* SEO footer text */}
        <p className="text-xs text-sand-400 leading-relaxed">
          Popular searches: SASSA SRD grant application 2025 · how to register a business in South Africa ·
          income tax calculator South Africa · UIF claim after retrenchment · CIPC company registration ·
          VAT registration South Africa · child support grant eligibility · SARS eFiling tax return
        </p>
      </div>

      <BottomNav />
    </div>
  )
}
