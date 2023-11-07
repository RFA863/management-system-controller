import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js"
import AturanTipeBoxController from "../../../controllers/primary/marketing/AturanTipeBox.controller.js"

class AturanTipeBoxRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/tipebox/aturan";
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);
        this.AturanTipeBoxController = new AturanTipeBoxController(this.Server);
        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.AturanTipeBoxController.input(req, res)
        );
        this.API.get(this.routePrefix + "/get/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.AturanTipeBoxController.get(req, res)
        );
        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.AturanTipeBoxController.update(req, res)
        );
        this.API.delete(this.routePrefix + "/delete/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.AturanTipeBoxController.delete(req, res)
        );
    }
}

export default AturanTipeBoxRoute;