# Hooks模式

> 使用函数在整个应用程序的多个组件之间重用有状态逻辑

## 简介

 React 16.8引入了一个叫做Hooks的新特性。钩子使得使用React状态和生命周期方法成为可能，而不需要使用ES2015类组件。  虽然hook不一定是一种设计模式，但它在应用程序设计中扮演着非常重要的角色。许多传统的设计模式都可以被Hooks所取代。

## 实现

 在React中引入hook之前，我们必须使用类组件来为组件添加状态和生命周期方法。React中典型的类组件是这样的：

`class component`

```jsx
import "./styles.css";

export default class Button extends React.Component {
  constructor() {
    super();
    this.state = { enabled: false };
  }

  render() {
    const { enabled } = this.state;
    const btnText = enabled ? "enabled" : "disabled";

    return (
      <div
        className={`btn enabled-${enabled}`}
        onClick={() => this.setState({ enabled: !enabled })}
      >
        {btnText}
      </div>
    );
  }
}
```

可以看见class component 你等使用es2015的class，了解this是啥，为啥需要绑定一些自定义方法，构造函数做了什么,在React中引入hook之前，我们必须使用类组件来为组件添加状态和生命周期方法。React中典型的类组件是这样的

`class component`

```jsx
class MyComponent extends React.Component {
  /* Adding state and binding custom methods */
  constructor() {
    super()
    this.state = { ... }

    this.customMethodOne = this.customMethodOne.bind(this)
    this.customMethodTwo = this.customMethodTwo.bind(this)
  }

  /* Lifecycle Methods */
  componentDidMount() { ...}
  componentWillUnmount() { ... }

  /* Custom methods */
  customMethodOne() { ... }
  customMethodTwo() { ... }

  render() { return { ... }}
}
```

## 重建(Restructuring)

在几个组件之间共享代码的常见方法是使用更高阶组件(Higher Order Component)或Render Props模式。

尽管这两种模式都是有效的，并且是一种很好的实践，但是在以后添加这些模式需要重新构造应用程序。除了必须重组应用程序(组件越大就越棘手)之外，为了在嵌套更深的组件之间共享代码而使用许多包装组件可能会导致最好被称为包装地狱的情况。打开你的开发工具并看到类似的结构并不罕见

![image-20220218222654966](https://tva1.sinaimg.cn/large/e6c9d24ely1h2qet1cxa4j20y60hkdh0.jpg)

包装器的地狱可能会使您难以理解数据是如何流经您的应用程序的，这可能会使您更难弄清楚为什么会发生意外的行为。

## 复杂性(Complexity)

当我们向类组件添加更多的逻辑时，组件的大小会快速增加。该组件内的逻辑可能会变得混乱和非结构化，这使得开发人员很难理解在类组件中哪些地方使用了特定的逻辑。这使得调试和优化性能变得更加困难。

生命周期方法在代码中也需要大量的重复。让我们看一个例子，它使用了Counter组件和Width组件。

```jsx
import React from "react";
import "./styles.css";

import { Count } from "./Count";
import { Width } from "./Width";

export default class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      width: 0
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  increment = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  };

  decrement = () => {
    this.setState(({ count }) => ({ count: count - 1 }));
  };

  handleResize = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    return (
      <div className="App">
        <Count
          count={this.state.count}
          increment={this.increment}
          decrement={this.decrement}
        />
        <div id="divider" />
        <Width width={this.state.width} />
      </div>
    );
  }
}
```

可以看到这尽管是一个小组件，但组件内部的逻辑已经相当复杂了。虽然某些部分是特定于计数器逻辑的，但其他部分是特定于宽度逻辑的。随着组件的增长，在组件中构造逻辑、在组件中查找相关逻辑会变得越来越困难。

![image-20220218225815463](https://tva1.sinaimg.cn/large/e6c9d24egy1gzi24v0hnkj20sc0r440k.jpg)

## Hooks

很明显，类组件在React中并不总是一个很好的特性。为了解决React开发者在使用类组件时会遇到的常见问题，React引入了React Hooks。React Hooks是你可以用来管理组件状态和生命周期方法的函数。

- 像函数组件添加状态
- 管理组件的生命周期而不需要编写很多组件生命周期函数
-  在整个应用程序的多个组件之间重用相同的有状态逻辑

## State Hook

> React提供了一个hook可以在函数组件内部管理状态，被称为useState

让我们看看如何使用useState钩子将类组件重构为函数式组件。我们有一个名为Input的类组件，它只是呈现一个输入字段。每当用户在输入字段中输入任何内容时，状态中的输入值都会更新。

```jsx
import React, { useState } from "react";

  export default function Input() {
    const [input, setInput] = useState("");

    return (
      <input
        onChange={e => setInput(e.target.value)}
        value={input}
        placeholder="Type something..."
      />
    );
  }
```

## Effect Hook

我们已经看到，我们可以使用useState组件来处理功能组件中的状态，但类组件的另一个好处是可以向组件中添加生命周期方法。  使用useEffect钩子，我们可以“钩”到组件的生命周期中。useEffect钩子有效地结合了componentDidMount、componentDidUpdate和componentWillUnmount生命周期方法。

```jsx
componentDidMount() { ... }
useEffect(() => { ... }, [])

componentWillUnmount() { ... }
useEffect(() => { return () => { ... } }, [])

componentDidUpdate() { ... }
useEffect(() => { ... })
```

`useEffect(()=>{},[input])`，当组件第一次加载完毕和input状态改变的时候就会再次执行Effect

```jsx
import React, { useState, useEffect } from "react";

export default function Input() {
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(`The user typed ${input}`);
  }, [input]);

  return (
    <input
      onChange={e => setInput(e.target.value)}
      value={input}
      placeholder="Type something..."
    />
  );
}
```

## Custom Hooks

除了React提供的内置钩子(useState, useEffect, useReducer, useRef, useContext, useMemo, useImperativeHandle, uselayouteeffect, useDebugValue, useCallback)外，我们还可以轻松创建自己的自定义钩子。

自定义钩子通常use开头，这是一种约定。

`useKeyPress.js`

```jsx
function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = React.useState(false);

  function handleDown({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  function handleUp({ key }) {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  return keyPressed;
}
```

`Input.js`

```jsx
import React from "react";
import useKeyPress from "./useKeyPress";

export default function Input() {
  const [input, setInput] = React.useState("");
  const pressQ = useKeyPress("q");
  const pressW = useKeyPress("w");
  const pressL = useKeyPress("l");

  React.useEffect(() => {
    console.log(`The user pressed Q!`);
  }, [pressQ]);

  React.useEffect(() => {
    console.log(`The user pressed W!`);
  }, [pressW]);

  React.useEffect(() => {
    console.log(`The user pressed L!`);
  }, [pressL]);

  return (
    <input
      onChange={e => setInput(e.target.value)}
      value={input}
      placeholder="Type something..."
    />
  );
}
```

我们现在可以在多个组件中重用useKeyPress钩子，而不是将按键逻辑保存在Input组件的本地，而不必一遍又一遍地重写相同的逻辑。

Hooks的另一个巨大优势是，社区可以建立和分享hook。我们只是自己编写了useKeyPress钩子，但实际上根本没有必要!这个钩子已经被别人构建好了，只要我们安装它就可以在我们的应用程序中使用!

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1gziu70tpo5j20ju0hot9a.jpg" alt="image-20220219150905467" style="zoom:50%;" />

```jsx
import React, { useState, useEffect } from "react";
import "./styles.css";

import { Count } from "./Count";
import { Width } from "./Width";

function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log('13')
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  });

  return width;
}

export default function App() {
  const counter = useCounter();
  const width = useWindowWidth();

  return (
    <div className="App">
      <Count
        count={counter.count}
        increment={counter.increment}
        decrement={counter.decrement}
      />
      <div id="divider" />
      <Width width={width} />
    </div>
  );
}
```

我们将上面App函数的逻辑分解为几个部分

- useCounter:一个自定义钩子，返回count的当前值，一个递增方法和一个递减方法。
- useWindowWidth:一个返回窗口当前宽度的自定义钩子。
- App:一个功能的、有状态的组件，返回Counter和Width组件。

通过使用React Hooks而不是类组件，我们能够将逻辑分解成更小的、可重用的部分，从而将逻辑分离开来

![image-20220219151304440](https://tva1.sinaimg.cn/large/e6c9d24egy1gziub4gimuj21380m8mzv.jpg)

使用React Hooks可以更清晰地将组件的逻辑分割成几个更小的部分。重用相同的有状态逻辑变得更

加容易，如果我们想让组件有状态，我们不再需要将功能组件重写为类组件。不再需要对ES2015类有充分的了解，拥有可重用的有状态逻辑可以增加组件的可测试性、灵活性和可读性。

## 扩展Hooks指导

添加钩子

与其他组件一样，当您想要将Hooks添加到您所编写的代码中时，会使用一些特殊的函数。以下是一些常见的Hook函数的简要概述:

- `useState` useState钩子使开发人员能够更新和操作函数组件内部的状态，而无需将其转换为类组件。这个钩子的一个优点是它简单，不需要像其他React钩子那样复杂。
- `useEffect`钩子用于在函数组件的主要生命周期事件中运行代码。函数组件的主体不允许突变、订阅、计时器、日志记录和其他副作用。如果允许这样做，可能会导致UI中出现令人困惑的错误和不一致性。useEffect钩子可以防止所有这些“副作用”，并允许UI平稳运行。它是componentDidMount、componentDidUpdate和componentWillUnmount的组合，都在一个地方。
- `useContext` useContext钩子接受一个context对象，它是React返回的值。创建上下文，并返回该上下文的当前上下文值。useContext Hook也与React Context API一起工作，以便在整个应用中共享数据，而不需要将你的应用道具向下传递到各个级别。
- `useReducer` useReducer Hook提供了一种替代setState的方法，当您有复杂的状态逻辑，其中包含多个子值，或者当下一个状态依赖于前一个状态时，这种方法尤其可取。它采用reducer函数和初始状态输入，通过数组解构返回当前状态和调度函数作为输出。useReducer还优化了触发深度更新的组件的性能。**我个人认为最重要的一点是，你可以不必将状态通过属性透传，而是可以直接通过dispatch来分发时间驱动状态更新**

## 有无状态组件

### 无状态组件

无状态组件`Stateless Component`是最基础的组件形式，由于没有状态的影响所以就是纯静态展示的作用。一般来说，各种`UI`库里也是最开始会开发的组件类别，例如按钮、标签、输入框等。其的基本组成结构就是属性`props`以及事件函数调用。由于不涉及到状态的更新，所以这种组件的复用性也最强，无状态组件由于没有自己的`state`和生命周期函数，所以运行效率高。

- 只负责接收`props`渲染`DOM`，不维护自己的`state`。
- 不能访问生命周期方法。
- 不需要声明类，可以避免`extends`或`constructor`之类的代码，语法上更加简洁。
- 不会被实例化，因此不能直接传`ref`，可以使用`React.forwardRef`包装后再传`ref`。
- 不需要显示声明`this`关键字，在`ES6`的类声明中往往需要将函数的`this`关键字绑定到当前作用域，而因为函数式声明的特性，我们不需要再强制绑定。
- 更好的性能表现，因为函数式组件中并不需要进行生命周期的管理与状态管理，因此`React`并不需要进行某些特定的检查或者内存分配，从而保证了更好地性能表现。

### 有状态组件

有状态组件`Stateful Component`是在无状态组件的基础上，如果组件内部包含状态`state`且状态随着事件或者外部的消息而发生改变的时候，这就构成了有状态组件。有状态组件通常会带有生命周期`lifecycle`，用以在不同的时刻触发状态的更新。这种组件也是通常在写业务逻辑中最经常使用到的，根据不同的业务场景组件的状态数量以及生命周期机制也不尽相同。

## 优势

- hook允许您根据关注点和功能而不是生命周期对代码进行分组。
- 这使得代码不仅更简洁，而且更短。下面是使用React的一个简单的无状态组件，以及使用useState关键字后它在Hooks中的样子。
- 共享非视觉逻辑
