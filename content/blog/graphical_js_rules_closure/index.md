---
id: 20210601A
slug: /graphical_js_rules_closure
subject: JavaScript
title: 圖解JavaScript規則 - 閉包
date: 2021-06-01T17:00:00.000Z
description: 為什麼面試一定要知道什麼是閉包？閉包實際上到底有什麼用途，能吃嗎？
tags:
 - JavaScript
headerImage: "https://imgur.com/rbukUWL.jpg"
templateKey: blog-post
---
Photo by <a href="https://unsplash.com/@michalmatlon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Michal Matlon</a> on <a href="https://unsplash.com/s/photos/pipes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

<br />
<br />

這一系列其實是為了`閉包`這個主題而生的。要先理解`作用域`、`作用域鏈`，才能進一步認識閉包；而要理解`作用域`，就需要認識`詞彙環境（Lexical Environment）`的架構。前面花了兩個篇幅建立基本知識，現在終於可以進入正題了。

既然前兩篇圖解了`執行環境`、`作用域`、`作用域鏈`之間的關係，本篇會著重在`作用域鏈`與閉包的關係。建議先看過前篇再往下閱讀，因為本篇不會深入解釋作用域鏈。

## 執行環境 Execution Context

JavaScript底層要執行的時候，第一步會先建立一個「執行環境」（Execution Context）。

執行環境內部有許多物件，其中最重要的是「詞彙環境」Lexical Environment（也有翻譯成「詞法環境」）。
詞彙環境主要儲存了：

1. <span style="background-color:#99ccff">全域物件，在有瀏覽器的環境下，指的是window內的物件</span>
2. <span style="background-color:#b1ddf0">登記這個環境所宣告的變數和function(函式)</span>
3. <span style="background-color:#fdf2cc">外部環境，也就是Scope Chain，台灣多半翻譯成「作用域（鏈）」，中國則翻譯成「範疇」</span>
4. <span style="background-color:#F6CECE">這個環境的"this"是什麼</span>

![](https://i.imgur.com/0Eaqo1D.png)

## 作用域鏈

作用域「鏈」，指的是「除了我當下的的<span style="background-color:#b1ddf0">Declarative Environment Record</span>，還可以去哪裏找變數？」

<span style="background-color:#fdf2cc">外部環境（Outer Envirnment）</span>會標記可以查訪的Lexical Environment。假設有一條隱形的線將所有可查訪的Lexical Environment串起來，這條線可視為「尋找變數的搜索鏈」，即作用域「鏈」。
![](https://i.imgur.com/c7UAXtQ.png)

## Closure閉包

閉包的定義可分為「廣義」及「狹義」。由於個人對實作的部分比較感興趣，本篇的焦點先會放在「狹義」的定義上，再討論實務上閉包有哪些使用情境。不過先從廣義閉包來做個小小的開場吧！

### 廣義 - 所有的函式都是閉包

從學理的角度，作用域鏈的機制，就是閉包。

MDN社群的文件寫道：

> A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

閉包是function本身，與這個function被宣告時所在的環境（詞彙環境 the lexical environment）之間的連結。換句話說，在function內部，可以透過閉包存取這個function之外的作用域當中的變數。在JavaScript這個語言，每宣告一個function，閉包就隨之而成。

說白話點，每建立一個function，function與其父層就會形成作用域鏈，作用域鏈就是閉包。

不過，面試之所以重視閉包，是因為JS作用域鏈的機制，在實務上能打造更好維護、能重複使用的工具。小至專案的utils，大至前端框架，都有閉包的身影。

從實作的角度，會更關注在大家常見的：function裡面包了另一個function，內層function return出去後，即便離開了外層function，內層function仍然能存取外層function所宣告的變數。

### 狹義 - return出去的inner function保存outer function的環境

一般的function執行完畢時，其佔據的記憶體就會被釋放。但有一個例外：若與其它尚在存活的function形成作用域鏈，其佔據的記憶體就不會被清除。

以下是一個解說型的範例，解說程式執行時，執行環境、作用域鏈與閉包三者之間的關係。

#### 解說範例 - 銀行戶頭
```javascript
function openAccount(x){
  let money = x;
  
  function deposit(n){
    money = x + n;
    console.log(`account balance: ${money}`);
  }
  
  function withdraw(n){
    money = money - n;
    console.log(`account balance: ${money}`);
    return n;
  }
  
  return {
    deposit: deposit,
    withdraw: withdraw
  }
}

const myAccount = openAccount(1000);
myAccount.deposit(100);
myAccount.withdraw(200);
```
全域執行環境開始執行後，首先來到第21行，準備`openAccount(1000)`的執行環境。待`openAccount(1000)`執行完畢後，會將執行結果賦值給`myAccount`，因此圖示先簡稱為`myAccount執行環境`。
![](https://i.imgur.com/VCShIzJ.png)

開始執行`openAccount(1000)`，第2行賦予變數`money`1000的值。
![](https://i.imgur.com/mdG1Ozj.png)

接著來到尾端`return`夾帶函式的物件。
![](https://i.imgur.com/MS2mnSR.png)

至此`openAccount(1000)`執行完畢，其執行環境從Execution Stack上移除。
第21行宣告的`myAccount`接收`openAccount(1000)`回傳的物件，包含`deposit`、`withdraw`兩個函式。
![](https://i.imgur.com/KX5xrPZ.png)

程式來到第22行，準備`myAccount.deposit(100)`的執行環境。
![](https://i.imgur.com/7UpeY2L.png)

開始執行`myAccount.deposit(100)`，此時閉包的重頭戲來了，雖然`myAccount`執行環境已不在Execution Stack上面，其變數`x`和`money`並沒有被記憶體所清除，它們的值仍然能被存取、更改。
![](https://i.imgur.com/PPIdTR9.png)

關鍵在，`myAccount.deposit(100)`的外部環境outer指向`myAccount`，與`myAccount`之間形成作用域鏈，這代表「`myAccount`裡面的變數對我來說很重要，請不要清除它」。因此即便`myAccount`已執行完畢，記憶體也不會清除它的變數。

此時，變數`money`的值更改為1100。

![](https://i.imgur.com/irlppu8.png)

執行完第6行的`console.log`，程式往下來到第23行，準備`myAccount.withdraw(200)`的執行環境。
![](https://i.imgur.com/ZO7CMai.png)

開始執行`myAccount.withdraw(200)`，同上面的例子，`myAccount.withdraw(200)`的outer指向`myAccount`，因此`money`以上次的1100，扣掉提款的200，剩下900。
![](https://i.imgur.com/cncszWX.png)
![](https://i.imgur.com/bgjtxTy.png)

`openAccount`作為外層function，裡面包了`deposit`、`withdraw`兩個內層function。
由於內層function的outer指向`openAccount`，即便`openAccount`執行完畢，從Execution Stack上移除，`openAccount`的語彙環境（Lexical Environment）也不會被記憶體銷毀。

這種「**內部function保留了外部function環境**」的特性，是狹義閉包最重要的部分。在實務上特別適合打造util工具及函式庫。

### 閉包能創造客製化的環境

上面的例子只有`myAccount`我的帳戶，如果爸爸也開了一個戶頭呢？

```javascript{26-27}
function openAccount(x){
  let money = x;
  
  function deposit(n){
    money = x + n;
    console.log(`account balance: ${money}`);
  }
  
  function withdraw(n){
    money = money - n;
    console.log(`account balance: ${money}`);
    return n;
  }
  
  return {
    deposit: deposit,
    withdraw: withdraw
  }
}

const myAccount = openAccount(1000);
myAccount.deposit(100);
myAccount.withdraw(200);

// 新增爸爸的戶頭
const myDadsAccount = openAccount(1000);
myDadsAccount.deposit(1000000);
```
爸爸同樣用一千塊開戶，開戶後立刻存了一百萬進戶頭。

在這裡要注意的是，同樣是呼叫`openAccount(1000)`，JS會分別創造兩個執行環境。<span style="background-color: yellow">對JS來說，只要呼叫函式，就會創造全新的執行環境</span>，直到函式執行完畢才會銷毀，除了那些被其它「outer」指名不能銷毀的，才會保留下來。

```javascript
// 建立一個openAccount(1000)的執行環境，並賦值給myAccount
const myAccount = openAccount(1000);

// 建立另一個openAccount(1000)的執行環境，並賦值給myDadsAccount
const myDadsAccount = openAccount(1000);
```

正是這個特性，讓「我」的帳戶與「爸爸」的帳戶能各自獨立存在。我的`money`，和爸爸的`money`，存在於不同的記憶體。

此外，每當只要有人開戶，都可以呼叫`openAccount`，不必每個人開戶都要建立一個新的物件或function。

#### 為什麼不使用物件來做客製化呢？

上面開戶的例子，可能有人會覺得，一個人的帳戶一個物件，不就得了嗎？為什麼非得用閉包不可呢？
```javascript
// 一個人的帳戶一個物件
const myAccount = {
  money: 1000,
  deposit: () => {}
  withdraw: () => {}
}

const myDadsAccount = {
  money: 1000,
  deposit: () => {}
  withdraw: () => {}
}
```
物件的問題是，它的值太好改了。甚至不需要透過`deposit`、`withdraw`兩個函式，直接改`money`就行了：
```javascript
myAccount.money = 900。
```
就是因為太好改了，難以看出來金額的減少是為了提款還是轉帳。如果程式的哪個環節出錯了，trace code的難度會很高。

而閉包**強迫**你一定要透過它的function，才能改`money`的值：
```javascript{4-5,9-10}
function openAccount(x){
  let money = x;
  
  function deposit(n){
    money = x + n;
    // console.log(`account balance: ${money}`);
  }
  
  function withdraw(n){
    money = money - n;
    // console.log(`account balance: ${money}`);
    return n;
  }
  
  return {
    deposit: deposit,
    withdraw: withdraw
  }
}
```
因此，關於為什麼要使用閉包，第一個好處是：**讓團隊開發功能時有一定的規範**。

除此之外，閉包也有「方便維護」的優點。例如明年每個帳戶都要新增貸款的功能，只要在`openAccount`新增方法，不論現在有幾個戶頭，所有帳戶都能直接呼叫新的方法：

```javascript{5,11}
function openAccount(x){
  // ...
  
  // new feature
  function credit(n){
  
  }
  
  return {
    // ...
    credit: credit
  }
}
```

如果是一個帳戶一個物件，功能的升級就會非常麻煩，專案裡有多少個帳戶，就要複製貼上多少次：
```javascript{7,15}
// 一個帳戶一個物件
const myAccount = {
  money: 1000,
  deposit: () => {}
  withdraw: () => {}
  // new feature
  credit: () => {}
}

const myDadsAccount = {
  money: 1000,
  deposit: () => {}
  withdraw: () => {}
  // new feature
  credit: () => {}
}
```
從方便升級的例子來看，閉包的第二個好處是：**影響範圍大，又時常變動的功能，能集中管理**。

### 實務上的應用

如果是剛寫前端不到1～2年，不一定有機會為專案寫utils，這時很難體會閉包到底能幹嘛，能吃嗎？

對，新手不一定有機會自己寫閉包，但肯定有用過別人寫好的閉包。例如React的redux、Vue的Vuex，就是用閉包的原理打造而成。

#### Redux的閉包

凡是稍微大型的專案，都需要一個全域的狀態管理器。而Redux的`createStore`正是一個經典的閉包範例。為了聚焦在閉包的部分，這裡只會節錄部分程式碼。

```javascript{19-22}
// createStore.js

function createStore(reducer, initialState) {
  let currentReducer = reducer;
  let currentState = initialState;
  let listeners = [];
  let isDispatching = false;
  
  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    return function unsubscribe() {
      // ...
    };
  }

  function dispatch(action) {
    // ...
    return action;
  }

  return {
    dispatch,
    subscribe,
    getState,
		// ...
  }
}

const store = createStore(...);
```
Redux store掌握了整個專案的全局state，全局state的修改勢必要照規矩來的，`dispatch`是整個`createStore`唯一讓user更新全局state的方法，外界無法直接修改state。

如果`createStore`不用閉包來寫，那會是怎樣一番風景呢？

```javascript{3,19-21}
function createStore(reducer, initialState){
  // object
  const store = {};
  store.currentReducer = reducer;
  store.currentState = initialState;
  store.listeners = [];
  store.getState = function() {
    // ...
  };
  store.dispatch = function(action) {
    // ...
  };
  return store；
}

const store = createStore(...);

// 如果有人偷懶直接修改store，可能會造成大災難
store.currentState = {
 // ...
}
```
如果store可以直接修改，那麼store究竟在什麼時候修改？有沒有被任意增加屬性？整個專案將會變得很難維護，改錯了牽一髮而動全身。

#### Express.js生態系的閉包

Express常用的套件幾乎是用閉包的形式打造的。以`compression`這個response的壓縮套件為例。

以下是套件的使用方式：
```javascript{5-7}
const express = require('express')
const cors = require('cors')
const app = express()

app.use(compression({
  // @TODO: Configure options here
}))
...
```

以下是compression套件本身：
```javascript{12-14}
function compression (options) {
  var opts = options || {}

  // options
  var filter = opts.filter || shouldCompress
  var threshold = bytes.parse(opts.threshold)

  if (threshold == null) {
    threshold = 1024
  }

  return (req, res, next) => {
    // ....
  }
}
```

為什麼`compression`非得用閉包來做套件呢？

理由一：在express剛開始運作的時候，要先跑一次`function compression`，設定config，再`return`內層函式。
理由二：express會依照自己的生命週期，執行`compression內層函式`。內層函式需依照一開始設定好的config執行程式。

### 最後：實務上什麼時候會用到閉包呢？

總結以上的範例，以下3種需求可以使用閉包：
1. 資料的修改需要遵循一定的規範（如Redux store）
2. 某個功能在很多地方會用到，集中管理，統一維護（如React的小元件）
3. 運行前要做初始化設定（如Express.js的相關套件）

## Summary
* 廣義閉包：每建立一個function，function與其父層就會形成作用域鏈，作用域鏈就是閉包。
* 狹義閉包：內層function指定要保留外層function環境。
* 一般的function執行完畢時，其佔據的記憶體就會被釋放。但有其例外：若與其它尚在存活的function形成作用域鏈，其佔據的記憶體就不會被清除。
* 對JS來說，只要呼叫函式，就會創造全新的執行環境。即便是同一個function，在不同的地方呼叫它，就會創造不同的執行環境。
* 使用閉包的時機一：資料的修改需要遵循一定的規範（如Redux store）
* 使用閉包的時機二：某個功能在很多地方會用到，集中管理，統一維護（如React的小元件）
* 使用閉包的時機三：運行前要做初始化設定（如Express.js的相關套件）

## Reference
* [為什麼我們需要閉包(Closure)？它是冷知識還是真有用途？](https://nissentech.org/why-do-we-need-closure/) 作者 - Nissen Yeh
* [Closure in javaScript](https://medium.com/@abhijeetmshr1/closure-in-javascript-5ac5c6faf3b2) 作者 - Abhijeet Mishra
* [JavaScript Closure (閉包)、函式與語彙環境](https://shubo.io/javascript-closure/) 作者 - 勗博 (Shubo)
* [How JavaScript Closure is used in real life project ?](https://dev.to/papercoding22/how-javascript-closure-is-used-in-real-project-1786) 作者 - Trung Nguyen