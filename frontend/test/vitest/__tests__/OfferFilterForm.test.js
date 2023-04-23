import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OfferFilterForm from '../../../src/components/OfferFilterForm.vue'
import { useUserStore } from '../../../src/stores/user-functions'

installQuasarPlugin()

describe('OfferFilterForm', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })
})
