---
title: "Native vs. cross-platform app development: how to choose"
description: Native, cross-platform or a web app? The choice follows from a few concrete questions about what your app has to do, who will maintain it and what it can cost.
topic: mobile
tags: [Flutter, React Native, Kotlin Multiplatform, Swift, iOS, Android]
service: mobile-apps
status: draft
# Before publishing: re-check the framework status notes in "The main options" against current release notes.
---

If you're planning an app for both iPhone and Android, one of the first technical decisions is how to build it. You can write two separate **native** apps, one per platform, or one **cross-platform** app that runs on both. A third option, a **web app** that runs in the browser, is sometimes the right answer too.

Developers can be tribal about this. The decision is easier if you ignore the arguments about which technology is "best" and ask what your particular app needs.

## The main options

**Native development** means building the iOS app in Swift (usually with SwiftUI or UIKit) and the Android app in Kotlin (usually with Jetpack Compose). Each app uses its platform's own tools and has direct access to everything the operating system offers.

**Cross-platform development** means writing most of the app once and running it on both platforms. The best-known options today are:

- **Flutter**, from Google, which uses the Dart language and draws its own interface, so the app looks the same on both platforms unless you deliberately adapt it.
- **React Native**, from Meta, which uses JavaScript or TypeScript and renders the platform's native interface components.
- **Kotlin Multiplatform**, from JetBrains, which shares business logic written in Kotlin. With Compose Multiplatform, which JetBrains declared stable for iOS in May 2025, it can share the interface too.

**A web app** runs in the browser and can be added to the home screen. There's no app store involved, but access to device features is more limited.

## What actually differs

| | Native | Cross-platform | Web app |
|---|---|---|---|
| Codebases to maintain | Two | One, with small platform-specific parts | One |
| Access to device features | Everything, on day one | Common features via plugins; others need native code | Limited, especially on iOS |
| Newest OS features | Immediately | Often after a delay, or with custom native code | Rarely |
| Look and feel | Platform conventions by default | Depends on framework and design choices | Browser-based |
| App store presence | Yes | Yes | No |
| Relative cost for both platforms | Highest | Lower | Lowest |

The cost difference is the one most people care about, and it's real but often overstated. A cross-platform app doesn't cost half as much as two native apps. Design, backend work, testing on both platforms and store submission are needed either way. What you avoid is writing and maintaining the same screens and logic twice.

## Five questions that usually decide it

### 1. Which device features does the app depend on?

Camera, photos, location, push notifications, biometrics and local storage are well supported by every mainstream cross-platform framework. If your app's core value depends on something more specialised, such as augmented reality, complex background processing, deep integration with health or car platforms, or home-screen widgets with a lot of behaviour, native development removes a layer between you and the platform.

Cross-platform apps can still call native code for those parts. That works well for one or two features. If most of the app is platform-specific, you lose the benefit of sharing code.

### 2. How closely must it follow each platform's conventions?

Many business and consumer apps use their own brand-led design, and users accept the same interface on both platforms. Some apps, particularly utilities that sit alongside the operating system's own apps, feel wrong if they don't behave exactly like iOS on an iPhone and like Android on an Android phone. Native development makes that easiest; React Native gets close because it uses native components; Flutter can do it but requires deliberate work.

### 3. Who will maintain it?

This matters more than most teams expect. An app will need updates for years: new OS versions, new devices, changing store rules. If your organisation already employs iOS and Android developers, native apps fit the team you have. If you'll rely on a small team or an external partner, one codebase in a widely used framework is usually easier to staff and maintain.

### 4. Does it need to work offline?

Offline support is mostly a backend and data-design problem, not a framework problem. Every approach can store data on the device; the hard part is deciding what happens when two people change the same record while offline. Don't let this question push you toward one framework. Do let it shape your planning.

### 5. Does it need to be an app at all?

If most people will use it once or occasionally, need no device features beyond what a browser offers, and you don't need an app store listing, a well-built web application may serve them better and cost less. iOS has supported web push notifications for web apps added to the Home Screen since iOS 16.4, which narrowed the gap, but background behaviour and device access on iOS remain more limited than for an installed app.

## A reasonable default

For most business apps, meaning booking, ordering, account management, field data capture and internal tools, cross-platform development is a sensible default. The device features involved are well supported, the interface is usually custom anyway, and maintaining one codebase is a real long-term saving.

Native becomes the better choice when the app's main value depends on platform-specific capabilities, when you need new OS features as soon as they ship, or when you already have native teams to maintain it.

A web app is the better choice when usage is occasional and an install step would put people off.

## Questions to ask whoever builds your app

- Which approach do you recommend for *this* app, and what would make you recommend a different one?
- Which of our required features would need platform-specific code?
- How will the backend handle older app versions that users haven't updated?
- What happens to the app when iOS and Android release new versions each year?
- If we change development partners later, how easy will it be for someone else to take over?

A good answer to the first question mentions your requirements, not only the developer's preferences.

## Sources

<ul class="sources">
  <li>JetBrains, <a href="https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/">Compose Multiplatform 1.8.0 released: Compose Multiplatform for iOS is stable and production-ready</a> (May 2025)</li>
  <li>WebKit, <a href="https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/">Web Push for Web Apps on iOS and iPadOS</a> (2023)</li>
  <li><a href="https://flutter.dev/">Flutter</a>, <a href="https://reactnative.dev/">React Native</a> and <a href="https://kotlinlang.org/docs/multiplatform.html">Kotlin Multiplatform</a> official documentation</li>
</ul>
