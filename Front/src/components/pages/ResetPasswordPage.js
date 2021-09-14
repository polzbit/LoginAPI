import React, {useState} from 'react';
import ResetPasswordForm from  '../forms/ResetForm';
import { useParams } from 'react-router-dom';


const ResetPasswordPage = () => {
    const [log, setLog] = useState('')
    const { token } = useParams()

    /* check token */
    const check_token = async() => {
        console.log('init');
        let response = await fetch("http://localhost:5000/api/token", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                token: token
            })
        });
        // wait for api response
        let res = await response.json();
        
        if(!res.state) {
            // redirect to login page
            window.location.replace("http://localhost:3000");
        }
    }
    
    check_token(); // on load check token parameter
    return (
        <div className="App" id="App">
            <div className="main-container gardient-anim">
                <div className="page-container">
                    <div className='con'>
                        <div className="row form-container">
                            <ResetPasswordForm setLog={setLog}></ResetPasswordForm>
                        </div>
                        <div className="row log-container">
                            <p className='msg'>{log}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default ResetPasswordPage;