# 观察者模式👀

> 当特定事件发生时，通过被观察者(Observable)来通知订阅者(observers)

## 简介

一个被观察者(Observable)通常包括3个重要部分：

- Observers:一个列表包含了所有的观察者，当事件发生时，会通知所有的观察者
- Subscribe：一个方法，可以往Observers列表中添加观察者(Observer)
- Unsubscribe :一个方法，可以从Observers列表中移除观察者(Observer)
- notify:一个方法，当特定的事件发生时，可以通知Observers列表中的所有的观察者

`handleClick和handleToggle触发事件时notify所有的订阅者`，下图观察者是logger和toastify函数

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gz9zn7at60g30tk0jeh5x.gif" alt="Kapture 2022-02-11 at 23.24.30" style="zoom:50%;" />

## 实现

让我们来简单实现一些，通过es6的class语法可以让我们比较好的抽象它

```js
  class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscrible(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

const observable =new Observable()

observable.subscribe((data)=>{
  console.log('sudongyu 收到了',data)
})
observable.subscribe((data)=>{
  console.log('zhangsan 收到了',data)
})

setTimeout(()=>{
observable.notify('hello world')
},3000)
```



## 使用RxJs

> 在许多情况下，容器/表示模式可以用React Hooks代替。hook的引入使得开发人员可以很容易地添加状态，而不需要容器组件来提供该状态。

```jsx
import ReactDOM from "react-dom";
import { fromEvent, merge } from "rxjs";
import { sample, mapTo } from "rxjs/operators";

import "./styles.css";
//合并一些事件,当这些事件触发时，通知订阅者
// 管道操作符(Pipeable Operator)是一个接受Observable作为输入并返回另一个Observable的函数。这是一个纯粹的操作:之前的Observable不会被修改。
//pipe管道符，用来处理异步的数据,mapTo当被观察者发出通知时要发送的数据
merge(
  fromEvent(document, "mousedown").pipe(mapTo(false)),
  fromEvent(document, "mousemove").pipe(mapTo(true))
)
  .pipe(sample(fromEvent(document, "mouseup")))//每当另一个Observable(通知器)发出时，就会发出源Observable最近发出的值。这里意思就是当鼠标抬起发出move或者down传递的值给订阅者
  .subscribe(isDragging => {
    console.log("Were you dragging?", isDragging);
  });

ReactDOM.render(
  <div className="App">Click or drag anywhere and check the console!</div>,
  document.getElementById("root")
);
```

## 优点

使用观察者模式是执行关注点分离和单一责任原则的好方法。观察者对象与可观察对象不是紧密耦合的，并且可以在任何时候(取消)耦合。可观察对象负责监视事件，而观察者只是处理接收到的数据。

## 缺点

 如果观察者变得过于复杂，那么在通知所有订阅者时可能会导致性能问题。