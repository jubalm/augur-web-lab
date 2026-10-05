---
title: "Why disagreement makes an oracle stronger"
description: "How bonds and open challenges reward honest reporting."
publishedAt: "2026-09-24"
category: "Research"
cover: "bonds"
readingMinutes: 5
placeholder: true
needsReview: true
source: "Figma 222:181 and 257:952; approved brief section 7."
---

Most systems treat disagreement as a failure. An oracle that settles real money should expect it. Augur Lituus is designed so that any answer can be challenged, and so that defending a wrong answer gets more expensive with every round.

## One voice is a single point of failure

Smart contracts can’t see the world. Something has to tell them what happened, and whoever decides controls the money that depends on the answer. If that is one company, one committee or one multisig, the contract is only as honest as they are.

## Anyone can answer, anyone can challenge

A reporter proposes an outcome and locks REP as a bond: a stake they can lose. The first answer is tentative, with time for others to check it. Anyone who disagrees can back a different outcome with a larger bond, and a completed challenge opens another appeal period.

## Each challenge raises the stakes

Every challenge doubles the bond. A dispute that opens at 15 REP reaches 120 REP after three challenges, so it only continues while someone is willing to put more at stake on being right.

<figure class="bond-figure">
<div class="bond-chart" role="img" aria-label="Each challenge doubles the bond: report 15 REP, first challenge 30 REP, second challenge 60 REP, third challenge 120 REP.">
<div class="bar-group"><div class="bar-space"><span class="bar first" style="--height:28px"></span></div><strong>15 REP</strong><span>Report · YES</span></div>
<div class="bar-group"><div class="bar-space"><span class="bar" style="--height:56px"></span></div><strong>30 REP</strong><span>Challenge · NO</span></div>
<div class="bar-group"><div class="bar-space"><span class="bar" style="--height:112px"></span></div><strong>60 REP</strong><span>Challenge 2 · YES</span></div>
<div class="bar-group"><div class="bar-space"><span class="bar" style="--height:224px"></span></div><strong>120 REP</strong><span>Challenge 3 · NO</span></div>
</div>
<figcaption>Figure 1. Each challenge doubles the bond: 15, 30, 60, then 120 REP.</figcaption>
</figure>

> Lying is designed to cost more than it pays.

## What this means for an app

An application that settles on an Augur Lituus answer gets three properties from this design:

- No committee, multisig or veto decides the answer.
- Every answer is checked in public, under the same rules for everyone.
- When an appeal period ends without a new challenge, the latest outcome becomes final.

## The last resort: a fork

If a dispute keeps escalating past a set threshold, it leaves the ordinary rounds and goes to a fork, the protocol’s last resort for the hardest questions. Forks are slow and costly by design, so ordinary disputes are meant to end long before one begins.
