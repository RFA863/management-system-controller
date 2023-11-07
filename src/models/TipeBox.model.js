// Library
import { DataTypes } from "sequelize";

class TipeBoxModel {
    constructor(server) {

        const table = server.model.db.define(
            "tipebox",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                nama: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

                kode: {
                    type: DataTypes.STRING(25),
                    allowNull: false,
                },

            },

            {
                tableName: "tipebox",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default TipeBoxModel;