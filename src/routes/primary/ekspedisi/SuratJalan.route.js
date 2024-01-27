import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";
import SuratJalanController from "../../../controllers/primary/ekspedisi/SuratJalan.constroller.js";

class SuratJalanRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/ekspedisi/suratjalan";
        this.SuratJalanController = new SuratJalanController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.SuratJalanController.input(req, res));

        this.API.get(this.routePrefix + "/get/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.SuratJalanController.get(req, res));

        this.API.get(this.routePrefix + "/cetak_suratJalan/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.SuratJalanController.cetakSuratJalan(req, res));

        this.API.get(this.routePrefix + "/getAll", this.AuthorizationMiddleware.check(),
            (req, res) => this.SuratJalanController.getAll(req, res));

        this.API.get(this.routePrefix + "/getNoPayment", this.AuthorizationMiddleware.check(),
            (req, res) => this.SuratJalanController.getNoPayment(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.SuratJalanController.update(req, res));


    }
}

export default SuratJalanRoute;