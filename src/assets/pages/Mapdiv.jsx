/* eslint-disable react/prop-types */
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl'; // Import mapbox-gl for using LngLatBounds
import { useEffect, useRef, useState } from 'react';

export default function Mapdiv({ data }) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapLoaded && data.length > 0) {
      const bounds = data.reduce((bounds, location) => {
        return bounds.extend(location.coordinates);
      }, new mapboxgl.LngLatBounds(data[0].coordinates, data[0].coordinates));

      mapRef.current.fitBounds(bounds, {
        padding: 150,
        duration: 200, // Optional: Duration for the transition
      });
    }
  }, [mapLoaded, data]);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken="pk.eyJ1IjoicHJhdGhhbXNrIiwiYSI6ImNsemI0Y3lkczBwODYycXNhdnRtcmNpNXgifQ.jb72CnbhadnnADNWkl3NJQ"
      style={{ width: '100%', height: '100%' }}
      fadeDuration={200}
      mapStyle="mapbox://styles/prathamsk/clzbhvptb008b01qwbhpadfsw"
      onLoad={() => setMapLoaded(true)}
      scrollZoom={false}
    >
      {data.map((location) => (
        <div key={location.id}>
          <Marker
            longitude={location.coordinates[0]}
            latitude={location.coordinates[1]}
            onClick={() => setSelectedLocation(location)}
          >
            <img
              src="/pin-1.png"
              alt="Marker"
              style={{ width: '40px', height: '40px' }} // Adjust size as needed
            />
          </Marker>

          {selectedLocation && selectedLocation.id === location.id && (
            <Popup
              longitude={location.coordinates[0]}
              latitude={location.coordinates[1]}
              closeButton={true}
              closeOnClick={false}
              onClose={() => {}}
              anchor="bottom"
              offset={20}
            >
              <div className        ='font-sans font-medium'>
                <h3>{location.description}</h3>

                <h3>day : {location.day}</h3>
              </div>  
            </Popup>
          )}
        </div>
      ))}
    </Map>
  );
}
