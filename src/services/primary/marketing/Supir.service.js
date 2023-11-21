import SupirModel from "../../../models/Supir.model.js";

class SupirService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.SupirModel = new SupirModel(this.Server).table;
    }

    async input(data) {
        const getSupir = await this.SupirModel.findOne({
            where: {
                nama: data.nama
            }
        });

        if (getSupir !== null) return -1;

        const addSupir = await this.SupirModel.create({
            nama: data.nama,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return addSupir;
    }

    async get() {
        const getSupir = await this.SupirModel.findAll();

        if (getSupir.length === 0) return -1;

        return getSupir;

    }

    async update(data, id) {
        const getSupir = await this.SupirModel.findOne({
            where: {
                nama: data.nama
            }
        });

        if (getSupir !== null) return -1;

        const updateSupir = await this.SupirModel.update({
            nama: data.nama,
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        });

        return updateSupir;
    }

    async delete(id) {
        const deleteSupir = await this.SupirModel.destroy({
            where: {
                id: id
            }
        });

        return deleteSupir;
    }
}

export default SupirService;