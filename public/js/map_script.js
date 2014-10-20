
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';

var grayscale = L.tileLayer(mbUrl, {id: 'floramap.jppahgl2', attribution: mbAttr}),
        streets = L.tileLayer(mbUrl, {id: 'examples.map-i875mjb7', attribution: mbAttr});


var map = L.map('map', {
    zoom: 10,
    minZoom: 2,
    zoomControl: false,
    layers: [grayscale, streets]
});

var baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets
};


/**
 * This function add the markers which are saved in the database
 **/
function addPlantMarkers() {
    var plantList = new PlantCollection();

    plantList.fetch({success: function() {
            plantListSaved = plantList.toJSON();
            for (var i = 0; i < plantListSaved.length; i++) {

                var lat = plantListSaved[i].latitude;
                var lng = plantListSaved[i].longitude;
                
                var popup_content = "<div class='popup_marker'><strong class='title_popup_marker'>"+plantListSaved[i].name+"</strong>"
                                    +"<p>"+plantListSaved[i].description+"</p></div>";
                
                var popup_title = plantListSaved[i].name;
                var iconMarker = L.icon({
                                    iconUrl: '/img/marker_plants_black.png',
                                    iconSize: [35, 35], // size of the icon
                                    iconAnchor: [17, 39], // point of the icon which will correspond to marker's location
                                    popupAnchor: [0, -26] // point from which the popup should open relative to the iconAnchor
                                });
                
                // Add the new marker
                var m = L.marker([lat, lng],{icon: iconMarker, draggable: true,})
                                .addTo(map)
                                .bindPopup(popup_content)
                                .openPopup();

                // Add the id to the marker
                m._markerID = plantListSaved[i]._id;

                // Add an event which will get the marker ID
                map.on('popupopen', function(e) {
                    if(e.popup._source._markerID != undefined)
                        console.log(e.popup._source._markerID);
                });
            }


        }});
}



/**
 * This function add new controls to the map
 */
function addControls() {
    // Add the zoom control on the top right position
    new L.Control.Zoom({position: 'topleft'}).addTo(map);

    // Add options of layers 
    new L.control.layers(baseLayers).addTo(map);


    // Add new custom control to the map. It will get the current user location 
    L.Control.CurrentPosition = L.Control.extend({
        options: {
            position: 'topleft',
        },
        onAdd: function(map) {
            var controlDiv = L.DomUtil.create('div', 'leaflet-control-command');
            L.DomEvent
                    .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
                    .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
                    .addListener(controlDiv, 'click', function() {
                        mylocation();
                    });

            var controlUI = L.DomUtil.create('div', 'glyphicon glyphicon-home leaflet-control-command-interior', controlDiv);
            controlUI.title = 'Where am I?';
            return controlDiv;
        }
    });

    new L.Control.CurrentPosition({}).addTo(map);
}


function mylocation() {
    map.locate({setView: true, maxZoom: 12});
}


function onLocationFound(e) {
    var radius = e.accuracy / 2;

    var iconMarker = L.icon({
        iconUrl: '/img/marker_you.png',
        iconSize: [35, 35], // size of the icon
        iconAnchor: [17, 39], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -26] // point from which the popup should open relative to the iconAnchor
    });

    var popup = '<div class="popup_marker">You are <strong>here!</strong></div>';
   // var marker = L.marker(e.latlng, {icon: iconMarker}).addTo(map);
    var marker = L.marker(e.latlng, {icon: iconMarker}).addTo(map).bindPopup(popup).openPopup();

    marker.on('click', markerClick);
}

function onLocationError(e) {
    alert(e.message);
}

// Click on the marker
function markerClick(e) {
    var coord = e.latlng;
    fillFieldsLatlng(coord)
}

function fillFieldsLatlng(coord) {
    $(document).ready(function() {
        var latfield = $('#plant-view-form #latitude');
        var lngfield = $('#plant-view-form #longitude');

        if ((latfield.length > 0) && (lngfield.length > 0)) {
            latfield.val(coord.lat);
            lngfield.val(coord.lng);
        }
    })
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 12});

addPlantMarkers();
addControls();