

$("#searchBtn").on("click", function (event) {
  event.preventDefault()
  var search = $("#search").val()
  displayDashboard(search)

})



function displayDashboard(search) {

  $(".cityName").empty()
  $(".temp").empty()
  $(".humid").empty()
  $(".wind").empty()
  $(".uvIndex").empty()
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + search + "&units=imperial&appid=be1b169467169d90c80bf8e15505026c").then(function (response) {
    return response.json()
  }).then(function (data) {
    console.log(data);
    var weatherIcon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    console.log(weatherIcon);
    // $('.cityName').append('src', weatherIcon);

    var weatherImage = $("<img>").attr("src", weatherIcon)

    var today = "(" + new Date().toLocaleDateString() + ")"



    console.log(today)

    var location = " " + data.name;
    $('.cityName').append(location, today, weatherImage);
    var temp1 = " " + data.main.temp + "°" + "F";
    $('.temp').append(temp1);

    var humid1 = " " + data.main.humidity + "%";
    $('.humid').append(humid1)

    var wind1 = " " + data.wind.speed + " MPH";
    $('.wind').append(wind1);



    fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=be1b169467169d90c80bf8e15505026c")
      .then(function (response) {
        return response.json()
      }).then(function (uvIndex) {
        console.log(uvIndex);


        var uvIndex = "" + uvIndex.value;
        $('.uvIndex').append(uvIndex)
      });

  })
  console.log("https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&units=imperial&appid=be1b169467169d90c80bf8e15505026c")
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&units=imperial&appid=be1b169467169d90c80bf8e15505026c")
    .then(function (response) {
      return response.json()
    }).then(function (week) {
      console.log(week);


      for (let i = 0; i < week.list.length; i++) {
        if (week.list[i].dt_txt.includes("06:00:00")) {

          var weatherIcon = week.list[i].weather[0].icon
            weatherIcon = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
          var weatherImage = $("<img>").attr("src", weatherIcon)

          var today = "(" + moment(week.list[i].dt, "X").format("MM/DD/YYYY") + ")"
          

         $(".card-deck").append(`
        
          <div class="card" style="width: 18rem; ">
          <img src= ${weatherIcon}>
          <div class="card-body bg-primary text-white">
            <h5 class="card-title">${today}</h5>
            <h5 class="temp">Temperature</h5>
            <p class="humid">Humidity</p>
          </div>
        </div>
       
       

         `)
           

          
        }

      }

      // $('.cityName').append('src', weatherIcon);


    })






}

displayDashboard()

function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

empty().onclick()
