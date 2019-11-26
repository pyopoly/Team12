

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

    var group = '<div id="group' + groupNumber + '">' + courseName(groupNumber, course) + groupName(groupNumber, nameOfGroup) + '<img id =join' +groupNumber + ' src=images/icon/join.png float=right>' + '</div>';
    return group;
}







//Example: var group = '<div class="group1">' + courseName('comp1510') + groupName('Finals Sprint') + join + '</div>';
var group1 = createGroup(0, 'Comp1530', "Let's study");
var group2 = createGroup(1, 'Comp1712', "Finals Sprint");
var group3 = createGroup(2, 'comp1113', "Paul's group");
var group4 = createGroup(3, 'comm1116', "Report Discussion");
var group5 = createGroup(4, 'comp1712', "HELP!!!");
var group6 = createGroup(5, 'comp1536', "lab7");
var group7 = createGroup(6, 'comp1113', "Boolean Algebra");
var group8 = createGroup(7, 'comm1116', "Presentation");



//------------------------------The pins on the map--------------------------
//SE2
//L.marker([49.251434, -123.001143], {icon: myIcon}).addTo(mymap)
//    .bindPopup('<div class="iconPopup">' + group1 + group2 + group3 + '</div>')
//    .openPopup()
//;;

//SW1
L.marker([49.250853, -123.002758], {icon: myIcon}).addTo(mymap)
    .bindPopup('<div class="iconPopup">' + group4 + group5 + group6 + group7 + group8 + '</div>')
;;


db.collection("Groups").get().then(function(querySnapshot) {

    console.log("what is the snap?" +querySnapshot);
    if (!querySnapshot.empty) {
        var size = querySnapshot.size;

        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().course);
            idList.push(doc.id);
        });



        console.log("show me the list     now    " + idList);
        var g = "";
        for (let i = 0; i < size; i++) {

            //  console.log(idList[0]);
            // console.log("what is " + i);
            // console.log(idList[i]);
            db.collection('Groups').doc(idList[i]).onSnapshot(function (snap) {
                //console.log("current data is ...", snap.data());
                console.log(snap.data().course);
                //                document.getElementById("course"+i).innerHTML = snap.data().course;

                g += createGroup(i, snap.data().course, snap.data().groupName);
                //console.log(group1);
                // console.log("what is g here last? " + g);
                L.marker([49.25018, -123.001519], {icon: myIcon}).addTo(mymap)
                    .bindPopup('<div class="iconPopup">' + g + '</div>');
            });
        }
    }
});



//------------------------------------------------------------------------------------------


//tells the longitute and latitue----------------------------
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

//////////////////////////////////////////////////////////////////////
////Store Groups ID in a list
var idList = [];

//db.collection("Groups").get().then(function(querySnapshot) {
//    querySnapshot.forEach(function(doc) {
//        // doc.data() is never undefined for query doc snapshots
//        console.log(doc.id, " => ", doc.data().course);
//        idList.push(doc.id);
//    });
//
//
//    console.log("show me the list     now    " + idList);
//});
//
//




//--------------The Join Group Details popup window ----------------------------
$(document).ready(function() {
    $(document).on('click', 'img[id^=join]', function(){

        $('img[id^=join]').click(function(event) {
            console.log("what is it the event?" +event);

            console.log($(event.target).attr("id"));
            var d = $(event.target).attr("id").charAt(4);
            d = parseInt(d);
            //console.log(d);
            //$('.info2').html(idList[d]['course']);
            console.log("What is the id" + idList[d]);



            db.collection('Groups').doc(idList[d]).onSnapshot(function (snap) {
                console.log("current data is ...", snap.data());
                document.getElementById("course" + d).innerHTML = snap.data().course;
                console.log(snap.data().course);
                $('.info3').html("<br>" + courseName(d, snap.data().course));
                $('.info2').html( groupName(d, snap.data().groupName));
                
                document.getElementById("groupName" + d).innerHTML = snap.data().groupName;
                document.getElementsByClassName("author")[0].innerHTML = snap.data().createdBy;
                document.getElementsByClassName("textDetails")[0].innerHTML = snap.data().details;
                document.getElementById("time").innerHTML = snap.data().time;
            });

            
            $('.detailsOfGroups').show(200);
                    $('.detailsOfGroups').css({
                        'z-index': '1',
                        'position' : 'absolute'
                    });
                    $('.info1').html("<span id='close'>close</span>");
                    $('#mapid').css({
                        'z-index': '-2',
                    });
      
            
            
        });
    });
});



$(document).ready(function() {
    $(document).on('click', '#joinButton', function(){
        
        
              
            $('#confirm').show(200);
        
        $('#confirm').css({
                        'z-index': '1',
                        'position' : 'absolute'
                    });
                    $('#mapid').css({
                        'z-index': '-2',
                    });
        
    })
})



///////////////////////////////////////////////////////
////////////These are manually entered in, no database
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


//$(document).ready(function() {
// $(document).on('click', 'img[src$="orange icon.png"]', function(){


////////
////////Hide the pop up window
            $(document).ready(function() {
                $(document).on('click', '#close', function(){
                    $('.detailsOfGroups').hide(200);
                    $('#mapid').css({
                        'z-index': '2'
                    });
                });
            });



