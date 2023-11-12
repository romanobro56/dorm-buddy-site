"use client"
import NavBar from "@components/NavBar"
import styles from "@styles/login.module.css"

const Login = () => {
  return (
    <>
      <NavBar />
      <div className={styles.accountContainer}>
        <p className={styles.accountText}>Login</p>
        <button className={styles.changeButton} onClick={()=>{
          window.location.replace("https://dormbuddy.tech/signup")
        }}><p className={styles.changeText}>Click here to sign up</p></button>
        <input type='text' className={styles.accountInput} placeholder='email' id='emailinput'></input>
        <input type='password' className={styles.accountInput} placeholder='password' id='passwordinput'></input>
        <button className={styles.loginButton} onClick={ async() =>{
          const mail = document.getElementById('emailinput')
          const password = document.getElementById('passwordinput')
          if (mail.value && password.value) { 
            await fetch( "https://dormbuddy.tech/users/login", {
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
            .then(data => { 
              if (data.token) {
                localStorage.setItem('token', data.token)
                window.location.replace("https://dormbuddy.tech/")
              } else {
                console.log("failed to sign up")
              }
            }).catch( err => console.log(err.message))
          }
        }}>Login</button>
      </div>
    </>
  )
}

export default Login;