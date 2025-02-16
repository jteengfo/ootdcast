import requests

# Replace 'your_api_key' with the actual API key you got from Weatherstack
api_key = '2c71f3d7701fdcb3c46eea787ff0bf14'
city = 'Edmonton'  # You can change this to any city you want
url = f'http://api.weatherstack.com/current?access_key={api_key}&query={city}'

# Make the GET request
response = requests.get(url)

# Check if the response is successful
if response.status_code == 200:
    data = response.json()  # Parse the JSON response
    
    # Extracting relevant data
    temperature = data['current']['temperature']
    weather_description = data['current']['weather_descriptions'][0]
    wind_speed = data['current']['wind_speed']
    humidity = data['current']['humidity']
    feels_like = data['current']['feelslike']
    
    # Print the weather details
    print(f"Weather in {city}:")
    print(f"Temperature: {temperature}°C")
    print(f"Weather: {weather_description}")
    print(f"Wind Speed: {wind_speed} km/h")
    print(f"Humidity: {humidity}%")
    print(f"Feels Like: {feels_like}°C")
else:
    print("Failed to get data:", response.status_code)