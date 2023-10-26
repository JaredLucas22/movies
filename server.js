var express = require('express');
var app = express();
var fs = require("fs");

app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/getFilms', function (req, res) {
    fs.readFile( __dirname + "/" + "movies.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })
 
 var movie = {
    "newmovie" : {
       "movie_Name" : "Die Hard",
       "played_by": "Bruce Willis",
       "Genre": "GenreAction · Thriller",
       "IMDB_LINK" : "https://www.imdb.com/title/tt0095016/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_Die%2520hard"
    }
 }
 


 app.delete('/deleteFlim/:id', function (req, res) {
    fs.readFile(__dirname + "/movies.json", 'utf8', function (err, data) {
      var movies = JSON.parse( data );
        var movie = movies["movie" + req.params.id] 
        if (data[movie]) {
            delete data[movie];
            console.log( data );
             res.end( data );
        }
    });
});

app.post('/addFilm', function (req, res) {
    fs.readFile( __dirname + "/" + "movies.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["new_movie"] = movie["newmovie"];
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })

 app.get('/getFilm/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "movies.json", 'utf8', function (err, data) {
       var movies = JSON.parse( data );
       var movie = movies["movie" + req.params.id] 
       console.log( movie );
       res.end( JSON.stringify(movie));
    });
 })
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log(host)
    console.log("Example app listening at http://%s:%s", host, port)
 })