import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';

const SeoulMap = ({ locations, selectedLocation, onSelectLocation }) => {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);

    const mapContainerStyle = {
        width: '40rem',
        height: '40rem'
    };

    const center = {
        lat: 37.476970,
        lng: 126.879535
    };

    const handleMarkerClick = (location) => {
        onSelectLocation(location);
    };

    const handleCloseClick = () => {
        onSelectLocation(null);
    };

    const electricBoltIconURL = '/images/ecar.png';

    const calculateRoute = useCallback(() => {
        if (directionsService && selectedLocation) {
            directionsService.route(
                {
                    origin: center,
                    destination: { lat: Number(selectedLocation.lat), lng: Number(selectedLocation.lot) },
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirectionsResponse(result);
                    } else {
                        console.error(`Directions request failed due to ${status}`);
                    }
                }
            );
        }
    }, [directionsService, selectedLocation]);

    useEffect(() => {
        if (window.google && window.google.maps) {
            setDirectionsService(new window.google.maps.DirectionsService());
        }
    }, []);

    useEffect(() => {
        if (selectedLocation) {
            calculateRoute();
        }
    }, [selectedLocation, calculateRoute]);

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDfd1kQ4v4nIiisRvWDri5R-JQHshOGS7c"
            libraries={['places']}
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
            >
                <Marker position={center} />
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={{ lat: Number(location.lat), lng: Number(location.lot) }}
                        onClick={() => handleMarkerClick(location)}
                        icon={{
                            url: electricBoltIconURL,
                            scaledSize: { width: 50, height: 50 }
                        }}
                    />
                ))}

                {selectedLocation && (
                    <InfoWindow
                        position={{ lat: Number(selectedLocation.lat), lng: Number(selectedLocation.lot) }}
                        onCloseClick={handleCloseClick}
                    >
                        <div>
                            <h2>{selectedLocation.str_pnt_name}</h2>
                            <p>{selectedLocation.addr}</p>
                            <p>공유전기차 주차장</p>
                        </div>
                    </InfoWindow>
                )}

                {directionsResponse && (
                    <DirectionsRenderer
                        directions={directionsResponse}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default SeoulMap;
