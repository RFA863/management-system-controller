class SuratJalanValidator {
    inputSuratJalan = {
        type: "object",
        properties: {
            id_job: {
                type: "number",
                minimum: 1,
                nullable: false,
            },

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


            tanggalKirim: {
                type: "string",
                nullable: false,
            },
        },

        required: ["id_job", "id_supir", "id_mobil", "tanggalKirim"],
        additionalProperties: false,
    };
}

export default SuratJalanValidator;