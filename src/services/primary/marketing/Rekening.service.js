import RekeningModel from "../../../models/Rekening.model.js";

class RekeningService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.RekeningModel = new RekeningModel(this.Server).table;
    }

    async input(data) {
        const getRekening = await this.RekeningModel.findOne({
            where: {
                bank: data.bank,
                norekening: data.noRekening,
                atasnama: data.atasNama,
                ct: data.ct,
            }
        })

        if (getRekening !== null) return -1;

        const addRekening = await this.RekeningModel.create({
            bank: data.bank,
            norekening: data.noRekening,
            atasnama: data.atasNama,
            ct: data.ct,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addRekening;
    }

    async get() {

        const getRekening = await this.RekeningModel.findAll({
            where: {
                deleted_at: null
            }
        })

        if (getRekening.length === 0) return -1;

        return getRekening;

    }



    async update(data, id) {
        const getRekening = await this.RekeningModel.findOne({
            where: {
                bank: data.bank,
                norekening: data.noRekening,
                atasnama: data.atasNama,
                ct: data.ct,
            }
        })

        if (getRekening !== null) return -1;

        const updateRekening = await this.RekeningModel.update({
            bank: data.bank,
            norekening: data.noRekening,
            atasnama: data.atasNama,
            ct: data.ct,
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        })

        return updateRekening;
    }

    async delete(id) {
        const deleteRekening = await this.RekeningModel.update({
            deleted_at: new Date(),
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        })

        return deleteRekening;
    }

}

export default RekeningService;