import fetch from 'isomorphic-unfetch';
import deepmerge from 'deepmerge';

/**
 * Factory class for creating requests
 */
export default class RequestFactory {
  /**
   * Base URL for the API requests
   */
  baseUrl: string;

  /**
   * Request parameters that are passed to every request by default
   */
  defaultOptions: Partial<RequestInit>;

  /**
   * Class constructor
   *
   * @param accessToken - Access token required to authenticate against the Todoist API
   * @param baseUrl - Base URL for the API requests
   * @param requestInit - Additional options to be passed with every request
   */
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

  /**
   * Method to create a generic GET request
   *
   * @param input - Request URL
   * @param init - Additional options
   *
   * @returns the requests response
   */
  makeRequest(input = '', init: RequestInit = {}): Promise<Response> {
    const options: Partial<RequestInit> = deepmerge(this.defaultOptions, init);

    return fetch(`${this.baseUrl}${input}`, options);
  }

  /**
   * Method to create a generic POST request
   *
   * @param input - Request URL
   * @param data - Request data/body
   * @param init - Additional options
   *
   * @returns the requests response
   */
  makePostRequest(input = '', data: BodyInit, init: RequestInit = {}): Promise<Response> {
    const options = deepmerge<RequestInit>(init, {
      method: 'POST',
      body: data,
    });

    return this.makeRequest(input, options);
  }

  /**
   * Method to create a generic DELETE request
   *
   * @param input - Request URL
   * @param init - Additional options
   *
   * @returns the requests response
   */
  makeDeleteRequest(input = '', init: RequestInit = {}): Promise<Response> {
    const options = deepmerge<RequestInit>(init, {
      method: 'DELETE',
    });

    return this.makeRequest(input, options);
  }
}
