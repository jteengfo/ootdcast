'use client'

import { useState } from "react"

export default function Weather() {
    const [city, setCity] = useState('')
    const [temperature, setTemperature] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

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
        <>
            <h1>Weather Checker</h1>

            <input 
                type="text" 
                placeholder="Enter city name" 
                value={city} 
                onChange={handleInputChange}
                disabled={loading}
                style={{
                    padding: '8px 12px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginRight: '8px',
                    width: '200px',
                    backgroundColor: 'white',
                    color: '#333',
                    '::placeholder': {
                        color: '#999'
                    }
                }}
            />
            <button 
                onClick={handleSubmit}
                disabled={loading}
                style={{
                    padding: '8px 16px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: 'white',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'opacity 0.2s'
                }}
            >
                {loading ? 'Loading...' : 'Get Weather'}
            </button>

            {error && <p style={{ 
                color: 'red',
                fontSize: '14px',
                marginTop: '8px'
            }}>{error}</p>}

            {temperature !== null && (
                <p style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#333',
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    display: 'inline-block'
                }}>
                    The temperature in {city} is: {temperature}°C
                </p>
            )}
        </>
    )
}