import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import ListSuratJalanController from "../../../controllers/primary/finance/ListSuratJalan.controller.js";

class ListSuratJalanRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/finance/list_suratjalan"
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);
        this.ListSuratJalanController = new ListSuratJalanController(this.Server);
        this.route();
    }

    route() {
        this.API.get(this.routePrefix + "/getNoInvoice", this.AuthorizationMiddleware.check(),
            (req, res) => this.ListSuratJalanController.getNoInvoice(req, res));

        this.API.get(this.routePrefix + "/getInvoice", this.AuthorizationMiddleware.check(),
            (req, res) => this.ListSuratJalanController.getInvoice(req, res));
    }

}

export default ListSuratJalanRoute;