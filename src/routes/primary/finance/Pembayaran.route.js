import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import PembayaranController from "../../../controllers/primary/finance/Pembayaran.controller.js";

class PembayaranRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/finance/pembayaran";
        this.PembayaranController = new PembayaranController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.PembayaranController.input(req, res));

        this.API.get(this.routePrefix + "/get/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.PembayaranController.get(req, res));

        this.API.get(this.routePrefix + "/getAll", this.AuthorizationMiddleware.check(),
            (req, res) => this.PembayaranController.getAll(req, res));

        this.API.get(this.routePrefix + "/getLunas", this.AuthorizationMiddleware.check(),
            (req, res) => this.PembayaranController.getLunas(req, res));

        this.API.get(this.routePrefix + "/getOutstanding", this.AuthorizationMiddleware.check(),
            (req, res) => this.PembayaranController.getOutstanding(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.PembayaranController.update(req, res));
    }
}

export default PembayaranRoute;