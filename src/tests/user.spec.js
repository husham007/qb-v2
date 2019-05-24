import { expect } from 'chai';
import * as userApi from './api';

describe('users', () => {
  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '5ce5166956d8b042a7bf1296',
            username: 'rwieruch',
            email: 'hello@robin.com',
            role: 'ADMIN',
          },
        },
      };

      const result = await userApi.user({ id: '5ce5166956d8b042a7bf1296' });

      expect(result.data).to.eql(expectedResult);
    });
  });
});