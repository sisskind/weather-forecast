const weatherForecastDiv = document.getElementById('weather-forecast');
const today = new Date();
const forecastDays = 14; // Two weeks

// Dictionary of predefined locations for specific dates
// Format: 'Month Day' (e.g., 'July 8') -> 'Location Name'
// Note: Month and Day are based on the CURRENT YEAR.
const predefinedLocations = {
    // These dates are for the current year (2025)
    'Jul 8': 'Portland, OR',
    'Jul 9': 'Portland',
    'Jul 10': 'Seattle',
    'Jul 11': 'Seattle',
    'Jul 12': 'NONE', // Special case for no location
    'Jul 13': 'Sitka',
    'Jul 14': 'Skagway',
    'Jul 15': 'Juneau',
    'Jul 16': 'NONE', // Special case for no location
    'Jul 17': 'NONE'  // Special case for no location
};

// Function to format date as "Day, Month Date"
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to get a short month and day string for dictionary lookup
function getShortDateKey(date) {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to create a weather card for a given day
function createWeatherCard(date, dayIndex) {
    const card = document.createElement('div');
    card.classList.add('day-card');

    const formattedDate = formatDate(date);
    const shortDateKey = getShortDateKey(date);

    // Check if a predefined location exists for this date
    let defaultLocation = predefinedLocations[shortDateKey] || '';
    if (defaultLocation === 'NONE') {
        defaultLocation = ''; // Clear input if location is "NONE"
    }

    card.innerHTML = `
        <h2>${formattedDate}</h2>
        <label for="location-${dayIndex}">Location:</label>
        <input type="text" id="location-${dayIndex}" placeholder="Enter city, e.g., London" value="${defaultLocation}">
        <div id="weather-info-${dayIndex}" class="weather-info">
            ${defaultLocation ? `Pre-set location: ${defaultLocation}. Click "Get Weather Updates".` : 'Enter a location and click "Get Weather Updates" to see the forecast.'}
        </div>
    `;
    weatherForecastDiv.appendChild(card);
}

// Generate cards for the next two weeks
for (let i = 0; i < forecastDays; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i); // This correctly adds days, even crossing month boundaries
    createWeatherCard(nextDay, i);
}

// Function to fetch weather (PLACEHOLDER - Replace with actual API call)
async function fetchWeather(location) {
    if (!location || location === 'NONE') { // Handle "NONE" explicitly
        return "No location specified for this day.";
    }
    // In a real application, you would use a weather API here.
    // const apiKey = 'YOUR_API_KEY';
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    // try {
    //     const response = await fetch(url);
    //     const data = await response.json();

    //     if (response.ok) {
    //         return `Temperature: ${data.main.temp}°C, Condition: ${data.weather[0].description}`;
    //     } else {
    //         return `Could not fetch weather for ${location}. Error: ${data.message}`;
    //     }
    // } catch (error) {
    //     console.error('Error fetching weather:', error);
    //     return `Error fetching weather for ${location}.`;
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
            weatherInfoDiv.textContent = 'No location specified for this day.';
        }
    }
}
