// Library
import { DataTypes } from "sequelize";

class AturanTipeBoxModel {
    constructor(server) {

        const table = server.model.db.define(
            "aturan_tipebox",
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
                nama: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

                aturan: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

            },

            {
                tableName: "aturan_tipebox",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default AturanTipeBoxModel;