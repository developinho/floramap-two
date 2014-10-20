

                $(document).ready(function() {
                    findMe();
                });

                function findMe() {
                    function success(position) {
                        var s = document.querySelector('#map');

                        var mapcanvas = document.createElement('div');
                        mapcanvas.id = 'mapcanvas';
                        mapcanvas.style.height =  '410px';

                        document.querySelector('#map').appendChild(mapcanvas);

                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        var myOptions = {
                            zoom: 17,
                            center: latlng
                        };

                        var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
                        var image = 'img/marker.png';
                        var contentString = '<div id="content"> <h4>Hello</h4>' +
                                'Well, this is just a little test with popups and markers. See ya!</div>';

                        var infowindow = new google.maps.InfoWindow({
                            content: contentString
                        });

                        var marker = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            title: 'You are here! (at least within a ' + position.coords.accuracy + ' meter radius)',
                            icon: image
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map, marker);
                        });

                    }

                    function error(msg) {
                        var s = document.querySelector('#map');
                        s.innerHTML = typeof msg == 'string' ? msg : "failed";
                        s.className = 'fail';

                        // console.log(arguments);
                    }

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(success, error);
                    } else {
                        error('not supported');
                    }

                }