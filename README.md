# Mzansi Money — mzansi-money.com

Free, step-by-step financial guidance for South Africans.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with custom Mzansi brand tokens
- **Hosting:** Vercel
- **Domain:** mzansi-money.com

---

## Getting Started Locally

### 1. Install Node.js
Download from https://nodejs.org — install the LTS version.

### 2. Install dependencies
```bash
cd mzansi-money
npm install
```

### 3. Run locally
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

---

## Deploying to Vercel (step by step)

### Step 1 — Push to GitHub
1. Go to https://github.com and create a free account
2. Click "New repository" → name it `mzansi-money` → click "Create repository"
3. In your terminal, inside the project folder:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mzansi-money.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to https://vercel.com and sign up (free) with your GitHub account
2. Click "Add New Project"
3. Select your `mzansi-money` repository
4. Click "Deploy" — Vercel auto-detects Next.js. No config needed.
5. Your site goes live at a vercel.app URL in ~2 minutes

### Step 3 — Connect your domain (mzansi-money.com)
1. In Vercel dashboard → your project → "Settings" → "Domains"
2. Type `mzansi-money.com` and click "Add"
3. Vercel shows you DNS records to add
4. Go to your domain registrar (where you bought the domain)
5. Find "DNS Settings" or "Manage DNS"
6. Add the records Vercel shows you (usually an A record and CNAME)
7. Wait 10–30 minutes → your site is live at mzansi-money.com ✓

### Step 4 — Set up Google Search Console (SEO)
1. Go to https://search.google.com/search-console
2. Click "Add property" → enter `https://mzansi-money.com`
3. Verify ownership using the HTML tag method (Vercel makes this easy)
4. Go to "Sitemaps" → enter `sitemap.xml` → submit
5. Google will start indexing your site within days

---

## Project Structure

```
src/
  app/
    layout.tsx              ← Root layout, fonts, SEO metadata
    globals.css             ← Tailwind + brand design system
    page.tsx                ← Homepage
    personal/page.tsx       ← SASSA, Tax, UIF, PAYE, Budgeting
    start-business/page.tsx ← CIPC registration, bank account
    run-business/page.tsx   ← VAT, payroll, tax filing, expenses
    tools/page.tsx          ← All 6 calculators
    sitemap.ts              ← Auto-generated SEO sitemap
  components/
    BottomNav.tsx           ← Mobile sticky navigation
    Checklist.tsx           ← Interactive checklist + progress bar
    Disclaimer.tsx          ← Legal disclaimer
    SAFlag.tsx              ← SA flag stripe
  lib/
    tax.ts                  ← SA tax calculations (2024/25)
public/
  robots.txt               ← Search engine crawling rules
vercel.json                ← Vercel deployment config
```

---

## Updating Tax Rates Each Year
Edit `/src/lib/tax.ts`:
- Update `BRACKETS` array with new SARS brackets
- Update rebate amounts in `getPrimaryRebate()`
- Update threshold amounts in `getTaxThreshold()`
- Update SASSA grant amounts in `/src/app/personal/page.tsx`

---

## Adding the WhatsApp Bot Number
In `/src/app/page.tsx`, find this line and replace the number:
```
href="https://wa.me/27600000000?text=..."
```
Replace `27600000000` with your WhatsApp Business number in international format (27 + number without leading 0).

---

## Domain: mzansi-money.com
Registered and ready. Connect via Vercel DNS settings as described above.
