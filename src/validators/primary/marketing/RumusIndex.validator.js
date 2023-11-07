class RumusIndexValidator {
    inputRumusIndex = {
        type: "object",
        properties: {
            nama: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },
            rumusPanjang: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },
            rumusLebar: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },
            rumusOversize: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },
            rumusTotal: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },
        },

        required: ["nama", "rumusPanjang", "rumusLebar", "rumusOversize", "rumusTotal"],
        additionalProperties: false,
    };
}

export default RumusIndexValidator;