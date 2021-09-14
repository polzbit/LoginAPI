import React, {useState} from 'react';
import SignInForm from '../forms/SignInFom';
import SignUpForm from '../forms/SignUpForm';
import ForgotForm from '../forms/ForgotForm';
import Tabs from '../tabs/Tabs';
import Tab from '../tabs/Tab';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import groupIcon from "../../img/user-group.png";
import registerIcon from "../../img/edit.png"
/* Login view */
const LoginContainer = ()=> {
    const [hidden, setHidden] = useState(false)
    const [log, setLog] = useState('')
    const [showResend, setResend] = useState(false)
    const { search } = useLocation()
    const values = queryString.parse(search)

    /* user login post callback */
    const signCallback = (res) => {
        // check result status
        if(res.state){
            console.log("Login success");
            window.location.replace("http://localhost:3000");
        } else {
            console.log("Login failed, error: " + res.error);
            if(res.error === "verificaion pending") {
                setLog('Verification pending, to resend verifiction mail ');
                setResend(true);
            }else {
                setResend(false);
                setLog(res.error);
            }
        }
    }
    
    /* user registr post callback */
    const regCallback = (res) => {
        // check result status
        if(res.state) {
            setLog('Verification mail sent, to resend it ');
            setResend(true);
        } else {
            setResend(false);
            setLog(res.error);
        }
    }
    /* user forgot post callback */
    const forgotCallback = (res) => {
        console.log(res);
        if(res.state) {
            setLog("Reset mail has been sent to this address.");
        } else {
            setLog(res.error);
        }
    }

    /* resend verification mail */
    const resend_confirm = async() => {
        // resend confirm
        let response = await fetch("http://localhost:5000/api/resend-confirm", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        });
        // wait for api response
        let result = await response.json();
        if(result.error === '') {
            setLog('Verification mail sent, to resend ');
            setResend(true);
        } else {
            setResend(false);
            setLog(result.error);
        }
    }

    /* show forgot password form */
    const hideTabs = () => {
        setHidden(true);
    }
    /* hide forgot password form */
    const showTabs = () => {
        setHidden(false);
    }
    /* email validator */
    const validateEmail = (email) => {
        // eslint-disable-next-line
        return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

    return(
        <div className="page-container">
            <div className='con'>
                <div className="row form-container">
                {hidden ? <ForgotForm goBack={showTabs} resultCallback={forgotCallback} validateEmail={validateEmail}></ForgotForm> : 
                    <Tabs>
                        <Tab title="Sign-In">  
                            <div className="tab-top mt-1">
                                <img src={groupIcon} alt="group-icon" width="100vw" height="100vh"/>
                            </div>
                            <SignInForm setHide={hideTabs} resultCallback={signCallback} validateEmail={validateEmail}></SignInForm> 
                        </Tab>
                        <Tab title="Register">
                            <div className="tab-top mt-1">
                                <img src={registerIcon} alt="register-icon" width="100vw" height="100vh"/>
                            </div>
                            <SignUpForm resultCallback={regCallback} validateEmail={validateEmail}></SignUpForm> 
                        </Tab>
                    </Tabs>
                    }
                </div>
                <div className="row log-container">
                    <p className='msg'>{ values.token === "expired" && log === '' ? '\nConfirmation expired, to resend '  : log }{showResend ? <button className='txt-btn' onClick={resend_confirm} >click here</button>: ''}.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginContainer;