import { useEffect, useState } from 'react'

import {AiOutlineSearch} from 'react-icons/ai'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from './home.module.scss'

export default function Home() {
  const [user, setUser] = useState({})
  const [userName, setUserName] = useState('')
  const [ newUserName, setNewUserName] = useState('')

  function handleSearchUser() {
    if(newUserName !== '') {
      setUserName(newUserName)
      return
    }
    return
  }
  
  useEffect(() => {
    if(userName !== '') {
      fetch(`https://api.github.com/users/${userName}`)
      .then(response => response.json())
      .then(data => setUser({
        avatar_url: data.avatar_url,
        bio: data.bio,
        name: data.name,
        repos_url: data.repos_url
      }))
    }
  }, [userName])

  return (
    <>
      <Head>
        <title>GitHub Search</title>
      </Head>

      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <h1>Search users in GitHub</h1>
          <div className={styles.searchSection}>
            <input type="text" placeholder="Username" onChange={(e) => setNewUserName(e.target.value)}/>
            <button type="button" onClick={() => handleSearchUser()}><AiOutlineSearch className={styles.searchIcon}/> Search</button>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <section className={styles.content}>

        { typeof user.avatar_url === 'string' && (
            <div className={styles.userContent}>
              <Image src={user.avatar_url} alt='avatar' width="300" height="300"/>
              <h1>{user.name}</h1>
              <p>{user.bio}</p>
              <Link href="/repositories">Repositories</Link>
            </div>
        )}
        </section>
      </main>
    </>

  )
}
