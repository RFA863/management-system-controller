import JobModel from "../../../models/Job.model.js";
import HargaModel from "../../../models/Harga.model.js";
import UkuranModel from "../../../models/Ukuran.model.js";
import InvoiceModel from "../../../models/Invoice.model.js";
import CustomerModel from "../../../models/Customer.model.js"
import KualitasModel from "../../../models/Kualitas.model.js";
import RekeningModel from "../../../models/Rekening.model.js";
import SuratJalanModel from "../../../models/SuratJalan.model.js";
import KualitasDetailModel from "../../../models/KualitasDetail.model.js";
class InvoiceService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.JobModel = new JobModel(this.Server).table;
        this.HargaModel = new HargaModel(this.Server).table;
        this.UkuranModel = new UkuranModel(this.Server).table;
        this.InvoiceModel = new InvoiceModel(this.Server).table;
        this.CustomerModel = new CustomerModel(this.Server).table;
        this.KualitasModel = new KualitasModel(this.Server).table;
        this.RekeningModel = new RekeningModel(this.Server).table;
        this.SuratJalanModel = new SuratJalanModel(this.Server).table;
        this.KualitasDetailModel = new KualitasDetailModel(this.Server).table;
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

        let hargaBayar = nominalPPN + getHarga.harga_keseluruhan;

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

        const updateJob = await this.JobModel.update({
            invoice: true,
            updated_at: new Date(),
        }, {
            where: {
                id: getSuratJalan.id_job,
            }
        })

        if (data.ubahHarga === true) {
            const updateHarga = await this.HargaModel.update({
                total_harga: data.harga
            }, {
                where: {
                    id_job: getSuratJalan.id_job,
                }
            })
        }

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

        const getUkuran = await this.UkuranModel.findOne({
            where: {
                id_job: getInvoice.id_job,
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

        getInvoice.dataValues.jumlah = getJob.dataValues.selesai;
        getInvoice.dataValues.kualitas = getKualitas.dataValues.nama;
        getInvoice.dataValues.customer = getCustomer.dataValues.nama;
        getInvoice.dataValues.harga_satuan = getHarga.dataValues.total_harga;
        getInvoice.dataValues.total_harga = getHarga.dataValues.harga_keseluruhan;
        getInvoice.dataValues.no_suratjalan = getSuratJalan.dataValues.no_suratjalan;
        getInvoice.dataValues.tanggal_kirim = getSuratJalan.dataValues.tanggal_kirim;
        getInvoice.dataValues.ukuran_pengiriman = getUkuran.dataValues.ukuran_pengiriman;

        return getInvoice;
    }

    async cetakInvoice(id) {
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

        const getUkuran = await this.UkuranModel.findOne({
            where: {
                id_job: getInvoice.id_job,
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


        const getRekening = await this.RekeningModel.findAll({
            where: {
                deleted_at: null,
                ct: true,
            }
        })

        getInvoice.dataValues.jumlah = getJob.dataValues.selesai;
        getInvoice.dataValues.kualitas = getKualitas.dataValues.nama;
        getInvoice.dataValues.customer = getCustomer.dataValues.nama;
        getInvoice.dataValues.harga_satuan = getHarga.dataValues.total_harga;
        getInvoice.dataValues.total_harga = getHarga.dataValues.harga_keseluruhan;
        getInvoice.dataValues.no_suratjalan = getSuratJalan.dataValues.no_suratjalan;
        getInvoice.dataValues.tanggal_kirim = getSuratJalan.dataValues.tanggal_kirim;
        getInvoice.dataValues.ukuran_pengiriman = getUkuran.dataValues.ukuran_pengiriman;
        getInvoice.dataValues.alamat_invoice = getCustomer.dataValues.alamatinvoice;
        getInvoice.dataValues.alamat = getCustomer.dataValues.alamat;

        getInvoice.dataValues.rekening = getRekening.map((val) => val.dataValues.bank + " - No. Ac. " + val.dataValues.norekening)

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

    async getBlmBayar() {
        const getJob = await this.JobModel.findAll({
            where: {
                deleted_at: null,
                invoice: true,
                surat_jalan: true,
                payment: false,
                cancel: false,
            }
        })

        if (getJob.length === 0) return -1;

        for (let i in getJob) {
            const getInvoice = await this.InvoiceModel.findOne({
                where: {
                    id_job: getJob[i].dataValues.id
                }
            })

            const getHarga = await this.HargaModel.findOne({
                where: {
                    id_job: getJob[i].dataValues.id
                }
            })

            const getCustomer = await this.CustomerModel.findOne({
                where: {
                    id: getJob[i].dataValues.id_customer
                }
            })
            getJob[i].dataValues.id_invoice = getInvoice.dataValues.id;
            getJob[i].dataValues.id_suratjalan = getInvoice.dataValues.id_suratjalan;
            getJob[i].dataValues.no_invoice = getInvoice.dataValues.no_invoice;
            getJob[i].dataValues.tanggal = getInvoice.dataValues.tanggal;
            getJob[i].dataValues.nominal_ppn = getInvoice.dataValues.nominal_ppn;
            getJob[i].dataValues.harga_bayar = getInvoice.dataValues.harga_bayar;
            getJob[i].dataValues.dpp = getHarga.dataValues.harga_keseluruhan;
            getJob[i].dataValues.customer = getCustomer.dataValues.nama;


        }

        return getJob;
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