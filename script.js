fetch("http://api.openweathermap.org/data/2.5/weather?q=LasVegas&units=imperial&appid=be1b169467169d90c80bf8e15505026c").then(function(response){
    return response.json()
}).then(function(data){
    console.log(data);
    var weatherIcon= "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    console.log(weatherIcon);
    // $('.cityName').append('src', weatherIcon);


    var location = " " + data.name;
    $('.cityName').append(location);

    var temp1 = " " + data.main.temp;
    $('.temp').append(temp1);

    var humid1 = " " + data.main.humidity;
    $('.humid').append(humid1)

    var wind1 = " " + data.wind.speed;
    $('.wind').append(wind1);
    
})

function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
   
  }
  
  document.querySelector('#find-me').addEventListener('click', geoFindMe);
