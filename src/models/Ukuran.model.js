// Library
import { DataTypes } from "sequelize";

class UkuranModel {
    constructor(server) {

        const table = server.model.db.define(
            "ukuran_job",
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

                ukuran: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },

                ukuran_pengiriman: {
                    type: DataTypes.STRING(255),
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
                tableName: "ukuran_job",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default UkuranModel;