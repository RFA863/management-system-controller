class AturanTipeBoxValidator {
    insertAturanTipeBox = {
        type: "object",
        properties: {
            nama: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            aturan: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },
        },

        required: ["nama", "aturan"],
        additionalProperties: false,
    };
}

export default AturanTipeBoxValidator;