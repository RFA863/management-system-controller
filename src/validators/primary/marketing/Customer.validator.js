class CustomerValidator {
    inputCustomer = {
        type: "object",
        properties: {

            nomor: {
                type: "number",
                maximum: 100000,
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
                maxLength: 25,
                minLength: 1,
                nullable: false,
            },

            email: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            npwp: {
                type: "boolean",
                nullable: false,
            },

            noNpwp: {
                type: "string",
                maxLength: 25,
                minLength: 0,
                nullable: true,
            },

            noTelp: {
                type: "string",
                maxLength: 100,
                minLength: 1,
                nullable: false,
            },

            noFax: {
                type: "string",
                maxLength: 25,
                minLength: 0,
                nullable: true,
            },

            alamat: {
                type: "string",
                maxLength: 50,
                minLength: 1,
                nullable: false,
            },

            alamatInvoice: {
                type: "string",
                maxLength: 50,
                minLength: 0,
                nullable: false,
            },
        },

        required: ["nomor", "nama", "kode", "email", "npwp", "noNpwp", "noTelp", "noFax", "alamat", "alamatInvoice"],
        additionalProperties: false,
    };
}

export default CustomerValidator;