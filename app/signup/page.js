"use client"
import NavBar from "@components/NavBar"
import styles from "@styles/login.module.css"

const Signup = () => {
  return (
    <>
      <NavBar />
      <div className={styles.accountContainer}>
        <p className={styles.accountText}>Sign up</p>
        <button className={styles.changeButton} onClick={()=>{
          window.location.replace("https://dormbuddy.tech/login")
        }}><p className={styles.changeText}>Click here to log in</p></button>
        <input type='text' className={styles.accountInput} id='emailinput' placeholder='email'></input>
        <input type='text' className={styles.accountInput} id='usernameinput' placeholder='username'></input>
        <input type='password' className={styles.accountInput} id ='passwordinput' placeholder='password'></input>
        <button className={styles.loginButton} onClick={async () => {
          const mail = document.getElementById('emailinput')
          const password = document.getElementById('passwordinput')
          const username = document.getElementById('usernameinput')
          await fetch('https://dorm-buddy-backend-production.up.railway.app/users/create', {
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
              window.location.replace("https://dormbuddy.tech/")
            } else {
              console.log("failed to sign up")
            }
          }).catch( err => console.log(err.message))
        }}>Signup</button>
      </div>

    </>
  )
}

export default Signup;