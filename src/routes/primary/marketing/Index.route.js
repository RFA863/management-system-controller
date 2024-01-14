import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import IndexController from "../../../controllers/primary/marketing/Index.controller.js";

class IndexRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/index";
        this.IndexController = new IndexController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.IndexController.input(req, res));

        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.IndexController.get(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.IndexController.update(req, res));


    }
}

export default IndexRoute;