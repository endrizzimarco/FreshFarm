// Boot file that runs before the app is created
import * as msal from '@azure/msal-browser'

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    knownAuthorities: [import.meta.env.VITE_MSAL_KNOWN_AUTHORITY],
    authority: import.meta.env.VITE_MSAL_LOGIN_AUTHORITY
  }
}

// let msalInstance = new msal.PublicClientApplication(msalConfig)

// export { msalInstance }
