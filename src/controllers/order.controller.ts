import { NextFunction, Request, Response } from 'express'
import { OrderModel } from '../models/order.model'
import { IOrder, OrderStatus } from '../interfaces/order.interface'
import { OrderProductModel } from '../models/order-product.model'

export const getAllOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.index()
    res.json({
      data: orders,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const getAllOrdersByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.getOrdersByStatus(
      req.params.status as OrderStatus
    )
    res.json({
      data: orders,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.getUserOrders(req.params.id)
    res.json({
      data: orders,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const getUserOrdersByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.getUserOrdersByStatus(
      req.params.id,
      req.params.status as OrderStatus
    )
    res.json({
      data: orders,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderModel.show(req.params.id)
    res.json({
      data: order,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqBody: IOrder = {
      status: OrderStatus.ACTIVE,
      userId: req.body.userId
    }
    const order = await OrderModel.create(reqBody)
    res.status(201).json({
      data: order,
      status: 'success',
      statusCode: 201
    })
  } catch (err) {
    next(err)
  }
}

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Order: Partial<IOrder> = {
      id: req.params.id,
      status: req.body.status
    }
    const updatedOrder = await OrderModel.edit(Order)
    res.json({
      data: updatedOrder,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const getOrderProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderProductModel.index(req.params.id)
    res.json({
      data: order,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const getOrderProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderProductModel.show({
      orderId: req.params.id,
      productId: req.params.prodId
    })
    res.json({
      data: order,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const addOrderProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderProductModel.create({
      orderId: req.params.id,
      productId: req.body.productId,
      quantity: req.body.quantity
    })
    res.json({
      data: order,
      status: 'success',
      statusCode: 201
    })
  } catch (err) {
    next(err)
  }
}

export const updateOrderProductQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderProductModel.edit({
      orderId: req.params.id,
      productId: req.params.prodId,
      quantity: req.body.quantity
    })
    res.json({
      data: order,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const deleteOrderProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderProductModel.delete({
      orderId: req.params.id,
      productId: req.params.prodId
    })
    res.json({
      data: order,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}
