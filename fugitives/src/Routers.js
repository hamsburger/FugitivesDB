import React from "react"; 
import Home from "./Home"; 
import Register from "./formComponents/Register";
import Login from "./formComponents/Login";
import Header from "./generalComponents/Header";
import Footer from "./generalComponents/Footer"; 
import About from "./aboutComponents/About"
import {Switch, Route} from "react-router-dom";

class Routers extends React.Component{
    render(){
        return(
        <div>
        <Header></Header>
        <Switch>
            <Route exact path="/" component = {Home}></Route>
            <Route exact path="/Register" component = {Register}></Route>
            <Route exact path="/Login" component = {Login}></Route>
            <Route exact path="/About" component = {About}></Route>
        </Switch>
        <Footer></Footer>
        </div>);
    }

} // Routers

export default Routers;