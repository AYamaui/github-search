import { BasicInfo } from './basic-info';

describe('BasicInfo', () => {

  // Tests if the constructor works
  it('should create an instance', () => {
    expect(new BasicInfo(
      1,
      1,
      'fullName',
      'url',
      'description',
      'forksUrl',
      1,
      'issuesUrl',
      1,
      'stargazersUrl',
      1,
      'commitsUrl',
      'owner',
      'name'
    )).toBeTruthy();
  });
});
