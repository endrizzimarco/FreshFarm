import { defineStore, acceptHMRUpdate } from 'pinia'
import { msalInstance } from 'src/boot/msal'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false
  }),

  actions: {
    initAuth() {
      const accounts = msalInstance.getAllAccounts()
      this.isAuthenticated = accounts?.length > 0
    },

    async signIn() {
      try {
        const loginRequest = { scopes: [] }
        const loginResponse = await msalInstance.loginPopup(loginRequest)
        this.isAuthenticated = !!loginResponse.account
      } catch (err) {
        // reset password flow
        if (err.errorMessage && err.errorMessage.indexOf('AADB2C90118') > -1) {
          try {
            const passwordResetResponse = await msalInstance.loginPopup({
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
      await msalInstance.logoutPopup()
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
            const response = await msalInstance.acquireTokenPopup({
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
