---
id: 20210124A
slug: /cookie_session_jwt
subject: Front End Gerneral Knowledge
title: 令牌御三家 - cookie, session, jwt
date: 2021-01-24T18:00:00.000Z
description: Server就像是戒備森嚴的銀行金庫一樣，不論你在這間銀行有沒有戶頭，走進去出示「號碼牌」、「令牌」總是免不了的。若要方便出入銀行，前端就該好好保管令牌，了解令牌究竟能儲存在什麼地方？
tags:
 - Front End Gerneral Knowledge
headerImage: "https://imgur.com/Xev1QnF.jpg"
templateKey: blog-post
---
> Photo by <a href="https://unsplash.com/@markusspiske?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Markus Spiske</a> on <a href="https://unsplash.com/s/photos/token?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Server就像是戒備森嚴的銀行金庫一樣，
不論你在這間銀行有沒有戶頭，走進去出示「號碼牌」、「令牌」總是免不了的。
而「令牌」這麼重要的東西，當然是由Server發放給你啊！
上面刻有身份ID，失效時間等資訊。
若要方便出入銀行，前端就該好好保管令牌，了解令牌究竟能儲存在什麼地方？

## Session

#### Client端與Server端來往的「一段區間」

Server要服務那麼多個Client，他要怎麼辨識「客戶A」跟「客戶B」其實是不同人呢?
這樣，Server才能為不同客戶量身打造他們感興趣的服務啊！

為此，早年瀏覽器巨頭們，提出了一個「概念」：Session！

Session這個字，翻得白話一點，就是「一段（做某事的）區間」; 翻得詩意一點，那就是「一期一會」。

![](https://i.imgur.com/STYiExE.png)

一開始，Session就像是禪宗一般，概念有那麼一點抽象：
* 每個 session 都有開始與結束
* 每個 session 都是相對短暫的
* 瀏覽器或伺服器任何一方都可以終止這個 session
* Session 蘊含了「**交換狀態資訊**」的概念在裡面

而最最重要的，就是第四點：「交換狀態與資訊」！

舉例來說，這個『區間』可以用來建立購物車的功能，在購買前可以知道使用者選了哪些物品，或者是雜誌瀏覽系統，從以前讀過的東西推薦可能喜歡的內容。

那麼如何「實作」這個概念呢？

瀏覽器巨頭們提議，大家要Server建立一個「Session物件」，這個物件專門紀錄每個客戶的生活習慣，當然，每個客戶都要有獨特的辨識ID。
![](https://i.imgur.com/4um1GYC.png)

那Client端又要如何保存sessionID呢？

巨頭說，不用擔心，我們已經想好了，我們會在瀏覽器的某個資料夾，專門存放response挾帶的sessionID。
![](https://i.imgur.com/biD7hIB.png)

於是，Cookie就誕生了！

## Cookie

在各大瀏覽器的某個資料夾下，都有個小小的儲存空間，叫cookie。
cookie比較重要的特性如下：

### * **以key-value的形式存取資料**

收到Client端的請求後，Server可以在response指定要設置cookie：「這位客人你的ID是＿＿，失效時間是＿＿。」
瀏覽器收到後，會在Response Headers看到：
```
Set-Cookie:my_cookie=IDisAABBLLRR; Path=/; Expires=Wed, 15 Mar 2020 15:59:59 GMT
```
接著，瀏覽器自己會把ID `my_cookie=IDisAABBLLRR` 保存在「cookie」這個空間中，保存到「失效時間」為止，一旦過期，這筆資料就會被瀏覽器刪掉。

在保存期限前，Client端網站每次對我們的Server發送request，瀏覽器都會自動夾帶通行ID`my_cookie=IDisAABBLLRR`，供Server辨識身份。

![](https://i.imgur.com/WbxCmWC.png)
![](https://i.imgur.com/uZPcURj.png)

若前端需要取得cookie中的通行ID，也可以透過`document.cookie`取得。
```javascript
console.log(document.cookie);
// my_cookie=IDisAABBLLRR
```

### * **儲存空間「極小」，最大只有4kb，只能儲存文字檔**

Cookie最初的用意就是存放「能辨識身份的資料」，讓瀏覽器幫你夾帶「辨識資料」與Server往來。
既然是每次都要隨身攜帶的東西，就必須輕便，最大只能放4kb，不能再多了！
通常Cookie放個辨識ID、帳號也就足夠了，其他訊息留在Server端就好。例如客戶的「偏好」、「瀏覽紀錄」等資訊存放在Server端即可，不必放在Cookie。

### * **前端網站部署的「網域」必須與Server是「同一個」**

前面提到，前端的網站對Server發送request時，瀏覽器都會幫你夾帶辨識ID，供Server辨識身份。
用腳指頭想想，我們的瀏覽器裡面，可能有好幾百個網站的「辨識ID」。它總不能讓A網站輕易拿到B網站的辨識ID，然後不斷騷擾B網站的Server吧！
因此，瀏覽器創立之初，就有「Same Origin Policy」。

那...什麼是Origin啊？
說到這個，就要來認識一下「網址」。
![](https://i.imgur.com/6YmzT9h.png)
最初的規則是，只要Host(domain)跟Path一致，就會被視為「Same Origin」，cookie就會被送出。

隨著駭客越來越厲害，各家瀏覽器也協議推出「安全擴充包」，讓工程師做更嚴格的設定。例如Secure屬性要求Protocol必須一致（https才可以，http不行），還有SameSite屬性（SameSite詳情可以看[程式猿吃香蕉](https://medium.com/%E7%A8%8B%E5%BC%8F%E7%8C%BF%E5%90%83%E9%A6%99%E8%95%89)寫的[再探同源政策 - 談 SameSite 設定對 Cookie 的影響與注意事項](https://medium.com/%E7%A8%8B%E5%BC%8F%E7%8C%BF%E5%90%83%E9%A6%99%E8%95%89/%E5%86%8D%E6%8E%A2%E5%90%8C%E6%BA%90%E6%94%BF%E7%AD%96-%E8%AB%87-samesite-%E8%A8%AD%E5%AE%9A%E5%B0%8D-cookie-%E7%9A%84%E5%BD%B1%E9%9F%BF%E8%88%87%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85-6195d10d4441)）等等。另外，Chrome和Safari也有比協議更「嚴格」的cookie存取條件。

但也因為「Same Origin Policy」，網站若要使用cookie，前端與後端，就非得部署在同一個domain不可。

如果前端部署的domain，跟後端部署的domain不同，例如前端部署在`https://myWebsite.com`，後端部署在`https://myServer.com`，瀏覽器是不會讓兩端用cookie夾帶ID的。

## JSON Web Token

隨著行動裝置的崛起，Server要服務的對象就不只是電腦瀏覽器了，還有手機App、手錶、智慧眼鏡（？）等等。

這些裝置，還有上萬個App公司，不可能像瀏覽器巨頭們可以坐下來談：「我們才幾家公司，就坐下來討論討論，cookie該怎麼做唄～」

此外，前端/後端部署的網域不同，也越來越普遍。

「Server該怎麼做，才能辨識不同來源的客戶，又兼具安全性呢？」軟體公司如此吶喊。

於是，JWT（JSON Web Token）為此而來！

JWT是由三個JSON Object所組成。Server會有一把secret-key絕密鑰匙，搭配演算法加密，將三個Object組成一個字串。如下圖：
![](https://i.imgur.com/nSeLuzP.png)

其中Payload在實務上可以存放`account（使用者帳號，或其他辨識ID）` `iat（簽發時間）` `exp（失效時間）`等欄位。要注意的是，不管你想放什麼，凡是送到client端的資訊，都不能是「機密」，別傻傻地以為亂數有加密，就要求後端把密碼放在這裡。

站在後端的角度，由於JWT的Payload可以存放部分資訊，它不必每次收到request，就去查資料庫/Redis「欸～這個通行ID是對應到哪一位客人啊？他是一般/珍珠/鑽石，還是黃金會員？」。Payload解鎖後，就可以看到：「客人帳號：OhMyGod。會員等級：黃金會員。」只有機密資訊，才需要再向資料庫查詢。
![](https://i.imgur.com/zPAb86Y.png)

### 後端向client傳送JWT

後端向client發送JWT的方式，大致可分成兩種：
1. 指定要存在瀏覽器的cookie裡面(較安全)
2. 放在response body裡面

如果前後端部署的domain相同，且client全是瀏覽器，可直接選擇方案1；反之，通常會選擇方案2。

### 前端儲存JWT的方式

Client端收到token之後，不同的裝置有不同的處理方式。由於我只熟悉瀏覽器前端，以下只談前端的處理方式。

前端收到response之後：

1. 如果server已指定要存在cookie裡面，那再好不過了，瀏覽器已經自動幫你存起來了。
2. 如果server是放在response body，你要自行選擇放在cookie或localstorage裡面。

#### A. 存在cookie
```javascript
const now = new Date();
const expireDate = now.setDate(now.getDate() + 7);

document.cookie = `name=${res.data.token};domain=xxx.com;expires=${expireDate};Secure`;
```

#### B. 存在localStorage

[localStorage](https://developer.mozilla.org/zh-TW/docs/Web/API/Window/localStorage)是繼cookie之後，瀏覽器們推出的新儲存空間。比起cookie只有4kb的儲存空間，localStorage更是有5MB的空間，目前主流瀏覽器都有支援，方便記錄顧客的使用習慣。不過要記得，任何敏感資料都不能儲存在前端。

以key-value的型式儲存。
```javascript
localStorage.setItem('your-key-to-set-token', res.data.token);
```
※ 註：可與[sessionStorage](https://developer.mozilla.org/zh-TW/docs/Web/API/Window/sessionStorage)一同做比較

### 前端如何傳送JWT給後端

接下來，前端要發送req到後端。在這裡，也會因為儲存位置的不同，有不同的處理方式。

#### A. 存在cookie

##### A-1. 前後端網域相同

這很單純，瀏覽器會自動幫你夾帶cookie的辨識ID，隨著request一起到Server。（註：若你選擇用ES6的`fetch()`來做HTTP Request，它**預設不會幫你帶cookie**，要自己額外設定）

##### A-2. 前後端網域不同

也行，但需要後端的配合。

以axios這款HTTP Request套件為例，只要在它的request config設定`withCredentials: true`，它就會將前端網域的cookie帶到後端。
```javascript
axios.get('your_url', {withCredentials: true}); // GET
axios.post('your_url', data, {withCredentials: true}); // POST
axios.put('your_url', data, {withCredentials: true}); // PUT
axios.delete('your_url', data, {withCredentials: true}); // DELETE
```
同時，後端也需要配合在response header添加`Access-Control-Allow-Credentials:true`的條件，並將前端的網域列在「允許跨域的白名單」當中。

#### B. 存在localstorage

取出方式一樣很簡單，`localStorage.getItem("your-key-to-get-token")`。
```javascript
localStorage.getItem('KEY');
```
關於request如何夾帶token，一定要先徵詢後端的意見。我的經驗是，可以把token放在request header裡面。以axios為例，axios可以在request config設定custom headers:
```javascript
const token = localStorage.getItem('KEY');

const customHeaders = {
    "token": token
};

const config = {
    // ...,
    headers: customHeaders
}

axios.get('your_url', config); // GET
axios.post('your_url', data, config); // POST
axios.put('your_url', data, config); // PUT
axios.delete('your_url', data, config); // DELETE
```
一開始提到，「Session」一開始的「精神」，是幫助後端辨識每一位獨特的客人。在我看來，JWT依舊秉持著這個精神，只是用更有效率的方式來服務客戶。

實務上，也有公司選擇「雙重認證」。例如，Server除了將sessionID存入cookie之外，還另外將JWT傳給前端，要求前端做任何request都要兩者一併戴上，類似身分證+健保卡雙證件的概念，以增加安全性。

本章為求簡單理解session, cookie和JSON web token，省略了資安相關的解說，例如使用cookie時要注意CSRF（Cross Site Request Forgery）和XSS（Cross Site Scripting）的問題。改天有空再補上吧！

## Reference

* [什麼是 Cookie？如何用 JS 讀取/修改 document.cookie?](https://shubo.io/cookies/) 作者 - [Shubo](https://shubo.io/)
* [網站安全 - 再探同源政策，談 SameSite 設定對 Cookie 的影響與注意事項](https://medium.com/%E7%A8%8B%E5%BC%8F%E7%8C%BF%E5%90%83%E9%A6%99%E8%95%89/%E5%86%8D%E6%8E%A2%E5%90%8C%E6%BA%90%E6%94%BF%E7%AD%96-%E8%AB%87-samesite-%E8%A8%AD%E5%AE%9A%E5%B0%8D-cookie-%E7%9A%84%E5%BD%B1%E9%9F%BF%E8%88%87%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85-6195d10d4441) 作者 - [Jayden Lin](https://jaydenlin.medium.com/)
* [Cookies - SameSite Attribute](https://ithelp.ithome.com.tw/articles/10251288) 作者 - [shizuku](https://ithelp.ithome.com.tw/users/20129636/ironman)
* [JWT(JSON Web Token) — 原理介紹](https://medium.com/%E4%BC%81%E9%B5%9D%E4%B9%9F%E6%87%82%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88/jwt-json-web-token-%E5%8E%9F%E7%90%86%E4%BB%8B%E7%B4%B9-74abfafad7ba) 作者 - [陳冠億 Kenny](https://medium.com/@kennychenblog)
* [Cookie & Session 是什麼?](https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-27-web-cookie-session-%E6%98%AF%E4%BB%80%E9%BA%BC-83f9747caf23) 作者 - [Schaos](https://schaos.medium.com/)
* [白話 Session 與 Cookie](https://hulitw.medium.com/session-and-cookie-15e47ed838bc) 作者 - [Huli](https://hulitw.medium.com/)