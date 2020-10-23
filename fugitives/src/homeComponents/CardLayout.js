import React, {useState, useEffect} from "react";
import Card from "./Card.js";
import NoImage from "../images/neutralUser.png"
import '../stylesheets/Home/cardLayout.css';
export default class CardLayout extends React.Component{        
    constructor(props){
        super(props); 
        this.state = {imageLinks : "", displayedArray : []};
        this.renderCard = this.renderCard.bind(this);
    }

    // fetch picture links from database
    componentDidMount(){
        this.renderCard();
    }
    
    render(){
        return (<div id = "cardContainer">{this.state.displayedArray}</div>); 
    } // render 

    async renderCard(){
        let error = false;
        // actual request (No need for preflight here.) 
        await fetch("/getCards", {
            method : "GET",
            "Content-Type" : "application/json"
        }).then(response => {
            if (response.ok){
                return response.json();
            }
        }).then(json => {
            this.setState({imageLinks : JSON.stringify(json)});

        }).catch(err => { 
            alert(err)
            error = true 
        } );

        // Initial Run when no data 
        if(!!this.state.displayedArray.length || error) return;

        // let s = this.state.imageLinks;
    
        // // preserve newlines, etc - use valid JSON
        // s = s.replace(/\\n/g, "\\n")  
        // .replace(/\\'/g, "\\'")
        // .replace(/\\"/g, '\\"')
        // .replace(/\\&/g, "\\&")
        // .replace(/\\r/g, "\\r")
        // .replace(/\\t/g, "\\t")
        // .replace(/\\b/g, "\\b")
        // .replace(/\\f/g, "\\f");

        // // remove non-printable and other non-valid JSON chars
        // s = s.replace(/[\u0000-\u0019]+/g,"");

        let objArr = JSON.parse(this.state.imageLinks);
        let cards = [];
        for (let obj of objArr){
            cards.push(<Card title={obj["name"]} href={obj["imageLink"]} description={obj["description"]}></Card>)
        }

        this.setState({displayedArray : cards});
    }
} // CardLayout