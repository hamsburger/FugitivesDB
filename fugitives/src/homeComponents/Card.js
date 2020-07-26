import React from "react"; 
import Image from "../images/neutralUser.png"; 
/* An instance of a bootstrap card */ 
export default class Card extends React.Component {
    constructor(props){
        super(props);
        this.showDescription = this.showDescription.bind(this);
        this.hideDescription = this.hideDescription.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.state = {showBody : false, height : 0, width : 0}; 
    }
    


    componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    showDescription(e){
        if (this.state.width > 600)
            this.setState({showBody : true});
    }

    hideDescription(e){
        this.setState({showBody : false});
    }
    render(){
        return (
        <div className='card'  onMouseEnter={this.showDescription} onMouseLeave={this.hideDescription}> 
             <img className="card-img-top" src={
                 (this.props.href == "NO AVAILABLE IMAGE") ? Image : this.props.href} alt="Card cap"/>
            
            <div className="card-title-container">
                <h5 className="card-title">{this.props.title}</h5>
            </div>

            <div className="card-body" style={(this.state.showBody) ?  { display: "block"} : {display: "none"}}>
                <p className="card-text">{this.props.description}</p>
                <a>See More</a>
            </div> 
        </div>
        );
    }
} // Card 