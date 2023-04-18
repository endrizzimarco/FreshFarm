import { mount } from '@vue/test-utils'
import TotalCard from '../src/components/TotalCard.vue'

describe('TotalCard', () => {
  test('renders the component with props', () => {
    const wrapper = mount(TotalCard, {
      props: {
        color: 'blue',
        icon: 'fas fa-leaf',
        value: 10,
        text: 'Lorem ipsum'
      }
    })
    expect(wrapper.find('.row.text-2xl').text()).toBe('10')
    expect(wrapper.find('.row.text-gray-400.font-normal').text()).toBe('Lorem ipsum')
    expect(wrapper.find('.rounded-full').classes()).toContain('bg-blue-200', 'text-blue-600')
    expect(wrapper.find('.q-icon').attributes('name')).toBe('fas fa-leaf')
  })
})
