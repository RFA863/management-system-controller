import AuthRoute from "./Auth.route.js"
import JobRoute from "./marketing/Job.route.js";
import UserRoute from "./marketing/User.route.js";
import IndexRoute from "./marketing/Index.route.js";
import SupirRoute from "./marketing/Supir.route.js";
import MobilRoute from "./marketing/Mobil.route.js";
import OrderRoute from "./marketing/Order.route.js";
import TipeBoxRoute from "./marketing/TipeBox.route.js";
import RekeningRoute from "./marketing/Rekening.route.js";
import KualitasRoute from "./marketing/Kualitas.route.js";
import CustomerRoute from "./marketing/Customer.route.js";
import SuratJalanRoute from "./ekspedisi/SuratJalan.route.js";
import RumusIndexRoute from "./marketing/RumusIndex.route.js";
import OrderDetailRoute from "./ekspedisi/OrderDetai.route.js";
import AturanTipeBoxRoute from "./marketing/AturanTipeBox.route.js";
import TipeBoxDetailRoute from "./marketing/TipeBoxDetail.route.js";
import KualitasDetailRoute from "./marketing/KualitasDetail.route.js";
import KualitasTipeBoxRoute from "./marketing/KualitasTipeBox.route.js";

class PrimaryHandler {
    constructor(Server) {
        new JobRoute(Server);
        new AuthRoute(Server);
        new UserRoute(Server);
        new IndexRoute(Server);
        new SupirRoute(Server);
        new MobilRoute(Server);
        new OrderRoute(Server);
        new TipeBoxRoute(Server);
        new RekeningRoute(Server);
        new KualitasRoute(Server);
        new CustomerRoute(Server);
        new SuratJalanRoute(Server);
        new RumusIndexRoute(Server);
        new OrderDetailRoute(Server);
        new AturanTipeBoxRoute(Server);
        new TipeBoxDetailRoute(Server);
        new KualitasDetailRoute(Server);
        new KualitasTipeBoxRoute(Server);
    }
}

export default PrimaryHandler;