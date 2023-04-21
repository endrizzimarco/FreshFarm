import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import OfferForm from '../../../src/components/OfferForm.vue'
import { createPinia } from 'pinia'

installQuasarPlugin()

const pinia = createPinia()
pinia._testing = false

const mapboxsearch = {
  autofill: vi.fn()
}

describe('OfferForm', () => {
  it('renders the form fields correctly', async () => {
    vi.stubGlobal('mapboxsearch', mapboxsearch)

    const wrapper = mount(OfferForm)

    const titleField = wrapper.find('input[type="text"]')
    console.log(titleField.html())
    expect(titleField.exists()).toBe(true)

    const priceField = wrapper.find('input[type="number"]')
    expect(priceField.exists()).toBe(true)

    const locationField = wrapper.find('input[aria-label="Search addresses"]')
    expect(locationField.exists()).toBe(true)

    const typeFields = wrapper.findAll('.row.q-pb-md.justify-around div.text-center')
    expect(typeFields.length).toBe(7)

    const detailsField = wrapper.find('textarea')
    expect(detailsField.exists()).toBe(true)
  })

  it('validates required fields before submitting', async () => {
    const wrapper = mount(OfferForm)

    // Simulate a submit without filling out any fields
    await wrapper.find('.q-chip').trigger('click')

    // Check that validation messages appear for each required field
    const messages = wrapper.findAll('.q-field__messages')
    expect(messages.length).toBe(4)
    expect(messages[0].text()).toContain('Please insert a name for the offer.')
    expect(messages[1].text()).toContain('Please insert a price for the offer.')
    expect(messages[2].text()).toContain('Please select a location for pickup.')
    expect(messages[3].text()).toContain('Please enter a description for the offer.')
  })
})
