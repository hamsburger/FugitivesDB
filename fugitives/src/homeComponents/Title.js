import React from "react";
import "../stylesheets/Home/title.css"; 
import titleImage from "../images/gold_face.jpg"; 

class Title extends React.Component{
    constructor(props){
        super(props); 
        this.currentImg = React.createRef(); 
        this.searchBarContainer = React.createRef();
        this.handleHeight = this.handleHeight.bind(this);
        this.state = {containerHeight : null}; 
    } // constructor 

    componentDidMount(){
        window.addEventListener("load", this.handleHeight);
        window.addEventListener("resize", this.handleHeight); 
    }  

    componentWillUnmount(){
        window.removeEventListener("load", this.handleHeight);
        window.removeEventListener("resize", this.handleHeight); 
    }

    handleHeight(){
        const imageRect = this.currentImg.current;
        const titleRect = this.searchBarContainer.current;

        // alert("Title : " + titleRect.clientHeight + ", Image : " + imageRect.clientHeight);
        if (titleRect.clientHeight > imageRect.clientHeight)
            this.setState({containerHeight : titleRect.clientHeight}); 
        else 
            this.setState({containerHeight : imageRect.clientHeight});
    }



    render(){
        return (
        <div id = "titlePageContainer" style = {{height: this.state.containerHeight}}>
            <div className = "imageContainer">
                <img src={titleImage} ref = {this.currentImg} alt="TitleImage"></img>
            </div>
            <div id = "customSearchBar"  ref = {this.searchBarContainer}>
                    <div id = "title"> Who is Your Favourite Fugitive? </div>  
                    <form id = "searchBar" className="form-inline my-2 my-lg-0">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                    </form>
            </div> 
        </div>
        ); 
    }
} // Title 


export default Title; 