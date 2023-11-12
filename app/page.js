"use client"
import { useState, useEffect } from 'react';
import styles from "@styles/home.module.css"
import Link from 'next/link';
import NavBar from '@components/NavBar';

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
        console.log(data)
        return data
      }
    }).catch(err => {
      console.log(err)
    })
  }


  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      setUserObj(retrieveUserData())
      if (userObj) {
        window.location.replace("/dorm")
      }
    } else {
      setToken(null)
    }
  }, [])

  return (
    <>
      <NavBar />
      { !userObj ? 
          <div className={styles.loginNotice}>
            <Link href="/login"> 
              <h1 className={styles.loginNoticeText}>Please log in to view your dashboard</h1>
            </Link>
          </div>
        :
        <></>
      }
      <div className={styles.aboutUs}>
        <img src="/dormbuddy.webp" className={styles.aboutUsImage} width={300} height={300}></img>
        <div className={styles.descriptionContainer}>
          <h1 className={styles.aboutUsText}>Dorm Buddy</h1>
          <h2 className={styles.dormBuddyCreators}>By Jaden Borla, Abhiram Kollipara, Rishik Muthyala and Roman Pisani</h2>
          <p className={styles.aboutUsDescription}>Dorm Buddy is a smart dorm management system that allows you to monitor your dorm's temperature, humidity, and door status. 
            Dorm Buddy is a project created for HackUmass XI in 2023. On the software side, we used an Arduino with 3 status indicator LEDs, an ultrasonic sensor, a temperature and humidity sensor, and a remote receiver. 
            The Arduino works by taking measurements of the environment at regular intervals, and sends them to MongoDB through Node.JS using SerialPort. The status of the room
            is set by the user, who wields the dorm buddy remote. There are three settings, Open, Quiet, and Do Not Enter, with the intention of streamlining shared living.
            This information is retrieved by the Next.js web application, that itself gets the information through an API Wrapper deployed on Railway. The API is built using Express and MongoDB, with an authentication built from scratch
            using Bcrypt and JSONWebToken. The user is authenticated by verifying a signed JWT in the backend. Once the user is authenticated, each of their requests to the backend can be accessed securely. The data is retrieved from MongoDB 
            and then displayed on the site for the user's convenience</p>
        </div>
      </div>
    </>
    
      
  );
};

export default App;
