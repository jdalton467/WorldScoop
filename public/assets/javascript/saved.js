



$.post("profile/saveduser", function(data) {
    console.log(data.article);
    var article = data.article;
}).then(function(data) {
    console.log(data.article);
    var arr = [];

    for (var i = 0; i < data.article.length; i++) {

        $.post("profile/savedarticle", {
            _id: data.article[i]
        }, function(data) {
            // console.log(data);

            closeMaker(data); //making close buttons

            savedArr.push(data.title);
        });

    }




});





$.ajax({
    url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAwFfSMie364wTnCSYC53YSZSNgEZwF6Ws",
    method: "POST"
}).done(function(response) {
    console.log(response);
    console.log("lat: " + response.location.lat);
    console.log("long: " + response.location.lng)
    var lat = response.location.lat;
    var long = response.location.lng;
    getWeather(lat, long);
})

function getWeather(lat, long) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial&APPID=" + APIkey,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        console.log(response.main);
        console.log(response.weather);
        var place = $('<p>' + "current weather for " + response.name + '</p>');
        var desc = $('<p>' + "description: " + response.weather[0].description + '</p>');
        var temp = $('<p>' + "temp: " + response.main.temp + " F" + '</p>');
        var humidity = $('<p>' + 'humidity: ' + response.main.humidity + '</p>');
        $('#leftside').append(place).append(desc).append(temp).append(humidity);

    })
};









////////////////////////////////////

setTimeout(getNews, 1000); //calling the getNews function right away
///////////////////////////////////////////////////////////////////
//getting the sources from the api to 
//be used in subsequent ajax calls
$.ajax({
    url: "https://newsapi.org/v1/sources?language=en",
    method: "GET"
}).done(function(response) {
    console.log(response);
    console.log(response.sources.length);
    for (var i = 0; i < response.sources.length; i++) {

        id = response.sources[i].id;
        sourceName = response.sources[i].name;
        var newSource = $('<option/>', {
            class: 'dropdown-item',
            name: i,
            href: '#',
            value: id,
            text: sourceName,
            click: function(event) {
                $(".carousel-item").remove();
                var source = this.value;
                queryURL = "https://newsapi.org/v1/articles?source=" + source + "&apiKey=5d9f7c67d4384f35bd73aa91efca8a73";
                $(".btn").text(this.text);
                // console.log(queryURL);
                getNews();
            }
        });
        $('.dropdown-menu').append(newSource);

    }

});