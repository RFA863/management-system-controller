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

        },

        required: ["nama"],
        additionalProperties: false,
    };
}

export default AturanTipeBoxValidator;