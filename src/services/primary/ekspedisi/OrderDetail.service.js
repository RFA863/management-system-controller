import JobModel from "../../../models/Job.model.js";
import OrderModel from "../../../models/Order.model.js";
import UkuranModel from "../../../models/Ukuran.model.js";
import CustomerModel from "../../../models/Customer.model.js";
import KualitasDetailModel from "../../../models/KualitasDetail.model.js";

class OrderDetailService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.JobModel = new JobModel(this.Server).table;
        this.OrderModel = new OrderModel(this.Server).table;
        this.UkuranModel = new UkuranModel(this.Server).table;
        this.CustomerModel = new CustomerModel(this.Server).table;
        this.KualitasDetailModel = new KualitasDetailModel(this.Server).table;
    }

    async getAll() {
        const getJob = await this.JobModel.findAll({
            where: {
                cancel: false,
            }
        }, {
            attributes: ["id", "id_order", "id_customer", "id_kualitas_detail", "no_job", "jumlah", "sisa", "selesai"],
        });

        for (let i in getJob) {

            const getOrder = await this.OrderModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_order
                }
            });

            const getUkuran = await this.UkuranModel.findAll({
                where: {
                    id_job: getJob[i].dataValues.id
                }
            });

            const getCustomer = await this.CustomerModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_customer,
                }
            });

            const getKualitasDetail = await this.KualitasDetailModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_kualitas_detail,
                }
            });

            getJob[i].dataValues.no_po = getOrder.map((val) => val.dataValues.no_po);
            getJob[i].dataValues.tanggal_order = getOrder.map((val) => val.dataValues.tanggal_order);
            getJob[i].dataValues.tanggal_kirim = getOrder.map((val) => val.dataValues.tanggal_kirim);
            getJob[i].dataValues.customer = getCustomer.map((val) => val.dataValues.nama);
            getJob[i].dataValues.kualitas = getKualitasDetail.map((val) => val.dataValues.nama) + "|" + getKualitasDetail.map((val) => val.dataValues.kode);
            getJob[i].dataValues.ukuran = getUkuran.map((val) => val.dataValues.ukuran)


        }

        if (getJob.length === 0) return -1;

        return getJob;
    }

    async getSuratJalan() {
        const getJob = await this.JobModel.findAll({
            where: {
                surat_jalan: true,
            }
        }, {
            attributes: ["id", "id_order", "id_customer", "id_kualitas_detail", "no_job", "jumlah", "sisa", "selesai", "surat_jalan"],
        });

        if (getJob.length === 0) return -1;

        for (let i in getJob) {

            const getOrder = await this.OrderModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_order
                }
            });

            const getUkuran = await this.UkuranModel.findAll({
                where: {
                    id_job: getJob[i].dataValues.id
                }
            });

            const getCustomer = await this.CustomerModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_customer,
                }
            });

            const getKualitasDetail = await this.KualitasDetailModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_kualitas_detail,
                }
            });

            getJob[i].dataValues.no_po = getOrder.map((val) => val.dataValues.no_po);
            getJob[i].dataValues.tanggal_order = getOrder.map((val) => val.dataValues.tanggal_order);
            getJob[i].dataValues.tanggal_kirim = getOrder.map((val) => val.dataValues.tanggal_kirim);
            getJob[i].dataValues.customer = getCustomer.map((val) => val.dataValues.nama);
            getJob[i].dataValues.kualitas = getKualitasDetail.map((val) => val.dataValues.nama) + "|" + getKualitasDetail.map((val) => val.dataValues.kode);
            getJob[i].dataValues.ukuran = getUkuran.map((val) => val.dataValues.ukuran)


        }



        return getJob;
    }

    async getNoSuratJalan() {
        const getJob = await this.JobModel.findAll({
            where: {
                surat_jalan: false,
            }
        }, {
            attributes: ["id", "id_order", "id_customer", "id_kualitas_detail", "no_job", "jumlah", "sisa", "selesai"],
        });

        if (getJob.length === 0) return -1;

        for (let i in getJob) {

            const getOrder = await this.OrderModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_order
                }
            });

            const getUkuran = await this.UkuranModel.findAll({
                where: {
                    id_job: getJob[i].dataValues.id
                }
            });

            const getCustomer = await this.CustomerModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_customer,
                }
            });

            const getKualitasDetail = await this.KualitasDetailModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_kualitas_detail,
                }
            });

            getJob[i].dataValues.no_po = getOrder.map((val) => val.dataValues.no_po);
            getJob[i].dataValues.tanggal_order = getOrder.map((val) => val.dataValues.tanggal_order);
            getJob[i].dataValues.tanggal_kirim = getOrder.map((val) => val.dataValues.tanggal_kirim);
            getJob[i].dataValues.customer = getCustomer.map((val) => val.dataValues.nama);
            getJob[i].dataValues.kualitas = getKualitasDetail.map((val) => val.dataValues.nama) + "|" + getKualitasDetail.map((val) => val.dataValues.kode);
            getJob[i].dataValues.ukuran = getUkuran.map((val) => val.dataValues.ukuran)


        }



        return getJob;
    }
}

export default OrderDetailService;