import React, { useState , useEffect, useRef} from "react";
import axios from "axios";
import config from "../config.json";
import handleAccessTokenExpiration from "./HandleAccessTokenExpiration";
import handleGoogleDriveShortcutLink from "./HandleGoogleDriveShortcutLink";
import styles from '../styles/Home.module.css'

const SearchGoogleDrive = () => {
  const [targetFolderId, setTargetFolderId] = useState(config.directory.target_folder);
  const teamDriveId = config.directory.team_drive;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const corpora = (teamDriveId) ? "teamDrive" : "allDrives";

  const handleClickOutside = event => {

    if (!event.target.className || typeof event.target.className.includes != 'function') {
      return;
    }

    if (
        !event.target.className.includes(styles.searchContainer)
        && !event.target.className.includes(styles.searchInput)
        && !event.target.className.includes(styles.searchResult)
        && !event.target.className.includes(styles.searchResultLink)
    ) {
      setResults([]);
    }
  };

  useEffect(() => {

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const searchFiles = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    const accessToken = localStorage.getItem("access_token");
    let folderIds = [targetFolderId];

    try {
      let res = await axios.get("https://www.googleapis.com/drive/v3/files", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          source: "GoogleDriveSource",
          corpora: corpora,
          includeTeamDriveItems: true,
          supportsAllDrives: true,
          teamDriveId: teamDriveId,
          q: `mimeType='application/vnd.google-apps.folder' and trashed = false and parents in '${targetFolderId}'`
        }
      });

      const subFolders = res.data.files || [];
      subFolders.forEach(folder => {
        folderIds.push(folder.id);
      });

      res = await axios.get("https://www.googleapis.com/drive/v3/files", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          source: "GoogleDriveSource",
          corpora: corpora,
          includeTeamDriveItems: true,
          supportsAllDrives: true,
          teamDriveId: teamDriveId,
          q: `mimeType!='application/vnd.google-apps.folder' and trashed = false and parents in '${folderIds.join("','")}' and (name contains '${query}' or fullText contains '${query}')`
        }
      });

      setResults(res.data.files || []);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleAccessTokenExpiration();
      } else {
        setError(err);
      }
    }

    setLoading(false);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      searchFiles();
    }
  };

  return (
      <div style={{ width: "100%" , textAlign : "left" }}>
        <input
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyPress={handleKeyPress}
            className = { styles.searchInput }
        />
        <button
            onClick={searchFiles}
            style={{ width: "6vw" , textAlign : "center" , paddingLeft : "12px" , paddingRight : "12px" , paddingTop : "10px" , paddingBottom : "12px" }}
        >Search</button>
        {loading && <div style={{display:"nonxe"}}>Loading...</div>}
        {error && <div>{error.message}</div>}
        <ul style={{ width: "100%" , textAlign : "left" }}  className={styles.searchContainer}>
          {(results || []).map(result => (
              <li key={result.id} className={styles.searchResult}>
                <a href={`https://docs.google.com/document/d/${result.id}/edit`} data-file-id={result.id} target="_blank" rel="noopener noreferrer" className={styles.searchResultLink} data-mime-type={result.mimeType} onClick={handleGoogleDriveShortcutLink}>
                  {result.name}
                </a>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default SearchGoogleDrive;

