import AturanTipeBoxModel from "../../../models/AturanTipeBox.model.js";
import TipeBoxModel from "../../../models/TipeBox.model.js";

class AturanTipeBoxService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.AturanTipeBoxModel = new AturanTipeBoxModel(this.Server).table;
        this.TipeBoxModel = new TipeBoxModel(this.Server).table;
    }

    async input(data, id) {
        const getAturanTipeBox = await this.AturanTipeBoxModel.findOne({
            where: {
                id_tipebox: id,
                nama: data.nama,

            }
        })

        if (getAturanTipeBox !== null) return -1;

        const addAturanTipeBox = await this.AturanTipeBoxModel.create({
            id_tipebox: id,
            nama: data.nama,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addAturanTipeBox;
    }

    async get(id) {

        const getAturanTipeBox = await this.AturanTipeBoxModel.findAll({
            where: {
                id_tipebox: id,
            }
        })

        for (let i in getAturanTipeBox) {
            const getTipeBox = await this.TipeBoxModel.findAll({
                where: {
                    id: getAturanTipeBox[i].dataValues.id_tipebox,
                }
            })

            getAturanTipeBox[i].dataValues.TipeBox = getTipeBox.map((val) => val.dataValues.nama)
        }

        if (getAturanTipeBox.length === 0) return -1;

        return getAturanTipeBox;
    }

    async update(data, id) {
        const updateAturanTipeBox = await this.AturanTipeBoxModel.update({
            nama: data.nama,
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        })

        return updateAturanTipeBox;
    }

    async delete(id) {
        const deleteAturanTipeBox = await this.AturanTipeBoxModel.destroy({
            where: {
                id: id,
            }
        })

        return deleteAturanTipeBox;
    }
}
export default AturanTipeBoxService;