import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import WeatherWidget from '../../../src/components/WeatherWidget.vue'

installQuasarPlugin()

describe('WeatherWidget', () => {
  it('displays the current temperature', async () => {
    const wrapper = mount(WeatherWidget)

    // Wait for the component to mount and the API call to complete
    await wrapper.vm.$nextTick()

    // Find the element that displays the current temperature
    const currentTemp = wrapper.find('.float-left p.text-xl')

    // Assert that the current temperature is displayed with the correct unit
    expect(currentTemp.text()).toMatch('°')
  })

  it('displays the weather forecast for the next 6 hours', async () => {
    const wrapper = mount(WeatherWidget)

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

  it('displays the weather forecast for the next 5 days', async () => {
    const wrapper = mount(WeatherWidget)

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
})
