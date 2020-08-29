---
id: 20200103J
slug: /algorithms_and_data_structure_reverse_string
subject: 資料結構與演算法
title: 文字反轉
date: 2020-01-03T1:00:00Z
description: 如果你也常因為過度完美主義、太在意他人眼光等原因而感到焦慮不安，那不妨參考看看 5 個心態調整的方法，這些是我自己也還在不斷練習的，讓我們一起與焦慮共處、更溫柔平衡的面對人生！。
tags:
  - Algorithms
  - Data Structures
headerImage: "https://imgur.com/4u6bUII.jpg"
templateKey: blog-post
---

### 請完成一個 function：參數為 string，return 該字串的倒轉。

> 例：
> reverse('apple') === 'elppa'
> reverse('hello') === 'olleh'
> reverse('Greetings!') === '!sgniteerG'

```javascript
function reverse(str) {}
```

### 方法一、

> 1.要熟悉 JS 常用的 API，String.prototype.split()，將字串轉為陣列<br> 2.知道 JS 有 Array.prototype.reverse()，將陣列倒轉<br> 3.知道 JS 有 Array.prototype.join()，將陣列合併成一個字串<br>

```javascript
function reverse(str) {
  const arr = str.split("")
  const reversedStr = arr.reverse().join("")
  return reversedStr
}
```

以下是整理過後，更精簡的 code：

```javascript
function reverse(str) {
  return str.split("").reverse().join("")
}
```

方法一可能會被面試官拒絕的部分是，reverse()這個方法太作弊了，就像排序直接用 Array.prototype.sort()一樣，直接 call out 是不行 der。

### 方法二、

#### 思考邏輯

![](https://i.imgur.com/PLrqfZD.png)

> 1.知道 es6 `for...of` 的語句，用於**可迭代**的物件上，[可迭代物件](https://jiepeng.me/2018/04/19/iterable-and-iterator-in-javascript)包含陣列、字串、Map 物件、Set 物件等等。 2.知道字串相加後，會組成一個新字串。或是熟悉 es6 的**Template literals**。

```javascript
function reverse(str) {
  let reversed = ""
  for (let char of str) {
    reversed = `${char}${reversed}`
  }
  return reversed
}
```

除非有特殊的迴圈條件，否則多數 for 迴圈建議使用`for...of`或`forEach`來完成，以避免使用傳統 for 迴圈`(let count = 0 ; count < 10 ; count++`)時，打錯字(ex:分號打成逗號)及不易閱讀之缺點。

### 方法三、

> 1.知道 es6 Array.prototype.reduce()，跟上 functional programming 的潮流

方法二其實已經相當不錯了，若面試官想知道其它更潮的作法，可使用 reduce()的特性，將字串相加起來。

```javascript
function reverse(str) {
  let arr = str.split("")
  return arr.reduce((string, char) => `${char}${string}`, "")
}
```

更精簡的 code 如下：

```javascript
function reverse(str) {
  return str.split("").reduce((string, char) => `${char}${string}`, "")
}
```

以下是本章節的程式碼：

<iframe
    src="https://codesandbox.io/embed/beautiful-ardinghelli-riss5?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fexercise%2Freversestring%2Findex.js&previewwindow=tests&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="beautiful-ardinghelli-riss5"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>
