---
id: 20200314A
slug: /react_component_patterns_3
subject: React共用Component的設計模式
title: Prop Getters and Render Props
date: 2020-03-14T20:15:00.000Z
description: 僅是一個小小的元件，一個span或一個div，都要用Consumer包起來嗎？到處建立Context會不會很難管理？因此，以function作為children（Function as children），是個更有彈性的選擇
tags:
  - React Component Patterns
  - React
headerImage: "https://imgur.com/dVSlruh.jpg"
templateKey: blog-post
---
> Photo by <a href="https://unsplash.com/@helloimnik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Hello I'm Nik</a> on <a href="https://unsplash.com/s/photos/lego?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

上一章提到，父容器可以把state和handlers作為參數，傳給children。
這一章則要進一步說明，如果children當中，有部分的元件與父容器的相依性很高，例如要呼叫父容器的function進行一連串動作，那麼父容器與子元件之間該如何合作，以最少的程式碼降低元件之間的耦合度。

## 3. Prop Getters and Render Props 父爸爸的大秘寶怎麼用，更好用
| 使用場景：在父容器的children當中，有部分的子元件會呼叫父容器的function作一系列的動作，這種子元件與父容器的相依性很高。

以下是我在實務上的應用場景：

> 範例說明:
> 這是一個彈出視窗，裡面可能有多個下拉式選單。
> 下拉式選單具有「多選」的功能。

![](https://i.imgur.com/tJUn2kU.png)

> 下拉式選單的右邊，有個漏斗的按鈕。點擊後，會彈出第二個彈出視窗。

![](https://i.imgur.com/U5J51QN.png)

> 第二個彈出視窗的主要功能，是讓使用者可以選擇「區間」。例如編號1號～5號，20號～30號，以此類推。

![](https://i.imgur.com/Nb3ywVg.png)

> 選擇完區間後，按下「OK」，方才選擇的區間項目就會出現在下拉式選單上。

![](https://i.imgur.com/6dy7Zoj.png)

每個沙漏按鈕，都會彈出「區間選擇視窗」，並將選定的區間交還給最初的下拉式選單。差別只在於List的不同。
因此，這種重複性的邏輯，就交給彈出視窗的元件統一處理。
![](https://i.imgur.com/jwms5Dp.png)

按照上一章的思路，<FilterModal />可以把handlers打包在一起，傳給children，讓children自己去呼叫handlers。思路如下：

```jsx{10,27,30}
const FilterModal = () => {
  // ...
	const openChooseBtwModalHandler = (arr, ...props) => {
		// get array
		// get required info
		// open Modal
	}
	const getStateAndHelpers = () => {
		return {
			openChooseBtwModalHandler: openChooseBtwModalHandler
		};
	};
	return (
		<>
			<div className="modalContent">
				{children(getStateAndHelpers())}
			</div>
		</>
	);
}

 
const WrappedDemo = () => {
	// ...
	return {
		<FilterModal>
			{({ openChooseBtwModalHandler }) => (       
				// ...
				<Select />
				<Button onClick={() => openChooseBtwModalHandler({
					
					arr: list,
					// ...others
				})} />
			)}
		</FilterModal>
	}
}
```
先看`<WrappedDemo />`元件裡面，`<Button />`的部分。Button的onClick事件會呼叫由父容器`<FilterModal />`傳下來的`openChooseBtwModalHandler()`（打開區間選擇視窗）。呼叫後，交由`<FilterModal />`去處理內部的邏輯。

上面的思路沒什麼問題。

不過假如有一天，Button除了onClick事件，還需要透過邏輯判斷是否要disabled，或因為需要call其它API，在loading時增添CSS動畫。這麼一來，程式碼需要改的範圍就很大了，有多少個Button，就要改多少地方。

如果這個Button的功能，與父容器`<FilterModal />`的相依性很高，那麼更好的做法是，把Button的屬性，交給父容器去處理。思路如下：
```jsx{6,8-16,36,39-42}
const FilterModal = () => {
	// ...
	const toggleChooseBtwModal = () => {
		// open Modal
	}
	const getChooseBtwData = (arr, ...props) => {
		// return props for Button
		return {
			...props,
			onClick: () => {
				// do something after onClick
				toggleChooseBtwModal()
			}
			// ...other custom properties
			// ex: disabled={isDisabled}
		}
	}
	const getStateAndHelpers = () => {
		return {
			getChooseBtwData: getChooseBtwData
		};
	};
	return (
		<>
			<div className="modalContent">
				{children(getStateAndHelpers())}
			</div>
		</>
	);
}

const WrappedDemo = () => {
	// ...
	return {
		<FilterModal>
			{({ getChooseBtwData }) => (       
				// ...
				<Select />
				<Button {...getChooseBtwData({
					arr: list
					// ...others
				})} />
			)}
		</FilterModal>
	}
}
```
先看`<WrappedDemo />`元件裡面，`<Button />`的部分，會注意到Button在這裡並沒有顯示onClick的行為，只能看見`...getChooseBtwData()`掌管了Button的props。而`getChooseBtwData`這個方法是由父容器`<FilterModal />`所提供的。

接著往上看父容器`<FilterModal />`的程式碼，其中的函式`getChooseBtwData`回傳了onClick屬性。這裡保留了Button屬性的增減空間，例如增加disabled、style等屬性。

以下是本章節的範例程式碼：
<iframe src="https://codesandbox.io/embed/reviewofadvancedcomponents-flyrb?fontsize=14&hidenavigation=1&initialpath=%2Frender_props%2F02&module=%2Fsrc%2Fexamples%2F05.js&theme=dark"
	style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
	title="reviewOfAdvancedComponents"
	allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
	sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[![Edit reviewOfAdvancedComponents](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/reviewofadvancedcomponents-flyrb?fontsize=14&hidenavigation=1&initialpath=%2Frender_props%2F02&module=%2Fsrc%2Fexamples%2F05.js&theme=dark)

這種設計模式在Ant.Design的元件中時常看到，例如本章在CodeSandBox當中的範例程式碼05.js，可以看見Ant.Design的`getFieldDecorator`就是使用這種方式，既能增加套件的功能，又同時減少code farmer所需撰寫的程式碼。

## Summary
1. 如果父容器的children當中，有部分的元件與父容器有很高的相依性，例如要呼叫父容器的函式來進行一系列的動作，那麼，讓父容器直接掌管這個子元件的props，會是比較好的選擇。
2. 父容器可以return這類型的子元件所需要的props，透過render props傳給children。
3. 子元件可以用spread operator（...）將所需的props展開來，同時也可以增添特別規格的props，讓父容器一併執行。