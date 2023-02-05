import React, { useState } from 'react';
import Router from 'next/router'
import axios from 'axios';

var config = require('../config.json');

const handleRedirect = async (code) => {
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            code: code,
            client_id: config.client_id,
            client_secret: config.client_secret,
            redirect_uri: config.redirect_uri,
            grant_type: 'authorization_code',
        });

        console.log('response')
        console.log(response.data)

        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;

        localStorage.setItem('config', config);
        localStorage.setItem('code', code);
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        Router.push('/')
    } catch (err) {
        alert(err);
    }
};


const Page = ({ code }) => {
  React.useEffect(() => {
    handleRedirect(code)
  }, [])

  return <div>Redirecting...</div>
}

Page.getInitialProps = async ({ query }) => {
  return { code: query.code }
}

export default Page