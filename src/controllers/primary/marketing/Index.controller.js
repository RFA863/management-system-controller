import Ajv from "ajv";

import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import IndexService from "../../../services/primary/marketing/Index.service.js";
import IndexValidator from "../../../validators/primary/marketing/Index.validator.js";

class IndexController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();
        this.IndexValidator = new IndexValidator();
        this.IndexService = new IndexService(this.Server);
    }

    async input(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.IndexValidator.inputIndex)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const inputSrv = await this.IndexService.input(data);

        if (inputSrv === -1)
            return res.status(403).json(this.ResponsePreset.resErr(
                "403", "Forbiden, Data already exist", "service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }

    async get(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getSrv = await this.IndexService.get();

        if (getSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data not Found", "service", { code: -1 }));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getSrv));
    }

    async update(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.IndexValidator.inputIndex)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;

        const updateSrv = await this.IndexService.update(data, id);

        if (updateSrv === -1)
            return res.status(403).json(this.ResponsePreset.resErr(
                403, "Forbiden, Data already exist", "service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

}

export default IndexController;