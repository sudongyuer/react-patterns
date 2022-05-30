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
