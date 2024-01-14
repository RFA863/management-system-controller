import Ajv from "ajv";

import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import KualitasValidator from "../../../validators/primary/marketing/Kualitas.validator.js";
import KualitasService from "../../../services/primary/marketing/Kualitas.service.js";

class KualitasController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();
        this.KualitasValidator = new KualitasValidator();
        this.KualitasService = new KualitasService(this.Server);
    }

    async input(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.KualitasValidator.inputKualitas)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))


        const data = req.body;

        const inputSrv = await this.KualitasService.input(data);

        if (inputSrv === -1) return res.status(403).json(this.ResponsePreset.resErr(
            "403", "Forbiden, Data already exist", "Service", { code: -1 }
        ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

    async get(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getSrv = await this.KualitasService.get();

        if (getSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "Service", { code: -1 }));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getSrv));

    }

    async update(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.KualitasValidator.inputKualitas)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;

        const updateSrv = await this.KualitasService.update(data, id);


        if (updateSrv === -1) return res.status(403).json(this.ResponsePreset.resErr(
            "403", "Forbiden, Data already exist", "service", { code: -1 }
        ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

}

export default KualitasController;