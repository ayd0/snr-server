var express = require("express");
const { Step } = require("../models/step");
var stepRouter = express.Router();

stepRouter
    .route("/")
    .get((req, res, next) => {
        Step.find()
            .then((steps) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(steps);
            })
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Step.create(req.body)
            .then((step) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(step);
            })
            .catch((err) => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /step/");
    })
    .delete((req, res, next) => {
        Step.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
            })
            .catch((err) => next(err));
    });

stepRouter
    .route("/:stepId")
    .get((req, res, next) => {
        Step.findById(req.params.stepId)
            .then((step) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(step);
            })
            .catch((err) => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /step/${req.params.stepId}`);
    })
    .put((req, res, next) => {
        Step.updateOne(
            { _id: req.params.stepId },
            req.body,
        )
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Step.findById(req.params.stepId)
            .then((step) => {
                Step.deleteOne({ _id: step._id })
                    .then((response) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(response);
                    })
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    });

module.exports = stepRouter;
