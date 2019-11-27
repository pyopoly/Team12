
// Fucntion that creates a new document in the users collection


function createUser() {

    // if the current user logged in user
    // is authenticated, then grab "uid" "displayName" and "email"
    // use "set()" with merge (if document did not exist it will be created)
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            db.collection("user").doc(user.uid).set(
                {
                "name":user.displayName,
                 "email":user.email,
                },{ merge: true });
            } else {
                console.log("no one signed in");
            }

    });
}

   
function showName() {
    
    firebase.auth().onAuthStateChanged(function (user) {
      console.log(user);
      document.getElementById("hello").innerHTML = user.displayName;
    });
  

  }



  
(function () {
    var but = document.getElementById("logMeOut");
    but.onclick = firebase.auth().signOut();
    but.addEventListener('click', e=> {
        firebase.auth().signOut();
        console.log("logged out");
        location.reload();
    });
}());