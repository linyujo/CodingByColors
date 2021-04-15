---
id: 20210219A
slug: /ssr_csr
subject: Front End Gerneral Knowledge
title: From SSR to CSR to SSR Again
date: 2021-02-19T18:00:00.000Z
description: 在PHP/JSP/ASP大行其道的年代，Server Side Render是業界主流。到了Ajax以及前端框架的興起，潮流工程師紛紛稱頌起Single Page Application及Client Side Render的好處。又過了一兩年，B2C產業群起倡議SSR的重要性。究竟是什麼原因，推著碼農在浪潮中兜兜轉轉呢？
tags:
 - Front End Gerneral Knowledge
headerImage: "https://imgur.com/m5Gvq7u.jpg"
templateKey: blog-post
---
>Photo by <a href="https://unsplash.com/@zoltantasi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Zoltan Tasi</a> on <a href="https://unsplash.com/s/photos/wheel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

在3P（PHP/JSP/ASP）大行其道的年代，Server Side Render（以下簡稱SSR）是業界主流。
到了Ajax以及前端框架的興起，潮流工程師紛紛稱頌起Single Page Application（以下簡稱SPA）及Client Side Render(以下簡稱CSR)的好處。
又過了一兩年，B2C（Business To Customer）產業群起倡議SSR的重要性。
究竟是什麼原因，推著碼農在浪潮中兜兜轉轉呢？
讓我們繼續看下去～

## Server Side Render(SSR)

剛接觸前端領域時，學的是JSP（Java Server Pages）。用Java把邏輯寫好，放進HTML中。
簡單範例如下：
![](https://i.imgur.com/L8IcTer.png)

```jsp
<h4>Personal Information</h4>
<ul>
  <li>
    <p>
      <b>First Name:</b><%= request.getParameter("first_name")%>
    </p>
  </li>
  <li>
    <p>
      <b>Last  Name:</b><%= request.getParameter("last_name")%>
    </p>
  </li>
</ul>
```
原理是Java把頁面所需的資料先在後端查詢/運算/編譯之後，塞進HTML，並將整個文件傳給前端。
而不涉及後端處理的互動，則交給JavaScript（JQuery）。
![](https://i.imgur.com/17AG09x.png)
整頁檔案會充滿HTML/Java/JQuery/CSS，俗稱「義大利麵程式碼」。只要有任何改動，都要在一頁「好幾百行」程式碼當中來回尋找，小心翼翼地修改程式碼。

## Single Page Application(SPA)

隨著服務越來越複雜，傳統SSR的缺點也逐漸浮現。
1. Server業務繁重，除了CRUD（Create/Read/Update/Delete）之外，還要產生HTML。如果流量變大，還有「請求分流」，「負載平衡」的工作要處理。
2. 每次換路徑（router），瀏覽器都要「從頭到腳」重新render。但有可能除了內文之外，Header/Nav/Footer都一模一樣啊。

與此同時，一般用戶的個人電腦/筆電也越來越強大。
Google透過Gmail展示了Ajax（Asynchronous Request非同步請求）技術好棒棒。
透過Ajax，網站換頁時僅需「部分更新」，不必「從頭到腳」重新渲染，讀取內容的速度也越來越快。
這種「如手機app一般滑順」的追求隨即成為前端的時尚，Single Page Application(SPA)即是這種追求的代名詞。
![](https://i.imgur.com/H7BZ7U5.png)

既然Client的電腦那麼強大，產生HTML/管理網站路徑(router)的工作就交給Client去處理吧！
這下子，前端JavaScript的工作量增加了，一頁「好幾百行」「義大利麵」的code依舊困擾著前端開發者。
「那就把MVC的架構搬到前端吧！」

### 前端框架與SPA的誕生

不論是Angular, React(含其生態系可視為一個框架)還是Vue，都以各自的方式來架構前端MVC。
![](https://i.imgur.com/Ie5q1Wp.png)

由Client端負責管理router，處理較輕量的業務邏輯，最後在Client端組成畫面（Client Side Render）。與Server之間只需透過API傳遞資料，還可以將資料暫存在前端Modal，減少不必要的request。

至此，前端程式碼能以MVC的方式做切割，View的部分也能再拆分成更小的元件。「義大利麵」在江湖上顯著下降，各路碼農額手稱慶，可喜可賀！可喜可賀！

### CSR的缺點

然而，電商網站紛紛導入前端框架後，發現了「不利營收」的痛點：「SEO慘不忍睹」。
CSR（Client Side Render）網站在瀏覽器初始載入「第一個畫面」時，body和head幾乎為空，而各大瀏覽器的爬蟲卻是在載入時抓取網站內容，這點對電商網站極為不利。

(其實強大的Google很快就改善了爬蟲的機制，但當時其他瀏覽器並未即時跟上)

## Isomorphic JavaScript

小孩子才做選擇，大人會想辦法「我全都要！」
![](https://truth.bahamut.com.tw/s01/201906/75db13526fab43ae36c22474fd73d489.JPG?w=320)

SEO問題發生在載入的「第一個畫面」。既然如此，Server只要負責回傳「第一個畫面」，剩下的頁面就交給前端自己處理。這不就皆大歡喜了嗎？

### Indigenous SSR Method

以下是我在各大框架推出自己的SSR解決方案前，「土法煉鋼」的SSR作法（React + Redux）。
![](https://i.imgur.com/JYtE1IF.png)

##### 1. 建立一個NodeJS層
Express或koa都屬於輕量級的NodeJS框架。

##### 2. NodeJS層的Route接前端的第一個請求
```javascript
app.use("/", universalLoader)
```

##### 3. 讀取前端build好的HTML
```javascript
fs.readFile(builtHTML, "utf8", async() => {
    
})
```

##### 4. 建立一個NodeJS層的Store(Redux Store)，並向API Server請求第一頁所需的Data
```javascript
const postList = await fetchInitPostList();
initialState.postList = postList;

const store = createStore(rootReducer, initialState, enhancers);
```

##### 5. 打包網頁的head和body
```jsx
const routeMarkup = renderToString(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route component={App} />
        </ConnectedRouter>
    </Provider>,
);

const html = prepHTML(htmlData, {
    html: helmet.htmlAttributes.toString(),
    head: 
        helmet.title.toString() + 
        helmet.meta.toString() + 
        helmet.link.toString(),
    body: routeMarkup,
    initState: store.getState(),
});
```

##### 6. HTML預留script儲存initialState
```html
<script>
window.__PRELOADED_STATE__ = INIT_STATE;
</script>
```

##### 7. NodeJS層回傳HTML
```javascript
res.status(200).send(html);
```
當年（其實也才2年前而已）最麻煩的是，要用各種「奇技淫巧」的套件來建立NodeJS層的Redux Store和HTML markup。Component也要特別注意是否使用到`window`, `browser`等瀏覽器才有的物件，否則SSR必定跳錯！專案的複雜度完全提高了一個層級。

如今React有了Next.js統一SSR天下，Vue家族也有了Nuxt.js。各路碼農都能用「一致」的工具來製作SSR。至此，前端的江湖是否能有片刻的喘息呢？

## SSR框架的誕生
由於我跟React生態系比較熟悉，就以Next.js來說明，SSR框架的方便之處。

### 1. 配備Router
Next.js對`/pages`這個資料夾有特殊的設定，在`/pages`底下的js檔，都會被視為一個網站「路徑」。
例如在`/pages`資料夾底下建立一個`about.js`，它的網址就是`/about`。

![](https://i.imgur.com/h2im6Ql.png)

如果不是固定網址，而是由id生成的網址，例如`/:storeID/:productID`，在`/pages`底下的js檔也可以進一步設定。詳情可見[Next.js官方文檔](https://nextjs.org/docs/routing/dynamic-routes)範例，設定非常簡單。

以往用Express(Node.js套件)實作SSR的時候，不僅要維護client端的`react-router`，還要維護Server端的`express.Router`。如果Server要做到Code Splitting那就更加複雜了。

現在Next.js幫你省去維護兩端Router的問題，網站路徑統一在`/pages`底下管理，著實省下非常多功夫。

### 2. 所有元件預設為SSR
Next.js在背後進行了封裝，除非有特別指定哪些頁面/元件一定要Client端渲染，不然只要是`/pages`路徑底下的頁面，預設都是SSR。而且它神奇的地方是，撰寫過程中幾乎感受不到node.js的存在，大大降低架構SSR的門檻。

SSR當中最重要的，莫過於為了讓爬蟲能爬到網頁資料，Server必須先拿到頁面所需的Data，再把網頁回傳到client端。以購物網站為例，Server必須先拿到商品資料，再把網頁傳到前端，讓爬蟲能爬到商品資訊，增加網頁在搜尋引擎出現的曝光率。

為此，以Next.js來說，凡是在`/pages`資料夾底下的js檔，都可以使用`getInitialProps`的方法在Server端先打API資料，fetch回來的資料會以props的型式供Component使用。

Functional Component:
![](https://i.imgur.com/Vf25OUB.png)

Class Component:
![](https://i.imgur.com/ZQdtLw4.png)


※ 在Next.js 9.3以上的版本，官方建議使用新的API`getStaticProps`或`getServerSideProps`，來取代`getInitialProps`。以下是三者的比較：

* `getServerSideProps`：收到一頁（route）請求（request）的時候，會在Server端執行這個函式。通常用在需要即時查詢資料庫的元件，例如商品售價、剩下多少庫存等情境，有利於SEO，讓比價網站能爬到最新的價格。
* `getStaticProps`：（某種程度上）只在`next build`的階段執行一次。通常用在不需要頻繁更新的內容，例如部落格文章、不常更新的商品目錄等情境。`getStaticProps`的優點是，它會把頁面build成一個靜態檔案（如github page），能即時回傳Client端，網頁載入速度較快。
* `getInitialProps`：不論是在Server端或是Client端，只要載入該頁面都會各執行一次，在Server端甚至會早於`getServerSideProps`。自從9.3版本推出`getServerSideProps`以及`getStaticProps`之後，官方並不鼓勵使用這個方法。比較可能的使用情境是，Client端和Server端需要互相傳遞資料，例如某些頁面需要token或權限才能瀏覽。

### 3. 幫你做到Code Splitting

這裡的Code Splitting（拆分程式碼），指的是「以Route（網站路徑）」來做拆分。目的是減少所需載入的程式碼，以縮短網頁載入的時間。

當使用者進入網站的其中一個路徑時，Next.js只會載入這個路徑所需用到的module、components，加快網頁載入的速度。

如果SSR沒有做到Code Splitting，Server在收到請求的路徑時，會把整個網站所需的css、js、以及第三方dependencies「一口氣」傳輸到Client端，造成Client端在「第一次」載入時需要等待較長的時間。

### 4. 簡單的lazy-load

網頁當中，可能有部分的區域是使用者「不一定」會打開的。例如，某個彈出視窗需要點擊某個button才會出現，或者是某些對話框，需要滑鼠hover才會顯示。

為了加快網頁的載入速度，這種「不一定」會顯示的區域，可以等到使用者確定要看的時候再開始下載。這種技術稱為lazy-load。

「等需要時再請Server提供」的lazy-load，自己實作的門檻是比較高的。所幸Next.js有提供`dynamic`這個的工具，使用起來不僅簡單，可讀性也高。

```jsx
import dynamic from "next/dynamic";

const Modal = dynamic(import("../components/Modal"));

const Page = () => {
	const [isShowModal, setIsShowModal] = useEffect(false); 
	function toggleModal(){
		setIsShowModal(!isShowModal);
	}
	return (
		// ...
		<button onClick={toggleModal}></button>
		<Modal isShow={isShowModal} />
	)
}
```
以上是我對Next.js比較有感覺的部分，時至今日它還在不斷更新。

目前，前端御三家都已有成熟的工具來實作SSR。Angular在爸爸Google的維護之下，已補足SSR的功能，而Vue也有了Nuxt.js。

## 本章總結

1. 十幾年前，網站都是由後端負責處理資料和畫面。不論是Java生態系（JSP）、.NET生態系，或是PHP皆是如此。
2. 隨著一般用戶的電腦越來越強大、Server業務日趨繁重、網站設計追求使用者體驗等浪潮之下，前端開始朝向Single Page Application的趨勢發展。
4. Single Page Application使得前端JavaScript越來越複雜、不易維護。於是將MVC的概念搬到前端，前端框架因此誕生。
5. 前端框架一開始以Client Side Render為主，不利於在搜尋引擎曝光（SEO）。而以Node.js搭配前端框架來做SSR，則會讓整個專案的維護成本大幅提高。前端御三家的生態系開始研發SSR框架。
6. React(Next)、Vue(Nuxt)、Angular都逐漸有了統一的工具來實作SSR。都具備Router、Code Splitting、元件lazy-load的整合方案