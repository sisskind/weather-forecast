const weatherForecastDiv = document.getElementById('weather-forecast');
const today = new Date();
const forecastDays = 14; // Two weeks

// Function to format date as "Day, Month Date"
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to create a weather card for a given day
function createWeatherCard(date, dayIndex) {
    const card = document.createElement('div');
    card.classList.add('day-card');

    const formattedDate = formatDate(date);

    card.innerHTML = `
        <h2>${formattedDate}</h2>
        <label for="location-${dayIndex}">Location:</label>
        <input type="text" id="location-${dayIndex}" placeholder="Enter city, e.g., London">
        <div id="weather-info-${dayIndex}" class="weather-info">
            Enter a location and click "Get Weather Updates" to see the forecast.
        </div>
    `;
    weatherForecastDiv.appendChild(card);
}

// Generate cards for the next two weeks
for (let i = 0; i < forecastDays; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    createWeatherCard(nextDay, i);
}

// Function to fetch weather (PLACEHOLDER - Replace with actual API call)
async function fetchWeather(location) {
    if (!location) {
        return "Please enter a location.";
    }
    // In a real application, you would use a weather API here.
    // Example with a hypothetical API:
    // const apiKey = 'YOUR_API_KEY';
    // const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
    // const data = await response.json();
    // if (response.ok) {
    //     return `Temperature: ${data.current.temp_c}°C, Condition: ${data.current.condition.text}`;
    // } else {
    //     return `Could not fetch weather for ${location}. Error: ${data.error.message}`;
    // }

    // Placeholder data:
    const temperatures = ["20°C", "22°C", "18°C", "25°C", "19°C", "21°C", "23°C"];
    const conditions = ["Sunny", "Partly Cloudy", "Rainy", "Clear", "Cloudy", "Windy", "Stormy"];
    const randomTemp = temperatures[Math.floor(Math.random() * temperatures.length)];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

    return `Temperature: ${randomTemp}, Condition: ${randomCondition} in ${location}`;
}

// Function to get weather for all days
async function getWeatherForAllDays() {
    for (let i = 0; i < forecastDays; i++) {
        const locationInput = document.getElementById(`location-${i}`);
        const weatherInfoDiv = document.getElementById(`weather-info-${i}`);
        const location = locationInput.value.trim();

        if (location) {
            weatherInfoDiv.textContent = 'Fetching weather...';
            const weatherData = await fetchWeather(location);
            weatherInfoDiv.textContent = weatherData;
        } else {
            weatherInfoDiv.textContent = 'Please enter a location for this day.';
        }
    }
}
