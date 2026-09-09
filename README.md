# fcp.gmbh — bilingual site (EN / DE) with clean URLs

## URL map

| English | German |
|---|---|
| `/` | `/de/` |
| `/products/` | `/de/produkte/` |
| `/brands/` | `/de/marken/` |
| `/services/` | `/de/partnerschaft/` |
| `/imprint/` | `/de/impressum/` |

The old `products.html`, `brands.html`, `services.html`, `imprint.html` still exist as
redirect stubs pointing at the new clean URLs. **Do not delete them** — they keep the
currently indexed URLs alive. Revisit in ~12 months.

## Deploying

1. Copy everything in this folder into the repository root, overwriting existing files.
2. **Keep the existing `CNAME` file.** It is not included here; deleting it unbinds the
   custom domain `www.fcp.gmbh` from GitHub Pages.
3. Commit and push. GitHub Pages rebuilds automatically.
4. `.nojekyll` (hidden file, included) tells Pages to serve the files verbatim.

Local preview: run `python3 -m http.server 8000` in this folder and open
`http://localhost:8000/`. Opening `index.html` by double-click will not work — asset
paths are root-relative and only resolve over HTTP.

## After going live

- Search Console → resubmit `sitemap.xml` (now 10 URLs with hreflang annotations).
- Request indexing for `/` and `/de/`.
- Expect "Seite mit Weiterleitung" entries for the four old `.html` URLs. That is the
  expected state for a redirect, not an error.
- Index settles in roughly 2–4 weeks.

## Language handling

- **Nav switcher** (`DE / EN`): active language underlined in ice-cyan, 42 px tap target.
- **Suggestion bar** (`js/lang.js`): if the browser language does not match the page
  language, a dismissible bar offers the other version. It never redirects — search
  engines and shared links always land on the requested URL. The visitor's choice is
  stored in `localStorage` under `fcp-lang` and the bar never reappears afterwards.
  To retest, clear site data in DevTools. To disable, remove the
  `<script src="/js/lang.js" defer></script>` line from the pages.
- The bar reads the counterpart URL from each page's own `hreflang` tags, so new pages
  need no change to the script. Wording lives at the top of `js/lang.js` (`copy = ...`).

## Editing later

- Each page exists twice — edit both language versions when changing shared content.
- Structure, CSS classes and scripts are identical between EN and DE, so a change in
  one can be pasted into the other.
- `css/styles.css` is shared by all ten pages. Switcher and bar styles are at the bottom
  under `LANGUAGE SWITCH` / `LANGUAGE SUGGESTION BAR`.
- When adding a **new page**, create it in both languages and add to each: the three
  `hreflang` lines in `<head>`, the switcher block in the nav, the `lang.js` script tag,
  and two entries in `sitemap.xml`.

## Changed relative to the original

- All asset and internal links are root-relative (`/css/…`, `/images/…`), required
  because pages now sit one folder deep.
- `og:image` now points at `images/og-cover.jpg` (1200×630) instead of the 256 px favicon.
- `knowsAbout` in the homepage JSON-LD deduplicated; German page uses German terms.
- Imprint pages gained the Open Graph tags the other pages already had.
- Added `404.html` (bilingual) and `js/lang.js`.
- CSS cache-buster bumped to `?v=2026-08-20`.
