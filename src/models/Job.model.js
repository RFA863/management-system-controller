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

                no_nt: {
                    type: DataTypes.STRING,
                    allowNull: false
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

                sisa: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                selesai: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                ukuran_kirim: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },

                use_index: {
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

                invoice: {
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

                deleted_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
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