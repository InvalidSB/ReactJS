import React, { useState } from 'react';
const api = {
  key: "040a79f08ee2480537dabb1b24196a6e",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 22) ? 'app warm' :((weather.main.temp > 18) ? 'app mid' : 'app')) : 'app'}>
      <main className="major">
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (

        <div class="card  text-white">
          <div class="card-img-overlay">
            <h5 class="card-title">{weather.weather[0].main}</h5>
            <p class="card-text">The current temprature of {weather.name}, {weather.sys.country} is about :-</p>
            <h1 className="value"> {Math.round(weather.main.temp)}°c</h1>
            <p class="date">{dateBuilder(new Date())}</p>

          </div>
            
        </div>

        ) : ('')}
      </main>
    </div>
  );
}

export default App;
