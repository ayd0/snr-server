const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const config = require("./config");
const cors = require("cors");

const mongoose = require("mongoose");
const url = config.mongoUrl;

const db = mongoose.connection;
db.on("connecting", () => console.log("Connecting to database server"));
db.on("disconnected", () => {
    console.log("Disconnected from database server");
    mongoose.connect(url).then(
        () => console.log("Connected to database server"),
        (err) => console.error(err)
    );
});

mongoose.connect(url).then(
    () => console.log("Connected to database server"),
    (err) => console.error(err)
);

const indexRouter = require("./routes/index");
const stepRouter = require("./routes/step");
const timeRouter = require("./routes/time");

const app = express();

app.use(cors({
    allowedHeaders: ["authorization", "Content-Type"],
    exposedHeaders: ["authorization"]
}));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", indexRouter);
app.use("/step", stepRouter);
app.use("/time", timeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
