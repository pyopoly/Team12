/*Handling Create a Group button (type "submit")
on click -> collect data user has written
generate group ID, store in ID field
generate time stamp to put in "Time Created" */


$(document).ready(function() {
    
    var firebaseConfig = {
        apiKey: "AIzaSyBdBMvmyQQvDUE7yQK8kypXmL8Xko7SJhw",
        authDomain: "studybuddy-ce7e9.firebaseapp.com",
        databaseURL: "https://studybuddy-ce7e9.firebaseio.com",
        projectId: "studybuddy-ce7e9",
        storageBucket: "studybuddy-ce7e9.appspot.com",
        messagingSenderId: "288586368350",
        appId: "1:288586368350:web:c13d8a08c9249b15cbbbcf",
        measurementId: "G-VYXB59FGNZ"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var db = firebase.firestore();

    
    /*const refID = db.collection("Groups").document();
    String groupID = refID.();*/
    var currentDateandTime = new Date();
   
    $(document).on('click', 'button#create_group_btn', function() {
    var nameOfGroup = $('input#groupName').val();
    var nameOfCourse = $('input#courseSelect').val();
    var setLocation = $('input#groupLocation').val();
    var detailsOfGroup = $('input#groupDetails').val();

        db.collection("Groups").doc("newGroup").set({
            groupName: nameOfGroup,
            course: nameOfCourse,
            location: setLocation,
            details: detailsOfGroup
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        })
    });
});

