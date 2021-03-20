/**
 * Options that can be passed to {@link Auth} instances
 */
export interface AuthOptions {
  /**
   * The application-specific client ID given by Todoist
   */
  clientId: string;

  /**
   * The application-specific client secret given by Todoist
   */
  clientSecret: string;

  /**
   * Scopes of data access requested from the user on authorization
   *
   * @see {@link AuthScope} for scope definitions
   */
  scope: AuthScope[];

  /**
   * A unique and unguessable string. It is used to protect you against cross-site request forgery attacks.
   *
   * @defaultValue a randomly generated string
   * @see {@link https://developer.todoist.com/guides/#step-1-authorization-request}
   */
  state: string;

  /**
   * The base for all requests made by the {@link Auth} module
   *
   * @defaultValue `https://todoist.com/oauth`
   */
  baseUrl?: string;
}

/**
 * Interface for the serialized response data from access token requests
 */
export interface AccessTokenResponse {
  /**
   * If a problem occurred, a response code will be present here
   */
  error?: string;

  /**
   * Type of the returned token from the token exchange
   *
   * @defaultValue `Bearer` in almost all cases
   */
  token_type?: string;

  /**
   * The access token from the authorization, which will be used for all further requests
   */
  access_token?: string;
}

/**
 * Permissions that you would like the users to grant to your application
 *
 * @see {@link https://developer.todoist.com/guides/#step-1-authorization-request}
 */
export enum AuthScope {
  /**
   * Grants permission to add new tasks (the application cannot read or modify any existing data).
   */
  TaskAdd = 'task:add',

  /**
   * Grants read-only access to application data, including tasks, projects, labels, and filters.
   */
  DataRead = 'data:read',

  /**
   * Grants read and write access to application data, including tasks, projects, labels, and filters. This scope includes task:add and data:read scopes.
   */
  DataReadWrite = 'data:read_write',

  /**
   * Grants permission to delete application data, including tasks, labels, and filters.
   */
  DataDelete = 'data:delete',

  /**
   * Grants permission to delete projects.
   */
  ProjectDelete = 'project:delete',
}
