$(document).ready(function() {
$('.dropdown-toggle').dropdown();


var source;
var sourceName;
var queryURL;
var newsTitle;
var newsImg;
var newsDesc;
var newsUrl;
var start = 0;


$.ajax({
    url: "https://newsapi.org/v1/sources?language=en",
    method: "GET"
}).done(function(response) {
    console.log(response);
    // console.log(response.sources.length);
    var length = response.sources.length;
    // console.log(length);
    // console.log(response.sources);
    const APIARTICLES = 60;
    for (var i = 0, arr = []; i < 10; i++) {
        var newNum = Math.floor(Math.random() * APIARTICLES);
        arr.push(newNum);
    }
    console.log("arr: " + arr);
    for (var i = 0, sourceIdArr = [], sourceNameArr = []; i < 10; i++) {
        sourceIdArr.push(response.sources[arr[i]].id);
        sourceNameArr.push(response.sources[arr[i]].name);
    }
    // console.log("sourceIdArr: " + sourceIdArr);
    // console.log("sourceNameArr: " + sourceNameArr);
    for (var i = 0; i < 10; i++) {

        source = sourceIdArr[i];
        sourceName = sourceNameArr[i];
        console.log(sourceName);
        queryURL = "https://newsapi.org/v1/articles?source=" + source + "&apiKey=5d9f7c67d4384f35bd73aa91efca8a73";
        // console.log(source);
        getNews(sourceName);
      
        // console.log(title)
    }
    // displayNews();

});









console.log(title);

function getNews(sourceName) {
    var title, desc, img, url;
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
    	source = response.source;
    	// console.log(response.articles[1]);

        title = response.articles[1].title;
        desc = response.articles[1].description;
        img = response.articles[1].urlToImage;
        url = response.articles[1].url;
    }).done(function() {

    	name = sourceName;
        newsImg = img;
        newsTitle = title;
        newsDesc = desc;
        newsUrl = url;
       
        


        var newDiv = $('<div/>', {
            class: 'carousel-item'
        });
        var newCard = $('<div/>', {
            class: 'card',
            id: 'frontcard'
            // class: 'frontcard'
        });
        var cardHead = $('<div/>', {
            class: 'card-header'
        });
        var headline = $('<h4/>', {
            text: name + ": " + newsTitle
        });
        var newImg = $('<img/>', {
            class: 'card-img-top',
            src: newsImg,
            alt: 'Card image cap'
        });
        var a = $("<a/>", {
            href: newsUrl
        });
        var cardDiv = $('<div/>', {
            class: 'card-block'
        });
        cardHead.append(headline);
        a.append(newImg);
        cardDiv.append(a);
        newCard.append(cardHead);
        newCard.append(cardDiv);
        newCard.append('<p>' + desc + '</p>');
        newDiv.append(newCard);
       
      
        if(start == 0){
        newDiv.addClass('active');
       }
       start++;
       console.log("start: " + start);


        $('.carousel-inner').append(newDiv);

    });


};





});




