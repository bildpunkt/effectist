import RequestFactory from '../common/requestFactory';

export default class REST {
  requestFactory: RequestFactory;

  constructor(accessToken: string) {
    if (accessToken === undefined) {
      throw new Error('An access token must be passed to the constructor!');
    }

    this.requestFactory = new RequestFactory(accessToken, 'https://api.todoist.com/rest/v1');
  }
}

export { Projects } from './projects';
