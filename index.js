

const button=document.querySelector(".search");
button.addEventListener("click",search);
const input=document.querySelector(".search-bar input");
const tempbox=document.querySelector(".temp-box")
const weatherimg=document.querySelector(".weather-icon img")
const currentTemp=document.querySelector(".current-temp")
const descriere=document.querySelector(".description")
const iconita=document.querySelector(".location-response-icon")
const tara=document.querySelector(".location-response-name")
const detalii=document.querySelector(".weather-details")

const errorbox=document.querySelector(".error-box")
const errorIcon=document.querySelector(".error-icon")
const errorMessage=document.querySelector(".error-message")

const wholecard=document.querySelector(".card")
input.addEventListener("keypress", function(event){
    if(event.key=="Enter")
        search();
    else return;
})
function search(){
    const apiKey="59e996397c8e7e82f8a1a592ee4d3860"
    const cityName=document.querySelector(".search-bar input").value;
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`

    fetch(apiCall)
    .then (response => response.json())
    .then (
        result =>{
            tempbox.style.display="flex";
            errorbox.style.display="none";
            wholecard.style.height="600px";
            weatherimg.classList.add("slide-in")
            currentTemp.classList.add("grow-in")
            descriere.classList.add("grow-in")
            iconita.classList.add("grow-in")
            tara.classList.add("grow-in")
            detalii.classList.add("grow-in")
            if(result.cod=='404'){
                tempbox.style.display="none";
                errorbox.style.display="flex";
                wholecard.style.height="360px";
                errorIcon.classList.add("grow-in");
                errorMessage.classList.add("grow-in");
                return;
            }
            const city=result.name;
            const country=result.sys.country;
            const {description, id}=result.weather[0];
            const {temp,humidity} = result.main;
            const windSpeed=result.wind.speed;
            document.querySelector(".current-temp .num").innerText=Math.round(temp);
            document.querySelector(".location-response-name").innerText=`${city}, ${country}`;
            document.querySelector(".humidity").innerText=humidity + "%";
            document.querySelector(".windspeed").innerText=windSpeed + "km/h";
            document.querySelector(".description").innerText=description;
            const image=document.querySelector(".weather-icon img");
            if(id>=200 && id<233)
                image.src="./images/storm.svg";
            else if(id>=300 && id<322)
                image.src="./images/haze.svg";
            else if(id>=500 && id<532)
                image.src="./images/rain.svg";
            else if(id>=600 && id<623)
                image.src="./images/snow.svg";
            else if(id==800) 
                image.src="./images/clear.svg";
            else if(id>800)
                image.src="./images/cloud.svg"; 
        }
    )

}