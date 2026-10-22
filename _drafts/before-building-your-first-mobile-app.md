---
title: What to consider before building your first mobile app
description: The questions to answer before commissioning a first app, covering users, scope, backend, store accounts, privacy, running costs and maintenance, so the project starts on solid ground.
topic: guides
tags: [Mobile apps, Planning, App Store, Google Play, Privacy]
service: mobile-apps
status: draft
# Facts checked 22 October 2026: Apple Developer Program fee, Google Play registration fee, Google Play target API rule. Re-check before publishing.
---

A first app is exciting to plan and easy to underestimate. The screens are the visible part; the decisions that determine cost, timing and success mostly sit elsewhere. Working through these questions before development starts will make conversations with any developer faster and estimates more accurate.

## 1. Who is it for, and what will they do repeatedly?

Apps succeed when people use them regularly. Write down who the users are and the two or three things they'll do most often: reorder, book, check status, capture a job. If you struggle to name a repeated action, consider whether a website or web app would serve them better. Asking people to install an app is a high bar for something they'll use once.

## 2. What is the smallest useful first version?

List every feature you can imagine, then mark the ones the app is pointless without. That's your first release. Everything else waits until real users tell you what matters. A smaller first version is cheaper, ships sooner and teaches you more than a long specification.

## 3. What does the app need behind it?

Almost every app needs a **backend**: an API, a database and often an admin panel for your team. Ask:

- Do users need accounts? How will they sign in?
- What data is stored, and who manages it?
- Does it take payments? For physical goods and services, apps use payment providers; for digital content and features, Apple and Google have their own in-app purchase rules, which vary by region and have been changing.
- Does it need notifications, maps, messaging or other third-party services?
- Does it connect to systems you already use?

These answers usually affect cost more than the number of screens.

## 4. iOS, Android or both, and how?

Look at who your users are and what they carry. Most businesses targeting a general audience need both platforms. Whether to build natively or with a cross-platform framework depends on the features you need and who will maintain the app. We cover that decision in our guide to native and cross-platform development.

## 5. Store accounts, in your name

To publish, you need developer accounts:

- **Apple Developer Program:** an annual membership, listed by Apple at US$99 per year.
- **Google Play Console:** a one-time registration fee of US$25.

Register these in your organisation's name, not your developer's. The account holds your app listing, reviews and history; if it belongs to someone else, moving it later is awkward. Organisation accounts may need extra verification, so start early.

## 6. Privacy and permissions

Both stores require you to disclose what data your app collects and how it's used, Apple through privacy "nutrition labels" and Google through the Data safety section. You'll also need a privacy policy. It's much easier to collect less data from the start than to justify it later.

Request device permissions, such as location, camera and contacts, only when a feature needs them, and explain why at that moment. Users decline vague requests.

## 7. Store review

Both stores review apps before publishing them. Apple's review in particular can reject apps for unclear functionality, missing account deletion, incomplete information or policy issues. Read the [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) and Google Play's [Developer Policy Center](https://play.google.com/about/developer-content-policy/) before you finalise features, not after. No developer can guarantee approval, but building to the guidelines avoids most surprises.

## 8. Running costs

Budget beyond the build:

- Hosting for the backend, which grows with usage.
- Third-party services: maps, messaging, email, analytics, payments (usually per transaction).
- Store developer accounts.
- Maintenance (below).

Ask for an estimate of monthly running costs at your expected usage, and at ten times that.

## 9. Maintenance is not optional

Apps don't stay finished. Apple and Google release major OS updates every year, new devices appear, libraries need security updates, and store rules change. Google Play, for example, requires app updates to target a recent Android version: from 31 August 2026, new apps and updates must target Android 16 (API level 36) or higher. An app nobody maintains will eventually be hidden from new users or stop working properly.

Plan and budget for regular updates from the outset, whether that's an agreement with your developer or your own team.

## 10. How will you know it's working?

Decide what success looks like before launch: number of orders through the app, bookings, support calls avoided, time saved for staff. Add analytics for those specific measures, and crash reporting so you hear about problems before reviews do. Collect only what you need.

## A pre-development checklist

1. Users and their most frequent tasks, written down
2. A first-release feature list, with everything else deferred
3. Backend needs: accounts, data, payments, integrations, admin
4. Platforms and the technical approach
5. Store accounts registered to your organisation
6. Privacy policy and data disclosures planned
7. Monthly running costs estimated
8. A maintenance plan and budget
9. Success measures defined

With these answered, you'll get better estimates, fewer surprises and a first version people actually use.

## Sources

<ul class="sources">
  <li>Apple Developer, <a href="https://developer.apple.com/programs/">Apple Developer Program</a> (membership fee)</li>
  <li>Google Play Console Help, <a href="https://support.google.com/googleplay/android-developer/answer/6112435">Get started with Play Console</a> (registration fee)</li>
  <li>Android Developers, <a href="https://developer.android.com/google/play/requirements/target-sdk">Meet Google Play's target API level requirement</a></li>
  <li>Apple Developer, <a href="https://developer.apple.com/app-store/app-privacy-details/">App privacy details on the App Store</a>; Google Play Console Help, <a href="https://support.google.com/googleplay/android-developer/answer/10787469">Provide information for Google Play's Data safety section</a></li>
</ul>
