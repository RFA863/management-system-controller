import KualitasModel from "../../../models/Kualitas.model.js";
import KualitasDetailModel from "../../../models/KualitasDetail.model.js";

class KualitasDetailService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.KualitasModel = new KualitasModel(this.Server).table;
        this.KualitasDetailModel = new KualitasDetailModel(this.Server).table;
    }

    async input(data) {
        const getKualitasDetail = await this.KualitasDetailModel.findOne({
            where: {
                id_kualitas: data.id_kualitas,
                nama: data.nama,
                kode: data.kode,
            }
        })

        if (getKualitasDetail !== null) return -1;

        const addKualitasDetail = await this.KualitasDetailModel.create({
            id_kualitas: data.id_kualitas,
            nama: data.nama,
            kode: data.kode,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addKualitasDetail;
    }

    async get() {
        const getKualitasDetail = await this.KualitasDetailModel.findAll()

        for (let i in getKualitasDetail) {
            const getKualitas = await this.KualitasModel.findAll({
                where: {
                    id: getKualitasDetail[i].dataValues.id_kualitas
                }
            })
            // console.log(getKualitas);
            getKualitasDetail[i].dataValues.kualitas = getKualitas.map((val) => val.dataValues.nama);
        }

        if (getKualitasDetail.length === 0) return -1;

        return getKualitasDetail;
    }

    async update(data, id) {
        const updateKualitasDetail = await this.KualitasDetailModel.update({
            id_kualitas: data.id_kualitas,
            nama: data.nama,
            kode: data.kode,
            updated_at: new Date(),
        }, {
            where: {
                id: id,
            }
        })

        return updateKualitasDetail;
    }

    async delete(id) {
        const deleteKualitasDetail = await this.KualitasDetailModel.destroy({
            where: {
                id: id,
            }
        })
    }
}

export default KualitasDetailService;