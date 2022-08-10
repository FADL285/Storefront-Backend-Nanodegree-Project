import { Request, Response, NextFunction } from 'express'
import { OrderModel } from '../models/order.model'
import { IOrder } from '../interfaces/order.interface'

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
    const order = await OrderModel.create(req.body)
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
