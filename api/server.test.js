const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')
const Users = require('./users/users-model')

// Write your tests here
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

test('make sure environment is set correctly', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /register', () => {
  test('user in database after successful register', async () => {
    let result = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Beth', password: '1234' })
    result = await Users.findById(1)
    expect(result.username).toBe('Beth')
  })
  test('accurate response for failed register with duplicate username', async () => {
    const result = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Beth', password: '1234' })
    expect(result.body.message).toMatch(/username taken/i)
  })
})

describe('[POST] /login', () => {
  test('accurate response for successful login', async () => {
    let result = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Beth', password: '1234' })
    expect(result.body.message).toMatch(/welcome, Beth/i)
  })
  test('accurate response for failed login with wrong password', async () => {
    let result = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Beth', password: 'abcd' })
    expect(result.body.message).toMatch(/invalid credentials/i)
  })
})

describe('[GET] /jokes', () => {
  test('accurate response for successful request', () => {

  })
  test('accurate response for failed request', () => {
    
  })
})
