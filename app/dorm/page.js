"use client"
import { useState, useEffect } from 'react'
import styles from "@styles/dorm.module.css"
import DoorOpenEntry from "@components/DoorOpenEntry.js"

const page = () => {
  const [dormStatus, setDormStatus] = useState(null)
  const [temp, setTemp] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [dormDescription, setDormDescription] = useState(null)
  const [doorLastOpened, setDoorLastOpened] = useState(null)
  const [editMode, setEditMode] = useState(false)

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

  useEffect(() => {
    fetch("http://localhost:3001/dorm/status", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      redirect: "follow"
    }).then(response => response.json())
    .then(async data => {
      console.log(data)
      setDormStatus(data)
      setTemp(data.dormTemperature)
      setHumidity(data.dormHumidity)
      setDormDescription(data.dormDescription)
      setDoorLastOpened(changeTimeFormat(data.doorLastOpened))
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const updateDormDesc = async () => {
    await fetch("http://localhost:3001/dorm/updatedescription", {
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
    <div className={styles.dashboardContainer}>
      <div className={styles.doorOpenedAndTempWidgets}>
        <div className={styles.tempWidget}>
          <div className={styles.tempImage}>
            <img className={styles.tempImage} src="/weather.webp" width={200} height={100}></img>
          </div>
          <div className={styles.tempTextFields}>
            <p className={styles.temperatureText}>Current Dorm Temperature: {temp}</p>
            <p className={styles.humidityText}>Current Dorm Humidity: {humidity}</p>
          </div>
        </div>
        <div className={styles.doorOpenedWidget}>
          <h2 className={styles.doorLastOpenedHeader}>Door Last Opened:</h2>
          <p className={styles.doorLastOpenedText}>{doorLastOpened}</p>
          <p className={styles.doorOpensHeader}>Door Opens:</p>
          <div className={styles.doorOpensContainer}>
          {dormStatus?.doorOpensTimes?.map((time) => {
            return <DoorOpenEntry rawTime={time} />
          })}
          </div>
        </div>

      </div>
      <div className={styles.dormStatusWidget}>
        <h2 className={styles.dormStatusTitle}></h2>
        <p className={styles.dormStatusText}>{dormStatus?.text}</p>
        <img className={styles.dormStatusImage} src={dormStatus?.image}></img>

        {!editMode? 
        <>
          <textarea className={styles.dormStatusDescription} value={dormDescription? dormDescription: "Empty Description, click below to edit."} readOnly role="textbox"></textarea> 
          <button className={styles.editDormStatusButton} onClick={() => setEditMode(true)}>Edit</button>
        </>
        :
        <>
          <input className={styles.editDormStatusDescription} type="text" onChange={(e) => setDormDescription(e.target.value)}></input>
          <button className={styles.saveDormStatusButton} onClick={() => {setEditMode(false); updateDormDesc()}}>Save</button>
        </>

        }
        
  
      </div>
    </div>
    <div className={styles.bottomButtonsContainer}>
      <button className={styles.deleteDashboardButton}></button>
      <button className={styles.connectNewDashboardButton}></button>
    </div>

  </>
    
  )
}

export default page