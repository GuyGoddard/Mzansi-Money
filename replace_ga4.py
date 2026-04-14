#!/usr/bin/env python3
"""
MZANSI MONEY GUIDE — GA4 ID Replacement Script
================================================
Run this script ONCE after unzipping your site files.
Replace YOUR_GA4_ID_HERE with your real Google Analytics 4 ID.

HOW TO GET YOUR GA4 ID:
  1. Go to analytics.google.com
  2. Click Admin (gear icon, bottom left)
  3. Under "Property", click "Data Streams"
  4. Click your web stream
  5. Copy the "MEASUREMENT ID" — it looks like G-XXXXXXXXXX

USAGE:
  python3 replace_ga4.py G-ABCD1234567

This replaces every instance of G-XXXXXXXXXX across all 13 HTML files.
"""

import sys, os, glob

if len(sys.argv) < 2:
    print("❌  Usage: python3 replace_ga4.py G-YOURNUMBER")
    print("   Example: python3 replace_ga4.py G-A1B2C3D4E5")
    sys.exit(1)

NEW_ID = sys.argv[1].strip()

if not NEW_ID.startswith('G-') or len(NEW_ID) < 8:
    print(f"❌  '{NEW_ID}' doesn't look like a valid GA4 ID.")
    print("   It should start with G- followed by letters and numbers.")
    sys.exit(1)

PLACEHOLDER = 'G-XXXXXXXXXX'
html_files = glob.glob('*.html')

if not html_files:
    print("❌  No HTML files found. Run this script from the same folder as your HTML files.")
    sys.exit(1)

changed = 0
total_replacements = 0

for fname in sorted(html_files):
    if 'SEO_HEAD' in fname:
        continue
    with open(fname, 'r') as f:
        content = f.read()
    
    count = content.count(PLACEHOLDER)
    if count > 0:
        content = content.replace(PLACEHOLDER, NEW_ID)
        with open(fname, 'w') as f:
            f.write(content)
        changed += 1
        total_replacements += count
        print(f"  ✓ {fname} ({count} replacements)")

print(f"\n✅  Done! Replaced {total_replacements} instances across {changed} files.")
print(f"   Your GA4 ID '{NEW_ID}' is now active in all pages.")
print(f"\n   Next: commit and push to GitHub. Google Analytics will start")
print(f"   tracking visits within minutes of deployment.")
