import Ajv from "ajv";

import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import OrderDetailService from "../../../services/primary/ekspedisi/OrderDetail.service.js";

class OrderDetailController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();
        this.OrderDetailService = new OrderDetailService(this.Server);
    }

    async getAll(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing" && req.middlewares.authorization.posisi !== "ekspedisi")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getSrv = await this.OrderDetailService.getAll();

        if (getSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data not Found", "service", { code: -1 }));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getSrv));
    }

    async getSuratJalan(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing" && req.middlewares.authorization.posisi !== "ekspedisi")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getSrv = await this.OrderDetailService.getSuratJalan();

        if (getSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data not Found", "service", { code: -1 }));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getSrv));
    }

    async getNoSuratJalan(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing" && req.middlewares.authorization.posisi !== "ekspedisi")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getSrv = await this.OrderDetailService.getNoSuratJalan();

        if (getSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Data not Found", "service", { code: -1 }));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getSrv));
    }

}


export default OrderDetailController;