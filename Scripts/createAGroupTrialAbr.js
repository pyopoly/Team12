<<<<<<< HEAD
/*Handling Create a Group button (type "submit")
on click -> collect data user has written
generate group ID, store in ID field
generate time stamp to put in "Time Created" */


$(document).ready(function() {
  console.log("hello");
    
    /*Date object to add to a data field in the future*/
    var currentDateandTime = new Date();
   
    var groupForm =  document.querySelector('#createAGroupForm');
  
    groupForm.addEventListener('submit', (e) => {
        
        console.log(e);
      e.preventDefault();
      console.log("hre");
      db.collection('Groups').add({
        groupName: groupForm.groupNameA.value,
        course: groupForm.courseSelectA.value,
        location: groupForm.groupLocationA.value,
        details: groupForm.groupDetailsA.value,
        
      }) .then(function() {
      window.location.replace("map.html");
      })
    });
});

=======
/*Handling Create a Group button (type "submit")
on click -> collect data user has written
generate group ID, store in ID field
generate time stamp to put in "Time Created" */




$(document).ready(function() {
  
  console.log("hello");
    
    /*Date object to add to a data field in the future*/
    var currentDateandTime = new Date();
   
    var groupForm =  document.querySelector('#createAGroupForm');
  
    groupForm.addEventListener('submit', (e) => {
       firebase.auth().onAuthStateChanged(function (user) {    
        
      e.preventDefault();
      db.collection('Groups').add({
        groupName: groupForm.groupNameA.value,
        course: groupForm.courseSelectA.value,
        location: groupForm.groupLocationA.value,
        details: groupForm.groupDetailsA.value,       
        createdBy: user.displayName,
      }).then(function() { window.location.replace("map.html");})
    });
  });
});

>>>>>>> a56b4dae46e69c216bb532c5247f1ffa2b2e0e09
