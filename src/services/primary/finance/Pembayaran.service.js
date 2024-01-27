import { Op } from "sequelize";

import JobModel from "../../../models/Job.model.js";
import HargaModel from "../../../models/Harga.model.js";
import UkuranModel from "../../../models/Ukuran.model.js";
import InvoiceModel from "../../../models/Invoice.model.js";
import CustomerModel from "../../../models/Customer.model.js";
import KualitasModel from "../../../models/Kualitas.model.js";
import PembayaranModel from "../../../models/Pembayaran.model.js";
import KualitasDetailModel from "../../../models/KualitasDetail.model.js";

class PembayaranService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Op = Op;
        this.JobModel = new JobModel(this.Server).table;
        this.HargaModel = new HargaModel(this.Server).table;
        this.UkuranModel = new UkuranModel(this.Server).table;
        this.InvoiceModel = new InvoiceModel(this.Server).table;
        this.CustomerModel = new CustomerModel(this.Server).table;
        this.KualitasModel = new KualitasModel(this.Server).table;
        this.PembayaranModel = new PembayaranModel(this.Server).table;
        this.KualitasDetailModel = new KualitasDetailModel(this.Server).table;
    }

    async input(data, id) {
        const getInvoice = await this.InvoiceModel.findOne({
            where: {
                id: id,
                deleted_at: null
            }
        })

        if (getInvoice === null) return -1;

        let sisaBayar = getInvoice.harga_bayar - (data.totalBayar + data.pembulatan);

        const inputPembayaran = await this.PembayaranModel.create({
            id_invoice: id,
            id_job: getInvoice.id_job,
            tgl_kontrabon: data.tglKontraBon,
            tgl_bayar: data.tglBayar,
            tgl_cair: data.tglCair,
            metode_bayar: data.metodeBayar,
            total_bayar: data.totalBayar,
            pembulatan: data.pembulatan,
            sisa_bayar: sisaBayar,
            keterangan: data.keterangan,
            created_at: new Date(),
            updated_at: new Date(),

        })

        const updateJob = await this.JobModel.update({
            payment: true,
            updated_at: new Date(),
        }, {
            where: {
                id: getInvoice.id_job,
            }
        })

        return inputPembayaran;
    }

    async get(id) {
        const getPembayaran = await this.PembayaranModel.findOne({
            where: {
                id: id,
                deleted_at: null
            }
        })

        if (getPembayaran === null) return -1;

        const getInvoice = await this.InvoiceModel.findOne({
            where: {
                id: getPembayaran.id_invoice
            }
        })

        const getHarga = await this.HargaModel.findOne({
            where: {
                id_job: getPembayaran.id_job
            }
        })

        const getJob = await this.JobModel.findOne({
            where: {
                id: getPembayaran.id_job,
            }
        })

        const getCustomer = await this.CustomerModel.findOne({
            where: {
                id: getJob.id_customer
            }
        })

        const getUkuran = await this.UkuranModel.findOne({
            where: {
                id_job: getPembayaran.id_job,
            }
        })

        const getKualitasDetail = await this.KualitasDetailModel.findOne({
            where: {
                id: getJob.id_kualitas_detail,
            }
        })

        const getKualitas = await this.KualitasModel.findOne({
            where: {
                id: getKualitasDetail.id_kualitas
            }
        })

        getPembayaran.dataValues.jumlah = getJob.dataValues.selesai;
        getPembayaran.dataValues.customer = getCustomer.dataValues.nama;
        getPembayaran.dataValues.kualitas = getKualitas.dataValues.nama;
        getPembayaran.dataValues.ppn = getInvoice.dataValues.nominal_ppn;
        getPembayaran.dataValues.harga_bayar = getInvoice.dataValues.harga_bayar;
        getPembayaran.dataValues.dpp = getHarga.dataValues.harga_keseluruhan;
        getPembayaran.dataValues.no_invoice = getInvoice.dataValues.no_invoice;
        getPembayaran.dataValues.ukuran_pengiriman = getUkuran.dataValues.ukuran_pengiriman;



        return getPembayaran;
    }

    async getAll() {
        const getAllPembayaran = await this.PembayaranModel.findAll({
            where: {
                deleted_at: null
            }
        })

        if (getAllPembayaran.length === 0) return -1;

        return getAllPembayaran;
    }

    async getLunas() {
        const getLunasPembayaran = await this.PembayaranModel.findAll({
            where: {
                deleted_at: null,
                sisa_bayar: 0,
            }
        })

        if (getLunasPembayaran.length === 0) return -1;

        for (let i in getLunasPembayaran) {
            const getHarga = await this.HargaModel.findOne({
                where: {
                    id_job: getLunasPembayaran[i].dataValues.id_job,
                }
            })

            const getInvoice = await this.InvoiceModel.findOne({
                where: {
                    id: getLunasPembayaran[i].dataValues.id_invoice,
                }
            })

            getLunasPembayaran[i].dataValues.ppn = getInvoice.dataValues.nominal_ppn;
            getLunasPembayaran[i].dataValues.total_harga = getInvoice.dataValues.harga_bayar;
            getLunasPembayaran[i].dataValues.dpp = getHarga.dataValues.harga_keseluruhan;

        }

        return getLunasPembayaran;
    }

    async getOutstanding() {
        const getPembayaran = await this.PembayaranModel.findAll({
            where: {
                deleted_at: null,
                sisa_bayar: { [Op.gt]: 0 },
            }
        })

        if (getPembayaran.length === 0) return -1;

        for (let i in getPembayaran) {
            const getHarga = await this.HargaModel.findOne({
                where: {
                    id_job: getPembayaran[i].dataValues.id_job,
                }
            })

            const getInvoice = await this.InvoiceModel.findOne({
                where: {
                    id: getPembayaran[i].dataValues.id_invoice,
                }
            })

            const getJob = await this.JobModel.findOne({
                where: {
                    id: getPembayaran[i].dataValues.id_job
                }
            })

            getPembayaran[i].dataValues.id_customer = getJob.dataValues.id_customer;
            getPembayaran[i].dataValues.ppn = getInvoice.dataValues.nominal_ppn;
            getPembayaran[i].dataValues.no_invoice = getInvoice.dataValues.no_invoice;
            getPembayaran[i].dataValues.tanggal = getInvoice.dataValues.tanggal;
            getPembayaran[i].dataValues.total_harga = getInvoice.dataValues.harga_bayar;
            getPembayaran[i].dataValues.dpp = getHarga.dataValues.harga_keseluruhan;

            const getCustomer = await this.CustomerModel.findOne({
                where: {
                    id: getPembayaran[i].dataValues.id_customer
                }
            })

            getPembayaran[i].dataValues.customer = getCustomer.dataValues.nama;

        }

        return getPembayaran;
    }

    async update(data, id) {
        const getPembayaran = await this.PembayaranModel.findOne({
            where: {
                id: id,
                deleted_at: null
            }
        })

        if (getPembayaran === null) return -1;

        let sisaBayar = getPembayaran.sisa_bayar - (data.totalBayar + data.pembulatan);

        let totalBayar = getPembayaran.total_bayar + data.totalBayar;

        const updatePembayaran = await this.PembayaranModel.update({
            tgl_kontrabon: data.tglKontraBon,
            tgl_bayar: data.tglBayar,
            tgl_cair: data.tglCair,
            metode_bayar: data.metodeBayar,
            total_bayar: totalBayar,
            pembulatan: data.pembulatan,
            sisa_bayar: sisaBayar,
            keterangan: data.keterangan,
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        })

        return updatePembayaran;
    }
}

export default PembayaranService;