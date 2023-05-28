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
  }
)};