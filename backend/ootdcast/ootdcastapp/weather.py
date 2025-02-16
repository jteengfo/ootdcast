import requests
import os
from django.conf import settings

def get_weather_data(city):
    """
    Fetch weather data for a given city using Weatherstack API
    Returns a dictionary with weather information or None if the request fails
    """
    api_key = os.getenv('WEATHERSTACK_API_KEY', '2c71f3d7701fdcb3c46eea787ff0bf14')  # Fallback for development
    url = f'http://api.weatherstack.com/current?access_key={api_key}&query={city}'

    try:
        response = requests.get(url)
        data = response.json()
        
        # Check for API errors and invalid locations
        if 'error' in data:
            print(f"API Error: {data['error']}")
            return None
            
        if response.status_code == 200 and 'current' in data and 'location' in data:
            return {
                'temperature': data['current']['temperature'],
                'description': data['current']['weather_descriptions'][0],
                'wind_speed': data['current']['wind_speed'],
                'humidity': data['current']['humidity'],
                'feels_like': data['current']['feelslike']
            }
        return None
    except Exception as e:
        print(f"Error fetching weather data: {str(e)}")
        return None