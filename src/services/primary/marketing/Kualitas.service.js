import KualitasModel from "../../../models/Kualitas.model.js";

class KualitasService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.KualitasModel = new KualitasModel(this.Server).table;
    }

    async input(data) {
        const getKualitas = await this.KualitasModel.findOne({
            where: {
                nama: data.nama,
            }
        })

        if (getKualitas !== null) return -1;

        const addKualitas = await this.KualitasModel.create({
            nama: data.nama
        })

        return addKualitas;
    }

    async get() {
        const getKualitas = await this.KualitasModel.findAll();

        if (getKualitas.length === 0) return -1;

        return getKualitas;
    }

    async update(data, id) {
        const updateKualitas = await this.KualitasModel.update({
            nama: data.nama
        }, {
            where: {
                id: id
            }
        })

        return updateKualitas;
    }

    async delete(id) {
        const deleteKualitas = await this.KualitasModel.destroy({
            where: {
                id: id
            }
        })

        return deleteKualitas;

    }
}

export default KualitasService;