---
title: How to maintain a software product after launch
description: What software maintenance actually involves (security updates, dependencies, monitoring, backups, platform changes and improvements) and how to plan and budget for it.
topic: guides
tags: [Maintenance, Security, Monitoring, Backups, Technical debt]
service: cloud-devops
status: draft
---

Launch day feels like the finish line. For software, it's closer to the start: the point at which real people depend on the system, and the world around it keeps changing. Software that isn't maintained doesn't stay as it was. It gradually becomes less secure, less compatible and harder to change.

This guide explains what maintenance involves, so you can plan for it rather than discover it.

## Why software needs maintenance at all

Code doesn't wear out, but everything around it moves:

- **Security vulnerabilities** are found in operating systems, frameworks and libraries, and fixed in new versions.
- **Dependencies** (the third-party libraries every modern application uses) release updates, and older versions stop receiving fixes.
- **Platforms change.** Browsers update constantly; Apple and Google release new mobile OS versions every year and adjust their store rules.
- **Third-party services change.** Payment providers, email services and other APIs publish new versions and retire old ones.
- **Your business changes.** New products, prices, rules and people mean the software needs to adapt.

## The parts of maintenance

### Security and dependency updates

The most important and least visible part. Applying updates regularly, in small steps, is far easier and safer than updating years of neglected dependencies at once, which can turn into a project of its own. Automated tools can flag dependencies with known vulnerabilities; someone still needs to apply, test and deploy the fixes.

### Monitoring

You should hear about problems before your users do. At a minimum:

- **Error tracking** that records crashes and exceptions with enough detail to fix them.
- **Uptime checks** that alert someone if the application stops responding.
- **Basic performance measures**, such as response times, so slowdowns are noticed early.

Alerts should be few and meaningful, and they should go to a person who will act on them.

### Backups and recovery

Automated backups of databases and stored files, kept somewhere separate from the main system, and, crucially, **restored periodically to prove they work**. A backup that has never been restored is untested. Write down how a restore is done, so it doesn't depend on one person's memory.

### Platform and store changes

Mobile apps need updates to stay compatible with new OS versions and to meet store requirements. Google Play, for example, requires app updates to target a recent Android version and limits the visibility of apps that fall behind. Web applications need checking against current browsers.

### Bug fixes

Every system has bugs that only appear with real use. A clear way to report them, and agreement on how quickly different severities are addressed, avoids frustration on both sides.

### Improvements

Real usage reveals what people actually need. Budgeting a little time for small improvements keeps software useful and avoids a build-up of workarounds.

### Paying down technical debt

Shortcuts taken to meet a deadline make later changes slower. Some are sensible trade-offs. Left unaddressed, they accumulate until simple changes become expensive. Regular, small clean-ups keep the cost of change low.

## How to organise it

### Decide who is responsible

Maintenance fails most often because nobody owns it. Whether it's an internal developer, your original development company or another provider, someone must be clearly responsible for updates, monitoring and responding to problems.

### Agree what's included

A maintenance arrangement typically specifies:

- which updates are applied, and how often;
- what's monitored, and who receives alerts;
- how issues are reported and how quickly they're addressed;
- how much time is available for small improvements;
- how larger changes are scoped and agreed separately.

### Keep everything in your name

Hosting, domains, code repositories, app store accounts and third-party services should belong to your organisation. That way you can change who maintains the software without losing access to it.

### Keep documentation current

How the system is deployed, configured, backed up and restored, and the decisions behind its design. Good documentation is what allows a new developer to help quickly in an emergency.

## A simple maintenance calendar

| How often | What |
|---|---|
| Continuously | Error and uptime monitoring; automated vulnerability alerts |
| Monthly | Apply security and dependency updates; review errors and performance |
| Quarterly | Test a backup restore; review hosting costs; clean up technical debt |
| Yearly | Review platform changes (mobile OS releases, browser and store rules); review whether the system still fits the business |

*Adjust the frequencies to how critical the system is. The point is to have a rhythm.*

## Budgeting

There's no universal percentage, because maintenance depends on the system's size, how many external services it relies on, how critical it is and how much it's still changing. The useful approach is to list the activities above, estimate the time each needs for your system, and agree it explicitly, rather than treating maintenance as whatever's left over.

<p class="key-point">Regular, small maintenance is cheap. Neglect followed by an emergency is expensive. Plan maintenance before launch, not after the first incident.</p>
