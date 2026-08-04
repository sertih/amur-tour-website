import json
import urllib.request
import urllib.parse

CITIES = {
    "china": {"lat": 18.25, "lon": 109.51, "sea": True},
    "thailand": {"lat": 7.89, "lon": 98.39, "sea": True},
    "vietnam": {"lat": 12.24, "lon": 109.19, "sea": True},
    "cambodia": {"lat": 10.63, "lon": 103.51, "sea": True},
    "tunisia": {"lat": 36.4, "lon": 10.6, "sea": True},
    "malaysia": {"lat": 3.14, "lon": 101.5, "sea": True},
    "egypt": {"lat": 27.26, "lon": 33.81, "sea": True},
    "south-korea": {"lat": 37.57, "lon": 126.98, "sea": True},
    "zanzibar": {"lat": -6.16, "lon": 39.2, "sea": True},
    "cuba": {"lat": 23.13, "lon": -82.38, "sea": True},
    "singapore": {"lat": 1.35, "lon": 103.82, "sea": True},
    "maldives": {"lat": 4.17, "lon": 73.51, "sea": True},
    "uae": {"lat": 25.2, "lon": 55.27, "sea": True},
    "bali": {"lat": -8.65, "lon": 115.22, "sea": True},
    "bahrain": {"lat": 26.07, "lon": 50.56, "sea": True},
    "boracay": {"lat": 11.97, "lon": 121.93, "sea": True},
    "mauritius": {"lat": -20.35, "lon": 57.55, "sea": True},
    "dominicana": {"lat": 18.5, "lon": -68.37, "sea": True},
    "japan": {"lat": 35.68, "lon": 139.69, "sea": False},
    "seychelles": {"lat": -4.68, "lon": 55.49, "sea": True},
}


def handler(event: dict, context) -> dict:
    '''
    Возвращает актуальную температуру воздуха и воды для списка направлений.
    Данные берутся из открытого сервиса Open-Meteo (без ключа, обновляются каждый день).
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    keys = list(CITIES.keys())
    lats = ",".join(str(CITIES[k]["lat"]) for k in keys)
    lons = ",".join(str(CITIES[k]["lon"]) for k in keys)

    result = {}

    try:
        weather_url = "https://api.open-meteo.com/v1/forecast?" + urllib.parse.urlencode({
            "latitude": lats,
            "longitude": lons,
            "current": "temperature_2m"
        })
        with urllib.request.urlopen(weather_url, timeout=8) as resp:
            weather_data = json.loads(resp.read().decode())

        for i, key in enumerate(keys):
            temp = weather_data[i]["current"]["temperature_2m"]
            result[key] = {"sun": round(temp), "water": None}

        sea_keys = [k for k in keys if CITIES[k]["sea"]]
        sea_lats = ",".join(str(CITIES[k]["lat"]) for k in sea_keys)
        sea_lons = ",".join(str(CITIES[k]["lon"]) for k in sea_keys)

        marine_url = "https://marine-api.open-meteo.com/v1/marine?" + urllib.parse.urlencode({
            "latitude": sea_lats,
            "longitude": sea_lons,
            "current": "sea_surface_temperature"
        })
        with urllib.request.urlopen(marine_url, timeout=8) as resp:
            marine_data = json.loads(resp.read().decode())

        for i, key in enumerate(sea_keys):
            sst = marine_data[i]["current"].get("sea_surface_temperature")
            if sst is not None:
                result[key]["water"] = round(sst)
    except Exception:
        pass

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'weather': result}, ensure_ascii=False)
    }
