# Hong Kong Zero (Kubernetes Grader Client - Educational Clone)

> **⚠️ IMPORTANT LEGAL & COPYRIGHT NOTICE / 重要版權與免責聲明**  
> This project is an **unofficial, reverse-engineered educational clone** of [Hong Kong Zero (港域時空)](https://hongkongzero.com/) developed for non-commercial academic research and Kubernetes pedagogy. **No official permission was obtained from the original creators.**  
> All rights and original assets belong to the authors of Hong Kong Zero.  
> Please read the full [DISCLAIMER.md](./DISCLAIMER.md) for attribution, fair use declarations, and takedown policy.

---

## Overview

This directory contains a modified client of **Hong Kong Zero** adapted to serve as an interactive, real-time exercise client for the `k8s-game-platform`.

In this gamified learning setup:
- Students play in a 3D browser environment (Causeway Bay / SOGO).
- Defeating enemies (`window.onMonsterKilled`) or collecting tactical items (`window.onItemPickedUp`) pauses the game loop and triggers an automated Kubernetes check via AWS Serverless WebSockets.
- If the student's Kubernetes cluster is correctly configured (e.g., Pods running, namespaces created, services exposed), the assessment passes and allows the student to continue their mission.

## Key Files Added for Kubernetes Integration

- [`k8s-bridge.js`](./k8s-bridge.js): Manages WebSocket connection to AWS API Gateway, handles pause/resume hooks, resolves student API Keys, and reports grading status.
- [`k8s-overlay.css`](./k8s-overlay.css): Cyberpunk-style tactical overlay showing cluster evaluation state (Running, Passed, Failed).
- [`DISCLAIMER.md`](./DISCLAIMER.md): Complete bilingual copyright, fair use, and non-affiliation notice.
