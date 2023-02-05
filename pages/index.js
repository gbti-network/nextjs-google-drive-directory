import Head from 'next/head'
import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import HeaderImage from '../components/HeaderImage';
import GoogleDriveSearch from '../components/GoogleDriveSearch'
import SimpleSignOn from '../components/SimpleSignOn'
import PlayBookFolders from '../components/PlayBookFolders';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SimpleSignOn>
        <main className={styles.main}>
          <HeaderImage />
          
          <GoogleDriveSearch />

          <PlayBookFolders />

        </main>

        <footer className={styles.footer}>
          
        </footer>
      
      </SimpleSignOn>
    </div>
  )
}
