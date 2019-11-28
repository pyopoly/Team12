
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



  
/**
 * Active listener that will check to see if a user is logged in. If logged in, different information will appear.
 */
(function () {
    var logout = document.getElementById("logMeOut");
    var login = document.getElementById("login");
    var createImg = document.getElementById("createImg");
    var createTitle = document.getElementById("createTitle");
    var mapImg = document.getElementById("mapImg");
    var mapTitle = document.getElementById("mapTitle");



    logout.addEventListener('click', e=> {
        firebase.auth().signOut();
        console.log("logged out");
        location.reload();
    });
    
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            logout.classList.remove('hide');
            login.classList.add('hide');
            createImg.setAttribute('href', "create_a_group.html");
            createTitle.setAttribute('href', "create_a_group.html");
            mapImg.setAttribute('href', "map.html");
            mapTitle.setAttribute('href', "map.html");



        } else {
            logout.classList.add('hide');
            login.classList.remove('hide');
        }
    })

}());