# azamix.com

Website for Azamix, served by GitHub Pages from the `main` branch (custom domain in `CNAME`).
GitHub Pages builds it with **Jekyll 3.10**, so shared parts (header, footer, forms, lists) are written once
and reused. There's still no build step to run yourself: edit and push, and Pages builds it.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | Homepage: hero, what we build, what changes (before/after), concept showcase (tabs), how we work, technology stack, ways to start, FAQ, inquiry CTA |
| `services/` | Overview (`index.html`) and one page per service. `web-mobile-apps/` redirects to `/services/` |
| `solutions/` | Six solution types with concept designs, plus example use cases by industry |
| `approach/`, `about/`, `contact/` | How we work (incl. handover), About, Contact (with the inquiry form) |
| `insights/index.html` | Insights index. **Not live**: excluded from the build while `insights: false` (see below) |
| `moved-insights.html` | Redirects `/insights/` to the homepage while Insights is switched off |
| `_posts/` | Published articles (none yet). `_drafts/`: unpublished drafts, never built on the live site |
| `_layouts/` | `default` (page shell), `service` (service pages), `article` (articles) |
| `_includes/` | Header, footer, head/SEO meta, structured data, inquiry form, FAQ, section heading, post list |
| `_includes/ui/` | Concept product interfaces drawn in HTML/CSS with sample data (board, dashboard, phones, AI review, system diagram). Used on the homepage and, via `visual:` front matter, on service pages. Always shown with a "concept / sample data" label |
| `_data/services.yml` | The service list (incl. a `consider` trade-off per service): drives nav, footer, homepage, overview, form options, "other services" |
| `_data/catalogue.yml` | The software catalogue: 5 categories × 6 kinds of software. Drives the homepage explorer and the full list on /services/ |
| `_data/topics.yml` | Insights categories |
| `_data/planned.yml` | Articles "in preparation" listed on /insights/ while drafts are unpublished |
| `feed.xml`, `sitemap.xml` | Generated Atom feed and sitemap (new pages and articles are added automatically) |
| `assets/css/site.css` | All styles. Design tokens (colour, type, spacing) are at the top |
| `assets/js/site.js` | Mobile menu, scroll reveal, homepage showcase tabs, Insights topic filter, inquiry form |
| `assets/brand/`, `assets/img/`, `assets/fonts/` | Logo files (see `BRAND.md`), icons and social image, self-hosted fonts |
| `tools/check_links.py` | Checks a built site for broken internal links, anchors and duplicate `<h1>`s |

Repo-only files (`README.md`, `BRAND.md`, `CLAIMS-AUDIT.md`, `EDITORIAL.md`, `Gemfile`, `tools/`) are excluded from the site in `_config.yml`.

## Local preview

Needs Ruby (Homebrew Ruby works). Gems install into `vendor/bundle`, which is git-ignored.

```bash
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```

Then open http://127.0.0.1:4000. Add `--drafts` to preview unpublished articles.

Before pushing, build and check links:

```bash
bundle exec jekyll build && python3 tools/check_links.py _site
```

## Insights (future publication)

Azamix currently presents itself as a software development company only. The Insights publication is built but switched off:
`insights: false` in `_config.yml`, `insights/` and `feed.xml` in its `exclude` list, and `moved-insights.html` redirecting `/insights/` to the homepage.
With the flag off, the nav, footer, feed link and "Related insights" on service pages are hidden. To launch it, see "Launching Insights" in `EDITORIAL.md`.

## Common edits

- **Add or change a service:** edit `_data/services.yml` (name, summary, problem, approach, deliverables), then the page in `services/<key>/index.html`. Its FAQs, headline and CTA are in that page's front matter.
- **Contact details:** `email`, `phone` and `phone_href` in `_config.yml`.
- **Publish an article:** see `EDITORIAL.md`.

## Contact form

Set by `form_endpoint` in `_config.yml`:

- **Empty (current):** the button reads "Continue in your email app". Submitting opens the visitor's email app with the inquiry filled in, addressed to the site email. The page says clearly that nothing is sent until they press Send.
- **A form-backend URL:** the inquiry is POSTed as JSON, and the visitor sees a success message only when the server confirms it, or an error with the email address if it fails.

To receive inquiries directly, create a form at a service that accepts JSON posts from static sites (for example [Formspree](https://formspree.io)), point it at your inbox, and set:

```yaml
form_endpoint: "https://formspree.io/f/your-form-id"
```

No secret keys are needed or stored on the site. Spam protection: a hidden honeypot field and a minimum fill time, plus whatever the form service adds.

## Content rules

Every factual claim must trace back to information the owner has supplied. See `CLAIMS-AUDIT.md` for sources and open questions.
