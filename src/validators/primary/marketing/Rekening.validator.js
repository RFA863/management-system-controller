class RekeningValidator {
    inputRekening = {
        type: "object",
        properties: {
            bank: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            noRekening: {
                type: "string",
                maxLength: 25,
                minLength: 1,
                nullable: false,
            },

            atasNama: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            ct: {
                type: "boolean",
                nullable: false,
            },
        },

        required: ["bank", "noRekening", "atasNama", "ct"],
        additionalProperties: false,
    };
}

export default RekeningValidator;