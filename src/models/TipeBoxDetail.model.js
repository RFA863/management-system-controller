// Library
import { DataTypes } from "sequelize";

class TipeBoxDetailModel {
    constructor(server) {

        const table = server.model.db.define(
            "tipebox_detail",
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
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },

                rumus_panjang: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },

                rumus_lebar: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },

                rumus_oversize: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
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
                tableName: "tipebox_detail",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default TipeBoxDetailModel;