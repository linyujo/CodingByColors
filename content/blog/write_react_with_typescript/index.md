---
id: 20200813A
slug: /write_react_with_typescript
subject: React
title: React With TypeScript
date: 2020-08-13T17:20:00.000Z
description: 用 TypeScript 寫 React
tags:
 - React
 - TypeScript
headerImage: "https://imgur.com/9hZmqkp.jpg"
templateKey: blog-post
---
> Photo by <a href="https://unsplash.com/@trine?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Katrin Hauf</a> on <a href="https://unsplash.com/s/photos/paper?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

create-react-app 官方有個 TypeScript 初始化懶人包，我們將透過 command line 下載懶人包，並將專案命名為 typescript-react-textbook。

```bash
$ npx create-react-app typescript-react-textbook --template typescript
$ cd typescript-react-textbook
```

對熟悉React的人來說，TypeScript懶人包的資料夾結構與一般的js懶人包沒有太大的差別。除了
> `.js`檔變成`.tsx`檔
> 多了一個typescript設定檔`tsconfig.json`

在做任何改動之前，先把專案跑起來，看能否正常啟動：
```bash
$ yarn start || npm start
```

## 自訂一個元件

接下來要練習，如何用TypeScript製作一個共用元件，並在`App.tsx`當中使用。
以下會將游標框起來的部分，做成一個共用的`<Link />`元件。

![](https://i.imgur.com/cBshQGQ.png)

在`src`目錄下新建一個`Components`的資料夾，並新增`Link.tsx`的檔案。
我們先不管型別，一如往常的新建一個functional component。

```tsx
/*
 * src/Components/Link.tsx
 */

import React from 'react';

const Link = ({
	href,
	content
}) => {
  return (
    <a
      className="App-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
};

export default Link;
```
此時編輯器可能會出現紅色毛毛蟲的警示線，我們先不要理它。
回到`App.tsx`，import 這個元件。

![](https://i.imgur.com/CIbSmwt.png)
Oops，只是import而已，瀏覽器就跳出錯誤訊息。

### 預設的型別:any<a name="default_type_any"></a>
![](https://i.imgur.com/bUcQqQq.png)

> Binding element 'href' implicitly has an 'any' type.

意思是：你尚未指定href這個props的型別，你是否預設它的型別是any？

`any`是TypeScript的型別之一。不論這個變數是什麼，我都吃！
不過any根本違反了使用強型別的理由，除非你在定義時說清楚「我就是要用any」，否則TypeScript會跳出錯誤來提醒你。

我們確實可以敷衍過去，將所有的型別設為`any`，編譯器也會放你一馬。

```tsx{6-7}
/*
 * src/Components/Link.tsx
 */

const Link = (props: {
    href: any;
    content: any;
}) => {
  return (
    <a
      className="App-link"
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.content}
    </a>
  );
};
```
等等，既然大家都是`any`，何苦學TypeScript來為難自己呢 T_T？

`any`存在的意義，是讓人在萬不得已的情況下使用。例如有些變數，我們無法預期它會接到什麼值。
```javascript
const param = JSON.parse(someData);
```

既然要使用TypeScript，除了特殊案例以外，就請確實的定義型別吧！

```tsx{6-7}
/*
 * src/Components/Link.tsx
 */

const Link = (props: {
    href: string;
    content: string;
}) => {
  return (
    <a
      className="App-link"
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.content}
    </a>
  );
};
```
<div class="alert alert-info">
Tips :point_right: <a href="#declare-object" target="__blank" class="jump-link">如何宣告型別為Object？</a>
</div>
<div class="alert alert-info">
Tips :point_right: <a href="#declare-function" target="__blank" class="jump-link">如何宣告function？</a>
</div>

### React內建的props怎麼定義型別<a name="how_to_define_react_defualt_props"></a>

props.children是我們在建立元件時，很常用到的變數。
children怎麼定義型別呢？React官方已經幫我們準備好了。
以Functional Component來說，官方有提供`React.FunctionComponent<Props>`方便開發者使用，
可以簡寫為`React.FC<Props>`。
在`React.FC<Props>`當中，官方已經幫我們定義好`children`, `displayName`, `defaultProps`等屬性的型別。
只要標示元件的型別為`React.FC<Props>`，即可省去定義這些預設屬性的麻煩。

```tsx{5,10}
/*
 * src/Components/Link.tsx
 */

const Link: React.FC<{
    href: string;
    content: string;
}> = (props) => {

    const { children } = props;
    
    return (
        <a
          className="App-link"
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.content}
        </a>
    );
};
```
對熟悉強型別語言的人來說，`<>`一點都不陌生，就是**泛用型別**，簡稱**泛型**。
它的使用情境是：**這個Function所帶入的參數，型別可能有所不同**。
有時候參數是number，也可能是string，某一天也可能是Object。
**反正我不想把這個變數的型別定死**，用到的時候再設定它的型別就可以了。
使用者只要在`<>`角括號裡面，填入你這次要檢查的型別即可。
例如`<string>`，`<number>`等等。

```typescript{2}
// Type = set_the_Type_you_want
function aFuncReturnInput<Type>(input: Type): Type {
  return input;
}

const isNumber = aFuncReturnInput<number>(30);
const isString = aFuncReturnInput<string>('A Loooooooooog Word');
```
因此，`const Link: React.FC<{}>`的意思是：我宣告了一個React元件`Link`，其參數（props）的型別是Object。
在Object裡面，再去詳細定義有哪些必要 / 非必要的key-value。

```tsx{1-3}
const Link: React.FC<{
    href: string;
    content: string;
}> = (props) => {
    return ();
}
```

<div class="alert alert-info">
Tips :point_right: <a href="#declare-object-requireOrNot" target="__blank" class="jump-link">何宣告物件裡，必填/非必填的屬性？</a>
</div>

#### 抽象化的型別 Type Alias

如過你覺得props的key實在太多了，程式碼不美觀，也可以採用"抽象化型別"的方式來宣告props。

```tsx{1-4}
type LinkProps = {
	href: string;
	content: string;
};

const Link: React.FC<LinkProps> = (props) => {
  return ();
}
```
<div class="alert alert-info">
Tips :point_right: <a href="#declare-type-alias" target="__blank" class="jump-link">如何抽象化常用的物件，自定義型別？</a>
</div>

### 使用元件

到目前為止，我們終於用Typescript完成一個基礎元件。
回到一開始的目標，我們要將HTML的`<a>`標籤，取代成自訂的`<Link>`元件。
![](https://i.imgur.com/91Pue7G.png)

之前提到，Typescript會檢查必填/非必填的屬性，若是少了必填的屬性，編輯器會出現紅色毛毛蟲提醒你。
![](https://i.imgur.com/vuGp7Id.png)

## Summary
此章節學到了：
1. <a href="#default_type_any" target="__blank" class="jump-link">在尚未定義型別之前，Typescript預設的隱含型別為any</a>
2. <a href="#declare-function" target="__blank" class="jump-link">宣告Function的方式</a>
3. <a href="#declare-object" target="__blank" class="jump-link">宣告物件的方式</a>
4. <a href="#how_to_define_react_defualt_props" target="__blank" class="jump-link">使用`React.FC<Props>`來宣告Functional Component</a>
5. <a href="#declare-type-alias" target="__blank" class="jump-link">將常用的物件抽象化，自訂型別</a>

## 附件 Attachment

### 型別宣告

#### 宣告 - 物件<a name="declare-object"></a>

宣告一個"貓"物件，必填屬性有3個。分別是name，gender，age：
```tsx{1}
const cat: { name: string; gender: string; age: number } = {
  name: 'mimi',
  gender: 'female',
  age: 3
};
```

宣告一個"貓"物件，屬性name，gender為必填，age為非必填：<a name="declare-object-requireOrNot"></a>
```tsx{4}
const cat: { 
    name: string;
    gender: string;
    age?: number; // 在 key 後面加上 ? 表示該屬性非必填
} = {
  name: 'mimi',
  gender: 'female'
};
```

#### 宣告 - Function<a name="declare-function"></a>

宣告一個函式plus，有兩個參數，分別為x, y。x, y的型別皆為數字。
plus會回傳x + y的總和，回傳值也是數字：
```tsx{1}
const plus = (x: number, y: number): number => {
  return x + y;
};
plus(5, 5); // 10
```

將上面的函式plus，改成只有一個參數obj。
obj是一個物件，有兩個key，分別為x, y。
回傳值同樣為x + y的總和：
```tsx{1-4}
const plus = (obj: {
    x: number;
    y: number;
}): number => {
  return x + y;
};
plus(5, 5); // 10
```

同上，將參數以解構賦值（object destructuring assignment）的方式來撰寫：
```tsx{1}
const plus = ({x, y}: { // 將obj直接展開為{x, y}
    x: number;
    y: number;
}): number => {
  return x + y;
};
plus(5, 5); // 10
```

有些function只是執行某個工作，並不會有回傳值。
沒有回傳值時，宣告的方法如下：
```tsx{4}
const doSomething = ({x, y}: {
    x: number;
    y: number;
}): void => { // 沒有回傳值: void
    console.log(x, y);
}
doSomething({5, 5});
```

#### 宣告 - 自訂抽象化的型別 Type Alias<a name="declare-type-alias"></a>
當專案越來越大的時候，我們會發現，有些屬性會重複出現，例如：
![](https://i.imgur.com/4XEXDuS.png)

當其他物件要使用同一個商品，我們又要把所有屬性複製貼上：
![](https://i.imgur.com/luu0hof.png)

Typescript可以把重複的部分抽出來，自己定義一個型別。
```tsx
type Book = {
  title: string;
  author: string;
  publicationDate: string;
  publisher: string;
  cover: string;
  editor: string;
};
```
這個型別即可重複使用。如果哪天，商品的欄位增加了，會更容易修改程式碼。
```tsx{1}
const Item: React.FC<Book> = (props) => {
  return (
    <div className="item"></div>
  );
};
```