# astrology_backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import swisseph as swe
import pytz

app = Flask(__name__)
CORS(app)

swe.set_ephe_path("./ephe")  # Ensure Swiss ephemeris files are downloaded here

ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

PLANETS = [
    (swe.SUN, "Sun"),
    (swe.MOON, "Moon"),
    (swe.MERCURY, "Mercury"),
    (swe.VENUS, "Venus"),
    (swe.MARS, "Mars"),
    (swe.JUPITER, "Jupiter"),
    (swe.SATURN, "Saturn"),
    (swe.TRUE_NODE, "Rahu"),  # North Node
    (-swe.TRUE_NODE, "Ketu"),  # South Node (Ketu is -Rahu)
]

def get_sign_from_longitude(lon):
    return int(lon / 30)

@app.route("/api/kundli", methods=["POST"])
def generate_kundli():
    data = request.get_json()
    name = data.get("name")
    date_of_birth = data.get("date_of_birth")  # format: YYYY-MM-DD
    time_of_birth = data.get("time_of_birth")  # format: HH:MM
    timezone = data.get("timezone")  # e.g., 'Asia/Kolkata'
    lat = float(data.get("latitude"))
    lon = float(data.get("longitude"))

    dt_str = f"{date_of_birth} {time_of_birth}"
    tz = pytz.timezone(timezone)
    local_dt = tz.localize(datetime.strptime(dt_str, "%Y-%m-%d %H:%M"))
    utc_dt = local_dt.astimezone(pytz.utc)
    jd = swe.julday(utc_dt.year, utc_dt.month, utc_dt.day, 
                    utc_dt.hour + utc_dt.minute / 60.0)

    # House and Ascendant calculations
    ascmc, _ = swe.houses(jd, lat, lon, b"P")
    asc_sign = get_sign_from_longitude(ascmc[0])

    d1_chart = {sign: [] for sign in range(12)}
    d9_chart = {sign: [] for sign in range(12)}

    for p, pname in PLANETS:
        lon_tuple, _ = swe.calc_ut(jd, abs(p))
        planet_lon = lon_tuple[0]
        if p < 0:  # Ketu
            planet_lon = (planet_lon + 180) % 360

        sign = get_sign_from_longitude(planet_lon)
        d1_chart[sign].append(pname)

    # D9 Calculation
    d9_sign = ((int((planet_lon % 30) / 3) + sign * 9) % 12)
    d9_chart[d9_sign].append(pname)

    response = {
        "name": name,
        "ascendant": ZODIAC_SIGNS[asc_sign],
        "d1_chart": {ZODIAC_SIGNS[i]: d1_chart[i] for i in range(12)},
        "d9_chart": {ZODIAC_SIGNS[i]: d9_chart[i] for i in range(12)}
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050,debug=True)
