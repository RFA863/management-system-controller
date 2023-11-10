// Library
import { DataTypes } from "sequelize";

class IndexModel {
    constructor(server) {

        const table = server.model.db.define(
            "index_table",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                id_customer: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "customer",
                        key: "id",
                    },
                },

                id_kualitasdetail: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "kualitas_detail",
                        key: "id",
                    },
                },

                indexvalue: {
                    type: DataTypes.INTEGER(25),
                    allowNull: false,
                },

            },

            {
                tableName: "index_table",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default IndexModel;