"use client"
import { useState, useEffect } from 'react'

const page = () => {
  const [dormId, setDormID] = useState(null)
  const [dormName, setDormName] = useState(null)
  const [ userObj, setUserObj ] = useState(null);
  const [ dormDescription, setDormDescription ] = useState(null)

  useEffect(() => {
    retrieveUserData()
  }, [])

  const retrieveUserData = async () => {
    await fetch("https://dorm-buddy-backend-production.up.railway.app/users/profile", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      redirect: "follow"
    }).then(response => response.json())
    .then(async data => {
      console.log(data)
      setUserObj(data)
      console.log(userObj)
    }).catch(err => {
      console.log(err)
    })
  }

  const createNewDorm = async () => {
    await fetch("https://dorm-buddy-backend-production.up.railway.app/dorm/create", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dormName,
        dormId,
        dormOwner: userObj.siteId,
        dormDescription: dormDescription,
        dormImage: "https://images.unsplash.com/photo-1581093458792-0e0e733b9b1e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9ybXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
      })
    }).then(response => response.json())
    .then(async data => {
      if (data.message === "Dorm created successfully") {
        window.location.replace("/dorm")
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <input type='text' placeholder='Dorm ID' onChange={(e) => setDormID(e.target.value)}></input>
      <input type='text' placeholder='Dorm Name' onChange={(e) => setDormName(e.target.value)}></input>
      <input type='text' placeholder='Dorm Description' onChange={(e) => setDormDescription(e.target.value)}></input>
      <button className="createNewDormButton" onClick={() => createNewDorm()}>Create New Dorm</button>
    </div>
  )
}

export default page