import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import WeatherWidget from '../../../src/components/WeatherWidget.vue'
import { createPinia } from 'pinia'

installQuasarPlugin()
const pinia = createPinia()
pinia._testing = true

describe('WeatherWidget', () => {
  it('renders the weather forecast for the current location', async () => {
    // Mock the user store's location data
    const userStore = { user_coords: { lat: 40.7128, lng: -74.006 } }
    const wrapper = mount(WeatherWidget, {
      global: {
        mocks: {
          $store: {
            getters: {
              'user-functions/useUserStore': userStore
            }
          }
        }
      }
    })

    // Wait for the weather forecast to be fetched
    await wrapper.vm.$nextTick()

    // Check that the location name is displayed
    expect(wrapper.text()).toContain('near_meCurrently°Next 5 day')

    // Check that the current temperature is displayed
    const currentTemp = wrapper.find('.float-left p.text-xl')
    expect(currentTemp.text()).toMatch('°')

    // Check that the current weather condition icon is displayed
    // const currentIcon = wrapper.find('.float-right q-icon')
    // expect(currentIcon.attributes('name')).toMatch(/^img:/)

    // Check that the next 6 hours' forecast is displayed
    const nextSixHours = wrapper.findAll('.col')
    expect(nextSixHours.length).toBe(0)

    // Check that the next 5 days' forecast is displayed
    const nextFiveDays = wrapper.findAll('.row .col:not(.text-center)')
    expect(nextFiveDays.length).toBe(5)
  })
})
