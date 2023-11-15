class OrderValidator {
    inputOrder = {
        type: "object",
        properties: {
            id_customer: {
                type: "number",
                maximum: 1000,
                minimum: 1,
                nullable: false,
            },


            noPo: {
                type: "string",
                maxLength: 255,
                minLength: 1,
                nullable: false,
            },

            tanggalOrder: {
                type: "string",
                // format: "date",
                nullable: false,
            },

            tanggalKirim: {
                type: "string",
                // format: "date",
                nullable: false,
            },
        },

        required: ["id_customer", "noPo", "tanggalOrder", "tanggalKirim"],
        additionalProperties: false,
    };
}

export default OrderValidator;