// Library
import { DataTypes } from "sequelize";

class KualitasTipeBoxModel {
    constructor(server) {

        const table = server.model.db.define(
            "kualitas_tipebox",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                id_tipebox: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "tipebox",
                        key: "id",
                    },
                },

                id_kualitas: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "kualitas",
                        key: "id",
                    },
                },

                konstanta_panjang: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                konstanta_lebar_ganjil: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                konstanta_lebar_genap: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                kuping: {
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
                tableName: "kualitas_tipebox",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default KualitasTipeBoxModel;