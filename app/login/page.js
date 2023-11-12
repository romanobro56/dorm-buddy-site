"use client"

const Login = () => {
  return (
    <div className="account-container">
      <p className="account-text">Login</p>
      <button className="change-button" onClick={()=>{
        window.location.replace("http://localhost:3000/signup")
      }}><p className="change-text">Click here to sign up</p></button>
      <input type='text' className='account-input' placeholder='email' id='emailinput'></input>
      <input type='password' className='account-input' placeholder='password' id='passwordinput'></input>
      <button className='login-button' onClick={ async() =>{
        const mail = document.getElementById('emailinput')
        const username = document.getElementById('usernameinput')
        const password = document.getElementById('passwordinput')
        if (mail.value && password.value) { 
          setLoading(true)
          await fetch( "http://localhost:3001/users/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: mail.value,
              pass: password.value
            }),
            redirect: 'follow'
          }).then(response => response.json())
          .then(data =>{ 
            setLoading(false)
            if (data.token) {
              localStorage.setItem('token', data.token)
              setAccount("profile")
              window.location.replace("http://localhost:3000/")
            } else {
              console.log("failed to log in up")
            }
          }).catch( err => console.log(err.message))
        }
      }}>Login</button>
    </div>
  )
}

export default Login;