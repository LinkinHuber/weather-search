var citySearch = document.querySelector(".search");
var searchBtn = document.querySelector(".btn");
var listOfCities = document.querySelector(".recent");
var searchHistory = [];


clickEvent();
function clickEvent(){
searchBtn.addEventListener("click", function(event){
  event.preventDefault();
  var city = citySearch.value
  var element = document.getElementById("query");
  element.value="";
  fetchCurrentWeather(city);
  }
)};


async function fetchCurrentWeather(city){
  const api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1403f67aa3a08844258fc3b9dff6ff41&units=imperial";
  const response = await fetch(api);
  const data = await response.json();
  if (searchHistory.includes(data.name)=== false){
    searchHistory.push(data.name)
    localStorage.setItem("location", JSON.stringify(searchHistory))
  }
  date = (moment(data.dt,"X").format("MM/DD/YYYY"));
  let cityTitle = document.getElementById("city");
  cityTitle.textContent = city;
  let h3El = document.getElementById("Day"+1);
  h3El.textContent = (moment(data.dt,"X").format("MM/DD/YYYY"));
  let icon = data.weather[0].icon;
  getIcon(icon);
  getCurrentTemp(data);
  getCurrentWind(data);
  getCurrentHumidity(data);
};


function getCurrentTemp(data){
  let tempEl = document.getElementById("temp"+1);
  tempEl.textContent = `Temp: ${data.main.temp}°F`;
};


function getCurrentWind(data){
  let windEl = document.getElementById("wind"+1);
  windEl.textContent = `Wind: ${data.wind.speed} MPH`;
};


function getCurrentHumidity(data){
  let humidityEl = document.getElementById("humid"+1);
  humidityEl.textContent = `Humidity ${data.main.humidity}%`;
};


function getIcon(icon){
  iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
  let imgEl = document.getElementById("icon"+1);
  imgEl.setAttribute('alt', "weather icon");
  imgEl.setAttribute('src', iconURL);
};
