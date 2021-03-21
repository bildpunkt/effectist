import nock from 'nock';

import { Auth } from '../../src/auth';
import { AuthScope } from '../../src/auth/types';

describe('Auth', () => {
  const clientId = 'test_client_id';
  const clientSecret = 'test_client_secret';
  const scope = [AuthScope.DataReadWrite];
  let auth: Auth;

  beforeAll(() => {
    auth = new Auth({
      clientId: clientId,
      clientSecret: clientSecret,
      scope: scope,
    });
  });

  describe('#getAuthorizationUrl', () => {
    let result: string;

    beforeEach(() => {
      result = auth.getAuthorizationUrl();
    });

    it('should contain the client ID', () => {
      expect(result).toContain(`client_id=${clientId}`);
    });

    it('should contain the defined scope', () => {
      expect(result).toContain(`scope=data%3Aread_write`);
    });

    it('should contain a state parameter', () => {
      expect(result).toContain(`state=${auth.options.state}`);
    });
  });

  describe('#getAuthorizationCode', () => {
    it('should return the code from the redirect URL', () => {
      const redirectUrl = `http://localhost?code=test_code&state=${auth.options.state}`;

      expect(auth.getAuthorizationCode(redirectUrl)).toEqual('test_code');
    });

    it('throws an error if the state mismatches', () => {
      const badUrl = 'http://localhost?code=test_code&state=bad_state';

      expect(() => {
        auth.getAuthorizationCode(badUrl);
      }).toThrow();
    });

    it('throws an error if the state is missing', () => {
      const badUrl = 'http://localhost?code=test_code';

      expect(() => {
        auth.getAuthorizationCode(badUrl);
      }).toThrow();
    });

    it('throws an error if the code is missing', () => {
      const badUrl = `http://localhost?state=${auth.options.state}`;

      expect(() => {
        auth.getAuthorizationCode(badUrl);
      }).toThrow();
    });

    it('throws an error if an error parameter is present', () => {
      const badUrl = 'http://localhost?error=a_test_error';

      expect(() => {
        auth.getAuthorizationCode(badUrl);
      }).toThrow();
    });
  });

  describe('#getAccessToken', () => {
    it('should return the access token', () => {
      nock('https://todoist.com').post('/oauth/access_token').reply(200, {
        token_type: 'Bearer',
        access_token: 'test_access_token',
      });

      auth.getAccessToken('test_code').then((token) => {
        expect(token).toEqual('test_access_token');
      });
    });

    it('throws an error on an invalid response', () => {
      nock('https://todoist.com').post('/oauth/access_token').reply(400, {
        error: 'invalid_grant',
      });

      auth.getAccessToken('test_code').catch((error) => {
        expect(error.message).toContain('invalid_grant');
      });
    });
  });
});
