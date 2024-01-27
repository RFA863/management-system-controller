import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import UserController from "../../../controllers/primary/marketing/User.controller.js";

class UserRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/user";
        this.UserController = new UserController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.UserController.input(req, res));

        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.UserController.get(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.UserController.update(req, res));

        this.API.put(this.routePrefix + "/delete/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.UserController.delete(req, res));



    }

}

export default UserRoute;