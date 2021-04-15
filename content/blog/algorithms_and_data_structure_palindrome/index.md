---
id: 20200108J
slug: /algorithms_and_data_structure_palindrome
subject: 資料結構與演算法
title: 迴文
date: 2020-01-08T1:00:00Z
tags:
  - Algorithms and Data Structures
description: 請完成一個 function：參數為 string，請判斷該字串正著看和反著看，可否是相同的單詞？是的話請回傳 true, 否則回傳 false
headerImage: "https://imgur.com/RTzvFBw.jpg"
templateKey: blog-post
---
> Photo by <a href="https://unsplash.com/@kellysikkema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kelly Sikkema</a> on <a href="https://unsplash.com/s/photos/string?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

### 請完成一個 function：參數為 string，請判斷該字串正著看和反著看，可否是相同的單詞？是的話請回傳 true, 否則回傳 false。

> 例：
> palindrome("abba") === true
> palindrome("16461") === true
> palindrome("abcdefg") === false

```javascript
function palindrome(str) {

}
```

這個問題要搭配上一節的字串反轉一起看，若還沒看過的請詳見上一節。

### 方法一、

> 1.要熟悉字串反轉的不同方式

```javascript
// 字串反轉
function reversed(str) {
  let reversedStr = ""
  for (let char of str) {
    reversedStr = `${char}${reversedStr}`
  }
  return reversedStr
}

function palindrome(str) {
  return str === reversed(str) ? true : false
}
```

方法一為相當正規的方式，不論用什麼方式將字串反轉，只要反轉前後相等，皆為正解。

### 方法二、

#### 思考邏輯

![](https://i.imgur.com/EmNo2uJ.png)

> 1.第一個字元跟最後一個字元比較，第二個字元跟倒數第二個字元比較，以此類推
> 2.知道 Array.prototype.every()。可檢查陣列中的每一個項目是否符合條件，回傳值僅為 true or false，很適合用來檢查陣列中的內容是否符合特定條件。

這個方法有個缺點：當檢查到陣列的中點時，理論上不必再繼續往下檢查了，因為後面的項目都已跟前面的項目比較過。
但 every()會遍歷陣列中的每一個項目，直到最後一個。

儘管如此，白板題就是一種火力展示，一個題目你會兩種以上的解法，絕對是多多益善。
況且 **第一個字元跟最後一個字元比較，第二個字元跟倒數第二個字元比較** 這種思考邏輯，在更進階的題目會經常使用。

```javascript
function palindrome(str) {
  let arr = str.split("")
  let bool = arr.every((char, index) => {
    return char === arr[arr.length - (index + 1)]
  })
  return bool
}
```

更精簡的 code 如下：

```javascript
function palindrome(str) {
  return str
    .split("")
    .every((char, index) => char === str[str.length - (index + 1)])
}
```

以下是本章節的程式碼：

<iframe
  src="https://codesandbox.io/embed/beautiful-ardinghelli-riss5?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fexercise%2Fpalindrome%2Findex.js&previewwindow=tests&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="beautiful-ardinghelli-riss5"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>
