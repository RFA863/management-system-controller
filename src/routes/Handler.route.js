import PrimaryHandler from "./primary/PrimaryHandler.route.js";

class HandlerRoute {
    constructor(Server) {
        new PrimaryHandler(Server);

    }
}

export default HandlerRoute;