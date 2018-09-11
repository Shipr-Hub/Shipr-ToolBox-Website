var config = {
   apiKey: "AIzaSyAjm7RSPyLGEVu1o_OI7OZFtViZG7YmpXU",
   authDomain: "maker-toolbox-dev.firebaseapp.com",
   databaseURL: "https://maker-toolbox-dev.firebaseio.com",
   projectId: "maker-toolbox-dev",
   storageBucket: "maker-toolbox-dev.appspot.com",
   messagingSenderId: "422309464789"
 };
 firebase.initializeApp(config);
 var ui = new firebaseui.auth.AuthUI(firebase.auth());
 ui.start('#firebaseui-auth-container', {
   signInOptions: [
     firebase.auth.EmailAuthProvider.PROVIDER_ID
   ],
   // Other config options...
 });

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
