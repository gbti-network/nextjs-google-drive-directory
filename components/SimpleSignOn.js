import React, { useState, useEffect } from 'react';
import axios from 'axios';
var config = require('../config.json');

const SimpleSignOn = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [currentURL, setCurrentURL] = useState(null);

  useEffect(() => {
    if (!currentURL) {
      setCurrentURL(window.location.href);
    }
  }, [currentURL]);
 
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignOn = async () => {
    try {
      // Redirect the user to the Google authorization endpoint
      window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&response_type=code&client_id='+config.api.client_id+'&redirect_uri='+ currentURL +'login&scope='+config.api.scopes;
    } catch (err) {
      setError(err);
    }
  };

  const handleAccessTokenExpiration = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const config = localStorage.getItem('config');
  
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        refresh_token: refreshToken,
        client_id: config.api.client_id,
        client_secret: config.api.client_secret,
        grant_type: 'refresh_token',
      });
  
      const accessToken = response.data.access_token;
  
      localStorage.setItem('access_token', accessToken);
    } catch (err) {
      console.error(err);
    }
  };

  if (isAuthenticated) {
      console.log('is authenticated')
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <div>
      {error && <div>An error occurred: {error.message}</div>}
      <button onClick={handleSignOn}>Sign On with Google</button>
    </div>
  );
};

export default SimpleSignOn;
