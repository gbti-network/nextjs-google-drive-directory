# NextJs Google Drive Directory

## INTRODUCTION

This is a NextJS React app that provides users a way to access contents of a Google Drive directory through a single page application.

This novel app eliminates the need for users to search through unrelated Google Drive directories, files, and shared folders, reducing clutter in search results.

The app can be hosted for free on platforms such as [Vercel](https://vercel.com/new) and is secured through a secure Google Simple Sign-on process.

## INSTALLATION

First, download the contents of this repository into your local environment for testing and run the following inside the terminal

```bash
npm install
```

Next, lets create the config.json file that will power the application.

## CONFIGURATION

The `config-example.json` file contains the necessary configuration details to connect to the Google Drive API. To set up the connection, you will need to replace the placeholder values in the JSON file with your own Google Drive API credentials and settings.

At the time this readme is written, `config-example.json` looks something like this:

```
{
    "api" : {
        "client_id" : "GOOGLE CLIENT ID HERE",
        "client_secret" : "GOOGLE CLIENT SECRET HERE",
        "scopes" : "https://www.googleapis.com/auth/drive.metadata.readonly"
    },
    "directory" : {    
        "team_drive" : "TEAM DRIVE ID HERE",
        "target_folder" : "PARENT FOLDER ID HERE"
    },
    "components" : {
        "HeaderImage" : {
            "homepage_url" : "http://MYDOMAIN.COM",
            "logo_url" : "https://LINKTOLOGO.png",
            "logo_alt" : "MY CUSTOM GOOGLE DRIVE DIRECTORY",
            "logo_width" : "300px",
            "logo_color" : "#5b777d"
        }
    }
}
```

### Setting up the Google Drive API

1. **Access the Google Developers Console:**
    - Navigate to the Google Developers Console at [https://console.developers.google.com/](https://console.developers.google.com/).

2. **Create or Select a Project:**
    - Create a new project or select an existing one from your project list.

3. **Enable the Google Drive API:**
    - Go to the API Library, search for "Google Drive API," and enable it for your project.

4. **Create OAuth Credentials:**
    - Go to the "Credentials" section.
    - Click on "Create credentials" and choose "OAuth client ID."

5. **Set Up OAuth Consent Screen:**
    - Choose "Web application" as the application type.
    - Fill out the required information for the OAuth consent screen.

6. **Configure Authorized JavaScript Origins:**
    - In the OAuth Client ID edit area within the Credentials section, add your `Authorized JavaScript origins`.
        - For local testing, use: `http://localhost:3000`
        - For production, use: `http://MYDOMAIN.COM` (replace with your actual domain).

7. **Obtain Client ID and Client Secret:**
    - After creating the OAuth client ID, note the Client ID and Client Secret values.
    - Replace `"GOOGLE CLIENT ID HERE"` and `"GOOGLE CLIENT SECRET HERE"` in the `config-example.json` file with your own Client ID and Client Secret.

8. **Set Up Authorized Redirect URIs:**
    - In the same OAuth Client ID edit area, configure your `Authorized redirect URIs`.
        - For local testing, use: `http://localhost:3000/login`
        - For production, use: `http://MYDOMAIN.COM/login` (replace with your actual login URL).

9. **Set Up Test Users (Since the App is Not Published):**
    - Go to the "OAuth consent screen" section in the Google Developers Console.
    - Scroll down to the "Test users" section.
    - Click "Add users" and enter the email addresses of users who will be testing your app.
    - These users will now be able to access your application using OAuth, even though the app is not published.

10. **Update `config-example.json`:**
    - In the `config-example.json` file, leave `"https://www.googleapis.com/auth/drive.metadata.readonly"` as the scope.
    - For more information about scopes, refer to the available scopes at [Google Identity Protocols](https://developers.google.com/identity/protocols/googlescopes).

### Customizing the Components
The `components` section in the `config-example.json` file contains cosmetic details that can be customized as desired. Replace the values in this section with your desired values.

### Final Step
Once you have replaced all the placeholder values in the `config-example.json` file with your own values, you can remove `-example` from the filename to enable the configuration file.

Once you are done your `config.json` file should look something like this:

```config.json
{
    "api" : {
        "client_id" : "590454986992-o6uaho5dtgtgyhdss7nqccrr6e.apps.googleusercontent.com",
        "client_secret" : "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",
        "scopes" : "https://www.googleapis.com/auth/drive.metadata.readonly"
    },
    "directory" : {    
        "team_drive" : "0AIDUUK1SmUbSPdU7EA",
        "target_folder" : "1ePFd-ssH4ja1-7_x6tNgd-5CT9HbsAIb"
    },
    "components" : {
        "HeaderImage" : {
            "homepage_url" : "http://localhost:3000/",
            "logo_url" : "https://logovtor.com/wp-content/uploads/2021/06/some-logo-vector.png",
            "logo_alt" : "My Logo",
            "logo_width" : "300px",
            "logo_color" : "#5b777d"
        }
    }
}
```

### Launch the dev server

If everything is setup correctly, you should be ready to launch the dev server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If all is well you should see your app in motion!

## DEPLOYMENT

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Support Videos

* [Introduction - NextJS Google Drive Directory](https://www.youtube.com/watch?v=t_pQ1xy7cTo)
* [Installation Tutorial - Localhost - NextJS Google Drive Directory](https://www.youtube.com/watch?v=Fsatd2HkBxk)
* [Installation Tutorial - Deploying to Vercel](https://www.youtube.com/watch?v=fy0WG4J9jPA)


## Support our work / Join the GBTI network!

Support the GBTI network by becoming a member of our private community.

[Become a supporter and join the GBTI Community](https://gbti.io)


