const express = require("express");
const { Subject } = require("../models/subject");
const { Step } = require("../models/step");
const subjectRouter = express.Router();

subjectRouter
    .route("/")
    .get((req, res, next) => {
        Subject.find()
            .populate("steps")
            .then((subjects) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(subjects);
            })
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Subject.create(req.body)
            .then((subject) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(subject);
            })
            .catch((err) => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /subject/");
    })
    .delete((req, res, next) => {
        Subject.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
            })
            .catch((err) => next(err));
    });

subjectRouter
    .route("/:subjectId")
    .get((req, res, next) => {
        Subject.findById(req.params.subjectId)
            .populate("steps")
            .then((subject) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(subject);
            })
            .catch((err) => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(
            `POST operation not supported on /subject/${req.params.subjectId}/`
        );
    })
    .put((req, res, next) => {
        Subject.updateOne({ _id: req.params.subjectId }, req.body)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Subject.findById(req.params.subjectId)
            .then((subject) => {
                for (const step of subject.steps) {
                    Step.findById(step.toString())
                        .then((step) => {
                            Step.deleteOne({ _id: step.toString() }).catch(
                                (err) => console.error(err)
                            );
                        })
                        .catch((err) => console.error(err));
                }
                Subject.deleteOne({ _id: subject._id })
                    .then((response) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(response);
                    })
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    });

module.exports = subjectRouter;
