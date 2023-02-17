import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BackButton from './BackButton';
import config from "../config.json";
import axios from 'axios';
import styles from '../styles/Home.module.css'


const FolderName = () => {
  const router = useRouter();

  const accessToken = localStorage.getItem("access_token");
  const fid  = (typeof router.query.fid != 'undefined' ) ? router.query.fid : config.directory.target_folder;
  const [fname, setFName] = useState('');
  const teamDriveId = config.directory.team_drive;
  const corpora = (teamDriveId) ? "teamDrive" : "allDrives";

  useEffect(() => {
    const fetchData = async () => {

      const response = await axios.get("https://www.googleapis.com/drive/v3/files/" + fid, {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            source : "PlayBookFolders",
            corpora: corpora,
            includeTeamDriveItems: true,
            supportsAllDrives: true,
            teamDriveId: teamDriveId
          }
        });
      const data = response.data;
      setFName(data.name);
    };
    fetchData();
  }, [fid]);

  return (
    (fid !== config.directory.target_folder) && 
    <div className={styles.FolderHeader}>
      <h2><BackButton />{fname}</h2>
    </div>
  );
};

export default FolderName;
