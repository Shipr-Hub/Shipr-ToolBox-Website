var firebaseConfig = {
  apiKey: "AIzaSyBl7ZrZLBVhQg7ZtvJPHW3ZNj2j-VkQVGE",
  authDomain: "maker-toolbox.firebaseapp.com",
  databaseURL: "https://maker-toolbox.firebaseio.com",
  projectId: "maker-toolbox",
  storageBucket: "maker-toolbox.appspot.com",
  messagingSenderId: "341577014493",
  appId: "1:341577014493:web:e16620f8ce206cf2"
};
firebase.initializeApp(firebaseConfig);



window.onload = function(e) {
  signInListener();
  if (firebase.auth().currentUser != null) {
    onSignedInInitialize();
  } else {
    authSetup();
  }
};

var db = firebase.firestore();
var uid;

//Sign In
function authSetup() {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        onSignedInInitialize();
        return false;
      },
      uiShown: function() {
        document.getElementById('loader').style.display = 'none';
      }
    },
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
  };
  ui.start('#firebaseui-auth-container', uiConfig);
}

//SignIn Listener
function signInListener() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      onSignedInInitialize();
      uid = user.uid;
      document.getElementById('loader').style.display = 'none';
    } else {
      // No user is signed in.
    }
  });
}


function onSignedInInitialize() {
  uid = firebase.auth().currentUser.uid;
}

function submitAddTool() {
  var nameEdit = document.getElementById('addToolName');
  var urlEdit = document.getElementById('addToolUrl');
  var aboutEdit = document.getElementById('addToolAbout');

  name = nameEdit.value;
  url = urlEdit.value;
  about = aboutEdit.value;


  var tool = {
    name: name,
    url: url,
    about: about
  };

  db.collection("users").doc(uid).collection("tools").doc(name).set(tool);


  alert("Added " + name);
  nameEdit.value = "";
  urlEdit.value = "";
  aboutEdit.value = "";

}
