 var config = {
    apiKey: "AIzaSyDw5YEFrcJZfpHg-LOJvEb66QzlCiHLb6o",
    authDomain: "chat-app-dc9d8.firebaseapp.com",
    databaseURL: "https://chat-app-dc9d8.firebaseio.com",
    storageBucket: "chat-app-dc9d8.appspot.com",
};
firebase.initializeApp(config);

var chatData = firebase.database().ref();

function pushMessage(event) {
  if (event.keyCode == 13) {
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    chatData.push({name: name, text: text});
    $('#messageInput').val('');
  }
}

$('#messageInput').keypress(pushMessage);

chatData.on("child_added", showMessage);

function showMessage(msg) {
  var message = msg.val();
  var messageSender = message.name;
  var messageContent = message.text;

  var messageEl = $("<div/>").addClass("message");
  var senderEl = $("<span/>").text(messageSender + ": ");
  var contentEl = $("<span/>").text(messageContent);
  
  messageEl.append(senderEl);
  messageEl.append(contentEl);
  $('#messages').append(messageEl);
}