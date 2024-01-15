// Library
import { DataTypes } from "sequelize";

class PembayaranModel {
    constructor(server) {

        const table = server.model.db.define(
            "pembayaran",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                id_invoice: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "invoice",
                        key: "id",
                    },
                },

                id_job: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "job",
                        key: "id",
                    },
                },

                dpp: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },

                tgl_kontrabon: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },

                tgl_bayar: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },

                metode_bayar: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

                total_bayar: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },

                pembulatan: {
                    type: DataTypes.INTEGER(6),
                    allowNull: true,
                },

                sisa_bayar: {
                    type: DataTypes.FLOAT,
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
                tableName: "pembayaran",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default PembayaranModel;