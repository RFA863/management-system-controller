import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import TipeBoxDetailController from "../../../controllers/primary/marketing/TipeBoxDetail.constroller.js";

class TipeBoxDetailRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/tipebox_detail";
        this.TipeBoxDetailController = new TipeBoxDetailController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.TipeBoxDetailController.input(req, res));

        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.TipeBoxDetailController.get(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.TipeBoxDetailController.update(req, res));


    }

}

export default TipeBoxDetailRoute;