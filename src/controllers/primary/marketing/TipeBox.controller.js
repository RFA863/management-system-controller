import Ajv from "ajv";

import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import TipeBoxService from "../../../services/primary/marketing/TipeBox.service.js";
import TipeBoxValidator from "../../../validators/primary/marketing/TipeBox.validator.js";

class TipeBoxController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;

        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();

        this.TipeBoxValidator = new TipeBoxValidator();
        this.TipeBoxService = new TipeBoxService(this.Server);
    }

    async input(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.TipeBoxValidator.insertTipeBox)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const inputSrv = await this.TipeBoxService.input(data);

        if (inputSrv === -1)
            return res.status(403).json(this.ResponsePreset.resErr(
                "403", "Forbiden, Tipe Box already exist", "service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }

    async get(req, res) {
        ;
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });


        const getSrv = await this.TipeBoxService.get();

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

        const schemaValidate = this.Ajv.compile(this.TipeBoxValidator.insertTipeBox)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))


        const data = req.body;

        const updateSrv = await this.TipeBoxService.update(data, req.params.id);

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

    async delete(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });



        const deleteSrv = await this.TipeBoxService.delete(req.params.id);

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }
}

export default TipeBoxController;