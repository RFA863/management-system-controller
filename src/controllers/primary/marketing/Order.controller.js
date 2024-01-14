import Ajv from "ajv";


import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import OrderService from "../../../services/primary/marketing/Order.service.js";
import OrderValidator from "../../../validators/primary/marketing/Order.validator.js";

class OrderConroller {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();

        this.ResponsePreset = new ResponsePreset();
        this.OrderValidator = new OrderValidator();
        this.OrderService = new OrderService(this.Server);
    }

    async input(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.OrderValidator.inputOrder)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const inputSrv = await this.OrderService.input(data);

        if (inputSrv === -1)
            return res.status(403).json(this.ResponsePreset.resErr(
                "403", "Forbiden, Data already exist", "service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", inputSrv))
    }

    async get(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getSrv = await this.OrderService.get();

        if (getSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getSrv));
    }

    async getByCustomer(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getByCustomerSrv = await this.OrderService.getByCustomer(req.params.id);

        if (getByCustomerSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getByCustomerSrv));
    }

    async getDetail(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const id = req.params.id;

        const getDetailSrv = await this.OrderService.getDetail(id);

        if (getDetailSrv === -1) return res.status(404).json(this.ResponsePreset.resErr(
            "404", "Data not Found", "service", { code: -1 }
        ))

        res.status(200).json(this.ResponsePreset.resOK("Ok", getDetailSrv));
    }

    async update(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.OrderValidator.inputOrder)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;
        const updateSrv = await this.OrderService.update(data, id);

        if (updateSrv === -1)
            return res.status(403).json(this.ResponsePreset.resErr(
                "403", "Forbiden, Data already exist", "service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }

}

export default OrderConroller;