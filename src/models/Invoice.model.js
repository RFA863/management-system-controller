// Library
import { DataTypes } from "sequelize";

class InvoiceModel {
    constructor(server) {

        const table = server.model.db.define(
            "invoice",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                id_suratjalan: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "surat_jalan",
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

                no_invoice: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

                tanggal: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },

                berikat: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },

                ppn: {
                    type: DataTypes.INTEGER(6),
                    allowNull: true,
                },

                nominal_ppn: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },

                harga_bayar: {
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
                tableName: "invoice",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default InvoiceModel;