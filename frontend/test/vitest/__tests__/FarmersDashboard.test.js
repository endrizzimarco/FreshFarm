import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FarmersDashboard from './demo/FarmersDashboard.vue'

installQuasarPlugin()

describe('FarmersDashboard', () => {
  it('renders without errors', async () => {
    // Mount the component with a mocked MSAL instance
    const msalInstance = {
      handleRedirectPromise: jest.fn(() => Promise.resolve()),
      getAllAccounts: jest.fn(() => []),
      loginPopup: jest.fn(() => Promise.resolve()),
      logoutPopup: jest.fn(() => Promise.resolve())
    }
    const wrapper = mount(FarmersDashboard, {
      global: {
        mocks: {
          $msal: msalInstance
        }
      }
    })

    // Wait for the component to finish loading data
    await wrapper.vm.$nextTick()

    // Assert that the component rendered without errors
    expect(wrapper.exists()).toBe(true)
  })
})
