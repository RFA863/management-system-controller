import JobModel from "../../../models/Job.model.js";
import OrderModel from "../../../models/Order.model.js";
import SupirModel from "../../../models/Supir.model.js";
import MobilModel from "../../../models/Mobil.model.js";
import SuratJalanModel from "../../../models/SuratJalan.model.js";

class SuratJalanService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.JobModel = new JobModel(this.Server).table;
        this.OrderModel = new OrderModel(this.Server).table;
        this.SupirModel = new SupirModel(this.Server).table;
        this.MobilModel = new MobilModel(this.Server).table;
        this.SuratJalanModel = new SuratJalanModel(this.Server).table;
    }

    async input(data) {
        const getSuratJalan = await this.SuratJalanModel.findOne({
            where: {
                id_job: data.id_job,
            }
        });

        if (getSuratJalan !== null) return -1;

        const addSuratJalan = await this.SuratJalanModel.create({
            id_job: data.id_job,
            id_supir: data.id_supir,
            id_mobil: data.id_mobil,
            tanggal_kirim: data.tanggalKirim,
            created_at: new Date(),
            updated_at: new Date(),
        });

        const updateJob = await this.JobModel.update({
            surat_jalan: true,
            updated_at: new Date(),
        }, {
            where: {
                id: data.id_job
            }
        })

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

        getSuratJalan.dataValues.no_nt = getJob.dataValues.no_nt;
        getSuratJalan.dataValues.no_po = getJob.dataValues.no_po;
        getSuratJalan.dataValues.jumlah = getJob.dataValues.jumlah;
        getSuratJalan.dataValues.keterangan = getJob.dataValues.keterangan;
        getSuratJalan.dataValues.supir = getSupir.dataValues.nama;
        getSuratJalan.dataValues.no_plat = getmobil.dataValues.noplat;

        return getSuratJalan;
    }

    async update(data, id) {
        // const getSuratJalan = await this.SuratJalanModel.findOne({
        //     where: {
        //         id_job: data.id_job,
        //     }
        // });

        // if (getSuratJalan !== null) return -1;

        const updateSuratJalan = await this.SuratJalanModel.update({
            id_supir: data.id_supir,
            id_mobil: data.id_mobil,
            tanggal_kirim: data.tanggalKirim,
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        })

        return updateSuratJalan;
    }

    async delete(id) {
        const deleteSuratJalan = await this.SuratJalanModel.destroy({
            where: {
                id: id,
            }
        })

        return deleteSuratJalan;
    }
}

export default SuratJalanService;