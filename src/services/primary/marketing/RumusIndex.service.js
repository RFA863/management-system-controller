import RumusIndexModel from "../../../models/RumusIndex.model.js"

class RumusIndexService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.RumusIndexModel = new RumusIndexModel(this.Server).table;
    }

    async input(data, id) {
        const getRumusIndex = await this.RumusIndexModel.findOne({
            where: {
                id_tipebox: id,
                nama: data.nama,
                rumuspanjang: data.rumusPanjang,
                rumuslebar: data.rumusLebar,
                rumusoversize: data.rumusOversize,
                rumustotal: data.rumusTotal,
            }
        })

        if (getRumusIndex !== null) return -1;

        const addRumusIndex = await this.RumusIndexModel.create({
            id_tipebox: id,
            nama: data.nama,
            rumuspanjang: data.rumusPanjang,
            rumuslebar: data.rumusLebar,
            rumusoversize: data.rumusOversize,
            rumustotal: data.rumusTotal,
        })

        return addRumusIndex;
    }

    async get(id) {
        const getRumusIndex = await this.RumusIndexModel.findAll({
            where: {
                id_tipebox: id,
            }
        });

        if (getRumusIndex.length === 0) return -1;

        return getRumusIndex;
    }

    async update(data, id) {
        const updateRumusIndex = await this.RumusIndexModel.update({
            nama: data.nama,
            rumuspanjang: data.rumusPanjang,
            rumuslebar: data.rumusLebar,
            rumusoversize: data.rumusOversize,
            rumustotal: data.rumusTotal,
        }, {
            where: {
                id: id,
            }
        });

        return updateRumusIndex;

    }

    async delete(id) {
        const deleteRumusIndex = await this.RumusIndexModel.destroy({
            where: {
                id: id,
            }
        })

        return deleteRumusIndex;
    }
}

export default RumusIndexService;