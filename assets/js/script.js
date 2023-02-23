var APIKey = "ae7bfaba176164fc10b50ddc4d0722e0";
var num = "1";
var navIcon = document.getElementById("nav-icon");
var cIcon = document.getElementById("current-icon");
var fetchButton = document.getElementById("searchBtn");

// GH added - Variables
var citySearchBar = document.getElementById("exampleDataList");
var parentSearch = document.getElementById("searchHistory");
var cityCount = JSON.parse(localStorage.getItem("cities")) || [];
var cityChoice;

// values for lat and lon later to be updated by Travi's search(city) function
var lat;
var lon;

//search function that will convert the lat and lon to the addCurrentWeather function
function search(city) {
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
      lat = data.city.coord.lat;
      lon = data.city.coord.lon;
      //calling weather APIs and displaying weather data once lat and lon available
      addCurrentWeather();
      fiveDayForecast();
    });
}
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
      if (data) {
        console.log(data);
      } else {
        console.log("data did not load");
      }
      console.log(data ? data : "data did not load"); //Turnery statement

      //displaying the data
      $("#current-city").text(data.name);
      $("#current-temp").text("Temp: " + data.main.temp + "°F");
      $("#current-wind").text("Wind: " + data.wind.speed + " MPH");
      $("#current-humidity").text("Humidity: " + data.main.humidity + " %");
      //
      $("#current-icon").attr(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      $("#nav-icon").attr(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
    });
}

/* 
  Fetches and siaplys the forecast for 5 days based on lat and lon
*/
function fiveDayForecast() {
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
      for (var i = 0; i < 6; i++) {
        $("#temp-" + i ) .text("Temp: " + data.list[i].main.temp + "°F")
        $("#wind-" + i ) .text("wind: " + data.list[i].wind.speed + "MPH")
        $("#humid-" + i ) .text("humid: " + data.list[i].main.humidity + "%")
        //$("#date-" + i ) .text("Date: " + data.list[i].dt.format("MM DD, YYYY"));
        // document.getElementById("temp-" + i) .textcontent = "Temp: " + data.list[i].main.temp
      }
    });
}

/* 
  GH added -city search storage & history buttons
*/
function cityRequest() {
  cityCount.push(citySearchBar.value);
  localStorage.setItem("cities", JSON.stringify(cityCount));
  cityCount = JSON.parse(localStorage.getItem("cities"));
  parentSearch.textContent = "";

  for (i = 0; i < cityCount.length; i++) {
    var addedCity = document.createElement("button");
    addedCity.textContent = cityCount[i];
    addedCity.className = "previousCities";
    parentSearch.appendChild(addedCity);

    // click event on button created with previous city search
    addedCity.addEventListener("click", function (event) {
      cityChoice = event.target.innerText;
      console.log(cityChoice);
      search(cityChoice);
    });
  }
}

//just the button listener
fetchButton.addEventListener("click", function () {
  if (citySearchBar.value != "") {
    search(citySearchBar.value);
    cityRequest();
  } else {
    window.alert("Please enter a city name.");
  }
});


//Display cities from local storage when page loads. Handler for .ready 
$( function(){
  
  for (i = 0; i < cityCount.length; i++) {
    var addedCity = document.createElement("button");
    addedCity.textContent = cityCount[i];
    addedCity.className = "previousCities";
    parentSearch.appendChild(addedCity);

    // click event on button created with previous city search
    addedCity.addEventListener("click", function (event) {
      cityChoice = event.target.innerText;
      console.log(cityChoice);
      search(cityChoice);
    });
    }
} )