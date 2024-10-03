import React, { useState } from 'react';

function Location({ ws }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLocationUpdate = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      ws.send(JSON.stringify({
        latitude,
        longitude,
      }));
    });
  };

  return (
    <button onClick={handleLocationUpdate}>
      Update Location
    </button>
  );
}

export default Location;