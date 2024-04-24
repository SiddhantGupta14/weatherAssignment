import React, { useState } from "react";
const api = {
  key: "ba1ca23b3f89b0c27f02e9d0cc19cf86",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="sb">
      <div
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 16
              ? "app warm"
              : "app"
            : "app"
        }
      >
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="temp">
                  <span className="mainname">Humidity:</span>
                  {Math.round(weather.main.humidity)}
                  <span className="small">%</span>
                </div>

                <div className="temp">
                  <span className="mainname">Wind Speed:</span>
                  {Math.round(weather.wind.speed)}
                  <span className="small">miles/hr</span>
                </div>
                {/* <div className="weather">{weather.weather[0].main}</div> */}
              </div>
            </div>
          ) : (
            <div className="error">Enter the name of the city</div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
