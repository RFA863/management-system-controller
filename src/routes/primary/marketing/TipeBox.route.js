import TipeBoxController from "../../../controllers/primary/marketing/TipeBox.controller.js"
import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js"

class TipeBoxRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/tipebox";

        this.TipeBoxController = new TipeBoxController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.TipeBoxController.input(req, res));

        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.TipeBoxController.get(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.TipeBoxController.update(req, res));

        this.API.put(this.routePrefix + "/delete/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.TipeBoxController.delete(req, res));


    }
}

export default TipeBoxRoute;