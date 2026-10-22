#!/usr/bin/env python3
"""Check a built site for broken internal links, missing anchors and missing assets.

Usage: python3 tools/check_links.py _site
Exits non-zero if anything is broken. External links are listed, not fetched.
"""
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote


class Collector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids, self.h1 = [], set(), 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "button" and "data-topic" in a:  # /insights/#topic is handled by the topic filter
            self.ids.add(a["data-topic"])
        if tag == "h1":
            self.h1 += 1
        for key in ("href", "src"):
            if a.get(key) and not (tag == "link" and a.get("rel") in ("canonical", "alternate")):
                self.links.append(a[key])


def resolve(root, path):
    p = root / unquote(path).lstrip("/")
    if p.is_dir():
        p = p / "index.html"
    return p if p.exists() else None


def main(root):
    root = Path(root)
    pages = {}
    for f in root.rglob("*.html"):
        c = Collector()
        c.feed(f.read_text(encoding="utf-8"))
        pages[f] = c
    problems, external = [], set()
    for f, c in pages.items():
        rel = "/" + str(f.relative_to(root))
        if c.h1 != 1 and "web-mobile-apps" not in rel:
            problems.append(f"{rel}: {c.h1} <h1> elements")
        for link in c.links:
            u = urlparse(link)
            if u.scheme in ("mailto", "tel"):
                continue
            if u.scheme in ("http", "https"):
                external.add(link)
                continue
            target = f if not u.path else (resolve(root, u.path) if u.path.startswith("/") else resolve(f.parent, u.path))
            if target is None:
                problems.append(f"{rel}: broken link {link}")
            elif u.fragment and target.suffix == ".html":
                if u.fragment not in pages.get(target, Collector()).ids and u.fragment != "top":
                    problems.append(f"{rel}: missing anchor {link}")
    print(f"Checked {len(pages)} pages, {len(external)} distinct external links (not fetched).")
    for p in problems:
        print("  " + p)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "_site"))
