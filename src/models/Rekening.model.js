// Library
import { DataTypes } from "sequelize";

class RekeningModel {
    constructor(server) {

        const table = server.model.db.define(
            "rekening",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                bank: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

                norekening: {
                    type: DataTypes.STRING(25),
                    allowNull: false,
                },

                atasnama: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

                ct: {
                    type: DataTypes.BOOLEAN,
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
                tableName: "rekening",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default RekeningModel;