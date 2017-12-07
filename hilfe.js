<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Search for up to 200 places with Radar Search</title>
    <style>
        /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */

        #map {
            height: 100%;
        }

        /* Optional: Makes the sample page fill the window. */

        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
    <script>
        // This example requires the Places library. Include the libraries=places
        // parameter when you first load the API. For example:
        // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

        var map;
        var infoWindow;
        var service;

        function initMap() {
             google.maps.Map(document.getElementById('map'), {
                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: {
                            lat: -34.397,
                            lng: 150.644
                        },
                        zoom: 15

                    });
                    var infoWindow = new google.maps.InfoWindow({
                        map: map
                    });

                    // Try HTML5 geolocation.
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };


                            //infoWindow.setContent('Location found.');
                            map.setCenter(pos);
                            var marker = new google.maps.Marker({
                                position: pos,
                                map: map,
                                title: 'Hello World!'
                            });

                        }, function() {
                            handleLocationError(true, infoWindow, map.getCenter());
                        });
                    } else {
                        // Browser doesn't support Geolocation
                        handleLocationError(false, infoWindow, map.getCenter());
                    }

                }

                 service = new google.maps.places.PlacesService(map);

                // The idle event is a debounced event, so we can query & listen without
                // throwing too many requests at the server.
                map.addListener('idle', performSearch);
            }

            function performSearch() {
                var request = {
                    bounds: map.getBounds(),
                    keyword: 'best view'
                };
                service.radarSearch(request, callback);
            }

            function callback(results, status) {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    console.error(status);
                    return;
                }
                for (var i = 0, result; result = results[i]; i++) {
                    addMarker(result);
                }
            }

            function addMarker(place) {
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    icon: {
                        url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
                        anchor: new google.maps.Point(10, 10),
                        scaledSize: new google.maps.Size(10, 17)
                    }
                });

                google.maps.event.addListener(marker, 'click', function() {
                    service.getDetails(place, function(result, status) {
                        if (status !== google.maps.places.PlacesServiceStatus.OK) {
                            console.error(status);
                            return;
                        }
                        infoWindow.setContent(result.name);
                        infoWindow.open(map, marker);
                    });
                });
            }
    </script>
</head>

<body>
    <div id="map"></div>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8qziSi7bAVjWG6_vXZWu9eQxyRTVL7Y8&callback=initMap&libraries=places,visualization" async defer></script>
</body>
</html>