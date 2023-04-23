import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OfferForm from '../../../src/components/OfferForm.vue'
import * as msal from '@azure/msal-browser'
import 'webcrypto-shim'

installQuasarPlugin()

describe('OfferForm', () => {
  it('validates that offer title is not empty', async () => {
    const wrapper = mount(OfferForm)
    const titleField = wrapper.find('input[type="text"]')

    // Set title to an empty string
    await titleField.setValue('')
    await wrapper.find('.q-chip .q-icon').trigger('click')

    // Check if validation error message appears
    expect(wrapper.find('.q-field__messages').text()).toContain('Please insert a name for the offer.')
  })
})
