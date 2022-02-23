# 复合模式

> 创建多个组件，它们一起工作来执行单个任务

## 简介

 在我们的应用程序中，我们通常有彼此属于的组件。它们通过共享状态相互依赖，并共享逻辑。您经常在选择组件、下拉组件或菜单项中看到这种情况。复合组件模式允许您创建一起工作以执行任务的组件。

![News 02](https://tva1.sinaimg.cn/large/e6c9d24egy1gznrr6f2yoj21hc0u0dhn.jpg)

## 实现

让我们看一个例子:我们有一个松鼠图像列表!除了显示松鼠图像外，我们还希望添加一个按钮，使用户能够编辑或删除图像。我们可以实现一个FlyOut组件，当用户切换该组件时，它会显示一个列表。

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1gznrgtgmb9j20m812042d.jpg" alt="image-20220223212226269" style="zoom:50%;" />

### Context API

使用React的Context API的复合组件模式非常适合这个例子!

```jsx
const FlyOutContext = createContext();

function FlyOut(props) {
  const [open, toggle] = useState(false);

  return (
    <FlyOutContext.Provider value={{ open, toggle }}>
      {props.children}
    </FlyOutContext.Provider>
  );
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);

  return (
    <div onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

function List({ children }) {
  const { open } = useContext(FlyOutContext);
  return open && <ul>{children}</ul>;
}

function Item({ children }) {
  return <li>{children}</li>;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;
```

这里还有个小窍门，将相关组件通过函数属性来绑定 这真的很巧妙，我们常常在组件库中看到这样的组件

```jsx
import React from "react";
import { FlyOut } from "./FlyOut";

export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
```

### [React.Children.map](https://reactjs.org/docs/react-api.html#reactchildrenmap)

 我们也可以通过映射组件的子组件来实现复合组件模式。通过使用额外的道具克隆这些元素，我们可以将open和toggle属性添加到这些元素中。

```jsx
import React from "react";
import Icon from "./Icon";

const FlyOutContext = React.createContext();

export function FlyOut(props) {
  const [open, toggle] = React.useState(false);

  return (
    <div>
      {React.Children.map(props.children, child =>
        React.cloneElement(child, { open, toggle })
      )}
    </div>
  );
}

function Toggle() {
  const { open, toggle } = React.useContext(FlyOutContext);

  return (
    <div className="flyout-btn" onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

function List({ children }) {
  const { open } = React.useContext(FlyOutContext);
  return open && <ul className="flyout-list">{children}</ul>;
}

function Item({ children }) {
  return <li className="flyout-item">{children}</li>;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;
```

```jsx
import React from "react";
import "./styles.css";
import { FlyOut } from "./FlyOut";

export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
```



## 优点

- 复合组件管理它们自己的内部状态，它们在几个子组件之间共享这些状态。

- 在实现复合组件时，我们不必担心自己管理状态。  

- 当导入一个复合组件时，我们不必显式地导入该组件上可用的子组件。

## 缺点

- 当使用React.Children.map来提供这些值时，组件嵌套受到了限制。

- 只有父组件的直接子组件才能访问open和toggle道具，这意味着我们不能将这些组件包装到其他组件中。
-  使用React克隆一个元素。cloneElement执行浅合并。已经存在的属性将与我们通过的新属性合并在一起。这可能会导致命名冲突，如果已经存在的属性与我们传递给React的属性同名。cloneElement方法。当属性被浅层合并时，该属性的值将被我们传递的最新值覆盖。