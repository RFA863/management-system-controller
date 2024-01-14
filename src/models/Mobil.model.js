// Library
import { DataTypes } from "sequelize";

class MobilModel {
    constructor(server) {

        const table = server.model.db.define(
            "mobil",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                noplat: {
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

                deleted_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },

            },

            {
                tableName: "mobil",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default MobilModel;