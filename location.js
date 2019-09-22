var currentLocation;
var stores;
var storeList;
var storeList = document.getElementById("storeList");

var radiusElement = document.getElementById("radius");
var radius = radiusElement.value;

function onLoad() {
    document.getElementById("nav").innerHTML = 
    `
        <nav>
            <h2>Smart <span>Home</span></h2>
            <a href="https://nikkoweber.github.io/smart_home/index.html">Geolocation</a>
            <a href="https://nikkoweber.github.io/smart_home/interests.html">Gallery</a>
        </nav>
    `;

    radius = parseInt(localStorage.getItem("radius"));
    stores = localStorage.getItem("stores");
    currentLocation = localStorage.getItem("currentLocation") ? JSON.parse(localStorage.getItem("currentLocation")) : "";

    if (radius && stores) {
        storeList.innerHTML = stores;
        radiusElement.value = radius;
    } else {
        stores = "";
        radiusElement.value = 15;
        radius = 15;
    }
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(showElectronicsStores);
}

function showElectronicsStores(position) {
    currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
    localStorage.setItem("currentLocation", JSON.stringify(currentLocation));
    localStorage.setItem("radius", radius);
    stores = "";

    var request = {
        location: currentLocation,
        radius: radius * 1500,
        type: ['electronics_store']
    };
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: currentLocation });

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        var store;
        console.log(results);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                var lat = place.geometry.location.lat();
                var lng = place.geometry.location.lng();
                store = 
                `
                    <tr>
                        <td>
                            <a onclick="showDirections(${lat}, ${lng})">${place.name}</a>
                        </td>
                    </tr>
                `
                stores = stores + store;
            }
            storeList.innerHTML = stores;
            localStorage.setItem("stores", stores);
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


