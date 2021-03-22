import fetch from 'isomorphic-unfetch';
import deepmerge from 'deepmerge';

export default class RequestFactory {
  baseUrl: string;

  defaultOptions: Partial<RequestInit>;

  constructor(
    accessToken: string,
    baseUrl = 'https://api.todoist.com/',
    requestInit: Partial<RequestInit> = {}
  ) {
    this.defaultOptions = deepmerge<RequestInit>(requestInit, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    this.baseUrl = baseUrl;
  }

  makeRequest(input = '', init: RequestInit = {}): Promise<Response> {
    const options: Partial<RequestInit> = deepmerge(this.defaultOptions, init);

    return fetch(`${this.baseUrl}${input}`, options);
  }

  makePostRequest(input = '', data: BodyInit, init: RequestInit = {}): Promise<Response> {
    const options = deepmerge<RequestInit>(init, {
      method: 'POST',
      body: data,
    });

    return this.makeRequest(input, options);
  }

  makeDeleteRequest(input = '', init: RequestInit = {}): Promise<Response> {
    const options = deepmerge<RequestInit>(init, {
      method: 'DELETE',
    });

    return this.makeRequest(input, options);
  }
}
