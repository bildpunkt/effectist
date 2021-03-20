export interface AuthOptions {
  clientId: string;
  clientSecret: string;
  scope: AuthScope[];
  state: string;
  baseUrl?: string;
}

export interface AccessTokenResponse {
  error?: string;
  token_type?: string;
  access_token?: string;
}

export enum AuthScope {
  TaskAdd = 'task:add',
  DataRead = 'data:read',
  DataReadWrite = 'data:read_write',
  DataDelete = 'data:delete',
  ProjectDelete = 'project:delete',
}
