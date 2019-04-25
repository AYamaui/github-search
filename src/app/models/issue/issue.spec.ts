import { Issue } from './issue';

describe('Issue', () => {

  // Tests if the constructor works
  it('should create an instance', () => {
    expect(new Issue(
      'url',
      1,
      'title',
      'userUrl',
      'state',
      new Date('2019-04-19T09:44:15+00:00'),
      new Date('2019-04-19T09:44:15+00:00'),
      'userLogin',
      'description',
      'userAvatarUrl'
    )).toBeTruthy();
  });
});
