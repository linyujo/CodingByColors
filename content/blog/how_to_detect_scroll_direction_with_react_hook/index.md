---
id: 20200910A
slug: /how_to_detect_scroll_direction_with_react_hook
subject: React
title: Detect Scroll Direction With React Hook
date: 2020-09-10T17:30:00.000Z
description: 「偵測使用者向上/向下滾動」的功能也不是第一次做了，但從Class Component思維轉換到Hook思維卻卡了一陣子...
tags:
 - React
headerImage: "https://imgur.com/0W8C4Se.jpg"
templateKey: blog-post
---
> Photo by <a href="https://unsplash.com/@diana_pole?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Diana Polekhina</a> on <a href="https://unsplash.com/s/photos/measure?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

「偵測使用者向上/向下滾動」的功能也不是第一次做了，但從Class Component思維轉換到Hook思維卻卡了一陣子。

這一篇會先說明自己在Class Component是如何實作的，接著說明如何轉換到Hook，以及第一次轉換時，思考的盲點。

以下本章節範例程式碼：
<iframe src="https://codesandbox.io/embed/how-to-detect-scroll-direction-with-react-hook-m7q88?fontsize=14&hidenavigation=1&theme=dark"
	style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
	title="How To Detect Scroll Direction With React Hook"
	allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
	sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Class Component

Class Component是老朋友了，思路非常簡單：
1. 在componentDidMount裝上監聽器
2. 在componentWillUnmount解除監聽器
3. 監聽器的函式中，記得要設計「閥門」，閥門關上後才進行更新，更新完畢之後再打開閥門。避免更新state過於頻繁

```jsx{7-9,11-13}
class ScrollClassComponent extends Component {
  state = {
    lastScrollY: 0, // 紀錄上次Y軸所在的位置
    isLocked: false, // 鎖住，避免update過於頻繁
    isScrollDown: false
  };
  componentDidMount() {
    // componentDidMount開始監聽
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    // componentWillUnmount移除監聽
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    const currentScroll = window.pageYOffset; // 現在的Y軸位置
    const thresholdPixels = 50; // 超過一定的滑行距離
    const { lastScrollY } = this.state;

    if (this.isLocked) {
      return;
    }
    if (Math.abs(currentScroll - lastScrollY) < thresholdPixels) {
      return;
    }

    this.setState({ isLocked: true });

    window.requestAnimationFrame(this.updateScroll);
  };
  updateScroll = () => {
    const currentScroll = window.pageYOffset; // 現在的Y軸位置
    const { lastScrollY } = this.state;

    if (currentScroll > lastScrollY) {
      this.setState({ isScrollDown: true });
      console.log("Scroll Down");
    } else {
      this.setState({ isScrollDown: false });
      console.log("Scroll Up");
    }
    this.setState({ lastScrollY: currentScroll > 0 ? currentScroll : 0 });
    this.setState({ isLocked: false });
  };
  render() {
    const { isScrollDown } = this.state;
    return this.props.children({
      isScrollDown: isScrollDown
    });
  }
}
```

## Functional Component with Hook

### 錯誤範例(第一次改寫成Hook)

網路上的教學簡化來說，useEffect的第二個參數，如果是空陣列，那就幾乎等同於componentDidMount。
useEffect中return的函式，也幾乎等同於componentWillUnmount。
於是一開始的思路很簡單：

```jsx{14-17}
function ScrollFuncComponent({ children }) {
  const [isScrollDown, toggleScrollDown] = React.useState(false);
  const [lastScrollY, saveLastScrollY] = React.useState(0); // keep the last Y position
  const [isLocked, toggleIsLocked] = React.useState(false);

  const handleScroll = () => {
    // 閥門
  };
  const updateScroll = () => {
    // 更新
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return children({ isScrollDown: isScrollDown });
}
```

神秘的是，這樣改寫之後，scroll向上/向下滑的監測**很奇怪**！
![](https://i.imgur.com/sgvqu9h.png)

之後看到console有貼心的提示：
> *React Hook React.useEffect has a missing dependency: 'handleScroll'.*

對於React Class Component vs Functional Component有一點概念的攻城獅都懂的，Functional Component在更新時，本質上就是**整個**function重新跑一遍。

在Hook登場之前，有著簡單的二分法：這個元件若有state需要控制，就用Class Component。反之，用Functional Component即可。

就算到了Hook時代，「**整個**function重新跑一遍」的本質仍然是不變的。除了useState, useEffect等React操控的函式會幫你保留reference之外，你自己宣告的監聽器A（蓋在舊地址上），在重新render之後，又換上了新的監聽器A（蓋在新地址上）。
而EventListener綁定的舊監聽器A，當然無法正常地更新元件。

### 正常運作的寫法

能正常運作的寫法有兩種，以下是第一種：

#### 1. 把useEffect所需呼叫的函式搬進useEffect

除此之外，函式中會用到的state也要放進dependency array。
我的推理是，useEffect的dependency array若是空陣列，代表useEffect只會在元件第一次render的時候跑一次，之類再也不會進來了 Σ(O_O)。既然不會再進去useEffect，那麼state無法正常更新也是可想而知了！

官方說法是，如果想要再跑一次useEffect，dependency array就一定要加上「進入條件」。例如，scroll滑行的距離改變後，再跑一次useEffect。

![](https://i.imgur.com/oMPc4rS.png)

>初始化→scroll滑行的距離改變→重新addEventListener→更新state→removeEventListener→scroll滑行的距離改變→重新addEventListener...循環

```jsx{8,22,40}
function ScrollFuncComponent({ children }) {
  const [isScrollDown, toggleScrollDown] = React.useState(false);
  const [lastScrollY, saveLastScrollY] = React.useState(0); // keep the last Y position
  const [isLocked, toggleIsLocked] = React.useState(false);

  React.useEffect(() => {
  
    const handleScroll = () => {
      // 閥門
      const currentScroll = window.pageYOffset; // 現在的Y軸位置
      const thresholdPixels = 50;
      if (isLocked) {
        return;
      }
      if (Math.abs(currentScroll - lastScrollY) < thresholdPixels) {
        return;
      }
      toggleIsLocked(true);
      window.requestAnimationFrame(updateScroll);
    };
    
    const updateScroll = () => {
      // 更新
      const currentScroll = window.pageYOffset; // 現在的Y軸位置
      if (currentScroll > lastScrollY) {
        toggleScrollDown(true);
        console.log("Scroll Down");
      } else {
        toggleScrollDown(false);
        console.log("Scroll Up");
      }
      saveLastScrollY(currentScroll > 0 ? currentScroll : 0);
      toggleIsLocked(false);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLocked, lastScrollY]);

  return children({ isScrollDown: isScrollDown });
}
```

看得出來，把所需要的函式通通放進去，useEffect會變得好大一包！所以下面第二種方法是比較推薦的。

#### 2. React.useCallback 把useEffect內部所需要呼叫的callback包起來
前面提到，若是把useEffect內部會呼叫的函式放在useEffect之外，會發生「reference改變而無法正常更新」的情況。所幸，React.useCallback正是為此而來！它會幫你保存reference，即便在useEffect內部呼叫，仍可正常更新state。

```jsx{1,12,14,25}
  const updateScroll = React.useCallback(() => {
    const currentScroll = window.pageYOffset; // 現在的Y軸位置
    if (currentScroll > lastScrollY) {
      toggleScrollDown(true);
      console.log("Scroll Down");
    } else {
      toggleScrollDown(false);
      console.log("Scroll Up");
    }
    saveLastScrollY(currentScroll > 0 ? currentScroll : 0);
    toggleIsLocked(false);
  }, [lastScrollY]);

  const handleScroll = React.useCallback(() => {
    const currentScroll = window.pageYOffset; // 現在的Y軸位置
    const thresholdPixels = 50;
    if (isLocked) {
      return;
    }
    if (Math.abs(currentScroll - lastScrollY) < thresholdPixels) {
      return;
    }
    toggleIsLocked(true);
    window.requestAnimationFrame(updateScroll);
  }, [isLocked, lastScrollY, updateScroll]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
```

#### 避免可能在元件unmount的階段更新state

在useEffect使用eventListener更新元件狀態(state)時，你可能會在console看到下列警告訊息：
> Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

雖然我們已經在useEffect的return函式中解除了監聽器，但仍然可能發生「監聽器解除了，但handler函式已經跑了一半，而且還更新了state」的情況。

我採取的方法是，宣告一個狀態「isMounted」，來判斷是否能setState。
```jsx{5,9,31,38,42}
function ScrollFuncComponent({ children }) {
  const [isScrollDown, toggleScrollDown] = React.useState(false);
  const [lastScrollY, saveLastScrollY] = React.useState(0); // keep the last Y position
  const [isLocked, toggleIsLocked] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  const updateScroll = React.useCallback(() => {
    const currentScroll = window.pageYOffset; // 現在的Y軸位置
    if (!isMounted) return;

    if (currentScroll > lastScrollY) {
      toggleScrollDown(true);
      console.log("Scroll Down");
    } else {
      toggleScrollDown(false);
      console.log("Scroll Up");
    }
    saveLastScrollY(currentScroll > 0 ? currentScroll : 0);
    toggleIsLocked(false);
  }, [lastScrollY, isMounted]);

  const handleScroll = React.useCallback(() => {
    const currentScroll = window.pageYOffset; // 現在的Y軸位置
    const thresholdPixels = 50;
    if (isLocked) {
      return;
    }
    if (Math.abs(currentScroll - lastScrollY) < thresholdPixels) {
      return;
    }
    if (!isMounted) return;

    toggleIsLocked(true);
    window.requestAnimationFrame(updateScroll);
  }, [isLocked, lastScrollY, updateScroll, isMounted]);

  React.useEffect(() => {
    setIsMounted(true);

    window.addEventListener("scroll", handleScroll);
    return () => {
      setIsMounted(false);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, isMounted]);

  return children({ isScrollDown: isScrollDown });
}
```
除了`isMounted`之外，我也看過有人用`useRef` `if(ref.current)`來判斷setState時機。
由於我這個scroll元件沒有打算要渲染HTML Element，就沒有採取`useRef`的方式。

### 讓其他元件都能取得Scroll的狀態

除了透過傳統Props逐層傳遞之外，若想讓其他元件也能取得同一個state，以往的最常解（最佳解）大概就是導入redux了。
現在Hook的出現，若只是小網站，不想導入redux(通常還會搭配react-redux)，那麼context會是個不錯的選擇。

#### 1. 建立context存放公開資訊

建立一個跟Scroll有關的context物件，裡面存放的資訊為「使用者是否往下滑」，初始狀態為false。
```jsx{5-7}
// contexts.js

import React from "react";

const ScrollContext = React.createContext({
  isScrollDown: false // initial state
});

export { ScrollContext };
```
#### 2. 建立一個Provider，計算/更新資訊
context物件提供Provider（供應商）這個角色，讓我們把大家所需的資訊存放在value這個屬性中。
這裡要建立一個Provider元件，與ScrollFuncComponent.js幾乎完全相同，差別只在於return的部分。
將「是否往下滑」的狀態存在Provider的value屬性中。

```jsx{3,6,16}
// ScrollProvider.js

import { ScrollContext } from "./Contexts";

function ScrollProvider({ children }){
  const [isScrollDown, toggleScrollDown] = React.useState(false);
  /*
   * 其 All
   * 餘 remains
   * 完 the
   * 全 same
   * 不
   * 變
   */
  return (
    <ScrollContext.Provider value={{isScrollDown: isScrollDown}}>
      {children}
    </ScrollContext.Provider>
  );
}
```

#### 3. 使用React.useContext來取得公開資訊

當其他元件需要取得「使用者是否往下滑」的資訊時，只要使用React.useContext，就可以輕易取得。
這裡的範例是Header元件，Header需要透過「使用者是否往下滑」的資訊，才能判斷是否要顯示/隱藏。

```jsx{3,6}
// Header.js

import { ScrollContext } from "./Contexts";

function Header() {
  const { isScrollDown } = React.useContext(ScrollContext);
  return <header style={{ opacity: isScrollDown ? 0 : 1 }}>Header</header>;
}
```

可能有人會想到，如果其他元件不只是想「取得」context的value，還想「更新」value，該怎麼做呢？
這就是另一個`React.useReducer()`的故事了...

## Summary
1. 從Class Component轉為Functional Component時，請記得Functional Component的本質：「元件更新時，**整個**function重新跑一遍」。你宣告的一般變數（let,const）在重新render之後，會是「新的reference」。
2. useEffect的dependency array是「再次進入條件」，如果dependency array是空陣列，那麼useEffect就跟componentDidMount一樣，只會跑一次。請依據自己的使用情境，判斷元件的狀態是否需要更新。
3. 若希望在Functional Component內宣告的函式能保有reference，可善用`React.useCallback()`
4. 使用eventListener時，可能會發生「監聽器解除了，但handler函式仍在跑，而且還更新了state」的情況，最好在更新state前，判斷元件是否Unmount。
5. 新的Context API可當作小型的Global State，讓小型網站不必再引入redux，也可輕鬆取得共用的state。

