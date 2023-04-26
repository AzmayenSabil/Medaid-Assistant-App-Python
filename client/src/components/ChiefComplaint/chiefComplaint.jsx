import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './chiefComplaint.css';

import Navbar from '../Navbar/navbar.jsx';
import Questions from '../QuestionGen/questions.jsx';

function ChiefComplaint() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const symptoms = ['Headache', 'Back Pain', 'Cough', 'Fever', 'Sore Throat', 'Fatigue'];

  const navigate = useNavigate();

  useEffect(() => {
    setSuggestions(symptoms);
  }, []);

  const handleChange = event => {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (inputValue === '') {
      // Reset suggestions when input is empty
      setSuggestions(symptoms);
    } else {
      // Filter suggestions based on input value
      const filteredSuggestions = symptoms.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase()) // Compare word to word
      );
      if (filteredSuggestions.length === 0) {
        // If no results found, add input value to suggestions
        filteredSuggestions.push(inputValue);
      }
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSelectSuggestion = suggestion => {
    setValue(suggestion);
    setSuggestions(symptoms);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Chief Complaint:', value);
    setSubmitted(true);
  };

  return (
    <div>
        <Navbar />
        <div className="ChiefComplaint card">
            <h1>Chief Complaint</h1>
            {submitted ? (
              <Questions chiefComplaint={value} />
            ) : (
              <form className='form-cc' onSubmit={handleSubmit}>
                  <div className="form-group-cc">
                      <label htmlFor="chief-complaint" className='label-cc'>Chief Complaint:</label>
                      <input
                          type="text"
                          id="chief-complaint"
                          name="chief-complaint"
                          value={value}
                          onChange={handleChange}
                          className='input-cc'
                      />
                      {suggestions.length > 0 ? (
                          <ul className="suggestions">
                          {suggestions.map(suggestion => (
                              <li key={suggestion} onClick={() => handleSelectSuggestion(suggestion)}>
                              {suggestion}
                              </li>
                          ))}
                          </ul>
                      ) : (
                          <p>No results found</p>
                      )}
                  </div>
                  <button type="submit" className='button-cc'>Submit</button>
              </form>
            )}
        </div>
    </div>
  );
}

export default ChiefComplaint;
