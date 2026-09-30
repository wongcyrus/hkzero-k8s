# Copyright Notice, Reverse Engineering Disclosure & Educational Fair Use Disclaimer
# 版權宣告、逆向工程說明與非商業性教學免責聲明

[English](#english) | [繁體中文](#繁體中文)

---

<a name="english"></a>
## English

### 1. Original Work Attribution & Credits
The game assets, 3D street models, audio, textures, and client-side application logic included in this directory (`hkzero/`) are derived from **"Hong Kong Zero" (港域時空)**, accessible publicly at:
- **Official Website:** [https://hongkongzero.com/](https://hongkongzero.com/)
- **Original Authors & Contributors:** Arthur and the Hong Kong Zero contributors.
- **Underlying Open Data:** CSDI (Common Spatial Data Infrastructure, Lands Department of HKSAR Government) and OpenStreetMap contributors (ODbL).

All intellectual property rights, trademarks, copyrights, and original artistic/technical assets belong entirely to their respective original copyright holders.

### 2. Nature of this Project: Reverse Engineering & Interoperability Research
- **No Official Permission:** This project is an independent, unofficial technical experiment. **No express permission or commercial license has been obtained from the creators of Hong Kong Zero.**
- **Reverse Engineering Disclosure:** The client assets and runtime bundles were extracted and modified via client-side inspection, static asset retrieval, and runtime function hooking (reverse engineering) for the sole purpose of achieving software interoperability.
- **Interoperability Purpose:** The modifications hook specific client-side events (such as enemy defeats and item interactions) to an external WebSocket bridge to demonstrate real-time, event-triggered Kubernetes grading on AWS Serverless architecture.

### 3. Non-Commercial & Educational Use (Fair Use)
This repository and its contents are strictly for:
- Non-commercial, non-profit academic research, pedagogy, and educational demonstration at the Hong Kong Institute of Information Technology (HKIIT / VTC).
- Demonstrating hands-on cloud and container orchestration competencies.
- **Zero Monetization:** This project contains no advertisements, monetization mechanisms, paywalls, or commercial exploitation of any kind.

This educational exploration is conducted under the principles of fair use and fair dealing for research and education (including Section 107 of the U.S. Copyright Act and Sections 38/41A of the Hong Kong Copyright Ordinance, Cap. 528).

### 4. Non-Affiliation & Non-Endorsement
This project is **not** affiliated with, endorsed by, sponsored by, or officially connected with the creators of *Hong Kong Zero* or any related entities. Please visit and support the official, authentic game at [hongkongzero.com](https://hongkongzero.com/).

### 5. Takedown Policy & Good-Faith Notice
We hold the utmost respect for independent game creators and copyright owners. If the original author, copyright holder, or rights administrator objects to the presence, reverse engineering, or educational hosting of these assets in this open-source repository:
- **Please contact us immediately** via a GitHub Issue or by emailing the project maintainer: `cyrus9988@yahoo.com.hk` / `wongcyrus@vtc.edu.hk`.
- **Commitment:** We will promptly take down, archive, or replace the relevant files upon receiving notice, without necessitating formal legal proceedings.

---

<a name="繁體中文"></a>
## 繁體中文

### 1. 原作版權與出處聲明
本目錄（`hkzero/`）所包含之遊戲資源、三維街區幾何模型、音效、貼圖與客戶端程式碼，均衍生自獨立三維網頁遊戲**《港域時空》（Hong Kong Zero）**：
- **官方網站：** [https://hongkongzero.com/](https://hongkongzero.com/)
- **原作作者與團隊：** Arthur 及《港域時空》原創開發團隊。
- **基礎開放資料：** 香港特別行政區政府地政總署空間數據共享平台（CSDI）及 OpenStreetMap contributors（ODbL）。

上述所有之原創遊戲資產、美術貼圖、聲音、三維模型及商標之知識產權與著作權，均完全歸原作者及原版權持有人所有。

### 2. 專案性質：逆向工程與系統互通性研究（Reverse Engineering）
- **未獲官方正式許可：** 本專案為獨立之學術與技術驗證專案，**事前並未取得《港域時空》原作者或版權方的正式授權或商業許可。**
- **逆向工程公開說明：** 本目錄之代碼與資源係透過瀏覽器客戶端檢視、公開靜態檔案下載與運行時函數攔截（Function Hooking）等技術手段逆向取得與改造。
- **互通性研究目的：** 改造目的僅在於實現技術互通性（Interoperability），將遊戲內部事件（如擊倒敵人、物資拾取）橋接至 AWS Serverless WebSocket 評測系統，驗證「以 3D 遊戲驅動即時 Kubernetes 實作評分」之創新教學可行性。

### 3. 非商業性質與教學合理使用（Fair Dealing / Fair Use）
本專案與代碼純屬：
- 香港資訊科技學院（HKIIT / VTC）與開源社群之**非商業性、非牟利之學術研究、教學展示與技術實驗**。
- 用於啟發學生學習雲端運算、容器化叢集管理（Kubernetes）之輔助教材。
- **絕無牟利：** 本專案不含任何廣告、不設收費機制、不接受贊助，絕無任何商業營利用途。

本項教學研究依據香港《版權條例》（第 528 章）第 38 條及第 41A 條關於研究與教學之「公平處理」（Fair Dealing）原則，以及國際通行之合理使用（Fair Use）準則進行。

### 4. 無官方關聯聲明（Non-Affiliation）
本專案為非官方（Unofficial）之教學示範，與《港域時空》原作者、開發團隊或相關組織**無任何官方隸屬、合作、贊助或背書關係**。請大家前往官方正版網站體驗並支持原作：[hongkongzero.com](https://hongkongzero.com/)。

### 5. 善意下架條款與聯絡方式（Takedown Policy）
我們極度尊重獨立開發者的創作成果與版權權益。若《港域時空》原作者或任何合法版權持有人對本儲存庫引用、逆向或託管該遊戲素材持有異議：
- **請隨時與我們聯絡：** 可透過提交 GitHub Issue，或直接發送電郵至維護者信箱：`cyrus9988@yahoo.com.hk` / `wongcyrus@vtc.edu.hk`。
- **處理承諾：** 接獲通知後，我們將以最大誠意在第一時間立即下架、移除或替換相關爭議內容，毋須採取繁複之法律程序。
