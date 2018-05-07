
var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Mike';
    var text = 'Hi Andrew, how are you doing';
    var res = generateMessage(from, text);
    expect(typeof res.createdAt).toBe('number');
    expect(res).toMatchObject({from, text});
  });
  
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var locMessage = {
      from: 'Admin',
      latitude: '51.4675936',
      longitude: '-0.1700978'
    };
    var res = generateLocationMessage(locMessage.from, locMessage.latitude, locMessage.longitude);
    expect(res).toMatchObject({
      from: locMessage.from,
      url: `https://www.google.com/maps?q=${locMessage.latitude},${locMessage.longitude}`
    });
  });
});