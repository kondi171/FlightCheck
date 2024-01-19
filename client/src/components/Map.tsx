import { useEffect, useState, useRef, useContext } from 'react';
import styles from './../assets/scss/modules/Map.module.scss';
import GoogleMapReact from 'google-map-react';
import planeNorth from './../assets/img/planeNorth.png';
import planeSouth from './../assets/img/planeSouth.png';
import planeEast from './../assets/img/planeEast.png';
import planeWest from './../assets/img/planeWest.png';
import planeNorthernEast from './../assets/img/planeNorthernEast.png';
import planeNorthernWest from './../assets/img/planeNorthernWest.png';
import planeSouthernWest from './../assets/img/planeSouthernWest.png';
import planeSouthernEast from './../assets/img/planeSouthernEast.png';

import { AppContext } from '../AppContext';
import { AppContextType } from '../ts/types';
import { darkModeStyles, defaultMapProps } from '../ts/objects';
import { FlightData, Flights } from '../ts/interfaces';
import { DataType, Direction, FlightStatus } from '../ts/enums';
import { directionDeg } from '../ts/objects';

const Map = () => {
    const { darkMode, mapPosition, flightsData, map, maps, setMap, setMaps, setActiveFlight, setDataType, setFlightsData } = useContext(AppContext) as AppContextType;
    const [liveFlights, setLiveFlights] = useState<FlightData[]>([]);

    const markerRef = useRef<any[]>([]);

    const handleApiLoaded = (map: unknown, maps: unknown) => {
        setMap(map);
        setMaps(maps);
        prepareLiveData();
    }

    const prepareLiveData = () => {
        flightsData.active.forEach((flight) => {
            const { departure, arrival } = flight;
            if (!departure.airport || !arrival.airport) return;
            else {
                liveFlights.push(flight);
                markerRef.current.push(null);
            }
        });
    }

    const pushPlaneMarker = (flight: FlightData, index: number) => {
        if (!flight) return;
        const { airline, arrival, departure, number, live } = flight;
        const marker = new maps!.Marker({
            position: { lat: live!.position.lat, lng: live!.position.lng },
            map,
            icon: {
                url: planeNorth,
                scaledSize: new maps.Size(50, 50),
            },
            title: `Number: ${number},
Airline: ${airline}
Departure: ${departure.airport?.name}
Arrival: ${arrival.airport?.name}
`,
        });
        marker.addListener('click', function () {
            setActiveFlight(flight);
            setDataType(DataType.FLIGHT)
        });
        markerRef.current[index] = marker;
    }

    const calculateFlight = () => {
        liveFlights.forEach((live, index) => {
            const departureDate = new Date(`2024-01-19T18:40`);
            const arrivalDate = new Date(`2024-01-19T19:20`);
            const startPosition = {
                lat: live.departure.airport?.latitude_deg,
                lng: live.departure.airport?.longitude_deg
            };
            const endPosition = {
                lat: live.arrival.airport?.latitude_deg,
                lng: live.arrival.airport?.longitude_deg
            };

            // Obliczanie różnicy czasu w milisekundach
            const timeDifferenceMs = arrivalDate - departureDate;

            // Pobierz czas systemowy
            const currentDateTime = new Date();

            // Oblicz różnicę czasu między arrivalDate a czasem systemowym
            const timeDifferenceSystemMs = arrivalDate - currentDateTime;

            // Oblicz współczynnik procentowy na podstawie różnicy czasu
            const progress = 1 - (timeDifferenceSystemMs / timeDifferenceMs);

            // Oblicz kierunek lotu
            const flightDirection = {
                lat: endPosition.lat - startPosition.lat,
                lng: endPosition.lng - startPosition.lng
            };

            // Oblicz kąt obrotu ikony samolotu
            const rotationAngle = (Math.atan2(flightDirection.lng, flightDirection.lat) * (180 / Math.PI) + 360) % 360;
            if (rotationAngle >= directionDeg.northernEast.from && rotationAngle <= directionDeg.northernEast.to) updateDirection(Direction.NORTHERN_EAST, index);
            else if (rotationAngle >= directionDeg.east.from && rotationAngle <= directionDeg.east.to) updateDirection(Direction.EAST, index);
            else if (rotationAngle >= directionDeg.southernEast.from && rotationAngle <= directionDeg.southernEast.to) updateDirection(Direction.SOUTHERN_EAST, index);
            else if (rotationAngle >= directionDeg.south.from && rotationAngle <= directionDeg.south.to) updateDirection(Direction.SOUTH, index);
            else if (rotationAngle >= directionDeg.southernWest.from && rotationAngle <= directionDeg.southernWest.to) updateDirection(Direction.SOUTHERN_WEST, index);
            else if (rotationAngle >= directionDeg.west.from && rotationAngle <= directionDeg.west.to) updateDirection(Direction.WEST, index);
            else updateDirection(Direction.NORTH, 7);

            // Oblicz aktualną pozycję na podstawie interpolacji liniowej
            const currentLat = startPosition.lat + (endPosition.lat - startPosition.lat) * progress;
            const currentLng = startPosition.lng + (endPosition.lng - startPosition.lng) * progress;

            updatePosition(currentLat, currentLng, index);

            if (timeDifferenceSystemMs <= 0) {
                const dataIndex = flightsData.active.findIndex(flight => flight.number === liveFlights[index].number);
                removePlaneMarker(index, dataIndex);
            }
        });
    }

    const updatePosition = (lat: number, lng: number, index: number) => {
        setLiveFlights(prevLiveFlights => {
            const newLiveFlights = [...prevLiveFlights];
            if (newLiveFlights[index]?.live) {
                newLiveFlights[index].live.position = {
                    lat: lat,
                    lng: lng
                };
            }
            return newLiveFlights;
        });
        markerRef.current[index].setPosition({ lat: lat, lng: lng });
    }
    const updateDirection = (direction: Direction, index: number) => {
        setLiveFlights(prevLiveFlights => {
            const newLiveFlights = [...prevLiveFlights];
            if (newLiveFlights[index]?.live) {
                newLiveFlights[index].live.direction = direction;
            }
            return newLiveFlights;
        });
        let icon = planeNorth;
        if (direction === Direction.NORTH) icon = planeNorth
        else if (direction === Direction.NORTHERN_EAST) icon = planeNorthernEast
        else if (direction === Direction.EAST) icon = planeEast
        else if (direction === Direction.SOUTHERN_EAST) icon = planeSouthernEast
        else if (direction === Direction.SOUTH) icon = planeSouth
        else if (direction === Direction.SOUTHERN_WEST) icon = planeSouthernWest
        else if (direction === Direction.WEST) icon = planeWest
        else if (direction === Direction.NORTHERN_WEST) icon = planeNorthernWest
        markerRef.current[index].setIcon({
            url: icon,
            scaledSize: new maps.Size(50, 50),
        });
    }

    const removePlaneMarker = (liveIndex: number, dataIndex: number) => {
        markerRef.current[liveIndex].setMap(null);
        setLiveFlights(prevLiveFlights => {
            const updatedActiveFlights = [...prevLiveFlights];
            updatedActiveFlights.splice(liveIndex, 1)[0];
            return updatedActiveFlights;
        });
        setFlightsData((prevFlightsData: Flights) => {
            const updatedActiveFlights = [...prevFlightsData.active];
            updatedActiveFlights[dataIndex].status = FlightStatus.LANDED;

            const removedFlight = updatedActiveFlights.splice(dataIndex, 1)[0];

            return {
                ...prevFlightsData,
                active: updatedActiveFlights,
                landed: [...prevFlightsData.landed, removedFlight],
            };
        });
    };

    useEffect(() => {
        if (liveFlights.length !== 0) {
            liveFlights.forEach((live, index) => {
                pushPlaneMarker(live, index);
            });
            const interval = setInterval(() => {
                calculateFlight();
            }, 1000);

            return () => clearInterval(interval);
        }

    }, [liveFlights.length]);

    return (
        <section className={styles.map}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyANuXfGFjl3_ovhubG_q38TL13FQUt44FM" }}
                center={mapPosition}
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