import React, {useState} from 'react';
//import usrIcon from "../../img/user.png";
import lockIcon from "../../img/lock.png";
import emailIcon from "../../img/email.png";

/* Sign-up form */
const SignUpForm = (props)=> {
    const [status, setStatus] = useState("Register")
    const [state, setState] = useState(false)
    const [valid_email, setEmailValid] = useState(false)
    const [valid_psw, setPswValid] = useState(false)
    const [valid_cpsw, setCpswValid] = useState(false)

    /* submit handler */
	const handleSubmit = async(e) => {
        e.preventDefault();
        // locak submit
        setState(false);
        const {email, password, repassword} = e.target.elements;
        
        const data = {
            email: email.value,
            psw: password.value,
            cpsw: repassword.value
        }
        // update ui button text
        setStatus("Checking...");
        let response = await fetch("http://localhost:5000/api/register", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        });
        // wait for api response
        let result = await response.json();
        props.resultCallback(result);
        // unlock submit
        setState(true);
        setStatus("Register");
    }
    /* validate inputs */
    const getValidation = (target) => {
        const val = target.value.trim();
        if(target.id === "email") {
            // check if email is valid 
            setEmailValid(props.validateEmail(val));
        } else if(target.id === "password"){
            // check that password is valid
            if(val.length > 2) {
                setPswValid(true);
            } else {
                setPswValid(false);
            }
        } else if(target.id === "repassword"){
            // check that password is valid
            if(val.length > 2) {
                setCpswValid(true);
            } else {
                setCpswValid(false);
            }
        } 
        if(valid_email && valid_psw && valid_cpsw) {
            setState(true);
        }
    }

    return (
        <div className="form mt-1">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="email"><img src={emailIcon} alt="Email" width="20vh" height="20vh" /></label>
                    <input type="email" placeholder="Email" id="email" onChange={(e) => getValidation(e.target)} required/>
                </div>
                <div className="row mt-1">
                    <label htmlFor="password"><img src={lockIcon} alt="Password" width="20vh" height="20vh" /></label>
                    <input type="password" placeholder="Password" id="password" onChange={(e) => getValidation(e.target)} required/>
                </div>
                <div className="row mt-1">
                    <label htmlFor="repassword"><img src={lockIcon} alt="Confirm Password" width="20vh" height="20vh" /></label>
                    <input type="password" placeholder="Confirm Password" id="repassword" onChange={(e) => getValidation(e.target)} required/>
                </div>
                <div className="row mt-3">
                    <button type="submit" className="submit_btn" disabled={!state}>{status}</button>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;