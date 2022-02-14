# 原型模式

> 在许多相同类型的对象之间共享属性

## 简介

 原型模式是在相同类型的许多对象之间共享属性的一种有用的方式。原型是JavaScript原生的对象，可以通过原型链被对象访问。

![image-20220208224711569](https://tva1.sinaimg.cn/large/008i3skNgy1gz6hm9swx0j30vo0f0dgi.jpg)

## 实现

```jsx
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");

Dog.prototype.play = () => console.log("Playing now!");

dog1.play();
```

原型对象也有`_proto_`属性指向它的原型对象

![image-20220208225316053](https://tva1.sinaimg.cn/large/008i3skNgy1gz6hsjtor1j30z40hugm9.jpg)

```jsx
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    console.log("Woof!");
  }
}

class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    console.log(`Flying!`);
  }
}

const dog1 = new SuperDog("Daisy");
dog1.bark();
dog1.fly();
```

## Object.create

> Object.create可以很方便的创建一个原型对象，并将返回值对象的原型指向它

参数接受一个对象，把它当作返回值的原型对象

```jsx
const dog = {
  bark() {
    console.log(`Woof!`);
  }
};

const pet1 = Object.create(dog);

pet1.bark(); // Woof!
console.log("Direct properties on pet1: ", Object.keys(pet1));//[]
console.log("Properties on pet1's prototype: ", Object.keys(pet1.__proto__));// ["bark"]
```

## 优点

原型模式允许我们轻松地让对象访问和继承其他对象的属性。由于原型链允许我们访问不是直接在对象本身上定义的属性，我们可以避免方法和属性的重复，从而减少内存使用量。

## 缺点

缺点也显而易见，多个对象共用同一个对象上的属性，并且都可以通过`_proto_`属性访问到和修改它，如果我们随意修改，就会造成不必要的麻烦