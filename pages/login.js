import React, { useState ,useEffect } from 'react';
import Router from 'next/router'
import axios from 'axios';


var config = require('../config.json');

const handleRedirect = async (code , currentURL = "") => {

    const redirectUri = currentURL.replace(/\/login.*/, "/login");

    try {
      console.log(currentURL)
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            code: code,
            client_id: config.api.client_id,
            client_secret: config.api.client_secret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
        });

        //console.log('response')
        //console.log(response.data)

        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;

        localStorage.setItem('code', code);
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        Router.push('/')
    } catch (err) {
        alert(err);
    }
};


const Page = ({ code }) => {
  
  var config = require('../config.json');
  const [currentURL, setCurrentURL] = useState(null);

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, [])

  useEffect(() => {
    if (currentURL) {
      handleRedirect(code , currentURL)
    }
  }, [currentURL])

  return <div>Redirecting...</div>
}

Page.getInitialProps = async ({ query }) => {
  return { code: query.code }
}

export default Page
