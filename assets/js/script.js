var APIKey = "";
var num = "5";
var city = "Denver";
var state;
var country;
var cCity = document.getElementById("currnet-city");
var cTemp = document.getElementById("currnet-temp");
var cWind = document.getElementById("currnet-wind");
var cHumidity = document.getElementById("currnet-humidity");
var fetchButton = document.getElementById("searchBtn");

var citySearch =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  city +
  state +
  country +
  "&limit=" +
  num +
  "&appid=" +
  APIKey;

fetch(citySearch)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
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
      }
    });
}

fetchButton.addEventListener("click", getApi);
