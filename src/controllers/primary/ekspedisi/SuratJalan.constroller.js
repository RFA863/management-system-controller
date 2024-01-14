import Ajv from "ajv";

import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import SuratJalanService from "../../../services/primary/ekspedisi/SuratJalan.service.js";
import SuratJalanValidator from "../../../validators/primary/ekspedisi/SuratJalan.validator.js";

class SuratJalanController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();
        this.SuratJalanValidator = new SuratJalanValidator();
        this.SuratJalanService = new SuratJalanService(this.Server);
    }

    async input(req, res) {
        if (req.middlewares.authorization.posisi !== "ekspedisi")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.SuratJalanValidator.inputSuratJalan)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;
        const inputSrv = await this.SuratJalanService.input(data, id);

        if (inputSrv === -1)
            return res.status(403).json(this.ResponsePreset.resErr(
                "403", "Forbiden, Data already exist", "service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }

    async get(req, res) {
        if (req.middlewares.authorization.posisi !== "ekspedisi")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const id = req.params.id;

        const getSrv = await this.SuratJalanService.get(id);

        if (getSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getSrv));
    }

    async update(req, res) {
        if (req.middlewares.authorization.posisi !== "ekspedisi")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.SuratJalanValidator.inputSuratJalan)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;
        const updateSrv = await this.SuratJalanService.update(data, id);

        if (updateSrv === -1)
            return res.status(403).json(this.ResponsePreset.resErr(
                "403", "Forbiden, Data already exist", "service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }

}

export default SuratJalanController;