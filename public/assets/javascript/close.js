

function closeMaker(data) {
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
        class: 'close',
        'aria-label': "Close",

        click: function(event) {
            event.preventDefault();
            $.post("/profile/delete",{title: p.text() ,article: this.id},function(data){
            	console.log(data);
            })

        }
    });
    var span = $('<span/>', {
        'aria-hidden': 'true',
        html: '&times;'
    });
    close.append(span);
    // a.after(close)
    a.append(p);
    a.prepend(close);

	$(".force-overflow").append(a);
}