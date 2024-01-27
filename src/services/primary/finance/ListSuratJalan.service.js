import JobModel from "../../../models/Job.model.js";
import SupirModel from "../../../models/Supir.model.js";
import MobilModel from "../../../models/Mobil.model.js";
import SuratJalanModel from "../../../models/SuratJalan.model.js";

class ListSuratJalanService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.JobModel = new JobModel(this.Server).table;
        this.SupirModel = new SupirModel(this.Server).table;
        this.MobilModel = new MobilModel(this.Server).table;
        this.SuratJalanModel = new SuratJalanModel(this.Server).table;
    }

    async getNoInvoice() {
        const getJob = await this.JobModel.findAll({
            where: {
                deleted_at: null,
                invoice: false,
                surat_jalan: true,
                cancel: false,
            }
        })

        if (getJob.length === 0) return -1;

        for (let i in getJob) {
            const getSuratJalan = await this.SuratJalanModel.findOne({
                where: {
                    id_job: getJob[i].dataValues.id
                }
            })

            getJob[i].dataValues.id_suratjalan = getSuratJalan.dataValues.id;
            getJob[i].dataValues.id_supir = getSuratJalan.dataValues.id_supir;
            getJob[i].dataValues.id_mobil = getSuratJalan.dataValues.id_mobil;
            getJob[i].dataValues.tanggal_kirim_surat = getSuratJalan.dataValues.tanggal_kirim;
            getJob[i].dataValues.no_suratjalan = getSuratJalan.dataValues.no_suratjalan;


            const getSupir = await this.SupirModel.findOne({
                where: {
                    id: getJob[i].dataValues.id_supir
                }
            })

            const getMobil = await this.MobilModel.findOne({
                where: {
                    id: getJob[i].dataValues.id_mobil
                }
            })

            getJob[i].dataValues.supir = getSupir.dataValues.nama;
            getJob[i].dataValues.no_plat = getMobil.dataValues.noplat;

        }

        return getJob;
    }

    async getInvoice() {
        const getJob = await this.JobModel.findAll({
            where: {
                deleted_at: null,
                invoice: true,
                surat_jalan: true,
                cancel: false,
            }
        })

        if (getJob.length === 0) return -1;

        for (let i in getJob) {
            const getSuratJalan = await this.SuratJalanModel.findOne({
                where: {
                    id_job: getJob[i].dataValues.id
                }
            })

            getJob[i].dataValues.id_suratjalan = getSuratJalan.dataValues.id;
            getJob[i].dataValues.id_supir = getSuratJalan.dataValues.id_supir;
            getJob[i].dataValues.id_mobil = getSuratJalan.dataValues.id_mobil;
            getJob[i].dataValues.tanggal_kirim_surat = getSuratJalan.dataValues.tanggal_kirim;
            getJob[i].dataValues.no_suratjalan = getSuratJalan.dataValues.no_suratjalan;


            const getSupir = await this.SupirModel.findOne({
                where: {
                    id: getJob[i].dataValues.id_supir
                }
            })

            const getMobil = await this.MobilModel.findOne({
                where: {
                    id: getJob[i].dataValues.id_mobil
                }
            })

            getJob[i].dataValues.supir = getSupir.dataValues.nama;
            getJob[i].dataValues.no_plat = getMobil.dataValues.noplat;

        }

        return getJob;
    }
}

export default ListSuratJalanService;