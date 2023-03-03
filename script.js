const weather = (() => {

    const getWeather = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},US&APPID=fe326985646cdbc738b7348445ec490c&units=metric`, {mode: 'cors'});
            const weatherData = await response.json();
            return weatherData;
        } catch {
            console.err('Error retrieving weather...')
        }
        
    }

    return {getWeather}
})();

const ui = (() => {

    const _getData = async () => {
        const city = document.getElementById('city');
        const temperature = document.getElementById('temperature');
        const title = document.querySelector('h1');
        const icon = document.querySelector('#img');
        const data =  await weather.getWeather(city.value);
        title.innerHTML = `${data.name}`
        temperature.innerHTML = `${data.main.temp}°C`;
        const id = await data.weather[0].icon
        icon.setAttribute('src', `http://openweathermap.org/img/wn/${id}@2x.png`);

         //_printInfos(data);
    }

    const _enterSubmit = e => {
        if (e.key === "Enter") {
            _getData();
        }
    }

    const _printInfos = data => {
        try {
            const infos = document.querySelector('.infos');
            infos.remove();
        } catch {}

        const infos = document.createElement('div');
        infos.setAttribute('class','infos');
        document.body.append(infos);

        Object.entries(data.main).forEach(info => {
            const p = document.createElement('p');
            p.setAttribute('class','info');
            p.setAttribute('class', info[0]);
            p.innerHTML = `${info[0]}: ${info[1]}`
            infos.append(p);
        });
    }

    const setup = () => {
        const button = document.getElementById('submit');
        const city = document.getElementById('city');
        const form = document.querySelector('form');

        form.addEventListener('keydown', _enterSubmit);
        button.addEventListener('click', _getData);

        city.focus();
        



    }

    return {setup}
})();

ui.setup();
