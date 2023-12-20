import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from './../assets/scss/modules/Map.module.scss';
import GoogleMapReact from 'google-map-react';
import planeIcon from './../assets/img/planeIcon.png';
import { AppContext } from '../AppContext';
import { AppContextType } from '../ts/types';

const defaultMapProps = {
    center: {
        lat: 52.237049,
        lng: 21.017532,
    },
    zoom: 10
};

const darkModeStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }]
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
    }
]
const Map = ({ flightData }: any) => {
    const [position, setPosition] = useState({ x: 21.017532, y: 52.237049 });

    const { darkMode } = useContext(AppContext) as AppContextType;

    const markerRef = useRef<any>(null);
    const handleApiLoaded = (map: any, maps: any) => {
        const marker = new maps.Marker({
            position: { lat: position.y, lng: position.x },
            map,
            title: 'Wylot',
            icon: {
                url: planeIcon,
                scaledSize: new maps.Size(50, 50),
            },
        });
        markerRef.current = marker;
    };

    // useEffect(() => {
    // console.log(flightData?.data[0]);
    // }, [flightData]);

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.setPosition({ lat: position.y, lng: position.x });
        }

    }, [position]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition({ x: position.x + 0.01, y: position.y + 0.01 });
        }, 1000); // Uruchamianie co sekundę

        return () => clearInterval(interval); // Czyszczenie interwału przy odmontowaniu komponentu
    }, [position]);

    return (
        <section className={styles.map}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyANuXfGFjl3_ovhubG_q38TL13FQUt44FM" }}
                defaultCenter={defaultMapProps.center}
                defaultZoom={defaultMapProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                options={{
                    styles: darkMode ? darkModeStyles : [],
                }}
            >
            </GoogleMapReact>
        </section>
    );
}

export default Map;
