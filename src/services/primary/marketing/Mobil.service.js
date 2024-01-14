import MobilModel from "../../../models/Mobil.model.js";

class MobilService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.MobilModel = new MobilModel(this.Server).table;
    }

    async input(data) {
        const getMobil = await this.MobilModel.findOne({
            where: {
                noplat: data.noPlat,
            }
        });

        if (getMobil !== null) return -1;

        const addMobil = await this.MobilModel.create({
            noplat: data.noPlat,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addMobil;
    }

    async get() {
        const getMobil = await this.MobilModel.findAll({
            where: {
                deleted_at: null
            }
        });

        if (getMobil.length === 0) return -1;

        return getMobil;
    }

    async update(data, id) {
        const getMobil = await this.MobilModel.findOne({
            where: {
                noplat: data.noPlat,
            }
        });

        if (getMobil !== null) return -1;

        const updateMobil = await this.MobilModel.update({
            noplat: data.noPlat,
            updated_at: new Date(),
        }, {
            where: {
                id: id,
            }
        })

        return updateMobil;
    }

    async delete(id) {
        const deleteMobil = await this.MobilModel.update({
            deleted_at: new Date(),
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        })

        return deleteMobil;
    }

}

export default MobilService;