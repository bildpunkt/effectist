import { BaseProject } from '../common/types';

/**
 * Extended type for Projects returned by the REST API
 *
 * @see {@link https://developer.todoist.com/rest/v1/#projects}
 */
export type Project = BaseProject & {
  /**
   * Project position under the same parent (read-only).
   */
  order: number;

  /**
   * Number of project comments.
   */
  comment_count: number;

  /**
   * Whether the project is a favorite (a `true` or `false` value).
   */
  favorite: boolean;

  /**
   * URL to access this project in the Todoist web or mobile applications.
   */
  url: string;
};

/**
 * Sub-type of {@link Project} defining the parameters for creating one
 */
export type ProjectCreateParameters = Pick<Project, 'name' | 'parent_id' | 'color' | 'favorite'>;

/**
 * Sub-type of {@link Project} defining the parameters for updating one
 */
export type ProjectUpdateParameters = Pick<Project, 'name' | 'color' | 'favorite'>;
