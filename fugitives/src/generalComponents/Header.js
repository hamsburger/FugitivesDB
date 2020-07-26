import React from "react"; 
import {Link} from "react-router-dom";
import '../stylesheets/Home/header.css';

export default class Header extends React.Component{
    render(){
        return ( 
        <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="/" style={{color: "white"}}>Fugitives</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav" style={{...{width: "100%"}, ...{justifyContent: "space-evenly"}}}>
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item dropdown active">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Your Account
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/login">Login</Link>
                <Link className="dropdown-item" to="/register">Register</Link>
                <div className="dropdown-divider" />
                <a className="dropdown-item" >Add information</a>
              </div>
            </li>

            {/* <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
          </ul>


        </div>
      </nav>); 
    }
} // Header 

