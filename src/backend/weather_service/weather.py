import requests


class WeatherEvaluater:
    def __init__(self):
        super().__init__()
        self.api_url = "https://api.nasa.gov/insight_weather/"

        self.__weather_temperature_boundaries = range(-64, -7)
        self.__weather_pressure_boundaries = range(682, 730)
        self.__weather_wind_boundaries = range(2, 15)

    def check_weather(self, longitude, latitude, day):
        weather_data = requests \
            .get("http://weather_api:60/",
                 params={"longitude": longitude, "latitude": latitude}).json()
        day_weather = weather_data["sol_keys"][int(day)]

        valid_weather = [1 if (day_weather["AT"] in self.__weather_temperature_boundaries) else 0,
                         1 if (
                             day_weather["PRE"] in self.__weather_pressure_boundaries) else 0,
                         1 if (day_weather["HWS"] in self.__weather_wind_boundaries) else 0]

        return dict(
            temperature={day_weather["AT"], valid_weather[0]},
            pressure={day_weather["PRE"], valid_weather[1]},
            wind={day_weather["HWS"], valid_weather[2]},
            validity_coefficient=sum(valid_weather) / 3
        )
