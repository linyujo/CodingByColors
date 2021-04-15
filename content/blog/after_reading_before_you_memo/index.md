---
id: 20210307A
slug: /after_reading_before_you_memo
subject: React
title: After Reading "Before You Memo"
date: 2021-03-07T18:00:00.000Z
description: memo好用歸好用，但凡多寫一段code，執行時還是要多跑幾行程式。在決定使用memo之前，你還有哪些選擇？
tags:
 - React
 - React Component Patterns
headerImage: "https://imgur.com/f9j0wx4.jpg"
templateKey: blog-post
---
> Photo by <a href="https://unsplash.com/@pawel_czerwinski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Paweł Czerwiński</a> on <a href="https://unsplash.com/s/photos/paint-wall?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

相較於Class Component有較多方式去避免元件、複雜的function在每次更新中進行無意義的渲染，Functional Component在設計上就得更注意效能問題。`React.memo`近似於Class Component當中的`shouldComponentUpdate`，可以透過`prevProps`、`nextProps`的比較避免無意義的re-render。

然而`memo`好用歸好用，但凡多寫一段code，執行時還是要多跑幾行程式。[Before You memo()](https://overreacted.io/before-you-memo/)這篇文章介紹，在決定使用`memo`之前，你還有哪些選擇？該怎麼設計元件，才能自然而然地優化性能？

## Example 1

> `<Default />`是一個Functional Component，元件內主要有三樣東西：下拉式選單、一行文字、和一個渲染得比較慢的元件`<ExpensiveTree />`(淺藍色匡起來的部分)。

![](https://i.imgur.com/0lZD0u7.png)

> 下拉式選單`onChange`的時候，“Display Selected Color”這行文字的顏色也會跟著改變。

![](https://i.imgur.com/iHczM1C.png)

> 下拉式選單每一次的`onChange`，都會讓整個`<Default />`重新render，其中的`<ExpensiveTree />`也會跟著重新渲染一次。
> 然而，不論顏色如何改變，都與元件`<ExpensiveTree />`無關。每一次重新渲染`<ExpensiveTree />`，都會造成效能的浪費。
> 要怎麼做，才能讓`<ExpensiveTree />`不會跟著重新渲染呢？

範例程式碼如下，可以打開CodeSandbox玩玩看：

<iframe src="https://codesandbox.io/embed/after-reading-before-you-use-memo-u621r?fontsize=14&hidenavigation=1&initialpath=%2F&module=%2Fsrc%2FDefault.js&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="after-reading-before-you-use-memo"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

[![Edit after-reading-before-you-use-memo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/after-reading-before-you-use-memo-u621r?fontsize=14&hidenavigation=1&initialpath=%2F&module=%2Fsrc%2FDefault.js&theme=dark)

用`React.memo`將`<ExpensiveTree />`包起來，肯定是最簡單粗暴的方式了。但在使用memo之前，其實還有更「自然」的解決方法。

### 解法：把state往下移

仔細看`<Default />`元件，其實只有一部分的程式碼與state互相依賴：
```jsx{2,5-12}
function Default() {
  const [color, setColor] = React.useState("red");
  return (
    <div className="App-wrapper">
      <select onChange={(e) => setColor(e.target.value)}>
        <option value="red" default>
          red
        </option>
        <option value="yellow">yellow</option>
        <option value="blue">blue</option>
      </select>
      <p style={{ color }}>Display Selected Color</p>
      <ExpensiveTree />
    </div>
  );
}
```
既然如此，就把相互依賴的state和DOM抽出來，做成一個獨立的元件：
```jsx{4}
function Default() {
  return (
    <div className="App-wrapper">
      <Form />
      <ExpensiveTree />
    </div>
  );
}

function Form() {
  const [color, setColor] = React.useState("red");
  return (
    <>
      <select onChange={(e) => setColor(e.target.value)}>
        <option value="red" default>
          red
        </option>
        <option value="yellow">yellow</option>
        <option value="blue">blue</option>
      </select>
      <p style={{ color }}>Display Selected Color</p>
    </>
  );
}
```
由於state的更新只在`<Form />`元件裡面，因此`<ExpensiveTree />`不會重新渲染。
可運行的程式碼如下：
<iframe src="https://codesandbox.io/embed/after-reading-before-you-use-memo-u621r?fontsize=14&hidenavigation=1&initialpath=%2Fsolution01&module=%2Fsrc%2FSolution01.js&theme=dark"
	style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
	title="after-reading-before-you-use-memo"
	allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
	sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[![Edit after-reading-before-you-use-memo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/after-reading-before-you-use-memo-u621r?fontsize=14&hidenavigation=1&initialpath=%2Fsolution01&module=%2Fsrc%2FSolution01.js&theme=dark)

## Example 2

> 與範例一87%相同，元件內一樣是三樣東西：下拉式選單、一行文字、和渲染緩慢的`<ExpensiveTree />`。
> 但在範例二，顏色style是在最外層的`<div>`，這個style不僅會影響到下拉式選單和“Display Selected Color”，也會影響到`<ExpensiveTree />`內文字的顏色。
> 下拉式選單onChange的時候，“Display Selected Color”這行文字，以及"I am a very slow component"的顏色都會跟著改變。

![](https://i.imgur.com/mMtBSj6.png)

> 但由於每一次重新渲染`<ExpensiveTree />`實在是太耗能了，要怎麼做，才能讓`<ExpensiveTree />`內的字體顏色跟著改變，但`<ExpensiveTree />`本身不會重新渲染呢？

```jsx{4}
function Default() {
  const [color, setColor] = React.useState("red");
  return (
    <div style={{ color: color }} className="App-wrapper">
      <select onChange={(e) => setColor(e.target.value)}>
        <option value="red" default>
          red
        </option>
        <option value="yellow">yellow</option>
        <option value="blue">blue</option>
      </select>
      <p>Display Selected Color</p>
      <ExpensiveTree />
    </div>
  );
}
```

看似`<Default />`內的所有元件都跟state有關連，這下子非得用memo不可了吧？

### 解法：把部分內容往上移

這裡的所有的DOM元件看似都受到`color`的影響，但仔細觀察，不論怎麼update，`<ExpensiveTree />`跟文字`<p>`的DOM元件是不需要改變的。

解決方式一樣是把相互依賴的state和DOM元件獨立搬出去，但這次是「往上移」：
```jsx{4,7}
function Default() {
  return (
    <div className="App-wrapper">
      <ColorPicker>
        <p>Display Selected Color</p>
        <ExpensiveTree />
      </ColorPicker>
    </div>
  );
}

function ColorPicker({ children }) {
  const [color, setColor] = React.useState("red");
  return (
    <div style={{ color: color }}>
      <select onChange={(e) => setColor(e.target.value)}>
        <option value="red" default>
          red
        </option>
        <option value="yellow">yellow</option>
        <option value="blue">blue</option>
      </select>
      {children}
    </div>
  );
}
```
把相互依賴的state和下拉式選單往上移，成為獨立的父層`<ColorPicker />`，而文字`<p>`和`<ExpensiveTree />`則成為`<ColorPicker />`的children。

由於`<ColorPicker />`唯一的`props` - `children`保持不變，所以React不會重新渲染這個`children`。
既然`children`不會重新渲染，`<ExpensiveTree />`當然也不會重新渲染了。

<iframe src="https://codesandbox.io/embed/after-reading-before-you-use-memo-u621r?fontsize=14&hidenavigation=1&initialpath=%2Fsolution02&module=%2Fsrc%2FSolution02.js&theme=dark"
	style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
	title="after-reading-before-you-use-memo"
	allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
	sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[![Edit after-reading-before-you-use-memo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/after-reading-before-you-use-memo-u621r?fontsize=14&hidenavigation=1&initialpath=%2Fsolution02&module=%2Fsrc%2FSolution02.js&theme=dark)

## 所以，用memo不好嗎？

用`memo`當然沒有不好，只是`memo`畢竟也是個判斷的函式，用React天生的機制來設計元件，少跑一段`memo`，看起來不是更「自然」嗎？

此外，理解這兩種作法，會讓自己在設計元件時，更能注意到是否產生不必要的渲染。將state和相互影響的程式區段放在同一個Component，在讀code時會更容易理解資料流，或甚至未來上傳雲端做成私有套件的時候也更容易些。

## Summary
1. 將相互依賴的state和程式區段獨立成一個Component，能避免其他不受影響的元件進行不必要的渲染。
2. 獨立成一個Component的思路有兩個：把state往下移，成為獨立的子元件 ; 或把部分內容往上移，成為一個獨立的父層。
3. 如果上述兩種方法都不足以解決效能問題，再使用`React.memo`

## Reference
* [Before You memo()](https://overreacted.io/before-you-memo/) 作者 - [Dan Abramov](https://mobile.twitter.com/dan_abramov)