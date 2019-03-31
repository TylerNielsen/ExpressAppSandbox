const express = require('express');
const Document = require('../models/Document');
const router = express.Router();

router.get('/documents', (req, res, next) => {
    req.app.locals.db.collection('documents').find({}).toArray((err, result) => {
        if(err){
            res.status(400).send({'error': err});
        }
        if(result === undefined || result.length === 0){
            res.status(400).send({'error':'No documents in database'});
        } else {
            res.status(200).send(result);
        }
    })
});

router.get('/document', (req, res, next) => {
     req.app.locals.db.collection('documents').findOne({
        '_id': req.params.id
    }, (err, result) => {
        if(err){
            res.status(400).send({'error': err});
        }
        else{
            res.status(400).send(result);
        }
    });
})

router.post('/document', (req, res, next) => {
    var newDocument = new Document({
       ...req.body
    });
    console.log(newDocument);
    newDocument.save((err, result) => {
        if (err){
            res.status(400).send({'error': err});
        }
        res.status(200).send(result);
    });
});

router.delete('/document/:id', (req, res, next) =>{
    req.app.locals.db.collection('documents').deleteOne({
        '_id': req.params.id
    }, (err, result) => {
        if(err){
            res.status(400).send({'error': err});
        }
        res.status(200).send(result);
    })
});

router.patch('/document/:id', (req, res, next) => {
    req.app.locals.db.collection('documents').updateOne({
      '_id': req.params.id
    }, 
    {$set:
      {
        title: req.body.title,
        username: req.body.username,
        body: req.body.body
      }
    }, (err, result) => {
      if (err) {
        res.status(400).send({'error': err})
      }
      res.status(200).send(result)
    })
  });

  module.exports = router;
