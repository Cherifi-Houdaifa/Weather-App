import { apiRequest } from "./api";

const updateResults = (
    cityName,
    countryCode,
    temp,
    description,
    humidity,
    pressure,
    wind
) => {
    const cityNameElem = document.querySelector("#city-name");
    const tempElem = document.querySelector("#temp");
    const descriptionElem = document.querySelector("#description");
    const humidityElem = document.querySelector("#humidity");
    const pressureElem = document.querySelector("#pressure");
    const windElem = document.querySelector("#wind");

    cityNameElem.textContent = cityName + ", " + countryCode;
    tempElem.textContent = Math.round(temp - 273) + "°C";
    descriptionElem.textContent = description;
    humidityElem.textContent = "Humidity: " + humidity + "%";
    pressureElem.textContent = "Pressure: " + pressure;
    windElem.textContent = "Wind: " + wind + "Km/h";
};

// this function get called when the user click the button
const updateView = (e, geo = null) => {
    const searchInputElement = document.querySelector("#city-name-input");
    let searchInputValue = searchInputElement.value;
    searchInputValue = searchInputValue.replaceAll(" ", "");
    if (geo === null) {
        if (searchInputValue === "") {
            alert("You must Provide A City");
            return;
        } else if (searchInputValue === "fuck") {
            alert("Really!");
            return;
        }
    }
    apiRequest(searchInputValue, geo).then((data) => {
        if (data === false) {
            alert("Invalid City");
            return;
        }
        updateResults(
            data.cityName,
            data.country,
            data.temp,
            data.weather,
            data.humidity,
            data.pressure,
            data.windSpeed
        );
        searchInputElement.value = "";
    });
};

const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", updateView);

// ask for location to show him his weather
window.addEventListener("load", () => {
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            (data) => {
                const geo = {
                    lat: data.coords.latitude,
                    lon: data.coords.longitude,
                };
                updateView(null, geo);
            },
            (error) => {
                console.log(error);
            }
        );
    }
});
