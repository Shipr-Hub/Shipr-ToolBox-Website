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

var allCatSelect;
var uid;

//Init views and handle Auth
window.onload = function(e) {
  initViews();
  signInListener();
  if (firebase.auth().currentUser != null) {
    authSetup();
  } else {
    onSignedInInitialize();
  }
};


var db = firebase.firestore();

//Initialize Views
function initViews() {
  allCatSelectHolder = document.getElementById('allCatSelectHolder');
}

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
      uid = user.uid;
      document.getElementById('loader').style.display = 'none';
      loadAllCatNamesFromFirebase();
      //  setupFavToolAdapter();
      //  setupPersonalToolAdapter();
      loadFavCategoriesAndProducts();
      loadPersonalTool();
    } else {
      // No user is signed in.
    }
  });
}
var favCatIDD;
//Signed In Initialize
function onSignedInInitialize() {

}

// ######### All Categories #########

// Load "All Category" Name Documents from Firebase
function loadAllCatNamesFromFirebase() {
  db.collection("cat").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      addAllCatNamesFromFirebaseToView(doc.id);
    });
  });
}

// Create select dropdown of name "All Category" name
function addAllCatNamesFromFirebaseToView(catId) {
  allCatP = document.createElement('span');
  allCatP.innerHTML = catId + " : ";
  allCatSelectHolder.appendChild(allCatP);

  allCatSelect = document.createElement("select");
  allCatSelectHolder.appendChild(allCatSelect);
  allCatSelectId = catId + "AllCatHolder"
  allCatSelect.id = allCatSelectId;


  linebreak = document.createElement("br");
  allCatSelectHolder.appendChild(linebreak);

  loadAllCatChildNamesFromFirebase(catId, allCatSelectId);
  // TODO:     set onclick to open dropdown and load all child products at  db.collection("cat").document(docId).collection("products")
}

// Load "All Category Child" Documents from Firebase
function loadAllCatChildNamesFromFirebase(docId, allCatSelectId) {

  db.collection("cat").doc(docId).collection("products").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      addAllCatChildFromFirebaseToView(doc, allCatSelectId);
    });
  });
}

// Add "All Category Child" option to the select dropdown
function addAllCatChildFromFirebaseToView(child, allCatSelectId) {
  childid = child.id;
  var allCatChildSelect = document.getElementById(allCatSelectId);

  var allCatLi = document.createElement("option");
  allCatLi.value = childid;
  allCatLi.innerHTML = childid;
  allCatChildSelect.appendChild(allCatLi);
  // TODO:         load dropdown childs and set onclick to open it in new page product view passing docId in parameter
}

// ######### Favourite Cat and Tools #########

// Load "Favourite Category and Tools" from Firebase
function loadFavCategoriesAndProducts() {
  db.collection("users").doc(firebase.auth().currentUser.uid).get().then(function(doc) {
    if (doc.exists) {

      favtool = doc.get("favtool");
      favcat = doc.get("favcat");
      addFavToolToView(favtool);
      addFavCatToView(favcat);
    }
  });
}

function addFavToolToView(favtool) {
  console.log(favtool);
  fToolLen = favtool.length;

  for (i = 0; i < fToolLen; i++) {
    console.log(favtool[i]);
    var favToolHolder = document.getElementById('favToolHolder');
    var favTool = document.createElement('p');
    favTool.innerHTML = favtool[i].id;
    favToolHolder.appendChild(favTool);
  }
}

function addFavCatToView(favcat) {

  fCatLen = favcat.length;
  for (i = 0; i < fCatLen; i++) {

    var favCatSelectHolder = document.getElementById('favCatSelectHolder');
    allCatP = document.createElement('span');
    allCatP.innerHTML = favcat[i] + " : ";
    favCatSelectHolder.appendChild(allCatP);
    var favCatSelect = document.createElement("select");
    favCatSelect.id = favcat[i];;
    favCatIDD = favcat[i];
    favCatSelectHolder.appendChild(favCatSelect);
addOptionToSelect(favCatIDD);


  }

}

function addOptionToSelect(favCatID) {
  db.collection("cat").doc(favcat[i]).collection("products").get().then((querySnapshot) => {
    querySnapshot.forEach((favcatt) => {

      var favCatLi = document.createElement("option");
      favCatLi.value = favcatt.id;
      favCatLi.innerHTML = favcatt.id;

      //// TODO:  favCatSelect doesnt change
      console.log("catname");
      console.log(favCatIDD);
      document.getElementById(favCatID).appendChild(favCatLi);
    });
  });

}
// ######### Personal Tools #########

function loadPersonalTool() {

  db.collection("users").doc(uid).collection("tools").get().then((querySnapshot) => {
    querySnapshot.forEach((personaltool) => {
      addPersonalToolToView(personaltool);
    });
  });
}

function addPersonalToolToView(personaltool) {
  console.log(personaltool);
  var personalToolHolder = document.getElementById('personalToolHolder');
  var personalTool = document.createElement('p');
  personalTool.innerHTML = personaltool.id;
  personalToolHolder.appendChild(personalTool);
}
