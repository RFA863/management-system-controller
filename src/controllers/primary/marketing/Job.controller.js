import Ajv from "ajv";

import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import JobService from "../../../services/primary/marketing/Job.service.js";
import JobValidator from "../../../validators/primary/marketing/Job.validator.js";

class JobController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv;
        this.JobValidator = new JobValidator();
        this.ResponsePreset = new ResponsePreset();
        this.JobService = new JobService(this.Server);
    }



    async input(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.JobValidator.inputJob)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;
        const inputSrv = await this.JobService.input(data, id);

        if (inputSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Kualitas Detail Not Found", "service", { code: -1 }
            ));

        if (inputSrv === -2)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Kualitas Tipe Box Not Found", "service", { code: -2 }
            ));

        if (inputSrv === -3)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Order Not Found", "service", { code: -3 }
            ));

        if (inputSrv === -4)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Customer Not Found", "service", { code: -4 }
            ));

        if (inputSrv === -5)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Index Not Found", "service", { code: -5 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", inputSrv))
    }

    async get(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const id = req.params.id;
        const getSrv = await this.JobService.get(id);

        if (getSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getSrv));
    }

    async getJobOrder(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const id = req.params.id;
        const getJobOrderSrv = await this.JobService.getJobOrder(id);

        if (getJobOrderSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getJobOrderSrv));
    }

    async update(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.JobValidator.inputJob)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;
        const updateSrv = await this.JobService.update(data, id);

        if (updateSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Kualitas Detail Not Found", "service", { code: -1 }
            ));

        if (updateSrv === -2)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Kualitas Tipe Box Not Found", "service", { code: -2 }
            ));

        if (updateSrv === -3)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Order Not Found", "service", { code: -3 }
            ));

        if (updateSrv === -4)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Customer Not Found", "service", { code: -4 }
            ));

        if (updateSrv === -5)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Index Not Found", "service", { code: -5 }
            ));


        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }

    async delete(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const id = req.params.id;

        const deleteSrv = await this.JobService.delete(id);

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }


}

export default JobController;