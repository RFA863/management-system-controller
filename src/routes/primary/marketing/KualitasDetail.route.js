import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import KualitasDetailController from "../../../controllers/primary/marketing/KualitasDetail.controller.js";

class KualitasDetailRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/kualitasdetail";
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);
        this.KualitasDetailController = new KualitasDetailController(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.KualitasDetailController.input(req, res));
        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.KualitasDetailController.get(req, res));
        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.KualitasDetailController.update(req, res));

    }
}

export default KualitasDetailRoute;