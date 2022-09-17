import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import MyList from "./Pages/MyList";
import Movies from "./Pages/Movies";
import Series from "./Pages/Series";


const Navigation = () => {
  return (
    <Router>
        <Routes>
          <Route path={"/"} element={<Home />} exact/>
          <Route path={"search"} element={<Search />} />
          <Route path={"mylist"} element={<MyList />} />
          <Route path={"movies"} element={<Movies />} />
          <Route path={"series"} element={<Series />} />
        </Routes>
    </Router>
  );
}

export default Navigation;