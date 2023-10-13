import sendLogs from "./helpers/Logger.helper.js"
import HandlerMiddleware from "./middlewares/Handler.middleware.js"

import "dotenv/config"
import Express from "express";

class Server {
    constructor() {
        this.env = process.env;
        this.sendLogs = sendLogs;

        this.init();
    }

    async init() {
        this.API = Express();
        new HandlerMiddleware(this);
        this.API.listen(this.env.PORT, this.env.HOST, () =>
            this.sendLogs("server listening on port " + this.env.PORT)
        );

    }
}

new Server();