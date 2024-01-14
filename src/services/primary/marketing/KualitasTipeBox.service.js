import TipeBoxModel from "../../../models/TipeBox.model.js";
import KualitasModel from "../../../models/Kualitas.model.js";
import KualitasTipeBoxModel from "../../../models/KualitasTipeBox.model.js";

class KualitasTipeBoxService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.TipeBoxModel = new TipeBoxModel(this.Server).table;
        this.KualitasModel = new KualitasModel(this.Server).table;
        this.KualitasTipeBoxModel = new KualitasTipeBoxModel(this.Server).table;
    }

    async input(data) {
        const getKualitasTipeBox = await this.KualitasTipeBoxModel.findOne({
            where: {
                id_tipebox: data.id_tipebox,
                id_kualitas: data.id_kualitas,
            }
        })

        if (getKualitasTipeBox !== null) return -1;

        const addKualitasTipeBox = await this.KualitasTipeBoxModel.create({
            id_tipebox: data.id_tipebox,
            id_kualitas: data.id_kualitas,
            konstanta_panjang: data.konstanta_panjang,
            konstanta_lebar_ganjil: data.konstanta_lebar_ganjil,
            konstanta_lebar_genap: data.konstanta_lebar_genap,
            kuping: data.kuping,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addKualitasTipeBox;
    }

    async get() {
        const getKualitasTipeBox = await this.KualitasTipeBoxModel.findAll();

        for (let i in getKualitasTipeBox) {
            const getTipebox = await this.TipeBoxModel.findAll({
                where: {
                    id: getKualitasTipeBox[i].dataValues.id_tipebox,
                }
            })

            const getKualitas = await this.KualitasModel.findAll({
                where: {
                    id: getKualitasTipeBox[i].dataValues.id_kualitas,
                }
            })

            getKualitasTipeBox[i].dataValues.tipebox = getTipebox.map((val) => val.dataValues.nama);
            getKualitasTipeBox[i].dataValues.kualitas = getKualitas.map((val) => val.dataValues.nama);
        }

        if (getKualitasTipeBox.length === 0) return -1;

        return getKualitasTipeBox;
    }

    async update(data, id) {
        const getKualitasTipeBox = await this.KualitasTipeBoxModel.findOne({
            where: {
                id_tipebox: data.id_tipebox,
                id_kualitas: data.id_kualitas,
            }
        })

        if (getKualitasTipeBox !== null) return -1;

        const updateKualitasTipeBox = await this.KualitasTipeBoxModel.update({
            id_tipebox: data.id_tipebox,
            id_kualitas: data.id_kualitas,
            konstanta_panjang: data.konstanta_panjang,
            konstanta_lebar_ganjil: data.konstanta_lebar_ganjil,
            konstanta_lebar_genap: data.konstanta_lebar_genap,
            kuping: data.kuping,
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        })

        return updateKualitasTipeBox;
    }

}

export default KualitasTipeBoxService;