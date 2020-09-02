---
id: 20190725r
slug: /jest_enzyme_unit_test_pure_component
subject: 用Jest和Enzyme寫React測試
title: 不用跟Redux連接的Component
date: 2019-07-25T12:00:00Z
description: 先寫測試程式，然後才實作功能，是最近發起的一種程式開發思維。無論是否百分之百實行測試驅動開發(TDD)，程序猿可以從中學習到如何撰寫好的自動化測試，怎樣設計軟體可以更模組化、更容易擴充，以及設計出好用的 API 介面。
tags:
  - React
  - Jest
  - Enzyme
headerImage: "https://imgur.com/Q0sxl2k.jpg"
templateKey: blog-post
---

## 測試範例

### 這是一個猜字遊戲

![尚未猜中的畫面](https://imgur.com/BmPects.jpg)
玩家在 Input 輸入框任意輸入單字，
下方表格會列出玩家曾輸入的所有單字，並提示 match 的字母有幾個。

![猜中的畫面](https://imgur.com/nPIQx5n.jpg)
玩家猜中單字後，原有的輸入框消失。顯示恭喜通關的文字。

## 所需要的 Components

- App.js
  root Component。包含 Input, GuessedWords, Congrats 三個 Components.

- Input
  輸入框 和 送出的 Button

- GuessedWords
  表格，列出玩家輸入的所有單字。

- Congrats
  顯示恭喜通關的文字。

## 所需要的 Redux State

- secretWord
  遊戲的答案，由 server 隨機提供。string。
- success
  玩家是否猜中了。boolean。

- guessedWords
  表格內容。包含"輸入的文字"與"match 的字母個數"。Array。
  ```
  {guessedWord: string, letterMatchCount: number}
  ```

## folder structure

    .
    ├── ...
    ├── App                               # 所有的Components
    │   ├── index.js
    │   ├── index.css
    │   ├── __tests__
    │   │    └── App.test.js              # App/index.js的測試
    │   ├── Congrates
    │   │    ├── index.js
    │   │    └── __tests__                # Congrates/index.js的測試
    │   ├── GuessedWords
    │   └── Input
    ├── Actions                           # 所有的Actions
    │   ├── __tests__
    │   │    ├── successAction.test.js    # 所有Actions的測試
    │   │    └── ...
    │   ├── successAction.js
    │   └── ...
    │ Reducers                            # 所有的Reducers
    │   ├── __tests__                     # 所有Reducers的測試
    │   │    ├── successReducer.test.js
    │   │    └── ...
    │   ├── successAction.js
    │   └── index.js
    │
    ├── utils
    │   └── testUtil.js                   # 測試工具放此
    │
    ≈

Boilerplate 使用 create-react-app。

App 是 root Component，底下包含 App 的所有 children，以及放置單元測試的資料夾**tests**。
每一個 children Component 裡面也有它自己的單元測試**tests**。

Actions 資料夾包含所有 Actions，其中**tests**放置所有 Actions 的測試。
Reducers 的結構同上。

以下會先從 App 底下的 Components 開始。

## 不用跟 Redux 連接的 Component

Congrats 和 GuessedWords 兩個 Component 會從父元件(App)接收 props，只要測試傳進來的 props 即可。

### Congrats

這個 Component 顯示恭喜通關的祝賀文字。

Unit Test 要測試的項目有：

- render 時沒有出現 Error
- 傳進來的 props 符合預期
- 當 props "success" 為 false 時，不要 render 成功訊息
- 當 props "success" 為 true 時，render 成功訊息

測試項目如下：

```javascript
*---------------------------------
* App/Congrates/__tests__/index.js
*---------------------------------

import React from 'react';
import { shallow } from 'enzyme';

import Congrates from '../index'; // 單元測試的Component

test('render時沒有出現error', () => {

});

test('當props"success"為false時，不要render成功訊息', () => {

});

test('當props"success"為true時，render成功訊息', () => {

});

test('傳進來的props型別都是正確的', () => {

});
```

#### 1) render 時沒有出現 error

判斷能否正確執行 render，最基本的方式是，檢查 dom 元件是否有被畫出來？
因此，我們會在 jsx 中的 HTML，加上測試用的 custom attribute `data-test="component-congrates"`。

```javascript
*---------------------------------
* App/Congrates/index.js
*---------------------------------

import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Congrates = ({
    isSuccess
}) => (
    <div data-test="component-congrates">
        {isSuccess &&
        <div>
            <Alert variant="success">恭喜猜對惹</Alert>
        </div>}
    </div>
);

export default Congrates;
```

在測試中，檢查 `data-test="component-congrates"` 的 div 是否被 render 出來。
思考順序如下：

1. 模擬渲染 Component。
   可以用 enzyme 的`shallow()`函式模擬 render。
2. 從模擬出來的 Component 中，找出是否有我們想要的 - 有 custom attribute 的物件？
   可以使用 enzyme 的`find()`函式找出目標物件。它會回傳一個 ShallowWrapper 物件，裡面包裹著所有找到的 nodes。
3. 找到的 Component 應只有 1 個。

```javascript
*---------------------------------
* App/Congrates/__tests__/index.js
*---------------------------------

import React from 'react';
import { shallow } from 'enzyme';

import Congrates from '../index'; // 單元測試的Component

// Component預設的props
const defaultProps = {
    isSuccess: false,
};

// 工具function，回傳模擬渲染出來的Component
const setup = (props = {}) => {
    // 傳進來的props取代預設的props
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Congrates {...setupProps} />);
};

// 工具function。在Component中找出指定的test attribute
const findByTestAttr = (wrapper, value) => wrapper.find(`[data-test="${value}"]`);

test('render時沒有出現error', () => {
    // 模擬出來的Component
    const wrapper = setup();
    // 尋找Component是否有指定的test attribute
    const component = findByTestAttr(wrapper, 'component-congrates');
    // 找到1個指定的test attribute
    expect(component.length).toBe(1);
});
```

#### 開始跑測試

`yarn test Congrates.test.js`

#### 2) 當 props"success"為 false 時，不要 render 成功訊息

跟上面 **1)render 時沒有出現 error** 的結構有 87%相似。
思考順序如下：

1. 渲染 Component。提供想模擬的 props `{ isSuccess: false }`
2. 從模擬出來的 Component 中，找出包著成功訊息物件的 HTML，其 attribute 為"message-congrates"
3. 因為當 props "success"為 false 時，不能 render 成功訊息，找到的 Component 應該是 0 個

```javascript
test('當props"success"為false時，不要render成功訊息', () => {
  const props = {
    isSuccess: false,
  }
  const wrapper = setup(props)
  const messageComponent = findByTestAttr(wrapper, "message-congrates")
  expect(messageComponent.length).toBe(0)
})
```

#### 3) 當 props"success"為 true 時，render 成功訊息

同上，只要將提供的 props 改為 true，並找到 1 個 Component 即可。
思考順序如下：

1. 渲染 Component。提供想模擬的 props `{ isSuccess: true }`
2. 從模擬出來的 Component 中，找出包著成功訊息物件的 HTML，其 attribute 為"message-congrates"
3. 當 props "success"為 true 時，需 render 成功訊息，找到的 Component 應該是 1 個

```javascript
test('當props"success"為false時，不要render成功訊息', () => {
  const props = {
    isSuccess: true,
  }
  const wrapper = setup(props)
  const messageComponent = findByTestAttr(wrapper, "message-congrates")
  expect(messageComponent.length).toBe(1)
})
```

完成上述 **2)** **3)** 項測試後，回到`App/Congrates/index.js`，在包裹著成功訊息的 div，補上`data-test="message-congrates"`

```jsx
*---------------------------------
* App/Congrates/index.js
*---------------------------------

import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Congrates = ({
    isSuccess
}) => (
    <div data-test="component-congrates">
        {isSuccess &&
        <div data-test="message-congrates">
            <Alert variant="success">恭喜猜對惹</Alert>
        </div>}
    </div>
);

export default Congrates;
```

#### 4) 傳進來的 props 都是正確的

React 官方有提供`prop-types`的函式庫，來檢查傳進 Component 的 props 之型別。
但它僅能在開發模式時，提供 console 警示的功能，卻無法用於單元測試中。

在此推薦使用`check-prop-types`這個函式庫，它有提供利於撰寫測試的 API 來讓你測試 prop 是否 required，以及型別是否正確。

以`checkPropTypes()`這個方法為例，只要給它：

1. Component.propTypes (_對，就是整包 propTypes_)
2. 你想測試的 props
3. 'prop' (_這似乎是固定字串吧..._)
4. Component 的名字

經 checkPropTypes()檢查後，若有錯誤訊息，它會回傳錯誤訊息的字串。若無錯誤訊息，則回傳 undefined。

寫測試的思考順序如下：

1. 傳入想測試的 props`{ isSuccess: true }`
2. 使用 checkPropTypes 函式，傳入 Component 資訊 與 測試的 props。如果不合預期，checkPropTypes 會回傳錯誤訊息。
3. 如果傳進 Component 的 props 是正確的，checkPropTypes 應為 undefined

```javascript
import checkPropTypes from "check-prop-types"
import Congrates from "../index"

test("傳進來的props型別都是正確的", () => {
  const expectedProps = { isSuccess: true }
  const propError = checkPropTypes(
    Congrates.propTypes,
    expectedProps,
    "prop",
    Congrates.name
  )
  expect(propError).toBeUndefined()
})
```

完成上述 **4)** 測試後，回到`App/Congrates/index.js`，補上型別檢查。
以下是 Congrates Component 完成的全貌：

```jsx
*---------------------------------
* App/Congrates/index.js
*---------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const Congrates = ({
    isSuccess
}) => (
    <div data-test="component-congrates">
        {isSuccess &&
        <div data-test="message-congrates">
            <Alert variant="success">恭喜猜對惹</Alert>
        </div>}
    </div>
);

Congrates.propTypes = {
    isSuccess: PropTypes.bool.isRequired,
};

export default Congrates;
```
