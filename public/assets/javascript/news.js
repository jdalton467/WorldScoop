function getNews() {
    $('.bipsum').empty();
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



            var form = $('<form/>', {});
            var input = $('<input/>', {
                name: 'article',
                value: url,
                id: 'input'
            })
            var newCard = $('<div/>', {
                name: url,
                class: 'card'

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
            form.append(newCard);
            form.append(input);


            $('.bipsum').append(form);
            // $('.bipsum').append('<br>');
        }
    });

};