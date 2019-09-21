function findInterests() {
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
            // alert('Error occurred');
        } else {
            // console.log(JSON.stringify(response));
        }
    });

    var boardListString = "";
    var boardString = "";
    PDK.request('/v1/me/boards/', function (response) {
        console.log(response);
        if (!response || response.error) {
            // alert('Error occurred');
        } else {
            var boards = response.data;
            for (var i = 0; i < boards.length; i++) {
                var board = boards[i];
                boardString = 
                `
                    <tr>
                        <td>
                            <a target="_blank" href="${boards[i].url}">${boards[i].name}</a>
                        </td>
                    </tr>
                `
                boardListString = boardListString + boardString;
            }
            document.getElementById("pinterest").innerHTML = boardListString;
        }
    });
}

function jsonFlickrFeed(data) {
    var image = "";
    data.items.forEach(function (element) {
        image += 
        `
            <img src=" ${element.media.m} "/>
        `
    });

    document.getElementById("flickr").innerHTML = image;
}