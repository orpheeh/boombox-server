const NewGame = require('./NewGame');

module.exports = class {

    constructor(){
        this.list = [];
    }

    /**
     * 
     * @param {NewGame} 
     */
    addGame(game){
        this.list.push(game);
    }

    removeGame(game){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i] == game){
                this.list.splice(i, 1);
            }
        }
    }

    getGame(id){
        return this.list.find(game => game.id == id);
    }
}