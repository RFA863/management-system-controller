// Library
import { DataTypes } from "sequelize";

class RumusIndexModel {
    constructor(server) {

        const table = server.model.db.define(
            "rumusindex",
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
                rumuspanjang: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                rumuslebar: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                rumusoversize: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                rumustotal: {
                    type: DataTypes.STRING(50),
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
                tableName: "rumusindex",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default RumusIndexModel;