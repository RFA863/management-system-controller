import KualitasModel from "../../../models/Kualitas.model.js";
import KualitasDetailModel from "../../../models/KualitasDetail.model.js";
import KualitasTipeBoxModel from "../../../models/KualitasTipeBox.model.js";

class KualitasService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.KualitasModel = new KualitasModel(this.Server).table;
        this.KualitasDetailModel = new KualitasDetailModel(this.Server).table;
        this.KualitasTipeBoxModel = new KualitasTipeBoxModel(this.Server).table;
    }

    async input(data) {
        const getKualitas = await this.KualitasModel.findOne({
            where: {
                nama: data.nama,
            }
        })

        if (getKualitas !== null) return -1;

        const addKualitas = await this.KualitasModel.create({
            nama: data.nama,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addKualitas;
    }

    async get() {
        const getKualitas = await this.KualitasModel.findAll({
            where: {
                deleted_at: null
            }
        });

        if (getKualitas.length === 0) return -1;

        return getKualitas;
    }

    async update(data, id) {
        const getKualitas = await this.KualitasModel.findOne({
            where: {
                nama: data.nama,
            }
        })

        if (getKualitas !== null) return -1;

        const updateKualitas = await this.KualitasModel.update({
            nama: data.nama,
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        })

        return updateKualitas;
    }

    async delete(id) {
        const deleteKualitas = await this.KualitasModel.update({
            deleted_at: new Date(),
            updated_at: new Date(),
        }, { where: { id: id } });

        const deleteKualitasDetail = await this.KualitasDetailModel.update({
            deleted_at: new Date(),
            updated_at: new Date(),
        }, { where: { id_kualitas: id } });

        const deleteKualitasTipeBox = await this.KualitasTipeBoxModel.update({
            deleted_at: new Date(),
            updated_at: new Date(),
        }, { where: { id_kualitas: id } });


        return deleteKualitas;
    }

}

export default KualitasService;