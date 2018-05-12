const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users = new Users();
  beforeEach(() => {
    users.users = [{
       id: '1',
       name: 'Mike',
       room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });
  
  it('should remove a user', () => {
    var user = users.removeUser('2');
    expect(users.users.length).toBe(2);
    expect(users.users).not.toEqual(expect.arrayContaining(user));
  });
  
  it('should not remove user', () => {
    var user = users.removeUser('5');
    expect(users.users.length).toBe(3);
    expect(users.users).toEqual(expect.arrayContaining(user));
  });
  
  it('should find user', () => {
    var user = users.getUser('1');
    expect(user).toContainEqual(users.users[0]);
  });

  it('should not find user', () => {
    var user = users.getUser('4');
    expect(user.length).toBe(0);
  });
  
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Mike',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    
    expect(users.users).toEqual([user]);
  });
  
  it('should return names for node course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });
});