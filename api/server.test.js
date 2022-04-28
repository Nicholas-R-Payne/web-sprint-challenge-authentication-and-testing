const request = require('supertest')
const db = require('../data/dbConfig')

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test('make sure environment is set correctly', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /register', () => {
  test('accurate response for successful register', () => {

  })
  test('accurate response for failed register', () => {
    
  })
})

describe('[POST] /login', () => {
  test('accurate response for successful login', () => {

  })
  test('accurate response for failed login', () => {
    
  })
})

describe('[GET] /jokes', () => {
  test('accurate response for successful request', () => {

  })
  test('accurate response for failed request', () => {
    
  })
})
