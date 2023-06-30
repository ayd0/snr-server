const express = require("express");
const { Timer } = require("../models/timer");
const timeRouter = express.Router();

timeRouter
    .route("/")
    .get((req, res, next) => {
        Timer.find()
            .then((timers) => {
                if (timers.length > 0 || !timers) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(timers);
                } else {
                    res.statusCode = 404;
                    res.end("Resource not found at timer/");
                }
            })
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Timer.create(req.body)
            .then((timer) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(timer);
            })
            .catch((err) => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end("PUT method not supported on time/");
    })
    .delete((req, res, next) => {
        Timer.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
            })
            .catch((err) => next(err));
    });

timeRouter
    .route("/:timerId")
    .get((req, res, next) => {
        Timer.findById(req.params.timerId)
            .then((timer) => {
                if (timer) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(timer);
                } else {
                    res.statusCode = 404;
                    res.end(`Resource not found at timer/${req.params.timerId}`);
                }
            })
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Timer.findById(req.params.timerId)
            .then((timer) => {
                req.body = { ...req.body };
                Timer.updateOne(
                    { _id: timer._id },
                    {
                        timestamps: [...timer.timestamps, req.body],
                    }
                )
                    .then(() =>
                        timer.save().then(() => {
                            Timer.findById(timer._id)
                                .then((updatedTimer) => {
                                    res.statusCode = 200;
                                    res.setHeader(
                                        "Content-Type",
                                        "application/json"
                                    );
                                    res.json(updatedTimer);
                                })
                                .catch((err) => next(err));
                        })
                    )
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on time/${req.params.timerId}`);
    })
    .delete((req, res, next) => {
        Timer.deleteOne({ _id: req.params.timerId })
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
            })
            .catch((err) => next(err));
    });

module.exports = timeRouter;
