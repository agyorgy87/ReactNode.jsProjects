import "./NavBar.css";
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

const NavBar = () => {
  return (
    <div>
        <Navbar className="navBarMenuBox" fixed="top" expand="sm" collapseOnSelect>
            <Navbar.Brand className="NavLogoBox">
                <div>
                    <img className="disneyLogo" src={require("../logo/disney-logo.jpg")}/>
                </div>    
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav>
                    <Nav.Link className="NavBarMenuTextStyle" href="/">Főoldal</Nav.Link>
                    <Nav.Link className="NavBarMenuTextStyle" href="search">Keresés</Nav.Link>
                    <Nav.Link className="NavBarMenuTextStyle" href="mylist">Saját Lista</Nav.Link>
                    <Nav.Link className="NavBarMenuTextStyle" href="movies">Filmek</Nav.Link>
                    <Nav.Link className="NavBarMenuTextStyle" href="series">Sorozatok</Nav.Link>
                </Nav>
            </Navbar.Collapse>  
        </Navbar>
    </div>
  )
}

export default NavBar;