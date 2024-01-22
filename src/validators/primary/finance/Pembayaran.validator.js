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
                type: "number",
                minimum: 1,
                nullable: false
            },

            pembulatan: {
                type: "number",
                minimum: -999999999,
                nullable: true
            },

            tglCair: {
                type: "string",
                nullable: true
            },

            keterangan: {
                type: "string",
                minLength: 0,
                maxLength: 200,
                nullable: true
            }



        },

        required: ["tglKontraBon", "tglBayar", "metodeBayar", "totalBayar", "pembulatan", "keterangan"],
        additionalProperties: false,
    };
}

export default PembayaranValidator;