// src/components/AddClothing.jsx
'use client';

import { useState } from 'react';
import styles from './AddClothing.module.css';

export default function AddClothing() {
  const [name, setName] = useState(''); // Clothing name
  const [formality, setFormality] = useState(''); // Formality level
  const [warmthLevel, setWarmthLevel] = useState(''); // Warmth level
  const [clothingType, setClothingType] = useState(''); // Clothing type (Top or Bottom)
  const [error, setError] = useState(''); // Error message
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state
    setError(''); // Clear any previous errors

    // Basic validation
    if (!name || !formality || !warmthLevel || !clothingType) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      // Send a POST request to the backend API
      const response = await fetch('http://127.0.0.1:8000/clothing/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          formality: null,
          warmthLevel,
          clothingType,
        }),
      });

      const data = await response.json(); // Parse the response

      // Handle errors
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // On success
      console.log('Clothing added successfully:', data);
      alert('Clothing added successfully!');
      // Reset the form
      setName('');
      setFormality('');
      setWarmthLevel('');
      setClothingType('');
    } catch (error) {
      setError(error.message || 'Something went wrong'); // Display error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className={styles.addClothing}>
      <h1>Add New Clothing</h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Clothing Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            placeholder="Enter clothing name"
          />
        </div>

        {/* <div className={styles.formGroup}>
          <label htmlFor="formality">Formality:</label>
          <select
            id="formality"
            value={formality}
            onChange={(e) => setFormality(e.target.value)}
            disabled={loading}
          >
            <option value="" disabled>Select formality</option>
            <option value="casual">Casual</option>
            <option value="semi-formal">Semi-Formal</option>
            <option value="formal">Formal</option>
          </select>
        </div> */}

        <div className={styles.formGroup}>
          <label htmlFor="warmthLevel">Warmth Level:</label>
          <select
            id="warmthLevel"
            value={warmthLevel}
            onChange={(e) => setWarmthLevel(e.target.value)}
            disabled={loading}
          >
            <option value="" disabled>Select warmth level</option>
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="clothingType">Clothing Type:</label>
          <input
            type="text"
            id="clothingType"
            value={clothingType}
            onChange={(e) => setClothingType(e.target.value)}
            disabled={loading}
            placeholder="Enter clothing type"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
          style={{
            opacity: loading ? 0.7 : 1,
            pointerEvents: loading ? 'none' : 'auto',
          }}
        >
          {loading ? 'Adding...' : 'Add Clothing'}
        </button>
      </form>
    </div>
  );
}