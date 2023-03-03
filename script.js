const weather = (() => {

    const getWeather = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},US&APPID=fe326985646cdbc738b7348445ec490c&units=metric`, {mode: 'cors'});
            const weatherData = await response.json();
            console.log(weatherData);
        } catch {
            console.err('Error retrieving weather...')
        }
        
    }

    return {getWeather}
})();

weather.getWeather('toledo');

