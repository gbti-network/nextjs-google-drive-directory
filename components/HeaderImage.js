import React from 'react';
import config from "../config.json";
const HeaderImage = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , }}>
    <a href={config.components.HeaderImage.homepage_url} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , }}>
      <img src={config.components.HeaderImage.logo_url} alt={config.components.HeaderImage.logo_url} style={{ width: config.components.HeaderImage.logo_width , color: config.components.HeaderImage.logo_color }}/>
      <h1 style={{ margin: '0 10px' }}>Playbook</h1>
    </a>
  </div>
);

export default HeaderImage;