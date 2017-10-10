$(document).ready(function() {
    $('.dropdown-toggle').dropdown();
    $('.carousel').carousel();
    $('.carousel').carousel({
        interval: 2000
    });
    $().button('toggle');
});






var sourceName;
var attr;
var title;
var desc;
var url;
var APIkey = "072ec970f018e214273ac354bb30b066";
var queryURL = "https://newsapi.org/v1/articles?source=abc-news-au&apiKey=5d9f7c67d4384f35bd73aa91efca8a73";

const length = 60;
var savedArr = [];

function getNews() {
    $('.secondbipsum').empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var checkArr = [];
        for (var i = 0; i < response.articles.length; i++) {
            // console.log(response.articles[i].author);
            // console.log(response.articles[i].title);
            // console.log(response.articles[i].urlToImage);
            // console.log("----------------------------");
            attr = response.articles[i].urlToImage;
            title = response.articles[i].title;
            desc = response.articles[i].description;
            url = response.articles[i].url;



            var newCard = $('<div/>', {
                name: url,
                class: 'card',
                id: 'profcard'

            });
            var cardHead = $('<div/>', {
                class: 'card-header'
            });
            var headline = $('<h4/>', {
                text: title
            });
            var newImg = $('<img/>', {
                class: 'card-img-top',
                src: attr,
                alt: 'Card image cap'
            });
            var a = $("<a/>", {
                href: url
            });
            var cardDiv = $('<div/>', {
                class: 'card-block'
            });
            var save = $('<button/>', {
                class: 'btn btn-link',
                name: title,
                id: url,
                type: 'submit',
                value: 'Submit',
                text: 'save',
                click: function(event) {
                    event.preventDefault();
                    var reqData = {
                        title: this.name,
                        article: this.id
                    };
                    $.post('/profile', reqData, function(data) {
                        console.log(data);

                        closeMaker(data); //making close buttons
                        savedArr.push(data.title);

                    })
                    $(this).text("saved");
                    $(this).attr('disabled', true);
                }


            });


            console.log("promise test");
            console.log(title);
            console.log(savedArr[i]);
            if (savedArr.indexOf(title) != -1) {
                console.log(title + " **saved**");
                save.text('saved');
                save.attr('disabled', true);
            } else {
                console.log(title + " **not saved**")
            }

            // console.log(saved);
            // console.log(savedArr.length);

            // save.text("save");
            // save.attr('disabled', false);
            // }


            cardHead.append(headline);
            a.append(newImg);
            cardDiv.append(a);
            newCard.append(cardHead);
            newCard.append(cardDiv);
            newCard.append('<p>' + desc + '</p>');
            newCard.append(save);
            

             $('.secondbipsum').append('<br>');
            $('.secondbipsum').append(newCard);
           
        }
    });

};



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
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial&APPID=" + APIkey,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        console.log(response.main);
        console.log(response.weather);
        var place = $('<p>' + "current weather for " + response.name + '</p>');
        var desc = $('<p>' + "description: " + response.weather[0].description + '</p>');
        var temp = $('<p>' + "temp: " + response.main.temp + " F" + '</p>');
        var humidity = $('<p>' + 'humidity: ' + response.main.humidity + '</p>');
        $('#rightside').append(place).append(desc).append(temp).append(humidity);

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
                sourceName = this.text;
                getNews();
            }
        });
        $('.dropdown-menu').append(newSource);

    }

});

