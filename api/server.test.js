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
  test('accurate message for failed register with duplicate username', async () => {
    const result = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Beth', password: '1234' })
    expect(result.body.message).toMatch(/username taken/i)
  })
})

describe('[POST] /login', () => {
  test('accurate message for successful login', async () => {
    const result = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Beth', password: '1234' })
    expect(result.body.message).toMatch(/welcome, Beth/i)
  })
  test('accurate message for failed login with wrong password', async () => {
    const result = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Beth', password: 'abcd' })
    expect(result.body.message).toMatch(/invalid credentials/i)
  })
})

describe('[GET] /jokes', () => {
  test('accurate status for successful request', async () => {
    let result = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Bob', password: '5678' })
    result = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Bob', password: '5678' })
    result = await request(server)
      .get('/api/jokes')
      .set('Authorization', result.body.token)
    expect(result.status).toBe(200)
  })
  test('accurate message for failed request', async () => {
    let result = await request(server)
      .get('/api/jokes')
    expect(result.body.message).toMatch(/token required/i)
  })
})
