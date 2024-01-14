import TipeBoxModel from "../../../models/TipeBox.model.js"

class TipeBoxService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;

        this.TipeBoxModel = new TipeBoxModel(this.Server).table;
    }

    async input(data) {


        const getTipeBox = await this.TipeBoxModel.findOne({
            where: {
                nama: data.nama,
                kode: data.kode,
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
        const getTipeBox = await this.TipeBoxModel.findAll();

        if (getTipeBox.length === 0) return -1;

        return getTipeBox;
    }

    async update(data, id) {

        const getTipeBox = await this.TipeBoxModel.findOne({
            where: {
                nama: data.nama,
                kode: data.kode,
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

}
export default TipeBoxService;