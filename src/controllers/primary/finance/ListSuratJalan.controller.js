import Ajv from "ajv";

import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import ListSuratJalanService from "../../../services/primary/finance/ListSuratJalan.service.js";


class ListSuratJalanController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();
        this.ListSuratJalanService = new ListSuratJalanService(this.Server);
    }

    async getNoInvoice(req, res) {
        if (req.middlewares.authorization.posisi !== "finance")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getAllSrv = await this.ListSuratJalanService.getNoInvoice();

        if (getAllSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getAllSrv));
    }

    async getInvoice(req, res) {
        if (req.middlewares.authorization.posisi !== "finance")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getAllSrv = await this.ListSuratJalanService.getInvoice();

        if (getAllSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getAllSrv));
    }
}

export default ListSuratJalanController;