const getOfferIcon = offerType => {
  switch (offerType) {
    case 'Dairy':
      return 'https://img.icons8.com/plasticine/100/null/milk-bottle.png'
    case 'Eggs':
      return 'https://img.icons8.com/plasticine/100/null/eggs.png'
    case 'Meat':
      return 'https://img.icons8.com/plasticine/100/null/steak-rare.png'
    case 'Grain':
      return 'https://img.icons8.com/plasticine/100/null/wheat.png'
    case 'Fruit':
      return 'https://img.icons8.com/plasticine/100/null/strawberry.png'
    case 'Veggies':
      return 'https://img.icons8.com/plasticine/100/null/carrot.png'
    case 'Other':
      return 'https://img.icons8.com/plasticine/100/null/paper-bag-with-seeds.png'
  }
}

export { getOfferIcon }
