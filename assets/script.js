var citySearch = document.querySelector(".search");
var searchBtn = document.querySelector(".btn");
var listOfCities = document.querySelector(".recent");
var searchHistory = [];



if (localStorage.getItem("location")){
  searchHistory = JSON.parse(localStorage.getItem("location"));
};



clickEvent();
function clickEvent(){
searchBtn.addEventListener("click", function(event){
  event.preventDefault();
  var city = citySearch.value;
  var element = document.getElementById("query");
  element.value="";
  fetchCurrentWeather(city);
  fetchAPI(city);
  }
)};



async function fetchCurrentWeather(city){
  const api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1403f67aa3a08844258fc3b9dff6ff41&units=imperial";
  const response = await fetch(api);
  const data = await response.json();
  if (searchHistory.includes(data.name)=== false){
    searchHistory.push(data.name);
    localStorage.setItem("location", JSON.stringify(searchHistory));
    loadSearchHistory();
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



async function fetch5Day(city){
  var api = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=1403f67aa3a08844258fc3b9dff6ff41&units=imperial";
  var response = await fetch(api);
  var data = await response.json();
  let dayCounter = 2;
  for (let i = 0; i < data.list.length; i=i+8) {
    var h3El = document.getElementById("Day"+dayCounter);
    h3El.textContent = (moment(data.list[i].dt,"X").format("MM/DD/YYYY"));
    get5DayIcon(data, i, dayCounter);
    get5DayTemp(data, i, dayCounter);
    get5DayWind(data, i, dayCounter);
    get5DayHumidity(data, i, dayCounter);
    dayCounter++;
  };
};

function get5DayTemp(data, i, dayCounter){
  let tempEl = document.getElementById("temp"+dayCounter);
  tempEl.textContent = `Temp: ${data.list[i].main.temp}°F`;
};

function get5DayWind(data, i, dayCounter){
  let windEl = document.getElementById("wind"+dayCounter);
  windEl.textContent = `Wind: ${data.list[i].wind.speed} MPH`;
};

function get5DayHumidity(data, i, dayCounter){
  let humidityEl = document.getElementById("humid"+dayCounter);
  humidityEl.textContent = `Humidity ${data.list[i].main.humidity}%`;
};

function get5DayIcon(data, i, dayCounter){
  let icon = data.list[i].weather[0].icon;
  iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
  let imgEl = document.getElementById("icon"+dayCounter);
  imgEl.setAttribute('alt', "weather icon");
  imgEl.setAttribute('src', iconURL);
};



loadSearchHistory();
function loadSearchHistory(){
  if (searchHistory.length > 0){
    var city = searchHistory[searchHistory.length-1];
    fetchCurrentWeather(city);
    fetch5Day(city);
  };
  listOfCities.textContent = "";
  for (let i = 0; i < searchHistory.length; i++) {
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.style = "width: 175px";
    button.textContent = searchHistory[i];
    li.appendChild(button);
    listOfCities.appendChild(li);
    button.addEventListener("click", function(){
      var city = this.textContent;
      fetchCurrentWeather(city);
      fetch5Day(city);
    });
  };
};