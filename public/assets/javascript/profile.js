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
var description;
var url;
var queryURL;

const length = 60;

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
	console.log(response.sources[i].id);
	console.log(response.sources[i].name);
	console.log("======================");
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
        console.log(queryURL);
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
$.ajax({
url: queryURL,
method: "GET"
}).done(function(response) {
console.log(response.articles);
for(var i = 0; i < response.articles.length; i++){
	console.log(response.articles[i].author);
	console.log(response.articles[i].title);
	console.log(response.articles[i].urlToImage);
	console.log("----------------------------");
		attr = response.articles[i].urlToImage;
		title = response.articles[i].title;
		desc = response.articles[i].description;
		url = response.articles[i].url;


		
		var newCard = $('<div/>',{
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
		
		
		cardHead.append(headline);
		newCard.append(cardHead);
		a.append(newImg);
		newCard.append(a);
		cardDiv.append('<p>' + desc + '</p>');
		newCard.append(cardDiv);
		
		// if(i === 0 ){
			
		// }

	
		$('.bipsum').append(newCard);
		$('.bipsum').append('<br>');
}
});
};