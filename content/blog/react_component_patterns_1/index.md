---
id: 20191229J
slug: /react_component_patterns_1
subject: React共用Component的設計模式
title: Compound Components
date: 2019-12-29T1:00:00Z
description: 工作上收到設計稿時，我習慣先和組員討論，哪些元件有可能會被重複使用？由於最近上頭同意大幅重構，在後台系統的頁面有87%元件是相似的情況下，同事組裝元件的方式也大同小異，他們希望我為主畫面設計一個Template，減少拼裝元件的時間。
tags:
  - React Component Patterns
  - React
headerImage: "https://imgur.com/vOpiMtK.jpg"
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
在團隊都不清楚哪些元件比較容易被重複使用，可能有哪些變化的情況下，我習慣先將元件拆得比較小，從最小的Component開始做起（例如Button/資訊卡），再接著做比較大的容器(例如Modal/標籤頁)，請同事自己將元件拼裝成他們需要的頁面。
在有技術債包袱的專案中，我無法要求團隊重構骨架，只能先刻好元件，並提供適當的接口，以"*先研究不傷身體，再講求效果*"的精神替換元件。

由於最近上頭同意通盤整理元件，在後台系統的頁面有 87%元件是相似的情況下，同事組裝元件的方式也大同小異，他們希望我為主畫面設計一個 Template，減少拼裝元件的時間。

設計一個Template，在初心者眼中會是這樣子↓

```jsx
<PageOne
	title="title"
	subTitle="subTitle"
	lists=[]
	contentTitle="contentTitle"
	prop={}
	anotherProp={}
	// ...
>
	{children}
</PageOne>
```
把需要的資料都用props傳進Component就好了惹～

但這樣會有幾個顯而易見的問題：

1. 無法從外觀看出 Template 的用途，及其中的內容
2. props 過多，一旦調整其中一兩個 props，所有使用到的頁面也要跟著調整
3. 只容許一個 children 存在，除了產生"哪些是 props，誰才是 children"的大哉問之外，重構的彈性也很低。

為了能做出更具彈性的Component，我在egghead發現了Kent C. Dodds這位大神，他提供了幾個 react 設計模式的建議。

## 1. Compound Components 父親與它的 static 孩子們

使用場景：父容器與子元件有緊密的關係。如`<ul></ul>`與`<li></li>`之間的關係。

> 範例說明:
> 這是一組`<select>`跟`<option>`的下拉式選單，
> 符合「**filterOption**顯示條件」的項目才會出現在選單中，其它項目必須隱藏。
> 在這個範例中，只有 title 為「manager」的員工才可出現在下拉式選單中。
> 父容器將**filterOption**傳給每個子元件(static Option)，由子元件判斷要 render 哪些選項。符合的話則 render `<option></option>`，不符合則 return null。

![](https://i.imgur.com/9StCicQ.png)

```jsx
<CustomSelect
	label="Manager"
	placeholder="Please select a manager"
	defaultValue=""
	filterOption={{
		key: "title",
		value: "manager"
	}}
>
	{stuffList.map((option) => (
		<CustomSelect.Option element={option} key={option.name}>
			{option.name}
		</CustomSelect.Option>
	))}
</CustomSelect>
```

### 方法 1. React 16 以下，可用 React.Children.map()將父容器的資料，傳遞給每個子元件。

<iframe
	src="https://codesandbox.io/embed/unruffled-johnson-flyrb?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Fcompound_components%2F01&module=%2Fsrc%2Fexamples%2F01.js&theme=dark"
	style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
	title="reviewOfAdvancedComponents"
	allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
	sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

以下節錄關鍵程式碼：
```jsx{11-14}
class CustomSelect extends React.Component {
	render(){
		
		const { label, placeholder, defaultValue, filterOption } = this.props;
		
		return (
			<select defaultValue={defaultValue}>
				<option value="" disabled>
					{placeholder}
				</option>
				{React.Children.map(this.props.children, (childElement) =>
					React.cloneElement(childElement, {
						filterOption // 想傳給每個子元件的資料
					})
				)}
			</select>  
		);
	}
}
```

React.Children.map 的缺點是，它是用 for 迴圈的方式，將父容器的資料以 props 傳給**第一層**的子元件。只要目標元件被一層`<div>`包住，資料將會注入第一層的`<div>`，從而導致目標元件拿不到資料的情況。因此目標元件的修改彈性是比較低的。範例如下：

```jsx{12,18}
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
				{/* 在 CustomSelect 外面再包一層 */}
				{/* CustomSelect將無法拿到父容器的filterOption */}
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

以下節錄關鍵程式碼：
```jsx
const SelectContext = createContext();
```
```jsx{14,16}
class CustomSelect extends React.Component {
  render(){
    
    const { label, placeholder, defaultValue, filterOption } = this.props;
    
    return (
      <>
        <label>{`${label} : `}</label>
        <select defaultValue={defaultValue}>
          <option value="" disabled>
            {placeholder}
          </option>
          {/* 想傳給每個子元件的資料 */}
          <SelectContext.Provider value={{ filterOption: filterOption }}>
            {this.props.children}
          </SelectContext.Provider>
        </select>
      </>
    );
  }
}
```
```jsx{2-3,8-9}
static Option = ({ children, element }) => (
	<SelectContext.Consumer>
		{({ filterOption }) => {
			const { key, value } = filterOption;
			return element[key] === value ? (
				<option value={children}>{children}</option>
			) : null;
		}}
	</SelectContext.Consumer>
);
```

context API 的優點是，可將 state/props/function 等資料，放進 Provider。
包在 Provider 當中的任何 children，即便是孫子/曾曾曾孫，只需透過 Consumer，都可以取得父容器傳遞下來的資料。 

#### 優化 Context.Consumer 的渲染

Provider 所提供的 value 一旦改變，所有的 Consumer 都會重新render。
若 value 是 object，則更要注意 object 是否參考同一個refernece。

> 範例說明:
> 這次，CustomSelect 除了下拉式選單之外，還多了一個打勾回饋。
> 只要下拉式選單 onChange，都會setState並且顯示打勾Icon，表示選擇完成。
> 然而，只要元件setState，所有的`<option>`都會重新render。
> 在其他條件不變的情況下，如何如何避免 Consumer 進行無意義的 re-render？

```jsx{17}
<span>
	<label>{`${label} : `}</label>
	<select
		style={{ width: 400 }}
		defaultValue={defaultValue}
		onChange={this.handleSelectChange}
	>
		<option value="" disabled>
			{placeholder}
		</option>
		{/* 想傳給每個子元件的資料 */}
		<SelectContext.Provider value={{ filterOption: filterOption }}>
			{this.props.children}
		</SelectContext.Provider>
	</select>
	{/* 打勾Icon，表示選擇完成 */}
	{isSelected && <GreenCheckIcon />}
</span>
```

<iframe  src="https://codesandbox.io/embed/reviewofadvancedcomponents-flyrb?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Fcompound_components%2F03&module=%2Fsrc%2Fexamples%2F03.js&theme=dark"
	style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
	title="reviewOfAdvancedComponents"
	allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
	sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

若 CustomSelect 因為 setState 重新渲染，Context.Provider的value 會指向新的 reference，造成 Context.Consumer 重新渲染。

```jsx{2}
{/*每次render，value都是新的物件*/}
<SelectContext.Provider value={{ filterOption: filterOption }}>
  {this.props.children}
</SelectContext.Provider>
```

讓value指向this.state.contextValue後，即便`<CustomSelect />`重新渲染，Consumer**不會**跟著重新渲染。

```jsx{3-5,9}
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
Context.Provider搭配Context.Consumer是個很強大的組合，只要適當地管理，能讓包在 Provider 當中的任何 children，即便是孫子/曾曾曾孫，都可以取得Provider提供的資料。

然而，若僅是打算將父容器的資料傳給「一等親」的子元件，並未打算傳給曾曾曾孫的話，使用Context真是太才小用了。
要先createContext，還要建立Provider/Consumer，更要去注意Context是否有濫用的傾向，就僅僅是一個小小的元件而言，這開發成本實在是太高了。

因此，下一章會提到更有彈性的Function as children。

## 本章結論
1. 元件的設計需考慮到「容易維修，可重新組裝」的原則。
2. 建立Context的優點是，可將 state/props/function 等資料，包裹在 Context.Provider的value屬性當中。
3. 子元件若需要資料，須透過Context.Consumer，包在Context.Consumer當中。
4. Provider 的任何 children，即使是曾曾曾孫，只需透過 Context.Consumer，都可以取得Context.Provider的資料。 
5. 在class component當中，Context.Provider的value若是物件，可將物件的reference儲存在state裡面，優化Context.Consumer的渲染。
6. 由於Context可作為global state使用，須謹慎維護。若僅是「一等親」的父子元件共用資料，選擇Function as children的方式會更好維護。
