import { AccessTokenResponse, AuthOptions } from './types';
import fetch from 'isomorphic-unfetch';

const FormData = require('form-data');

export class Auth {
  options: AuthOptions;

  constructor(options: AuthOptions) {
    const defaultOptions: Partial<AuthOptions> = {
      baseUrl: 'https://todoist.com/oauth',
      state: Math.random().toString(36).substring(2),
    };

    if (options.clientId === undefined) {
      throw new Error('Client ID must be set!');
    }

    if (options.clientSecret === undefined) {
      throw new Error('Client Secret must be set!');
    }

    if (options.scope === undefined || options.scope.length === 0) {
      throw new Error('At least one API scope must be defined!');
    }

    this.options = Object.assign(defaultOptions, options);
  }

  getAuthorizationUrl(): string {
    const url = new URL(`${this.options.baseUrl}/authorize`);

    url.searchParams.append('client_id', this.options.clientId);
    url.searchParams.append('scope', this.options.scope.join(','));
    url.searchParams.append('state', this.options.state);

    return url.toString();
  }

  getAuthorizationCode(redirectUrl: string): string {
    const url = new URL(redirectUrl);

    if (url.searchParams.has('error')) {
      throw new Error(`The Todoist API returned an error: ${url.searchParams.get('error')}`);
    }

    if (url.searchParams.has('state')) {
      const state = url.searchParams.get('state');

      if (state != this.options.state) {
        throw new Error(
          `The Todoist API returned an invalid state: ${state}, expected ${this.options.state}`
        );
      }
    } else {
      throw new Error(`The redirect URL didn't include a state parameter`);
    }

    if (!url.searchParams.has('code')) {
      throw new Error('The given redirect URL does not include an authorization code');
    }

    return url.searchParams.get('code')!;
  }

  async getAccessToken(code: string): Promise<string | undefined> {
    const formData = new FormData();

    formData.append('client_id', this.options.clientId);
    formData.append('client_secret', this.options.clientSecret);
    formData.append('code', code);

    const response = await fetch(`${this.options.baseUrl}/access_token`, {
      body: formData,
      method: 'POST',
    });
    const json: AccessTokenResponse = await response.json();

    if (json.error) {
      throw new Error(`The Todoist API returned an error: ${json.error}`);
    }

    return json.access_token;
  }
}
