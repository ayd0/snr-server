const cors = require("cors");

const whitelist = ["http://localhost:8080"];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions = {
        methods: "GET,HEAD,PUT,OPTIONS,POST,DELETE",
        allowedHeaders: [
            "Access-Control-Allow-Headers",
            "Origin",
            "X-Requested-With",
            "Content-Type",
            "Accept",
            "Authorization",
            "token",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers",
            "Access-Control-Allow-Credentials",
        ],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
    };
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
        corsOptions.origin = true;
    } else {
        corsOptions.origin = false;
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
