# 工厂模式👀

> 使用工厂函数去创建对象

## 简介

使用工厂模式，我们可以使用工厂函数来创建新的对象。当一个函数返回一个新对象而不使用new关键字时，它就是一个工厂函数!

![News 02](https://tva1.sinaimg.cn/large/e6c9d24egy1gzmljo31kwj21hc0u0dhn.jpg)

## 实现

假设我们的应用程序需要很多用户。我们可以用firstName、lastName和email属性创建新用户。工厂函数也为新创建的对象添加了一个fullName属性，该属性返回firstName和lastName。

```jsx
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
});

const user1 = createUser({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com"
});

const user2 = createUser({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com"
});

console.log(user1);
console.log(user2);
```

 如果我们要创建相对复杂和可配置的对象，工厂模式可能很有用。键和值的值可能依赖于特定的环境或配置。使用工厂模式，我们可以轻松地创建包含自定义键和值的新对象!

```jsx
const createObjectFromArray = ([key, value]) => ({
  [key]: value
});

createObjectFromArray(["name", "Sudongyu"]); // { name: "Sudongyu" }
```

## 优点

 当我们必须创建多个共享相同属性的小对象时，工厂模式非常有用。工厂函数可以根据当前环境或用户特定的配置轻松地返回自定义对象。

## 缺点

在JavaScript中，工厂模式只不过是一个不使用new关键字而返回对象的函数。ES6的箭头函数允许我们创建每次隐式返回一个对象的小型工厂函数。  然而，在很多情况下，每次创建新实例比创建新对象可能更节省内存。

```jsx
class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const user1 = new User({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com"
});

const user2 = new User({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com"
});
```

