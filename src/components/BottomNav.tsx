'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/',                label: 'Home',     icon: '🏠' },
  { href: '/personal',        label: 'Personal', icon: '👤' },
  { href: '/start-business',  label: 'Start Biz',icon: '🚀' },
  { href: '/run-business',    label: 'Run Biz',  icon: '📈' },
  { href: '/tools',           label: 'Tools',    icon: '🧮' },
]

export default function BottomNav() {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sand-200 safe-bottom">
      <div className="max-w-2xl mx-auto flex">
        {nav.map(({ href, label, icon }) => {
          const active = path === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-500 transition-colors
                ${active
                  ? 'text-green-600 bg-green-50'
                  : 'text-sand-400 hover:text-sand-600 hover:bg-sand-100'
                }`}
            >
              <span className="text-[18px] leading-none">{icon}</span>
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
