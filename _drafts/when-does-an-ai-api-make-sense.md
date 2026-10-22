---
title: When does an AI API make sense for a business?
description: AI model APIs are good at some tasks and poor at others. A practical test for deciding whether a task suits one, plus the costs, risks and design work that come with it.
topic: ai-automation
tags: [AI, Large language models, APIs, Automation]
service: ai-automation
status: draft
# Before publishing: check provider links still point to current pricing and data-use pages.
---

Hosted AI models from providers such as Anthropic, OpenAI and Google can be used from your own software through an API: you send text (and often images or documents), and the model sends back a response. That makes it possible to add capabilities to ordinary business software that would have required a research team a few years ago.

It also makes it easy to use AI where it doesn't belong. This article is a practical test for telling the difference.

## What these models are good at

Language models are strongest at tasks involving **reading, interpreting and producing language**, where the input varies too much for fixed rules:

- **Extracting structured data** from unstructured input: supplier, date and total from invoices in dozens of layouts; key terms from a contract; details from a free-text enquiry.
- **Classifying** items: is this email a complaint, an order, a question or spam? Which team should handle it?
- **Summarising** long material: a case history, a meeting transcript, a set of customer reviews.
- **Drafting** text for a person to check: a reply, a product description, a first version of a report.
- **Answering questions from your own documents**, when the relevant passages are supplied with the question.

## What they're poor at

- **Exact calculation and lookup.** Totals, tax and stock levels belong in ordinary code and databases.
- **Knowing your business.** A model knows nothing about your customers, prices or policies unless you include that information with each request.
- **Guaranteed correctness.** Models can produce fluent, confident answers that are wrong. Their output can also vary between runs.
- **Decisions with serious consequences** made without a person in the loop.

## A five-question test

**1. Could you write the rules down?** If yes, write them as code. It will be faster, cheaper, exact and easier to test. AI earns its place when the rules can't be written down because the input varies too much.

**2. Can you check the output?** The best uses produce something verifiable: extracted fields that can be validated against a format, a classification a person can confirm with a glance, a draft someone edits before sending. If nobody can tell whether the answer is right, that's a problem.

**3. What does a mistake cost?** A mis-sorted email costs a few minutes. A wrong figure in a payment costs money and trust. The higher the cost, the more review the design needs, and at some point, the less sense automation makes.

**4. Is there enough volume?** Setting up an AI feature properly, with evaluation, validation and monitoring, is real work. It pays off on tasks repeated hundreds or thousands of times, not occasionally.

**5. Are you able to send the data?** Using a hosted model means sending data to the provider. Check what your data includes, what your own obligations are, and the provider's current terms on data use and retention for the plan you'd use.

| | Good fit | Poor fit |
|---|---|---|
| Input | Varied language, documents, images | Structured data with clear rules |
| Output | Checkable: fields, categories, drafts | Unverifiable, or must be exactly right every time |
| Cost of an error | Low, or caught by review | High and hard to reverse |
| Volume | Frequent and repetitive | Occasional |

## You probably don't need your own model

A common assumption is that a business must train or fine-tune its own model. For most business tasks, a general-purpose hosted model performs well when given:

- clear instructions,
- a few examples of good output, and
- the relevant information for that request (for example, the document to process or the policy to apply).

Supplying relevant information at request time, often called retrieval, is how a model can answer questions about your documents without being trained on them. Custom training is expensive and only worth considering once a working system shows a specific gap that it would close.

## The costs to plan for

**Usage costs.** Model APIs are generally priced by the amount of text processed in and out, so costs scale with volume and with how much you send each time. Larger, more capable models cost more per request. Estimate with real documents and realistic volumes, not guesses, and check the provider's current pricing pages.

**Engineering costs.** The API call is the easy part. Most of the effort goes into preparing inputs, validating outputs, handling errors, building review screens and measuring accuracy.

**Ongoing costs.** Providers release new models and retire old ones. Each change needs re-testing.

## What a responsible design includes

- **An evaluation set.** Real examples with known correct answers, used to measure accuracy before launch and after every change.
- **Validation.** Outputs checked against expected formats and business rules before they're used.
- **Human review** for uncertain or high-stakes results, with a simple interface to approve or correct them.
- **Error handling.** Retries for temporary failures, and a clear path when the model can't produce a usable answer.
- **Logging and monitoring.** What was processed, what was corrected, what it cost.
- **A swappable design.** The AI step behind a small interface, so changing provider or model doesn't mean rewriting the system.

## A sensible way to start

Choose one task that passes the five questions. Collect fifty or a hundred real examples with the correct answers. Test a model against them before building anything else. The results will tell you, with evidence, whether to continue, adjust the scope, or solve the problem another way.

<p class="key-point">The question isn't "where can we use AI?" It's "which of our tasks involve reading or writing language, can be checked, and happen often enough to matter?"</p>

## Sources

<ul class="sources">
  <li>Anthropic, <a href="https://docs.anthropic.com/">Claude documentation</a> and <a href="https://www.anthropic.com/pricing">pricing</a></li>
  <li>OpenAI, <a href="https://platform.openai.com/docs">API documentation</a> and <a href="https://openai.com/api/pricing/">pricing</a></li>
  <li>Google, <a href="https://ai.google.dev/gemini-api/docs">Gemini API documentation</a></li>
</ul>
