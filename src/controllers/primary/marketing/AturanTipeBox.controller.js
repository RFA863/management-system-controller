import Ajv from "ajv";

import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import AturanTipeBoxValidator from "../../../validators/primary/marketing/AturanTipeBox.validator.js";
import AturanTipeBoxService from "../../../services/primary/marketing/AturanTipeBox.service.js";

class AturanTipeBoxController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();
        this.AturanTipeBoxValidator = new AturanTipeBoxValidator();
        this.AturanTipeBoxService = new AturanTipeBoxService(this.Server);
    }

    async input(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.AturanTipeBoxValidator.insertAturanTipeBox)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ));


        const data = req.body;
        const inputSrv = await this.AturanTipeBoxService.input(data, req.params.id);

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




        const getSrv = await this.AturanTipeBoxService.get(req.params.id);

        if (getSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not found ", "service", { code: -1 }
        ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getSrv));
    }

    async update(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });
        const schemaValidate = this.Ajv.compile(this.AturanTipeBoxValidator.insertAturanTipeBox)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ));

        const data = req.body;
        const updateSrv = await this.AturanTipeBoxService.update(data, req.params.id);

        if (updateSrv === -1)
            return res.status(403), json(this.ResponsePreset.resErr(
                403,
                "Forbiden, Data Already exist",
                "service",
                { code: -1 }
            ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));

    }

    async delete(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });


        const deleteSrv = await this.AturanTipeBoxService.delete(req.params.id);

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }
}

export default AturanTipeBoxController;