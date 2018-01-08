var weather = [];

//Weather api

var fetch = function () {
    var cityInput = $('#city-input').val();
    $('#city-input').val("");
    $.ajax({
        method: "GET",
        url: ("http://api.apixu.com/v1/current.json?key=33ae1dd56e1a476099b93632180701&q=" + cityInput),
        success: function (data) {
            console.log(data);
            var weatherObject = {
                city: data.location.name,
                cel: data.current.temp_c,
                far: data.current.temp_f,
                date: data.current.last_updated,
                comments: []
            };
            saveWeatherRes(weatherObject);
            renderPage();
            // $('.city-name').append(data.location.name);
            // $('.cel-far').append(data.current.temp_c + " / " + data.current.temp_f + " on " + data.current.last_updated);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

//invoke weather api on click
$('.get-temp').on('click', fetch);

function renderPage() {
    //empty + display everything
    $('.weather-list').empty();
    var source = $('#weather-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < weather.length; i++) {
        var newHTML = template(weather[i])        
        $('.weather-list').append(newHTML);

    }
}

function saveWeatherRes(data) {
    weather.push(data);
}

$('.weather-list').on('click', '.add-comment', function () {
    var newComment = $(this).parents('.input-group').find('.weather-comment').val()//$('.weather-comment').val();
    var thisCity = $(this).parents('.current-weather').data().name;
    var thisCityIndex = $(this).parents('.current-weather').index();
    for (var i = 0; i < weather.length; i++) {
        if (thisCity ===  weather[i].city) {
        weather[i].comments.push(newComment);
        }
        renderPage();
    }
});

$('.weather-list').on('click', '.delete-comments', function () {
    $(this).closest('.current-weather').empty();
    var deleteIndex = $(this).parents('.current-weather').index();
    weather.splice(index, 1);  
});