function findPhotos() {
    var script = document.createElement('script');

    script.src = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="
        + document.getElementById("parameters").value;

    document.querySelector('head').appendChild(script);
    PDK.init({
        appId: "5056103943636043675",
        cookie: true
    });
    PDK.login({ scope: 'read_relationships,read_public' }, function (response) {
        if (!response || response.error) {
            alert('Error occurred');
        } else {
            console.log(JSON.stringify(response));
        }
    });

    var boardListString = "";
    var boardString = "";
    PDK.request('/v1/me/boards/', function (response) { // Make sure to change the board_id
        console.log(response);
        if (!response || response.error) {
            // alert('Error occurred');
        } else {
            boards = boards.concat(response.data);
            // if (response.hasNext) {
            //     response.next(); // this will recursively go to this same callback
            // }
            for (var i = 0; i < boards.length; i++) {
                var board = boards[i];
                boardString = `
                <tr>
                    <td>
                        <a href="${boards.id[i].url}">${boards.id[0].name}</a>
                    </td>
                </tr>
                `
                boardListString = boardListString + boardString;
            }
            document.getElementById("pinterest").innerHTML = boardListString;
        }
    });

    //get board info
    var pins = [];
    PDK.request('/v1/me/', function (response) {
        if (!response || response.error) {
            // alert('Error occurred');
        } else {
            console.log(JSON.stringify(response));
            //    alert('success');
            console.log(PDK.getSession().accessToken);
            console.log(response);

            var call = $("#result").load("https://api.pinterest.com/v1/boards/board/" + document.getElementById("parameters").value + "/?access_token=" + PDK.getSession().accessToken + "&fields=name%2Curl");
            console.log(call);
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


// function boardSearch() {
//     var boards = [];
//     PDK.request('/v1/me/boards/', function (response) { // Make sure to change the board_id
//         console.log(response);
//         if (!response || response.error) {
//             alert('Error occurred');
//         } else {
//             boards = boards.concat(response.data);
//             if (response.hasNext) {
//                 response.next(); // this will recursively go to this same callback
//             }
//         }
//     });
// }

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

// boards.id[0].

// `<a href="${boards.id[0].url}">${boards.id[0].name}</a>`

/* <tr>
    <td>
        `<a href="${boards.id[0].url}">${boards.id[0].name}</a>`
    </td>
</tr> */