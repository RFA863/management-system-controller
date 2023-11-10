import AuthRoute from "./Auth.route.js"
import UserRoute from "./marketing/User.route.js";
import IndexRoute from "./marketing/Index.route.js";
import SupirRoute from "./marketing/Supir.route.js";
import MobilRoute from "./marketing/Mobil.route.js";
import TipeBoxRoute from "./marketing/TipeBox.route.js";
import RekeningRoute from "./marketing/Rekening.route.js";
import KualitasRoute from "./marketing/Kualitas.route.js";
import CustomerRoute from "./marketing/Customer.route.js";
import RumusIndexRoute from "./marketing/RumusIndex.route.js";
import AturanTipeBoxRoute from "./marketing/AturanTipeBox.route.js";
import KualitasDetailRoute from "./marketing/KualitasDetail.route.js";

class PrimaryHandler {
    constructor(Server) {
        new AuthRoute(Server);
        new UserRoute(Server);
        new IndexRoute(Server);
        new SupirRoute(Server);
        new MobilRoute(Server);
        new TipeBoxRoute(Server);
        new RekeningRoute(Server);
        new KualitasRoute(Server);
        new CustomerRoute(Server);
        new RumusIndexRoute(Server);
        new AturanTipeBoxRoute(Server);
        new KualitasDetailRoute(Server);
    }
}

export default PrimaryHandler;