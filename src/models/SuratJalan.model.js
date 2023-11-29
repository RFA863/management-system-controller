// Library
import { DataTypes } from "sequelize";

class SuratJalanModel {
    constructor(server) {

        const table = server.model.db.define(
            "surat_jalan",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                id_job: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "job",
                        key: "id",
                    },
                },

                id_supir: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "supir",
                        key: "id",
                    },
                },

                id_mobil: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "mobil",
                        key: "id",
                    },
                },

                tanggal_kirim: {
                    type: DataTypes.DATE,
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
                tableName: "surat_jalan",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default SuratJalanModel;