import React from 'react';
import { useState, useEffect } from "react";

const Movies = () => {

const [allMoviesType, setAllMoviesType] = useState([]);
const [searchForMovies, setSearchForMovies] = useState("");

useEffect (() => {
    fetch("http://localhost:4000/all-movies")
            .then(data => data.json())
            .then(parsedData => {
                setAllMoviesType(parsedData);
            })
}, [])

const filterByAllMoviesType = () => {
    fetch("http://localhost:4000/all-movies-type/" + searchForMovies)
            .then(data => data.json())
            .then(parsedData => {
                setAllMoviesType(parsedData);
            })
};

return (
    <div>
      <input onChange={(e) => setSearchForMovies(e.target.value)} value={searchForMovies}/>
      <button onClick={filterByAllMoviesType}>Filter movies type pl.: action, fantasy</button>

               {
                    allMoviesType.map( moviesType => (
                        <div >  
                        <img src={"http://localhost:4000/icons/" + moviesType.icon} style={{width: "200px", marginRight: "20px"}} alt="moviepicture"/>
                        </div>
                    ))
                }
    </div>
  )
}

export default Movies;