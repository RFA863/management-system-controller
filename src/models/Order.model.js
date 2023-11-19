// Library
import { DataTypes } from "sequelize";

class OrderModel {
    constructor(server) {

        const table = server.model.db.define(
            "orders",
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
                no_po: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },

                tanggal_order: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },

                tanggal_kirim: {
                    type: DataTypes.DATE,
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

            },

            {
                tableName: "orders",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default OrderModel;