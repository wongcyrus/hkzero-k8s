# Hong Kong Zero (Kubernetes Grader Client - Educational Clone)

> **💖 SPECIAL THANKS TO THE ORIGINAL AUTHOR (Arthur) / 特別鳴謝原創作者**  
> We express our deepest gratitude and highest respect to **Arthur and the Hong Kong Zero team** for creating [Hong Kong Zero (港域時空)](https://hongkongzero.com/). Their brilliant 3D WebGL reconstruction of Hong Kong is a groundbreaking achievement in independent web gaming. We urge everyone to play and support the official original game at [hongkongzero.com](https://hongkongzero.com/)!
> 
> **⚠️ IMPORTANT LEGAL & COPYRIGHT NOTICE / 重要版權與免責聲明**  
> This project is an **educational clone** developed for non-commercial academic research and Kubernetes pedagogy. The maintainer reports permission to republish this adaptation; it is not an official game or endorsement.
> All rights and original assets belong to the authors of Hong Kong Zero.  
> Please read the full [DISCLAIMER.md](./DISCLAIMER.md) for attribution, fair use declarations, and takedown policy.

---

## Demo

[![Watch the Hong Kong Zero Kubernetes demo](https://img.youtube.com/vi/aTRtn5GXCFo/hqdefault.jpg)](https://youtu.be/aTRtn5GXCFo)

## Overview

This directory contains a modified client of **Hong Kong Zero** adapted to serve as an interactive, real-time exercise client for the `k8s-game-platform`.

**Original game and creative work:** Arthur and the Hong Kong Zero team, [hongkongzero.com](https://hongkongzero.com/). This Kubernetes integration is an independent educational adaptation, not the official game and not endorsed by its creators. See [credits.html](./credits.html) and [SOURCES.md](./SOURCES.md) for third-party asset credits.

In this gamified learning setup:
- Students play in a 3D browser environment (Causeway Bay / SOGO).
- Defeating enemies (`window.onMonsterKilled`) or collecting tactical items (`window.onItemPickedUp`) pauses the game loop and triggers an automated Kubernetes check via AWS Serverless WebSockets.
- If the student's Kubernetes cluster is correctly configured (e.g., Pods running, namespaces created, services exposed), the assessment passes and allows the student to continue their mission.

## Key Files Added for Kubernetes Integration

- [`k8s-bridge.js`](./k8s-bridge.js): Manages WebSocket connection to AWS API Gateway, handles pause/resume hooks, resolves student API Keys, and reports grading status.
- [`k8s-overlay.css`](./k8s-overlay.css): Cyberpunk-style tactical overlay showing cluster evaluation state (Running, Passed, Failed).
- [`DISCLAIMER.md`](./DISCLAIMER.md): Complete bilingual copyright, fair use, and non-affiliation notice.

The landing page displays the supplied HKIIT and IT114115 logos and a locally hosted [Kubernetes logo](https://github.com/kubernetes/kubernetes/blob/master/logo/logo.svg). The Kubernetes logo is available under [Apache-2.0 or CC-BY-4.0](https://github.com/kubernetes/kubernetes/blob/master/logo/LICENSE); its use does not imply Kubernetes project endorsement.
