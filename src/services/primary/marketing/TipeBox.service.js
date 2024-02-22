import TipeBoxModel from "../../../models/TipeBox.model.js"
import RumusIndexModel from "../../../models/RumusIndex.model.js";
import TipeBoxDetailModel from "../../../models/TipeBoxDetail.model.js";
import AturanTipeBoxModel from "../../../models/AturanTipeBox.model.js";
import KualitasTipeBoxModel from "../../../models/KualitasTipeBox.model.js";

class TipeBoxService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.TipeBoxModel = new TipeBoxModel(this.Server).table;
        this.RumusIndexModel = new RumusIndexModel(this.Server).table;
        this.TipeBoxDetailModel = new TipeBoxDetailModel(this.Server).table;
        this.AturanTipeBoxModel = new AturanTipeBoxModel(this.Server).table;
        this.KualitasTipeBoxModel = new KualitasTipeBoxModel(this.Server).table;
    }

    async input(data) {


        const getTipeBox = await this.TipeBoxModel.findOne({
            where: {
                nama: data.nama,
                kode: data.kode,
                deleted_at: null,
            }
        })

        if (getTipeBox !== null) return -1;

        const addTipeBox = await this.TipeBoxModel.create({
            nama: data.nama,
            kode: data.kode,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addTipeBox;
    }

    async get() {
        const getTipeBox = await this.TipeBoxModel.findAll({
            where: {
                deleted_at: null
            }
        });

        if (getTipeBox.length === 0) return -1;

        return getTipeBox;
    }

    async update(data, id) {

        const getTipeBox = await this.TipeBoxModel.findOne({
            where: {
                nama: data.nama,
                kode: data.kode,
                deleted_at: null,
            }
        })

        if (getTipeBox !== null) return -1;

        const updateTipeBox = await this.TipeBoxModel.update({
            nama: data.nama,
            kode: data.kode,
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        })

        return updateTipeBox;
    }

    async delete(id) {
        const deleteTipebox = await this.TipeBoxModel.update({
            deleted_at: new Date(),
            updated_at: new Date(),
        }, { where: { id: id } });

        const deleteRumusIndex = await this.RumusIndexModel.update({
            deleted_at: new Date(),
            updated_at: new Date(),
        }, { where: { id_tipebox: id } });

        const deleteTipeBoxDetail = await this.TipeBoxDetailModel.update({
            deleted_at: new Date(),
            updated_at: new Date(),
        }, { where: { id_tipebox: id } });

        const deleteAturanTipeBox = await this.AturanTipeBoxModel.update({
            deleted_at: new Date(),
            updated_at: new Date(),
        }, { where: { id_tipebox: id } });

        const deleteKualitasTipeBox = await this.KualitasTipeBoxModel.update({
            deleted_at: new Date(),
            updated_at: new Date(),
        }, { where: { id_tipebox: id } });

        return deleteTipebox;
    }

}
export default TipeBoxService;