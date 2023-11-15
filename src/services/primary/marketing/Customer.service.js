import CustomerModel from "../../../models/Customer.model.js";

class CustomerService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.CustomerModel = new CustomerModel(this.Server).table;
    }

    async input(data) {
        const getCustomer = await this.CustomerModel.findOne({
            where: {
                nama: data.nama
            }
        });


        if (getCustomer !== null) return -1;
        if (data.npwp === true && data.noNpwp.trim() === '') return -2;
        if (data.npwp === false && data.noNpwp.trim() !== '') return -3;

        const addCustomer = await this.CustomerModel.create({
            nomor: data.nomor,
            nama: data.nama,
            kode: data.kode,
            email: data.email,
            npwp: data.npwp,
            nonpwp: data.noNpwp,
            notelp: data.noTelp,
            nofax: data.noFax,
            alamat: data.alamat,
            alamatinvoice: data.alamatInvoice,
        });

        return addCustomer;
    }

    async get() {
        const getCustomer = await this.CustomerModel.findAll()

        if (getCustomer.length === 0) return -1;

        return getCustomer;
    }

    async update(data, id) {
        if (data.npwp === true && data.noNpwp.trim() === '') return -1;
        if (data.npwp === false && data.noNpwp.trim() !== '') return -2;

        const updateCustomer = await this.CustomerModel.update({
            nomor: data.nomor,
            nama: data.nama,
            kode: data.kode,
            email: data.email,
            npwp: data.npwp,
            nonpwp: data.noNpwp,
            notelp: data.noTelp,
            nofax: data.noFax,
            alamat: data.alamat,
            alamatinvoice: data.alamatInvoice,
        }, {
            where: {
                id: id
            }
        })

        return updateCustomer;
    }

    async delete(id) {
        const deleteCustomer = await this.CustomerModel.destroy({
            where: {
                id: id
            }
        })

        return deleteCustomer;
    }
}

export default CustomerService;