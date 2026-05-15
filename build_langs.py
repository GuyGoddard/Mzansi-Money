#!/usr/bin/env python3
"""
build_langs.py — Mzansi Money Guide language build script
==========================================================
Reads all EN HTML files from SOURCE_DIR, pre-renders each into
isiZulu (/zu/), isiXhosa (/xh/), and Afrikaans (/af/) subfolders.

Usage:
    python3 build_langs.py

Run this every time you update an EN page, then push the whole repo.
The /zu/, /xh/, /af/ folders should be committed to GitHub.
"""

import re
import os
import json
from pathlib import Path

# ── Configuration ────────────────────────────────────────────────────────────
SOURCE_DIR = Path('.')          # EN pages live in root
OUTPUT_BASE = Path('.')         # Subfolder pages written here too
BASE_URL    = 'https://mzansi-money.com'
LANG_JS     = Path('lang.js')   # Must exist in SOURCE_DIR

LANGUAGES = {
    'zu': {'label': 'isiZulu',    'og_locale': 'zu_ZA', 'html_lang': 'zu'},
    'xh': {'label': 'isiXhosa',   'og_locale': 'xh_ZA', 'html_lang': 'xh'},
    'af': {'label': 'Afrikaans',  'og_locale': 'af_ZA', 'html_lang': 'af'},
}

# All pages with their URL slug
PAGES = [
    ('index.html',                 ''),          # special: / not /index
    ('sassa.html',                 'sassa'),
    ('sassa-pay-dates.html',       'sassa-pay-dates'),
    ('sassa-srd-declined.html',    'sassa-srd-declined'),
    ('sassa-means-test.html',      'sassa-means-test'),
    ('tools.html',                 'tools'),
    ('tax.html',                   'tax'),
    ('tax-calculator.html',        'tax-calculator'),
    ('uif.html',                   'uif'),
    ('budgeting.html',             'budgeting'),
    ('credit.html',                'credit'),
    ('business.html',              'business'),
    ('cipc-checklist.html',        'cipc-checklist'),
    ('personal-finance.html',      'personal-finance'),
    ('pathways.html',              'pathways'),
    ('search.html',                'search'),
    ('request-help.html',          'request-help'),
    ('vat-calculator.html',        'vat-calculator'),
    ('medical-aid-tax-credit.html','medical-aid-tax-credit'),
    ('do-i-need-to-file-tax.html', 'do-i-need-to-file-tax'),
    ('tax-refund.html',             'tax-refund'),
    ('topics.html',                'topics'),
    ('sassa-child-support-grant.html', 'sassa-child-support-grant'),
    ('sassa-old-age-pension.html',     'sassa-old-age-pension'),
    ('sassa-disability-grant.html',    'sassa-disability-grant'),
    ('sassa-status-check.html',        'sassa-status-check'),
    ('sassa-grant-stopped.html',       'sassa-grant-stopped'),
    ('uif-fired.html',                 'uif-fired'),
    ('uif-maternity.html',             'uif-maternity'),
    ('domestic-worker-rights.html',    'domestic-worker-rights'),
    ('ccma-guide.html',                'ccma-guide'),
    ('payslip-explained.html',         'payslip-explained'),
    ('debt-help.html',                 'debt-help'),
    ('borrowing-safely.html',          'borrowing-safely'),
    ('minimum-wage.html',              'minimum-wage'),
]

# Relative paths that need ../ prefix when inside a language subfolder
RELATIVE_HTML_HREFS = [
    'budgeting.html', 'budgeting.html#budget-calc',
    'business.html', 'business.html#funding', 'business.html#run',
    'cipc-checklist.html', 'credit.html', 'do-i-need-to-file-tax.html',
    'index.html', 'medical-aid-tax-credit.html', 'pathways.html',
    'personal-finance.html', 'request-help.html', 'sassa-means-test.html',
    'sassa-pay-dates.html', 'sassa-srd-declined.html', 'sassa.html',
    'sassa.html#eligibility', 'search.html', 'tax-calculator.html',
    'tax.html', 'tools.html', 'uif.html', 'uif.html#uif-calc',
    'vat-calculator.html',
    'tax-refund.html',
    'topics.html',
    'sassa-child-support-grant.html',
    'sassa-old-age-pension.html',
    'sassa-disability-grant.html',
    'sassa-status-check.html',
    'sassa-grant-stopped.html',
    'uif-fired.html',
    'uif-maternity.html',
    'domestic-worker-rights.html',
    'ccma-guide.html',
    'payslip-explained.html',
    'debt-help.html',
    'borrowing-safely.html',
    'minimum-wage.html',
]

RELATIVE_ASSETS = ['favicon.png', 'lang.js', 'logo-icon.png', 'shared.css']

# ── Load translations from lang.js ───────────────────────────────────────────
def load_translations():
    """Parse the TRANSLATIONS object from lang.js into a Python dict."""
    content = LANG_JS.read_text(encoding='utf-8')
    translations = {}
    for lang in ['en', 'zu', 'xh', 'af']:
        idx = content.find(f'\n  {lang}: {{')
        if idx == -1:
            print(f"WARNING: language block '{lang}' not found in lang.js")
            translations[lang] = {}
            continue
        bs = content.find('{', idx) + 1
        depth = 1
        j = bs
        while j < len(content) and depth > 0:
            if content[j] == '{':
                depth += 1
            elif content[j] == '}':
                depth -= 1
            j += 1
        block = content[bs:j-1]
        pairs = re.findall(r"^\s+(\w+):\s*'((?:[^'\\]|\\.)*)'", block, re.MULTILINE)
        # Unescape single quotes
        translations[lang] = {k: v.replace("\\'", "'") for k, v in pairs}
    return translations

# ── Text substitution ─────────────────────────────────────────────────────────
def translate_element(content, lang, t):
    """
    Replace textContent of leaf data-t elements and attribute values of
    data-t-attr elements with translations for the given language.

    Leaf element: element has data-t but NO child element also with data-t.
    The new engine already handles this at runtime, but for pre-rendering we
    need to do it statically.
    """

    def replace_leaf(m):
        full_tag    = m.group(0)
        before_gt   = m.group(1)   # everything up to first >
        inner       = m.group(2)   # current inner content
        key         = re.search(r'data-t="([^"]+)"', before_gt)
        attr_target = re.search(r'data-t-attr="([^"]+)"', before_gt)
        if not key:
            return full_tag
        translation = t.get(key.group(1), t.get(key.group(1)))
        if not translation:
            return full_tag
        if attr_target:
            # Replace the attribute value (e.g. placeholder="...")
            attr_name = attr_target.group(1)
            new_tag = re.sub(
                rf'{attr_name}="[^"]*"',
                f'{attr_name}="{translation}"',
                before_gt)
            return '<' + new_tag + '>' + inner
        # Check if inner has child data-t — if so, skip (engine handles children)
        if 'data-t=' in inner:
            return full_tag
        # Leaf node — replace text, preserve any non-text HTML fragments
        # We only replace if the inner is purely text (no child tags)
        if re.search(r'<[a-zA-Z]', inner):
            return full_tag
        return '<' + before_gt + '>' + translation

    # Match opening tag + content — simplified; handles single-line elements
    # For multi-line we use a different approach: direct key lookup
    # Strategy: find all data-t="KEY" occurrences, then for each check
    # if the element is a leaf and replace its text content

    result = content
    for key, translation in t.items():
        if not translation:
            continue
        # Pattern: an opening tag with data-t="key" followed by text (no child tags) and a closing tag
        # We use a targeted replacement: find ">TEXT</tag>" where the opening tag contains data-t="key"
        escaped_key = re.escape(key)

        # Single-line leaf: <TAG ...data-t="key"...>TEXT</TAG>
        def sub_leaf(m):
            attrs   = m.group(1)
            text    = m.group(2)
            tag_end = m.group(3)
            # Skip if inner has child elements
            if re.search(r'<[a-zA-Z/]', text):
                return m.group(0)
            # Skip if this element has a data-t-attr (handled separately)
            if 'data-t-attr=' in attrs:
                return m.group(0)
            return f'<{attrs}>{translation}{tag_end}'

        result = re.sub(
            rf'<([^>]*data-t="{escaped_key}"[^>]*)>((?:(?!<[a-zA-Z/]).)*?)(<\/\w+>)',
            sub_leaf,
            result,
            flags=re.DOTALL
        )

        # data-t-attr replacements: replace the named attribute value
        def sub_attr(m):
            attrs    = m.group(1)
            rest     = m.group(2)
            attr_m   = re.search(r'data-t-attr="([^"]+)"', attrs)
            if not attr_m:
                return m.group(0)
            attr_name = attr_m.group(1)
            new_attrs = re.sub(rf'{attr_name}="[^"]*"', f'{attr_name}="{translation}"', attrs)
            return f'<{new_attrs}>{rest}'

        result = re.sub(
            rf'<([^>]*data-t="{escaped_key}"[^>]*data-t-attr="[^"]*"[^>]*)>(.*?)',
            sub_attr,
            result,
            flags=re.DOTALL
        )

    return result

# ── Path rewriting ────────────────────────────────────────────────────────────
def rewrite_paths(content):
    """Prefix all relative HTML hrefs and asset paths with ../ for subfolder pages."""
    # Relative .html hrefs
    for href in RELATIVE_HTML_HREFS:
        escaped = re.escape(href)
        content = re.sub(
            rf'href="{escaped}"',
            f'href="../{href}"',
            content)
    # Relative assets
    for asset in RELATIVE_ASSETS:
        content = re.sub(
            rf'(?<!=")(?<!["\w/])("{asset}")',
            lambda m: f'"../{asset}"',
            content)
        # More targeted: src="asset" and href="asset"
        content = re.sub(rf'(src|href)="{re.escape(asset)}"',
                         lambda m: f'{m.group(1)}="../{asset}"', content)
    return content

# ── Head section transforms ───────────────────────────────────────────────────
def transform_head(content, lang, slug, lang_info):
    """Update hreflang, canonical, html lang, og:locale, og:url for a language page."""
    code  = lang
    label = lang_info['label']
    html_lang = lang_info['html_lang']
    locale    = lang_info['og_locale']

    en_url  = f'{BASE_URL}/{slug}' if slug else f'{BASE_URL}/'
    lang_url = f'{BASE_URL}/{code}/{slug}' if slug else f'{BASE_URL}/{code}/'

    # Update <html lang="...">
    content = re.sub(r'<html lang="[^"]*">', f'<html lang="{html_lang}">', content)

    # Update canonical
    content = re.sub(
        rf'<link rel="canonical" href="{re.escape(en_url)}"/>',
        f'<link rel="canonical" href="{lang_url}"/>',
        content)

    # Update og:url
    content = re.sub(
        rf'<meta property="og:url" content="{re.escape(en_url)}"/>',
        f'<meta property="og:url" content="{lang_url}"/>',
        content)

    # Update og:locale
    content = re.sub(
        r'<meta property="og:locale" content="[^"]*"/>',
        f'<meta property="og:locale" content="{locale}"/>',
        content)

    return content

# ── Sitemap generation ────────────────────────────────────────────────────────
def generate_sitemap(pages):
    """
    Generate sitemap.xml with one <url> block per page per language variant (80 total).
    Each block includes the full hreflang set so Google correctly maps all variants.
    """
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
             '        xmlns:xhtml="http://www.w3.org/1999/xhtml">']

    for _, slug in pages:
        en_url   = f'{BASE_URL}/{slug}' if slug else f'{BASE_URL}/'
        lang_urls = {lc: (f'{BASE_URL}/{lc}/{slug}' if slug else f'{BASE_URL}/{lc}/')
                     for lc in ['zu', 'xh', 'af']}

        # Shared hreflang block used by every variant
        hl = [f'    <xhtml:link rel="alternate" hreflang="en-ZA" href="{en_url}"/>']
        for lc, lu in lang_urls.items():
            hl.append(f'    <xhtml:link rel="alternate" hreflang="{lc}" href="{lu}"/>')
        hl.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{en_url}"/>')

        # EN entry
        lines += ['  <url>', f'    <loc>{en_url}</loc>'] + hl
        lines += ['    <changefreq>monthly</changefreq>', '    <priority>0.9</priority>', '  </url>']

        # Language entries
        for lc, lu in lang_urls.items():
            lines += ['  <url>', f'    <loc>{lu}</loc>'] + hl
            lines += ['    <changefreq>monthly</changefreq>', '    <priority>0.8</priority>', '  </url>']

    lines.append('</urlset>')
    return '\n'.join(lines)

# ── Main build ────────────────────────────────────────────────────────────────
def build():
    print("Loading translations from lang.js...")
    translations = load_translations()
    for lang in ['en', 'zu', 'xh', 'af']:
        print(f"  {lang}: {len(translations[lang])} keys")

    total_written = 0
    errors = []

    for filename, slug in PAGES:
        src_path = SOURCE_DIR / filename
        if not src_path.exists():
            print(f"  SKIP (not found): {filename}")
            continue

        en_content = src_path.read_text(encoding='utf-8')

        for lang, lang_info in LANGUAGES.items():
            t = translations[lang]

            # 1. Translate text content
            translated = translate_element(en_content, lang, t)

            # 2. Update head metadata
            translated = transform_head(translated, lang, slug, lang_info)

            # 3. Rewrite relative paths (add ../ prefix)
            translated = rewrite_paths(translated)

            # 4. Write output
            out_dir = OUTPUT_BASE / lang
            if slug:
                out_path = out_dir / filename
            else:
                # index.html -> /zu/index.html
                out_path = out_dir / 'index.html'

            out_dir.mkdir(parents=True, exist_ok=True)
            out_path.write_text(translated, encoding='utf-8')
            total_written += 1

        print(f"  ✓ {filename}")

    # Generate sitemap
    sitemap = generate_sitemap(PAGES)
    sitemap_path = SOURCE_DIR / 'sitemap.xml'
    sitemap_path.write_text(sitemap, encoding='utf-8')
    print(f"\n✓ sitemap.xml written ({len(PAGES) * 4} URLs)")

    print(f"\n{'='*50}")
    print(f"Build complete: {total_written} language pages written")
    print(f"Folders: zu/ ({len(PAGES)} files), xh/ ({len(PAGES)} files), af/ ({len(PAGES)} files)")
    if errors:
        print(f"Errors: {len(errors)}")
        for e in errors: print(f"  {e}")

if __name__ == '__main__':
    build()
