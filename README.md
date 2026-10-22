# azamix.com

Static website for Azamix, served by GitHub Pages from the `main` branch (custom domain in `CNAME`).
No build step: edit the HTML/CSS/JS and push.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | Homepage — hero, services, work, about, contact form |
| `services/*/index.html` | Service detail pages (custom software, web & mobile, cloud & DevOps) |
| `404.html` | Not-found page |
| `assets/css/site.css` | All styles. Design tokens (colours, type, spacing) are at the top |
| `assets/js/site.js` | Mobile menu, scroll reveal, contact form handling |
| `assets/brand/` | Logo and symbol SVGs (light, dark, single colour) and the 512 px icon. Usage rules are in `BRAND.md` |
| `assets/img/` | Favicon, touch icon, social sharing image |
| `assets/fonts/` | Self-hosted Geist and Geist Mono (latin subset, SIL Open Font License) |
| `robots.txt`, `sitemap.xml` | Search engine files — add new pages to the sitemap |

The header and footer are repeated in each HTML file. If you change one, change it in all five.

## Contact form

The project inquiry form on the homepage works in two modes, set by the `data-endpoint`
attribute on `<form id="inquiry-form">` in `index.html`:

- **Empty (current):** submitting opens the visitor's email app with the inquiry pre-filled,
  addressed to info@azamix.com. The page tells them clearly that nothing has been sent until they press Send.
- **Set to a form backend URL:** the inquiry is POSTed as JSON and the visitor sees a real
  success or error message based on the server's response.

To send inquiries straight to your inbox, create a free form at [Formspree](https://formspree.io)
(it accepts JSON posts from static sites), point it at info@azamix.com, and paste its URL:

```html
<form id="inquiry-form" data-endpoint="https://formspree.io/f/your-form-id" ...>
```

Spam protection: a hidden honeypot field and a minimum fill time. Formspree adds its own filtering on top.

## Local preview

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765. (Root-relative paths like `/assets/...` need a server; opening the file directly won't load styles.)

## Content rules

Every factual claim must trace back to information the owner has supplied. See `CLAIMS-AUDIT.md` for the sources, what was removed, and the open questions.
