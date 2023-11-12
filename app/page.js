"use client"
import React, { useState, useEffect } from 'react';
import Profile from '@components/Profile';  // Replace with the correct path to your Profile component
import styles from "@styles/home.module.css"
import Link from 'next/link';

const App = () => {
  const [ token, setToken ] = useState(null);
  const [ userObj, setUserObj ] = useState(null);

  const retrieveUserData = async () => {
    await fetch("http://localhost:3001/users/profile", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      redirect: "follow"
    }).then(response => response.json())
    .then(async data => {
      if(data === "token invalid") {
        localStorage.removeItem('token')
      } else {
        setUserObj(data)
      }
    }).catch(err => {
      console.log(err)
    })
  }


  useEffect(() => {
    setToken(localStorage.getItem('token'))
    retrieveUserData()
  }, [])

  return (
    <>
      { userObj  
        ? <div className={styles.loggedInContainer}>
          <h1 className={styles.loggedInText}>Welcome to Dorm Buddy, {userObj.email || "user unknown"}</h1>

          <div className={styles.dashboard}>
            <div className={styles.dataField}>
              <label>Door Last Opened</label>
              <p>October 15, 2023 - 10:30 AM</p>
            </div>
            <div className={styles.dataField}>
              <label>Dorm Temperature</label>
              <p>23°C</p>
            </div>
          </div>


         </div> 
      
        : <div className={styles.loginNotice}>
          <Link href="/login"> 
            <h1 className={styles.loginNoticeText}>Please log in to view your dashboard</h1>
          </Link>
        
        </div>
      }
    </>
  );
};

export default App;
