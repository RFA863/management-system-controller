import RumusIndexModel from "../../../models/RumusIndex.model.js"
import TipeBoxModel from "../../../models/TipeBox.model.js";

class RumusIndexService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.TipeBoxModel = new TipeBoxModel(this.Server).table;
        this.RumusIndexModel = new RumusIndexModel(this.Server).table;
    }

    async input(data, id) {
        const getRumusIndex = await this.RumusIndexModel.findOne({
            where: {
                id_tipebox: id,
                rumuspanjang: data.rumusPanjang,
                rumuslebar: data.rumusLebar,
                rumusoversize: data.rumusOversize,
                rumustotal: data.rumusTotal,
            }
        })

        if (getRumusIndex !== null) return -1;

        const addRumusIndex = await this.RumusIndexModel.create({
            id_tipebox: id,
            rumuspanjang: data.rumusPanjang,
            rumuslebar: data.rumusLebar,
            rumusoversize: data.rumusOversize,
            rumustotal: data.rumusTotal,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addRumusIndex;
    }

    async get(id) {
        const getRumusIndex = await this.RumusIndexModel.findAll({
            where: {
                id_tipebox: id,
            }
        });

        for (let i in getRumusIndex) {
            const getTipeBox = await this.TipeBoxModel.findAll({
                where: {
                    id: getRumusIndex[i].dataValues.id_tipebox,
                }
            })

            getRumusIndex[i].dataValues.TipeBox = getTipeBox.map((val) => val.dataValues.nama);
        }

        if (getRumusIndex.length === 0) return -1;

        return getRumusIndex;
    }

    async update(data, id) {
        const updateRumusIndex = await this.RumusIndexModel.update({
            rumuspanjang: data.rumusPanjang,
            rumuslebar: data.rumusLebar,
            rumusoversize: data.rumusOversize,
            rumustotal: data.rumusTotal,
            updated_at: new Date(),
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