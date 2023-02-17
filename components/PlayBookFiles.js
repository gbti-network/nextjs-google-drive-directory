import React, { useState, useEffect } from "react";
import { useRouter } from 'next/dist/client/router';
import axios from "axios";
import config from "../config.json";
import styles from '../styles/Home.module.css'
import handleAccessTokenExpiration from "./HandleAccessTokenExpiration ";

const PlayBookFiles = () => {
  const router = useRouter();
  const fid  = (typeof router.query.fid != 'undefined' ) ? router.query.fid : config.directory.target_folder;
  const teamDriveId = config.directory.team_drive;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const corpora = (teamDriveId) ? "teamDrive" : "allDrives";

  useEffect(() => {

    const getFiles = async () => {
      setLoading(true);
      setError(null);
      setResults([]);

      const accessToken = localStorage.getItem("access_token");

      try {
        const res = await axios.get("https://www.googleapis.com/drive/v3/files", {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            source : "PlayBookFiles",
            corpora: corpora,
            includeTeamDriveItems: true,
            supportsAllDrives: true,
            teamDriveId: teamDriveId,
            q: `mimeType!='application/vnd.google-apps.folder' and trashed = false and parents in '${fid}'`
          }
        });

        setResults(res.data.files);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          handleAccessTokenExpiration();
        } else {
          setError(err);
        }
      }

      setLoading(false);
    };

    getFiles();
  }, [fid]);

  return (
    (fid !== config.directory.target_folder) && 
    <div style={{ width: "100%" , textAlign : "left" }}>
      {loading && <div style={{display:"none"}}>Loading...</div>}
      {error && <div>{error.message}</div>}
      <ul className={styles.list} style={{ width: "100%" , textAlign : "left" }}  className={styles.filesContainer}>
        {results.map((result) => (
          <li key={result.id}  className={styles.fileResult}>
            <a href={`https://docs.google.com/document/d/${result.id}/edit`} target="_blank" rel="noopener noreferrer" style={{display:"block"}}>
              {result.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayBookFiles;
