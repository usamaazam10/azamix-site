---
title: How APIs connect business systems
description: A plain-language explanation of APIs, webhooks and data synchronisation, using a simple online shop, and what makes an integration between business systems dependable.
topic: explained
tags: [APIs, Integrations, Webhooks, Data synchronisation]
service: api-integrations
status: draft
---

Most businesses use several pieces of software: an online shop, accounting, a CRM, email marketing, maybe a warehouse or booking system. Each holds part of the picture. **APIs** are how those systems exchange information without someone copying it between them by hand.

## What an API is

An API (application programming interface) is a defined way for one piece of software to ask another to do something or provide something. A useful analogy is a restaurant counter with a printed menu: you don't walk into the kitchen; you make a request from a fixed list, in an agreed format, and get a predictable response.

Most business APIs today work over the web. One system sends a request to an address, such as:

```
GET https://api.example-shop.com/v1/orders?status=paid
```

and receives a response, usually in a format called JSON:

```json
{
  "orders": [
    { "id": "1042", "customer": "c_881", "total": 59.00, "currency": "EUR", "status": "paid" }
  ]
}
```

The request says *what* it wants (`GET` paid orders); the response is structured data the receiving system can work with directly. Other request types create (`POST`), update (`PATCH` or `PUT`) and delete (`DELETE`) records.

Every serious API also requires **authentication**, typically an API key or token that identifies the caller and limits what it may do.

## Two ways systems learn about changes

### Polling: asking regularly

The accounting system asks the shop every ten minutes: "any new paid orders since last time?" Simple and robust, but there's a delay, and most requests return nothing.

### Webhooks: being told

The shop notifies the accounting integration the moment an order is paid, by sending a request to an address the integration provides. Faster and more efficient, but the receiving side must be available, must verify the message genuinely came from the shop, and must cope if the same notification arrives twice.

Reliable integrations often use both: webhooks for speed, plus a periodic check to catch anything a webhook missed.

## A worked example

A small online shop wants three things to happen automatically when an order is paid:

1. An invoice is created in the accounting system.
2. The customer is added to, or updated in, the CRM.
3. The warehouse system reduces stock.

<figure>
  <div class="figure__frame">
    <div class="figure__bar"><span><b>Fig. 1</b>&nbsp;&nbsp;One event, three updates</span><span>Simplified</span></div>
    <ol class="flow">
      <li>Shop<small>Order paid → webhook</small></li>
      <li class="is-core">Integration<small>Verify, transform, queue</small></li>
      <li>Accounting<small>Create invoice</small></li>
      <li>CRM<small>Upsert customer</small></li>
      <li>Warehouse<small>Reduce stock</small></li>
    </ol>
  </div>
  <figcaption>A central integration service receives the event once and updates each system, so the shop doesn't need to know about the others.</figcaption>
</figure>

The integration has to translate between systems. The shop calls it a "customer", the accounting system a "contact", the CRM a "person", and each stores names and addresses slightly differently. Mapping those fields, and deciding which system's version wins when they disagree, is most of the real design work.

## Point-to-point or central?

With two systems, a direct connection is fine. As systems are added, direct connections multiply: four systems that all exchange data need six connections, each with its own logic and failure modes. Routing everything through one integration service, as in the diagram above, keeps the logic and the monitoring in one place.

## What makes an integration dependable

Building a connection that works on a good day is quick. Building one that keeps working is where the effort goes.

- **A source of truth per field.** If the CRM and accounting disagree on an address, which is right? Decide before writing code.
- **Safe retries.** Services go down. Failed updates should wait in a queue and be retried, and retrying must not create duplicate invoices. This property is called *idempotency*: doing the same operation twice has the same effect as doing it once.
- **Rate limits.** Most APIs cap how many requests you can make per minute or per day. Integrations must respect those limits, especially during large imports.
- **Versioning.** APIs change. Providers publish new versions and retire old ones, usually with notice. Integrations need occasional updates as a result.
- **Visibility.** Every sync should be logged, failures should alert a person, and someone should be able to answer "did order 1042 reach accounting?" in seconds.
- **Security.** Use the narrowest permissions available, store credentials as secrets, and verify every incoming webhook.

## Before you plan an integration

Check, for each system involved:

- Does it have an API, and is API access included in your plan?
- Does it support webhooks for the events you care about?
- What are its rate limits?
- Is there a test or sandbox environment?

The answers determine what's possible, and they're usually in the product's developer documentation.

<p class="key-point">An API makes a connection possible. Agreed rules, careful error handling and monitoring make it dependable.</p>

## Further reading

<ul class="sources">
  <li>MDN Web Docs, <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods">HTTP request methods</a></li>
  <li>MDN Web Docs, <a href="https://developer.mozilla.org/en-US/docs/Glossary/Idempotent">Idempotent</a></li>
  <li>MDN Web Docs, <a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON">Working with JSON</a></li>
</ul>
