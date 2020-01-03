import express from "express";
import { MyDocument } from "../models/Document";
const router = express.Router();

router.get("/documents", (req, res, next) => {
    const docs = req.app.locals.db.collection("documents").find({});
    if (docs === undefined) {
        res.status(200).send([]);
    } else {
        docs.toArray((err, result) => {
            if (err) {
                res.status(400).send({ error: err });
            } else {
                res.status(200).send(result);
            }
        });
    }
});

router.get("/documents:id", (req, res, next) => {
    req.app.locals.db.collection("documents").findOne({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.status(400).send({ error: err });
        } else {
            res.status(400).send(result);
        }
    });
});

router.post("/documents", (req, res, next) => {
    const newDocument = new MyDocument({ ...req.body });
    console.log(newDocument);
    newDocument.save((err, result) => {
        if (err) {
            res.status(400).send({ error: err });
        }
        res.status(200).send(result);
    });

});

router.delete("/documents/:id", (req, res, next) => {
    req.app.locals.db.collection("documents").deleteOne({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.status(400).send({ error: err });
        }
        res.status(200).send(result);
    });
});

router.patch("/documents/:id", (req, res, next) => {
    req.app.locals.db.collection("documents").updateOne({
        _id: req.params.id
    },
        {
            $set:
            {
                title: req.body.title,
                username: req.body.username,
                body: req.body.body
            }
        }, (err, result) => {
            if (err) {
                res.status(400).send({ error: err });
            }
            res.status(200).send(result);
        });
});

export default router;
