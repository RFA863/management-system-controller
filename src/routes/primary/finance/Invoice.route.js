import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import InvoiceController from "../../../controllers/primary/finance/Invoice.conroller.js";

class InvoiceRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/finance/invoice";
        this.InvoiceController = new InvoiceController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.InvoiceController.input(req, res));

        this.API.get(this.routePrefix + "/get/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.InvoiceController.get(req, res));

        this.API.get(this.routePrefix + "/cetakInvoice/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.InvoiceController.cetakInvoice(req, res));


        this.API.get(this.routePrefix + "/getAll", this.AuthorizationMiddleware.check(),
            (req, res) => this.InvoiceController.getAll(req, res));

        this.API.get(this.routePrefix + "/getBlmBayar", this.AuthorizationMiddleware.check(),
            (req, res) => this.InvoiceController.getBlmBayar(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.InvoiceController.update(req, res));
    }
}

export default InvoiceRoute;