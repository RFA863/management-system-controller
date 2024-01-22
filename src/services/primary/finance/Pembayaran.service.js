import { Op } from "sequelize";

import JobModel from "../../../models/Job.model.js";
import InvoiceModel from "../../../models/Invoice.model.js";
import PembayaranModel from "../../../models/Pembayaran.model.js";


class PembayaranService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Op = Op;
        this.JobModel = new JobModel(this.Server).table;
        this.InvoiceModel = new InvoiceModel(this.Server).table;
        this.PembayaranModel = new PembayaranModel(this.Server).table;
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


        const updatePembayaran = await this.PembayaranModel.update({
            tgl_kontrabon: data.tglKontraBon,
            tgl_bayar: data.tglBayar,
            tgl_cair: data.tglCair,
            metode_bayar: data.metodeBayar,
            total_bayar: data.totalBayar,
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