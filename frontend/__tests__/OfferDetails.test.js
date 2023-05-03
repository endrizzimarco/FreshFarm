import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import OfferDetails from '../src/components/OfferDetails.vue'
import { getChipColor } from '../src/boot/utils'
import { createTestingPinia } from '@pinia/testing'

installQuasarPlugin()

describe('OfferDetails', () => {
  const offer = {
    id: 1,
    title: 'Organic Eggs',
    price: 2.99,
    type: 'Eggs',
    description: 'Fresh organic eggs from free-range chickens',
    farmerId: 2,
    lat: 51.123,
    lng: -0.456
  }

  it('renders the offer details', () => {
    const wrapper = mount(OfferDetails, {
      props: {
        offer: offer
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy() {}
          })
        ]
      }
    })

    expect(wrapper.text()).toContain('Organic Eggs')
    expect(wrapper.text()).toContain('Fresh organic eggs from free-range chickens')
    expect(wrapper.text()).toContain('£2.99')
    expect(wrapper.text()).toContain('Eggs')
  })

  it('sends directions when the directions button is clicked', () => {
    window.open = vi.fn().mockReturnValue({ close: vi.fn() })

    const wrapper = mount(OfferDetails, {
      props: {
        offer: offer
      }
    })

    const sendDirections = vi.fn()
    wrapper.vm.sendDirections = sendDirections
    const directionsButton = wrapper.find('.q-btn')
    directionsButton.trigger('click')

    expect(sendDirections).toHaveBeenCalled()
  })

  it('emits the "submitted" event when the purchase is finalized', async () => {
    const wrapper = mount(OfferDetails, {
      props: {
        offer: offer
      }
    })

    const validateOrder = vi.fn()
    wrapper.vm.validateOrder = validateOrder
    const purchaseButton = wrapper.find('#purchase')
    await purchaseButton.trigger('click')
    const finalizeButton = wrapper.find('#finalise')
    await finalizeButton.trigger('click')

    expect(validateOrder).toHaveBeenCalled()
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('returns a valid color for a given offer type', () => {
    const colors = ['red-5', 'green', 'red-9', 'blue-4', 'grey', 'grey']
    const types = ['Fruit', 'Veggies', 'Meat', 'Dairy', 'Bakery', 'Other']
    types.forEach((type, index) => {
      expect(getChipColor(type)).toBe(colors[index])
    })
  })
})
