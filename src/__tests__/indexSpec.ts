import supertest from 'supertest'
import app from '../app'

const request = supertest(app)

describe('Test Server Status', function () {
  it('Should return 200 status code on /api', async function () {
    const response = await request.get('/api')
    expect(response.status).toBe(200)
  })
  it('should return 404 for unknown route', async function () {
    const response = await request.get('/fadl')
    expect(response.status).toBe(404)
  })
})
