import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OfferFilterForm from '../../../src/components/OfferFilterForm.vue'
import { useUserStore } from '../../../src/stores/user-functions'

installQuasarPlugin()

describe('OfferFilterForm', () => {
  it('submits the form with the correct filter values', async () => {
    // Mock the user store's location data
    const userStore = { user_coords: { lat: 40.7128, lng: -74.006 } }

    // Mount the component
    const wrapper = mount(OfferFilterForm, {
      global: {
        mocks: {
          $store: {
            getters: {
              'user-functions/useUserStore': userStore
            }
            // methods: {
            //   clearFilters: jest.fn(),
            //   filterOn: jest.fn()
            // }
          }
        }
      }
    })

    // Fill out the form
    const maxPriceInput = wrapper.find('.q-input')
    maxPriceInput.setValue(3.5)

    const maxRadiusSlider = wrapper.find('.q-slider')
    await maxRadiusSlider.setValue(5)

    const typeIcons = wrapper.findAll('img')
    await typeIcons[2].trigger('click')

    // Submit the form
    const applyButton = wrapper.find('.q-btn.primary')
    await applyButton.trigger('click')

    // Check that the filters were applied correctly
    const store = useUserStore()
    expect(store.clearFilters).toHaveBeenCalled()
    expect(store.filterOn).toHaveBeenCalledWith({
      maxPrice: 3.5,
      maxRadius: 5,
      type: 'Meat',
      lat: userStore.user_coords.lat,
      lng: userStore.user_coords.lng
    })
  })
})
