import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ErrorNotFound from './demo/ErrorNotFound.vue'
import { createPinia } from 'pinia'

installQuasarPlugin()

const pinia = createPinia()
pinia._testing = false

describe('OfferForm', () => {
  it('renders the form fields correctly', async () => {
    const wrapper = mount(OfferForm, {
      // global: {
      //   plugins: [pinia],
      //   stubs: ['q-card-section', 'q-chip', 'q-input', 'q-icon', 'q-spinner-pie', 'q-form']
      // }
    })

    const titleField = wrapper.find('input[type="text"]')
    expect(titleField.exists()).toBe(true)

    const priceField = wrapper.find('input[type="number"]')
    expect(priceField.exists()).toBe(true)

    const locationField = wrapper.find('input[type="search"]')
    expect(locationField.exists()).toBe(true)

    const typeFields = wrapper.findAll('.row.q-pb-md.justify-around div.text-center')
    expect(typeFields.length).toBe(7)

    const detailsField = wrapper.find('textarea')
    expect(detailsField.exists()).toBe(true)
  })

  it('validates required fields before submitting', async () => {
    // const wrapper = mount(OfferForm, {
    //   global: {
    //     plugins: [pinia],
    //     stubs: ['q-card-section', 'q-chip', 'q-input', 'q-icon', 'q-spinner-pie', 'q-form']
    //   }
    // })

    // Simulate a submit without filling out any fields
    await wrapper.find('.q-chip').trigger('click')

    // Check that validation messages appear for each required field
    const messages = wrapper.findAll('.q-field__messages')
    expect(messages.length).toBe(3)
    expect(messages[0].text()).toContain('Please insert a name for the offer.')
    expect(messages[1].text()).toContain('Please insert a price for the offer.')
    expect(messages[2].text()).toContain('Please select a location for pickup.')
  })
})
