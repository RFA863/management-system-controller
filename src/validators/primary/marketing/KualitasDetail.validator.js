class KualitasDetailValidator {
    inputKualitasDetail = {
        type: "object",
        properties: {
            id_kualitas: {
                type: "number",
                maximum: 1000,
                minimum: 1,
                nullable: false,
            },

            nama: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            kode: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },
        },

        required: ["nama", "kode"],
        additionalProperties: false,
    };
}

export default KualitasDetailValidator;