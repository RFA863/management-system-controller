import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import CustomerController from "../../../controllers/primary/marketing/Customer.controller.js";

class CustomerRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/customer";
        this.CustomerController = new CustomerController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.CustomerController.input(req, res));

        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.CustomerController.get(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.CustomerController.update(req, res));

        this.API.put(this.routePrefix + "/delete/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.CustomerController.delete(req, res));


    }

}

export default CustomerRoute;