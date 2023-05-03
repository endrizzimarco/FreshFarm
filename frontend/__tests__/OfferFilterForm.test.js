import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import OfferFilterForm from '../src/components/OfferFilterForm.vue'

import { createTestingPinia } from '@pinia/testing'

installQuasarPlugin()

describe('OfferFilterForm', () => {
  it('submits the form with the correct filter values', async () => {
    // Mock the user store's location data
    const userStore = {
      activeFilters: { maxPrice: null, type: null, maxRadius: 5, lat: null, lng: null },
      user_coords: { lat: 40.7128, lng: -74.006 }
    }
    const store = createTestingPinia({
      createSpy: vi.fn,
      initialState: userStore
    })
    // Mount the component
    const wrapper = mount(OfferFilterForm, {
      plugins: [store]
    })

    wrapper.vm.userStore = userStore

    // Fill out the form
    const maxPriceInput = wrapper.find('.q-field__native')

    maxPriceInput.setValue(3.5)

    const maxRadiusSlider = wrapper.find('.q-slider')
    expect(maxRadiusSlider.wrapperElement._attributes['aria-valuemax'].value).toBe('10')
    expect(maxRadiusSlider.wrapperElement._attributes['aria-valuemin'].value).toBe('0.5')
    wrapper.vm.filterData.maxRadius = 5

    const typeIcons = wrapper.findAll('img')
    expect(typeIcons.length).toBe(7)
    await typeIcons[2].trigger('click')

    // Submit the form
    const applyButton = wrapper.find('#submitfilter')
    console.log(applyButton)
    await applyButton.trigger('click')

    // Check that the filters were applied correctly
    expect(store._s.get('userFunctions').filterOn).toHaveBeenCalledWith({
      maxPrice: 3.5,
      maxRadius: 5,
      type: 'Meat'
    })
  })
})
