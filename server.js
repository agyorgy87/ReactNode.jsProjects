const express = require("express");
let cors = require("cors");
let fileSystem = require("fs");

const app = express();
const path = require("path");

app.use(express.static("assets"));
app.use(cors());
app.use(express.json());
app.set("port", process.env.PORT || 3000);

app.get("/", (request,response) => {
    const responseObject = {
        text: "server is working on port!"
    }
    response.end(JSON.stringify(responseObject));
});

//API to access json data
app.get("/all-movies", (request, response) => {
    fileSystem.readFile("allMoviesData.json", "utf8", (error, data) => {
        if(error){
            let errorResponse = { error: "A fájl olvasása közben hiba történt."}
            response.end(JSON.stringify(errorResponse));
        } else {
            response.end(data);
        }
    })
})

//API for collection movies
app.get("/collection-movies", (request, response) => {
    fileSystem.readFile("moviesCollectionData.json", "utf8", (error,data) => {
        if(error){
            let errorResponse = { error: "A fájl olvasása közben hiba történt."}
            response.end(JSON.stringify(errorResponse));
        } else {
            response.end(data);
        }
    })
})

//API for slideshow
app.get("/slide-show-images", (request, response) => {
    fileSystem.readFile("allMoviesData.json", "utf8", (error, data) => {
        const allMovies = JSON.parse(data);
        const moviesForSlideShow = allMovies.filter(movies => movies.wideImage);
        const stringifiedMoviesForSlideShow = JSON.stringify(moviesForSlideShow);
        response.end(stringifiedMoviesForSlideShow);
    })
})


/*
//filtered by movies title - with typing to input
app.get("/get-movie/:movieTitle", (request, response) => {
    fileSystem.readFile("allMoviesData.json", "utf8", (error,data) => {
        const allMoviesTitle = JSON.parse(data);
        const filteredAllMoviesTitle = allMoviesTitle.filter(movieTitle => movieTitle.movieTitle === request.params.movieTitle);
        
        if(filteredAllMoviesTitle.length > 0) {
            const stringifiedAllMoviesTitle = JSON.stringify(filteredAllMoviesTitle[0]);
            response.end(stringifiedAllMoviesTitle);
        }else{
            const responseString = JSON.stringify({error: "no such movie!"});
            response.end(responseString);
        }
    })
})
*/

//API for filtered all movies title 
app.get("/get-movie-title/:movieTitle", (request, response) => {
    fileSystem.readFile("allMoviesData.json", "utf8", (error,data) => {
        const allMoviesTitle = JSON.parse(data);
        const filteredAllMoviesTitle = allMoviesTitle.filter(movieTitle => movieTitle.movieTitle.toLowerCase().includes(request.params.movieTitle.toLowerCase()));
        const stringifiedFilteredMovieTitles = JSON.stringify(filteredAllMoviesTitle);
        response.end(stringifiedFilteredMovieTitles);
    })
})

//API for filtered by all movies type - with typing to input
app.get("/all-movies-type/:genre", (request, response) => {
    fileSystem.readFile("allMoviesData.json", "utf8", (error,data) => {
        const allMoviesGenre = JSON.parse(data);
        const filteredAllMoviesGenre = allMoviesGenre.filter(movieGenre => movieGenre.genre === request.params.genre);
        const stringifiedAllMoviesGenre = JSON.stringify(filteredAllMoviesGenre);
        response.end(stringifiedAllMoviesGenre);
    })
})

//API for filtered by action movies
app.get("/all-movies-by-action/:genre", (request, response) => {
 
    fileSystem.readFile("allMoviesData.json", "utf8", (error,data) => {
        const actionMovies = JSON.parse(data);
        const filteredActionMovies = actionMovies.filter(action => action.genre === request.params.genre);
        const stringifiedActionMovies = JSON.stringify(filteredActionMovies);
        response.end(stringifiedActionMovies);
    })
})

//API for filtered by comedy movies
app.get("/all-movies-by-comedy/:genre", (request,response) => {
    fileSystem.readFile("allMoviesData.json", "utf8", (error,data) => {
        const comedyMovies = JSON.parse(data);
        const filteredComedyMovies = comedyMovies.filter(comedy => comedy.genre === request.params.genre);
        const stringifiedComedyMovies = JSON.stringify(filteredComedyMovies);
        response.end(stringifiedComedyMovies);
    })
})

//API for filtered by scifi movies
app.get("/all-movies-by-scifi/:genre", (request,response) => {
    fileSystem.readFile("allMoviesData.json", "utf8", (error,data) => {
        const scifiMovies = JSON.parse(data);
        const filteredScifiMovies = scifiMovies.filter(scifi => scifi.genre === request.params.genre);
        const stringifiedScifiMovies = JSON.stringify(filteredScifiMovies);
        response.end(stringifiedScifiMovies);
    })
})


//
app.get("/group/:groupcollection", (request,response) => {
    fileSystem.readFile("allMoviesData.json", "utf8", (error,data) => {
        const allMovies = JSON.parse(data);
        const collections = allMovies.filter(movies => movies.group === request.params.groupcollection);
        const stringifiedCollections = JSON.stringify(collections);
        response.end(stringifiedCollections);
    })
})

//API for icons
app.get("/icons/:filename", function (req, res) {
    res.sendFile(path.join(__dirname, "icons/" + req.params.filename));
})

//API for images
app.get("/img/:filename", function (req, res) {
    res.sendFile(path.join(__dirname, "img/" + req.params.filename));
})

//API for wide-images
app.get("/wide-images/:filename", function (req,res) {
    res.sendFile(path.join(__dirname, "wide-images/" + req.params.filename))
})

//API for collection icons
app.get("/collection-icons/:filename", function (req, res) {
    res.sendFile(path.join(__dirname, "collection-icons/" + req.params.filename));
})

//API for collection backgrounds
app.get("/collection-backgrounds/:filename", function (req, res) {
    res.sendFile(path.join(__dirname, "collection-images/" + req.params.filename));
})

const server = app.listen(app.get("port"), function() {

    let host = server.address().address
    let port = server.address().port

    console.log("app listening:", port)
})