import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OfferDetails from '../../../src/components/OfferDetails.vue'

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
      }
    })

    expect(wrapper.text()).toContain('Organic Eggs')
    expect(wrapper.text()).toContain('Fresh organic eggs from free-range chickens')
    expect(wrapper.text()).toContain('£2.99')
    expect(wrapper.text()).toContain('Eggs')
  })

  it('sends directions when the directions button is clicked', () => {
    const wrapper = mount(OfferDetails, {
      props: {
        offer: offer
      }
    })

    const sendDirections = jest.fn()
    wrapper.vm.sendDirections = sendDirections

    const directionsButton = wrapper.find('.q-btn.primary')
    directionsButton.trigger('click')

    expect(sendDirections).toHaveBeenCalled()
  })

  it('emits the "submitted" event when the purchase is finalized', async () => {
    const wrapper = mount(OfferDetails, {
      props: {
        offer: offer
      }
    })

    const validateOrder = jest.fn().mockResolvedValue(true)
    const emit = jest.spyOn(wrapper.emitted(), 'submitted')
    wrapper.vm.validateOrder = validateOrder

    const finalizeButton = wrapper.find('.q-btn:not(.primary)')
    await finalizeButton.trigger('click')

    expect(validateOrder).toHaveBeenCalled()
    expect(emit).toHaveBeenCalled()
  })
})
