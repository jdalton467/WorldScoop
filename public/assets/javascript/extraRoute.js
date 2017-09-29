

module.exports = function(){
	$.post("profile/saveduser", function(data){
	console.log(data.article);
	var article = data.article
	savedArticles(article);
})


function savedArticles(article){
	for(var i = 0; article.length; i++){
		var reqData = {_id:article[i]};
		$.post('profile/savedarticle', reqData,function(data){
			console.log(data);
		})
		i++;
	}
}
}