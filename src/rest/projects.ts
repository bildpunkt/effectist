import RequestFactory from '../common/requestFactory';
import { Project, ProjectCreateParameters, ProjectUpdateParameters } from './types';

export class Projects {
  requestFactory: RequestFactory;

  constructor(accessToken: string) {
    if (accessToken === undefined) {
      throw new Error('An access token must be passed to the constructor!');
    }

    this.requestFactory = new RequestFactory(
      accessToken,
      'https://api.todoist.com/rest/v1/projects'
    );
  }

  async findAll(): Promise<Project[]> {
    const response = await this.requestFactory.makeRequest();

    return response.json();
  }

  async create(parameters: Partial<ProjectCreateParameters>): Promise<Project> {
    const response = await this.requestFactory.makePostRequest('', JSON.stringify(parameters));

    return response.json();
  }

  async get(projectId: number): Promise<Project> {
    const response = await this.requestFactory.makeRequest(`/${projectId}`);

    return response.json();
  }

  async update(projectId: number, parameters: Partial<ProjectUpdateParameters>): Promise<void> {
    await this.requestFactory.makePostRequest(`/${projectId}`, JSON.stringify(parameters));
  }

  async delete(projectId: number): Promise<void> {
    await this.requestFactory.makeDeleteRequest(`/${projectId}`);
  }
}
