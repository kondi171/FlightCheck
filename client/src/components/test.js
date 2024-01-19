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
import { AppContextType, Flights } from '../ts/types';
import { darkModeStyles, defaultMapProps } from '../ts/objects';
import { FlightData, LiveFlight } from '../ts/interfaces';
import { DataType, Direction, FlightStatus } from '../ts/enums';
import { directionDeg } from '../ts/objects';

const Map = () => {
  const { darkMode, mapPosition, liveFlights, map, maps, setMap, setMaps, setActiveFlight, setDataType, setFlightsData } = useContext(AppContext) as AppContextType;

  const markerRef = useRef < any[] > ([]);

  const handleApiLoaded = (map: unknown, maps: unknown) => {
    setMap(map);
    setMaps(maps);
    pushPlaneMarker();
  }
  const pushPlaneMarker = () => {
    liveFlights.forEach((liveFlight: LiveFlight, index: number) => {
      const { airline, arrival, date, status, departure, number, position } = liveFlight;

      const marker = new maps!.Marker({
        position: { lat: position.lat, lng: position.lng },
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
        setActiveFlight(liveFlight);
        setDataType(DataType.FLIGHT)
      });
      markerRef.current[index] = marker;
    });
  }
  const calculateFlight = () => {
    if (liveFlights.length < 100) return;
    else if (liveFlights.length >= 100) {
      const departureDate = new Date(`2024-01-12T18:00`);
      const arrivalDate = new Date(`2024-01-12T22:45`);
      liveFlights.forEach(liveFlight => {
        const startPosition = {
          lat: liveFlight.departure.airport?.latitude_deg,
          lng: liveFlight.departure.airport?.longitude_deg
        };
        const endPosition = {
          lat: liveFlight.arrival.airport?.latitude_deg,
          lng: liveFlight.arrival.airport?.longitude_deg
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
        const rotationAngle = Math.atan2(flightDirection.lng, flightDirection.lat) * (180 / Math.PI);
        if (rotationAngle >= directionDeg.northernEast.from && rotationAngle <= directionDeg.northernEast.to) {
          liveFlight.direction = Direction.NORTHERN_EAST;
        }
        else if (rotationAngle >= directionDeg.east.from && rotationAngle <= directionDeg.east.to) {
          liveFlight.direction = Direction.EAST;
        }
        else if (rotationAngle >= directionDeg.southernEast.from && rotationAngle <= directionDeg.southernEast.to) {
          liveFlight.direction = Direction.SOUTHERN_EAST;
        }
        else if (rotationAngle >= directionDeg.south.from && rotationAngle <= directionDeg.south.to) {
          liveFlight.direction = Direction.SOUTH;
        }
        else if (rotationAngle >= directionDeg.southernWest.from && rotationAngle <= directionDeg.southernWest.to) {
          liveFlight.direction = Direction.SOUTHERN_WEST;
        }
        else if (rotationAngle >= directionDeg.west.from && rotationAngle <= directionDeg.west.to) {
          liveFlight.direction = Direction.WEST;
        }
        else {
          liveFlight.direction = Direction.NORTH;
        }
        // Oblicz aktualną pozycję na podstawie interpolacji liniowej
        const currentLat = startPosition.lat + (endPosition.lat - startPosition.lat) * progress;
        const currentLng = startPosition.lng + (endPosition.lng - startPosition.lng) * progress;
        liveFlight.position = {
          lat: currentLat,
          lng: currentLng
        }

        // if (timeDifferenceSystemMs <= 0) {
        //     removePlaneMarker();
        // }
      });
    }
  }
  useEffect(() => {
    if (markerRef.current) {
      let icon = planeNorth;
      markerRef.current.setPosition({ lat: position.y, lng: position.x });
      if (direction === Direction.NORTH) icon = planeNorth
      else if (direction === Direction.NORTHERN_EAST) icon = planeNorthernEast
      else if (direction === Direction.EAST) icon = planeEast
      else if (direction === Direction.SOUTHERN_EAST) icon = planeSouthernEast
      else if (direction === Direction.SOUTH) icon = planeSouth
      else if (direction === Direction.SOUTHERN_WEST) icon = planeSouthernWest
      else if (direction === Direction.WEST) icon = planeWest
      else if (direction === Direction.NORTHERN_WEST) icon = planeNorthernWest
      markerRef.current.setIcon({
        url: icon,
        scaledSize: new maps.Size(50, 50),
      });
    }
  }, [liveFlights]);
  useEffect(() => {
    const interval = setInterval(() => {
      calculateFlight();
    }, 1000); // Uruchamianie co sekundę
    console.log('object');
    return () => clearInterval(interval);
  }, []);

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


const calculateFlight = () => {
  liveFlights.forEach((live, index) => {
    const departureDate = new Date(`2024-01-19T18:40`);
    const arrivalDate = new Date(`2024-01-19T19:00`);
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