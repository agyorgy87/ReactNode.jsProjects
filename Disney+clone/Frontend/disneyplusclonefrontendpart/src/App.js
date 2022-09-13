import './App.css';
import { useState, useEffect } from "react";

function App() {

    const [allMovies, setAllMovies] = useState([]);
    const [movieTitle, setMovieTitle] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/all-movies")
        .then(data => data.json())
        .then(parsedData => setAllMovies(parsedData))
    }, [])

    return (
        <div className="App">
            {allMovies.length === 0 ? "Loading..." : null}

            {
                allMovies.map( movies => (
                    <div>
                       <span> {movies.movieMainTitle} </span> - <span> {movies.type} </span>
                       <img src={"http://localhost:4000/icons/" + movies.icon} style={{width: "200px"}} alt="moviepicture"/>
                       <img src={"http://localhost:4000/img/" + movies.image} style={{width: "200px"}} alt="moviepicture"/>
                    </div>
                ))
            }
        </div>
  );
}

export default App;
