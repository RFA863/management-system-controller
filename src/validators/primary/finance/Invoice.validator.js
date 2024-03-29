class InvoiceValidator {
    inputInvoice = {
        type: "object",
        properties: {

            noInvoice: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            berikat: {
                type: "boolean",
                nullable: false,
            },

            tanggal: {
                type: "string",
                nullable: false,
            },

            ppn: {
                type: "number",
                minimum: 1,
                nullable: false,
            },

            ubahHarga: {
                type: "boolean",
                nullable: false,
            },

            harga: {
                type: "number",
                minimum: 1,
                nullable: false
            },


        },

        required: ["noInvoice", "berikat", "tanggal", "ppn", "ubahHarga", "harga"],
        additionalProperties: false,
    };
}

export default InvoiceValidator;