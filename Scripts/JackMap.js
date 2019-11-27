

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




////////////////////////////////////////////////////////////////////////////
//This checks if there are docs in Groups collection, then drops a pin at SE12
//////////////////////////////////////////////////////////////////////////


//This is the arrayList for group ids
var idList = [];
var idListSE2 = [];
var idListSE12 = [];

function dropPin(){
    idList =[];
db.collection("Groups").get().then(function(querySnapshot) {
    //This querySnapshot.empty is a boolean that returns true is the collection is empty(no docs)
    if (!querySnapshot.empty) {
        //var size = querySnapshot.size;
        
        querySnapshot.forEach(function(doc) {
            //console.log(doc.id, " => ", doc.data().course);
            console.log(doc.data().location);
            let location = doc.data().location;
            if(location == "SE12") {
                idListSE12.push(doc.id);
            }
            if(location == "SE2") {
                idListSE2.push(doc.id);
            }
            idList.push(doc.id);
        });

        let se2Size = idListSE2.length;
        let se12Size = idListSE12.length;
        var g = "";
        
        console.log(se12Size);
        for (let i = 0; i < se12Size; i++) {
            db.collection('Groups').doc(idListSE12[i]).onSnapshot(function (snap) {
                //console.log(snap.data().course);
                var indexSe12 = idList.indexOf(idListSE12[i]);
                g += createGroup(indexSe12, snap.data().course, snap.data().groupName);
                //SE12
                L.marker([49.25018, -123.001519], {icon: myIcon}).addTo(mymap)
                    .bindPopup('<div class="iconPopup">' + g + '</div>');
            });
        };
        //console.log(idListSE2);
       // console.log(" The first g?" + g);
        for (let i = 0; i < se2Size; i++) {
       // console.log(" The second g?" + g);
            db.collection('Groups').doc(idListSE2[i]).onSnapshot(function (snap) {
                g = "";
               // console.log("what is g the third time " + g);
                var indexSe2 = idList.indexOf(idListSE2[i]);
                g += createGroup(indexSe2, snap.data().course, snap.data().groupName);
                //SE2
               // console.log("what is g the fourth time" + g);
                L.marker([49.251434, -123.001143], {icon: myIcon}).addTo(mymap)
                    .bindPopup('<div class="iconPopup">' + g + '</div>');
                //console.log(g);
            });
        };
        
        //SE2
//L.marker([49.251434, -123.001143], {icon: myIcon}).addTo(mymap)
//    .bindPopup('<div class="iconPopup">' + group1 + group2 + group3 + '</div>')
//    .openPopup()
//;;
    };
});
};

dropPin();

////////////////////////////////////////////////////////////////////////////
//tells the longitute and latitue
//////////////////////////////////////////////////////////////////////////

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}




////////////////////////////////////////////////////////////////////////////
//This adds groups automatically
//////////////////////////////////////////////////////////////////////////

//this happens when the first join button is clicked.
$(document).ready(function() {
    $(document).on('click', 'img[id^=join]', function(){

        $('img[id^=join]').click(function(event) {
            //console.log("what is it the event?" +event);
            //console.log($(event.target).attr("id"));
            var d = $(event.target).attr("id").charAt(4);
            d = parseInt(d);
            //console.log("What is the id" + idList[d]);

            db.collection('Groups').doc(idList[d]).onSnapshot(function (snap) {
                document.getElementById("course" + d).innerHTML = snap.data().course;
                $('.info3').html("<br>" + courseName(d, snap.data().course));
                $('.info2').html( groupName(d, snap.data().groupName));

                document.getElementById("groupName" + d).innerHTML = snap.data().groupName;
                document.getElementsByClassName("author")[0].innerHTML = snap.data().createdBy;
                document.getElementsByClassName("textDetails")[0].innerHTML = snap.data().details;
                document.getElementById("time").innerHTML = snap.data().time;
            });
            
            //////////////////
            //show the group details popup window
            $('.detailsOfGroups').show(200);
            $('.detailsOfGroups').css({
                'z-index': '1',
                'position' : 'absolute'
            });
            $('.info1').html("<span id='close'>close</span>");
            $('#mapid').css({
                'z-index': '-2',
            });
            
            //////////
            //remove groups when the confirm yes buttons is clicked
            $(document).on('click', '#yes', function() {
                db.collection("Groups").doc(idList[d]).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                //close all windows.
                closeAll();
                $("#group" + d).remove();
                //drop a new pin to refresh all divs.
                dropPin();
                console.log(idList);
            });
        });
    });
});


////////////////////////////////////////////////////////////////////////
///This shows the delete groups confirm popup window
///////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $(document).on('click', '#joinButton', function(){
        $('#confirm').show(200);
        $('#confirm').css({
            'position' : 'absolute'
        });
        $('#mapid').css({
            'z-index': '-2',
        });
    })
})




////////////////////////////////////////////////////////////////////////////
//This is the function to close popup windows
//////////////////////////////////////////////////////////////////////////
function closeAll(){
    $('.detailsOfGroups').hide(200);
    $('#confirm').hide(200);
    $('#mapid').css({
        'z-index': '2'
    });
};

$(document).on('click', '#close', closeAll);
$(document).on('click', '#no', closeAll);

