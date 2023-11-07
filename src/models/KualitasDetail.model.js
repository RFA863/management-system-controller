// Library
import { DataTypes } from "sequelize";

class KualitasDetailModel {
    constructor(server) {

        const table = server.model.db.define(
            "kualitas_detail",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                id_kualitas: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "kualitas",
                        key: "id",
                    },
                },

                nama: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

                kode: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

            },

            {
                tableName: "kualitas_detail",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default KualitasDetailModel;