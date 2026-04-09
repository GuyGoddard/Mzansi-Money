'use client'
import { useState, useEffect } from 'react'

export interface CheckItem {
  id: string
  title: string
  description: string
  time?: string
  link?: { label: string; url: string }
  warning?: string
}

interface Props {
  id: string          // unique key for localStorage
  items: CheckItem[]
  accentColor?: 'green' | 'blue' | 'amber'
}

const colors = {
  green: { num: 'bg-green-500', bar: 'bg-green-500', check: 'border-green-500', done: 'bg-green-500' },
  blue:  { num: 'bg-blue-500',  bar: 'bg-blue-500',  check: 'border-blue-500',  done: 'bg-blue-500'  },
  amber: { num: 'bg-amber-500', bar: 'bg-amber-500', check: 'border-amber-500', done: 'bg-amber-500' },
}

export default function Checklist({ id, items, accentColor = 'green' }: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const c = colors[accentColor]

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`checklist-${id}`)
      if (saved) setChecked(new Set(JSON.parse(saved)))
    } catch {}
  }, [id])

  const toggle = (itemId: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(itemId) ? next.delete(itemId) : next.add(itemId)
      try { localStorage.setItem(`checklist-${id}`, JSON.stringify(Array.from(next))) } catch {}
      return next
    })
  }

  const pct = Math.round((checked.size / items.length) * 100)
  const complete = pct === 100

  return (
    <div>
      {/* Progress */}
      <div className="bg-sand-100 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-sand-600">
            {checked.size} of {items.length} steps completed
          </span>
          <span className={`text-sm font-semibold ${complete ? 'text-green-600' : 'text-sand-400'}`}>
            {pct}%
          </span>
        </div>
        <div className="progress-bar">
          <div
            className={`progress-fill ${c.bar} ${complete ? 'progress-complete' : ''}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Complete banner */}
      {complete && (
        <div className="alert-green flex gap-3 mb-4 tab-content">
          <span className="text-xl">🎉</span>
          <div>
            <p className="font-semibold">All steps complete!</p>
            <p className="text-sm mt-0.5">Well done — you've finished this checklist.</p>
          </div>
        </div>
      )}

      {/* Items */}
      <ul className="space-y-2">
        {items.map((item, i) => {
          const done = checked.has(item.id)
          return (
            <li
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`card cursor-pointer transition-all duration-150 select-none
                ${done ? 'opacity-60' : 'hover:border-green-100'}`}
            >
              <div className="flex gap-3">
                {/* Checkbox */}
                <div className={`w-6 h-6 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all
                  ${done ? `${c.done} border-transparent` : `${c.check} bg-white`}`}>
                  {done && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 14 14">
                    <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-semibold text-sm leading-snug ${done ? 'line-through text-sand-400' : 'text-sand-900'}`}>
                      <span className={`inline-flex w-5 h-5 rounded-full ${c.num} text-white text-[10px] items-center justify-center mr-1.5 font-bold flex-shrink-0`}>
                        {i + 1}
                      </span>
                      {item.title}
                    </p>
                    {item.time && (
                      <span className="badge-green text-[10px] whitespace-nowrap flex-shrink-0">
                        ⏱ {item.time}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-sand-500 mt-1 leading-relaxed ml-6">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1 mt-2 ml-6 text-xs font-medium text-green-600 hover:underline"
                    >
                      🔗 {item.link.label} →
                    </a>
                  )}
                  {item.warning && (
                    <p className="text-xs text-amber-600 mt-2 ml-6 flex gap-1">
                      <span>⚠️</span>{item.warning}
                    </p>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {/* Reset */}
      {checked.size > 0 && (
        <button
          onClick={() => { setChecked(new Set()); try { localStorage.removeItem(`checklist-${id}`) } catch {} }}
          className="mt-3 text-xs text-sand-400 hover:text-sand-600 underline"
        >
          Reset progress
        </button>
      )}
    </div>
  )
}
