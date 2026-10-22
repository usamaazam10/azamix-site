# Claims audit — azamix.com

Last audit: 22 October 2026. This file is excluded from the published site (`_config.yml`).

Every factual statement on the site has to trace back to one of these sources:

- **S1 — the original site** (`index.html` as of commit `2448c57`): service names and descriptions, the About text, the technology list, the three project entries, the email address, the phone number, and the name "Azamix Software Solutions".
- **S2 — the owner's brief** (October 2026): info@azamix.com, +92 342 6147283, the three services, and the instruction not to fabricate credentials.
- **S3 — the owner's content and structure brief** (22 October 2026): the dual services/publication positioning; six services (custom software, mobile, web, AI and automation, APIs and integrations, cloud and support); the seven-stage process; the seven engineering principles; the eight FAQ questions; "some projects are confidential"; no public portfolio; the positioning line and CTA wording.

Anything else was either removed or labelled. Removed text is kept below so it can be restored once the owner confirms it.

## 22 October 2026 restructure

### Restored, now sourced from S3

Sections 1–3 under "Removed until the owner confirms" (process, working principles, FAQs) are covered by S3 and are back on the site in new wording. The S1 project entries (ERP, e-commerce, cloud dashboard) are **no longer presented as projects**. The Solutions section describes six *types* of system (from S3), and the three drawings are captioned "Illustration… not a client system".

### Written carefully because terms aren't established

| Topic | What the site says | Why |
| --- | --- | --- |
| Code ownership | "Set out in the written agreement for each project" | S3 says not to promise unestablished legal terms |
| NDA | "Some of our work is confidential… mention it and we'll review it" | S3: "some projects are confidential". No promise to sign any NDA |
| Estimates and timelines | Estimates follow agreed scope; no fixed timelines | S3 |
| Maintenance | "When agreed" | S3 process step 7 |
| Store, cloud and AI accounts | "We recommend" they're registered to the client | Phrased as advice, not as a statement of past practice |
| Store approval, AI accuracy | Explicitly not guaranteed | Factual |
| Contact response | "We'll discuss the requirements and possible next steps" | S3 CTA wording. No response time is promised |

### New statements that go beyond S1–S3: owner to confirm

| Statement | Where |
| --- | --- |
| "Our main mobile toolkit is Flutter"; native development recommended "when requirements call for it" | Mobile page, FAQ |
| "Our cloud work is based on AWS" | Cloud page FAQ (S1 lists AWS; it doesn't say *only* AWS) |
| Practices named under the principles: code review before merge, automated tests on every change, dependency vulnerability checks, accessibility checked while building, backups restored periodically | Homepage, Approach page, service pages |
| "Mainly provided for the software we build" (cloud and support) | Cloud page, homepage note |
| Typical deliverables listed on service pages (e.g. TestFlight beta testing, staging environments, runbooks, data migration) | Service pages |

If any of these isn't how Azamix works, edit the wording rather than leaving it in place.

### Open questions (new)

1. Can the eight draft articles be published under the byline "Azamix", or should they carry a named author?
2. Is the "In preparation" list on /insights/ acceptable publicly? (Delete `_data/planned.yml` entries to hide it.)
3. Should the form be connected to a form backend (see README) so inquiries arrive without the visitor's email app?
4. Is there a privacy policy to link from the contact form? None is claimed today.

The original questions below about WhatsApp, the technology list and response times are still open.

## Checks with nothing found

| Check | Result |
| --- | --- |
| Testimonials or reviews | None on any page |
| Client logos or partner marks | None |
| Statistics (client counts, years, percentages, results) | None |
| Awards, certifications, compliance claims | None |
| Team members, bios, photos | None |
| Office address or location claims | None. Structured data has no address |
| Placeholder or dead links (`#`, empty, example domains) | None. Every internal link and anchor resolves |
| Stock photos presented as project screenshots | None. The original Unsplash images were removed earlier |

## What stays on the site, and its source

| Claim | Where | Source |
| --- | --- | --- |
| Azamix (shortened from "Azamix Software Solutions" at the owner's request, October 2026) | Footer, structured data | S1 footer |
| usamaazam10@gmail.com (replaced info@azamix.com at the owner's request, October 2026), +92 342 6147283 | Contact, footer, menu, structured data, form | S1, S2 |
| Custom software: enterprise systems, automation platforms, secure, scalable, tailored | Home, service page | S1 services |
| Web & mobile apps: fast, responsive, modern frameworks, UX principles | Home, service page | S1 services |
| Cloud & DevOps: CI/CD, cloud migration, automation, scalability, monitoring | Home, service page | S1 services |
| Node.js, React, Python, Flutter, AWS, Docker, Kubernetes | About, service pages, diagram | S1 About ("our team has expertise across…") |
| "High-quality digital products", "strong UI/UX principles", "scalable architecture" | About | S1 About |
| ERP system, e-commerce app, cloud dashboard, and their feature lists | Work | S1 projects (wording kept close to the original) |
| API integrations, admin panels | Service lists | S1 project descriptions |

Wording on the service pages under "Where this usually starts" and "Is this the right service?" describes common client situations. It makes no claims about Azamix's history, clients, or results.

## Labelled, not removed

| Item | Label | Why |
| --- | --- | --- |
| The three project entries | Each is tagged **Illustration**. The section says the images are drawn for this site, are not screenshots of delivered projects, and show no client details | S1 says "systems and apps we have designed and developed", but nothing confirms whether they were client work, internal products, or concepts. The earlier "Concept" label was also an unverified claim, so it was replaced |
| Hero architecture figure | "Fig. 1 — Shape of a typical system we build" · **Illustrative** | A diagram, not a real client system |

## Removed until the owner confirms

Restore any of these after confirming they're accurate.

### 1. "How a project runs" (whole Process section, nav link, footer link)
1. Discovery: we learn how the business works today, who will use the software, and what success looks like → Written requirements
2. Planning & architecture: choose the technology, define the structure, break work into milestones → Scope, plan, and estimate
3. Design & development: interfaces designed first, built in short iterations you can review → Working software, in stages
4. Testing & QA: automated and manual testing across devices and edge cases → A release candidate
5. Launch & support: deploy, watch the release, stay available for fixes and improvements → A live system and handover docs

Also removed from the service pages: "Every project follows the same five stages…"

### 2. Working principles (About)
- Plain-language communication: clear updates on progress, decisions, and trade-offs
- Maintainable by design: readable, documented code
- Security-conscious: authentication, access control, and data handling planned from the start
- Problem before technology: recommend the simplest approach that solves it

Replaced with four points taken directly from S1: secure and scalable, tailored to your needs, strong UI/UX principles, high-quality engineering.

### 3. All service-page FAQs (12 answers)
These stated practices that haven't been confirmed. Examples:
- Estimates are based on a written scope agreed after discovery
- Kubernetes is recommended "only where it pays for itself"
- Azamix works on infrastructure it didn't build, starting with a review
- "Our cloud work is focused on AWS"
- Downtime is scheduled with the client in advance
- App store accounts are registered in the client's name
- Fixes and improvements continue after launch, and systems are documented

### 4. Deliverables not in S1
- Data migration from spreadsheets or legacy systems
- Documentation and a clean handover
- Infrastructure documentation
- Production and App Store / Google Play releases
- CI/CD "with automated tests"; "logging and alerting"
- Staging environments; "documented and straightforward to maintain"

### 5. Contact promises
- "We'll reply with questions or suggested next steps" (also removed from service pages)
- "We'll reply to {email}" in the form's success message
- "Your details are used only to reply to your inquiry" (a privacy statement the owner hasn't made)
- "From the first requirements conversation to a system running in production" (hero and meta description)

### 6. WhatsApp link (`https://wa.me/923426147283`)
Removed from the contact section and footer. Nothing confirms the number is registered on WhatsApp, and a dead WhatsApp link would be a broken contact route.

## Questions for the owner

1. Are the ERP system, e-commerce app, and cloud dashboard real projects? If yes, were they for clients (and can they be named), internal products, or demos?
2. Is the `usamaazam10/BlueBuy` repository Azamix work that can be shown publicly?
3. Is the five-stage process above how Azamix actually works?
4. Which working principles and FAQ answers (sections 2–3) are accurate?
5. Is +92 342 6147283 on WhatsApp?
6. Is the technology list still current?
7. What response time, if any, should the contact section promise?
8. Is there a privacy policy the form should link to?
