import TotalCard from './TotalCard.vue'

describe('<TotalCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(TotalCard)
  })
})