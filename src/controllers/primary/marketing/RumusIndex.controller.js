import Ajv from "ajv";

import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import RumusIndexService from "../../../services/primary/marketing/RumusIndex.service.js";
import RumusIndexValidator from "../../../validators/primary/marketing/RumusIndex.validator.js";

class RumusIndexController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();
        this.RumusIndexValidator = new RumusIndexValidator();
        this.RumusIndexService = new RumusIndexService(this.Server);
    }

    async input(req, res) {
        if (req.middlewares.authorization.marketing !== true)
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.RumusIndexValidator.inputRumusIndex)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))


        const id = req.params.id;
        const data = req.body;
        const inputSrv = await this.RumusIndexService.input(data, id);

        if (inputSrv === -1) return res.status(403).json(this.ResponsePreset.resErr(
            "403", "Forbiden, data already exist", "service", { code: -1 }));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

    async get(req, res) {
        if (req.middlewares.authorization.marketing !== true)
            return res.status(403).json({
                messagge: "Forbidden",
            });


        const id = req.params.id;

        const getSrv = await this.RumusIndexService.get(id);

        if (getSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not found", "service", { code: -1 }));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getSrv))
    }

    async update(req, res) {
        if (req.middlewares.authorization.marketing !== true)
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.RumusIndexValidator.inputRumusIndex)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))


        const id = req.params.id;
        const data = req.body;

        const updateSrv = await this.RumusIndexService.update(data, id);

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

    async delete(req, res) {
        if (req.middlewares.authorization.marketing !== true)
            return res.status(403).json({
                messagge: "Forbidden",
            });


        const id = req.params.id;

        const deleteSrv = await this.RumusIndexService.delete(id);

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }
}
export default RumusIndexController;