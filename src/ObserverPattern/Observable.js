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