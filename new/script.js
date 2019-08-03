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
window.onload = function (e) {
  initViews();
  signInListener();
  if (firebase.auth().currentUser != null) {
    onSignedInInitialize();

  } else {
    authSetup();
  }
};

var db = firebase.firestore();

//Initialize Views
function initViews() {
  allCatSelectHolder = document.getElementById('allCatDropDown');
}

//Sign In
function authSetup() {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        onSignedInInitialize();
        return false;
      },
      uiShown: function () {
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
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      onSignedInInitialize();
      uid = user.uid;
      document.getElementById('loader').style.display = 'none';
      loadAllCatNamesFromFirebase();
      loadFavCategoriesAndProducts();
      //  loadPersonalTool();
    } else {
      // No user is signed in.
    }
  });
}
var favCatIDD;
//Signed In Initialize
function onSignedInInitialize() {
  document.getElementById("firebaseui-auth-container").innerHTML = "";

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

  var allCatDropDown = document.getElementById('allCatDropDown');

  var allCatDiv = document.createElement("div");
  allCatDiv.id = catId;
  allCatDiv.className = "card";
  allCatDiv.innerHTML = "<div class=\"card-header\" id=\"heading" + catId + "\"> <h5 class=\"mb-0\"> <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapseall" + catId + "\"aria-expanded=\"true\" aria-controls=\"collapseall" + catId + "\" id=" + catId + "allcatDropdownTitle" + "> </button> </h5> </div> <div id =\"collapseall" + catId + "\" class=\"collapse hide\" aria-labelledby=\"heading" + catId + "\" data-parent=\"#allCatDropDown\"> <div class=\"card-body list-group list-group-flush\" id=" + catId + "AllCatBody>  </div></div>";
  allCatDropDown.appendChild(allCatDiv);

  var allcatTitle = document.getElementById(catId + "allcatDropdownTitle");
  allcatTitle.innerHTML = catId;
  loadAllCatChildNamesFromFirebase(catId);


  //loadAllCatChildNamesFromFirebase(catId, allCatSelectId);
  // TODO:     set onclick to open dropdown and load all child products at  db.collection("cat").document(docId).collection("products")
}

// Load "All Category Child" Documents from Firebase
function loadAllCatChildNamesFromFirebase(docId) {

  db.collection("cat").doc(docId).collection("products").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      addAllCatChildFromFirebaseToView(doc, docId);
    });
  });
}

// Add "All Category Child" option to the select dropdown
function addAllCatChildFromFirebaseToView(child, parentId) {

  var allCatLi = document.createElement("a");
  allCatLi.value = child.id;
  allCatLi.href = "products?id=" + child.id;
  allCatLi.target = "_blank";
  allCatLi.innerHTML = child.id;
  allCatLi.className = "list-group-item";

  var s = parentId + "AllCatBody";
  console.log(s);

  var elemeee = document.getElementById(s);
  elemeee.appendChild(allCatLi);


  // childid = child.id;
  // var allCatChildSelect = document.getElementById(allCatSelectId);

  // var allCatLi = document.createElement("option");
  // allCatLi.value = childid;
  // allCatLi.innerHTML = childid;
  // allCatChildSelect.appendChild(allCatLi);

  // TODO:         load dropdown childs and set onclick to open it in new page product view passing docId in parameter
}

// ######### Favourite Cat and Tools #########

// Load "Favourite Category and Tools" from Firebase
function loadFavCategoriesAndProducts() {
  db.collection("users").doc(firebase.auth().currentUser.uid).get().then(function (doc) {
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
    var favTool = document.createElement('a');
    favTool.className = "col-sm";
    favTool.href = "products?id=" + favtool[i].id;
    favTool.target = "_blank";
    favTool.innerHTML = favtool[i].id;
    favToolHolder.appendChild(favTool);
  }
}

function addFavCatToView(favcat) {

  fCatLen = favcat.length;
  for (i = 0; i < fCatLen; i++) {

    var favCatDropDown = document.getElementById('favCatDropDown');

    var favCatDiv = document.createElement("div");
    favCatDiv.id = favcat[i];
    favCatDiv.className = "card";
    favCatDiv.innerHTML = "<div class=\"card-header\" id=\"heading" + favcat[i] + "\"> <h5 class=\"mb-0\"> <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapse" + favcat[i] + "\"aria-expanded=\"true\" aria-controls=\"collapse" + favcat[i] + "\" id=" + favcat[i] + "favcatDropdownTitle" + "> </button>  </h5>    </div >  <div id =\"collapse" + favcat[i] + "\" class=\"collapse hide\" aria-labelledby=\"heading" + favcat[i] + "\" data-parent=\"#favCatDropDown\"> <div class=\"card-body list-group list-group-flush\" id=" + favcat[i] + "FavCatBody>  </div></div>";
    favCatDropDown.appendChild(favCatDiv);

    var favcatTitle = document.getElementById(favcat[i] + "favcatDropdownTitle");
    favcatTitle.innerHTML = favcat[i];
    addOptionToSelect(favcat[i]);
  }

}

function addOptionToSelect(favCatID) {
  console.log(favCatID);

  db.collection("cat").doc(favCatID).collection("products").get().then((querySnapshot) => {
    querySnapshot.forEach((favcatt) => {

      var favCatLi = document.createElement("a");
      favCatLi.value = favcatt.id;
      favCatLi.href = "products?id=" + favcatt.id;
      favCatLi.target = "_blank";
      favCatLi.innerHTML = favcatt.id;
      favCatLi.className = "list-group-item";

      var s = favCatID + "FavCatBody";
      var elemee = document.getElementById(s);
      elemee.appendChild(favCatLi);
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
