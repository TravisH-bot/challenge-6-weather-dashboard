var APIKey = "ae7bfaba176164fc10b50ddc4d0722e0";
var num = "1";
var city = "Los Angeles";
var cCity = document.getElementById("currnet-city");
var cTemp = document.getElementById("currnet-temp");
var cWind = document.getElementById("currnet-wind");
var cHumidity = document.getElementById("currnet-humidity");
var fetchButton = document.getElementById("searchBtn");

var citySearch =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  city +
  "&appid=" +
  APIKey;

fetch(citySearch)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    for (var i = 0; i < data.length; i++) {
      var lat = data[i].city.coord.lat;
      console.log(lat);
    }
  });

var lat = "39.73";
var lon = "-104.98";

function getApi() {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey +
    "&units=imperial";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        var cityEl = document.createElement("h2");

        cityEl.textContent = data[i].name;

        cCity.appendChild(cityEl);
        console.log(cityEl);
      }
    });
}

fetchButton.addEventListener("click", getApi);
