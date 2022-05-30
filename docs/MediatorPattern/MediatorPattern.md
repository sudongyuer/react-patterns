# 中介模式/中间件模式

> 使用中介对象处理组件之间的通信

## 简介

 中介模式使得组件可以通过一个中心点(中介)相互交互。中介接收请求并转发它们，而不是直接相互通信!在JavaScript中，中介通常只是一个对象字面量或一个函数

如果我们组件之间的通信像下面这样就太混乱了

![image-20220214203502294](https://tva1.sinaimg.cn/large/008i3skNgy1gzdbkw1pbwj30r40l20ty.jpg)

## 实现

中介模式的一个很好的用例是聊天室!聊天室内的用户不会直接相互交谈。相反，聊天室充当用户之间的中介。

![image-20220214203711493](https://tva1.sinaimg.cn/large/008i3skNgy1gzdbkuuz0tj30qm0l03ze.jpg)

```js
class ChatRoom{
    logMessage(user,message){
        const sender = user.name
        console.log(`${new Date().toLocaleString()} [${sender}]: ${message}`)
    }
}

class User{
    constructor(name,chatRoom){
        this.name=name;
        this.chatRoom=chatRoom
    }
    getName(){
        return this.name
    }
    send(message){
        this.chatRoom.logMessage(this,message)
    }
}

const chatRoom = new ChatRoom()
const user1 = new User('sudongyu',chatRoom)
const user2 = new User('zhangsan',chatRoom)
user1.send('hello zhangsan')
user2.send('hello sudongyu~')


```

## Express.js

> Express.js是一个流行的web应用服务器框架。我们可以为用户可以访问的某些路由添加中间件

 每次用户访问根端点'/'时，将调用两个中间件回调。

```jsx
const app = require("express")();
  const html = require("./data");

  app.use(
    "/",
    (req, res, next) => {
      req.headers["test-header"] = 1234;
      next();
    },
    (req, res, next) => {
      console.log(`Request has test header: ${!!req.headers["test-header"]}`);
      next();
    }
  );

  app.get("/", (req, res) => {
    res.set("Content-Type", "text/html");
    res.send(Buffer.from(html));
  });

  app.listen(8080, function() {
    console.log("Server is running on 8080");
  });
```

## 总结

通过让所有的通信都通过一个中心点，中间件模式使我们简化了对象之间的多对多关系。