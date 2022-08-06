import { UserModel } from '../user.model'
import db from '../../database'
import { IUser } from '../../interfaces/user.interface'

describe('User Model -- Authentication', function () {
  describe('Authentication Methods Definitions', function () {
    it('Authenticate Method should be exist', function () {
      expect(UserModel.authenticate).toBeDefined()
    })
    //    Other Auth Methods ...
  })

  describe('Authentication Logic Testing', function () {
    const user: IUser = {
      email: 'user1@example.com',
      username: 'user1',
      firstname: 'Test',
      lastname: 'User',
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
      const q = `DELETE
                       FROM users
                       WHERE true`
      await conn.query(q)
      //    3. Close the connection
      conn.release()
    })

    it('Authentication method should return the authenticated user with valid credentials', async function () {
      const authenticatedUser = await UserModel.authenticate(
        user.email,
        user.password
      )
      expect(authenticatedUser.id).toBe(user.id)
      expect(authenticatedUser.email).toBe(user.email)
      expect(authenticatedUser.username).toBe(user.username)
    })

    it('Authentication method should be rejected if the credentials are invalid', async function () {
      const authenticateUser = UserModel.authenticate(
        'fadl@admin.com',
        'fake_password'
      )
      await expectAsync(authenticateUser).toBeRejected()
    })
  })
})
