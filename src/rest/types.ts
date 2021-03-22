import { BaseProject } from '../common/types';

export type Project = BaseProject & {
  order: number;
  comment_count: number;
  favorite: boolean;
  url: string;
};

export type ProjectCreateParameters = Pick<Project, 'name' | 'parent_id' | 'color' | 'favorite'>;

export type ProjectUpdateParameters = Pick<Project, 'name' | 'color' | 'favorite'>;
