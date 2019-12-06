///////////////////////////////////////////////////////
////////////These are manually entered in, no database
///////////This is unused. This is merely a template of old data
//////////////////////////////////////////////
$(document).ready(function() {
    $(document).on('click', '#group2', function(){
        var courseName = document.getElementById("group2").childNodes[0].cloneNode(true);
        var groupName = document.getElementById("group2").childNodes[1].cloneNode(true);
        $('.info2').html(courseName);
        $('.info3').html(groupName);
        $('.author').html(" Created by: Sandy");
        $('.textDetails').html("@SE2 304 computer lab, join me!");
        mymap.on('click', onMapClick);

        db.collection('Groups').doc('Group 1').onSnapshot(function (snap) {
            console.log("current data is ...", snap.data());
            document.getElementsByClassName("author")[0].innerHTML = snap.data().createdBy;
            console.log()

        });
    });



});

$(document).ready(function() {
    $(document).on('click', '#group3', function(){
        var courseName = document.getElementById("group3").childNodes[0].cloneNode(true);
        var groupName = document.getElementById("group3").childNodes[1].cloneNode(true);
        $('#info2').html(courseName);
        $('#info3').html(groupName);
        $('#author').html(" Created by: Anna");
        $('#textDetails').html("SE2 224. Let's study!");
        mymap.on('click', onMapClick);
    });
});


$(document).ready(function() {
    $(document).on('click', '#group4', function(){
        var courseName = document.getElementById("group4").childNodes[0].cloneNode(true);
        var groupName = document.getElementById("group4").childNodes[1].cloneNode(true);
        $('#info2').html(courseName);
        $('#info3').html(groupName);
        $('#author').html(" Created by: Sora");
        $('#textDetails').html("SW1 412. I have cookies!");
        mymap.on('click', onMapClick);
    });
});

$(document).ready(function() {
    $(document).on('click', '#group5', function(){
        var courseName = document.getElementById("group5").childNodes[0].cloneNode(true);
        var groupName = document.getElementById("group5").childNodes[1].cloneNode(true);
        $('#info2').html(courseName);
        $('#info3').html(groupName);
        $('#author').html("Created by: James");
        $('#textDetails').html("SW1 303 See you soon!");
        mymap.on('click', onMapClick);
    });
});


$(document).ready(function() {
    $(document).on('click', '#group6', function(){
        var courseName = document.getElementById('group6').childNodes[0].cloneNode(true);
        var groupName = document.getElementById('group6').childNodes[1].cloneNode(true);
        $('#info2').html(courseName);
        $('#info3').html(groupName);
        $('#author').html("Created by: Lucy");
        $('#textDetails').html("SW1 202. I am lonely :(");
        mymap.on('click', onMapClick);
    });
});

$(document).ready(function() {
    $(document).on('click', '#group7', function(){
        var courseName = document.getElementById('group6').childNodes[0].cloneNode(true);
        var groupName = document.getElementById('group6').childNodes[1].cloneNode(true);
        $('#info2').html(courseName);
        $('#info3').html(groupName);
        $('#author').html("Created by: David");
        $('#textDetails').html("SW1 354. I need friends!");
        mymap.on('click', onMapClick);
    });
});

$(document).ready(function() {
    $(document).on('click', '#group8', function(){
        var courseName = document.getElementById('group8').childNodes[0].cloneNode(true);
        var groupName = document.getElementById('group8').childNodes[1].cloneNode(true);
        $('#info2').html(courseName);
        $('#info3').html(groupName);
        $('#author').html("Created by: Ken");
        $('#textDetails').html("SW1 322. Going to study till 5pm");
        mymap.on('click', onMapClick);
    });
});