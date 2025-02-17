'use client'
import Link from "next/link";
import Image from "next/image";
import styles from "./Sidebar.module.css";
import React from "react";

export default function Sidebar() {

  const handleLogoutButton = async (e) => {
    e.preventDefault()

    try {
      const endpoint = 'http://127.0.0.1:8000/auth/logout/'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      } else {
        window.location.href = '/'
      }

    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/dashboard" className={styles.menuItem}>
            <div className={styles.menuContent}>
              <Image src="/icons/home.png" alt="Home" width={24} height={24} />
              <span>Home</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/library" className={styles.menuItem}>
            <div className={styles.menuContent}>
              <Image src="/icons/dress.png" alt="Library" width={24} height={24} />
              <span>Catalouge</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/history" className={styles.menuItem}>
            <div className={styles.menuContent}>
              <Image src="/icons/clock.png" alt="History" width={24} height={24} />
              <span>History</span>
            </div>
          </Link>
        </li>
      </ul>
      <div>
        <button 
        className={styles.logoutButton}
        onClick={handleLogoutButton}>
          Logout
        </button>
      </div>
    </nav>
  );
}
