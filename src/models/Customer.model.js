// Library
import { DataTypes } from "sequelize";

class CustomerModel {
    constructor(server) {

        const table = server.model.db.define(
            "customer",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                nomor: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                },

                nama: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

                kode: {
                    type: DataTypes.STRING(25),
                    allowNull: false,
                },

                email: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

                npwp: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },

                nonpwp: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },

                notelp: {
                    type: DataTypes.STRING(25),
                    allowNull: false,
                },

                nofax: {
                    type: DataTypes.STRING(25),
                    allowNull: true,
                },

                alamat: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },

                alamatinvoice: {
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
                tableName: "customer",
                timestamps: false,
            }
        );

        this.table = table;
    }
}

export default CustomerModel;