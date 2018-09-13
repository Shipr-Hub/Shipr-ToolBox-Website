var firebase = require("firebase");
var firebaseui = require('firebaseui');


  var config = {
    apiKey: "AIzaSyAjm7RSPyLGEVu1o_OI7OZFtViZG7YmpXU",
    authDomain: "maker-toolbox-dev.firebaseapp.com",
    databaseURL: "https://maker-toolbox-dev.firebaseio.com",
    projectId: "maker-toolbox-dev",
    storageBucket: "maker-toolbox-dev.appspot.com",
    messagingSenderId: "422309464789"
  };
  firebase.initializeApp(config);
  var uiConfig = {
          signInSuccessUrl: '<url-to-redirect-to-on-success>',
          signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
          ],
          // tosUrl and privacyPolicyUrl accept either url string or a callback
          // function.
          // Terms of service url/callback.
          tosUrl: '<your-tos-url>',
          // Privacy policy url/callback.
          privacyPolicyUrl: function() {
            window.location.assign('<your-privacy-policy-url>');
          }
        };

        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
