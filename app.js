//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");  // lodash docs https://lodash.com/docs/, npm install lodash
                              // niche, _.lowercase me use kara hai

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');                          // this is required for setting ejs

app.use(bodyParser.urlencoded({extended: true}));       // bodyparser use karne ke liye
app.use(express.static("public"));                      // taki public folder ke andar ki cheeze use kar sake

let posts = [];

app.get("/", function(req, res){
  res.render("home", { startingContent: homeStartingContent,   // focus on this "{}" (JS object, JS object are key-value pairs)
    posts: posts                                               // passing this posts array to home.ejs
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});  // views me jake about.ejs run karega, aboutContent ko b bhej dega frontend pe
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");                     // views me jake compose.ejs show kar dega
});

app.post("/compose", function(req, res){
  // creating a JS-object "post", jisko posts array me save karenge
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);    // posts array me post append kar dia
  res.redirect("/");   // post karte hi yaha "/" redirect ho jaega

});

// :postname is kind of i/p which will take whatever we enter
// this is concept of Route parameters
app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);   // "req.params.postName" is a proper syntax 
  
  // checking if our requestedTitle matches any of the storedTitle inside posts array 
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);  // using lodash, snakecase, canelcase, kababcase sabko lowercase kardega

    if (storedTitle === requestedTitle) {
      res.render("post", {                // views me jake post.ejs call kar
        title: post.title,                // post.title ko as "title" pass kar post.ejs me
        content: post.content             // post.content ko as "content" pass kar post.ejs me
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
