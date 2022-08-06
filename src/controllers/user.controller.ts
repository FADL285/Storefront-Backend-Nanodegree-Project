import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/user.model'
import { IUser } from '../interfaces/user.interface'
import { generateToken } from '../utils'

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.index()
    res.json({
      data: users,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.show(req.params.id)
    res.json({
      data: user,
      status: 'success'
    })
  } catch (err) {
    next(err)
  }
}

// TODO: Add The Validation
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.create(req.body)
    res.status(201).json({
      data: user,
      status: 'success',
      statusCode: 201
    })
  } catch (err) {
    next(err)
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: Partial<IUser> = {
      id: req.params.id,
      ...req.body
    }
    const updatedUser = await UserModel.edit(user)
    res.json({
      data: updatedUser,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteUser = await UserModel.delete(req.params.id)
    res.json({
      data: deleteUser,
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.authenticate(req.body.email, req.body.password)
    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username
    })
    res.json({
      data: {
        ...user,
        token
      },
      status: 'success',
      statusCode: 200
    })
  } catch (err) {
    next(err)
  }
}
