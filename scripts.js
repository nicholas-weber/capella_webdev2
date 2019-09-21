var navigationHTML = 
`
  <nav>
    <h2>Smart <span>Home</span></h2>
    <a href="https://nikkoweber.github.io/capella_web_application_dev2/index.html">Geolocation</a>
    <a href="https://nikkoweber.github.io/capella_web_application_dev2/interests.html">Interests</a>
  </nav>
`;

function onLoad() {
    document.getElementById("nav").innerHTML = navigationHTML;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console
        });
      } else {
        console.log("not supported");
      }
}

function showPosition(position) {
    console.log(position);
}

function showElectronicsStores(position) {
    location = { lat: position.coords.latitude, lng: position.coords.longitude };
    radius = document.getElementById("radius").value;
    storeList = document.getElementById("storeList");

    var request = {
        location,
        radius,
        type: ['electronics_store']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        var store;
        console.log(results);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                createMarker(results[i]);

                store = `
                    <td>
                        <a href="#" onclick="showDirections()"></a>
                    </td>
                `
            }
        }
    });
}