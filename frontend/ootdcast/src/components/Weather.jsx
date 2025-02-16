'use client'

import { useState } from "react"
import "./Weather.css"

export default function Weather() {
    const [city, setCity] = useState('')
    const [temperature, setTemperature] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = (event) => {
        setCity(event.target.value)
        setTemperature(null)
    }

    const handleSubmit = async () => {
        if (!city) {
            setError("Please enter a city name.")
            return
        }

        setLoading(true)
        setError('')
        const url = `http://localhost:8000/weather/?city=${encodeURIComponent(city)}`

        try {
            const response = await fetch(url)
            const data = await response.json()

            if (response.ok) {
                if (data.temperature === null || data.temperature === undefined) {
                    setTemperature(null)
                    setError('City not found. Please check the spelling and try again.')
                } else {
                    setTemperature(data.temperature)
                    setError('')
                    setSubmitted(true) // Hide input, button, and header after successful response
                }
            } else {
                setTemperature(null)
                setError(data.error || 'City not found or error fetching weather data')
            }
        } catch (error) {
            console.error("Detailed error:", error)
            setTemperature(null)
            setError('Unable to fetch weather data. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="weather-container">
            {!submitted && <h1>Weather Checker</h1>}

            {!submitted && (
                <>
                    <input 
                        type="text" 
                        placeholder="Enter city name" 
                        value={city} 
                        onChange={handleInputChange}
                        disabled={loading}
                        className="weather-input"
                    />
                    <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="weather-button"
                    >
                        {loading ? 'Loading...' : 'Get Weather'}
                    </button>
                </>
            )}

            {error && <p className="weather-error">{error}</p>}

            {temperature !== null && submitted && (
                <p className="weather-result">
                    {temperature}°C at {city}
                </p>
            )}
        </div>
    )
}