import JobModel from "../../../models/Job.model.js";
import HargaModel from "../../../models/Harga.model.js";
import InvoiceModel from "../../../models/Invoice.model.js";
import CustomerModel from "../../../models/Customer.model.js"
import SuratJalanModel from "../../../models/SuratJalan.model.js";

class InvoiceService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.InvoiceModel = new InvoiceModel(this.Server).table;
        this.SuratJalanModel = new SuratJalanModel(this.Server).table;
        this.JobModel = new JobModel(this.Server).table;
        this.HargaModel = new HargaModel(this.Server).table;
        this.CustomerModel = new CustomerModel(this.Server).table;
    }

    async input(data, id) {

        const getSuratJalan = await this.SuratJalanModel.findOne({
            where: {
                id: id
            }
        })

        if (getSuratJalan === null) return -1;

        const getHarga = await this.HargaModel.findOne({
            where: {
                id_job: getSuratJalan.id_job
            }
        })

        if (getHarga === null) return -2;

        let nominalPPN = (getHarga.harga_keseluruhan * data.ppn) / 100;

        if (data.berikat === true) {
            nominalPPN = 0
        }

        const hargaBayar = nominalPPN + getHarga.harga_keseluruhan;

        const InputInvoice = await this.InvoiceModel.create({
            id_suratjalan: id,
            id_job: getSuratJalan.id_job,
            no_invoice: data.noInvoice,
            tanggal: data.tanggal,
            berikat: data.berikat,
            ppn: data.ppn,
            nominal_ppn: nominalPPN,
            harga_bayar: hargaBayar,
            created_at: new Date(),
            updated_at: new Date(),

        })

        return InputInvoice;
    }

    async get(id) {
        const getInvoice = await this.InvoiceModel.findOne({
            where: {
                id: id,
                deleted_at: null
            }
        })

        if (getInvoice === null) return -1;

        const getSuratJalan = await this.SuratJalanModel.findOne({
            where: {
                id: getInvoice.id_suratjalan,
            }
        })

        const getJob = await this.JobModel.findOne({
            where: {
                id: getInvoice.id_job,
            }
        })

        const getHarga = await this.HargaModel.findOne({
            where: {
                id_job: getInvoice.id_job,
            }
        })

        const getCustomer = await this.CustomerModel.findOne({
            where: {
                id: getJob.id_customer
            }
        })

        getInvoice.dataValues.customer = getCustomer.dataValues.nama;
        getInvoice.dataValues.no_suratjalan = getSuratJalan.dataValues.no_suratjalan;
        getInvoice.dataValues.tanggal_kirim = getSuratJalan.dataValues.tanggal_kirim;
        getInvoice.dataValues.jumlah = getJob.dataValues.selesai;
        getInvoice.dataValues.harga_satuan = getHarga.dataValues.total_harga;
        getInvoice.dataValues.total_harga = getHarga.dataValues.harga_keseluruhan;

        return getInvoice;
    }

    async getAll() {
        const getAllInvoice = await this.InvoiceModel.findAll({
            where: {
                deleted_at: null
            }
        })

        if (getAllInvoice === null) return -1;

        for (let i in getAllInvoice) {
            const getJob = await this.JobModel.findOne({
                where: {
                    id: getAllInvoice[i].dataValues.id_job,
                }
            })

            const getHarga = await this.HargaModel.findOne({
                where: {
                    id_job: getAllInvoice[i].dataValues.id_job,
                }
            })

            getAllInvoice[i].dataValues.id_customer = getJob.dataValues.id_customer;
            getAllInvoice[i].dataValues.sub_total = getHarga.dataValues.harga_keseluruhan;

            const getCustomer = await this.CustomerModel.findOne({
                where: {
                    id: getAllInvoice[i].dataValues.id_customer,
                }
            })

            getAllInvoice[i].dataValues.customer = getCustomer.dataValues.nama;
        }

        return getAllInvoice;
    }

    async update(data, id) {
        const getInvoice = await this.InvoiceModel.findOne({
            where: {
                id: id
            }
        })

        if (getInvoice === null) return -1;

        const getHarga = await this.HargaModel.findOne({
            where: {
                id_job: getInvoice.id_job
            }
        })

        if (getHarga === null) return -2;

        let nominalPPN = (getHarga.harga_keseluruhan * data.ppn) / 100;

        if (data.berikat === true) {
            nominalPPN = 0
        }

        const hargaBayar = nominalPPN + getHarga.harga_keseluruhan;

        const updateInvoice = await this.InvoiceModel.update({
            id_suratjalan: id,
            id_job: getSuratJalan.id_job,
            no_invoice: data.noInvoice,
            tanggal: data.tanggal,
            berikat: data.berikat,
            ppn: data.ppn,
            nominal_ppn: nominalPPN,
            harga_bayar: hargaBayar,
            created_at: new Date(),
            updated_at: new Date(),

        }, {
            where: {
                id: id,
            }
        })

        return updateInvoice;
    }


}

export default InvoiceService;