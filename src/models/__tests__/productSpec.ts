import { ProductModel } from '../product.model'
import db from '../../database'
import { IProduct } from '../../interfaces/product.interface'

describe('Product Model -- CRUD Operations', function () {
  describe('CRUD Methods Definitions', function () {
    it('index method should be exist --> to Fetch All Products', function () {
      expect(ProductModel.index).toBeDefined()
    })
    it('show method should be exist --> to Fetch Product by ID', function () {
      expect(ProductModel.show).toBeDefined()
    })
    it('create method should be exist --> to Create a Product', function () {
      expect(ProductModel.create).toBeDefined()
    })
    it('edit method should be exist --> to Edit a Product', function () {
      expect(ProductModel.edit).toBeDefined()
    })
    it('delete method should be exist --> to Delete a Product', function () {
      expect(ProductModel.delete).toBeDefined()
    })
    it('getProductsByCategory method should be exist --> to Fetch All Products by Category', function () {
      expect(ProductModel.getProductsByCategory).toBeDefined()
    })
  })
  describe('CRUD methods Logic Testing', function () {
    const product: IProduct = {
      name: 'Test Product',
      price: 99.99,
      category: 'TestCat'
    }

    beforeAll(async () => {
      const createdProduct = await ProductModel.create(product)
      product.id = createdProduct.id
    })
    afterAll(async () => {
      //    1. Open Connection with database
      const conn = await db.connect()
      //    2. Run Delete Query
      const q = `DELETE FROM products WHERE true`
      await conn.query(q)
      //    3. Close Connection
      conn.release()
    })

    it('create method should create a new Product if all fields are set', async function () {
      const createdProduct = await ProductModel.create({
        name: 'Test Product #2',
        price: 149.99,
        category: 'OtherTestCat'
      })
      createdProduct.price = parseFloat(String(createdProduct.price))
      expect(createdProduct).toEqual({
        id: createdProduct.id,
        name: 'Test Product #2',
        price: 149.99,
        category: 'OtherTestCat'
      })
    })
    it('index method should return Array of All Products', async function () {
      const products = await ProductModel.index()
      expect(products.length).toBe(2)
    })
    it('show method should return a product if id is valid and product exists', async function () {
      const returnedProduct = await ProductModel.show(product.id as string)
      expect(returnedProduct.id).toEqual(product.id)
      expect(returnedProduct.name).toEqual(product.name)
    })
    it('show method should be rejected if product does not exist', async function () {
      const returnedProduct = ProductModel.show(
        '9cf6e4e5-8508-4a6a-97e2-cb318201db0a'
      )
      await expectAsync(returnedProduct).toBeRejected()
    })
    it('show method should be rejected if id was not uuid', async function () {
      const returnedProduct = ProductModel.show('cb2852000mfa')
      await expectAsync(returnedProduct).toBeRejected()
    })
    it('getProductsByCategory method should return Array of Products for specific category', async function () {
      const products = await ProductModel.getProductsByCategory(
        product.category
      )
      expect(products.length).toBe(1)
    })
    it('edit method should edit the product and return it if the product exists', async function () {
      const editedProduct = await ProductModel.edit({
        id: product.id,
        name: 'New Product Name',
        price: (product.price * 1.5).toFixed(2) as unknown as number
      })
      expect(editedProduct.name).toBe('New Product Name')
    })
    it('edit method should be rejected if the id was invalid', async function () {
      const editedProduct = ProductModel.edit({
        id: 'not-valid-id',
        name: 'New Product Name',
        price: product.price * 1.5
      })
      await expectAsync(editedProduct).toBeRejected()
    })
    it('delete method should delete the product and return it if the product exists', async function () {
      const deletedProduct = await ProductModel.delete(product.id as string)
      expect(deletedProduct.id).toBe(product.id)
      expect(deletedProduct.category).toBe(product.category)
    })
    it('delete method should be rejected if the product does not exist', async function () {
      const deletedProduct = ProductModel.delete(
        '9cf6e4e5-8508-4a6a-97e2-cb318201db0a'
      )
      await expectAsync(deletedProduct).toBeRejected()
    })
  })
})
