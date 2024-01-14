import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import RumusIndexController from "../../../controllers/primary/marketing/RumusIndex.controller.js"

class RumusIndexRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/tipebox/rumusindex";
        this.RumusIndexController = new RumusIndexController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.RumusIndexController.input(req, res));

        this.API.get(this.routePrefix + "/get/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.RumusIndexController.get(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.RumusIndexController.update(req, res));

        this.API.put(this.routePrefix + "/delete/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.RumusIndexController.delete(req, res));

    };
}
export default RumusIndexRoute;