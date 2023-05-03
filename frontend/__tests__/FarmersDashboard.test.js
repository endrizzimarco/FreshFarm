import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import FarmersDashboard from '../src/pages/FarmersDashboard.vue'
import { createTestingPinia } from '@pinia/testing'
import { useFarmerStore } from 'src/stores/farmer-functions'

installQuasarPlugin()

describe('FarmersDashboard', () => {
  it('renders without errors', async () => {
    const wrapper = mount(FarmersDashboard, {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
          initialState: {
            dashboardData: {
              revenue_by_type: {
                test: 0
              }
            }
          }
        })
      ]
    })

    // Wait for the component to finish loading data
    await wrapper.vm.$nextTick()

    // Assert that the component rendered without errors
    expect(wrapper.exists()).toBe(true)
  })
})
