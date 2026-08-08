const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const message = document.getElementById("message");
const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");

const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const updatedTime = document.getElementById("updatedTime");


searchBtn.addEventListener("click", getWeather);


cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});


async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        showMessage("Please enter a city name.");
        weatherCard.classList.add("hidden");
        return;
    }

    try {

        showMessage("Loading weather data...");

        // Find the city
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!locationResponse.ok) {
            throw new Error("Unable to find the location.");
        }

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            throw new Error("City not found. Please enter a valid city name.");
        }

        // Get location information
        const location = locationData.results[0];

        const lat = location.latitude;
        const lon = location.longitude;


        // Get weather information
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error("Weather service is currently unavailable.");
        }

        const weatherData = await weatherResponse.json();

        // Get current weather
        const currentWeather = weatherData.current;


        // Display weather data
        cityName.textContent = location.name;

        countryName.textContent =
            `${location.admin1 || ""}, ${location.country || ""}`;

        temperature.textContent =
            `${currentWeather.temperature_2m} °C`;

        humidity.textContent =
            `${currentWeather.relative_humidity_2m} %`;

        windSpeed.textContent =
            `${currentWeather.wind_speed_10m} km/h`;

        latitude.textContent =
            lat.toFixed(4);

        longitude.textContent =
            lon.toFixed(4);

        updatedTime.textContent =
            currentWeather.time;


        weatherCard.classList.remove("hidden");

        showMessage("Weather data loaded successfully.");

    } catch (error) {

        weatherCard.classList.add("hidden");

        showMessage(error.message);

        console.error("Weather Error:", error);
    }
}


function showMessage(text) {
    message.textContent = text;
}