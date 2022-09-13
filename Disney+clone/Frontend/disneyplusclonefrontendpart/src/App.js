import './App.css';
import { useState, useEffect } from "react";
import React from 'react';
import NavBar from "./components/NavBar";

function App() {

    const [allMovies, setAllMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [scifiMovies, setScifiMovies] = useState([]);
    const [fantasyMovies, setFantasyMovies] = useState([]);

    useEffect(() => {//FETCH for all data
        fetch("http://localhost:4000/all-movies")
            .then(data => data.json())
            .then(parsedData => {
                setAllMovies(parsedData);
            })

        fetch("http://localhost:4000/all-movies-by-action/action")
            .then(data => data.json())
            .then(parsedData => {
                setActionMovies(parsedData)
            })

        fetch("http://localhost:4000/all-movies-by-scifi/scifi")
            .then(data => data.json())
            .then(parsedData => {
                setScifiMovies(parsedData);
            })

        fetch("http://localhost:4000/all-movies-by-fantasy/fantasy")
            .then(data => data.json())
            .then(parsedData => {
                setFantasyMovies(parsedData);
            })

    }, [])

    

    return (
             <div>
                <div>
                <NavBar/>
                </div>
            <div className="moviesBoard">
                <div>
                {allMovies.length === 0 ? "Loading..." : null}
                </div>
                <div style={{color: "white"}}>
                    Akció filmek
                </div>
                <div className="moviesLineUp">
                {
                    actionMovies.map( movies => (
                        <div >  
                        <img src={"http://localhost:4000/icons/" + movies.icon} style={{width: "200px", marginRight: "20px"}} alt="moviepicture"/>
                        </div>
                    ))
                }
                </div>
                <div style={{color: "white"}}>
                    Scifi filmek
                </div>
                <div className="moviesLineUp">
                {
                    scifiMovies.map( movies => (
                        <div >  
                        <img src={"http://localhost:4000/icons/" + movies.icon} style={{width: "200px", marginRight: "20px"}} alt="moviepicture"/>
                        </div>
                    ))
                }
                </div>
                <div style={{color: "white"}}>
                    Fantasy filmek
                </div>
                <div className="moviesLineUp">
                {
                    fantasyMovies.map( movies => (
                        <div >  
                        <img src={"http://localhost:4000/icons/" + movies.icon} style={{width: "200px", marginRight: "20px"}} alt="moviepicture"/>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
  );
}

export default App;
