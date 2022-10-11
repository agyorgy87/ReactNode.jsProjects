const express = require("express");
let cors = require("cors");
let fileSystem = require("fs");

const app = express();
const path = require("path");

app.use(express.static("assets"));
app.use(cors());
app.use(express.json());
app.set("port", 4000);

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

//get movie
app.get("/get-movie/:movieMainTitle", (request, response) => {

    fileSystem.readFile("allMoviesData.json", "utf8", (error,data) => {
        const allMoviesTitle = JSON.parse(data);
        const filteredAllMoviesTitle = allMoviesTitle.filter(movieTitle => movieTitle.movieMainTitle === request.params.movieMainTitle);
        
        if(filteredAllMoviesTitle.length > 0) {
            const stringifiedAllMoviesTitle = JSON.stringify(filteredAllMoviesTitle[0]);
            response.end(stringifiedAllMoviesTitle);
        }else{
            const responseString = JSON.stringify({error: "no such movie!"});
            response.end(responseString);
        }

    })
})

//filtered by all movies type
app.get("/all-movies-type/:type", (request, response) => {

    fileSystem.readFile("allMoviesData.json", "utf8", (error,data) => {
        const allMoviesType = JSON.parse(data);
        const filteredAllMoviesType = allMoviesType.filter(movieType => movieType.type === request.params.type);
        const stringifiedAllMoviesType = JSON.stringify(filteredAllMoviesType);
        response.end(stringifiedAllMoviesType);
    })
})

//filtered by action movies
app.get("/all-movies-by-action/:type", (request, response) => {
 
    fileSystem.readFile("allMoviesData.json", "utf8", (error,data) => {
        const actionMovies = JSON.parse(data);
        const filteredActionMovies = actionMovies.filter(action => action.type === request.params.type);
        const stringifiedActionMovies = JSON.stringify(filteredActionMovies);
        response.end(stringifiedActionMovies);
    })
})

//filtered by scifi movies
app.get("/all-movies-by-scifi/:type", (request,response) => {

    fileSystem.readFile("allMoviesData.json", "utf8", (error,data) => {
        const scifiMovies = JSON.parse(data);
        const filteredScifiMovies = scifiMovies.filter(scifi => scifi.type === request.params.type);
        const stringifiedScifiMovies = JSON.stringify(filteredScifiMovies);
        response.end(stringifiedScifiMovies);
    })
})

//filtered by fantasy movies
app.get("/all-movies-by-fantasy/:type", (request,response) => {

    fileSystem.readFile("allMoviesData.json", "utf8", (error,data) => {
        const fantasyMovies = JSON.parse(data);
        const filteredFantasyMovies = fantasyMovies.filter(fantasy => fantasy.type === request.params.type);
        const stringifiedFantasyMovies = JSON.stringify(filteredFantasyMovies);
        response.end(stringifiedFantasyMovies);
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


const server = app.listen(app.get("port"), function() {

    let host = server.address().address
    let port = server.address().port

    console.log("app listening:", port)
})