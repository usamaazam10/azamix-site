---
title: What happens behind the scenes when you use a mobile app?
description: Follow a single tap on "Place order" through the phone, the network, an API, a database, a payment provider and back, and see why the app is only a small part of the system.
topic: explained
tags: [Mobile apps, APIs, Backend, Push notifications]
service: mobile-apps
status: draft
---

When you tap a button in an app, the result usually appears in under a second. In that time, the request may have passed through half a dozen separate systems. Understanding that journey explains a lot: why apps need a backend, why they sometimes fail on a poor connection, and why "just building the app" is rarely the whole job.

Let's follow one tap. Imagine an app for ordering from a local café, and a customer pressing **Place order**.

<figure class="wide">
  <div class="figure__frame">
    <div class="figure__bar"><span><b>Fig. 1</b>&nbsp;&nbsp;The journey of one tap</span><span>Simplified</span></div>
    <ol class="flow">
      <li>App<small>Builds the request</small></li>
      <li>Network<small>Encrypted with HTTPS</small></li>
      <li class="is-core">API<small>Checks who and what</small></li>
      <li>Database<small>Saves the order</small></li>
      <li>Payment provider<small>Takes payment</small></li>
      <li>Notification<small>Tells the café</small></li>
    </ol>
  </div>
  <figcaption>Each step can fail independently, which is why well-built apps handle errors at every stage.</figcaption>
</figure>

## 1. On the phone

The app gathers what it needs: the items in the basket, the pickup time, and a token proving the customer is logged in. That token was issued when they signed in and is kept in the phone's secure storage (the Keychain on iOS, the Keystore on Android), not in plain files.

Notice what the app does *not* do. It doesn't calculate the final price on its own authority, and it doesn't decide whether the café is open. The app might display those things, but the decisions belong to the server. Anything in an app on someone's phone can, in principle, be inspected or altered, so the server must never simply trust it.

## 2. Across the network

The app sends the order as an HTTPS request, usually a small piece of JSON, to an address such as `api.example-cafe.com`. Before any data moves, the phone looks up that address (DNS), then sets up an encrypted connection (TLS) and verifies it's talking to the genuine server.

This is the step most affected by the real world. Mobile connections drop, switch between Wi-Fi and cellular, and slow down in lifts and basements. A well-built app sets sensible timeouts, shows the customer what's happening, and avoids creating a duplicate order if it has to retry, typically by sending a unique identifier with each order so the server can recognise a repeat.

## 3. At the API

The API is the backend's front door. When the request arrives, it checks, in roughly this order:

- **Authentication:** is the token valid, and which customer does it belong to?
- **Validation:** is the request well-formed? Do the items exist? Is the pickup time possible?
- **Authorisation:** is this customer allowed to do this? (Ordering, yes. Seeing someone else's orders, no.)
- **Business rules:** is the café open, are the items in stock, what's the price including any discount?

Only then does it act. This is where most of a system's real logic lives, which is why the same API can serve the iOS app, the Android app, a website and the café's own admin screen, all applying the same rules.

## 4. In the database

The order is written to a database as a set of records: an order, its line items, the customer, a status of "awaiting payment". Databases guarantee that related changes happen together or not at all, so you never end up with half an order.

The database is also where history accumulates. Months later, the same records feed reports on what sells, when, and to whom.

## 5. At the payment provider

Card details almost never touch the café's own servers. Instead, the app uses the payment provider's secure components to collect them, the provider handles the card network, and the backend receives a confirmation, often via a **webhook**: a message the payment provider sends to the API when the payment succeeds or fails.

Because that confirmation arrives separately, the order may sit in "awaiting payment" for a second or two. Systems are designed around this: the API updates the order when the webhook arrives, and the app updates the screen when the order changes.

## 6. Notifications and background work

With the order paid, several things can happen without anyone waiting for them:

- The café's tablet shows the new order.
- A receipt email is sent.
- Later, when the order is ready, the customer gets a push notification.

Push notifications don't go directly from the café's server to the phone. The server asks Apple's Push Notification service (for iPhones) or Firebase Cloud Messaging (for Android) to deliver them, and those services handle reaching the device. This is why notifications can arrive even when the app is closed, and why they occasionally arrive late: delivery is outside the app's control.

Slower tasks, such as generating a PDF receipt or syncing with accounting software, are usually handed to **background jobs** so the customer isn't kept waiting.

## 7. Back to the phone

The API responds with the order's details and status, and the app updates the screen. The whole round trip, on a decent connection, takes a fraction of a second.

## Why this matters if you're planning an app

**The visible app is a minority of the work.** The API, database, admin tools, payment integration, notifications and hosting are all part of the product. A quote or plan that only covers screens is missing most of the system.

**Old versions linger.** Once an app is in people's hands, you can't update everyone at once. The API has to keep supporting older app versions for a while, so changes need planning.

**Failure is normal.** Networks drop, providers have outages, phones run out of battery mid-request. Good systems expect this at every step and recover cleanly, without lost or duplicated orders.

**Security lives on the server.** The rules that protect your business, such as prices, permissions and stock, must be enforced by the backend, whatever the app shows.

## Sources

<ul class="sources">
  <li>Apple Developer, <a href="https://developer.apple.com/documentation/usernotifications/setting-up-a-remote-notification-server">Setting up a remote notification server</a></li>
  <li>Firebase, <a href="https://firebase.google.com/docs/cloud-messaging">Firebase Cloud Messaging</a></li>
  <li>Apple Developer, <a href="https://developer.apple.com/documentation/security/keychain-services">Keychain services</a>; Android Developers, <a href="https://developer.android.com/privacy-and-security/keystore">Android Keystore system</a></li>
</ul>
