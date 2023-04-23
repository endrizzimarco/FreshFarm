import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OfferDetails from '../../../src/components/OfferDetails.vue'
import { getChipColor } from '../../../src/boot/utils'

installQuasarPlugin()

describe('OfferDetails', () => {
  it('returns a valid color for a given offer type', () => {
    const colors = ['red', 'blue', 'green', 'orange', 'purple', 'brown']
    const types = ['fruits', 'vegetables', 'meat', 'dairy', 'bakery', 'other']
    types.forEach((type, index) => {
      expect(getChipColor(type)).toBe('grey')
    })
  })
})
