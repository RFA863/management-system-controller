import UserModel from "../../../models/User.model.js";

class UserService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.UserModel = new UserModel(this.Server).table;
    }

    async input(data) {
        const getUser = await this.UserModel.findOne({
            where: {
                email: data.email,
                password: data.password,
                posisi: data.posisi,
                akses: data.akses
            }
        })

        if (getUser !== null) return -1;

        const addUser = await this.UserModel.create({
            email: data.email,
            password: data.password,
            posisi: data.posisi,
            akses: data.akses,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return addUser;
    }

    async get() {
        const getUser = await this.UserModel.findAll({
            where: {
                deleted_at: null
            }
        });

        if (getUser.length === 0) return -1;

        return getUser;
    }

    async update(data, id) {
        const getUser = await this.UserModel.findOne({
            where: {
                email: data.email,
                password: data.password,
                posisi: data.posisi,
                akses: data.akses
            }
        })

        if (getUser !== null) return -1;

        const updateUser = await this.UserModel.update({
            email: data.email,
            password: data.password,
            posisi: data.posisi,
            akses: data.akses,
            updated_at: new Date(),
        }, {
            where: {
                id: id
            }
        })

        return updateUser;
    }

    async delete(id) {
        const deleteUser = await this.UserModel.update({
            deleted_at: new Date(),
            updated_at: new Date(),
        }, {
            where: { id: id, }

        })

        return deleteUser;
    }

}

export default UserService;