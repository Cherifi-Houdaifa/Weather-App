const apiRequest = async (city, geo = null) => {
    try {
        console.log(geo)
        let url = "";
        if (geo !== null) {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lon}&appid=27b09524e31d2d69395e2049789e02d0&lang=en`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=27b09524e31d2d69395e2049789e02d0&lang=en`;
        }
        const response = await fetch(url);
        const responseData = await response.json();
        if (parseInt(responseData.cod, 10) === 404) {
            // invalid city
            return false;
        } else if (parseInt(responseData.cod, 10) === 200) {
            const data = {
                weather: responseData.weather[0].description,
                temp: responseData.main.temp,
                pressure: responseData.main.pressure,
                humidity: responseData.main.humidity,
                windSpeed: responseData.wind.speed,
                cityName: responseData.name,
                country: responseData.sys.country,
            };
            return data;
        } else {
            console.log(responseData);
            throw Error("SomeThing Unexpected Happened");
        }
    } catch (error) {
        console.log(error);
    }
};
export { apiRequest };
