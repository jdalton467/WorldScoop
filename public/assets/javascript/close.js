

function closeMaker(data) {
	console.log("data below");
	console.log(data);
    var a = $("<a/>", {
        href: data.article,
        class: 'savedAnchor'
    });
    var p = $("<p/>", {
        text: data.title
    });
    var close = $('<button/>', {
        type: 'button',
        id: data.article,
        value: data._id,
        class: 'close',
        'aria-label': "Close",

        click: function(event) {
            event.preventDefault();
            $.post("/profile/delete",{_id: data._id, title: p.text() ,article: this.id},function(data){
            	console.log(data);
            	savedArr.splice(savedArr.indexOf(p.text()),1);

            	getNews();
            });
            a.remove();
            close.remove();



        }
    });
    var span = $('<span/>', {
        'aria-hidden': 'true',
        html: '&times;'
    });
    close.append(span);
    // a.after(close)
    p.append( '<p>'+ "(" + sourceName + ")" + '</p>');
    a.append(p);
    a.prepend(close);
   

	$(".force-overflow").append(a);
}