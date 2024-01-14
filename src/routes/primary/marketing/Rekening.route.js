import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import RekeningController from "../../../controllers/primary/marketing/Rekening.controller.js";

class RekeningRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/rekening";
        this.RekeningController = new RekeningController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.RekeningController.input(req, res));
        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.RekeningController.get(req, res));
        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.RekeningController.update(req, res));

    }
}

export default RekeningRoute;