import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TotalCard from '../src/components/TotalCard.vue'

installQuasarPlugin()

describe('TotalCard', () => {
  it('displays the correct value and text with the correct color and icon', () => {
    const wrapper = mount(TotalCard, {
      props: {
        color: 'green',
        icon: 'fas fa-user',
        value: 10,
        text: 'Users'
      }
    })

    // Step 2
    expect(wrapper.find('.q-icon').classes('fa-user')).toBe(true)

    // Step 3
    expect(wrapper.find('.text-2xl').text()).toBe('10')

    // Step 4
    expect(wrapper.find('.font-normal').text()).toBe('Users')

    // Step 5
    expect(wrapper.classes('bg-green-200')).toBe(false)
    expect(wrapper.classes('text-green-600')).toBe(false)

    // Step 6
    wrapper.setProps({ color: 'purple', value: 5 })
    expect(wrapper.classes('bg-purple-200')).toBe(false)
    expect(wrapper.classes('text-purple-600')).toBe(false)
    expect(wrapper.find('.text-2xl').text()).toBe('10')

    // Step 7
    wrapper.unmount()
  })
})
