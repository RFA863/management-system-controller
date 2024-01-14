import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import SupirController from "../../../controllers/primary/marketing/Supir.controller.js";

class SupirRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/supir";
        this.SupirController = new SupirController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.SupirController.input(req, res));

        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.SupirController.get(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.SupirController.update(req, res));


    }
}

export default SupirRoute;