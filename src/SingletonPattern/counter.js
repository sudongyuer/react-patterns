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
