import React, { useState, useEffect } from "react"; 
import neutralUser from "../images/neutralUser.png"; 
import "../stylesheets/Form/form.css";
export default function Login(){
    const [formObject, setFormObject] = useState({});
    
    const updateInfo = (e) => {
        const name = e.target.name;
        const value = e.target.value; 
        setFormObject(prevState => ({
            ...prevState.form, // spread key-value pair 
            [name] : value
        }));
    }

    const submitUser = () => {
        fetch("/login", {
            method: "POST",
            "Content-Type": "application/json",
            body : formObject,
        }).then(response => {
            if (response.ok)
                alert("You have logged in!")
            else alert(response)
        }).then(err => alert(err))
    }
    
    return (
        <div id = "login" className = "form_container">
            <form onSubmit={submitUser}>
                <div className = "form_title"> Login </div>
                <div id="loginImageContainer">
                    <img id="loginImage" src={neutralUser} loading="lazy" alt="Login"/>
                </div> 
                <div className="form-group">
                <label htmlFor="exampleFormControlInput1">User Name</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter User Name" onChange={updateInfo}/>
                </div>

                <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Password</label>
                <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Enter Password" onChange={updateInfo}/>
                </div>

                <button type="button" class="btn btn-success">Success</button>
            </form>
        </div>
    ); 
    
} 