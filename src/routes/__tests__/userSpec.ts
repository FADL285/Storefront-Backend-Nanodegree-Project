import supertest from 'supertest'
import app from '../../app'
import { UserModel } from '../../models/user.model'
import db from '../../database'
import { IUser } from '../../interfaces/user.interface'

const request = supertest(app)
let authToken = ''

describe('User Routes Endpoint Testing', function () {
  const user: IUser = {
    email: 'fadl@admin.com',
    username: 'fadl285',
    firstname: 'Mohamed',
    lastname: 'Fadl',
    password: 'my_secret_pass'
  }

  beforeAll(async () => {
    const createdUser = await UserModel.create(user)
    user.id = createdUser.id
  })

  afterAll(async () => {
    //    1. Open Connection with database
    const conn = await db.connect()
    //    2. Run the queries
    const q = `DELETE
                   FROM users
                   WHERE true`
    await conn.query(q)
    //    3. Close the connection
    conn.release()
  })

  describe('Authentication Endpoint', function () {
    it('should be able to authenticate with valid credentials and return the token', async function () {
      const response = await request
        .post('/api/users/authenticate')
        .set('Content-Type', 'application/json')
        .send({ email: user.email, password: user.password })
      expect(response.status).toBe(200)
      const { id, email, token } = response.body.data
      expect(id).toBe(user.id)
      expect(email).toBe(user.email)
      expect(token).toBeDefined()
      authToken = token
    })
    it('should be failed to authenticate with invalid credentials ', async function () {
      const response = await request
        .post('/api/users/authenticate')
        .set('Content-Type', 'application/json')
        .send({ email: user.email, password: 'my_fake_pass' })
      expect(response.status).toBe(401)
    })
  })
})
