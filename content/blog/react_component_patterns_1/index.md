---
id: 20191229J
slug: /react_component_patterns_1
subject: React共用Component的設計模式
title: Compound Components
date: 2019-12-29T1:00:00Z
description: 工作上收到設計稿時，我習慣先和組員討論，哪些元件有可能會被重複使用？由於最近上頭同意大幅重構，在後台系統的頁面有87%元件是相似的情況下，同事組裝元件的方式也大同小異，他們希望我為主畫面設計一個Template，減少拼裝元件的時間。
tags:
  - React
  - React Component Patterns
headerImage: "https://imgur.com/TYdA1P9.jpg"
templateKey: blog-post
---
初學 React 時，只會用一種方式嵌套多個 Component：從最大的 Component，包住較小的 Component，像是 N 層俄羅斯娃娃一般。

```jsx
<App>
  <Header />
  <Body>
    <Nav>
      <Ul>
        <Items />
      </Ul>
    </Nav>
    <Main>
      <Title />
      <Content />
    </Main>
  </Body>
  <Footer />
</App>
```

工作上收到設計稿時，我習慣先和組員討論，哪些元件有可能會被重複使用？
我習慣從最小的Component開始做起，接著做比較大的容器，再請組員們自己將Component組合成他們需要的頁面。
在有技術債包袱的專案中，我無法要求組員重構骨架，只能刻好Component、提供適當的接口，以"*先研究不傷身體，再講求效果*"的精神替換元件。

由於最近上頭同意大幅重構，在後台系統的頁面有 87%元件是相似的情況下，同事組裝元件的方式也大同小異，他們希望我為主畫面設計一個 Template，減少拼裝元件的時間。

設計一個 Template，在初心者眼中會是這樣子 ↓

```jsx
<PageOne
    title="title"
    subTitle="subTitle"
    lists=[]
    contentTitle="contentTitle"
    prop={}
    anotherProp={}
    ...>
    {children}
</PageOne>
```

把需要的資料都用props傳進Component就好了惹～
但這樣會有幾個顯而易見的問題：

1. 無法從外觀看出 Template 的用途，及其中的內容
2. props 過多，一旦調整其中一兩個 props，所有使用到的頁面也要跟著調整
3. 只容許一個 children 存在，除了產生"哪些是 prop，誰才是 children"的大哉問之外，重構的彈性很低。

Kent C. Dodds 在前端教學網站 egghead 提供了幾個 react 設計模式。

## 1. Compound Components 父親與它的 static 孩子們

使用場景：父容器與子元件有緊密的關係。如`<ul></ul>`與`<li></li>`之間的關係。

> 範例說明:
> 這是一個組`<select>`跟`<option>`的下拉式選單，
> 符合**filterOption**顯示條件的項目才會出現在選單中，其它項目必須隱藏。
> 在這個範例中，只有 title 為"manager"的員工才可出現在選擇清單中。
> 父容器將**filterOption**傳給每個子元件(static Option)，由子元件判斷是否要 render 該項目。符合的話則 render `<option></option>`，不符合則 return null。

### 方法 1. React 16 以下，可用 React.Children.map()將父容器的資料，傳遞給每個子元件。

<iframe
     src="https://codesandbox.io/embed/unruffled-johnson-flyrb?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Fcompound_components%2F01&module=%2Fsrc%2Fexamples%2F01.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reviewOfAdvancedComponents"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

React.Children.map 的缺點是，它是用 for 迴圈的方式，將父容器的資料以 props 傳給**第一層**的子元件。只要其中一個子元件被一層`<div>`包住，資料將會注入第一層的`<div>`，而非該元件。範例如下：

```jsx
return (
  <CustomSelect // 父容器
    label="Manager"
    placeholder="Please select a manager"
    defaultValue=""
    filterOption={{
      key: "title",
      value: "manager",
    }}
  >
    {stuffList.map(option => (
      <div>
        {" "}
        {/* 在 CustomSelect 外面再包一層 */} {/* CustomSelect將無法拿到父容器的filterOption */}
        <CustomSelect.Option element={option} key={option.name}>
          {option.name}
        </CustomSelect.Option>
      </div>
    ))}
  </CustomSelect>
)
```

### 方法 2. React 16.0 以上。有好用的 context API 將父容器的資料傳遞給子元件

<iframe
     src="https://codesandbox.io/embed/unruffled-johnson-flyrb?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Fcompound_components%2F02&module=%2Fsrc%2Fexamples%2F02.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reviewOfAdvancedComponents"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

context API 的優點是，可將 state/props/function 等資料，放進 Provider。
包在 Provider 當中的任何 children，只需透過 Consumer，都可以取得父容器傳遞下來的資料。

#### 優化 Context.Consumer 的渲染

Provider 所提供的 value 一旦改變，所有的 Consumer 都會重新渲染元件。
若 value 是 object，更要注意 object 是否參考同一個記憶體(refernece)。

> 範例說明:
> CustomSelect 除了下拉式選單之外，還多了一個打勾的 Icon。
> 每一次下拉式選單 onChange，都會重新 setState。
> 但 filterOption(title 為"manager"的員工)仍然保持不變。
> 在 filterOption 不變的情況下，如何避免 Consumer 進行無意義的 re-render。

<iframe  src="https://codesandbox.io/embed/reviewofadvancedcomponents-flyrb?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Fcompound_components%2F03&module=%2Fsrc%2Fexamples%2F03.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reviewOfAdvancedComponents"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

若 CustomSelect 因為 setState 重新渲染，value 將指向新的 reference，造成 Consumer 重新渲染。

```jsx
<SelectContext.Provider value={{ filterOption: filterOption }}>
  {this.props.children}
</SelectContext.Provider>
```

讓 value 指向 this.state.contextValue 後，即便 CustomSelect 重新渲染，Consumer**不會**跟著重新渲染。

```jsx
class CustomSelect extends React.Component {
  state = {
    contextValue: {
      filterOption: this.props.filterOption,
    },
  }
  render() {
    return (
      <SelectContext.Provider value={this.state.contextValue}>
        {this.props.children}
      </SelectContext.Provider>
    )
  }
}
```

下一章會提到更有彈性的 Render Props
