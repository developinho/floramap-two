
function test(){
alert("OK");
}

		
        var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
	   
        var grayscale   = L.tileLayer(mbUrl, {id: 'floramap.jppahgl2', attribution: mbAttr}),
		    streets  = L.tileLayer(mbUrl, {id: 'examples.map-i875mjb7',   attribution: mbAttr});


		var map = L.map('map', {
			zoom: 10,
            zoomControl: false,
			layers: [grayscale, streets]
		});

		var baseLayers = {
			"Grayscale": grayscale,
			"Streets": streets
		};

        // Add the zoom control on the top right position
        new L.Control.Zoom({ position: 'topright' }).addTo(map);

        // Add options of layers 
        new L.control.layers(baseLayers).addTo(map);

		function onLocationFound(e) {
			var radius = e.accuracy / 2;
            
            var iconMarker = L.icon({
                iconUrl: '/img/marker.png',
                iconSize:     [33, 38], // size of the icon
                iconAnchor:   [17, 39], // point of the icon which will correspond to marker's location
                popupAnchor:  [-4, -32] // point from which the popup should open relative to the iconAnchor
            });
            
            var redMarker = L.AwesomeMarkers.icon({
                icon: 'coffee',
                markerColor: 'green'
            });
            
            var popup = L.popup()
                .setLatLng(e.latlng)
                .setContent('<p> <strong>You are here!</strong></p>');
            
            var marker = L.marker(e.latlng, {icon: redMarker}).addTo(map);
            marker.bindPopup(popup).openPopup();
            
			

		}

		function onLocationError(e) {
			alert(e.message);
		}



		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);

		map.locate({setView: true, maxZoom: 12});
