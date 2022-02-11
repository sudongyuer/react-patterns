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