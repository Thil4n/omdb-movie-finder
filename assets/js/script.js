const load_film_data = (movie_id) => {

    $.ajax({
        type: "GET",
        url: "https://www.omdbapi.com/?i="  + movie_id  + "&apikey=1c267eb1",
        contentType: "text/xml",
        crossDomain: true,
        dataType: "jsonp",
        success: function (data, status, xhr) {
            if (data.Response == "True") {
                $("#modal_title").text(data.Title);
                $("#modal_text").text(data.Plot);

                $("#director_detail").text(data.Director);
                $("#year_detail").text(data.Year);
                $("#run_time_detail").text(data.Runtime);
                $("#country_detail").text(data.Country);


                $("#modal_image").attr("src", data.Poster);

                $("#movie_modal").modal("show");

            } else {
                swal({
                    title: "Not found!",
                    text: "Movie not found!",
                    icon: "info",
                    button: "Close",
                });
            }
        },
        error: function (xhr, status, error) {
            swal({
                title: "Error!",
                text: "Error while connecting the API!",
                icon: "error",
                button: "Close",
            });
        },
    });



};

$(document).ready(() => {



    $("#button").click((e) => {
        e.preventDefault();

        const search_str = $("#search_str").val();

        if (!search_str.length) {
            swal({
                title: "Erorr!",
                text: "Please input the word!",
                icon: "error",
                button: "Close",
            });
        } else if (search_str.length < 3) {
            swal({
                title: "Erorr!",
                text: "Please insert atleset three letters!",
                icon: "error",
                button: "Close",
            });
        } else {
            $.ajax({
                type: "GET",
                url: "https://www.omdbapi.com/?s="  + search_str  + "&apikey=1c267eb1",
                contentType: "text/xml",
                crossDomain: true,
                dataType: "jsonp",
                success: function (data, status, xhr) {
                    if (data.Response == "True") {
                        let innerHtml = "";

                        data.Search.forEach((element) => {
                            innerHtml +=
                                '<div class="col-3"><div class="card mx-auto" style="width: 18rem;">';
                            innerHtml +=
                                '<img class="card-img-top" src="' +
                                element.Poster +
                                '" alt="Card image cap">';
                            innerHtml += '<div class="card-body">';
                            innerHtml +=
                                '<h5 class="card-title">' +
                                element.Title +
                                "</h5>";

                            innerHtml +=
                                '<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus';
                            innerHtml +=
                                "erat et aliquet fermentum, tortor turpis tempor ex, pellentesque bibendum felis dolor</p>";
                            innerHtml +=
                                "<div class=\"d-flex justify-content-center\"><button onclick=\"load_film_data('" +
                                element.imdbID +
                                '\');" class="mx-auto btn view-btn">View</button></div>';
                            innerHtml += "</div>";
                            innerHtml += "</div>";
                            innerHtml += "</div>";
                        });

                        $("#movie_list").html(innerHtml);
                    } else {
                        swal({
                            title: "Not found!",
                            text: "Not found any movie!",
                            icon: "info",
                            button: "Close",
                        });
                    }
                },
                error: function (xhr, status, error) {
                    swal({
                        title: "Error!",
                        text: "Error while connecting the API!",
                        icon: "error",
                        button: "Close",
                    });
                },
            });
        }
    });
});
