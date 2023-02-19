import React, { useState, useEffect } from "react";
import { useRouter } from 'next/dist/client/router';
import axios from "axios";
import config from "../config.json";
import styles from '../styles/Home.module.css'
import handleAccessTokenExpiration from "./HandleAccessTokenExpiration";
import Link from 'next/link';

const PlayBookFolders = () => {
  const router = useRouter();
  const targetFolderId  = (typeof router.query.fid != 'undefined' ) ? router.query.fid : config.directory.target_folder;
  const teamDriveId = config.directory.team_drive;
  const corpora = (teamDriveId) ? "teamDrive" : "allDrives";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            source : "PlayBookFolders",
            corpora: corpora,
            includeTeamDriveItems: true,
            supportsAllDrives: true,
            teamDriveId: teamDriveId,
            q: `mimeType='application/vnd.google-apps.folder' and trashed = false and parents in '${targetFolderId}'`
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
  }, [targetFolderId]);


  return (
    <div  style={{ width: "100%" , textAlign : "left" }}>
      {loading && <div style={{display:"none"}}>Loading...</div>}
      {error && <div>{error.message}</div>}
      <div className={styles.grid}>
        {results.map(result => (
            <Link 
              href={{
                  pathname: `/list/[fid]`,
                  query: {
                    fid : result.id
                  },
              }}
              as={`/list/${result.id}`}
              key={result.id}
            >
              <a onClick={() => {
                const container = document.querySelector('.searchContainer');
                if (typeof container != 'undefined' && container ) {
                    container.innerHTML = '';
                }
              }}>
                <div className={styles.card}>
                  <h3>{result.name}</h3>
                </div>
              </a>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default PlayBookFolders;
