import React, {useState} from 'react';
import forgotIcon from "../../img/forgot.png"
import emailIcon from "../../img/email.png";

const ForgotForm = (props) => {
    const [status, setStatus] = useState("Submit")
    const [state, setState] = useState(false)

    /* submit handler */
	const handleSubmit = async(e) => {
        e.preventDefault();
        // locak submit
        setState(false);
        const {email} = e.target.elements;
        // update ui button text
        setStatus("Cheaking...");
        let response = await fetch("http://localhost:5000/api/forgot", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                email: email.value
            })
        });
        // wait for api response
        let result = await response.json();
        props.resultCallback(result);
        // unlock submit
        setState(true);
        setStatus("Submit");
    }
    /* validate inputs */
    const getValidation = (target) => {
        const val = target.value.trim();
        if(target.id === "email") {
            // check if email is valid 
            setState(props.validateEmail(val));
        }
    }

    return(
        <div id="forgot">
            <div className="row forgot-top">
                <button type="button" className="tab-btn back_btn" onClick={props.goBack}>Sign-In</button>
            </div>
            <div className="tab-top mt-1">
                <img src={forgotIcon} alt="forgot-icon" width="100vw" height="100vh"/>
            </div>
            <div className="form mt-1">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <label htmlFor="email"><img src={emailIcon} alt="Email" width="20vw" height="20vh" /></label>
                        <input type="email" placeholder="Email" id="email" onChange={(e) => getValidation(e.target)} required/>
                    </div>
                    <div className="row mt-3">
                        <button type="submit" className="submit_btn" disabled={!state}>{status}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotForm;