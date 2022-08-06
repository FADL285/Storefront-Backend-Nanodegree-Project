import supertest from 'supertest'
import app from '../app'

const request = supertest(app)

describe('Test Server Status', function () {
  it('Get the / endpoint', async function () {
    const response = await request.get('/api')
    expect(response.status).toBe(200)
  })
})
