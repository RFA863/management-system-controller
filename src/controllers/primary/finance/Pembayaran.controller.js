import Ajv from "ajv";

import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import PembayaranService from "../../../services/primary/finance/Pembayaran.service.js";
import PembayaranValidator from "../../../validators/primary/finance/Pembayaran.validator.js";

class PembayaranController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();
        this.PembayaranValidator = new PembayaranValidator();
        this.PembayaranService = new PembayaranService(this.Server);
    }

    async input(req, res) {
        if (req.middlewares.authorization.posisi !== "finance")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.PembayaranValidator.inputPembayaran)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;
        const inputSrv = await this.PembayaranService.input(data, id);

        if (inputSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "Data invoice not Found", "service", { code: -1 }
            ));



        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }

    async get(req, res) {
        if (req.middlewares.authorization.posisi !== "finance")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const id = req.params.id;

        const getSrv = await this.PembayaranService.get(id);

        if (getSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getSrv));
    }

    async getAll(req, res) {
        if (req.middlewares.authorization.posisi !== "finance")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getAllSrv = await this.PembayaranService.getAll();

        if (getAllSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getAllSrv));
    }

    async getLunas(req, res) {
        if (req.middlewares.authorization.posisi !== "finance")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getAllSrv = await this.PembayaranService.getLunas();

        if (getAllSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getAllSrv));
    }

    async getOutstanding(req, res) {
        if (req.middlewares.authorization.posisi !== "finance")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getAllSrv = await this.PembayaranService.getOutstanding();

        if (getAllSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getAllSrv));
    }

    async update(req, res) {
        if (req.middlewares.authorization.posisi !== "finance")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.PembayaranValidator.inputPembayaran)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;
        const updateSrv = await this.PembayaranService.update(data, id);

        if (updateSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "Data Invoice not Found", "service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }
}

export default PembayaranController;