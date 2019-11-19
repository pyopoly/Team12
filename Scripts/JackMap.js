

/* Cordinates--------------------------------
            SW1:[49.250853, -123.002758]
            SW2:[49.250278, -123.00337]
            SW3:[49.249935, -123.002576]
            SW5:[49.249697, -123.002586]
            SW9:[49.248675, -123.002801]

            NW1:[49.252866, -123.003343
            NW3:[49.253307, -123.002651]
            NW6:[49.252162, -123.002431]

            NE1: [49.254014, -123.000988]
            NE4:[49.253367, -123.001063]
            NE8:[49.253391, -122.999218]
            NE9:[49.254221, -122.998708]
            NE10:[49.253346, -122.998477]
            NE12:[49.252775, -122.998493]
            NE16:[49.252124, -122.999743]
            NE18:[49.252124, -123.000725]
            NE20:[49.252155, -123.001503]

            SE1:[49.251266, -122.999142]
            SE2:[49.251434, -123.001143]
            SE6:[49.250923, -123.000398]
            SE8:[49.250842, -123.001379]
            SE10:[49.24989, -123.000661]
            SE12:[49.25018, -123.001519]
            SE14:[49.24949, -123.000677]
            -----------------------------------------------------*/






var mymap = L.map('mapid').setView([49.2500, -123.0000], 17);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicHlvcG9seSIsImEiOiJjazJrdGhpc3owem8wM2VsYWk0cWs4eGFyIn0.FnpymVeZSR-Pif_eaOMI6w'
}).addTo(mymap);


L.marker([49.249697, -123.002586]).addTo(mymap)
    .bindPopup('Comp1510<br>"Cram for Finals!!"<br><a href="http://www.bcit.ca">Join This Group</a>')
    .openPopup();

var popup = L.popup();


var myIcon = L.icon({
    iconUrl: 'images/icon/orange icon.png',
    iconSize:     [40,45 ], // size of the icon
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -60] // point from which the popup should open relative to the iconAnchor
});


var join = '<img id =join src=images/icon/join.png float=right>';

//function I made
function courseName(id, name) {
    var course = '<span id="course' + id + '">' + name + ' </span>';
    return course;

}

function groupName(id, name) {
    var gName = '<span id="groupName' + id + '">' + name + ' </span>';
    return gName;
}

function createGroup(groupNumber, course, nameOfGroup) {
    var group = '<div id="group' + groupNumber + '">' + courseName(groupNumber, course) + groupName(groupNumber, nameOfGroup) + join + '</div>';
    return group;
}







//Example: var group = '<div class="group1">' + courseName('comp1510') + groupName('Finals Sprint') + join + '</div>';
var group1 = createGroup(1, 'Comp1530', "Let's study");
var group2 = createGroup(2, 'Comp1712', "Finals Sprint");
var group3 = createGroup(3, 'comp1113', "Paul's group");
var group4 = createGroup(4, 'comm1116', "Report Discussion");
var group5 = createGroup(5, 'comp1712', "HELP!!!");
var group6 = createGroup(6, 'comp1536', "lab7");
var group7 = createGroup(7, 'comp1113', "Boolean Algebra");
var group8 = createGroup(8, 'comm1116', "Presentation");



//------------------------------The pins on the map--------------------------
//SE2
L.marker([49.251434, -123.001143], {icon: myIcon}).addTo(mymap)
    .bindPopup('<div class="iconPopup">' + group1 + group2 + group3 + '</div>')
    .openPopup()
;;

//SW1
L.marker([49.250853, -123.002758], {icon: myIcon}).addTo(mymap)
    .bindPopup('<div class="iconPopup">' + group4 + group5 + group6 + group7 + group8 + '</div>')
;;
//------------------------------------------------------------------------------------------


//tells the longitute and latitue----------------------------
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}







//--------------The Join Group Details popup window ----------------------------
$(document).ready(function() {
    $(document).on('click', '#group1', function(){
        var courseName = document.getElementById("group1").childNodes[0].cloneNode(true);
        var groupName = document.getElementById("group1").childNodes[1].cloneNode(true);
        $('.info2').html(courseName);
        $('.info3').html(groupName);
        $('.author').html(" Created by: Jason");
        $('.textDetails').html("Meet me in SE2 403!");
        mymap.on('click', onMapClick);


        db.collection('Groups').doc('Group 1').onSnapshot(function (snap) {
            console.log("current data is ...", snap.data());
            document.getElementsByClassName("author")[0].innerHTML = snap.data().createdBy;
           
            
            db.collection('Groups').doc('Group 1').onSnapshot(function (snap) {
            console.log("current data is ...", snap.data());
            document.getElementsByClassName("textDetails")[0].innerHTML = snap.data().details;
           
                
                db.collection('Groups').doc('Group 1').onSnapshot(function (snap) {
            console.log("current data is ...", snap.data());
            document.getElementById("time").innerHTML = snap.data().timeCreated;
          
                     });
        });
        });
    });
});


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


//$(document).ready(function() {
// $(document).on('click', 'img[src$="orange icon.png"]', function(){



db.collection('Groups').doc('Group 1').onSnapshot(function (snap) {
    console.log("current data is ...", snap.data());
    document.getElementById("course1").innerHTML = snap.data().course;
});

db.collection('Groups').doc('Group 1').onSnapshot(function (snap) {
    console.log("current data is ...", snap.data());
    document.getElementById("groupName1").innerHTML = snap.data().groupName;
});

