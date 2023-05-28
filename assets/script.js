var citySearch = document.querySelector(".search");
var queryBtn = document.querySelector(".btn");
var cityHistory = [];
var cityList = document.querySelector(".recent");

if (localStorage.getItem("location")){
  cityHistory = JSON.parse(localStorage.getItem("location"))
}

clickEvent();
function clickEvent(){
queryBtn.addEventListener("click", function(event){
  event.preventDefault();
  var city = citySearch.value
  var element = document.getElementById("query");
  element.value="";
  fetchTodayWeather(city);
  fetchAPI(city);

}
)}

loadCityHistory();
function loadCityHistory(){
  if (cityHistory.length > 0){
    var city = cityHistory[cityHistory.length-1]
    fetchTodayWeather(city);
    fetchAPI(city);
  } 
  cityList.textContent = ""
  for (let i = 0; i < cityHistory.length; i++) {
    var li = document.createElement("li")
    var button = document.createElement("button")
    button.style = "width: 175px" 
    button.textContent = cityHistory[i]
    li.appendChild(button)
    cityList.appendChild(li)
    button.addEventListener("click", function(){
      var city = this.textContent
      fetchTodayWeather(city);
      fetchAPI(city);
    })

  }
  
}


async function fetchTodayWeather(city){
  const api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1403f67aa3a08844258fc3b9dff6ff41&units=imperial";
  const response = await fetch(api);
  const data = await response.json();
  if (cityHistory.includes(data.name)=== false){
    cityHistory.push(data.name)
    localStorage.setItem("location", JSON.stringify(cityHistory))
    loadCityHistory();
  }
  date = (moment(data.dt,"X").format("MM/DD/YYYY"));
  let cityTitle = document.getElementById("city");
  cityTitle.textContent = city;
  let h3El = document.getElementById("Day"+1);
  h3El.textContent = (moment(data.dt,"X").format("MM/DD/YYYY"));
  let icon = data.weather[0].icon;
  getIcon(icon);
  getTodayTemp(data);
  getTodayWind(data);
  getTodayHumidity(data);
}
function getTodayTemp(data){
  let tempEl = document.getElementById("temp"+1);
  tempEl.textContent = `Temp: ${data.main.temp}°F`;
}
function getTodayWind(data){
  let windEl = document.getElementById("wind"+1);
  windEl.textContent = `Wind: ${data.wind.speed} MPH`;
}
function getTodayHumidity(data){
  let humidityEl = document.getElementById("humid"+1);
  humidityEl.textContent = `Humidity ${data.main.humidity}%`;
}
function getIcon(icon){
  iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
  let imgEl = document.getElementById("icon"+1);
  imgEl.setAttribute('alt', "weather icon");
  imgEl.setAttribute('src', iconURL);
}


async function fetchAPI(city){
  var api = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=1403f67aa3a08844258fc3b9dff6ff41&units=imperial";
  var response = await fetch(api);
  var data = await response.json();
  let dayCounter = 2;
  for (let i = 0; i < data.list.length; i=i+8) {
    var h3El = document.getElementById("Day"+dayCounter)
    h3El.textContent = (moment(data.list[i].dt,"X").format("MM/DD/YYYY"))
    get5dIcon(data, i, dayCounter);
    get5dTemp(data, i, dayCounter);
    get5dWind(data, i, dayCounter);
    get5dHumidity(data, i, dayCounter);
    dayCounter++
  }
  
}
function get5dTemp(data, i, dayCounter){
  let tempEl = document.getElementById("temp"+dayCounter);
  tempEl.textContent = `Temp: ${data.list[i].main.temp}°F`;
}
function get5dWind(data, i, dayCounter){
  let windEl = document.getElementById("wind"+dayCounter);
  windEl.textContent = `Wind: ${data.list[i].wind.speed} MPH`;
}
function get5dHumidity(data, i, dayCounter){
  let humidityEl = document.getElementById("humid"+dayCounter);
  humidityEl.textContent = `Humidity ${data.list[i].main.humidity}%`;
}
function get5dIcon(data, i, dayCounter){
  let icon = data.list[i].weather[0].icon;
  iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
  let imgEl = document.getElementById("icon"+dayCounter);
  imgEl.setAttribute('alt', "weather icon");
  imgEl.setAttribute('src', iconURL);
}