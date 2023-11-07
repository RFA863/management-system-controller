// Library
import { DataTypes } from "sequelize";

class KualitasModel {
    constructor(server) {

        const table = server.model.db.define(
            "kualitas",
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
                tableName: "kualitas",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default KualitasModel;