import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import KualitasController from "../../../controllers/primary/marketing/Kulitas.controller.js";

class KualitasRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/kualitas";
        this.KualitasController = new KualitasController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.KualitasController.input(req, res));
        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.KualitasController.get(req, res));
        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.KualitasController.update(req, res));
        this.API.delete(this.routePrefix + "/delete/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.KualitasController.delete(req, res));
    }

}
export default KualitasRoute;