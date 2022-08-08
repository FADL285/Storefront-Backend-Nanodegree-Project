import { Request, Response, NextFunction } from 'express'
import { ProductModel } from '../models/product.model'
import { IProduct } from '../interfaces/product.interface'

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductModel.index()
    res.json({
      data: products,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductModel.getProductsByCategory(
      req.params.category
    )
    res.json({
      data: products,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.show(req.params.id)
    res.json({
      data: product,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.create(req.body)
    res.status(201).json({
      data: product,
      status: 'success',
      statusCode: 201
    })
  } catch (err) {
    next(err)
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product: Partial<IProduct> = {
      id: req.params.id,
      ...req.body
    }
    const updatedProduct = await ProductModel.edit(product)
    res.json({
      data: updatedProduct,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteProduct = await ProductModel.delete(req.params.id)
    res.json({
      data: deleteProduct,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}
