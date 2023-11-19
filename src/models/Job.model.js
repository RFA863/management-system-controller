// Library
import { DataTypes } from "sequelize";

class JobModel {
    constructor(server) {

        const table = server.model.db.define(
            "job",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                id_order: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "orders",
                        key: "id",
                    },
                },
                id_tipebox: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "tipebox",
                        key: "id",
                    },
                },
                id_kualitas_detail: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "kualitas_detail",
                        key: "id",
                    },
                },
                id_kualitas_tipebox: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "kualitas_tipebox",
                        key: "id",
                    },
                },
                id_customer: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "customer",
                        key: "id",
                    },
                },

                no_job: {
                    type: DataTypes.STRING,
                    allowNull: false
                },

                panjang: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                lebar: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                tinggi: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                total_panjang: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                total_lebar: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                warna: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
                },

                perekat: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
                },

                keterangan: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },

                jumlah: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                ukuran_pengiriman: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },

                ukuran_kirim: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },

                index_harga: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },

                cancel: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },

                surat_jalan: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },

                payment: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },

                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },

                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },

            },

            {
                tableName: "job",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default JobModel;