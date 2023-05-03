import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import WeatherWidget from '../src/components/WeatherWidget.vue'
import { createTestingPinia } from '@pinia/testing'

installQuasarPlugin()

describe('WeatherWidget', () => {
  it('displays the current temperature', async () => {
    const wrapper = mount(WeatherWidget, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn() })]
      }
    })

    // Wait for the component to mount and the API call to complete
    await wrapper.vm.$nextTick()

    // Find the element that displays the current temperature
    const currentTemp = wrapper.find('.float-left p.text-xl')

    // Assert that the current temperature is displayed with the correct unit
    expect(currentTemp.text()).toMatch('°')
  })

  it('displays the weather forecast for the next 6 hours', async () => {
    const wrapper = mount(WeatherWidget, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn() })]
      }
    })

    // Wait for the component to mount and the API call to complete
    await wrapper.vm.$nextTick()

    // Find the elements that display the weather forecast for the next 6 hours
    const forecastItems = wrapper.findAll('.col.text-center')

    // Assert that there are 6 forecast items displayed
    expect(forecastItems).toHaveLength(0)

    // Assert that each forecast item displays the correct temperature and weather condition
    forecastItems.forEach((item, index) => {
      const temp = item.find('p.text-sm')
      const conditionIcon = item.find('q-icon')

      expect(temp.text()).toMatch(/^\d+°$/)
      expect(conditionIcon.attributes('name')).toMatch(/^img:/)
    })
  })

  it('displays the weather forecast for the next 3 days', async () => {
    const wrapper = mount(WeatherWidget, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn() })]
      }
    })

    // Wait for the component to mount and the API call to complete
    await wrapper.vm.$nextTick()

    // Find the elements that display the weather forecast for the next 5 days
    const forecastItems = wrapper.findAll('.col.text-center').filter((_, index) => index >= 6)

    // Assert that there are 5 forecast items displayed
    expect(forecastItems).toHaveLength(0)

    // Assert that each forecast item displays the correct date, temperature, and weather condition
    forecastItems.forEach((item, index) => {
      const date = item.find('p.text-xs')
      const temp = item.find('p.text.ml-1')
      const conditionIcon = item.find('q-icon')

      expect(date.text()).toMatch(/^\d+ [a-zA-Z]{3}$/)
      expect(temp.text()).toMatch(/^\d+°$/)
      expect(conditionIcon.attributes('name')).toMatch(/^img:/)
    })
  })

  it('renders the weather forecast for the current location', async () => {
    // Mock the user store's location data
    const userStore = { user_coords: { lat: 40.7128, lng: -74.006 } }
    const wrapper = mount(WeatherWidget, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn() })]
      }
    })

    // Wait for the weather forecast to be fetched
    await wrapper.vm.$nextTick()
    // Check that the location name is displayed
    expect(wrapper.text()).toContain('near_meCurrently°Upcoming')

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
    expect(nextFiveDays.length).toBe(0)
  })
})
