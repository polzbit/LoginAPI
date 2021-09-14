import React, {useState} from 'react';
import lockIcon from "../../img/lock.png";
import resetIcon from "../../img/reset.png";

const ResetPasswordForm = (props) => {
    const [status, setStatus] = useState("Reset")
    const [state, setState] = useState(false)

    /* submit handler */
	const handleSubmit = async(e) => {
        e.preventDefault();
        // locak submit
        setState(false);
        const {password, repassword} = e.target.elements;
        // update ui button text
        setStatus("Cheaking...");
        let response = await fetch("http://localhost:5000/api/reset", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                psw: password.value,
                cpsw: repassword.value
            })
        });
        // wait for api response
        let result = await response.json();
        resultCallback(result);
        // unlock submit
        setState(true);
        setStatus("Reset");
    }
    /* post callback */
    const resultCallback = (result) => {
        if(result.state) {
            // redirect to login page
            window.location.replace("http://localhost:3000/login");
        } else {
            props.setLog(result.error);
        }
    }

    /* validate inputs */
    const getValidation = (target) => {
        const val = target.value.trim();
        let valid = false;
        if(val.length > 2){
            valid = true;
        }
        setState(valid);
    }
    
    return(
        <div className="form">
            <div className="tab-top mt-1">
                <img src={resetIcon} alt="reset-icon" width="100vw" height="100vh"/>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row mt-1">
                    <label htmlFor="password"><img src={lockIcon} alt="Password" width="20vh" height="20vh" /></label>
                    <input type="password" placeholder="New Password" id="password" onChange={(e) => getValidation(e.target)} required/>
                </div>
                <div className="row mt-1">
                    <label htmlFor="repassword"><img src={lockIcon} alt="Confirm Password" width="20vh" height="20vh" /></label>
                    <input type="password" placeholder="Confirm New Password" id="repassword" onChange={(e) => getValidation(e.target)} required/>
                </div>
                <div className="row mt-3">
                    <button type="submit" className="submit_btn" disabled={!state}>{status}</button>
                </div>
            </form>
        </div>

    );
}

export default ResetPasswordForm;