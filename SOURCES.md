# 銅鑼灣實景重建資料

取得日期：2026-09-12。資料下載／更新日期不代表街景拍攝日期。

## 三維建築及地形

提供者：香港特別行政區政府地政總署。資料集：3D Visualisation Map — Individualised Models，經 CSDI 下載，圖幅 11-SW-10D、11-SW-15B、11-SW-15A。

- [地政總署三維地圖介紹](https://www.landsd.gov.hk/en/survey-mapping/mapping/3d-mapping.html)
- [政府資料集](https://data.gov.hk/en-data/dataset/hk-landsd-openmap-3d-visualisation-map-individualised-models/resource/96cc3afb-eb14-46c8-9926-6e6361157282)
- [CSDI API 及使用條款](https://portal.csdi.gov.hk/csdi-webpage/apidoc/3d-spatial-data-api)

來源 glTF、二進位幾何及原始紋理保存在 `assets/geodata`。透過 ZIP 分段下載，只取得所選建築及地形；下載時逐檔核對 ZIP CRC。政府資料的使用與發布須保留政府及來源標示。

## 道路及建築輪廓

© OpenStreetMap contributors，ODbL。2026-09-12 下載範圍：114.1800,22.2770,114.1868,22.2825。原始 XML 保存在 `assets/geodata/cwb-osm.xml`；投影結果是 `streets-local.json`，用作座標檢查、街區地圖及遊戲通路。衍生道路、建築、通路與高度資料以 ODbL 提供，隨發行版分發於 `osm-derived/causeway-bay-streets.json`。

[OpenStreetMap 著作權與授權](https://www.openstreetmap.org/copyright)

## 座標與修改

- 保留來源模型幾何及比例；EPSG:2326，香港測量座標。
- 本地原點 E837028.1201077923、N815728.6876098305；Blender X 向東、Y 向北、Z 向上，一單位一米。
- 水平座標平移至本地原點；來源高度基準保留。不能把模型海拔誤當樓高。
- 紋理按地標、背景及地形分級縮小；立面以來源模型為準。
- 雪、光線及材質濕潤程度屬虛構美術設計，不修改主要建築位置或外形。

## 已知限制

模型立面帶有拍攝時的行人、車輛、陰影及廣告；路面是地形影像貼圖，近看較模糊。資料不是即時街景。遊戲版本保留來源建築外觀，已辨認的店面行人及車輛由本專案局部移除（補繪背景依附近門面推測，並非實景查證），另加積雪、照明及六個路障；通路結合 OSM 道路與模型牆面，人物高度跟隨地形，射擊則直接檢查模型幾何。沒有商場室內、逐件可互動的街道家具或精細人行道階梯。

## 便服敵人與第一人稱武器（2026-09-13）

人物基礎網格、骨架、權重及服裝、皮膚、頭髮、眼睛、鞋素材來自 MakeHuman CC0 系統素材；本專案在 Blender 改製持槍姿勢、蒙皮及 Idle / Walk / Fire 動畫，手槍為專案模型。不是演員肖像或真人掃描。

- https://github.com/makehumancommunity/makehuman
- https://static.makehumancommunity.org/assets/assetpacks/makehuman_system_assets.html
- 發行包包含 MAKEHUMAN-LICENSE.md；來源保存在 blender/characters/source/。

第一人稱 AK47 與雙手：**Ak47 by kursat_sokmen**，CC BY 4.0，原作 https://skfb.ly/6UEL9 ，授權 https://creativecommons.org/licenses/by/4.0/ 。素材取得自 https://github.com/mohsenheydari/three-fps/tree/master/src/assets/guns/ak47 ，作者與授權依該 repo README 標示。修改：遊戲座標與比例、材質粗糙度、動畫播放速度及銜接、槍口效果；原 GLB 保存於 assets/weapons/ak47-source.glb。

參考 three-fps 的 Weapon.js 骨骼模型與 AnimationMixer 架構；遊戲整合程式由本專案撰寫。Three.js SkeletonUtils 依 Three.js MIT 授權，見 THREE-LICENSE.txt。

夜間路燈：94 支燈柱依 OSM 街道線及寬度程序化配置，屬遊戲照明設計，不代表香港實測街燈位置；照明採附近四個無陰影點光源。


## 2026-09-13 街道物件與虛構任務

新增 3 輛翻覆汽車、1 輛停駛雙層電車、8 個垃圾桶，均由 `src/street-props.js` 以 Three.js 幾何原創製作，沒有匯入第三方車輛模型或貼圖。電車路線、編號、車輛擺放及恐怖襲擊故事均為虛構，並非測繪或真實事件資料。固定模型合併材質批次、共用碰撞資料並以可見幾何進行子彈射線判定，沒有新增物理引擎。現有城市、角色、武器的來源與授權維持上述記錄。


### 電車外型重製參考（2026-09-13）

- [香港電車 Our Story](https://www.hktramways.com/en/our-story/)：實際檢視官方照片中的車頭、上下層車窗、低裙板、窄長比例與車頂集電桿。
- [運輸署 Annual Transport Digest 2025：Tramways](https://www.td.gov.hk/mini_site/atd/2025/en/section5-12.html)：1,067 mm 軌距及架空電線供電背景。

`src/hong-kong-tram.js` 是依照片辨識特徵製作的原創幾何，沒有複製照片作貼圖，也沒有下載車輛模型；綠色塗裝、120 編號與目的地牌是遊戲美術組合，不宣稱精確重建該車號。模型、路軌與接觸陰影合併後，全套 12 件街道物件共 56,056 個三角形、28 次繪製。


## 敘事插圖（2026-09-13）

本專案製作三張原創電影式雪夜插圖：`assets/illustrations/briefing-v1.jpg`（劇情介紹）、`victory-v1.jpg`（勝利）、`defeat-v1.jpg`（訊號中斷）。PNG 原圖保存在 `assets/illustrations/`。場景為銅鑼灣意象的虛構插畫，不是地理測繪或電影劇照；沒有使用真人肖像。三張 JPEG 合計約 1.44 MB，只用於 DOM 介面，不加入 WebGL 場景。


## 地圖電車路軌延伸（2026-09-13）

路軌由專案既有 `assets/geodata/cwb-osm.xml`／`blender/causeway-bay/streets-local.json` 的 `railway=tram` 節點取得，不以一般道路中心線推測。`scripts/build-tram-network.py` 轉換為與城市一致的 EPSG:2326 局部公尺座標，截取遊戲邊界內的 12 條 OSM way，合併連續線段後有 9 段分岔軌道，中心線共 1,164.65 米（雙向各軌分開計算，非街道里程），兩條鋼軌合計約 2,329.31 米。

資料：© OpenStreetMap contributors，ODbL，https://www.openstreetmap.org/copyright 。衍生座標與原 way ID 隨發行版分發於 `osm-derived/tram-network.mjs`。路網方向另參照香港電車官方路線圖：https://www.hktramways.com/images/googleMap/HK-tram-route-map-EB.pdf 。只延伸目前遊戲地圖內的實際軌道，不新增不存在的羅素街／利園山道路軌。

路軌使用 1.067 米軌距，鋼軌沿地形取樣，分岔保留 OSM 幾何；不是逐件鐵路道岔機構的工程模型。原創停駛電車共四輛，位置及朝向投影到來源軌道，編號 120、88、106、138 為虛構場景擺設，不代表實時車輛位置。全套街道物件與路軌約 143,436 三角形、31 次繪製，四車共用材質。

## 登入按鈕標誌（2026-09-28）

帳號功能的兩個登入按鈕（`src/account-ui.mjs`）各用一個官方標誌檔，由建置在檔案存在時一併發佈（`scripts/asset-variants.mjs` 的 `BRAND_LOGOS`）：

- `assets/brand/apple-logo.svg`：Apple 官方 Sign in with Apple 標誌檔「Left-aligned – Black – Medium」（白底黑色 Apple 標誌，31×44），取自 Apple Design Resources，按 Apple 的 Developer Artwork License 使用（Arthur 2026-09-28 同意條款）。檔案內容沒有任何改動；只用在遊戲介面內的「使用 Apple 登入」按鈕，表示支援以 Apple 登入，不單獨使用。
- `assets/brand/google-g.png`：Google 官方 Sign in with Google 品牌素材（`signin-assets.zip`）中的標準「G」標誌，裁成 88×88 PNG、白底，標誌的形狀與顏色沒有改動；只用在「使用 Google 帳戶登入」按鈕，按 Google 的 Sign in with Google branding guidelines 使用。

Apple 與 Google 的標誌和名稱是其擁有人的商標；兩家均未為本遊戲背書。授權條款全文與原始下載檔保存在 repo 以外（`~/Projects/From Zero-assets/brand-signin/`）。
