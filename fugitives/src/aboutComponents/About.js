import React from "react";
import "../stylesheets/About/about.css";
export default class About extends React.Component{
    render(){
        return(
            <div id = "aboutText"> 
                A list of fugitives scraped from Wikipedia:
                <a href="https://en.wikipedia.org/wiki/List_of_fugitives_from_justice_who_disappeared"></a>
            </div> 
        );
    }
}