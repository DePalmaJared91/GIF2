$(document).ready(function (){
    //======Array of Tech Terms======//
    var terms = ["HTML", "JavaScript", "jQuery", "Ajax", "React", "API", "CSS"] //add data this line//
    GIFArea = ""

    //===========Button Render========//
    //display data for developer terms//
    function renderButtons() {
        //removing buttons before adding new ones//
        $("developer-view").empty();
        //loop through array//
        for (var i = 0; i < developer.length; i++) {
            //dynamic buttonm generation for each in array//
            var a = $("<button>");
            //add class//
            a.addClass("terms");
            //adding a data attribute with a value at index i//
            a.attr("data-name", developer[i]);
            //provide button text with a value of the developer at index i
            a.text(developer[i]);
            //adding button to HTML//
            $("#developer-view").append(a);
        }
        s =
            $("#developer-input").focus();
        }
    renderButtons();

    //=====Click Button=====//

    $("#add-term").on("click", function () {
        //prevents for form trying to submit itself//
        //form is used so user can hit enter or click button//
        event.preventDefault();

        //grab text from input box//
        var dev = $("#developer-input").val().trim();
        //this terms from the textbox added to array
        terms.push(dev);
        //calling renderButtons which handles the processing of our dev array///
        renderButtons();
    });

    //======DISPLAY INFO======//
    $(document).on("click", "button", function () {
        //delete old terms prior to adding new terms===no repeat buttons// 
        $("#GIFArea").empty();
        var b = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=NGFDsivXOcENju5JyVStCveLIxqtSoSS"; //query api url and public key//
        console.log(queryURL);
        //standard ajax call to get request//
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            //after data returns from API//
            .done(function (response) {
                console.log(response);
                //storing array of results in the results variable//
                var results = response.data;
                //looping over every result item
                for (var i = 0; i < results.length; i++) {
                    //creating div with class item
                    var gifDiv = $('<div class="item">');
                    //create image tag//
                    var gifImage = $('<img>');
                    //giving the image tag an src attribute of a property pulled off the result item//
                    gifImage.attr('src', results[i].images.fixed_height_still.url)
                        .attr('data-still', results[i].images.fixed_height_still.url)
                        .attr('data-animate', results[i].images.fixed_height.url)
                        .attr('data-state', "still")
                        .addClass("showImage");
                    //display Image//
                    gifDiv.append(gifImage);
                    //prepend data not necessary//
                    $("#GIFArea").prepend(gifDiv);
                }
            });
    });

    //==========Still Animate Image==========//
    //listens for a click on any img//
    $(document).on('click', '.showImage', function () {
        var state = $(this).data('state');
        //If clicked image's state is still, update its src att to what the data-animate value is//
        if (state == "still") {
            console.log("still img works");
            //Then, set img data-state to animate
            $(this).attr('src', $(this).data('animate'))
                .data('state', 'animate');
        } else {
            //else set src to data-still value//
            console.log("animated image works");
            $(this).attr('src', $(this).data('still'))
                .data('state', still);
            }
        });
    });