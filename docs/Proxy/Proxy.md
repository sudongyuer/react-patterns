# 代理模式

> 拦截和控制与目标对象的交互

## 简介

使用Proxy对象，我们可以更好地控制与某些对象的交互。代理对象可以决定当我们与对象交互时的行为，例如当我们获取一个值或设置一个值时。

 一般来说，代理是指某人的替身。而不是直接与那个人交谈，你将与代表你试图联系的人的代理人员交谈。同样的事情也发生在JavaScript中:我们将与Proxy对象进行交互，而不是直接与目标对象进行交互。

## 实现

### Proxy

在JavaScript中可以非常轻易实现代理模式

```js
const person={
  name:"sudongyu",
  age:18,
  nationality:"China"
}

const personProxy = new Proxy(person,{
  get(target, prop, receiver) {
    console.log(`The value of ${prop} is ${Reflect.get(...arguments)}`)
  },
  set(target, prop, value, receiver) {
    console.log(`Changed ${prop} from ${target[prop]} to ${value}`);
    Reflect.set(...arguments)
    return true;
  }
})
personProxy.name;
personProxy.name=20

```

代理又很多用处，比如`vue.js`前端框架响应式从Object.definedProperty迁移到proxy来做代理

业务中，比较常见可以做属性校验

```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(`Hmm.. this property doesn't seem to exist`);
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`Sorry, you can only pass numeric values for age.`);
    } else if (prop === "name" && value.length < 2) {
      console.log(`You need to provide a valid name.`);
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
    return true;
  }
});

personProxy.nonExistentProperty;
personProxy.age = "44";
personProxy.name = "";
```

### Reflect

> Reflect是什么呢，在我的理解，它就是目标对象的一个反射，JavaScript提供了一个名为Reflect的内置对象，它使我们在使用代理时更容易操作目标对象。

好处在哪里呢🧐，我们需要操作目标对象的时候就可以直接使用Reflect来进行操作了

```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  }
});

personProxy.name;
personProxy.age = 43;
personProxy.name = "Jane Doe";
```

## 优点

 代理是一种强大的方式，可以增加对对象行为的控制。代理可以有各种各样的用例:它可以帮助进行验证、格式化、通知或调试。

## 缺点

 过度使用Proxy对象或在每个处理程序方法调用上执行繁重的操作很容易对应用程序的性能产生负面影响。对于性能关键型代码，最好不要使用代理。