import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import MobilController from "../../../controllers/primary/marketing/Mobil.controller.js";

class MobilRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/mobil";
        this.MobilController = new MobilController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.MobilController.input(req, res));
        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.MobilController.get(req, res));
        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.MobilController.update(req, res));

    }

}

export default MobilRoute;