---
id: 20210404A
slug: /graphical_js_rules_hoisting
subject: JavaScript
title: 圖解JavaScript規則 - 拉升
date: 2021-04-04T17:30:00.000Z
description: 拉升這麼多地雷，那當初設計拉升是為了什麼？ var是屬於舊時代的冷知識，用 let/const 就不必知道什麼是拉升了吧？
tags:
 - JavaScript
headerImage: "https://imgur.com/daCOi8N.jpg"
templateKey: blog-post
---
> Photo by <a href="https://unsplash.com/@edulauton?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Edu Lauton</a> on <a href="https://unsplash.com/s/photos/pull?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

<br />
<br />

一開始決定著手撰寫這個系列，只是為了用最簡單的方式解釋什麼是閉包，以及閉包到底有什麼用，甚至連標題都想好了「閉包是什麼，能吃嗎？」。後來發現想用圖解的方式來解說閉包，勢必要一同解釋什麼是作用域鏈、詞彙環境等背景知識。因此本系列預計分成三篇，分別解釋什麼是拉升、作用域以及閉包。

## 執行環境 Execution context

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

理解了執行環境的堆疊之後，下一步就可以說明什麼是「拉升」（hoisting）。

## 什麼是拉升 hoisting？

先說結論，比較「粗淺易懂」的回答是：
拉升是執行環境登記「這裡宣告了哪些變數」的行為。

以`function`、`var`作為關鍵字來宣告的情況下，會產生下列兩點現象：
1. 變數、函式的「宣告」會被拉升
2. 只有「宣告」會拉升，「賦值」不會拉升

接著，再用下列範例來解釋「拉升」的細節。

### 變數

#### 宣告的拉升

第一個範例，使用log印出一個尚未宣告的變數：
```javascript
console.log(a)
// ReferenceError: a is not defined
// a 還沒有被宣告
```
執行環境：「<span style="background-color:#99ccff">我沒看到你有宣告變數a啊</span>」，因此拋出Error：a 還沒有被宣告。

ReferenceError的意思是，記憶體當中找不到任何宣稱是a變數的位址。
對`執行環境`而言，只要看到宣告變數的程式碼，例如`var a`，就會在記憶體中標記：「留一塊地給a。」

因此，只要`執行環境`找不到任何一塊地是a的，就會拋出錯誤：「沒有a變數的地址，你沒宣告啦！」

那麼，我在log下一行宣告a變數，會發生什麼事呢？
```javascript
console.log(a) // undefined
var a
```
這次，`執行環境`看到程式碼有宣告變數a了，於是在記憶體上圈出一小塊地：「這塊地是a的。」並將型別預設為`undefined`。

剛接觸JS的新人，看到這一段code會滿滿的不適應：「程式碼不是應該由上往下，一行一行執行下來的嗎？怎麼我是在第2行才宣告，JS就先圈出一塊地給a了？」

別忘了一開始提到的`執行環境`，在執行程式之前，`執行環境`會先建立「詞彙環境」，把環境中宣告的變數先登記下來、發配記憶體，這個紀錄的動作就是「拉升」。等環境建立完成了，才會一行一行往下執行。

因此，下面這張圖不論是左邊或右邊，對`執行環境`來說都是一樣的。
![](https://i.imgur.com/iAmpSn4.png)

下面再來一個執行函式例子：
```javascript{2-4}
function printName() {
  name = "Harry";
  console.log(name); // Harry
  var name;
}

printName()
```
一樣是閱讀上很違反直覺的範例：「第4行才想起來要補上宣告，但2、3行就存取，而且都沒有跳錯，什麼鬼啊！」

在進入`printName()`之前，`全域執行環境`會先為printName函式建立一個`printName()執行環境`。
`printName()`的詞彙環境（Lexical Environment）看到了`var name`，把變數登記在「<span style="background-color:#b1ddf0">環境變數宣告記錄表</span>」裡面，分配記憶體給`name`，型別預設為`undefined`。這個環境變數宣告記錄表，在此先簡寫為<span style="background-color:#b1ddf0">DeclEnvRec</span>（Declarative Environment Record）。

![](https://i.imgur.com/gaR07WO.png)

進入執行階段，首先看到變數name被賦值為字串`"Harry"`。下一行`console.log`，理所當然印出`name`的值為Harry。

![](https://i.imgur.com/YYgM3rF.png)

這個例子主要說明，`var`拉升在程式碼閱讀上「看起來」是可以先存取，再宣告的。但背後的原因其實是JS「**先建置環境，後執行**」的邏輯。

#### 賦值不會拉升

現在，我要a變數的值是10：
```javascript
console.log(a) // undefined
var a = 10
```
可是..等等，不是拉升了嗎？怎麼a還沒有被賦值呢？
因為「<span style="background-color:#b1ddf0">環境變數宣告記錄表</span>」只登記這裡宣告了哪些變數，並預設為`undefined`，賦值是等到「執行階段」一行一行執行下來，且執行到「賦值的那一行」才會做的。

站在JS的角度來看，畫面是這樣的：
![](https://i.imgur.com/YUU56PY.png)

所以，以`var`來說，若要賦值，還是乖乖寫在log上面吧！
```javascript
var a = 10
console.log(a) // 10
```

#### 進階變化

```javascript{1}
function run(n){
  console.log(n) // ?
  var n = 2
}
run(10)
```

這裡你可能懵了，`執行環境`是怎麼看待「參數」呢？

對`執行環境`環境來說，參數也是宣告的變數。`run函式執行環境`是這樣看的：

![](https://i.imgur.com/SpskIrq.png)

##### 環境建立 階段

「參數」（Arguments）是函式的執行環境特別的物件，它包含0~n個參數，以及參數的長度（length）。

在`run()執行環境`的「環境建立」階段，Arguments紀錄了`run`函式有1個參數`n`。比較特殊的是，由於參數的值是從外部傳進來的，在環境建立的階段已知`n=10`。

`run`函式裡面也另外宣告了一個`var n`。兩個`n`要怎麼登記在「環境變數宣告記錄表」呢？對「環境變數宣告記錄表」來說，相同的變數它只會登記一個，因此只會有一個`n`。

那麼`n`的值呢？在環境建立階段，已知參數`n`的值為`10`，而`n=2`是要等到「執行階段」執行到第3行，才會賦值。因此，目前`n`的值為`10`。

##### 環境執行 階段

進入函式執行後，第2行遇到了`console.log()`，目前`n=10`，因此log印出來為`10`。
第3行遇到`n=2`，於是將`n`賦予`2`的值，在「環境變數宣告記錄表」中，`n=2`。

<br />

回到「函式的執行環境是怎麼看待參數呢？」這個問題，在環境建置的階段來說，參數也是這個環境宣告的變數之一，會登記在「環境變數宣告記錄表」當中。由於參數是外部環境傳進來的，因此在「環境建立階段」就已知道它的值。唯有「參數」會在「環境建立階段」賦值，其餘宣告只會先登記，直到「執行階段」執行到那一行才會賦值。

換言之，「除了參數之外，宣告會拉升，但賦值不會拉升」。

下一題的變化，觀念也是一樣的：
```javascript
var v = 3
var v
console.log(v) // ?
```
有些人會猜，`v`可能是`undefined`。第二個`v`蓋過第一個`v`，那`v`不就是`undefined`了嗎？

但掌握「**宣告會拉升，但賦值不會拉升**」原則就會理解，「賦值」是執行階段才會做的事情。
對執行環境而言，它是這樣看的：

![](https://i.imgur.com/aZ1iXOQ.png)


這樣即可很容易理解，`v`的值為什麼是3了。

### function

函式的宣告也會被拉升。
```javascript
console.log(a)
var a
function b(){}
```

`全域執行環境`看到這段code，會先在「環境變數宣告記錄表」登記變數`a`、`b`。
```javascript
globalEC = {
  lexicalEnv: {
    DeclEnvRec: {
      a: undefined,
      b: function
    }
  }
}
```

函式的拉升基本上沒什麼陷阱要注意，但以下範例可以當作冷知識，看看就好了：
```javascript{2-3}
console.log(a) // [Function: a]
var a
function a(){}
```
同時宣告`變數a`以及`function a()`的時候，JS會默認「function的權限比較高」，所以上面的log會印出它是`function`，而不是預設的`undefined`。

### 既然hoisting這麼多地雷，那當初設計hoisting是為了什麼？

[<我知道你懂 hoisting，可是你了解到多深？>](https://github.com/aszx87410/blog/issues/34)的作者寫得很好：「可以反過來想，如果沒有拉升會怎樣？」

#### 一、變數一定要先宣告才能使用
不能「先存取變數，後來才想起來要宣告變數」，例如下面這樣違反閱讀習慣的行為：NONO！
```javascript
a = 10
console.log(a)
var a
```
嗯，很好！變數先宣告才能使用是好習慣。因此es6的`let`、`const`補上了這一點。

#### 二、函式也要先宣告才能呼叫
嗯～有點麻煩，這樣每次要呼叫函式的時候，都要努力將滑鼠滾到上面，找出自己需要呼叫的函式。
但也不是不行啦！上面都是function，下面都是執行的程式，看起來也滿整齊的啊！

#### 三、沒辦法做到函式彼此之間互相呼叫

這裡需要舉個例子：
```javascript{27,34}
var students = [
  {
    name: "Eren Jaeger",
    gender: "male"
  },
  {
    name: "Mikasa Ackerman",
    gender: "female"
  },
  {
    name: "Armin Arlert",
    gender: "male"
  },
  {
    name: "Reiner Braun",
    gender: "male"
  },
  {
    name: "Historia Reiss",
    gender: "female"
  },
]

function printAll(stu){
  var arr = stu.map(i => i)
  if (arr.length > 0) {
    logDetail(arr)
  }
}

function logDetail(arr) {
  console.log(arr[0].name + ', ' + arr[0].gender)
  arr.shift()
  printAll(arr)
}
  
printAll(students)
```
`printAll()`裡面呼叫了`logDetail()`，又在`logDetail()`裡面呼叫了`printAll()`。如果函式的宣告都要放在呼叫的上面，那麼根本做不到互相呼叫。

這就是為什麼拉升在JS當中仍然是必要的，對function來說尤其重要。

## let, const有沒有拉升？

先在檯面上覆蓋一張考前（？）複習表：

![](https://i.imgur.com/gv3nQn0.png)

自從es6推出了`let`、`const`，網路上已有非常多文章解釋`var`、`let`、`const`的差異。

多數人的既定印象，包括過去的我自己，都抱有簡單的結論：用`let`跟`const`來宣告變數，就沒有「拉升」的現象啦！`var`是屬於舊時代的冷知識，新專案也不再使用`var`來宣告變數了。彷彿用了`let`跟`const`就揮別了hoisting的惡夢。

沒有拉升？就結果來看是這樣沒錯。~~反正知道進一步的細節對於完成專案似乎沒有什麼幫助~~。

先來一個`let`跟`var`的基礎比較：
```javascript
console.log(a) // undefined
var a

/**
 * 有拉升，先預設為undefined
 * /
```
```javascript
console.log(a) // ReferenceError: a is not defined
let a

/**
 * 沒有拉升，a還沒有被宣告，找不到地址
 * /
```
就上面的比較來說，`let`確實是沒有被拉升的。
`let`跟`const`一定要先宣告才能使用，這確實是解決很多痛點的改良。

但下面是一個*很故意*的例子：

```javascript{1,2,8,9}
var x = "global"
var y = "global"

function run(){
	console.log(x) // ？
	console.log(y) // ？

	var x = "local"
	let y = "local"
}

run()
```
在全域，變數`x`、`y`都已宣告，並賦予了字串`"global"`的值。
進入了`run()`函式之後，`x`, `y`又重複宣告，並賦予字串`"local"`的值，只是宣告的位置在log下方。
此時，log印出的`x`、`y`，分別是什麼？

為了避免混亂，以下先解釋`執行環境`怎麼看變數`x`。

```javascript{1,8}
var x = "global"
// var y = "global"

function run(){
    console.log(x)
    // console.log(y)

    var x = "local"
    // let y = "local"
}

run()
```
![](https://i.imgur.com/Zi1TmiD.gif)

當`run()執行環境`正在建立時，它會登記`run()`函式當中宣告了一個變數`x`。
進入執行階段後，對於尚未賦值的變數通通預設為`undefined`。
取值時，`run()執行環境`會先尋找環境內有沒有`x`，有的話，直接取用環境內的`x`（沒有的話，再向外尋找`x`）。
因此log印出來，`x`為`undefined`，合情合理。

接著，重頭戲是，`執行環境`怎麼看變數`y`。`run()`當中的`let y`真的沒有拉升嗎？

```javascript{2,9}
// var x = "global"
var y = "global"

function run(){
	// console.log(x)
	console.log(y)

	// var x = "local"
	let y = "local"
}

run()
```
如果`let y`真的沒有拉升，那麼log印出來的值，就應該`"global"`。如下圖：
![](https://i.imgur.com/u8LFwnE.gif)

如果`let y`沒有拉升，那麼`run()執行環境`在建立時不會先登記`y`。
而開始運行後，第一行看見`y`，因尚未登記，`run()執行環境`會向外尋找`y`的值，然後在`全域執行環境`找到`y = "global"`。

但實際上`y`印出來的，卻是`ReferenceError`，這到底怎麼回事呢？

其實，`let`與`const`一樣是有拉升的，只是在「賦值」之前，它們是不能被使用的：
![](https://i.imgur.com/zJWj0nm.gif)

在`run()執行環境`建立時，一樣會先登記環境裡宣告了哪些變數。與`var`的差別在於，`執行環境`並不會給未賦值的`let`預設`undefined`，而是先設定為「尚未初始化，不能使用」。直到`let`賦值了，才能存取。

因此，若對「尚未初始化」的`let`進行存取，JS在執行時會直接拋出錯誤`ReferenceError`。

簡單來說，`var`與`let`/`const`/`class`的宣告差別在於「初始化」。
`var`在賦值之前，會初始化為`undefined`。而`let`/`const`/`class`則保持「未初始化」的狀態，無法存取值。當試圖存取，會拋出`ReferenceError`的錯誤。

所以，回到那張考前複習表，與其說`let`/`const`沒有拉升，更貼切的說法應該是：「拉升時，沒有初始化。」

![](https://i.imgur.com/aoQ4fLx.png)

最後，Huli大神在[<我知道你懂 hoisting，可是你了解到多深？>](https://github.com/aszx87410/blog/issues/34)內文提到，hoisting要追根究柢，分為地下10層。小妹我目前停留在地下5層，若想進一步往深淵走去，請移駕參考Huli大神的文章。

## Summary
* 拉升是執行環境登記「這裡宣告了哪些變數」的行為。在執行程式之前，執行環境會先建立「詞彙環境」，把環境中宣告的變數先登記在「環境變數宣告記錄表」、發配記憶體，這個紀錄的動作就是「拉升」。等環境建立完成了，才會一行一行往下執行。
* 不論是`var`、`let`、`const`，都有拉升的行為。
* 宣告會拉升，但賦值不會拉升。
* 對「環境變數宣告記錄表」來說，命名相同的變數它只會登記一個。
* 函式的參數對函式的執行環境來說，也是這個環境宣告的變數之一，會登記在「環境變數宣告記錄表」當中。由於參數是外部環境傳進來的，唯有「參數」會在「環境建立階段」賦值，其餘宣告只會先登記，直到「執行階段」執行到那一行才會賦值。換言之，除了參數之外，宣告會拉升，但賦值不會拉升。
* 拉升在JS當中是必要的，對function的宣告及呼叫尤其重要。
* `var`與`let`/`const`/`class`的宣告差別在於「初始化」。`var`在賦值之前，會初始化為`undefined`。而`let`/`const`/`class`則保持「未初始化」的狀態，無法存取值。在賦值之前試圖存取，會拋出`ReferenceError`的錯誤。

## Reference
* [秒懂！JavaSript 執行環境與堆疊](https://medium.com/%E9%AD%94%E9%AC%BC%E8%97%8F%E5%9C%A8%E7%A8%8B%E5%BC%8F%E7%B4%B0%E7%AF%80%E8%A3%A1/%E6%B7%BA%E8%AB%87-javascript-%E5%9F%B7%E8%A1%8C%E7%92%B0%E5%A2%83-2976b3eaf248) 作者 - Coding Monster
* [你一直在用，但從沒搞懂的閉包](https://medium.com/schaoss-blog/%E4%BD%A0%E4%B8%80%E7%9B%B4%E5%9C%A8%E7%94%A8-%E4%BD%86%E5%BE%9E%E6%B2%92%E6%90%9E%E6%87%82%E7%9A%84%E9%96%89%E5%8C%85-e6b39b4a5ade) 作者 - Schaos
* [我知道你懂 hoisting，可是你了解到多深？](https://github.com/aszx87410/blog/issues/34) 作者 - Huli
* [Execution context, Scope chain and JavaScript internals](https://medium.com/@happymishra66/execution-context-in-javascript-319dd72e8e2c) 作者 - Rupesh Mishra