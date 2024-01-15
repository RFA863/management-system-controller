import ResponsePreset from "../../../helpers/ResponsePreset.helper.js";
import InvoiceService from "../../../services/primary/finance/Invoice.service.js";
import InvoiceValidator from "../../../validators/primary/finance/Invoice.validator.js";

class InvoiceController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.ResponsePreset = new ResponsePreset();
        this.InvoiceValidator = new InvoiceValidator();
        this.InvoiceService = new InvoiceService(this.Server);
    }

    async input(req, res) {
        if (req.middlewares.authorization.posisi !== "finance")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const schemaValidate = this.Ajv.compile(this.InvoiceValidator.inputInvoice)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;
        const inputSrv = await this.InvoiceService.input(data, id);

        if (inputSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "Data Surat Jalan not Found", "service", { code: -1 }
            ));

        if (inputSrv === -2)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "Data Harga not Found", "service", { code: -2 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }

    async get(req, res) {
        if (req.middlewares.authorization.posisi !== "finance")
            return res.status(403).json({
                messagge: "Forbidden",
            });

        const id = req.params.id;

        const getSrv = await this.InvoiceService.get(id);

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

        const getAllSrv = await this.InvoiceService.getAll();

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

        const schemaValidate = this.Ajv.compile(this.InvoiceValidator.inputInvoice)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ))

        const data = req.body;
        const id = req.params.id;
        const updateSrv = await this.InvoiceService.update(data, id);

        if (updateSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "Data Invoice not Found", "service", { code: -1 }
            ));

        if (updateSrv === -2)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "Data Harga not Found", "service", { code: -2 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null))
    }
}

export default InvoiceController;