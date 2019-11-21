/*Handling Create a Group button (type "submit")
on click -> collect data user has written
generate group ID, store in ID field
generate time stamp to put in "Time Created" */


$(document).ready(function() {
    var nameOfGroup = $('#groupName').val();
    var nameOfCourse = $('#courseSelect').val();
    var setLocation = $('#groupLocation').val();
    var detailsOfGroup = $('#groupDetails').val();
    
    /*const refID = db.collection("Groups").document();
    String groupID = refID.();*/
    var currentDateandTime = new Date();
   
    $(document).on('click', '.create_group_btn', function() {
        db.collection("groups").add({
            groupName: nameOfGroup,
            course: nameOfCourse,
            location: setLocation,
            details: detailsOfGroup,
            timeCreated: currentDateandTime
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            db.collection("groups").add({
                id:docRef.id
            })
        })
        .catch(function(error) {
            console.error("Error adding document: " + error);
        });
        
    });
});

