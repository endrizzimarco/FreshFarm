import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import FarmersDashboard from '../../../src/pages/FarmersDashboard.vue'
import { createTestingPinia } from '@pinia/testing'

installQuasarPlugin()

describe('FarmersDashboard', () => {
  it('renders without errors', async () => {
    // Mount the component with a mocked MSAL instance
    const msalInstance = {
      handleRedirectPromise: vi.fn(() => Promise.resolve()),
      getAllAccounts: vi.fn(() => []),
      loginPopup: vi.fn(() => Promise.resolve()),
      logoutPopup: vi.fn(() => Promise.resolve())
    }
    const wrapper = mount(FarmersDashboard, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy() {
              return () => {}
            }
          })
        ],
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
