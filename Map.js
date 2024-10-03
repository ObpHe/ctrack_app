import React from 'react';
import L from 'leaflet';

function Map({ location }) {
  const map = L.map('map').setView([0, 0], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    subdomains: ['a', 'b', 'c'],
  }).addTo(map);

  if (location) {
    const marker = L.marker([location.latitude, location.longitude]).addTo(map);
    map.setView([location.latitude, location.longitude], 13);
  }

  return <div id="map" style={{ height: '600px', width: '800px' }} />;
}

export default Map;