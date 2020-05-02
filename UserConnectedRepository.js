module.exports = class {

    constructor(){
        this.list = [];
    }

    addUser(username, address, port){
        this.list.push({ username, address, port, free: true });
    }

    removeUser(username){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i].username == username){
                this.list.splice(i, 1);
            }
        }
    }

    getUser(username){
        return this.list.find((element) => element.username == username );
    }
}