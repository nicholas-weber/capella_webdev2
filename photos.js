function findPhotos() {
    var script = document.createElement('script');

    script.src = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="
        + document.getElementById("parameters").value;

    document.querySelector('head').appendChild(script);
    // getToken();
    boardSearch(); 

    PDK.init({
        appId: "5056103943636043675", // Change this
        cookie: true
    });
    
    PDK.login({ scope : 'read_relationships,read_public' }, function(response){
        if (!response || response.error) {
           alert('Error occurred');
        } else {
           console.log(JSON.stringify(response));
        }
    });

    //get board info
    var pins = [];
    PDK.request('/v1/me/', function (response) {
      if (!response || response.error) {
        //alert('Error occurred');
      } else {
        console.log(JSON.stringify(response));
          //  alert('success');
            console.log(PDK.getSession().accessToken);

            var yahoo = $( "#result" ).load( "https://api.pinterest.com/v1/me/?access_token="+PDK.getSession().accessToken+"&fields=counts" );
            console.log(yahoo);
            PDK.logout();
      }
    });
}

function jsonFlickrFeed(data) {
    var image = "";
    data.items.forEach(function (element) {
        image += `<img src=" ${element.media.m} "/>`
    });

    document.getElementById("flikr").innerHTML = image;
}


function boardSearch() {
    var boards = [];
    PDK.request('/v1/me/boards/', function (response) { // Make sure to change the board_id
        console.log(response);
        if (!response || response.error) {
            alert('Error occurred');
        } else {
            boards = boards.concat(response.data);
            if (response.hasNext) {
                response.next(); // this will recursively go to this same callback
            }
        }
    });
}

// function getToken() {
//     fetch('https://api.pinterest.com/oauth/?esponse_type=code&redirect_uri=https://nikkoweber.github.io/capella_web_application_dev2/photos.html&client_id=5056103943636043675&scope=read_public,write_public&state=768uyFys')
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (myJson) {
//             console.log(JSON.stringify(myJson));
//         });
// }

// 5056103943636043675
// Secret: 488e7944aa97f580cd72f575c2aeafaa254a6623f8c9e6984c5ae86d0a0e1f21
