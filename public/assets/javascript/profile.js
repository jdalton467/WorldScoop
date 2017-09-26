$(document).ready(function () {
$('.dropdown-toggle').dropdown();
$('.carousel').carousel();
$('.carousel').carousel({
interval: 2000
});
});






var sourceName;
var attr;
var title;
var desc;
var url;
var APIkey = "072ec970f018e214273ac354bb30b066";
var queryURL = "https://newsapi.org/v1/articles?source=abc-news-au&apiKey=5d9f7c67d4384f35bd73aa91efca8a73";

const length = 60;




// var lat;
// var long;
/////////weather api test//////////////////////////

/////////////googlemap api test/////////////////////

$.ajax({
	url:"https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAwFfSMie364wTnCSYC53YSZSNgEZwF6Ws",
	method: "POST"
}).done(function(response){
	console.log(response);
	console.log("lat: " + response.location.lat);
	console.log("long: " + response.location.lng)
	var lat = response.location.lat;
	var long = response.location.lng;
	getWeather(lat,long);
})

function getWeather(lat,long){
	$.ajax({
	url:"http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=imperial&APPID=" + APIkey,
	method: "GET"
}).done(function(response){
	console.log(response);
	console.log(response.main);
	console.log(response.weather);
	var place = $('<p>' + "current weather for " + response.name + '</p>');
	var desc =  $('<p>' + "description: " + response.weather[0].description + '</p>');
	var temp = $('<p>' + "temp: " + response.main.temp + " F" + '</p>');
	var humidity = $('<p>' + 'humidity: ' + response.main.humidity + '</p>');
	$('#leftside').append(place).append(desc).append(temp).append(humidity);

})
};













////////////////////////////////////

getNews();//calling the getNews function right away
///////////////////////////////////////////////////////////////////
//getting the sources from the api to 
//be used in subsequent ajax calls
$.ajax({
url:"https://newsapi.org/v1/sources?language=en",
method: "GET"
}).done(function(response) {
console.log(response);
console.log(response.sources.length);
for(var i = 0; i < response.sources.length; i++){
	// console.log(response.sources[i].id);
	// console.log(response.sources[i].name);
	// console.log("======================");
	// <a class="dropdown-item" href="#"></a>
	// <a class="dropdown-item" href="#"></a>
	// <a class="dropdown-item" href="#"></a>
	id = response.sources[i].id;
	sourceName = response.sources[i].name;
	 var newSource = $('<option/>',{
      class: 'dropdown-item',
      name: i,
      href: '#',
      value: id,
      text: sourceName,
      click: function (event){
       	$(".carousel-item").remove();
        var source = this.value;
        queryURL = "https://newsapi.org/v1/articles?source="+source+"&apiKey=5d9f7c67d4384f35bd73aa91efca8a73";
        $(".btn").text(this.text);
        // console.log(queryURL);
        getNews();
      }
    });
	$('.dropdown-menu').append(newSource);

}

});
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////






///////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
function getNews(){
$('.bipsum').empty();
$.ajax({
url: queryURL,
method: "GET"
}).done(function(response) {
// console.log(response.articles.length);
for(var i = 0; i < response.articles.length; i++){
	// console.log(response.articles[i].author);
	// console.log(response.articles[i].title);
	// console.log(response.articles[i].urlToImage);
	// console.log("----------------------------");
		attr = response.articles[i].urlToImage;
		title = response.articles[i].title;
		desc = response.articles[i].description;
		url = response.articles[i].url;


		var form = $('<form/>',{
		});
		var input = $('<input/>',{
			name: 'article',
			value: url,
			id: 'input'
		})
		var newCard = $('<div/>',{
			name: url,
			class: 'card'

		});
		var cardHead = $('<div/>',{
			class: 'card-header'
		});
		var headline = $('<h4/>',{
			text: title
		});
		var newImg = $('<img/>',{
			class: 'card-img-top',
			src: attr,
			alt: 'Card image cap'
		});
		var a = $("<a/>",{
			href: url
		});
		var cardDiv = $('<div/>',{
			class:'card-block'
		});
		var save = $('<button/>',{
			class: 'btn btn-link',
			id: url,
			type: 'submit',
			value: 'Submit',
			text: 'save for later?',
			click: function(event){
				var reqData = { article : this.id};
				$.post('/profile', reqData, function(data){
					console.log(data);
				})
			}

			
		});
		
		
		cardHead.append(headline);
		a.append(newImg);
		cardDiv.append(a);
		newCard.append(cardHead);
		newCard.append(cardDiv);
		newCard.append('<p>' + desc + '</p>');
		newCard.append(save);
		form.append(newCard);
		form.append(input);


		$('.bipsum').append(form);
		// $('.bipsum').append('<br>');
}
});
};