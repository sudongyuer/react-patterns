# 混合模式

> 像类或者对象添加方法而不需要继承(inheritance)

## 简介

`mixin`是一个对象，我们可以使用它来向另一个对象或类添加可重用的功能，而不需要使用继承。我们不能单独使用mixin:它们的唯一目的是在没有继承的情况下为对象或类添加功能。

## 实现

- 我们有一只狗🐶，他只有name这个属性
- 我们想给他怎加dog功能性，使用`Object.assign()`增强了Dog的的原型对象

虽然我们可以在没有继承的情况下使用mixins添加功能，但mixins本身可以使用继承!（好好理解一下这段话）

Object.assgin只能浅拷贝可枚举的属性

```js
class Dog {
  constructor(name) {
    this.name = name;
  }
}

const animalFunctionality = {
  walk: () => console.log("Walking!"),
  sleep: () => console.log("Sleeping!")
};

const dogFunctionality = {
  __proto__: animalFunctionality,
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!"),
  walk() {
    super.walk();
  },
  sleep() {
    super.sleep();
  }
};

Object.assign(Dog.prototype, dogFunctionality);

const pet1 = new Dog("Daisy");

console.log(pet1.name);
pet1.bark();
pet1.play();
pet1.walk();
pet1.sleep();

```

画了一幅图来解释上面的代码，请叫我灵魂画师，速冻鱼🐟！！！

![](https://tva1.sinaimg.cn/large/008i3skNgy1gzc8udmt2zj316g0u0juj.jpg)

## Window

> 解释一下为啥window有那么多的属性，就是通过mixin的方式混入的

 在现实世界中，mixin的一个例子可以在浏览器环境中的Window界面中看到。Window对象实现了它的许多属性从windowworkerglobalscope和windowweventhandlers mixins，这允许我们访问属性，如setTimeout和setInterval, indexedDB，和isSecureContext。  

由于它是一个mixin，因此它只用于向对象添加功能，因此您将不能创建类型为windowworkerglobalscope的对象。

缺点

尽管我们仍然可以使用 Container/Presentational 模式，即使使用 React Hooks，这种模式在较小的应用程序中很容易被过度使用。

## React

在引入ES6类之前，mixin经常被用来为React组件添加功能。React团队不鼓励使用mixins，因为它很容易给组件增加不必要的复杂性，使其难以维护和重用。React团队鼓励使用更高阶的组件（HOC），现在这些组件可以经常被Hooks取代。

## 总结

Mixins允许我们通过将功能注入到对象的原型中而不需要继承就可以轻松地将功能添加到对象中。修改对象的原型被认为是一种不好的做法，因为它会导致原型污染和函数起源的不确定性。