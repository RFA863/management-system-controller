import IndexModel from "../../../models/Index.model.js";
import CustomerModel from "../../../models/Customer.model.js";
import KualitasDetailModel from "../../../models/KualitasDetail.model.js";

class IndexService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.IndexModel = new IndexModel(this.Server).table;
        this.CustomerModel = new CustomerModel(this.Server).table;
        this.KualitasDetailModel = new KualitasDetailModel(this.Server).table;
    }

    async input(data) {
        const getIndex = await this.IndexModel.findOne({
            where: {
                id_customer: data.id_customer,
                id_kualitasdetail: data.id_kualitasDetail,
            }
        });

        if (getIndex !== null) return -1;

        const addIndex = await this.IndexModel.create({
            id_customer: data.id_customer,
            id_kualitasdetail: data.id_kualitasDetail,
            indexvalue: data.indexValue,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addIndex;
    }

    async get() {
        const getIndex = await this.IndexModel.findAll();

        for (let i in getIndex) {
            const getCustomer = await this.CustomerModel.findAll({
                where: {
                    id: getIndex[i].dataValues.id_customer,
                }
            })

            const getKualitasDetail = await this.KualitasDetailModel.findAll({
                where: {
                    id: getIndex[i].dataValues.id_kualitasdetail,
                }
            })

            getIndex[i].dataValues.Customer = getCustomer.map((val) => val.dataValues.nama);
            getIndex[i].dataValues.Kualitas_Detail = getKualitasDetail.map((val) => val.dataValues.nama) + "|" + getKualitasDetail.map((val) => val.dataValues.kode);

        }

        if (getIndex.length === 0) return -1;

        return getIndex;
    }

    async update(data, id) {
        const getIndex = await this.IndexModel.findOne({
            where: {
                id_customer: data.id_customer,
                id_kualitasdetail: data.id_kualitasDetail,
                indexvalue: data.indexValue
            }
        });

        if (getIndex !== null) return -1;

        const updateIndex = await this.IndexModel.update({
            id_customer: data.id_customer,
            id_kualitasdetail: data.id_kualitasDetail,
            indexvalue: data.indexValue,
            updated_at: new Date(),
        }, {
            where: {
                id: id,
            }
        })

        return updateIndex;
    }

}

export default IndexService;