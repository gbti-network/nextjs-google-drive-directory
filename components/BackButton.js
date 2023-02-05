import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import axios from 'axios';
import IconUpLevel from './IconUpLevel';
import config from "../config.json";

const BackButton = () => {
  const router = useRouter();
  const fid  = (typeof router.query.fid != 'undefined' ) ? router.query.fid : config.directory.target_folder;
  const [fparent, setFParent] = useState('');
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/drive/v2/files/${fid}/parents`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const data = response.data;
      setFParent(data.items[0].id);
    };
    fetchData();
  }, [fid]);

  return (
    <Link 
        href={{
            pathname: `/list/[fid]`,
            query: {
                fid: fparent,
                fname : "get me"
            },
        }}
        as={`/list/${fparent}`} key={fparent}
    >

        <button 
            className={styles.BackButton} 
            onClick={() => {
                const container = document.querySelector('.searchContainer');
                if (typeof container != 'undefined'  && container) {
                    container.innerHTML = '';
                }
        }}>
        <IconUpLevel />
        </button>
    </Link>
  );
};

export default BackButton;
