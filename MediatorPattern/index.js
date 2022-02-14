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

