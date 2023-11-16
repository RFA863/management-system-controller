import TipeBoxModel from "../../../models/TipeBox.model.js";
import TipeBoxDetailModel from "../../../models/TipeBoxDetail.model.js";

class TipeBoxDetailService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.TipeBoxModel = new TipeBoxModel(this.Server).table;
        this.TipeBoxDetailModel = new TipeBoxDetailModel(this.Server).table;
    }

    async input(data) {
        const getTipeBoxDetail = await this.TipeBoxDetailModel.findOne({
            where: {
                id_tipebox: data.id_tipebox,
                rumus_panjang: data.rumusPanjang,
                rumus_lebar: data.rumusLebar,
                rumus_oversize: data.rumusOversize,
                konstanta_panjang: data.konstantaPanjang,
                konstanta_lebar: data.konstantaLebar,
            }
        })

        if (getTipeBoxDetail !== null) return -1;

        const addTipeBoxDetail = await this.TipeBoxDetailModel.create({
            id_tipebox: data.id_tipebox,
            rumus_panjang: data.rumusPanjang,
            rumus_lebar: data.rumusLebar,
            rumus_oversize: data.rumusOversize,
            konstanta_panjang: data.konstantaPanjang,
            konstanta_lebar: data.konstantaLebar,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addTipeBoxDetail;
    }

    async get() {
        const getTipeBoxDetail = await this.TipeBoxDetailModel.findAll();

        for (let i in getTipeBoxDetail) {
            const getTipeBox = await this.TipeBoxModel.findAll({
                where: {
                    id: getTipeBoxDetail[i].dataValues.id_tipebox,
                }
            })

            getTipeBoxDetail[i].dataValues.tipeBox = getTipeBox.map((val) => val.dataValues.nama);
        };

        if (getTipeBoxDetail.length === 0) return -1;

        return getTipeBoxDetail;
    }

    async update(data, id) {
        const getTipeBoxDetail = await this.TipeBoxDetailModel.findOne({
            where: {
                id_tipebox: data.id_tipebox,
                rumus_panjang: data.rumusPanjang,
                rumus_lebar: data.rumusLebar,
                rumus_oversize: data.rumusOversize,
                konstanta_panjang: data.konstantaPanjang,
                konstanta_lebar: data.konstantaLebar,
            }
        })

        if (getTipeBoxDetail !== null) return -1;

        const updateTipeBoxDetail = await this.TipeBoxDetailModel.update({
            id_tipebox: data.id_tipebox,
            rumus_panjang: data.rumusPanjang,
            rumus_lebar: data.rumusLebar,
            rumus_oversize: data.rumusOversize,
            konstanta_panjang: data.konstantaPanjang,
            konstanta_lebar: data.konstantaLebar,
            updated_at: new Date(),
        }, {
            where: {
                id: id,
            }
        })

        return updateTipeBoxDetail;
    }

    async delete(id) {
        const deleteTipeBoxDetail = await this.TipeBoxDetailModel.destroy({
            where: {
                id: id
            }
        })

        return deleteTipeBoxDetail;
    }
}

export default TipeBoxDetailService;