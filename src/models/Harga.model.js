// Library
import { DataTypes } from "sequelize";

class HargaModel {
    constructor(server) {

        const table = server.model.db.define(
            "harga",
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
                id_job: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "job",
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
                id_index: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "index_table",
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

                total_harga: {
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

            },

            {
                tableName: "harga",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default HargaModel;