describe('string manipulation', () => {
  test('concatenates two strings', () => {
    const str1 = 'hello'
    const str2 = 'world'
    expect(str1 + ' ' + str2).toBe('hello world')
  })

  test('returns the length of a string', () => {
    const str = 'hello'
    expect(str.length).toBe(5)
  })

  test('converts a string to uppercase', () => {
    const str = 'hello'
    expect(str.toUpperCase()).toBe('HELLO')
  })
})
