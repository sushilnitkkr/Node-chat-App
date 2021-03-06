var socket = io();
function scrollToBottom(){
// selector
var messages = jQuery('#messages');
var newMessage =messages.children('li:last-child')
//Hieghts
var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight =  messages.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();
if (clientHeight+scrollTop +newMessageHeight+lastMessageHeight >= scrollHeight) {
messages.scrollTop(scrollHeight);
}

}
socket.on('connect',function(){
  console.log('Connected to Server');

});
socket.on('disconnect',function(){
  console.log('Disconnected from server');
});
// socket.on('newMessage',(msg)=>{
//   console.log('newMessage',msg);
// }); //listen event from server
socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
  text:message.text,
  from:message.from,
  createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();

// //  console.log('newMessage',message);
//   var li = jQuery('<li></li>');
//   li.text(`${message.from} ${formattedTime}: ${message.text}`);
//   jQuery('#messages').append(li);
});
// socket.emit('createMessage',{
//   from:'Frank',
//   text:'Hi'
// },function(data){
//   console.log('Got it',data);
// });
// rendering new location
socket.on('newLocationMessage',function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from:message.from,
    url:message.url,
    createdAt:formattedTime
  });
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target = "_blank">My current Location</a>');
  // li.text(`${message.from} ${formattedTime}:`);
  // a.attr('href',message.url);
  // li.append(a);
  jQuery('#messages').append(html);
scrollToBottom();
});
jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage',{
    from:'User',
    text: messageTextBox.val()
  },function(){
messageTextBox.val('')
  });
});
var locationButton = jQuery('#send-location');
locationButton.on('click',function () {
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your brouser');

  }
  locationButton.attr('disabled','disabled').text('Sending location....');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    //console.log(position);
    socket.emit('createGeolocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
