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

})

describe('[POST] /login', () => {
  
})

describe('[GET] /jokes', () => {
  
})
