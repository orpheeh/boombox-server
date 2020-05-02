const UDPServer = require('./UDPServer');
const MessageManager = require('./MessageManager');
const UserConnectedRespository = require('./UserConnectedRepository');
const GameRepository = require('./GameRepository');


const connectedRepository = new UserConnectedRespository();
const gameRepository = new GameRepository();
const messageManager = new MessageManager({ connectedRepository, gameRepository })
const server = new UDPServer(43215 ,{ messageManager});

server.start();