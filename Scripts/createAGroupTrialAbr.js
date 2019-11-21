/*Handling Create a Group button (type "submit")
on click -> collect data user has written
generate group ID, store in ID field
generate time stamp to put in "Time Created" */


$(document).ready(function() {
    
    /*Date object to add to a data field in the future*/
    var currentDateandTime = new Date();
   
    $(document).on('click', 'button#create_group_btn', function() {
    
    /*each variable is scanning the user input */
    var nameOfGroup = document.getElementById("groupNameID").value;

    var nameOfCourse = document.getElementById("courseSelectID").value;

    var setLocation = document.getElementById("groupLocationID").value;

    var detailsOfGroup = document.getElementById("groupDetailsID").value;

    //adding a document with the following data in collection "Groups"
        db.collection("Groups").add({
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

