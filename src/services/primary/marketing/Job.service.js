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
            use_index: data.index,
            cancel: false,
            surat_jalan: false,
            invoice: false,
            payment: false,
            created_at: new Date(),
            updated_at: new Date(),

        })

        let ukuranPengiriman = data.panjang + " x " + data.lebar + " x " + data.tinggi;

        if (data.ukuran_kirim === false) {
            ukuranPengiriman = data.ukuran_pengiriman;
        }

        const addUkuran = await this.UkuranModel.create({
            id_job: addJob.id,
            panjang: data.panjang,
            lebar: data.lebar,
            tinggi: data.tinggi,
            total_panjang: totalPanjang,
            total_lebar: totalLebar,
            ukuran: data.panjang + " x " + data.lebar + " x " + data.tinggi,
            ukuran_pengiriman: ukuranPengiriman,
            created_at: new Date(),
            updated_at: new Date(),
        })

        const getIndex = await this.IndexModel.findOne({
            where: {
                id_customer: getOrderCustomer.id_customer,
                id_kualitasdetail: data.id_kualitas_detail,
            }
        })

        let subTotal = 0;
        let totalHarga = 0;
        let indexHarga = 0;
        let isIndexed = false;

        if (getIndex !== null) {
            const a = (data.panjang + data.lebar) * 2 + data.index_panjang;
            const b = data.lebar + data.tinggi + data.index_lebar;

            subTotal = (a * b * getIndex.indexvalue) / 1000000;
            totalHarga = subTotal + data.penambahan_harga - data.pengurangan_harga;

            indexHarga = getIndex.indexvalue;

            isIndexed = true;

        }

        if (data.index === false) {
            totalHarga = 0;
            subTotal = 0;
        }

        let hargaKeseluruhan = totalHarga * data.jumlah;

        const addHarga = await this.HargaModel.create({

            id_job: addJob.id,
            panjang: data.index_panjang,
            lebar: data.index_lebar,
            penambahan_harga: data.penambahan_harga,
            pengurangan_harga: data.pengurangan_harga,
            isIndexed: isIndexed,
            index_harga: indexHarga,
            sub_total: subTotal,
            total_harga: totalHarga,
            harga_keseluruhan: hargaKeseluruhan,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addJob.id;
    }

    async totalUkuran(data) {
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

        let konstantaLebar = 0;

        if (data.lebar % 2 === 0) {
            konstantaLebar = getKualitasTipebox.konstanta_lebar_genap
        } else if (data.lebar % 2 !== 0) {
            konstantaLebar = getKualitasTipebox.konstanta_lebar_ganjil
        }

        const totalPanjang = getKualitasTipebox.kuping + data.panjang + data.lebar + data.panjang + (data.lebar + getKualitasTipebox.konstanta_panjang);
        const totalLebar = ((data.lebar + konstantaLebar) / 2) + data.tinggi + ((data.lebar + konstantaLebar) / 2);

        const rumusPanjang = getKualitasTipebox.kuping + " + " + data.panjang + " + " + data.lebar + " + " + data.panjang + " + " + (data.lebar + getKualitasTipebox.konstanta_panjang) + " = " + totalPanjang;
        const rumusLebar = ((data.lebar + konstantaLebar) / 2) + " + " + data.tinggi + " + " + ((data.lebar + konstantaLebar) / 2) + " = " + totalLebar;

        return { rumusPanjang, rumusLebar };
    }

    async cekIndex(id, data) {
        const getOrderCustomer = await this.OrderModel.findOne({
            where: {
                id: id
            }
        })

        if (getOrderCustomer === null) return -1;

        const getIndex = await this.IndexModel.findOne({
            where: {
                id_customer: getOrderCustomer.id_customer,
                id_kualitasdetail: data.id_kualitas_detail,
            }
        })

        if (getIndex === null) return -2;

        return getIndex;
    }

    async cekHarga(id, data) {
        const getOrderCustomer = await this.OrderModel.findOne({
            where: {
                id: id
            }
        })

        if (getOrderCustomer === null) return -1;

        const getIndex = await this.IndexModel.findOne({
            where: {
                id_customer: getOrderCustomer.id_customer,
                id_kualitasdetail: data.id_kualitas_detail,
            }
        })

        if (getIndex === null) return -2;

        let subTotal = 0;
        let totalHarga = 0;



        if (getIndex !== null) {
            const a = (data.panjang + data.lebar) * 2 + data.index_panjang;
            const b = data.lebar + data.tinggi + data.index_lebar;

            subTotal = (a * b * getIndex.indexvalue) / 1000000;
            totalHarga = subTotal + data.penambahan_harga - data.pengurangan_harga;
        }

        if (data.index === false) {
            totalHarga = 0;
            subTotal = 0;
        }

        return { subTotal, totalHarga };

    }

    async getAll() {
        const getJob = await this.JobModel.findAll({
            where: {
                cancel: false,
                deleted_at: null,
            }
        })

        if (getJob.length === 0) return -1;

        for (let i in getJob) {
            const getUkuran = await this.UkuranModel.findAll({
                where: {
                    id_job: getJob[i].dataValues.id
                }
            })

            const getHarga = await this.HargaModel.findAll({
                where: {
                    id_job: getJob[i].dataValues.id
                }
            })

            const getKualitasDetail = await this.KualitasDetailModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_kualitas_detail
                }
            })



            getJob[i].dataValues.ukuran = getUkuran.map((val) => val.dataValues.ukuran);
            getJob[i].dataValues.ukuran_pengiriman = getUkuran.map((val) => val.dataValues.ukuran_pengiriman);
            getJob[i].dataValues.total_harga = getHarga.map((val) => val.dataValues.total_harga)
            getJob[i].dataValues.id_kualitas = getKualitasDetail.map((val) => val.dataValues.id_kualitas);

            const getKualitas = await this.KualitasModel.findAll({
                where: {
                    id: getJob[i].dataValues.id_kualitas
                }
            })

            getJob[i].dataValues.kualitas = getKualitas.map((val) => val.dataValues.nama) + " | " + getKualitasDetail.map((val) => val.dataValues.nama) + " | " + getKualitasDetail.map((val) => val.dataValues.kode);
        }

        return getJob;
    }

    async getCancel() {
        const getJob = await this.JobModel.findAll({
            where: {
                cancel: true
            }
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

    async get(id) {
        const getJob = await this.JobModel.findOne({
            where: {
                id: id,
                cancel: false,
                deleted_at: null,
            }
        });

        if (getJob === null) return -1;

        const getHarga = await this.HargaModel.findOne({
            where: {
                id_job: id
            }

        });

        const getUkuran = await this.UkuranModel.findOne({
            where: {
                id_job: id
            }
        });

        const getTipeBox = await this.TipeBoxModel.findOne({
            where: {
                id: getJob.id_tipebox
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

        getJob.dataValues.index_harga = getHarga.dataValues.index_harga;
        getJob.dataValues.index_lebar = getHarga.dataValues.lebar;
        getJob.dataValues.sub_total = getHarga.dataValues.sub_total;
        getJob.dataValues.isIndexed = getHarga.dataValues.isIndexed;
        getJob.dataValues.index_panjang = getHarga.dataValues.panjang;
        getJob.dataValues.total_harga = getHarga.dataValues.total_harga;
        getJob.dataValues.penambahan_harga = getHarga.dataValues.penambahan_harga;
        getJob.dataValues.pengurangan_harga = getHarga.dataValues.pengurangan_harga;

        getJob.dataValues.lebar = getUkuran.dataValues.lebar;
        getJob.dataValues.tinggi = getUkuran.dataValues.tinggi;
        getJob.dataValues.ukuran = getUkuran.dataValues.ukuran;
        getJob.dataValues.panjang = getUkuran.dataValues.panjang;
        getJob.dataValues.total_lebar = getUkuran.dataValues.total_lebar;
        getJob.dataValues.total_panjang = getUkuran.dataValues.total_panjang;
        getJob.dataValues.ukuran_pengiriman = getUkuran.dataValues.ukuran_pengiriman;

        getJob.dataValues.tipebox = getTipeBox.dataValues.nama;
        getJob.dataValues.kualitas = getKualitas.dataValues.nama;
        getJob.dataValues.kualitas_detail = getKualitasDetail.dataValues.nama;
        getJob.dataValues.kode_kualitas_detail = getKualitasDetail.dataValues.kode;


        return getJob;


    }

    async cetakJob(id) {
        const getJob = await this.JobModel.findOne({
            where: {
                id: id,
                cancel: false,
                deleted_at: null,
            }
        });

        if (getJob === null) return -1;


        const getUkuran = await this.UkuranModel.findOne({
            where: {
                id_job: id
            }
        });

        const getOrder = await this.OrderModel.findOne({
            where: {
                id: getJob.id_order,
            }
        })

        const getCustomer = await this.CustomerModel.findOne({
            where: {
                id: getJob.id_customer,
            }
        })

        const getTipeBox = await this.TipeBoxModel.findOne({
            where: {
                id: getJob.id_tipebox
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

        const getKualitasTipebox = await this.KualitasTipeBoxModel.findOne({
            where: {
                id_tipebox: getJob.id_tipebox,
                id_kualitas: getKualitasDetail.id_kualitas,
            }
        })


        getJob.dataValues.no_po = getOrder.dataValues.no_po;
        getJob.dataValues.tanggal_order = getOrder.dataValues.tanggal_order;
        getJob.dataValues.tanggal_kirim = getOrder.dataValues.tanggal_kirim;

        getJob.dataValues.customer = getCustomer.dataValues.nama;
        getJob.dataValues.alamat = getCustomer.dataValues.alamat;
        getJob.dataValues.nomor = getCustomer.dataValues.nomor;

        getJob.dataValues.lebar = getUkuran.dataValues.lebar;
        getJob.dataValues.tinggi = getUkuran.dataValues.tinggi;
        getJob.dataValues.ukuran = getUkuran.dataValues.ukuran;
        getJob.dataValues.panjang = getUkuran.dataValues.panjang;
        getJob.dataValues.total_lebar = getUkuran.dataValues.total_lebar;
        getJob.dataValues.total_panjang = getUkuran.dataValues.total_panjang;


        getJob.dataValues.tipebox = getTipeBox.dataValues.nama;
        getJob.dataValues.kualitas = getKualitas.dataValues.nama;
        getJob.dataValues.kualitas_detail = getKualitasDetail.dataValues.nama;
        getJob.dataValues.kode_kualitas_detail = getKualitasDetail.dataValues.kode;

        getJob.dataValues.konstanta_panjang = getKualitasTipebox.dataValues.konstanta_panjang;
        getJob.dataValues.konstanta_lebar_ganjil = getKualitasTipebox.dataValues.konstanta_lebar_ganjil;
        getJob.dataValues.konstanta_lebar_genap = getKualitasTipebox.dataValues.konstanta_lebar_genap;
        getJob.dataValues.kuping = getKualitasTipebox.dataValues.kuping;


        return getJob;
    }

    async getJobOrder(id) {
        const getJob = await this.JobModel.findAll({
            where: {
                id_order: id,
                cancel: false,
            }
        });

        if (getJob.length === 0) return -1;

        for (let i in getJob) {
            const getHarga = await this.HargaModel.findAll({
                where: {
                    id_job: getJob[i].dataValues.id,

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


    async getJobDetail(id) {
        const getJob = await this.JobModel.findOne({
            where: {
                id: id,

            }
        });

        if (getJob.length === 0) return -1;


        const getHarga = await this.HargaModel.findOne({
            where: {
                id_job: id,

            }
        });

        const getUkuran = await this.UkuranModel.findOne({
            where: {
                id_job: id
            }
        });

        const getTipeBox = await this.TipeBoxModel.findOne({
            where: {
                id: getJob.dataValues.id_tipebox,
            }
        });

        const getKualitasDetail = await this.KualitasDetailModel.findOne({
            where: {
                id: getJob.dataValues.id_kualitas_detail
            }
        });

        const getCustomer = await this.CustomerModel.findOne({
            where: {
                id: getJob.id_customer,
            }
        })
        const getOrder = await this.OrderModel.findOne({
            where: {
                id: getJob.id_order,
            }
        })

        getJob.dataValues.ukuran = getUkuran.dataValues.ukuran;
        getJob.dataValues.tipebox = getTipeBox.dataValues.nama;
        getJob.dataValues.customer = getCustomer.dataValues.nama;
        getJob.dataValues.harga = getHarga.dataValues.total_harga;
        getJob.dataValues.tanggal_order = getOrder.dataValues.tanggal_order;
        getJob.dataValues.id_kualitas = getKualitasDetail.dataValues.id_kualitas;
        getJob.dataValues.ukuran_pengiriman = getUkuran.dataValues.ukuran_pengiriman;

        const getKualitas = await this.KualitasDetailModel.findOne({
            where: {
                id: getJob.dataValues.id_kualitas
            }
        });

        getJob.dataValues.kualitas = getKualitas.dataValues.nama + " | " + getKualitasDetail.dataValues.nama + " | " + getKualitasDetail.dataValues.kode;


        return getJob;
    }

    async getCustomerJob(id) {

        const getOrder = await this.OrderModel.findOne({
            where: {
                id: id
            }
        });

        if (getOrder === null) return -1;

        const getCustomer = await this.CustomerModel.findOne({
            where: {
                id: getOrder.id_customer
            }
        });

        if (getOrder === null) return -2;

        return { getCustomer, getOrder };
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
            use_index: data.index,
            cancel: false,
            surat_jalan: false,
            payment: false,
            updated_at: new Date(),

        }, {
            where: {
                id: id
            }
        })


        let ukuranPengiriman = data.panjang + " x " + data.lebar + " x " + data.tinggi;

        if (data.ukuran_kirim === false) {
            ukuranPengiriman = data.ukuran_pengiriman;
        }


        const updateUkuran = await this.UkuranModel.update({
            panjang: data.panjang,
            lebar: data.lebar,
            tinggi: data.tinggi,
            total_panjang: totalPanjang,
            total_lebar: totalLebar,
            ukuran: data.panjang + " x " + data.lebar + " x " + data.tinggi,
            ukuran_pengiriman: ukuranPengiriman,
            updated_at: new Date(),
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

        let subTotal = 0;
        let totalHarga = 0;
        let indexHarga = 0;
        let isIndexed = false;

        if (getIndex !== null) {
            const a = (data.panjang + data.lebar) * 2 + data.index_panjang;
            const b = data.lebar + data.tinggi + data.index_lebar;

            subTotal = (a * b * getIndex.indexvalue) / 1000000;
            totalHarga = subTotal + data.penambahan_harga - data.pengurangan_harga;

            indexHarga = getIndex.indexvalue;

            isIndexed = true;

        }

        if (data.index === false) {
            totalHarga = 0;
            subTotal = 0;
        }

        let hargaKeseluruhan = totalHarga * data.jumlah;

        const updateHarga = await this.HargaModel.update({

            panjang: data.index_panjang,
            lebar: data.index_lebar,
            penambahan_harga: data.penambahan_harga,
            pengurangan_harga: data.pengurangan_harga,
            isIndexed: isIndexed,
            index_harga: indexHarga,
            sub_total: subTotal,
            total_harga: totalHarga,
            harga_keseluruhan: hargaKeseluruhan,
            updated_at: new Date(),
        }, {
            where: {
                id_job: id
            }
        })


        return;
    }

    async cancel(id) {
        const cancelJob = await this.JobModel.update({

            cancel: true,
            updated_at: new Date(),

        }, {
            where: {
                id: id
            }
        })

        return;
    }
}

export default JobService;