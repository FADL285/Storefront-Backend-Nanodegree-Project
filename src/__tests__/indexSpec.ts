import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('Test Basic Server', function () {
  it('Get the / endpoint', async function () {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})
