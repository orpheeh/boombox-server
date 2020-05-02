const Player = require('./Player');

module.exports = class {

    /**
     * 
     * @param {Player} player1 
     * @param {Player} player2 
     */
    constructor(player1, player2){
        this.players = [player1, player2];
        this.lastSequence = "";
        this.currentPlayerIndex = 0;
        this.id = Date.now();
    }

    /**
     * 
     * @param {String} sequence 
     */
    play(sequence){
        const last = sequence.substr(0, sequence.length-1);
        if(last.includes(this.lastSequence)){
            this.lastSequence = sequence;
        } else {
            this.restart();
        }
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
        return this.players[1 - this.currentPlayerIndex];
    }

    otherPlayer(player){
        if(this.players[0].username == player.username){
            return this.players[1];
        } else {
            return this.players[0];
        }
    }

    restart(){
        this.players[1-this.currentPlayerIndex].score++;
        this.lastSequence = "";
    }
}