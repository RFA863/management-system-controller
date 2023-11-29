import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import OrderDetailController from "../../../controllers/primary/ekspedisi/OrderDetail.controller.js";

class OrderDetailRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/ekspedisi/order_detail";
        this.OrderDetailController = new OrderDetailController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.get(this.routePrefix + "/getAll", this.AuthorizationMiddleware.check(),
            (req, res) => this.OrderDetailController.getAll(req, res));

        this.API.get(this.routePrefix + "/get_suratjalan", this.AuthorizationMiddleware.check(),
            (req, res) => this.OrderDetailController.getSuratJalan(req, res));

        this.API.get(this.routePrefix + "/get_no_Suratjalan", this.AuthorizationMiddleware.check(),
            (req, res) => this.OrderDetailController.getNoSuratJalan(req, res));
    }
}

export default OrderDetailRoute;