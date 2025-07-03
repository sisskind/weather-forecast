const weatherCalendarGrid = document.getElementById('weather-calendar-grid');
const currentMonthHeader = document.getElementById('current-month');
const today = new Date();
const forecastDays = 14; // Two weeks

// Hardcoded locations for specific dates (Month Day, Year)
// This makes the locations fixed in the code.
const hardcodedLocations = {
    // Note: The month/day/year should match the actual date objects.
    // Using current year (2025) as per the prompt context.
    'Jul 8 2025': 'Portland, OR',
    'Jul 9 2025': 'Portland',
    'Jul 10 2025': 'Seattle',
    'Jul 11 2025': 'Seattle',
    'Jul 12 2025': 'NONE', // Special case for no location
    'Jul 13 2025': 'Sitka',
    'Jul 14 2025': 'Skagway',
    'Jul 15 2025': 'Juneau',
    'Jul 16 2025': 'NONE', // Special case for no location
    'Jul 17 2025': 'NONE',  // Special case for no location
    // You can add more dates here for the full two weeks if needed
    // Example for remaining days (adjust as needed for 2025 dates):
    // 'Jul 3 2025': 'New York', // Today's date (July 3, 2025)
    // 'Jul 4 2025': 'Washington D.C.',
    // 'Jul 5 2025': 'Boston',
    // 'Jul 6 2025': 'Chicago',
    // 'Jul 7 2025': 'Denver',
    // 'Jul 18 2025': 'San Francisco',
    // 'Jul 19 2025': 'Los Angeles'
};

// Function to format date as "Day, Month Date"
function formatDateLong(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to get a unique key for dictionary lookup (e.g., "Jul 8 2025")
function getDateKey(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Set the current month header
currentMonthHeader.textContent = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

// Function to create a calendar day card
function createCalendarDayCard(date, dayIndex) {
    const card = document.createElement('div');
    card.classList.add('calendar-day-card');

    const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric' });
    const fullDateText = formatDateLong(date);
    const dateKey = getDateKey(date);

    let location = hardcodedLocations[dateKey] || 'No Location Set';
    let displayLocation = location;
    let weatherInitialText = 'Click "Get Weather Updates"';
    let locationClass = '';

    if (location === 'NONE') {
        displayLocation = 'No Specific Location';
        weatherInitialText = 'N/A';
        locationClass = 'no-location';
    } else if (location === 'No Location Set') {
        // This case is for dates not explicitly in hardcodedLocations
        weatherInitialText = 'No location configured in script.js';
        locationClass = 'no-location';
    }


    card.innerHTML = `
        <h3>${fullDateText}</h3>
        <div class="location-display ${locationClass}" data-location="${location}">
            ${displayLocation}
        </div>
        <div id="weather-info-${dayIndex}" class="weather-info">
            ${weatherInitialText}
        </div>
    `;
    weatherCalendarGrid.appendChild(card);
}

// Generate cards for the next two weeks (or more, if desired for a full month view)
for (let i = 0; i < forecastDays; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i); // Correctly adds days
    createCalendarDayCard(nextDay, i);
}

// Function to fetch weather (PLACEHOLDER - Replace with actual API call)
async function fetchWeather(location) {
    if (!location || location === 'NONE' || location === 'No Location Set') {
        return "No weather data for this location.";
    }
    // In a real application, you would use a weather API here.
    // Example for OpenWeatherMap (replace YOUR_API_KEY)
    // const apiKey = 'YOUR_API_KEY';
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    // try {
    //     const response = await fetch(url);
    //     const data = await response.json();

    //     if (response.ok) {
    //         const temp = data.main.temp ? `${data.main.temp}°C` : 'N/A';
    //         const condition = data.weather[0] ? data.weather[0].description : 'N/A';
    //         return `Temp: ${temp}, Cond: ${condition}`;
    //     } else {
    //         return `Error: ${data.message || 'Could not fetch weather'}`;
    //     }
    // } catch (error) {
    //     console.error('Error fetching weather:', error);
    //     return `Network error.`;
    // }

    // Placeholder data for demonstration:
    const temperatures = ["20°C", "22°C", "18°C", "25°C", "19°C", "21°C", "23°C"];
    const conditions = ["Sunny", "Partly Cloudy", "Rainy", "Clear", "Cloudy", "Windy", "Stormy"];
    const randomTemp = temperatures[Math.floor(Math.random() * temperatures.length)];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

    return `Temp: ${randomTemp}, Cond: ${randomCondition}`;
}

// Function to get weather for all days
async function getWeatherForAllDays() {
    const dayCards = document.querySelectorAll('.calendar-day-card');
    for (let i = 0; i < dayCards.length; i++) {
        const locationElement = dayCards[i].querySelector('.location-display');
        const weatherInfoDiv = dayCards[i].querySelector('.weather-info');
        const location = locationElement.dataset.location; // Get hardcoded location

        if (location && location !== 'NONE' && location !== 'No Location Set') {
            weatherInfoDiv.textContent = 'Fetching...';
            const weatherData = await fetchWeather(location);
            weatherInfoDiv.textContent = weatherData;
        } else {
            weatherInfoDiv.textContent = 'N/A';
        }
    }
}
