import Head from 'next/head'
import React, { useState } from 'react';
import styles from '../../styles/Home.module.css'
import HeaderImage from '../../components/HeaderImage';
import GoogleDriveSearch from '../../components/GoogleDriveSearch'
import SimpleSignOn from '../../components/SimpleSignOn'
import PlayBookFolders from '../../components/PlayBookFolders';
import PlayBookFiles from '../../components/PlayBookFiles';
import FolderName from '../../components/FolderName';

export default function Drilldown() {
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

          <FolderName />

          <PlayBookFolders />

          <PlayBookFiles />

        </main>

        <footer className={styles.footer}>
          
        </footer>
      
      </SimpleSignOn>
    </div>
  )
}
