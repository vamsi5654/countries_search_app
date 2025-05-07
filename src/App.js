import React, { useEffect, useState } from 'react';
import './App.css'; // make sure you import the CSS

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  //console.log('Countries:', countries);

  useEffect(() => {
    fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const filteredCountries = countries.filter(country =>
    !searchTerm || (country.common && country.common.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="app">

      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className="country-grid">
        {filteredCountries.map(country => (
          <div key={country.common} className="countryCard">
            <img src={country.png} alt={country.common} />
            <p>{country.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
