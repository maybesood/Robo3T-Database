//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/wikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema={
    title:String,
    content:String
}
const Article= mongoose.model("Article",articleSchema);

app.get("/articles", async function(req, res) {
    try {
      const foundArticles = await Article.find().exec();
      res.send(foundArticles);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error retrieving articles");
    }
  });

  app.post("/articles",function(req,res){
    const newArticle=new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("Success");
        }else{
            res.send(err);
        }
    });
  })

// app.delete("/articles",function(req,res){
//     Article.deleteMany(function(err){
//         if (!err){
//             res.send("success");
//         }
//         else{
//             res.send(err);
//         }
//     })
// })
  
  

app.listen(3000, function() {
  console.log("Server started on port 3000");
});