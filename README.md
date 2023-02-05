This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# GBTI Labs

GBTI.io is a paid membership community that grants private repository access and limited support to its members. 

## Support Disclaimer

The purchase of the private repository access only grants access to the code and not to support services.

For support related inquiries, please refer to the GBTI Discord community where fellow users may be able to assist. Please be aware that support is not guaranteed and requests for help may take up to 48 hours for a reply. Depending on the complexity of the request, the user may be recommended to a third-party support vendor with hourly rates ranging from 80-120USD.

We do not provide refunds. Once a user has access to the code base, they will remain in access during the duration of their subscription. That includes access to the GBTI community, supplimental GBTI assets, and all updates to this and other GBTI assets.

## Asset Disclaimer

As of Feb 4, 2023, this app cannot search deeper than 2 levels inside the target folder. The asset also requires that the target folder be inside a shared Team folder. 

## Getting Started

First, download the contents of this repository into your local environment for testing and run the following inside the terminal

```bash
npm install
```

Next, lets create the config.json file that will power the application. 

# Google Drive API Configuration

The `config-example.json` file contains the necessary configuration details to connect to the Google Drive API. To set up the connection, you will need to replace the placeholder values in the JSON file with your own Google Drive API credentials and settings.

## Setting up the Google Drive API 
1. Go to the Google Developers Console at https://console.developers.google.com/
2. Create a new project or select an existing one
3. Go to the API Library, select Google Drive API and enable it for your project
4. Go to the Credentials section, select "Create credentials" and choose "OAuth client ID"
5. Choose "Web application" as the application type and fill out the required information.
6. Note the Client ID and Client Secret values, you will need to replace `"GOOGLE CLIENT ID HERE"` and `"GOOGLE CLIENT SECRET HERE"` in the `config-example.json` file with your own Client ID and Client Secret.
7. Add a Redirect URI, this is the URL where the user will be redirected after they grant/deny permission. This URL must point to the location where this app will be running and must end in `/login`. You will need to replace `"http://MYDOMAIN.COM/login"` in the `config-example.json` file with your own Redirect URI.
8. In the `config-example.json` file, leave `"https://www.googleapis.com/auth/drive"` as the scope. For more information about scopes, you can find the available scopes at https://developers.google.com/identity/protocols/googlescopes

## Setting up the Google Drive Directory
The `directory` section in the `config-example.json` file requires two values to be set: the ID of the team drive and the ID of the starting folder location.
1. Go to the Google Drive web interface and locate the team drive you want to use.
2. Click on the three dots (...) in the top right corner of the drive and choose "Drive settings".
3. Copy the Drive ID, you will need to replace `"TEAM DRIVE ID HERE"` in the `config-example.json` file with your own team drive ID.
4. Locate the folder you want to use as the starting folder location.
5. Click on the three dots (...) next to the folder and choose "Get link".
6. In the "Link to share" dialog, select "Copy link".
7. Extract the folder ID from the copied link, you will need to replace `"PARENT FOLDER ID HERE"` in the `config-example.json` file with your own folder ID.

## Customizing the Components
The `components` section in the `config-example.json` file contains cosmetic details that can be customized as desired. Replace the values in this section with your desired values.

## Final Step
Once you have replaced all the placeholder values in the `config-example.json` file with your own values, you can remove `-example` from the filename to enable the configuration file.

## Launch the dev server

If everything is setup correctly, you should be ready to launch the dev server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If all is well you should see your app in motion! 

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Release Notes

## Feb 4, 2023

The first verson of this asset has been produced.

### progress
* File search is limited to 2 levels
* Starting directory/folder must be hosted within a shared Team folder. 

## plans
* Write in settings for supporting non team folders
* investigate deep(er) nested searches. 

