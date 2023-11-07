import AturanTipeBoxModel from "../../../models/AturanTipeBox.model.js";

class AturanTipeBoxService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.AturanTipeBoxModel = new AturanTipeBoxModel(this.Server).table;
    }

    async input(data, id) {
        const getAturanTipeBox = await this.AturanTipeBoxModel.findOne({
            where: {
                id_tipebox: id,
                nama: data.nama,
                aturan: data.aturan,
            }
        })

        if (getAturanTipeBox !== null) return -1;

        const addAturanTipeBox = await this.AturanTipeBoxModel.create({
            id_tipebox: id,
            nama: data.nama,
            aturan: data.aturan,
        })

        return addAturanTipeBox;
    }

    async get(id) {

        const getAturanTipeBox = await this.AturanTipeBoxModel.findAll({
            where: {
                id_tipebox: id,
            }
        })
        if (getAturanTipeBox.length === 0) return -1;

        return getAturanTipeBox;
    }

    async update(data, id) {
        const updateAturanTipeBox = await this.AturanTipeBoxModel.update({
            nama: data.nama,
            aturan: data.aturan,
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