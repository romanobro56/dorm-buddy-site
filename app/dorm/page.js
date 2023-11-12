"use client"
import { useState, useEffect } from 'react'
import styles from "@styles/dorm.module.css"
import DoorOpenEntry from "@components/DoorOpenEntry.js"
import NavBar from "@components/NavBar.js"

import { Poppins, Libre_Baskerville } from 'next/font/google'
const poppins = Poppins({weight: "500", subsets: ["latin-ext"]})
const libreBaskerville = Libre_Baskerville({weight: "400", subsets: ["latin-ext"]})

const page = () => {
  const [dormStatus, setDormStatus] = useState(null)
  const [temp, setTemp] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [dormDescription, setDormDescription] = useState(null)
  const [doorLastOpened, setDoorLastOpened] = useState(null)
  const [editMode, setEditMode] = useState(false)

  const logOut = () => {
    localStorage.removeItem("token")
    window.location.replace("/")
  }

  function changeTimeFormat(dateString) {
    // Parse the UTC date string
    const date = new Date(dateString);
  
    // Convert to EST time zone (UTC-5)
    const estTime = new Date(date.getTime());
  
    // Format the time in "hour:minute AM/PM" format
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(estTime);
  
    return formattedTime;
  }

  const deleteDormPage = async () => {
    await fetch("https://dorm-buddy-backend-production.up.railway.app/dorm/delete", {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      redirect: "follow"
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      window.location.replace("/dorm/create")
    })
  }

  const updateDormStatus = async () => {
    await fetch("https://dorm-buddy-backend-production.up.railway.app/dorm/status", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      redirect: "follow"
    }).then(response => response.json())
    .then(async data => {
      if (data === "Dorm Not found attached to the given user") {
        alert("There was no dorm found connected to your account")
        window.location.replace("/dorm/create")
      } else {
        setDormStatus(data)
        setTemp(70.5)
        setHumidity(24)
        setDormDescription(data.dormDescription)
        setDoorLastOpened(changeTimeFormat(data.doorLastOpened))
      }
    }).catch(err => {
      console.log(err)
    })
  }


  useEffect(() => {
    updateDormStatus()
  }, [])

  const updateDormDesc = async () => {
    await fetch("https://dorm-buddy-backend-production.up.railway.app/dorm/updatedescription", {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({dormDescription}),
      redirect: "follow"
    }).then(response => response.json())
    .then(data => console.log(data))
  }
  return (
  <>
    <NavBar />
    <div className={styles.dashboardContainer}>
      <div className={styles.doorOpenedAndStatusWidgets}>
      <div className={styles.dormStatusWidget}>
          <h2 className={styles.dormStatusTitle + " " + poppins.className}>{dormStatus?.dormName}</h2>
          <p className={styles.dormStatusText + " " + poppins.className}>Dorm Status: {dormStatus?.dormStatus}</p>

          {!editMode? 
          <>
            <textarea className={styles.dormStatusDescription + " " + libreBaskerville.className} value={dormDescription? dormDescription: "Empty Description, click below to edit."} readOnly role="textbox"></textarea> 
            <button className={styles.dormStatusButton} onClick={() => setEditMode(true)}>Edit</button>
          </>
          :
          <>
            <input className={styles.dormStatusDescription} type="text" onChange={(e) => setDormDescription(e.target.value)}></input>
            <button className={styles.dormStatusButton} onClick={() => {setEditMode(false); updateDormDesc()}}>Save</button>
          </>
          }
        </div>
        
        <div className={styles.doorOpenedWidget}>
          <h2 className={styles.doorLastOpenedHeader + " " + poppins.className}>Door Last Opened:</h2>
          <p className={styles.doorLastOpenedText + " " + poppins.className}>{doorLastOpened}</p>
          <p className={styles.doorOpensHeader + " " + poppins.className}>Door Opens:</p>
          <div className={styles.doorOpensContainer}>
          {dormStatus?.doorOpensTimes?.map((time) => {
            return <DoorOpenEntry rawTime={time} />
          })}
          </div>
        </div>

      </div>
      <div className={styles.dormTempAndButtons}>
      <div className={styles.tempWidget}>
        <div className={styles.tempImage}>
            <img className={styles.tempImage} src="/weather.webp" height={100}></img>
          </div>
          <div className={styles.tempTextFields}>
            <p className={styles.temperatureText + " " + poppins.className}>Current Dorm Temperature: {temp}</p>
            <p className={styles.humidityText + " " + poppins.className}>Current Dorm Humidity: {humidity}</p>
          </div>
        </div>
          <button className={styles.deleteDashboardButton} onClick={() => {logOut()}}>Log Out</button>
          <button className={styles.deleteDashboardButton} onClick={() => {deleteDormPage()}}>Delete Dashboard</button>
      </div>
      
    </div>

  </>
    
  )
}

export default page