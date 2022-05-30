# 原型模式

>  在整个应用程序中将可重用逻辑作为道具传递给组件

## 简介

在我们的应用程序中，我们经常希望在多个组件中使用相同的逻辑。这个逻辑可以包括对组件应用特定的样式、需要授权或添加全局状态。类似mixin、hooks，下文会提到

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1gzfq6gd4qfj20io0s4q5o.jpg" alt="image-20220216223326490" style="zoom:50%;" />

## 实现

实现一个Loader逻辑，让狗狗图片组件能够在获取数据时，显示Loading...

`loader`

```jsx
import React, { useEffect, useState } from "react";

export default function withLoader(Element, url) {
  return (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      }

      getData();
    }, []);

    if (!data) {
      return <div>Loading...</div>;
    }

    return <Element {...props} data={data} />;
  };
}

```

`DogImages`

```jsx
import React from "react";
import withLoader from "./withLoader";

function DogImages(props) {
  return props.data.message.map((dog, index) => (
    <img src={dog} alt="Dog" key={index} />
  ));
}

export default withLoader(
  DogImages,
  "https://dog.ceo/api/breed/labrador/images/random/6"
);

```

## 组合(Composing)

我们也可以组合多个高阶组件。假设我们还想添加显示悬停的功能!当用户将鼠标悬停在“DogImages”列表上时，文本框就会出现。

`DogImages.js`

```jsx
import React from "react";
import withLoader from "./withLoader";
import withHover from "./withHover";

function DogImages(props) {
  return (
    <div {...props}>
      {props.hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  );
}

export default withHover(
  withLoader(DogImages, "https://dog.ceo/api/breed/labrador/images/random/6")
);
```

`withHover.js`

```jsx
import React, { useState } from "react";

export default function withHover(Element) {
  return props => {
    const [hovering, setHover] = useState(false);

    return (
      <Element
        {...props}
        hovering={hovering}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    );
  };
}
```

`withLoader.js`

```jsx
import React, { useEffect, useState } from "react";

export default function withLoader(Element, url) {
  return props => {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(data => setData(data));
    }, []);

    if (!data) {
      return <div>Loading...</div>;
    }

    return <Element {...props} data={data} />;
  };
}
```

**由于hoc在很大程度上可以被React Hooks所取缺点**

## Hooks

> 在某些情况下，我们可以用React Hooks替换HOC模式。

`DogImages.js`

```jsx
import React from "react";
import withLoader from "./withLoader";
import useHover from "./useHover";

function DogImages(props) {
  const [hoverRef, hovering] = useHover();

  return (
    <div ref={hoverRef} {...props}>
      {hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  );
}
```

`useHover.js`

```jsx
import { useState, useRef, useEffect } from "react";

export default function useHover() {
  const [hovering, setHover] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]);

  return [ref, hovering];
}
```

`withLoader.js`

```jsx
import React, { useEffect, useState } from "react";

export default function withLoader(Element, url) {
  return props => {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(data => setData(data));
    }, []);

    if (!data) {
      return <div>Loading...</div>;
    }

    return <Element {...props} data={data} />;
  };
}
```

## React Docs

*"In most cases, Hooks will be sufficient and can help reduce nesting in your tree."* - [React Docs](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)

 正如React文档告诉我们的，使用钩子可以减少组件树的深度。使用HOC模式，很容易得到一个嵌套很深的组件树。

![image-20220216222920414](https://tva1.sinaimg.cn/large/e6c9d24egy1gzfq25qvx2j214a0aemxm.jpg)

## Best use-case

**Best use-cases for a HOC**:

- `相同`的`非定制逻辑`需要在许多组件中`重用`
- 不需要添加逻辑，组件也能可以独自工作的

 **Best use-cases for Hooks**:

- `相同`的`定制逻辑`需要在组件中`重用`
-  该行为不会在整个应用程序中传播，只有一个或几个组件使用该行为。
- 该行为向组件添加了许多属性

## 优势

- 使用高阶组件模式可以让我们将想要重用的逻辑集中在一个地方。这减少了通过重复代码在整个应用程序中意外传播错误的风险，每次都可能引入新的错误。
- 通过将所有逻辑保持在一个位置，我们可以保持我们的代码DRY，并轻松地执行·`关注点分离`。

## 缺点

- 当使用多个组合的HOC将属性传递给包装在其中的元素时，很难弄清楚哪个HOC负责哪个属性。这可能会妨碍应用程序的调试和扩展。
- 造成过深的组件树🌲
- 属性命名冲突(可以覆盖融合解决)