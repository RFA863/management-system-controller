class KualitasTipeBoxValidator {
    inputKualitasTipeBox = {
        type: "object",
        properties: {
            id_tipebox: {
                type: "number",
                minimum: 1,
                nullable: false,
            },

            id_kualitas: {
                type: "number",
                minimum: 1,
                nullable: false,
            },
            konstanta_panjang: {
                type: "number",
                minimum: -1000,
                nullable: false,
            },
            konstanta_lebar_ganjil: {
                type: "number",
                minimum: -1000,
                nullable: false,
            },
            konstanta_lebar_genap: {
                type: "number",
                minimum: -1000,
                nullable: false,
            },
            kuping: {
                type: "number",
                minimum: -1000,
                nullable: false,
            },



        },

        required: ["id_tipebox", "id_kualitas", "konstanta_panjang", "konstanta_lebar_ganjil", "konstanta_lebar_genap", "kuping"],
        additionalProperties: false,
    };
}

export default KualitasTipeBoxValidator;