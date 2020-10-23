import React from "react";
import {Link} from "react-router-dom";
import femaleUser from "../images/femaleUser.png";
import maleUser from "../images/maleUser.png";
import neutralUser from "../images/neutralUser.png"; 

import "../stylesheets/Form/form.css";
export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.updateInfo = this.updateInfo.bind(this); 
        this.validateRegistration = this.validateRegistration.bind(this); 
        this.submitMessage = this.submitMessage.bind(this); // makes sure you can call this from other places 
        this.state = {form : {username: "", email: "", password: "", gender: "", description: ""},
        error : {}}; 
        this.tagError = "Only alphanumerics, underscores and dashes please."; // Input should only allow underscores, dashes + alphanumerics 
        this.emptyError = "Please enter a value.";  
        this.baseURL = "/";
        this.requestURL = "/register";
    }
    
    updateInfo(e){
        const name = e.target.name;
        const value = e.target.value; 

        this.setState(prevState => ({
            form : {
                ...prevState.form, // spread key-value pair 
                [name] : value
            }
        }));
    }

    /* If value is empty, set error to empty string. Else, set error to 
    empty input error, or invalid characters error. */ 
    validateRegistration(){
        let validRegistration = true; 
        let invalidRegex = /[^a-z0-9_-]+/i; // all characters in regex set are valid 
        
        for(let key of Object.keys(this.state.form)){     
            if (key === "email") invalidRegex = /[^a-z0-9_@.-]+/i; 
            if (key === "description") invalidRegex = /[^a-z0-9_\s.!?\\',;-]+/i; // \s validates all whitespace

            // empty value 
            if (this.state.form[key] === ""){
                this.setState(prevState => ({
                    error : {
                        ...prevState.error, 
                        [key] : this.emptyError  
                    }})
                ); 
                validRegistration = false; 
            } else if (invalidRegex.test(this.state.form[key])){
                this.setState(prevState => ({
                    error : {
                        ...prevState.error, 
                        [key] : this.tagError  
                    }})
                );     
                validRegistration = false; 
            } else {
                this.setState(prevState => ({
                    error : {
                        ...prevState.error, 
                        [key] : ""  
                    }})
                );                
            }
            // If value has illegal characters } else if (this.state.form[key])
        }
        return validRegistration; 
    }
        
    submitMessage(event){
        event.preventDefault();
        if(!this.validateRegistration()) return;
        
        
        let formData = new FormData();
        for(let key of Object.keys(this.state.form)){
            formData.append(key, this.state.form[key]);
        }
        
        fetch(this.requestURL, {
            method: "POST", 
            "Content-Type" : "multipart/form-data;charset=utf-8",
            body: formData
        })
        .then(response => {
            if (response.status === 200) {
                alert("Post successful");
                window.location.href = this.baseURL; 
            } else if (response.status === 406) {
                // Take the promise of the response and print its value. 
                response.text().then(string => alert(string)).catch(err => alert(err));
                return response; 
            } else {
                alert("Post unsuccessful, ERROR " + response.status);
            }

            
        }).catch(err => alert(err));
    }
    
    render(){
        const redBorderBox =  {boxShadow: "inset 0 0 5px 1px red"};
        const centerText = {textAlign: "center"};
        const errorText = {display: "block", color: "red"}; 
        let usernameError = ""; 
        let passwordError = ""; 
        let emailError = ""; 
        let genderError = "";
        let descriptionError = "";
        usernameError = this.state.error.username; 
        passwordError = this.state.error.password;
        emailError = this.state.error.email; 
        genderError = this.state.error.gender;
        descriptionError = this.state.error.description; 

        return(<div id = "register" className = "form_container">
            <form id="registrationForm" onSubmit={this.submitMessage} action="\">
            <div className = "form_title"> Register </div>
                <div className="form-group">
                <label htmlFor="userInput"> User </label>
                <small style={errorText}>{usernameError}</small>
                <input type="user" className="form-control" id="userInput" name="username" 
                value={this.state.form.username} onChange={this.updateInfo} placeholder="User Name"
                />
                </div>
                <div className="form-group">
                <label htmlFor="emailInput">Email </label>
                <small style={errorText}>{emailError}</small>
                <input type="email" className="form-control" id="emailInput" name="email" 
                value={this.state.form.email} onChange={this.updateInfo} placeholder="Email" />
                </div>
                <div className="form-group">
                <label htmlFor="passwordInput">Password </label>
                <small style={errorText}>{passwordError}</small>
                <input type="password" className="form-control" id="passwordInput" name="password"
                value={this.state.form.password} onChange={this.updateInfo} placeholder="Password" />
                </div>
                {/* Radio Buttons */}
                
                <div className="form-group">
                <div className="form-check form-check-inline">
                    
                    <input className="form-check-input" type="radio" name="gender" value="male" 
                    onChange={this.updateInfo} id="genderCheck1"/>
                    <label className="form-check-label" htmlFor="genderCheck1">
                        Male  
                    </label>
                    <div className="icon-image-container"><img className="icon" src={maleUser} alt="male icon"/></div>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="female" 
                    onChange={this.updateInfo} id="genderCheck2"/>
                    <label className="form-check-label" htmlFor="genderCheck2">
                        Female
                    </label>
                    <div className="icon-image-container"><img className="icon" src={femaleUser} alt="female icon"/></div>
                </div>

                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="other" 
                    onChange={this.updateInfo} id="genderCheck3"/>
                    <label className="form-check-label" htmlFor="genderCheck3">
                        Other
                    </label>
                    <div className="icon-image-container"><img className="icon" src={neutralUser} alt="other icon"/></div>
                </div>
                <small style={Object.assign({}, errorText, centerText)}>{genderError}</small>  
                </div> 
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">About Yourself</label>
                    <textarea name="description" className="form-control" id="exampleFormControlTextarea1" rows={3} 
                    onChange={this.updateInfo} defaultValue={""} maxLength="500"/>
                    <small style={{display : "block"}, {color : "grey"}}>500 characters max.</small>
                    <small style={errorText}>{descriptionError}</small>
                    
                </div>

                <div className="form-group">
                <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>);
    }    
} // Form 