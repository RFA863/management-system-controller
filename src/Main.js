import sendLogs from "./helpers/Logger.helper.js"
import HandlerRoute from "./routes/Handler.route.js";
import HandlerModel from "./models/Handler.model.js"
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
        this.model = new HandlerModel(this);
        const isModelConnected = await this.model.connect();
        if (isModelConnected === -1) return;

        this.API = Express();
        new HandlerMiddleware(this);
        new HandlerRoute(this);


        this.API.listen(this.env.PORT, this.env.HOST, () =>
            this.sendLogs("server listening on port " + this.env.PORT)
        );

    }
}

new Server();