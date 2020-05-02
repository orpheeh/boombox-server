const Player = require('./Player');
const NewGame = require('./NewGame');

module.exports = class {

    constructor({ connectedRepository, gameRepository }){
        this.connectedRepository = connectedRepository;
        this.gameRepository = gameRepository;
    }

    exec(msg, rinfo, server){
        const messageParts = msg.split(":");
        if(messageParts[0] == "CONNEXION"){
            this.connexionRequest(rinfo, server, messageParts[1], messageParts[2]);
        } else if(messageParts[0] == "NEW_GAME"){
            this.createNewGameRequest(rinfo, server, messageParts[1], messageParts[2]);
        } else if(messageParts[0] == "FIND_PLAYER"){
            this.findPlayerRequest(rinfo, server, messageParts[1]);
        } else if(messageParts[0] == "PLAY"){
            this.playRequest(rinfo, server, messageParts[1], messageParts[2]);
        }
    }

    connexionRequest(rinfo, server, username, port){
        this.connectedRepository.addUser(username, rinfo.address, port);
        server.send("CONNEXION:SUCCESS", port, rinfo.address, (err, bytes) => {
            if(err){
                console.log(err);
            } else {
                console.log(bytes);
            }
        })
    }

    createNewGameRequest(rinfo, server, username1, username2){
        const player1 = new Player(username1, 0);
        const player2 = new Player(username2, 0);
        const newGame = new NewGame(player1, player2);
        this.gameRepository.addGame(newGame);
        const pi1 = this.connectedRepository.getUser(player1.username);
        const pi2 = this.connectedRepository.getUser(player2.username);
        server.send("NEW_GAME:" + newGame.id + ":" + player1.username + ":" + player2.username,
         pi1.port, pi1.address, (err, bytes) => {
            if(err){
                console.log(err);
            } else {
                console.log(bytes);
            }
        })
        server.send("NEW_GAME:" + newGame.id + ":" + player1.username + ":" + player2.username,
         pi2.port, pi2.address, (err, bytes) => {
            if(err){
                console.log(err);
            } else {
                console.log(bytes);
            }
        })
    }

    playRequest(rinfo, server, sequence, id){
        const newGame = this.gameRepository.getGame(id);
        const currentPlayer = newGame.play(sequence);
        const otherPlayer = newGame.otherPlayer(currentPlayer);
        const otherPlayerInfo = this.connectedRepository.getUser(otherPlayer.username);
        const playerInfo = this.connectedRepository.getUser(currentPlayer.username.trim());
        server.send("PLAY:" + otherPlayer.score + ":" + currentPlayer.score + ":" + newGame.lastSequence + ":", otherPlayerInfo.port, otherPlayerInfo.address, (err, bytes) => {
            if(err){
                console.log(err);
            } else {
                console.log(bytes);
            }
        })
        server.send("PLAY:" + currentPlayer.score + ":" + otherPlayer.score + ":" + newGame.lastSequence + ":", playerInfo.port, playerInfo.address, (err, bytes) => {
            if(err){
                console.log(err);
            } else {
                console.log(bytes);
            }
        })
    }

    findPlayerRequest(rinfo, server, username) {
        const playerInfo = this.connectedRepository.getUser(username);
        let str = "";
        this.connectedRepository.list.forEach(element => {
            str = str + element.username + ":";
        })
        server.send("FIND_PLAYER:" + str, playerInfo.port, playerInfo.address, (err, bytes) => {
            if(err){
                console.log(err);
            } else {
                console.log(bytes);
            }
        });
    }
}