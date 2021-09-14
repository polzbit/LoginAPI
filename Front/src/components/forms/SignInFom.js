import React, {useState} from 'react';
import usrIcon from "../../img/user.png";
import lockIcon from "../../img/lock.png";

/* Sign-in form */
const SignInForm = (props)=> {
    const [status, setStatus] = useState("Login")
    const [state, setState] = useState(false)
    const [valid_email, setEmailValid] = useState(false)
    const [valid_psw, setPswValid] = useState(false)
    
    /* submit handler */
	const handleSubmit = async(e) => {
        e.preventDefault();
        // locak submit
        setState(false);
        const {email, password} = e.target.elements;
        // update ui button text
        setStatus("Cheaking...");
        let response = await fetch("http://localhost:5000/api/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                email: email.value,
                psw: password.value
            })
        });
        // wait for api response
        let result = await response.json();
        props.resultCallback(result);
        // unlock submit
        setState(true);
        setStatus("Login");
    }
    /* validate inputs */
    const getValidation = (target) => {
        const val = target.value.trim();
        if(target.id === "email") {
            // check if email is valid 
            setEmailValid(props.validateEmail(val));
        } else if(target.id === "password" && val.length > 2){
            // check that password is valid
            setPswValid(true);
        } else {
            setPswValid(false);
        }
        if(valid_email && valid_psw) {
            setState(true);
        }
    }

    return (
        <div className="form mt-1">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="email"><img src={usrIcon} alt="Email" width="20vh" height="20vh" /></label>
                    <input type="email" placeholder="Email" id="email" onChange={(e) => getValidation(e.target)} required/>
                </div>
                <div className="row mt-1">
                    <label htmlFor="password"><img src={lockIcon} alt="Password" width="20vh" height="20vh" /></label>
                    <input type="password" placeholder="Password" id="password" onChange={(e) => getValidation(e.target)} required/>
                </div>
                <div className="row mt-1">
                    <button className="txt-btn forgot-btn" onClick={props.setHide}>Forgot Password?</button>
                </div>
                <div className="row mt-3">
                    <button type="submit" className="submit_btn" disabled={!state}>{status}</button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;