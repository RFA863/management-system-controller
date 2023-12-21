import OrderModel from "../../../models/Order.model.js";
import CustomerModel from "../../../models/Customer.model.js";


class OrderService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.OrderModel = new OrderModel(this.Server).table;
        this.CustomerModel = new CustomerModel(this.Server).table;
    }

    async input(data) {
        const getOrder = await this.OrderModel.findOne({
            where: {
                id_customer: data.id_customer,
                no_po: data.noPo,
                tanggal_order: data.tanggalOrder,
                tanggal_kirim: data.tanggalKirim,
            }
        })

        if (getOrder !== null) return -1;

        const addOrder = await this.OrderModel.create({
            id_customer: data.id_customer,
            no_po: data.noPo,
            tanggal_order: data.tanggalOrder,
            tanggal_kirim: data.tanggalKirim,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addOrder.id;
    }

    async get() {
        const getOrder = await this.OrderModel.findAll();
        for (let i in getOrder) {
            const getCustomer = await this.CustomerModel.findAll({
                where: {
                    id: getOrder[i].dataValues.id_customer,
                }
            })
            getOrder[i].dataValues.Customer = getCustomer.map((val) => val.dataValues.nama);
        }

        if (getOrder.length === 0) return -1;

        return getOrder;
    }

    async getByCustomer(id) {
        const getOrder = await this.OrderModel.findAll({
            where: {
                id_customer: id
            }
        });

        if (getOrder.length === 0) return -1;

        for (let i in getOrder) {
            const getCustomer = await this.CustomerModel.findAll({
                where: {
                    id: id,
                }
            })
            getOrder[i].dataValues.Customer = getCustomer.map((val) => val.dataValues.nama);
        }



        return getOrder;
    }

    async getDetail(id) {
        const getDetailOrder = await this.OrderModel.findOne({
            where: {
                id: id,
            }
        })

        if (getDetailOrder === null) return -1;

        const getCustomer = await this.CustomerModel.findAll({
            where: {
                id: getDetailOrder.id_customer,
            }
        })

        getDetailOrder.dataValues.Customer = getCustomer.map((val) => val.dataValues.nama);

        const detailOrder = [getDetailOrder];

        return detailOrder;
    }

    async update(data, id) {
        const getOrder = await this.OrderModel.findOne({
            where: {
                id_customer: data.id_customer,
                no_po: data.noPo,
                tanggal_order: data.tanggalOrder,
                tanggal_kirim: data.tanggalKirim,
            }
        })

        if (getOrder !== null) return -1;

        const updateOrder = await this.OrderModel.update({
            id_customer: data.id_customer,
            no_po: data.noPo,
            tanggal_order: data.tanggalOrder,
            tanggal_kirim: data.tanggalKirim,
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        });

        return updateOrder;

    }

    async delete(id) {
        const deleteOrder = await this.OrderModel.destroy({
            where: {
                id: id
            }
        })

        return deleteOrder;
    }

}



export default OrderService;