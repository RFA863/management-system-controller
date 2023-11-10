class RumusIndexValidator {
    inputRumusIndex = {
        type: "object",
        properties: {
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

        required: ["rumusPanjang", "rumusLebar", "rumusOversize", "rumusTotal"],
        additionalProperties: false,
    };
}

export default RumusIndexValidator;