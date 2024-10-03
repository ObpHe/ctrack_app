import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // Import   
 Marker
import WebSocket from 'ws';

const App = () => {
  const [location, setLocation] = React.useState<{ latitude: number; longitude: number } | null>(null);
  const [map, setMap] = React.useState(null);

  React.useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/location/1/');

    ws.onmessage = (event) => {
      if (typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          setLocation(data);
        } catch (error) {
          console.error('Error parsing data:', error);
        }
      } else if (event.data instanceof Buffer) {
        console.log('Received binary data:', event.data);
      } else {
        console.log('Received unknown data type:', event.data);
      }
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
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        minZoomLevel={10}
        maxZoomLevel={20}
        provider={PROVIDER_GOOGLE}
      >
        {location?.latitude && location?.longitude && (
            <Marker  // Use the imported Marker component
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Current Location"
            />
          )}
          </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});

export default App;