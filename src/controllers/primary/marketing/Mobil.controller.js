import Ajv from "ajv";

import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import MobilValidator from "../../../validators/primary/marketing/Mobil.validator.js";
import MobilService from "../../../services/primary/marketing/Mobil.service.js";

class MobilController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();
        this.MobilValidator = new MobilValidator();
        this.MobilService = new MobilService(this.Server);
    }

    async input(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.MobilValidator.inputMobil)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const inputSrv = await this.MobilService.input(data);

        if (inputSrv === -1)
            return res.status(403).json(this.ResponsePreset.resErr(
                "403", "Forbiden, Data already exist", "service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }

    async get(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing" && req.middlewares.authorization.posisi !== "ekspedisi")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getSrv = await this.MobilService.get();

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

        const schemaValidate = this.Ajv.compile(this.MobilValidator.inputMobil)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;

        const updateSrv = await this.MobilService.update(data, id);

        if (updateSrv === -1)
            return res.status(403).json(this.ResponsePreset.resErr(
                "403", "Forbiden, Data already exist", "service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

    async delete(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const id = req.params.id;

        const deleteSrv = await this.MobilService.delete(id);

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

}

export default MobilController;