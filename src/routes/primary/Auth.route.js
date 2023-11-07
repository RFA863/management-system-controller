import AuthController from "../../controllers/primary/Auth.controller.js";

class AuthRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/auth";
        this.AuthController = new AuthController(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix, (req, res) => this.AuthController.Login(req, res)
        );
    }
}

export default AuthRoute;