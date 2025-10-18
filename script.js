const today = new Date();
const Day = today.getDate();
const Month = today.getMonth() + 1;
const Year = today.getFullYear();

const Search = async () => {
  const searchItem = document.getElementById("namee").value;
  const output = document.getElementById("output");

  if (!searchItem) {
    output.innerHTML = `<div class="text-danger fw-bold">Please enter a city name!</div>`;
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchItem}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      output.innerHTML = `<div class="text-danger fw-bold mt-3">${data.message.toUpperCase()}</div>`;
      return;
    }

    const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const weather = data.weather[0].main;

    output.innerHTML = `
      <div class="card weather-card p-4 text-center col-md-6">
        <h2 class="fw-bold mb-3">${data.name}, ${data.sys.country}</h2>
        <h4 class="text-muted mb-2">${Day}.${Month}.${Year}</h4>
        <img src="${weatherIcon}" alt="${weather}" class="weather-icon mb-3">
        <div class="weather-temp">${data.main.temp}°C</div>
        <h5 class="mb-3">${weather}</h5>
        <div class="d-flex justify-content-around mt-4">
          <div><strong>Humidity:</strong> ${data.main.humidity}%</div>
          <div><strong>Wind:</strong> ${data.wind.speed} m/s</div>
          <div><strong>Pressure:</strong> ${data.main.pressure} hPa</div>
        </div>
      </div>
    `;
  } catch (err) {
    console.error(err);
    output.innerHTML = `<div class="text-danger fw-bold mt-3">Something went wrong. Try again.</div>`;
  }
};
