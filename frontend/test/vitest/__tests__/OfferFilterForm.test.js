import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OfferFilterForm from '../../../src/components/OfferFilterForm.vue'
import { useUserStore } from '../../../src/stores/user-functions'

installQuasarPlugin()

describe('OfferFilterForm', () => {
  it('should update the filterData object when the maxRadius field is changed', async () => {
    const wrapper = mount(OfferFilterForm)
    const radiusSlider = wrapper.findComponent({ name: 'QSlider' })

    // Set the slider value to 5
    await radiusSlider.setValue(5)

    // Check if filterData object is updated
    expect(wrapper.vm.filterData.maxRadius).toEqual(5)
  })
})
