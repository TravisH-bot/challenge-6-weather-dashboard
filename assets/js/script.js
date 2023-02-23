var APIKey = "ae7bfaba176164fc10b50ddc4d0722e0";
var num = "1";
var city = "Los Angeles";
var cCity = document.getElementById("currnet-city");
var cTemp = document.getElementById("currnet-temp");
var cWind = document.getElementById("currnet-wind");
var cHumidity = document.getElementById("currnet-humidity");
var fetchButton = document.getElementById("searchBtn");

// GH added - Variables
var citySearchBar = document.getElementById("exampleDataList");
var parentSearch = document.getElementById("searchHistory");
var cityCount = JSON.parse(localStorage.getItem("cities")) || [];
var cityChoice;

//temporary values for lat and lon  later to be updated by Travi's function
var lat = "39.73";
var lon = "-104.98";

var citySearch =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  city +
  "&appid=" +
  APIKey;

// GH added -city search storage & history buttons

function cityRequest() {
  console.log(citySearchBar);
  if (citySearchBar.value === "") {
    return;
  } else {
    cityCount.push(citySearchBar.value);
    localStorage.setItem("cities", JSON.stringify(cityCount));
    cityCount = JSON.parse(localStorage.getItem("cities"));
    parentSearch.textContent = "";

    for (i = 0; i < cityCount.length; i++) {
      var addedCity = document.createElement("button");
      addedCity.textContent = cityCount[i];
      addedCity.className = "previousCities";
      parentSearch.appendChild(addedCity);
      // console.log(addedCity);

      // click event on button created with previous city search
      addedCity.addEventListener("click", function (event) {
        cityChoice = event.target.innerText;
        console.log(cityChoice);
        // addCurrentWeather();
        // getApi();
      });
    }
  }
}

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

/* 
  Fetches the /weather data based on the lat and lon.
  Displays the data in the top card
*/
function addCurrentWeather() {
  //building the request URL
  var requestURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "&lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey +
    "&units=imperial";

  //fetching the data
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //displaying the data
      $("#current-city").text(data.name);
      $("#current-temp").text("Temp: " + data.main.temp);
      $("#current-wind").text("Wind: " + data.wind.speed);
      $("#current-humidity").text("Humidity: " + data.main.humidity);
    });
}

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

fetchButton.addEventListener("click", function () {
  addCurrentWeather();
  getApi();
  cityRequest();
});
