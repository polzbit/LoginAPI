
const MainPage = () => {

  /* login check */
  const login_check = async() => {
  // resend confirm
    let response = await fetch("http://localhost:5000/api/auth", {
      method: 'POST',
      credentials: 'include',
      headers: {
          "Content-Type": "application/json;charset=utf-8"
      }
    });
    // wait for api response
    let result = await response.json();
    console.log(result);
    if(!result.state) {
      window.location.replace("http://localhost:3000/login");
    }
  }

  login_check();  // on load check logged state
  return(
    <div className="App" id="App">
      <div className="main-container gardient-anim">
        <div id='login_success'><h1>Login successfully!</h1></div>
      </div>
    </div>
  );
}

export default MainPage;