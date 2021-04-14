---
id: 20200130A
slug: /react_component_patterns_2
subject: React共用Component的設計模式
title: Function as children
date: 2020-01-30T1:00:00Z
description: 僅是一個小小的元件，一個span或一個div，都要用Consumer包起來嗎？到處建立Context會不會很難管理？因此，以function作為children（Function as children），是個更有彈性的選擇
tags:
  - React Component Patterns
  - React
headerImage: "https://imgur.com/vOpiMtK.jpg"
templateKey: blog-post
---
上一章我們提到，`React.Children.map()`及context都可以將父容器的資料傳下去給子元件。
尤其context更具有彈性，不論UI有任何改動，只要正確使用Provider與Consumer，都可拿到父容器的資料。

但僅是一個小小的元件，一個span或一個div，都要用Consumer包起來嗎？到處建立Context會不會很難管理？如果專案還沒升到React 16，是不是非得要用`Children.map()`呢？

因此，以function作為children（Function as children），是個更有彈性的選擇。

## 2. Function as children 父爸爸的大秘寶都告訴你了，兒子請自取吧
| 使用場景：父容器想將state和handler傳給一等親內的子元件們（而不是想傳給孫子輩或曾孫輩的），且想保有子元件的重組彈性。

children是一個prop，當然也可以指定它為function。因此，我們可以很輕易做到下列場景:

```jsx{2-7,11,21-23}
class Parent extends Component{
	const getAllStatesAndHelpers = () => {
		return {
			...this.props,
			...this.state
		}
	}
	render(){
		return (
			<div>
				{this.props.children(getAllStatesAndHelpers())}
			</div>
		);
	}
}

class LoadContent extends Component{
	render(){
		return (
			<Parent>
				{(data) => {
					// some components
				}}
			</Parent>
		);
	}
}
```
父元件將需要傳遞下去的資料，當作**參數**傳給`children`。非常符合撰寫js的思考習慣。

以下是我在實務上的應用場景，可搭配CodeSandbox的範例一起看：
<iframe src="https://codesandbox.io/embed/reviewofadvancedcomponents-flyrb?fontsize=14&hidenavigation=1&initialpath=%2Frender_props%2F01&module=%2Fsrc%2Fexamples%2F05.js&theme=dark"
	style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
	title="reviewOfAdvancedComponents"
	allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
	sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[![Edit reviewOfAdvancedComponents](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/reviewofadvancedcomponents-flyrb?fontsize=14&hidenavigation=1&initialpath=%2Frender_props%2F01&module=%2Fsrc%2Fexamples%2F05.js&theme=dark)

> 範例說明:
> 這是一個頁面樣板，
> 標題、Cards區域、Main區域可能會塞不同的內容，
> 因此在設計樣板時需要更多的彈性

![](https://i.imgur.com/su2MJPz.png)

> 除了各區域會塞不同內容之外，
> Cards右上方的沙漏，點擊後，會出現彈出視窗，作為filter之用

![](https://i.imgur.com/A871CZS.png)

> 彈出視窗點擊OK後，畫面上方會出現藍色的「過濾條件列」。
> Cards Section和Main Section需要往下移動固定的高度

![](https://i.imgur.com/c8blybe.png)

不論Cards區域和Main區域的內容會如何變化，有幾個操作功能是保持不變的。

1. 一定有彈出視窗
2. 一定有藍色的「過濾條件列」

設計的模板要提供 handleFunction 和 boolean 值給幾個 Cards 區域，Main區域，和彈出視窗。
讓所有 children 有一致的變化。

![](https://i.imgur.com/xAIIMwL.png)

下方是畫面主要程式碼：

模板`<Template />`將 children 們所需的 state 以及 handler function，開放性的傳給所有 children。children 具有非常開放的組合性。
```jsx
<Template isShowFilterConditionRow={filterList.length > 0}>
  {({
    isShowFilterModal, // 是否顯示彈出視窗
    handleToggleFilterModal, // 開關彈出視窗
    isShowFilterConditionRow // 是否顯示藍色的「過濾條件列」
  }) => (
    <>
			{/* 標題 */}
			<Title pageTitle="Title" cardListTitle="Cards" totalCards={0} />
			{/* 過濾條件列 */}
			<FilterConditionRow
				tagList={filterList}
				handleClose={this.handleRemoveTags}
			/>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				{/* 卡片欄 */}
				<CardsColumn
					isShowFilterConditionRow={isShowFilterConditionRow}
					handleToggleFilterModal={handleToggleFilterModal}
				>
					Cards Section
				</CardsColumn>
				{/* 主內容 */}
				<MainColumn>Main Section</MainColumn>
				{/* 彈出視窗 */}
				<FilterModal
					isShowFilter={isShowFilterModal}
					handleToggleFilterModal={handleToggleFilterModal}
					handleConfirmClick={this.handleFilterClick}
				>
					Modal Content
				</FilterModal>
			</div>
    </>
  )
</Template>
```

接著參考搭配模板`<Template />`的程式碼：
`<Template />`只做幾件事：
1. 保存「是否顯示彈出視窗」的state
2. 修改 state 的 handler function
3. 把 children 所需的工具打包後傳給 children

```jsx
const Template = ({ isShowFilterConditionRow = false, children }) => {
  const [isShowFilterModal, setIsShowFilterModal] = useState(false);
  
  const handleIsShowFilterModal = () => {
    setIsShowFilterModal(!isShowFilterModal);
  };
  const getStateAndHelpers = () => {
    return {
      isShowFilterModal: isShowFilterModal, // 是否顯示彈出視窗
      handleToggleFilterModal: handleIsShowFilterModal, // 開關彈出視窗
      isShowFilterConditionRow: isShowFilterConditionRow // 是否顯示藍色的「過濾條件列」
    };
  };
  return (
    <div className="page-default-margin threeColTemplate">
      {children(getStateAndHelpers())}
    </div>
  );
};
```
以往碰到這種 過濾列、卡片列、主內容、彈出視窗等「平行層級」的元件要「互相溝通」時，都要在如同`<OnePage />`的上層元件寫一堆handler，改變`<OnePage />`的state，才能影響這些「平行層級」的兄弟姊妹。於是，state和props的資料流就會顯得非常混亂。
![](https://i.imgur.com/9kaUZTi.png)
現在採用Function as children的型式，將部分功能下放到`<Template />`，讓資料流顯得更為清晰。
![](https://i.imgur.com/c2oDnpo.png)

若僅是父容器想將state和handler傳給子元件（而不是想傳給孫子輩或曾孫輩的），那麼Function as children會是個很輕巧的選擇。傳給`children`的物件（getStateAndHelpers）保有擴充的空間，也不影響children內容的彈性。

## Summary
1. Function as children適合的使用場景：父容器想將state和handler傳給一等親子元件們（而不是想傳給孫子輩或曾孫輩的），且想保有子元件的重組彈性。
2. 父容器將需要傳遞下去的state和function，打包成一個物件，當作參數傳給children。物件的型式保有了屬性擴充的可能性。
