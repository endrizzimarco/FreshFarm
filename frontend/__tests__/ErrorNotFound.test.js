import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ErrorNotFound from '../src/pages/ErrorNotFound.vue'

installQuasarPlugin()

describe('ErrorNotFound', () => {
  it('renders the 404 message', () => {
    const wrapper = mount(ErrorNotFound)
    expect(wrapper.find('div').text()).toContain('404')
    expect(wrapper.find('.text-h2').text()).toContain('Oops. Nothing here...')
  })

  it('has a Go Home button', () => {
    const wrapper = mount(ErrorNotFound)
    expect(wrapper.find('.q-btn').exists()).toBe(true)
    expect(wrapper.find('.q-btn').text()).toBe('Go Home')
  })
})
