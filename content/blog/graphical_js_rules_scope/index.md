---
id: 20210501A
slug: /graphical_js_rules_scope
subject: JavaScript
title: 圖解JavaScript規則 - 作用域(鏈)
date: 2021-05-01T17:00:00.000Z
description: 若要尋找特定的變數，我可以去哪些地方找？
tags:
 - JavaScript
headerImage: "https://imgur.com/z5b74Y4.jpg"
templateKey: blog-post
---
Photo by <a href="https://unsplash.com/@picoftasty?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mae Mu</a> on <a href="https://unsplash.com/s/photos/concentric-circles?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

## 執行環境 Execution Context

JavaScript底層要執行的時候，第一步會先建立一個「執行環境」（Execution Context）。

執行環境內部有許多物件，其中最重要的是「詞彙環境」Lexical Environment（也有翻譯成「詞法環境」）。
詞彙環境主要儲存了：

1. <span style="background-color:#99ccff">全域物件，在有瀏覽器的環境下，指的是window內的物件</span>
2. <span style="background-color:#b1ddf0">登記這個環境所宣告的變數和function(函式)</span>
3. <span style="background-color:#fdf2cc">外部環境，也就是Scope Chain，台灣多半翻譯成「作用域（鏈）」，中國則翻譯成「範疇」</span>
4. <span style="background-color:#F6CECE">這個環境的"this"是什麼</span>

![](https://i.imgur.com/0Eaqo1D.png)

執行環境解析程式碼的過程中，主要分成「建立階段（Creation Phase）」和「執行階段（Execution Phase）」。

* 建立階段：建立「詞彙環境」。
* 執行階段：由上到下、一行一行地執行程式，只會先跳過函式「裡面」的程式碼。畢竟你宣告了函式，不代表你要立刻執行它，可以等到別的事情先做完了，再執行這個函式。

第一個執行環境就是`全域執行環境`，當全域執行環境建立完，進入執行階段後，一行一行往下跑著，當遇到`呼叫A函式`時，這個`全域執行環境`就會為A函式建立一個`A函式執行環境`，再進入A函式中逐行執行。

若在A函式中又呼叫另一個B函式，就會再建立新的`B函式執行環境`，並堆疊在`A函式執行環境`的上方。如果不斷地在函式中呼叫另一個函式，所有執行環境就會不斷往上堆疊，如下面的動畫：

![](https://i.imgur.com/gGqJUzG.gif)

JS會優先處理堆疊（stack）中最**上面**的`執行環境`。一旦最上面的環境執行完畢，該`執行環境`就會被移除，以此類推。

前一篇圖解了`執行環境`與拉升（Hoisting）的關係，這一篇則會著重在`執行環境`與作用域的關係。

## 作用域

設置作用域的目的是：若要尋找特定的變數，我可以去哪些地方找？

對執行環境來說，它的工作除了<span style="background-color:#b1ddf0">登記這個環境有哪些變數被宣告</span>之外，還會設定「<span style="background-color:#fdf2cc">需要存取變數時，我可以在哪裏找到這個變數</span>」。

用`var`或是`let/const`來宣告的變數，其作用域也會不同。
以下先以`var/function`來解釋作用域，之後再說明`let/const`的作用域有什麼不同。

第一個範例：

```javascript
var a = 'Hello!';
f1();

function f1() {
  var b = 'Kon-nichiwa';
  f2();

  function f2() {
    var c = '你好!';
    f3();
  }
}

function f3() {
  var d = 'Annyeonghaseyo';
  console.log(c);
}
```
#### 全域執行環境

先從第一個執行環境，也就是`全域執行環境`說起。
執行環境在登記變數的時候，會把變數登記在「環境變數宣告記錄表」裡面。這個記錄表，在此先簡寫為DeclEnvRecord（Declarative Environment Record）。

在這個範例`全域執行環境`的`宣告記錄表`中，登記了`a`、`f1`、`f3`三個變數。
`外部環境`outerEnv，則標記「需要存取變數時，除了自己的`宣告記錄表`，我還可以在哪裡找到變數？」
由於`全域執行環境`是第一個執行環境，因此`外部環境`為`null`。

![](https://i.imgur.com/uEZAPVt.png)

#### f1執行環境

再來看`f1()執行環境`。

在`f1()執行環境`的`宣告記錄表`中，登記了`b`、`f2`兩個變數。

![](https://i.imgur.com/nMIwMyp.png)

變數的尋找範圍，第一個當然是自己的`宣告記錄表(f1EC.lexicalEnv.DeclEnvRec)`。如果在自己的`DeclEnvRec`找不到，則「向外尋找（outerEnv）」，去`globalEC.lexicalEnv.DeclEnvRec`裡面找。如果`globalEC.lexicalEnv`找不到，JS就會拋出`ReferenceError`。

![](https://i.imgur.com/DHLvcTr.png)

#### f2執行環境

接著來看`f2()執行環境`。

`f2()執行環境`僅登記了變數`c`。
`外部環境`則註記了它的上一層`f1()執行環境`。

![](https://i.imgur.com/dgAyMzp.png)

若在`f2()執行環境`當中搜尋變數，js會：
1. 在自己的`宣告記錄表`裡面找，找不到看下一步
2. 透過自己的`outerEnv`，去`f1EC.lexicalEnv.DeclEnvRec`裡面找，找不到看下一步
3. 透過`f1.lexicalEnv.outerEnv`，去`globalEC.lexicalEnv.DeclEnvRec`裡面找。由於這是最後的`lexicalEnv`了，找不到的話會拋出`ReferenceError`。
![](https://i.imgur.com/c7UAXtQ.png)

在`f2`函式裡，呼叫了`f3()`。那麼`f2`是如何找到`f3`呢？自然是透過作用域鏈往外找，最後在`globalEC.lexicalEnv.DeclEnvRec`找到了`f3`。

#### f3執行環境

最後是f3()函式。

`f3()執行環境`僅登記了變數`d`。

![](https://i.imgur.com/hIODJv9.png)

在這裡想用`console`印出變數`c`，但是循著作用域鏈，不論是自己的`f3EC.lexicalEnv`還是`globalEC.lexicalEnv`，都找不到`c`，因此log印出來為`ReferenceError`。

![](https://i.imgur.com/d0aiYp4.png)

到這裡第一個範例結束。

在這裡可以總結什麼是作用域？就程式碼文本的上下文來看，「作用域」可以視為一個變數的生存範圍。例如`globalEC`的變數，其生存範圍當然是最大的。

![](https://i.imgur.com/GEstJg5.png)

而作用域「鏈」，指的是「除了當下的的Decl Env Rec，還可以去哪裏找變數？」
外部環境（Outer Envirnment）會標記可以查訪的Lexical Environment。假設用一條線將所有可查訪的Lexical Environment串起來，這條線可視為「尋找變數的搜索鏈」，即作用域「鏈」。

### 執行環境堆疊與作用域鏈的關係 Execution Stack vs Scope Chain

執行環境與作用域的劃分確實息息相關，因為每個執行環境都會建立Lexical Environment及標註外部環境。
![](https://i.imgur.com/4sGWxHZ.png)

但是，執行環境堆疊的「順序」和作用域鏈沒有任何關係。
在Execution Stack最上面的執行環境，其作用域鏈，跟它下方的執行環境無關。
例如，`f2()`函式裡面呼叫了`f3()`，但`f3()`的作用域鏈與`f2()`沒有關聯。
![](https://i.imgur.com/WovIDFZ.gif)

JS這個語言在決定作用域時，是在程式運行「之前」，程式碼「語法上下文解析」的階段，就已經決定的。
這種決定作用域的方式，有人稱為「靜態作用域」（Static Scope），也有人稱為「詞法作用域」（Lexical Scope）。

所以JS的作用域，只要了解JS的語法結構，從「肉眼」就可看出。一份程式碼，不論函式執行的順序為何，作用域都是不變的。
![](https://i.imgur.com/JLHV7eZ.png)

### 以function作為分界，可能產生的問題
接下來要來談談，以function作為作用域的分界，在撰寫程式碼時容易產生哪些問題。

#### 與Function無關的括號 - 影響作用域的判斷

前面說到，JS的作用域是靜態的，取決於程式碼的上下文，本意是方便工程師閱讀程式碼就可以判斷作用域。

在`for`迴圈的條件式宣告`var`，在閱讀上會直觀地以為，在`for`迴圈裡面宣告的`var`，其作用域僅限於`for`迴圈裡面，忘記`function`才是作用域的分界。也忘記這種宣告，會讓迴圈內的`i++`污染了整個`run()`函式的`var i`。
```javascript{6-8}
function run() {
  var i = 0;

   // do something else...

  for (var i = 1; i <= 5; i++) {
    console.log(i);
  }

  // do something else...

  console.log(i); // 6
}

run();
/**
 * 1
 * 2
 * 3
 * 4
 * 5
 * 6
 * /
```

下面則是另一個重複宣告的例子。

```javascript{2,5}
function doSomething(condition) {
  var flag = 1;
  
  if (condition) {
    var flag = 2;
    console.log(flag); // 2
  }
  
  console.log(flag); // 2
}

var condition = true;

doSomething(condition);
```
變數`flag`預設是1，但在某些條件下，我需要宣告另一個`flag`預設是2。
這個例子一樣忽略了`function`才是作用域的分界，導致後面宣告的`flag`覆蓋了前面的`flag`。而且這樣寫，只要`condition = true`，整個`doSomething`函式的`flag`都是2，`if`條件形同虛設。

這樣看來，以function作為作用域的唯一分界，很容易造成程式碼撰寫上的誤判，變數的宣告也不夠彈性。有時候我們只需要變數的作用域僅限於`if`條件、`for`迴圈以內，而不是又宣告一個新的變數像是`flag2`、`flag3`，增加維護上的困難。

es6的`let`、`const`決定補足這個缺陷。

### let、const的作用域

上一段提到，有時候我們只需要變數的作用域僅限於if條件、for迴圈以內。`let/const`以大括號`{}`作為分界，正好解決了這個問題。

上面的`flag`範例以`let`改寫，就可以完全避免變數污染的情況。

```javascript{2,5}
function doSomething(condition) {
  let myVar = 1;
  
  if (condition) {
    let myVar = 2;
    console.log(myVar); // 2
  }
  
  console.log(myVar); // 1
}

var condition = true;

doSomething(condition);
```
![](https://i.imgur.com/ye1wqD3.png)

除了大括號自成一個作用域之外，「尋找變數」的作用域鏈仍保持不變。
將上面的例子簡化，`if`作用域裡面沒有宣告任何變數，但想印出`myVar`的值，JS依然可以透過作用域鏈向外尋找變數。
```javascript{2}
function doSomething() {
  let myVar = 1;
  
  if (true) {
    console.log(myVar);
  }
}

doSomething();
```
![](https://i.imgur.com/5U24iJH.png)

另外，「拉升」的行為也是保持不變的。上一章末尾提到，`let/const`並不是沒有拉升，而是沒有初始化為`undefined`，直到賦值才可以存取。因此，別期待「宣告前往作用域鏈去找，宣告後在自己的作用域裡面找」這種神奇的事情發生。一個變數在一個作用域裡面只能有相同的行為，才有利於維護。

```javascript{2,7}
function doSomething() {
  let myVar = 1;
  
  if (true) {
    console.log(myVar); // ReferenceError
    
    let myVar = 2;
    
    console.log(myVar);
  }
}

doSomething();
```
![](https://i.imgur.com/IQ9fa0O.png)

## Summary
* 設置作用域的目的是：若要尋找特定的變數，我可以去哪些地方找？
* 就程式碼文本的上下文來看，「作用域」可以視為一個變數的生存範圍。例如`全域執行環境`的變數，其生存範圍當然是最大的。
* 作用域「鏈」，指的是「除了當下的的`變數宣告記錄表`，還可以去哪裏找變數？」
* 外部環境（Outer Envirnment）會標記可以查訪的Lexical Environment。假設用一條線將所有可查訪的Lexical Environment串起來，這條線可視為「尋找變數的搜索鏈」，即作用域「鏈」。
* JS這個語言在決定作用域時，是在程式運行「之前」，程式碼「語法上下文解析」的階段，就已經決定的。所以JS的作用域，只要了解JS的語法結構，從「肉眼」就可看出。一份程式碼，不論函式執行的順序為何，作用域都是不變的。
*  僅以`function`作為作用域的唯一分界，很容易造成程式碼撰寫上的誤判，變數的宣告也不夠彈性。
*  `let/const`以大括號`{}`作為分界，彌補了作用域不夠有彈性的缺陷。


## Reference
* [所有的函式都是閉包：談 JS 中的作用域與 Closure](https://blog.techbridge.cc/2018/12/08/javascript-closure/) 作者 - Huli
* [JavaScript 進階 - 什麼是閉包？探討 Closure & Scope Chain](https://hackmd.io/@Heidi-Liu/note-js201-closure#E6-%E4%BB%A5%E5%BE%8C%E7%9A%84%E4%BD%9C%E7%94%A8%E5%9F%9F%EF%BC%9ABlock-Scope) 作者 - Heidi-Liu
* [How JavaScript Works Behind the Scenes?](http://dannyzhang.run/2017/04/03/How-JavaScript-works-Behind-the-Scenes/) 作者 - Danny Zhang
* [Understanding Execution Context and Execution Stack in Javascript](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0) 作者 - Sukhjinder Arora
* [Fixing Variable Scope Issues with ECMAScript 6](https://alistapart.com/article/fixing-variable-scope-issues-with-ecmascript-6/) 作者 - Brandon Gregory



