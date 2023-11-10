class IndexValidator {
    inputIndex = {
        type: "object",
        properties: {
            id_customer: {
                type: "number",
                maximum: 1000,
                minimum: 1,
                nullable: false,
            },

            id_kualitasDetail: {
                type: "number",
                maximum: 1000,
                minimum: 1,
                nullable: false,
            },

            indexValue: {
                type: "number",
                maximum: 500000,
                minimum: 1,
                nullable: false,
            },
        },

        required: ["id_customer", "id_kualitasDetail", "indexValue"],
        additionalProperties: false,
    };
}

export default IndexValidator;