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
      'createdAt',
      'updatedAt',
      'userLogin',
      'description',
      'userAvatarUrl'
    )).toBeTruthy();
  });
});
