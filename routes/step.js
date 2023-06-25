var express = require("express");
const cors = require("./cors");
const { Step } = require("../models/step");
var stepRouter = express.Router();

stepRouter
    .route("/")
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.corsWithOptions, (req, res, next) => {
        Step.find()
            .then((steps) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(steps);
            })
            .catch((err) => next(err));
    })
    .post(cors.cors, (req, res, next) => {
        Step.create(req.body)
            .then((step) => {
                res.statusCode = 200;
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Content-Type", "application/json");
                res.json(step);
            })
            .catch((err) => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /step/");
    })
    .delete((req, res) => {
        res.statusCode = 403;
        res.end("DELETE operation not supported on /step/");
    });

module.exports = stepRouter;
