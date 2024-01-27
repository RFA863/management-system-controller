import JobModel from "../../../models/Job.model.js";
import OrderModel from "../../../models/Order.model.js";
import SupirModel from "../../../models/Supir.model.js";
import MobilModel from "../../../models/Mobil.model.js";
import HargaModel from "../../../models/Harga.model.js";
import UkuranModel from "../../../models/Ukuran.model.js";
import KualitasModel from "../../../models/Kualitas.model.js";
import CustomerModel from "../../../models/Customer.model.js";
import SuratJalanModel from "../../../models/SuratJalan.model.js";
import KualitasDetailModel from "../../../models/KualitasDetail.model.js";

class SuratJalanService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.JobModel = new JobModel(this.Server).table;
        this.OrderModel = new OrderModel(this.Server).table;
        this.SupirModel = new SupirModel(this.Server).table;
        this.MobilModel = new MobilModel(this.Server).table;
        this.HargaModel = new HargaModel(this.Server).table;
        this.UkuranModel = new UkuranModel(this.Server).table;
        this.KualitasModel = new KualitasModel(this.Server).table;
        this.CustomerModel = new CustomerModel(this.Server).table;
        this.SuratJalanModel = new SuratJalanModel(this.Server).table;
        this.KualitasDetailModel = new KualitasDetailModel(this.Server).table;
    }

    async input(data, id) {
        const getSuratJalan = await this.SuratJalanModel.findOne({
            where: {
                id_job: id,
            }
        });

        if (getSuratJalan !== null) return -1;

        const addSuratJalan = await this.SuratJalanModel.create({
            id_job: id,
            id_supir: data.id_supir,
            id_mobil: data.id_mobil,
            close_order: data.closeOrder,
            tanggal_kirim: data.tanggalKirim,
            no_suratjalan: data.noSuratJalan,
            created_at: new Date(),
            updated_at: new Date(),
        });

        const getJob = await this.JobModel.findOne({
            where: {
                id: id
            }
        });

        const getHarga = await this.HargaModel.findOne({
            where: {
                id_job: id
            }
        })

        let brngSelesai = getJob.jumlah;
        let brngSisa = 0;
        let hargaKeseluruhan = getHarga.harga_keseluruhan;

        if (data.closeOrder === true) {
            brngSelesai = data.selesai;
            brngSisa = getJob.jumlah - data.selesai;
            hargaKeseluruhan = getHarga.total_harga * data.selesai;
        }

        const updateJob = await this.JobModel.update({
            surat_jalan: true,
            selesai: brngSelesai,
            sisa: brngSisa,
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        })

        const updateHarga = await this.HargaModel.update({
            harga_keseluruhan: hargaKeseluruhan,
            updated_at: new Date()
        }, { where: { id_job: id } })

        return addSuratJalan;
    }

    async get(id) {
        const getSuratJalan = await this.SuratJalanModel.findOne({
            where: {
                id: id,
            }
        })

        if (getSuratJalan === null) return -1;

        const getJob = await this.JobModel.findOne({
            where: {
                id: getSuratJalan.id_job,
            }
        })

        const getSupir = await this.SupirModel.findOne({
            where: {
                id: getSuratJalan.id_supir,
            }
        })

        const getmobil = await this.MobilModel.findOne({
            where: {
                id: getSuratJalan.id_mobil,
            }
        })

        const getHarga = await this.HargaModel.findOne({
            where: {
                id_job: getSuratJalan.id_job,
            }
        })

        const getCustomer = await this.CustomerModel.findOne({
            where: {
                id: getJob.id_customer,
            }
        })

        const getUkuran = await this.UkuranModel.findOne({
            where: {
                id_job: getSuratJalan.id_job,
            }
        })

        const getKualitasDetail = await this.KualitasDetailModel.findOne({
            where: {
                id: getJob.id_kualitas_detail,
            }
        })

        const getKualitas = await this.KualitasModel.findOne({
            where: {
                id: getKualitasDetail.id_kualitas,
            }
        })

        getSuratJalan.dataValues.no_nt = getJob.dataValues.no_nt;
        getSuratJalan.dataValues.no_po = getJob.dataValues.no_po;
        getSuratJalan.dataValues.jumlah = getJob.dataValues.jumlah;
        getSuratJalan.dataValues.selesai = getJob.dataValues.selesai;
        getSuratJalan.dataValues.sisa = getJob.dataValues.sisa;
        getSuratJalan.dataValues.keterangan = getJob.dataValues.keterangan;
        getSuratJalan.dataValues.supir = getSupir.dataValues.nama;
        getSuratJalan.dataValues.no_plat = getmobil.dataValues.noplat;
        getSuratJalan.dataValues.harga_satuan = getHarga.dataValues.total_harga;
        getSuratJalan.dataValues.total_harga = getHarga.dataValues.harga_keseluruhan;
        getSuratJalan.dataValues.customer = getCustomer.dataValues.nama;
        getSuratJalan.dataValues.ukuran_pengiriman = getCustomer.dataValues.ukuran_pengiriman;
        getSuratJalan.dataValues.kualitas = getCustomer.dataValues.nama;

        return getSuratJalan;
    }

    async cetakSuratJalan(id) {
        const getSuratJalan = await this.SuratJalanModel.findOne({
            where: {
                id: id,
            }
        })

        if (getSuratJalan === null) return -1;

        const getJob = await this.JobModel.findOne({
            where: {
                id: getSuratJalan.id_job,
            }
        })

        const getSupir = await this.SupirModel.findOne({
            where: {
                id: getSuratJalan.id_supir,
            }
        })

        const getmobil = await this.MobilModel.findOne({
            where: {
                id: getSuratJalan.id_mobil,
            }
        })

        const getCustomer = await this.CustomerModel.findOne({
            where: {
                id: getJob.id_customer
            }
        })

        const getOrder = await this.OrderModel.findOne({
            where: {
                id: getJob.id_order,
            }
        })

        const getKualitasDetail = await this.KualitasDetailModel.findOne({
            where: {
                id: getJob.id_kualitas_detail,
            }
        })

        const getKualitas = await this.KualitasModel.findOne({
            where: {
                id: getKualitasDetail.id_kualitas,
            }
        })

        const getUkuran = await this.UkuranModel.findOne({
            where: {
                id_job: getSuratJalan.id_job
            }
        })

        getSuratJalan.dataValues.kualitas = getKualitas.dataValues.nama;
        getSuratJalan.dataValues.customer = getCustomer.dataValues.nama;
        getSuratJalan.dataValues.no_po = getOrder.dataValues.no_po;
        getSuratJalan.dataValues.ukuran = getUkuran.dataValues.ukuran_pengiriman;
        getSuratJalan.dataValues.no_nt = getJob.dataValues.no_nt;
        getSuratJalan.dataValues.no_job = getJob.dataValues.no_job;
        getSuratJalan.dataValues.jumlah = getJob.dataValues.jumlah;
        getSuratJalan.dataValues.selesai = getJob.dataValues.selesai;
        getSuratJalan.dataValues.keterangan = getJob.dataValues.keterangan;
        getSuratJalan.dataValues.supir = getSupir.dataValues.nama;
        getSuratJalan.dataValues.no_plat = getmobil.dataValues.noplat;

        return getSuratJalan;
    }

    async getAll() {
        const getSuratJalan = await this.SuratJalanModel.findAll({
            where: {
                deleted_at: null
            }
        })

        if (getSuratJalan === null) return -1;

        for (let i in getSuratJalan) {
            const getJob = await this.JobModel.findOne({
                where: {
                    id: getSuratJalan[i].dataValues.id_job,
                }
            })

            const getSupir = await this.SupirModel.findOne({
                where: {
                    id: getSuratJalan[i].dataValues.id_supir,
                }
            })

            const getmobil = await this.MobilModel.findOne({
                where: {
                    id: getSuratJalan[i].dataValues.id_mobil,
                }
            })

            getSuratJalan[i].dataValues.no_nt = getJob.dataValues.no_nt;
            getSuratJalan[i].dataValues.no_po = getJob.dataValues.no_po;
            getSuratJalan[i].dataValues.jumlah = getJob.dataValues.jumlah;
            getSuratJalan[i].dataValues.selesai = getJob.dataValues.selesai;
            getSuratJalan[i].dataValues.sisa = getJob.dataValues.sisa;
            getSuratJalan[i].dataValues.keterangan = getJob.dataValues.keterangan;
            getSuratJalan[i].dataValues.supir = getSupir.dataValues.nama;
            getSuratJalan[i].dataValues.no_plat = getmobil.dataValues.noplat;

        }

        return getSuratJalan;
    }



    async update(data, id) {
        const getSuratJalan = await this.SuratJalanModel.findOne({
            where: {
                id: id,
            }
        });

        if (getSuratJalan === null) return -1;

        const updateSuratJalan = await this.SuratJalanModel.update({
            id_supir: data.id_supir,
            id_mobil: data.id_mobil,
            close_order: data.closeOrder,
            tanggal_kirim: data.tanggalKirim,
            no_suratjalan: data.noSuratJalan,
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        })



        const getJob = await this.JobModel.findOne({
            where: {
                id: getSuratJalan.id_job
            }
        });

        const getHarga = await this.HargaModel.findOne({
            where: {
                id_job: getSuratJalan.id_job
            }
        })

        let brngSelesai = getJob.jumlah;
        let brngSisa = 0;
        let hargaKeseluruhan = getHarga.harga_keseluruhan

        if (data.closeOrder === true) {
            brngSelesai = data.selesai;
            brngSisa = getJob.jumlah - data.selesai;
            hargaKeseluruhan = getHarga.total_harga * data.selesai;
        }

        const updateJob = await this.JobModel.update({
            surat_jalan: true,
            selesai: brngSelesai,
            sisa: brngSisa,
            updated_at: new Date(),
        }, {
            where: {
                id: getSuratJalan.id_job
            }
        })

        const updateHarga = await this.HargaModel.update({
            harga_keseluruhan: hargaKeseluruhan,
            updated_at: new Date(),
        }, {
            where: { id_job: getSuratJalan.id_job }
        })

        return updateSuratJalan;
    }

}

export default SuratJalanService;