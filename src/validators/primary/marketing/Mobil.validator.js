class MobilValidator {
    inputMobil = {
        type: "object",
        properties: {
            noPlat: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

        },

        required: ["noPlat"],
        additionalProperties: false,
    };
}

export default MobilValidator;