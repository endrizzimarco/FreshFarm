import { defineStore, acceptHMRUpdate } from 'pinia'
import { msalInstance } from 'src/boot/msal'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    userID: null,
    username: null
  }),

  actions: {
    initAuth() {
      const accounts = msalInstance.getAllAccounts()
      this.isAuthenticated = accounts?.length > 0
      this.userID = accounts[0]?.localAccountId
      this.username = accounts[0]?.idTokenClaims?.given_name
    },

    async handleRedirectPromise() {
      await msalInstance.handleRedirectPromise()
    },

    async signIn() {
      try {
        const loginRequest = { scopes: [] }
        const loginResponse = await msalInstance.loginRedirect(loginRequest)
        this.isAuthenticated = !!loginResponse.account
      } catch (err) {
        // reset password flow
        if (err.errorMessage && err.errorMessage.indexOf('AADB2C90118') > -1) {
          try {
            const passwordResetResponse = await msalInstance.loginRedirect({
              authority: import.meta.env.VITE_MSAL_PASSWORD_RESET_AUTHORITY
            })
            this.isAuthenticated = !!passwordResetResponse.account
          } catch (passwordResetError) {
            console.error(passwordResetError)
          }
        } else {
          console.error(err)
          this.isAuthenticated = false
        }
      }
    },

    async signOut() {
      await msalInstance.logoutRedirect()
      this.isAuthenticated = false
    },

    async getToken() {
      try {
        const response = await msalInstance.acquireTokenSilent({
          scopes: [],
          account: msalInstance.getAllAccounts()[0]
        })
        return response.idToken
      } catch (error) {
        if (error.errorCode === 'no_account_error') {
          try {
            const response = await msalInstance.acquireTokenRedirect({
              scopes: [],
              account: msalInstance.getAllAccounts()[0]
            })
            this.isAuthenticated = true
            return response.idToken
          } catch (err) {
            console.error(err)
          }
        } else {
          console.error(error.errorCode)
        }
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
