// Library
import { DataTypes } from "sequelize";

class SupirModel {
    constructor(server) {

        const table = server.model.db.define(
            "supir",
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

            },

            {
                tableName: "supir",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default SupirModel;