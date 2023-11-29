class JobValidator {
    inputJob = {
        type: "object",
        properties: {
            id_tipebox: {
                type: "number",
                minimum: 1,
                nullable: false,
            },

            id_kualitas_detail: {
                type: "number",
                minimum: 1,
                nullable: false,
            },

            panjang: {
                type: "number",
                maximum: 500000,
                minimum: 1,
                nullable: false,
            },

            lebar: {
                type: "number",
                maximum: 500000,
                minimum: 1,
                nullable: false,
            },

            tinggi: {
                type: "number",
                maximum: 500000,
                minimum: 1,
                nullable: false,
            },

            warna: {
                type: "string",
                maxLength: 50,
                minLength: 0,
                nullable: true,
            },


            perekat: {
                type: "string",
                maxLength: 50,
                minLength: 0,
                nullable: true,
            },


            keterangan: {
                type: "string",
                maxLength: 255,
                minLength: 0,
                nullable: true,
            },

            jumlah: {
                type: "number",
                maximum: 500000,
                minimum: 1,
                nullable: false,
            },

            ukuran_pengiriman: {
                type: "string",
                maxLength: 255,
                minLength: 0,
                nullable: true,
            },

            ukuran_kirim: {
                type: "boolean",
                nullable: false,
            },

            index_harga: {
                type: "boolean",
                nullable: false,
            },

            index_panjang: {
                type: "number",
                maximum: 500000,
                minimum: 0,
                nullable: true,
            },

            index_lebar: {
                type: "number",
                maximum: 500000,
                minimum: 0,
                nullable: true,
            },

            penambahan_harga: {
                type: "number",
                maximum: 500000,
                minimum: 0,
                nullable: true,
            },

            pengurangan_harga: {
                type: "number",
                maximum: 500000,
                minimum: 0,
                nullable: true,
            },

        },

        required: ["id_tipebox", "id_kualitas_detail",
            "panjang", "lebar", "tinggi", "warna", "perekat",
            "keterangan", "jumlah", "ukuran_pengiriman",
            "ukuran_kirim", "index_harga", "index_panjang",
            "index_lebar", "penambahan_harga", "pengurangan_harga"],
        additionalProperties: false,
    };
}

export default JobValidator;