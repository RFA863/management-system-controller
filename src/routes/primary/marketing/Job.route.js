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

        this.API.get(this.routePrefix + "/get/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.get(req, res));

        this.API.put(this.routePrefix + "/update/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.update(req, res));

        this.API.delete(this.routePrefix + "/delete/:id", this.AuthorizationMiddleware.check(),
            (req, res) => this.JobController.delete(req, res));
    }
}

export default JobRoute;