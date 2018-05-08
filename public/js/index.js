var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server'); 
});

socket.on('newMessage', function(message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formatedTime
  });
  
  $('#messages').append(html);
});

//socket.emit('createMessage', {
//  from: 'Frank',
//  text: 'Hi'
//}, function(data) {
//  console.log('Got it', data);
//});

socket.on('newLocationMessage', function(message) {
//  var li = $('<li></li>');
//  var a = $('<a target="_blank">My current location</a>');
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formatedTime
  });
  
//  li.text(`${message.from} ${formatedTime}: `);
//  a.attr('href', message.url);
//  li.append(a);
  $('#messages').append(html);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  
  var messageTextbox = $('[name=message]');
  
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function() {
    $('[name=message]').val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});