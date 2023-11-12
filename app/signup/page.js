"use client"

const Signup = () => {
  return (
    <div className="account-container">
      <p className="account-text">Sign up</p>
      <button className="change-button" onClick={()=>{
        window.location.replace("http://localhost:3000/login")
      }}><p className="change-text">Click here to log in</p></button>
      <input type='text' className='account-input' id='emailinput' placeholder='email'></input>
      <input type='text' className='account-input' id='usernameinput' placeholder='username'></input>
      <input type='password' className='account-input' id ='passwordinput' placeholder='password'></input>
      <button className='login-button' onClick={async () => {
        const mail = document.getElementById('emailinput')
        const password = document.getElementById('passwordinput')
        const username = document.getElementById('usernameinput')
        await fetch('http://localhost:3001/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: mail.value,
            username: username.value,
            pass: password.value
          }),
          redirect: 'follow'
        }).then(response => response.json())
        .then(data =>{ 
          console.log(data)
          if (data.token) {
            localStorage.setItem('token', data.token)
            //window.location.replace("http://localhost:3000/")
          } else {
            console.log("failed to sign up")
          }
        }).catch( err => console.log(err.message))
      }}>Signup</button>
    </div>
  )
}

export default Signup;