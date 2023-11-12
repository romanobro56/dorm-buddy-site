"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from "@styles/navBar.module.css"

import { Libre_Baskerville, Montserrat } from 'next/font/google'
const libreBaskerville = Libre_Baskerville({weight: "400", subsets: ["latin-ext"]})
const montSerrat = Montserrat({weight: "700", subsets: ["latin-ext"]})

const NavBar = () => {
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem("token")) {
        setSignedIn(true)
      }
    } else {
      setSignedIn(false)
    }
  }, [])

  return (
    <div className={styles.navBar}>
      <Link href="/" className={styles.navBarText + " " + libreBaskerville.className}><div>Home</div></Link>
      <h1 className={styles.navBarTitle + " " + montSerrat.className}>Dorm Buddy</h1>
      <Link href={signedIn ? "/dorm" : "/login"} className={styles.navBarText + " " + libreBaskerville.className}><div>Account</div></Link>
    </div>
  )
}

export default NavBar