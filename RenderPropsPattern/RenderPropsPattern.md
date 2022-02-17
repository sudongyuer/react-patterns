# 渲染属性模式

> 通过属性将JSX元素传递给组件

## 简介

通过渲染属性我们传递组件，也能实现和高阶组件模式相同的效果，达到服用相同的数据或相同的逻辑。

## 实现

- Title组件没有自己的模版，接收一个render属性，通过执行render函数来渲染组件

```jsx
import React from "react";
import { render } from "react-dom";

import "./styles.css";

const Title = (props) => props.render();

render(
  <div className="App">
    <Title
      render={() => (
        <h1>
          <span role="img" aria-label="emoji">
            ✨
          </span>
          I am a render prop!{" "}
          <span role="img" aria-label="emoji">
            ✨
          </span>
        </h1>
      )}
    />
  </div>,
  document.getElementById("root")
);
```

这样我们可以很好的复用Title组件，但是这样好像有点脱裤子放屁的感觉，我们接着往下看👇

```jsx
import React from "react";
import { render } from "react-dom";
import "./styles.css";

const Title = (props) => props.render();

render(
  <div className="App">
    <Title render={() => <h1>✨ First render prop! ✨</h1>} />
    <Title render={() => <h2>🔥 Second render prop! 🔥</h2>} />
    <Title render={() => <h3>🚀 Third render prop! 🚀</h3>} />
  </div>,
  document.getElementById("root")
);
```

## 渲染属性

> 上面的例子，我们只是传递了不同的函数给Title组件来渲染，脱裤子放屁，但是下面这个例子，我们可以避免使用状态提升来达到使用相同的数据的效果

- 传递个input的render函数都接受一个value属性，该value属性通过input传递，这样我们就可以将数据传递给不同的子组件

```jsx
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.render(value)}
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input
        render={value => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      />
    </div>
  );
}
```

## 将Children作为函数

> 同样，我们可以不通过render属性来复用数据或者逻辑，我们可以通过Children来传递函数，达到服用数据和逻辑的效果

```jsx
export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input>
        {value => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      </Input>
    </div>
  );
}
```

```jsx
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.children(value)}
    </>
  );
}
```

## Hooks

在某些情况下，我们可以用钩子替换渲染属性。

## 优点

- 使用渲染属性模式可以很容易地在多个组件之间共享逻辑和数据。
- 通过使用渲染属性或孩子属性，组件可以变得非常可重用。
- 尽管和高阶组件模式主要解决了相同的问题，即可重用性和共享数据，但渲染属性模式解决了我们使用HOC模式可能遇到的一些问题。  使用HOC模式所遇到的命名冲突问题不再适用于使用render props模式，因为我们不会自动合并属性。我们明确地将属性传递给子组件

## 缺点

- 我们试图通过渲染属性解决的问题已经被React Hooks所取代。
- Hooks改变了我们为组件添加可重用性和数据共享的方式，在很多情况下，它们可以取代属性渲染模式。  
- 因为我们不能给渲染属性添加生命周期方法，所以我们只能在不需要改变接收数据的组件上使用它。