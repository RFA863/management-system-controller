class TipeBoxValidator {
    insertTipeBox = {
        type: "object",
        properties: {
            nama: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            kode: {
                type: "string",
                maxLength: 25,
                minLength: 1,
                nullable: false,
            },
        },

        required: ["nama", "kode"],
        additionalProperties: false,
    };
}

export default TipeBoxValidator;