const express = require("express");
const { Session } = require("../models/session");
const { Subject } = require("../models/subject");
const { Step } = require("../models/step");
const recursiveDeleteParent =
    require("./utils/routeUtils").recursiveDeleteParent;
const sessionRouter = express.Router();

sessionRouter
    .route("/")
    .get((req, res, next) => {
        Session.find()
            .populate("subjects")
            .then((sessions) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(sessions);
            })
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Session.create(req.body)
            .then((session) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(session);
            })
            .catch((err) => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end("PUT not supported on /session/");
    })
    .delete((req, res, next) => {
        Session.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
            })
            .catch((err) => next(err));
    });

sessionRouter
    .route("/:sessionId")
    .get((req, res, next) => {
        Session.findById(req.params.sessionId)
            .populate("subjects")
            .then((session) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(session);
            })
            .catch((err) => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(
            `POST operation not supported on /session/${req.params.sessionId}/`
        );
    })
    .put((req, res, next) => {
        Session.updateOne({ _id: req.params.sessionId }, req.body)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Session.findById(req.params.sessionId)
            .then((session) => {
                for (const subject of session.subjects) {
                    recursiveDeleteParent(
                        Subject,
                        Step,
                        subject.toString(),
                        "steps"
                    );
                }
            })
            .then(() => {
                Session.deleteOne({ _id: req.params.sessionId })
                    .then((response) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(response);
                    })
                    .catch((err) => next(err));
            });
    });

module.exports = sessionRouter;
