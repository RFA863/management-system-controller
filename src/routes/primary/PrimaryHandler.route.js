import AuthRoute from "./Auth.route.js"
import UserRoute from "./marketing/User.route.js";
import MobilRoute from "./marketing/Mobil.route.js";
import TipeBoxRoute from "./marketing/TipeBox.route.js";
import RekeningRoute from "./marketing/Rekening.route.js";
import KualitasRoute from "./marketing/Kualitas.route.js";
import RumusIndexRoute from "./marketing/RumusIndex.route.js";
import AturanTipeBoxRoute from "./marketing/AturanTipeBox.route.js";
import KualitasDetailRoute from "./marketing/KualitasDetail.route.js";

class PrimaryHandler {
    constructor(Server) {
        new AuthRoute(Server);
        new UserRoute(Server);
        new MobilRoute(Server);
        new TipeBoxRoute(Server);
        new RekeningRoute(Server);
        new KualitasRoute(Server);
        new RumusIndexRoute(Server);
        new AturanTipeBoxRoute(Server);
        new KualitasDetailRoute(Server);
    }
}

export default PrimaryHandler;