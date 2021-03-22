import { BaseProject } from '../common/types';

export type SyncProject = BaseProject & {
  legacy_parent_id: number | null;
  collapsed: number;
  child_order: number;
  is_deleted: number;
  is_archived: number;
  is_favorite: number;
};
