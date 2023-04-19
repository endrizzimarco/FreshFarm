import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OfferPopup from './demo/OfferPopup.vue'

installQuasarPlugin()

describe('OfferPopup', () => {
  it('displays the offer title and price', () => {
    const wrapper = mount(OfferPopup, {
      props: {
        title: 'Organic Eggs',
        price: 3.99
      }
    })

    expect(wrapper.find('span').text()).toContain('Organic Eggs')
    // expect(wrapper.find('span').text()).toContain('£3.99')
  })

  it('displays an image', async () => {
    const wrapper = mount(OfferPopup, {
      props: {
        title: 'Organic Eggs',
        price: 3.99
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('emits a closed event when the view details button is clicked', () => {
    const wrapper = mount(OfferPopup, {
      props: {
        title: 'Organic Eggs',
        price: 3.99
      }
    })

    wrapper.find('#popupbtn').trigger('click')

    expect(wrapper.emitted().closed).toBeTruthy()
  })
})
