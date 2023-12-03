import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import OrderConroller from "../../../controllers/primary/marketing/Order.controller.js";

class OrderRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/order";
        this.OrderConroller = new OrderConroller(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.OrderConroller.input(req, res));

        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.OrderConroller.get(req, res));

        this.API.get(this.routePrefix + "/getDetail/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.OrderConroller.getDetail(req, res));


        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.OrderConroller.update(req, res));

        this.API.delete(this.routePrefix + "/delete/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.OrderConroller.delete(req, res));
    }
}

export default OrderRoute;