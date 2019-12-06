/////////////////////////////
//drop pins on the map
//////////////////////////////
dropPin();

////////////////////////////////////////////////////////////////////////////
//event listeners
//////////////////////////////////////////////////////////////////////////
$(document).on('click', '#close', closeAll);
$(document).on('click', '#no', closeAll);
$(document).on('click', '#yes', deletion);




////////////////////////////////////
//Setting up the map
///////////////////////////////////
var mymap = L.map('mapid').setView([49.2500, -123.0000], 17);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicHlvcG9seSIsImEiOiJjazJrdGhpc3owem8wM2VsYWk0cWs4eGFyIn0.FnpymVeZSR-Pif_eaOMI6w'
}).addTo(mymap);

/////////////////////////////////
///This is the original marker from the map developer
//L.marker([49.249697, -123.002586]).addTo(mymap)
//    .bindPopup('Comp1510<br>"Cram for Finals!!"<br><a href="http://www.bcit.ca">Join This Group</a>')
//    .openPopup();
///////////////////////////////////


/////////////////////////
//Custom icon
////////////////////////
var popup = L.popup();
var myIcon = L.icon({
    iconUrl: 'Images/Icon/orange icon.png',
    iconSize:     [40,45 ], // size of the icon
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -60] // point from which the popup should open relative to the iconAnchor
});


////////////////////////////////////////////////////////////////////////////
//Functions to create study group strings
//////////////////////////////////////////////////////////////////////////
// var join = '<img id =join src=Images/Icon/Join.png float=right>';

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
    var group = '<div id="group' + groupNumber + '">' + courseName(groupNumber, course) + groupName(groupNumber, nameOfGroup) 
    + '<img id =join' +groupNumber + ' src=Images/Icon/Join.png float=right>' + '</div>';
    return group;
}

///////////////////////////////////////////
//These are dummy groups as examples
//Example: var group = '<div class="group1">' + courseName('comp1510') + groupName('Finals Sprint') + join + '</div>';
///////////////////////////////////////////////
var group1 = createGroup(0, 'Comp1530', "Let's study");
var group2 = createGroup(1, 'Comp1712', "Finals Sprint");
var group3 = createGroup(2, 'comp1113', "Paul's group");
var group4 = createGroup(3, 'comm1116', "Report Discussion");
var group5 = createGroup(4, 'comp1712', "HELP!!!");
var group6 = createGroup(5, 'comp1536', "lab7");
var group7 = createGroup(6, 'comp1113', "Boolean Algebra");
var group8 = createGroup(7, 'comm1116', "Presentation");


////////////////////////////////////////////////////////////////////////////
//The pins on the map
//////////////////////////////////////////////////////////////////////////
//SE2
//L.marker([49.251434, -123.001143], {icon: myIcon}).addTo(mymap)
//    .bindPopup('<div class="iconPopup">' + group1 + group2 + group3 + '</div>')
//    .openPopup()
//;

//SW1
//L.marker([49.250853, -123.002758], {icon: myIcon}).addTo(mymap)
//    .bindPopup('<div class="iconPopup">' + group4 + group5 + group6 + group7 + group8 + '</div>')
//;
/////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////
//Variables
//////////////////////////////////////////////////////////////////////////

var idList = [];  //This is the arrayList for group ids
var idListSE2 = [];  //list for ids in SE2
var idListSE12 = [];  //list for ids in SE12


// objects representing pins
var markerSE12 = {};
var markerSE2 = {};


//variable for groups
var g = "";
var x = "";

console.log("this");
console.log(
db.collection("Groups").where());

////////////////////////////////////////////////////////////////////////////
//This checks if there are docs in Groups collection for SE2 or SE12,
//then drops pins at SE12 or SE2 accordingly
//////////////////////////////////////////////////////////////////////////

function dropPin(){
    //Refreshes all variables so no repeating divs will appear
    idList =[];
    idListSE12 = [];
    idListSE2 = [];
    g = "";
    x = "";
    db.collection("Groups").get().then(function(querySnapshot) {
        //This querySnapshot.empty is a boolean that returns true is the collection is empty(no docs)
        if (!querySnapshot.empty) {
            querySnapshot.forEach(function(doc) {
                let location = doc.data().location;
                if(location == "SE12") {
                    idListSE12.push(doc.id);
                }
                if(location == "SE2") {
                    idListSE2.push(doc.id);
                }
                idList.push(doc.id);
            });

            

            ////////////////////////////////////////
            ////There are two functions inside the drop pin function that regulate the two pins
            ////This one is for SE12
            /////////////////////////////////////////         
            let se12Size = idListSE12.length;
            function se12() {
                for (let i = 0; i < se12Size; i++) {
                    db.collection('Groups').doc(idListSE12[i]).onSnapshot(function (snap) {
                        var indexSe12 = idList.indexOf(idListSE12[i]);
                        g += createGroup(indexSe12, snap.data().course, snap.data().groupName);
                        if(i == se12Size -1) {
                            markerSE12 = new L.marker([49.25018, -123.001519], {icon: myIcon}).addTo(mymap)
                                .bindPopup('<div class="iconPopup">' + g + '</div>');
                            mymap.addLayer(markerSE12);
                        }
                    });
                };
            }

            ////////////////////////////////////////
            ////There are two functions inside the drop pin function that regulate the two pins
            ////This one is for SE2
            /////////////////////////////////////////
            let se2Size = idListSE2.length;
            function se2() {
                for (let i = 0; i < se2Size; i++) {
                    db.collection('Groups').doc(idListSE2[i]).onSnapshot(function (snap) {
                        var indexSe2 = idList.indexOf(idListSE2[i]);
                        x += createGroup(indexSe2, snap.data().course, snap.data().groupName);
                        if(i == se2Size -1 ) {
                            markerSE2 = new L.marker([49.251434, -123.001143], {icon: myIcon}).addTo(mymap)
                                .bindPopup('<div class="iconPopup">' + x + '</div>');
                            mymap.addLayer(markerSE2);
                        }
                    });
                };
            };
            ///////////////////////////////////
            //drop the two pins
            ///////////////////////////////////
            se2();
            se12();
        };
    });
};


////////////////////////////////////////////////////////////////////////////
//remove all pins
//////////////////////////////////////////////////////////////////////////
function remove() {
    mymap.removeLayer(markerSE12);
    mymap.removeLayer(markerSE2);
}


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

///////this happens when the first join button is clicked.
var d;
$(document).on('click', 'img[id^=join]', function(event){

    d = $(event.target).attr("id").charAt(4);
    d = parseInt(d);
    console.log("what is in the list: " + idList);
    console.log("What is the id---->" + idList[d]);
    console.log(d);
    //localStorage.setITem("key", d);
    //        d = localStorage///////
    db.collection('Groups').doc(idList[d]).onSnapshot(function (snap) {
        document.getElementById("course" + d).innerHTML = snap.data().course;
        $('.info3').html("<br>" + courseName(d, snap.data().course));
        $('.info2').html( groupName(d, snap.data().groupName));

        document.getElementById("groupName" + d).innerHTML = snap.data().groupName;
        document.getElementsByClassName("author")[0].innerHTML = snap.data().createdBy;
        document.getElementsByClassName("textDetails")[0].innerHTML = snap.data().details;
        document.getElementById("time").innerHTML = snap.data().time;
    });
    ////////////
    //show the group details popup window
    //////////
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




/////////////////////////////////////////////
//remove groups when the confirm yes buttons is clicked
/////////////////////////////////////////////////
function deletion() {
    let y = d;
    console.log("thi is the current i d --->" +y);
    console.log(idList[y]);
    db.collection("Groups").doc(idList[y]).delete().then(function() {
        console.log(idList[y]);
        console.log("Document successfully deleted!");
        closeAll();
        $("#group" + y).remove();
        remove();
        dropPin();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
        remove();
        dropPin();
    });
}

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






////////////////////////////////////////////////////////////////////////////
//END OF DOCUMENT
//////////////////////////////////////////////////////////////////////////

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




