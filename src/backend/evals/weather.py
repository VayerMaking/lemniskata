import requests


class WeatherEvaluater:
    def __init__(self):
        super().__init__()
        self.api_url = "https://api.nasa.gov/insight_weather/"

        self.__weather_temperature_boundaries = range(-120, 0)
        self.__weather_pressure_boundaries = range(-120, 0)
        self.__weather_wind_boundaries = range(-120, 0)

    def check_weather(self, longitude, latitude, day):
        weather_data = requests \
            .get("https://api.nasa.gov/insight_weather/",
                 params={"longitude": longitude, "latitude": latitude}).json()
        day_weather = weather_data["sol_keys"][day]

        return dict(
            temperature=day_weather["AT"],
            pressure=day_weather["PRE"],
            wind=day_weather["HWS"],
            valid=(True if (day_weather["AT"] in self.__weather_temperature_boundaries) and
                           (day_weather["PRE"] in self.__weather_pressure_boundaries) and
                           (day_weather["HWS"] in self.__weather_wind_boundaries) else False)
        )
