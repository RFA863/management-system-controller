class UserValidator {
    inputUser = {
        type: "object",
        properties: {
            posisi: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            email: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            password: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            akses: {
                type: "boolean",
                nullable: false,
            },
        },

        required: ["posisi", "email", "password", "akses"],
        additionalProperties: false,
    };
}

export default UserValidator;