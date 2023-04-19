import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AboutUs from './demo/AboutUs.vue'

installQuasarPlugin()

describe('AboutUs', () => {
  it('renders the Go Back button', () => {
    const wrapper = mount(AboutUs)
    const goBackButton = wrapper.find('.q-btn')
    expect(goBackButton.exists()).toBe(true)
    expect(goBackButton.text()).toBe('Back to map')
  })

  it('renders the About Us section', () => {
    const wrapper = mount(AboutUs)
    const aboutUsSection = wrapper.find('.centered p:nth-of-type(1)')
    expect(aboutUsSection.exists()).toBe(true)
    expect(aboutUsSection.text()).toContain('Welcome to FreshFarm')
  })

  it('renders the Privacy section', () => {
    const wrapper = mount(AboutUs)
    const privacySection = wrapper.find('.centered p:nth-of-type(2)')
    expect(privacySection.exists()).toBe(true)
    expect(privacySection.text()).toContain('At FreshFarm, we take your privacy seriously')
  })
})
