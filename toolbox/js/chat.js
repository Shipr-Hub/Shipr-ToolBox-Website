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

   var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};
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
