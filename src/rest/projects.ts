import RequestFactory from '../common/requestFactory';
import { Project, ProjectCreateParameters, ProjectUpdateParameters } from './types';

/**
 * Class implementing methods to access Projects-related endpoints from the Todoist REST API
 *
 * @see {@link https://developer.todoist.com/rest/v1/#projects}
 */
export class Projects {
  /**
   * Instance of {@link RequestFactory}
   */
  requestFactory: RequestFactory;

  /**
   * Class constructor
   *
   * @param accessToken - Access token required to authenticate against the REST API
   */
  constructor(accessToken: string) {
    if (accessToken === undefined) {
      throw new Error('An access token must be passed to the constructor!');
    }

    this.requestFactory = new RequestFactory(
      accessToken,
      'https://api.todoist.com/rest/v1/projects'
    );
  }

  /**
   * Returns all projects belonging to the authenticated user
   *
   * @returns an array of {@link Project} entries
   */
  async findAll(): Promise<Project[]> {
    const response = await this.requestFactory.makeRequest();

    return response.json();
  }

  /**
   * Creates a new project for the authenticated user
   *
   * @param parameters - options defining how the project should be created
   *
   * @returns the created project
   */
  async create(parameters: Partial<ProjectCreateParameters>): Promise<Project> {
    const response = await this.requestFactory.makePostRequest('', JSON.stringify(parameters), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }

  /**
   * Returns a project
   *
   * @param projectId - the ID of the project we want to get
   *
   * @returns the project with the given ID
   */
  async get(projectId: number): Promise<Project> {
    const response = await this.requestFactory.makeRequest(`/${projectId}`);

    return response.json();
  }

  /**
   * Updates a project with new information
   *
   * @param projectId - the ID of the we want to get
   * @param parameters - options defining how we want to update the project
   */
  async update(projectId: number, parameters: Partial<ProjectUpdateParameters>): Promise<void> {
    await this.requestFactory.makePostRequest(`/${projectId}`, JSON.stringify(parameters), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Deletes a project
   *
   * @param projectId - the ID of the project we want to delete
   */
  async delete(projectId: number): Promise<void> {
    await this.requestFactory.makeDeleteRequest(`/${projectId}`);
  }
}
