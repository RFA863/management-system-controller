class PembayaranValidator {
    inputPembayaran = {
        type: "object",
        properties: {

            tglKontraBon: {
                type: "string",
                nullable: false,
            },

            tglBayar: {
                type: "string",
                nullable: false,
            },

            metodeBayar: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            totalBayar: {
                type: "float",
                minimum: 1,
                nullable: false
            },

            pembulatan: {
                type: "number",
                minimum: 0,
                nullable: true
            },

            sisaBayar: {
                type: "float",
                minimum: 1,
                nullable: false,
            },

        },

        required: ["tglKontaraBon", "tglBayar", "metodeBayar", "totalBayar", "pembulatan", "sisaBayar"],
        additionalProperties: false,
    };
}

export default PembayaranValidator;