import requests


class WeatherEvaluater:
    def __init__(self):
        super().__init__()
        self.api_url = "https://api.nasa.gov/insight_weather/"

        self.__weather_temperature_boundaries = range(-50, -7)
        self.__weather_pressure_boundaries = range(682, 730)
        self.__weather_wind_boundaries = range(5, 12)

    def check_weather(self, longitude, latitude, day):
        weather_data = requests \
            .get("http://wheather_api:6969/",
                 params={"longitude": longitude, "latitude": latitude}).json()
        day_weather = weather_data["sol_keys"][int(day)]

        return dict(
            temperature=day_weather["AT"],
            pressure=day_weather["PRE"],
            wind=day_weather["HWS"],
            valid=(True if (day_weather["AT"] in self.__weather_temperature_boundaries) and
                           (day_weather["PRE"] in self.__weather_pressure_boundaries) and
                           (day_weather["HWS"] in self.__weather_wind_boundaries) else False)
        )
