var currentLocation;
var radius;
var storeList;

function getLocation() {
    navigator.geolocation.getCurrentPosition(showElectronicsStores);
}

function showElectronicsStores(position) {
    currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
    radius = document.getElementById("radius").value * 1500;
    storeList = document.getElementById("storeList");

    var request = {
        location: currentLocation,
        radius,
        type: ['electronics_store']
    };
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: location });

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        var store;
        var stores = "";
        console.log(results);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                var lat = place.geometry.location.lat();
                var lng = place.geometry.location.lng();
                store = `
                <tr>
                    <td>
                        <a href="#" onclick="showDirections(${lat}, ${lng})">${place.name}</a>
                    </td>
                </tr>
                `
                stores = stores + store;
            }
            storeList.innerHTML = stores;
        }
    });
}

function showDirections(lat, lng) {
    var destinationRequest = {
        origin: currentLocation,
        destination: { lat, lng },
        travelMode: 'DRIVING'
    }

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setPanel(document.getElementById('directionsPanel'));
    directionsService.route(destinationRequest, (response, status) => {
        if (status == 'OK') {
            var directionsList = document.getElementById("directionsList");
            var steps = response.routes[0].legs[0].steps;
            var runningList = '';

            for (var ct = 0; ct < steps.length; ct++) {
                runningList = runningList + `<li>${response.routes[0].legs[0].steps[ct].instructions}</li>`;
            }
            directionsList.innerHTML = runningList;
        }
    });
}

