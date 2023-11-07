// Library
import { DataTypes } from "sequelize";

class UserModel {
    constructor(server) {

        const table = server.model.db.define(
            "user",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                posisi: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

                email: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                akses: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                }
            },

            {
                tableName: "user",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default UserModel;