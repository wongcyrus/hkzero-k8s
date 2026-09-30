# Copyright Notice, Reverse Engineering Disclosure & Educational Fair Use Disclaimer
# 版權宣告、逆向工程說明與非商業性教學免責聲明

[English](#english) | [繁體中文](#繁體中文)

---

<a name="english"></a>
## English

### 1. Special Thanks & Highest Respect to the Original Author (Arthur)
First and foremost, we express our **deepest gratitude, highest respect, and heartfelt thanks to Arthur and the Hong Kong Zero team** for creating *Hong Kong Zero* (港域時空). 

Their incredible dedication to reconstructing the historic and modern districts of Hong Kong (Causeway Bay, Tsim Sha Tsui, Mong Kok) in 3D WebGL with such breathtaking realism is an outstanding achievement in independent browser game engineering and digital spatial preservation. Without Arthur's pioneering vision, meticulous craft, and technical creativity, this educational Kubernetes assessment experiment would never have been conceived or realized. 

**We wholeheartedly thank Arthur and urge every student, instructor, and developer to play, appreciate, and support the official original game at [hongkongzero.com](https://hongkongzero.com/).**

### 2. Original Work Attribution & Credits
The game assets, 3D street models, audio, textures, and client-side application logic included in this directory (`hkzero/`) are derived from **"Hong Kong Zero" (港域時空)**:
- **Official Website:** [https://hongkongzero.com/](https://hongkongzero.com/)
- **Original Author & Contributors:** Arthur and the Hong Kong Zero contributors.
- **Detailed Origin Documentation:** Preserved locally in [`SOURCES.md`](./SOURCES.md), [`credits.html`](./credits.html), and [`AUDIO-CREDITS.md`](./AUDIO-CREDITS.md).

All original artistic compositions, game narrative, and trademarks belong entirely to their respective original copyright holders.

### 3. Nature of this Project: Reverse Engineering & Interoperability Research
- **No Official Permission:** This project is an independent, unofficial technical experiment. **No express permission or commercial license has been obtained from the creators of Hong Kong Zero.**
- **Reverse Engineering Disclosure:** The client assets and runtime bundles were extracted and modified via client-side inspection, static asset retrieval, and runtime function hooking (reverse engineering) for the sole purpose of achieving software interoperability.
- **Interoperability Purpose:** The modifications hook specific client-side events (such as enemy defeats and item interactions) to an external WebSocket bridge to demonstrate real-time, event-triggered Kubernetes grading on AWS Serverless architecture. Under copyright law (e.g., U.S. 17 U.S.C. § 1201(f) and Hong Kong Copyright Ordinance Cap. 528 § 60/61), reverse engineering performed strictly to achieve interoperability between independent computer programs is recognized as a legitimate purpose.

### 4. Public Domain & Open Source Licensing Breakdown of Game Assets
A substantial majority of the underlying digital assets in *Hong Kong Zero* are published under public open data terms, public domain dedications, or permissive open-source licenses:

1. **3D Buildings & Urban Geometry (>95% of data size, ~1 GB):**
   - **Provider:** Lands Department of the Hong Kong Special Administrative Region Government (香港特別行政區政府地政總署).
   - **Dataset:** *3D Visualisation Map — Individualised Models*, downloaded via CSDI (Common Spatial Data Infrastructure / 空間數據共享平台) and [data.gov.hk](https://data.gov.hk/).
   - **Terms:** Public Open Data terms allowing public usage, adaptation, and redistribution with government source attribution.
2. **Road Networks, Street Outlines & Tram Tracks:**
   - **Source:** © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright).
   - **License:** Open Database License 1.0 ([ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/)), which expressly grants the right to adapt and redistribute derived spatial data.
3. **Character Meshes, Skeletal Rigs & Human Textures:**
   - **Source:** MakeHuman Community system assets.
   - **License:** Creative Commons CC0 1.0 Universal ([CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)) — Public Domain Dedication.
4. **Weapon & Vehicle 3D Models:**
   - First-person AK-47 & hands: `kursat_sokmen` via `three-fps`, licensed under Creative Commons Attribution 4.0 ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)).
   - First-person M4A1: 3DModelsCC0 via OpenGameArt, licensed under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/).
   - Vehicles, traffic lights, and street props (Mong Kok & TST): `businessyuen`, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
5. **Sound Effects & Audio Recordings:**
   - Firearm recordings (The Free Firearm Sound Library), impact SFX (`qubodup`), reload sounds (`SpringySpringo`), Kenney interface audio, and ambient city night soundscapes: all dedicated to the public domain under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/).
6. **Core Engines & Libraries:**
   - Three.js (MIT), three-mesh-bvh (MIT), meshoptimizer (MIT), qrcode-generator (MIT), inapp-spy (MIT).
7. **Original Creative Elements by Arthur / Hong Kong Zero Team:**
   - Narrative fiction, procedural level orchestration, story briefing illustrations, and Suno-generated BGM. These original works are used strictly under fair use principles, fully credited to the original author, and non-commercialized.

### 5. Non-Commercial & Educational Use (Fair Use)
This repository and its contents are strictly for:
- Non-commercial, non-profit academic research, pedagogy, and educational demonstration at the Hong Kong Institute of Information Technology (HKIIT / VTC).
- Demonstrating hands-on cloud and container orchestration competencies.
- **Zero Monetization:** This project contains no advertisements, monetization mechanisms, paywalls, or commercial exploitation of any kind.

This educational exploration is conducted under the principles of fair use and fair dealing for research and education (including Section 107 of the U.S. Copyright Act and Sections 38/41A of the Hong Kong Copyright Ordinance, Cap. 528).

### 6. Non-Affiliation & Non-Endorsement
This project is **not** affiliated with, endorsed by, sponsored by, or officially connected with Arthur, the creators of *Hong Kong Zero*, or any related entities. Please visit and support the official, authentic game at [hongkongzero.com](https://hongkongzero.com/).

### 7. Takedown Policy & Good-Faith Notice
We hold the utmost respect for independent game creators and copyright owners. If the original author, copyright holder, or rights administrator objects to the presence, reverse engineering, or educational hosting of these assets in this open-source repository:
- **Please contact us immediately** via a GitHub Issue or by emailing the project maintainer: `cyrus9988@yahoo.com.hk` / `wongcyrus@vtc.edu.hk`.
- **Commitment:** We will promptly take down, archive, or replace the relevant files upon receiving notice, without necessitating formal legal proceedings.

---

<a name="繁體中文"></a>
## 繁體中文

### 1. 特別鳴謝與向原創作者（Arthur 及團隊）致以崇高敬意
在闡釋任何法律與技術細節之前，我們謹此向《港域時空》（Hong Kong Zero）原創作者 **Arthur 以及開發團隊**致以**最由衷的感謝、崇高的敬意與全力支持**！

Arthur 與團隊憑藉卓越的工程造詣與無比熱忱，以 WebGL 3D 逼真且細緻地在瀏覽器中重塑了銅鑼灣、尖沙咀與旺角的香港街景，為本土獨立遊戲研發與數位空間保存立下了令人驚嘆的里程碑。若非 Arthur 開放而偉大的原創成果，本專案將 WebGL 3D 與雲端 Kubernetes 實作評測結合的教學研究將無從開展。

**我們深懷感恩，並在此強烈呼籲所有學生、教師與開發者前往並全力支持原作者的正版遊戲官方網站：[hongkongzero.com](https://hongkongzero.com/)。**

### 2. 原作版權與出處聲明
本目錄（`hkzero/`）所包含之遊戲資源、三維街區幾何模型、音效、貼圖與客戶端程式碼，均衍生自獨立三維網頁遊戲**《港域時空》（Hong Kong Zero）**：
- **官方網站：** [https://hongkongzero.com/](https://hongkongzero.com/)
- **原作作者與團隊：** Arthur 及《港域時空》原創開發團隊。
- **原始授權與出處紀錄：** 完整收錄於本目錄之 [`SOURCES.md`](./SOURCES.md)、[`credits.html`](./credits.html) 及 [`AUDIO-CREDITS.md`](./AUDIO-CREDITS.md)。

上述之原創故事、美術插圖、音樂及專用商標之知識產權與著作權，均完全歸原作者及原版權持有人所有。

### 3. 專案性質：逆向工程與系統互通性研究（Reverse Engineering）
- **未獲官方正式許可：** 本專案為獨立之學術與技術驗證專案，**事前並未取得《港域時空》原作者或版權方的正式授權或商業許可。**
- **逆向工程公開說明：** 本目錄之代碼與資源係透過瀏覽器客戶端檢視、公開靜態檔案下載與運行時函數攔截（Function Hooking）等技術手段逆向取得與改造。
- **互通性研究目的：** 改造目的僅在於實現技術互通性（Interoperability），將遊戲內部事件（如擊倒敵人、物資拾取）橋接至 AWS Serverless WebSocket 評測系統，驗證「以 3D 遊戲驅動即時 Kubernetes 實作評分」之創新教學可行性。依香港《版權條例》（第 528 章）第 60/61 條及國際版權法例，為實現獨立開發電腦程式間之「互通性」（Interoperability）而進行之必要還原工程屬合法權利保障範疇。

### 4. 遊戲底層素材之公開授權與公有領域清單
《港域時空》本身之龐大數據與素材，絕大部分係基於政府開放數據、公有領域（Public Domain）及開放授權協議（Open Licenses）構建：

1. **三維建築與地形實景模型（佔整體數據容量 95% 以上，逾 1 GB）：**
   - **提供者：** 香港特別行政區政府地政總署。
   - **資料集：** 三維可視化地圖（個別模型），經由空間數據共享平台（CSDI）及 [data.gov.hk](https://data.gov.hk/) 下載。
   - **條款：** 依政府開放數據條款，公眾與教育科研機構可自由下載、使用、改作與散布，並保留政府來源標示。
2. **道路網絡、建築輪廓與電車路軌：**
   - **來源：** © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright)。
   - **授權：** 開放數據庫授權協議（[ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/)），明確許可任何衍生數據庫之自由使用、改編與散布。
3. **角色三維網格、骨架與皮膚貼圖：**
   - **來源：** MakeHuman 開源社群系統素材。
   - **授權：** 創用 CC0 1.0 通用公有領域貢獻宣告（[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)），任何人均得自由利用。
4. **第一人稱武器與街道車輛模型：**
   - 第一人稱 AK47 及雙手：`kursat_sokmen`（經 `three-fps` 轉載），採 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（姓名標示）授權。
   - 第一人稱 M4A1：3DModelsCC0，採 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) 公有領域授權。
   - 旺角與尖沙咀之巴士、小巴、交通燈與街道物件：`businessyuen`，採 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 授權或作者贈與。
5. **音效與環境聲音素材：**
   - 槍械射擊聲（The Free Firearm Sound Library）、命中反饋音（`qubodup`）、換彈音效、Kenney 介面音效、城市夜間環境底噪（Freesound softwalls）：全部均以 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) 公有領域發布。
6. **核心程式庫與引擎：**
   - Three.js、three-mesh-bvh、meshoptimizer、qrcode-generator、inapp-spy 均遵循寛鬆的 [MIT License](https://opensource.org/licenses/MIT)。
7. **原創作者 Arthur 與港域時空團隊之原創著作物：**
   - 遊戲劇情設定、關卡流程腳本、三張劇情插圖及 Suno 生成之選單背景音樂。此部分我們全力保留出處、絕無商業使用，並嚴格遵循合理使用原則。

### 5. 非商業性質與教學合理使用（Fair Dealing / Fair Use）
本專案與代碼純屬：
- 香港資訊科技學院（HKIIT / VTC）與開源社群之**非商業性、非牟利之學術研究、教學展示與技術實驗**。
- 用於啟發學生學習雲端運算、容器化叢集管理（Kubernetes）之輔助教材。
- **絕無牟利：** 本專案不含任何廣告、不設收費機制、不接受贊助，絕無任何商業營利用途。

本項教學研究依據香港《版權條例》（第 528 章）第 38 條及第 41A 條關於研究與教學之「公平處理」（Fair Dealing）原則，以及國際通行之合理使用（Fair Use）準則進行。

### 6. 無官方關聯聲明（Non-Affiliation）
本專案為非官方（Unofficial）之教學複製品（Educational Clone），與《港域時空》原作者 Arthur、開發團隊或相關組織**無任何官方隸屬、合作、贊助或背書關係**。請大家前往官方正版網站體驗並支持原作：[hongkongzero.com](https://hongkongzero.com/)。

### 7. 善意下架條款與聯絡方式（Takedown Policy）
我們極度尊重獨立開發者的創作成果與版權權益。若《港域時空》原作者或任何合法版權持有人對本儲存庫引用、逆向或託管該遊戲素材持有異議：
- **請隨時與我們聯絡：** 可透過提交 GitHub Issue，或直接發送電郵至維護者信箱：`cyrus9988@yahoo.com.hk` / `wongcyrus@vtc.edu.hk`。
- **處理承諾：** 接獲通知後，我們將以最大誠意在第一時間立即下架、移除或替換相關爭議內容，毋須採取繁複之法律程序。
