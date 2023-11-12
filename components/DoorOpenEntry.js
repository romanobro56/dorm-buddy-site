"use client"
import { useState, useEffect } from 'react'
import styles from '@styles/doorOpenEntry.module.css'

const DoorOpenEntry = ({rawTime}) => {
  const [time, setTime] = useState(rawTime)

  useEffect(() => {
    setTime(changeTimeFormat(time))
  }, [])

  const changeTimeFormat = (time) => {
    const [hour, minute, second] = time.split(":")
    const [newHour, newMinute] = [parseInt(hour), parseInt(minute)]
    if (newHour > 12) {
      return `${newHour - 12}:${newMinute} PM`
    } else {
      return `${newHour}:${newMinute} AM`
    }
  }

  return (
    <div className={styles.doorOpenEntry}>{time}</div>
  )
}

export default DoorOpenEntry