// ─── SA Tax Brackets 2024/25 ───────────────────────────────────────────────

export type AgeGroup = 'u65' | '65to75' | 'o75'

interface Bracket { min: number; max: number; base: number; rate: number }

const BRACKETS: Bracket[] = [
  { min: 0,        max: 237100,  base: 0,      rate: 0.18 },
  { min: 237101,   max: 370500,  base: 25461,  rate: 0.26 },
  { min: 370501,   max: 512800,  base: 60141,  rate: 0.31 },
  { min: 512801,   max: 673000,  base: 104255, rate: 0.36 },
  { min: 673001,   max: 857900,  base: 161997, rate: 0.39 },
  { min: 857901,   max: 1817000, base: 233984, rate: 0.41 },
  { min: 1817001,  max: Infinity,base: 626659, rate: 0.45 },
]

export function getPrimaryRebate(age: AgeGroup): number {
  if (age === 'o75')    return 17235 + 9444 + 3145  // 29,824
  if (age === '65to75') return 17235 + 9444          // 26,679
  return 17235
}

export function getTaxThreshold(age: AgeGroup): number {
  if (age === 'o75')    return 168000
  if (age === '65to75') return 148217
  return 95750
}

export function calcGrossTax(income: number): number {
  if (income <= 95750) return 0
  const b = BRACKETS.find(b => income >= b.min && income <= b.max) ?? BRACKETS[BRACKETS.length - 1]
  return b.base + (income - b.min) * b.rate
}

export function calcIncomeTax(annualIncome: number, age: AgeGroup) {
  const gross   = calcGrossTax(annualIncome)
  const rebate  = getPrimaryRebate(age)
  const tax     = Math.max(0, gross - rebate)
  const monthly = tax / 12
  const uifAnnual = Math.min(annualIncome * 0.01, 2125.44)
  const takeHomeAnnual = annualIncome - tax - uifAnnual
  const rate = annualIncome > 0 ? (tax / annualIncome) * 100 : 0
  const bracket = BRACKETS.find(b => annualIncome >= b.min && annualIncome <= b.max)
  const bracketLabel = annualIncome <= getTaxThreshold(age)
    ? '0% (below threshold)'
    : `${((bracket?.rate ?? 0) * 100).toFixed(0)}%`

  return {
    annualTax:       Math.round(tax),
    monthlyTax:      Math.round(monthly),
    takeHomeMonthly: Math.round(Math.max(0, takeHomeAnnual / 12)),
    effectiveRate:   parseFloat(rate.toFixed(1)),
    bracketLabel,
    belowThreshold:  annualIncome <= getTaxThreshold(age),
  }
}

// ─── VAT ───────────────────────────────────────────────────────────────────

export const VAT_RATE = 0.15

export function calcVAT(amount: number, inclusive: boolean) {
  if (inclusive) {
    const excl = amount / (1 + VAT_RATE)
    const vat  = amount - excl
    return { excl: Math.round(excl * 100) / 100, vat: Math.round(vat * 100) / 100, incl: amount }
  }
  const vat  = amount * VAT_RATE
  const incl = amount + vat
  return { excl: amount, vat: Math.round(vat * 100) / 100, incl: Math.round(incl * 100) / 100 }
}

// ─── Profit ────────────────────────────────────────────────────────────────

export function calcProfit(revenue: number, cogs: number, expenses: number) {
  const grossProfit = revenue - cogs
  const netProfit   = grossProfit - expenses
  const margin      = revenue > 0 ? (netProfit / revenue) * 100 : 0
  const annualProfit= netProfit * 12
  const vatRequired = annualProfit >= 1000000
  const vatWarning  = annualProfit >= 600000 && annualProfit < 1000000
  return {
    grossProfit:   Math.round(grossProfit),
    netProfit:     Math.round(netProfit),
    margin:        parseFloat(margin.toFixed(1)),
    annualProfit:  Math.round(annualProfit),
    vatRequired,
    vatWarning,
  }
}

// ─── Budget ────────────────────────────────────────────────────────────────

export function calcBudget(
  income: number,
  rent: number, food: number, transport: number,
  utilities: number, debt: number, other: number
) {
  const total    = rent + food + transport + utilities + debt + other
  const surplus  = income - total
  const savingsPotential = Math.max(0, surplus * 0.5)
  const pctSpent = income > 0 ? (total / income) * 100 : 0
  return {
    total:            Math.round(total),
    surplus:          Math.round(surplus),
    savingsPotential: Math.round(savingsPotential),
    pctSpent:         parseFloat(pctSpent.toFixed(1)),
    inDeficit:        surplus < 0,
  }
}

// ─── Formatters ────────────────────────────────────────────────────────────

export function fmtRand(n: number): string {
  return 'R ' + Math.abs(n).toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export function fmtPct(n: number): string { return n.toFixed(1) + '%' }
