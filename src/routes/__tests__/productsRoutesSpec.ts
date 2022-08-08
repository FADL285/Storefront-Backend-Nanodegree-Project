import supertest from 'supertest'
import app from '../../app'
import db from '../../database'
import { ProductModel } from '../../models/product.model'
import { IProduct } from '../../interfaces/product.interface'
import { IUser } from '../../interfaces/user.interface'
import { UserModel } from '../../models/user.model'

const request = supertest(app)
let authToken = ''

describe('Product Routes Endpoint Testing', function () {
  const product: IProduct = {
    name: 'Test Product',
    price: 55,
    category: 'TestCat'
  }

  const user: IUser = {
    email: 'fadl@admin.com',
    username: 'fadl285',
    firstname: 'Mohamed',
    lastname: 'Fadl',
    password: 'my_secret_pass'
  }

  beforeAll(async () => {
    // Create Product
    const createdProduct = await ProductModel.create(product)
    product.id = createdProduct.id
    product.category = createdProduct.category
    await UserModel.create(user)
  })
  afterAll(async () => {
    //    1. Open Connection with database
    const conn = await db.connect()
    //    2. Run Delete Query
    const pq = `DELETE
                    FROM products
                    WHERE true`
    const uq = `DELETE
                    FROM users
                    WHERE true`
    await conn.query(pq)
    await conn.query(uq)
    //    3. Close Connection with database
    conn.release()
  })

  describe('Authentication Endpoint - generate auth token to use', function () {
    it('should be able to authenticate and return the token', async function () {
      const response = await request
        .post('/api/users/authenticate')
        .set('Content-Type', 'application/json')
        .send({ email: user.email, password: user.password })
      expect(response.status).toBe(200)
      const { email, token } = response.body.data
      expect(email).toBe(user.email)
      expect(token).toBeDefined()
      authToken = token
    })
  })

  describe('Product Routes CRUD Endpoints', function () {
    it('create -> should create a new product & return it', async function () {
      const response = await request
        .post('/api/products')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Product 2',
          price: 99.99,
          category: 'accessories'
        } as IProduct)
      expect(response.status).toBe(201)
      const { category } = response.body.data
      expect(category).toBe('accessories')
    })
    it('create -> should return an error 400 status code when NOT product properties are set', async function () {
      const response = await request
        .post('/api/products')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Product 2',
          category: 'accessories'
        } as IProduct)
      expect(response.status).toBe(400)
    })
    it('create -> should return 401 unauthorized when NO valid token is provided', async function () {
      const response = await request
        .post('/api/products')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Test Product 2',
          price: 99.99,
          category: 'accessories'
        } as IProduct)
      expect(response.status).toBe(401)
    })

    it('fetchAll -> should return array of all products', async function () {
      const response = await request
        .get('/api/products')
        .set('Content-Type', 'application/json')

      expect(response.status).toBe(200)
      expect(response.body.data.length).toBe(2)
    })

    it('fetchByCategory -> should return array of accessories category products', async function () {
      const response = await request
        .get('/api/products/categories/accessories')
        .set('Content-Type', 'application/json')

      expect(response.status).toBe(200)
      expect(response.body.data.length).toBe(1)
    })

    it('fetchById -> should return product data if already exists', async function () {
      console.log(product.id)
      const response = await request
        .get(`/api/products/${product.id}`)
        .set('Content-Type', 'application/json')
      expect(response.status).toBe(200)
      expect(response.body.data.name).toBe(product.name)
    })
    it('fetchById -> should return 404 status code if id is valid but user does not exist', async function () {
      const response = await request
        .get(`/api/products/9cf6e4e5-8508-4a6a-97e2-cb318201db0a`)
        .set('Content-Type', 'application/json')
      expect(response.status).toBe(404)
    })
    it('fetchById -> should 400 status code if id is invalid', async function () {
      const response = await request
        .get(`/api/products/cb318201db0a`)
        .set('Content-Type', 'application/json')
      expect(response.status).toBe(400)
    })

    it('update -> should update product and return it', async function () {
      const response = await request
        .patch(`/api/products/${product.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Product Name',
          category: 'accessories'
        } as IProduct)
      expect(response.status).toBe(200)
      const { category, price } = response.body.data
      expect(category).toBe('accessories')
      expect(parseFloat(price)).toBe(product.price)
    })

    it('delete -> should return 401 unauthorized when no valid token is provided', async function () {
      const response = await request
        .delete(`/api/products/${product.id}`)
        .set('Content-Type', 'application/json')

      expect(response.status).toBe(401)
    })
    it('delete -> should delete product and return it', async function () {
      const response = await request
        .delete(`/api/products/${product.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`)

      expect(response.status).toBe(200)
      expect(response.body.data.category).toBe('accessories')
    })
  })
})
