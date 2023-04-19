import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import IndexPage from '../../../src/pages/IndexPage.vue'

installQuasarPlugin()

describe('IndexPage', () => {
  it('renders correctly', () => {
    const wrapper = mount(IndexPage)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('displays a map', () => {
    const wrapper = mount(IndexPage)
    expect(wrapper.find('#map')).toBeTruthy()
  })

  it('filters offers when the filter button is clicked', async () => {
    const wrapper = mount(IndexPage)
    const filterButton = wrapper.find('.filter-button')
    await filterButton.trigger('click')
    expect(wrapper.vm.filtering).toBe(true)
  })

  it('displays the offer details when a marker popup is clicked', async () => {
    const wrapper = mount(IndexPage)
    const marker = wrapper.findAll('.mapboxgl-marker').at(0)
    await marker.trigger('click')
    expect(wrapper.vm.showOffer).toBe(true)
  })
})
