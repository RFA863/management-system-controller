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

        // if (inputSrv === -5)
        //     return res.status(404).json(this.ResponsePreset.resErr(
        //         "404", "Data Index Not Found", "service", { code: -5 }
        //     ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", inputSrv))
    }

    async totalUkuran(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.JobValidator.totalUkuran)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;

        const totalUkuranSrv = await this.JobService.totalUkuran(data);


        if (totalUkuranSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Kualitas Detail Not Found", "service", { code: -1 }
            ));

        if (totalUkuranSrv === -2)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Kualitas Tipe Box Not Found", "service", { code: -2 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", totalUkuranSrv));
    }

    async cekIndex(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const data = req.body;
        const id = req.params.id;


        if (data.id_kualitas_detail === "" || data.id_kualitas_detail === 0 || data.id_kualitas_detail === null)
            return res.status(403).json(this.ResponsePreset.resErr(
                403, "Data can't be empty", "validator", { code: -1 }
            ));

        const cekIndexSrv = await this.JobService.cekIndex(id, data);

        if (cekIndexSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Order Not Found", "service", { code: -1 }
            ));

        if (cekIndexSrv === -2)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Index Not Found", "service", { code: -2 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", cekIndexSrv));


    }

    async cekHarga(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.JobValidator.cekHarga)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;

        const cekHargaSrv = await this.JobService.cekHarga(id, data);

        if (cekHargaSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data Order Not Found", "service", { code: -1 }
            ));

        if (cekHargaSrv === -2)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Index Not Found", "service", { code: -2 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", cekHargaSrv));


    }

    async getAll(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getAllSrv = await this.JobService.getAll();

        if (getAllSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getAllSrv));

    }

    async getCancel(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getCancelSrv = await this.JobService.getCancel();

        if (getCancelSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getCancelSrv));

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


        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }

    async cancel(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const id = req.params.id;

        const cancelSrv = await this.JobService.cancel(id);

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }


}

export default JobController;