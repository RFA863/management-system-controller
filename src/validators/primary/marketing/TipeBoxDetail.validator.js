class TipeBoxDetailValidator {
    inputTipeBoxDetail = {
        type: "object",
        properties: {
            id_tipebox: {
                type: "number",
                minimum: 1,
                nullable: false,
            },


            nama: {
                type: "string",
                maxLength: 255,
                minLength: 0,
                nullable: true,
            },

            rumusPanjang: {
                type: "string",
                maxLength: 255,
                minLength: 1,
                nullable: false,
            },

            rumusLebar: {
                type: "string",
                maxLength: 255,
                minLength: 1,
                nullable: false,
            },

            rumusOversize: {
                type: "string",
                maxLength: 255,
                minLength: 1,
                nullable: false,
            },

            konstantaPanjang: {
                type: "boolean",
                nullable: false,
            },

            konstantaLebar: {
                type: "boolean",
                nullable: false,
            },

        },

        required: ["id_tipebox", "nama", "rumusPanjang", "rumusLebar", "rumusOversize", "konstantaPanjang", "konstantaLebar"],
        additionalProperties: false,
    };
}

export default TipeBoxDetailValidator;