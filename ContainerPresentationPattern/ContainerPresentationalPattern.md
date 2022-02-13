# 容器/演示模式

> 通过将视图与应用程序逻辑分离来强制关注点分离

## 简介

先来说说什么是关注点分离，就是把一个复杂的问题拆分成一个个只关注一个特定问题的模块。在React中，一种强制关注点分离的方法是使用容器/表示模式。使用此模式，我们可以将视图与应用程序逻辑分离开来。

## 实现

假设我们想要创建一个应用程序来获取6张狗的图像，并在屏幕上呈现这些图像。

- 表示组件：关心如何向用户显示数据的组件。在这个例子中，这就是渲染狗图像列表。
- 容器组件: 关心获取狗狗图片的资源

![image-20220210215119442](https://tva1.sinaimg.cn/large/008i3skNgy1gz8r8r3ntuj30qe0dkq44.jpg)

- DogImages.js 只关心视图展示，就是我们的显示组件
- DogImagesContainer.js 只关心获取图片获取，就是我们的容器组件

`DogImages.js`

```js
import React from "react";

export default function DogImages({ dogs }) {
  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

`DogImagesContainer.js`

```jsx
import React from "react";
import DogImages from "./DogImages";

export default class DogImagesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      dogs: []
    };
  }

  componentDidMount() {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then(res => res.json())
      .then(({ message }) => this.setState({ dogs: message }));
  }

  render() {
    return <DogImages dogs={this.state.dogs} />;
  }
}
```

容器/演示模式又个弊端就是我们需要将演示组件包含在容器组件中，在下面我们使用React提供的hooks可以让我们更轻松的达到关注点分离的模式

## 使用Hooks

> 在许多情况下，容器/表示模式可以用React Hooks代替。hook的引入使得开发人员可以很容易地添加状态，而不需要容器组件来提供该状态。

- 使用自定义hooks来获取资源
- 在视图组件，直接使用hooks就行了

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gz8rkmq978j30pi0e8gmu.jpg" alt="image-20220210220242378" style="zoom:50%;" />

```jsx
export default function useDogImages() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then(res => res.json())
      .then(({ message }) => setDogs(message));
  }, []);

  return dogs;
}
```

```jsx
import React from "react";
import useDogImages from "./useDogImages";

export default function DogImages() {
  const dogs = useDogImages();

  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

## 优点

表示性组件可以是负责UI的纯函数，而容器组件负责应用程序的状态和数据。这使得执行关注点分离变得很容易。

测试表示组件很容易，因为它们通常是纯函数。我们知道将根据传递的数据呈现哪些组件，而不必模拟数据存储。

- 业务和视图分离
- 易于维护
- 易于复用

## 缺点

尽管我们仍然可以使用 Container/Presentational 模式，即使使用 React Hooks，这种模式在较小的应用程序中很容易被过度使用。