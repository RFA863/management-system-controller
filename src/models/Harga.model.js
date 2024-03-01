// Library
import { DataTypes } from "sequelize";

class HargaModel {
    constructor(server) {

        const table = server.model.db.define(
            "harga_job",
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
                    allowNull: true,
                },

                lebar: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },

                penambahan_harga: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },

                pengurangan_harga: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },

                isIndexed: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },

                index_harga: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                sub_total: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                total_harga: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                harga_keseluruhan: {
                    type: DataTypes.INTEGER,
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
                tableName: "harga_job",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default HargaModel;