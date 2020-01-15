// api.openweathermap.org/data/2.5/weather?q=Porto

// 3ff07804c82a1184353b6f3d3bf6515c

// api.openweathermap.org/data/2.5/weather?q=Porto&appid=3ff07804c82a1184353b6f3d3bf6515c

let appId = config.MY_KEY;

function weatherBalloon(searchCity) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchCity +
      "&appid=" +
      appId
  )
    .then(response => {
      return response.json();
    }) // Convert data to json
    .then(data => {
      getDescription(data);
    });
}

document.getElementById("searchButton").addEventListener("click", () => {
  let searchCity = document.getElementById("cityInput").value;
  if (searchCity) {
    weatherBalloon(searchCity);
  }
});

function getDescription(stats) {
  let tempToCelsius = Math.round(parseFloat(stats.main.temp - 273.15));
  /* 
      let tempToFahrenreit = Math.round(
        parseFloat((stats.main.temp - 273.15) * (9 / 5) + 32)
      );
      */
  let weatherIcon =
    "http://openweathermap.org/img/w/" + stats.weather[0].icon + ".png";

  document.getElementById("weather").style.display = "flex";
  document.getElementById("location").innerHTML = stats.name;
  document.getElementById("temp").innerHTML = tempToCelsius + "&deg;";
  document.getElementById("description").innerHTML =
    stats.weather[0].description;
  document.getElementById("icon").innerHTML = "<img src='" + weatherIcon + "'>";

  console.log(stats.dt);

  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(stats.dt * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  console.log(date, hours, minutes, seconds);
  document.getElementById("time").innerHTML =
    "Last updated at: " + formattedTime;

  /* if (hours > 19) {
    document.getElementById("weather").classList.add("nightTime");
  } */
}
