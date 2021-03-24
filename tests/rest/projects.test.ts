import nock from 'nock';

import { Projects } from '../../src/rest/projects';
import { list, single } from '../fixtures/rest/projects';

describe('Projects', () => {
  const projects = new Projects('this_is_not_a_valid_key');

  describe('#findAll', () => {
    it('should return a list of projects', () => {
      nock('https://api.todoist.com').get('/rest/v1/projects').reply(200, list);

      projects.findAll().then((projectEntries) => {
        expect(projectEntries instanceof Array).toBe(true);
      });
    });
  });

  describe('#get', () => {
    it('should return a single project', () => {
      nock('https://api.todoist.com').get('/rest/v1/projects/1').reply(200, single);

      projects.get(1).then((project) => {
        expect(project).toEqual(single);
      });
    });
  });

  describe('#create', () => {
    it('should return the created project', () => {
      nock('https://api.todoist.com').post('/rest/v1/projects').reply(200, single);

      projects.create({ name: 'Inbox' }).then((project) => {
        expect(project.name).toEqual(single.name);
      });
    });
  });

  describe('#update', () => {
    it('should send the request to the proper endpoint', () => {
      const scope = nock('https://api.todoist.com').post('/rest/v1/projects/1').reply(204);

      projects.update(1, { name: 'Test' }).then(() => {
        expect(scope.isDone()).toBe(true);
      });
    });
  });

  describe('#delete', () => {
    it('should send the request to the proper endpoint', () => {
      const scope = nock('https://api.todoist.com').delete('/rest/v1/projects/1').reply(204);

      projects.delete(1).then(() => {
        expect(scope.isDone()).toBe(true);
      });
    });
  });
});