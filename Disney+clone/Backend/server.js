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