import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';
import Map from './Map';
import Location from './Location';

function App() {
  const [location, setLocation] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/location/1/');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLocation(data);
    };

    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    ws.onerror = (error) => {
      console.log(`Error occurred: ${error}`);
    };

    ws.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };
  }, []);

  return (
    <div>
      <Map location={location} />
      <Location ws={ws} />
    </div>
  );
}

export default App;