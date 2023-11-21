import jwt from "jsonwebtoken";

import UserModel from "../../models/User.model.js";

class AuthService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;

        this.UserModel = new UserModel(this.Server).table;
    }

    generateToken(posisi) {
        return jwt.sign({ posisi }, this.Server.env.SECRET_KEY, {
            expiresIn: this.Server.env.TOKEN_EXPIRED,
        });
    }

    async login(data) {

        const getDataUserModel = await this.UserModel.findOne({
            where: {
                email: data.username,
                password: data.password,
            },

        });

        if (getDataUserModel === null) return -1;
        if (getDataUserModel.akses === false) return -2;

        const posisi = getDataUserModel.posisi;
        const token = this.generateToken(posisi)

        return { posisi, token };
    }

}

export default AuthService;