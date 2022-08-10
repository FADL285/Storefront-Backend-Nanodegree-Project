import { OrderModel } from '../order.model'
// import db from '../../database'
// import { IOrder } from '../../interfaces/order.interface'

describe('Order Model -- CRUD Operations', function () {
  describe('CRUD Methods Definitions', function () {
    it('index method should be exist --> to Fetch All Orders', function () {
      expect(OrderModel.index).toBeDefined()
    })
    it('show method should be exist --> to Fetch Order by ID', function () {
      expect(OrderModel.show).toBeDefined()
    })
    it('create method should be exist --> to Create a Order', function () {
      expect(OrderModel.create).toBeDefined()
    })
    it('edit method should be exist --> to Edit a Order', function () {
      expect(OrderModel.edit).toBeDefined()
    })
  })
})
