import React from 'react';
import Link from 'next/link';
import config from "../config.json";
import styles from '../styles/Home.module.css';

const HeaderImage = () => (
    <div className={styles.headerContainer}>
        <Link href={config.components.HeaderImage.homepage_url}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                    src={config.components.HeaderImage.logo_url}
                    alt={config.components.HeaderImage.logo_url}
                    style={{ width: config.components.HeaderImage.logo_width, color: config.components.HeaderImage.logo_color }}
                />
                <h1 style={{ margin: '0 10px' }}>{config.components.HeaderImage.title}</h1>
            </div>
        </Link>
    </div>
);

export default HeaderImage;
