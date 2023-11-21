import AuthService from "../../services/primary/Auth.service.js";
import ResponsePreset from "../../helpers/ResponsePreset.helper.js";


class AuthController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;

        this.ResponsePreset = new ResponsePreset();

        this.AuthService = new AuthService(this.Server);
    }

    async Login(req, res) {
        const data = req.body;

        const loginSrv = await this.AuthService.login(data);

        if (loginSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404,
                'Not Found, Identity or Password is wrong',
                'service',
                { code: -1 }
            ));

        if (loginSrv === -2)
            return res.status(401).json(this.ResponsePreset.resErr(
                401,
                "Access Denied",
                "service",
                { code: -2 }
            ));

        res.status(200).json(this.ResponsePreset.resOK('OK', loginSrv))
    }
}

export default AuthController;