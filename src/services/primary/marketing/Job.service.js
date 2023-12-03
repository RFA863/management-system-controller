import JobModel from "../../../models/Job.model.js";
import HargaModel from "../../../models/Harga.model.js";
import OrderModel from "../../../models/Order.model.js";
import IndexModel from "../../../models/Index.model.js";
import UkuranModel from "../../../models/Ukuran.model.js";
import TipeBoxModel from "../../../models/TipeBox.model.js";
import KualitasModel from "../../../models/Kualitas.model.js";
import CustomerModel from "../../../models/Customer.model.js";
import KualitasDetailModel from "../../../models/KualitasDetail.model.js";
import KualitasTipeBoxModel from "../../../models/KualitasTipeBox.model.js";

class JobService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.JobModel = new JobModel(this.Server).table;
        this.HargaModel = new HargaModel(this.Server).table;
        this.OrderModel = new OrderModel(this.Server).table;
        this.IndexModel = new IndexModel(this.Server).table;
        this.UkuranModel = new UkuranModel(this.Server).table;
        this.TipeBoxModel = new TipeBoxModel(this.Server).table;
        this.KualitasModel = new KualitasModel(this.Server).table;
        this.CustomerModel = new CustomerModel(this.Server).table;
        this.KualitasDetailModel = new KualitasDetailModel(this.Server).table;
        this.KualitasTipeBoxModel = new KualitasTipeBoxModel(this.Server).table;
    }

    async input(data, id) {

        const getKualitasDetail = await this.KualitasDetailModel.findOne({
            where: {
                id: data.id_kualitas_detail
            }
        })

        if (getKualitasDetail === null) return -1;

        const getKualitasTipebox = await this.KualitasTipeBoxModel.findOne({
            where: {
                id_tipebox: data.id_tipebox,
                id_kualitas: getKualitasDetail.id_kualitas,
            }
        })

        if (getKualitasTipebox === null) return -2;

        const getOrderCustomer = await this.OrderModel.findOne({
            where: {
                id: id
            }
        })

        if (getOrderCustomer === null) return -3;

        const getCustomer = await this.CustomerModel.findOne({
            where: {
                id: getOrderCustomer.id_customer,
            }
        })

        if (getCustomer === null) return -4;



        const getJobOrder = await this.JobModel.findAll({
            where: {
                id_customer: getOrderCustomer.id_customer
            }
        });

        const getAllJobOrder = await this.JobModel.findAll();

        const generateNoPo = (counter) => {
            let formattedCounter = String(counter).padStart(4, '0');
            let noPo = getCustomer.kode + "." + formattedCounter;

            return noPo;
        };

        const generateNoNt = (counter) => {
            let formattedCounter = String(counter).padStart(4, '0');

            let currentDate = new Date();
            let mounth = currentDate.getMonth() + 1;
            let years = currentDate.getFullYear().toString().substring(2, 4);;

            let noNt = mounth + "/" + years + "/" + formattedCounter;

            return noNt;
        };

        let konstantaLebar = 0;

        if (data.lebar % 2 === 0) {
            konstantaLebar = getKualitasTipebox.konstanta_lebar_genap
        } else if (data.lebar % 2 !== 0) {
            konstantaLebar = getKualitasTipebox.konstanta_lebar_ganjil
        }

        const totalPanjang = getKualitasTipebox.kuping + data.panjang + data.lebar + data.panjang + (data.lebar + getKualitasTipebox.konstanta_panjang);
        const totalLebar = ((data.lebar + konstantaLebar) / 2) + data.tinggi + ((data.lebar + konstantaLebar) / 2);


        const addJob = await this.JobModel.create({
            id_order: id,
            id_tipebox: data.id_tipebox,
            id_kualitas_detail: data.id_kualitas_detail,
            id_customer: getCustomer.id,
            no_job: generateNoPo(getJobOrder.length + 1),
            no_nt: generateNoNt(getAllJobOrder.length + 1),
            warna: data.warna,
            perekat: data.perekat,
            keterangan: data.keterangan,
            jumlah: data.jumlah,
            sisa: 0,
            selesai: 0,
            ukuran_kirim: data.ukuran_kirim,
            index_harga: data.index_harga,
            cancel: false,
            surat_jalan: false,
            payment: false,
            created_at: new Date(),
            updated_at: new Date(),

        })

        const addUkuran = await this.UkuranModel.create({
            id_job: addJob.id,
            panjang: data.panjang,
            lebar: data.lebar,
            tinggi: data.tinggi,
            total_panjang: totalPanjang,
            total_lebar: totalLebar,
            ukuran: data.panjang + " x " + data.lebar + " x " + data.tinggi,
            ukuran_pengiriman: data.ukuran_pengiriman,
            created_at: new Date(),
            updated_at: new Date(),
        })

        const getIndex = await this.IndexModel.findOne({
            where: {
                id_customer: getOrderCustomer.id_customer,
                id_kualitasdetail: data.id_kualitas_detail,
            }
        })

        if (getIndex === null) return -5;

        const a = (data.panjang + data.lebar) * 2 + data.index_panjang;
        const b = data.lebar + data.tinggi + data.index_lebar;
        const totalHarga = (a * b * getIndex.indexvalue) / 1000000


        const addHarga = await this.HargaModel.create({

            id_job: addJob.id,
            panjang: data.index_panjang,
            lebar: data.index_lebar,
            penambahan_harga: data.penambahan_harga,
            pengurangan_harga: data.penurunan_harga,
            total_harga: totalHarga,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addJob.id;
    }

    async get(id) {
        const getJob = await this.JobModel.findOne({
            where: {
                id: id
            }
        })

        if (getJob === null) return -1;

        const getHarga = await this.HargaModel.findOne({
            where: {
                id_job: id
            }
        })


        const harga = getHarga.dataValues.total_harga;


        getJob.dataValues.harga = harga;


        return getJob;


    }

    async getJobOrder(id) {
        const getJob = await this.JobModel.findAll({
            where: {
                id_order: id,
            }
        });

        if (getJob.length === 0) return -1;

        for (let i in getJob) {
            const getHarga = await this.HargaModel.findAll({
                where: {
                    id_job: getJob[i].dataValues.id
                }
            });

            const getUkuran = await this.UkuranModel.findAll({
                where: {
                    id_job: getJob[i].dataValues.id
                }
            });

            const getTipeBox = await this.TipeBoxModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_tipebox,
                }
            });

            const getKualitasDetail = await this.KualitasDetailModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_kualitas_detail
                }
            });

            getJob[i].dataValues.harga = getHarga.map((val) => val.dataValues.total_harga);
            getJob[i].dataValues.ukuran = getUkuran.map((val) => val.dataValues.ukuran);
            getJob[i].dataValues.tipebox = getTipeBox.map((val) => val.dataValues.nama);
            getJob[i].dataValues.kualitas_detail = getKualitasDetail.map((val) => val.dataValues.nama);
            getJob[i].dataValues.id_kualitas = getKualitasDetail.map((val) => val.dataValues.id_kualitas);

            const getKualitas = await this.KualitasDetailModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_kualitas
                }
            });

            getJob[i].dataValues.kualitas = getKualitas.map((val) => val.dataValues.nama);
        }

        return getJob;
    }

    async update(data, id) {
        const getKualitasDetail = await this.KualitasDetailModel.findOne({
            where: {
                id: data.id_kualitas_detail
            }
        })

        if (getKualitasDetail === null) return -1;

        const getKualitasTipebox = await this.KualitasTipeBoxModel.findOne({
            where: {
                id_tipebox: data.id_tipebox,
                id_kualitas: getKualitasDetail.id_kualitas,
            }
        })

        if (getKualitasTipebox === null) return -2;

        const getJob = await this.JobModel.findOne({
            where: {
                id: id
            }
        })

        if (getJob === null) return -3;

        const getCustomer = await this.CustomerModel.findOne({
            where: {
                id: getJob.id_customer,
            }
        })

        if (getCustomer === null) return -4;


        let konstantaLebar = 0;

        if (data.lebar % 2 === 0) {
            konstantaLebar = getKualitasTipebox.konstanta_lebar_genap
        } else if (data.lebar % 2 !== 0) {
            konstantaLebar = getKualitasTipebox.konstanta_lebar_ganjil
        }

        const totalPanjang = getKualitasTipebox.kuping + data.panjang + data.lebar + data.panjang + (data.lebar + getKualitasTipebox.konstanta_panjang);
        const totalLebar = ((data.lebar + konstantaLebar) / 2) + data.tinggi + ((data.lebar + konstantaLebar) / 2);

        const updateJob = await this.JobModel.update({
            id_tipebox: data.id_tipebox,
            id_kualitas_detail: data.id_kualitas_detail,
            id_kualitas_tipebox: getKualitasTipebox.id,
            warna: data.warna,
            perekat: data.perekat,
            keterangan: data.keterangan,
            jumlah: data.jumlah,
            ukuran_kirim: data.ukuran_kirim,
            index_harga: data.index_harga,
            cancel: false,
            surat_jalan: false,
            payment: false,
            updated_at: new Date(),

        }, {
            where: {
                id: id
            }
        })

        const updateUkuran = await this.UkuranModel.update({
            panjang: data.panjang,
            lebar: data.lebar,
            tinggi: data.tinggi,
            total_panjang: totalPanjang,
            total_lebar: totalLebar,
            ukuran: data.panjang + " x " + data.lebar + " x " + data.tinggi,
            ukuran_pengiriman: data.ukuran_pengiriman,
        }, {
            where: {
                id_job: id
            }
        })

        const getIndex = await this.IndexModel.findOne({
            where: {
                id_customer: getJob.id_customer,
                id_kualitasdetail: data.id_kualitas_detail,
            }
        })

        if (getIndex === null) return -5;

        const a = (data.panjang + data.lebar) * 2 + data.index_panjang;
        const b = data.lebar + data.tinggi + data.index_lebar;
        const totalHarga = (a * b * getIndex.indexvalue) / 1000000

        if (data.index_harga === true) {

            const getHarga = await this.HargaModel.findOne({
                where: {
                    id_job: id
                }
            })

            if (getHarga === null) {
                const addHarga = await this.HargaModel.create({
                    id_job: id,
                    panjang: data.index_panjang,
                    lebar: data.index_lebar,
                    penambahan_harga: data.penambahan_harga,
                    pengurangan_harga: data.penurunan_harga,
                    total_harga: totalHarga,
                    created_at: new Date(),
                    updated_at: new Date(),
                })

                return;
            }

            const updateHarga = await this.HargaModel.update({
                panjang: data.index_panjang,
                lebar: data.index_lebar,
                penambahan_harga: data.penambahan_harga,
                pengurangan_harga: data.penurunan_harga,
                total_harga: totalHarga,
                updated_at: new Date(),
            }, {
                where: {
                    id_job: id
                }
            })
        }

        return;
    }

    async delete(id) {
        const deleteHarga = await this.HargaModel.destroy({
            where: {
                id_job: id,
            }
        })

        const deleteUkuran = await this.UkuranModel.destroy({
            where: {
                id_job: id,
            }
        })

        const deleteJob = await this.JobModel.destroy({
            where: {
                id: id,
            }
        })

        return;
    }
}

export default JobService;