class SuratJalanValidator {
    inputSuratJalan = {
        type: "object",
        properties: {

            id_supir: {
                type: "number",
                minimum: 1,
                nullable: false,
            },

            id_mobil: {
                type: "number",
                minimum: 1,
                nullable: false,
            },

            noSuratJalan: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            tanggalKirim: {
                type: "string",
                nullable: false,
            },

            closeOrder: {
                type: "boolean",
                nullable: false,
            },

            selesai: {
                type: "number",
                nullable: false,
            }
        },

        required: ["id_supir", "id_mobil", "noSuratJalan", "tanggalKirim", "closeOrder", "selesai"],
        additionalProperties: false,
    };
}

export default SuratJalanValidator;