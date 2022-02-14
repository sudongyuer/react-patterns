# 单例模式

> 在我们的应用程序中共享一个全局实例

## 简介

单例是可以实例化一次的类，并且可以全局访问。这个单一实例可以在我们的应用程序中共享，这使得单例非常适合管理应用程序中的全局状态。

## 实现

```js
//power by sudngyu
let counter = 0;
let instance
class Counter {
  constructor() {
    if(instance){
      throw new Error("You can only create one instance!")
    }
    instance = this
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 =new Counter()
const counter2 =new Counter()
// Error: You can only create one instance!
//如果想让这个全局对象不被随意覆盖掉
export default Object.freeze(counter1)

```

## 优点

整个应用程序只生成一个实例，节约了内存

## 缺点

在javascript中，使用类来实现单例模式优点矫枉过正

我们可以使用常规的对象就能实现单例，而不需要再去写一个类

该对象作为公共对象被多处使用，导致状态很可能不符合预期

```js
//创建全局对象同样能实现单例子模式
let count = 0;

const counter= {
  increment() {
    return ++count
  },
  decrement() {
    return --count
  }
}
Object.freeze(counter)

export {counter}

```

## React 中的状态管理

**在 React 中，我们经常通过Redux**或**React Context**等状态管理工具来依赖全局状态，而不是使用 Singletons。尽管它们的全局状态行为可能看起来类似于单例，但这些工具提供了**只读状态**而不是单例的*可变*状态。使用 Redux 时，只有纯函数*reducer*可以在组件通过*dispatcher发送**操作*后更新状态。

尽管使用这些工具不会神奇地消除全局状态的缺点，但我们至少可以确保全局状态按照我们想要的方式发生变化，因为组件不能直接更新状态。