import JobController from "../../../controllers/primary/marketing/Job.controller.js";
import AuthorizationMiddleware from "../../../middlewares/Authorization.middleware.js";

class JobRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/marketing/job";
        this.JobController = new JobController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);
        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.input(req, res));

        this.API.post(this.routePrefix + "/total_ukuran", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.totalUkuran(req, res));

        this.API.post(this.routePrefix + "/cek_index/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.cekIndex(req, res));

        this.API.post(this.routePrefix + "/cek_harga/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.cekHarga(req, res));

        this.API.get(this.routePrefix + "/getAll", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.getAll(req, res));

        this.API.get(this.routePrefix + "/getCancel", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.getCancel(req, res));

        this.API.get(this.routePrefix + "/get/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.get(req, res));

        this.API.get(this.routePrefix + "/cetakJob/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.cetakJob(req, res));

        this.API.get(this.routePrefix + "/getJobOrder/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.getJobOrder(req, res));

        this.API.get(this.routePrefix + "/getJob_detail/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.getJobDetail(req, res));

        this.API.get(this.routePrefix + "/get_customer/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.getCustomerJob(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.update(req, res));

        this.API.put(this.routePrefix + "/cancel/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.cancel(req, res));
    }
}

export default JobRoute;