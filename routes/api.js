var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Article = mongoose.model('Article');

router.use('/articles', function(req, res, next){
    if (req.method == 'GET')
      return next();
    else if (req.isAuthenticated())
      return next();
    else
      res.send ({status: 'Authentication Failure'});
});

router.get('/articles', function(req, res, next) {
   Article.find (function(err,articles){
         if(err){
              return res.send(500,err);
          }
          return res.send(articles);
       });
});

router.get('/articles/:id', function(req, res, next) {
   Article.findById(req.params.id, function(err, article){
      if (err)
        res.send(err);
      res.json(article);
   });
});

router.post('/articles', function(req, res, next) {
     var article = new Article();
    article.username = req.body.username;
    article.title = req.body.title;
    article.text = req.body.text;

    article.save(function(err, article){
       if(err){
          return res.send(500,err);
        }
        return res.json(article);
      });
});


router.delete('/articles/:id', function(req, res, next) {
   Article.remove({_id: req.params.id}, function(err, article) {
     if (err) {
        return res.send(err);
       }
     res.json({message: 'successfully deleted'});
    });
});


router.put('/articles/:id', function(req, res, next) {
   Article.findone({_id: req.params._id}, function(err, article) {
      if(err) {
         return res.send(err);
       }
       article.username = req.body.username;
       article.title = req.body.title;
       article.text = req.body.text;
       article.timestamp = req.body.timestamp;
       article.save(function (err) {
           if (err){
              return res.send(err);
            }
            res.json({message: 'Article updated'});
       });
    });
});
       


module.exports = router;
