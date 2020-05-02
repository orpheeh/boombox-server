const dgram = require('dgram')

module.exports = class {

    constructor(port, { messageManager}){
        this.port = port;
        this.server = dgram.createSocket('udp4')
        this.messageManager = messageManager;
    }

    start(){
        
        this.server.on('error', (err) => {
            console.log(`server error: ${err.stack}`)
            this.server.close()
        })
        
        this.server.on("message", (msg, rinfo) => {
            console.log("server got message from " + rinfo.address + ":" + rinfo.port + "/" + msg);
            this.messageManager.exec(msg.toString(), rinfo, this.server);
        })
        
        this.server.on("listening",() => {
            const address = this.server.address()
            console.log("server listening " + address.address + ":" + address.port)
        }) 

        this.server.bind(this.port)
    }
}