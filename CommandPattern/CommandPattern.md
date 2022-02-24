# 命令模式.md

![image-20220224204940778](https://tva1.sinaimg.cn/large/e6c9d24egy1gzow4z17l6j20je0ak3yy.jpg)

> 通过向指挥官发送命令来解耦执行任务的方法

## 简介

使用命令模式，我们可以将执行某个任务的对象与调用该方法的对象分离。 假设我们有一个在线食品配送平台。用户可以下达、跟踪和取消订单

## 实现

在 OrderManager 类上，我们可以访问 placeOrder、trackOrder 和 cancelOrder 方法。直接使用这些方法是完全有效的，但是这些方法和我们的订单管理对象产生了耦合

```js
class OrderManager() {
  constructor() {
    this.orders = []
  }

  placeOrder(order, id) {
    this.orders.push(id)
    return `You have successfully ordered ${order} (${id})`;
  }

  trackOrder(id) {
    return `Your order ${id} will arrive in 20 minutes.`
  }

  cancelOrder(id) {
    this.orders = this.orders.filter(order => order.id !== id)
    return `You have canceled your order ${id}`
  }
}
```

如果我们后期想要更改方法名，那将会影响到所有调用方法的实例

```javascript
const manager = new OrderManager();

manager.placeOrder("Pad Thai", "1234");
manager.trackOrder("1234");
manager.cancelOrder("1234");
```

## 通过命令将方法和对象解耦

通过创建一个新的Command类，我们就是实现了方法和对象的耦合（没有什么是加中间层处理不了的😂）

```jsx
class OrderManager {
  constructor() {
    this.orders = [];
  }

  execute(command, ...args) {
    return command.execute(this.orders, ...args);
  }
}

class Command {
  constructor(execute) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order, id) {
  return new Command(orders => {
    orders.push(id);
    console.log(`You have successfully ordered ${order} (${id})`);
  });
}

function CancelOrderCommand(id) {
  return new Command(orders => {
    orders = orders.filter(order => order.id !== id);
    console.log(`You have canceled your order ${id}`);
  });
}

function TrackOrderCommand(id) {
  return new Command(() =>
    console.log(`Your order ${id} will arrive in 20 minutes.`)
  );
}

const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
```

## 优点

- 命令模式允许我们将方法与执行操作的对象解耦。

- 如果您正在处理具有特定生命周期的命令，或者应该在特定时间排队和执行的命令，它将为您提供更多的控制。

## 缺点

命令模式的用例非常有限，经常会向应用程序添加不必要的样板文件。