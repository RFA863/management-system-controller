import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import KualitasTipeBoxController from "../../../controllers/primary/marketing/KualitasTipeBox.controller.js";

class KualitasTipeBoxRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/kualitas_tipebox";
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);
        this.KualitasTipeBoxController = new KualitasTipeBoxController(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.KualitasTipeBoxController.input(req, res));

        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.KualitasTipeBoxController.get(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.KualitasTipeBoxController.update(req, res));


    }
}

export default KualitasTipeBoxRoute;