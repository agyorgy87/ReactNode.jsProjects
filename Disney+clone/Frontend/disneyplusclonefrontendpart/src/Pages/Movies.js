import React from 'react';
import { useState, useEffect } from "react";

const Movies = () => {

  const [allMoviesType, setAllMoviesType] = useState([])
  const [searchForMovies, setSearchForMovies] = useState("")


return (
    <div>
      <input onChange={(e) => setSearchForMovies(e.target.value)}/>
    </div>
  )
}

export default Movies;