import JobModel from "../../../models/Job.model.js";
import HargaModel from "../../../models/Harga.model.js";
import OrderModel from "../../../models/Order.model.js";
import IndexModel from "../../../models/Index.model.js";
import TipeBoxModel from "../../../models/TipeBox.model.js";
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

        const generateNoPo = (counter) => {
            let formattedCounter = String(counter).padStart(4, '0');
            let noPo = getCustomer.kode + "." + formattedCounter;

            return noPo;
        }

        const getJobOrder = await this.JobModel.findAll({
            where: {
                id_customer: getOrderCustomer.id_customer
            }
        })

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
            id_kualitas_tipebox: getKualitasTipebox.id,
            id_customer: getOrderCustomer.id_customer,
            no_job: generateNoPo(getJobOrder.length + 1),
            panjang: data.panjang,
            lebar: data.lebar,
            tinggi: data.tinggi,
            total_panjang: totalPanjang,
            total_lebar: totalLebar,
            warna: data.warna,
            perekat: data.perekat,
            keterangan: data.keterangan,
            jumlah: data.jumlah,
            ukuran_pengiriman: data.ukuran_pengiriman,
            ukuran_kirim: data.ukuran_kirim,
            index_harga: data.index_harga,
            cancel: false,
            surat_jalan: false,
            payment: false,
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

        if (data.index_harga === true) {
            const addHarga = await this.HargaModel.create({
                id_order: id,
                id_job: addJob.id,
                id_tipebox: data.id_tipebox,
                id_kualitas_detail: data.id_kualitas_detail,
                id_customer: getOrderCustomer.id_customer,
                id_index: getIndex.id,
                panjang: data.index_panjang,
                lebar: data.index_lebar,
                penambahan_harga: data.penambahan_harga,
                pengurangan_harga: data.penurunan_harga,
                total_harga: totalHarga,
                created_at: new Date(),
                updated_at: new Date(),
            })

            return addHarga
        }

        return addJob.id;
    }

    async get(id) {
        const getJob = await this.JobModel.findOne({
            where: {
                id: id
            }
        })

        const getHarga = await this.HargaModel.findOne({
            where: {
                id_job: id
            }
        })


        let harga = 0;
        if (getHarga !== null) {
            harga = getHarga.dataValues.total_harga;
        }

        getJob.dataValues.harga = harga;

        if (getJob === null) return -1;

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
            panjang: data.panjang,
            lebar: data.lebar,
            tinggi: data.tinggi,
            total_panjang: totalPanjang,
            total_lebar: totalLebar,
            warna: data.warna,
            perekat: data.perekat,
            keterangan: data.keterangan,
            jumlah: data.jumlah,
            ukuran_pengiriman: data.ukuran_pengiriman,
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
                    id_order: getJob.id_order,
                    id_job: id,
                    id_tipebox: data.id_tipebox,
                    id_kualitas_detail: data.id_kualitas_detail,
                    id_customer: getJob.id_customer,
                    id_index: getIndex.id,
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
                id_tipebox: data.id_tipebox,
                id_kualitas_detail: data.id_kualitas_detail,
                id_customer: getJob.id_customer,
                id_index: getIndex.id,
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

        const deleteJob = await this.JobModel.destroy({
            where: {
                id: id,
            }
        })

        return;
    }
}

export default JobService;