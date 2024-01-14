import Ajv from "ajv";

import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import CustomerService from "../../../services/primary/marketing/Customer.service.js";
import CustomerValidator from "../../../validators/primary/marketing/Customer.validator.js";

class CustomerController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();
        this.CustomerValidator = new CustomerValidator();
        this.CustomerService = new CustomerService(this.Server);
    }

    async input(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.CustomerValidator.inputCustomer)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const inputSrv = await this.CustomerService.input(data);

        if (inputSrv === -1)
            return res.status(403).json(this.ResponsePreset.resErr(
                "403", "Forbiden, Data already exist", "service", { code: -1 }
            ));

        if (inputSrv === -2)
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", "No NPWP must not be empty", "service", { code: -2 }
            ));

        if (inputSrv === -3)
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", "No NPWP must not be filled in", "service", { code: -3 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }

    async get(req, res) {
        if (req.middlewares.authorization.posisi !== "marketing")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const getSrv = await this.CustomerService.get();

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

        const schemaValidate = this.Ajv.compile(this.CustomerValidator.inputCustomer)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;

        const updateSrv = await this.CustomerService.update(data, id);

        if (updateSrv === -1)
            return res.status(403).json(this.ResponsePreset.resErr(
                403, "Forbiden, Data already exist", "service", { code: -1 }
            ));

        if (updateSrv === -2)
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", "No NPWP must not be empty", "service", { code: -2 }
            ));

        if (updateSrv === -3)
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", "No NPWP must not be filled in", "service", { code: -3 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

}

export default CustomerController;
