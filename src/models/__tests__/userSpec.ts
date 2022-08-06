import { UserModel } from '../user.model'
import db from '../../database'
import { IUser } from '../../interfaces/user.interface'

describe('User Model -- CRUD operations', function () {
  describe('CRUD Methods Definitions', function () {
    it('index Method should be exist --> to Fetch All Users', function () {
      expect(UserModel.index).toBeDefined()
    })

    it('show Method should be exist --> to Fetch a User', function () {
      expect(UserModel.show).toBeDefined()
    })

    it('create Method should be exist --> to create a User', function () {
      expect(UserModel.create).toBeDefined()
    })

    it('edit Method should be exist --> to edit a User', function () {
      expect(UserModel.edit).toBeDefined()
    })

    it('delete Method should be exist --> to delete a User', function () {
      expect(UserModel.delete).toBeDefined()
    })
  })

  describe('CRUD Methods Logic Testing', function () {
    const user: IUser = {
      email: 'user1@example.com',
      username: 'user1',
      firstname: 'Test',
      lastname: 'User 1',
      password: 'testPassword'
    }

    beforeAll(async () => {
      const createdUser = await UserModel.create(user)
      user.id = createdUser.id
    })

    afterAll(async () => {
      //    1. Open Connection with database
      const conn = await db.connect()
      //    2. Run the queries
      const q = `DELETE FROM users WHERE true`
      await conn.query(q)
      //    3. Close the connection
      conn.release()
    })

    it('create method should create a new user and return it', async function () {
      const createdUser = await UserModel.create({
        email: 'user2@example.com',
        username: 'user2',
        firstname: 'Test',
        lastname: 'User 2',
        password: 'testPassword'
      })
      expect(createdUser).toEqual({
        id: createdUser.id,
        email: 'user2@example.com',
        username: 'user2',
        firstname: 'Test',
        lastname: 'User 2'
      } as IUser)
    })
    it('create method should be rejected if the user already exists', async function () {
      const createdUser = UserModel.create(user)
      await expectAsync(createdUser).toBeRejected()
    })
    it('index method should return Array of All Users', async function () {
      const users = await UserModel.index()
      expect(users.length).toBe(2)
    })
    it('show method should return the user with valid uuid v4 and already exists', async function () {
      const returnedUser = await UserModel.show(user.id as string)
      expect(returnedUser.id).toEqual(user.id)
      expect(returnedUser.username).toEqual(user.username)
    })
    it('show method should be rejected if the id was invalid', async function () {
      const returnedUser = UserModel.show('cb2852000mfa')
      await expectAsync(returnedUser).toBeRejected()
    })
    it('show method should be rejected if the user does not exist', async function () {
      const returnedUser = UserModel.show(
        '9cf6e4e5-8508-4a6a-97e2-cb318201db0a'
      )
      await expectAsync(returnedUser).toBeRejected()
    })
    it('edit method should edit the user and return it if the user exists', async function () {
      const editedUser = await UserModel.edit({
        id: user.id,
        email: 'mohamedfadl@ieee.org',
        firstname: 'Mohamed',
        lastname: 'Fadl'
      })
      expect(editedUser.email).toBe('mohamedfadl@ieee.org')
      expect(editedUser.lastname).toBe('Fadl')
    })
    it('edit method should be rejected if the id was invalid', async function () {
      const returnedUser = UserModel.edit({
        id: 'cb2852000mfa',
        firstname: 'Mohamed'
      })
      await expectAsync(returnedUser).toBeRejected()
    })
    it('edit method should be rejected if the user does not exist', async function () {
      const returnedUser = UserModel.edit({
        id: '9cf6e4e5-8508-4a6a-97e2-cb318201db0a',
        username: 'FADL285',
        lastname: 'FADL285'
      })
      await expectAsync(returnedUser).toBeRejected()
    })
    it('delete method should delete the user and return it if the user exists', async function () {
      const deletedUser = await UserModel.delete(user.id as string)
      expect(deletedUser.id).toBe(user.id)
      expect(deletedUser.username).toBe(user.username)
    })
    it('delete method should be rejected if the id was invalid', async function () {
      const deletedUser = UserModel.delete('cb2852000mfa')
      await expectAsync(deletedUser).toBeRejected()
    })
    it('delete method should be rejected if the user does not exist', async function () {
      const deletedUser = UserModel.delete(
        '9cf6e4e5-8508-4a6a-97e2-cb318201db0a'
      )
      await expectAsync(deletedUser).toBeRejected()
    })
  })
})
