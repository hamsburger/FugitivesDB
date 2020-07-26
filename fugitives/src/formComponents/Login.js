import React from "react"; 
import neutralUser from "../images/neutralUser.png"; 
import "../stylesheets/Form/form.css";
export default class Login extends React.Component{
    render(){
        return (
            <div id = "login" className = "form_container">
                <form>
                    <div className = "form_title"> Login </div>
                    <div id="loginImageContainer">
                        <img id="loginImage" src={neutralUser} loading="lazy" alt="Login"/>
                    </div> 
                    <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">User Name</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter User Name" />
                    </div>

                    <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Password</label>
                    <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Enter Password" />
                    </div>
                </form>
            </div>
        ); 
    }
} 