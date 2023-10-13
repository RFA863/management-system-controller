import Express from "express";
import cors from "cors";

class HandlerMiddleware {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;

        this.global();
    }

    global() {
        this.API.use(Express.json());

        this.API.use(
            cors({
                methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
                origin: "*",
            })
        );

        this.API.use((req, res, next) => {
            req.middlewares = {};
            next();
        });
    }
}

export default HandlerMiddleware;