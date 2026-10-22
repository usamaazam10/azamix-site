# Insights: editorial workflow

Articles are Markdown files. This file is excluded from the live site.

| Folder | State | On the live site? |
| --- | --- | --- |
| `_drafts/` | Unpublished drafts | No. GitHub Pages never builds drafts |
| `_posts/` | Published articles | Yes, at `/insights/<slug>/` |

## Current drafts (October 2026)

All eight are complete first drafts, written for review. None has been published.

| File | Topic | Notes before publishing |
| --- | --- | --- |
| `native-vs-cross-platform-app-development.md` | Mobile | Re-check framework status (Compose Multiplatform, etc.) |
| `what-happens-behind-a-mobile-app.md` | Explained | — |
| `automation-opportunities-for-small-businesses.md` | AI and Automation | Example table is illustrative and labelled so |
| `when-does-an-ai-api-make-sense.md` | AI and Automation | Check provider links still go to current pricing/data pages |
| `how-to-evaluate-a-software-development-company.md` | Guides | Opens with a conflict-of-interest note; keep it |
| `how-apis-connect-business-systems.md` | Explained | — |
| `before-building-your-first-mobile-app.md` | Guides | Fees and the Google Play target-API rule were checked on 22 Oct 2026. Re-check |
| `maintaining-software-after-launch.md` | Guides | — |

## Insights is switched off (October 2026)

Azamix is presenting itself as a software development company for now, so Insights is not on the live site. Nothing is deleted: the drafts, `insights/index.html`, `feed.xml`, the article layout and `_data/topics.yml` / `planned.yml` are all kept.

### Launching Insights

1. In `_config.yml`: set `insights: true`, and remove `insights` and `feed.xml` from `exclude`.
2. Delete `moved-insights.html` (it would otherwise clash with `/insights/`).
3. Publish at least a few articles first (below), so the section opens with real content.
4. Optionally add an Insights section back to the homepage; the previous version is in git history (commit `10d7dee`, `index.html`, section "G. Insights").

## Preview drafts locally

```bash
bundle exec jekyll serve --drafts
```

Drafts show an "Unpublished draft" banner. While Insights is switched off, open a draft at its URL (e.g. `/insights/<slug>/`); the index page itself only builds once Insights is launched.

## Publish an article

1. Read it in full. Check every fact that can change (prices, platform rules, product features) against the linked source, and update the "Sources" list.
2. Move it to `_posts/` and add the date to the file name: `_drafts/my-slug.md` → `_posts/2026-11-03-my-slug.md`. The slug must stay the same.
3. In its front matter, delete `status: draft` and any `# Before publishing` comment.
4. Push. It appears on /insights/, the homepage, the feed, the sitemap, and as "Related insights" on matching service pages.
5. It drops off the "In preparation" list automatically. You can then delete its entry from `_data/planned.yml`.

If an article is later revised substantively, add `last_modified_at: YYYY-MM-DD` to its front matter so readers see the update date.

## Front matter

```yaml
---
title: Article title, sentence case
description: One or two sentences. Used as the standfirst, in search results and in social previews.
topic: mobile            # key from _data/topics.yml
tags: [Flutter, iOS]
service: mobile-apps     # optional: key from _data/services.yml, for the closing link
status: draft            # drafts only; delete when publishing
# last_modified_at: 2026-12-01   # only after a substantive revision
---
```

Reading time is calculated automatically (about 220 words a minute).

## Standards (also published on /insights/)

- Useful first: no articles written only for search ranking.
- Facts that can change are sourced and dated.
- No invented statistics, quotes, test results or experiences. Illustrative numbers are labelled as such.
- Sponsored or paid content, if ever published, is clearly labelled.
- Articles don't link to other unpublished drafts. Related articles are added automatically once both are live.
