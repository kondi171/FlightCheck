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
import { FlightData } from '../ts/interfaces';
import { DataType, Direction, FlightStatus } from '../ts/enums';
import { directionDeg } from '../ts/objects';

const Map = () => {
  const { darkMode, mapPosition, flightsData, map, maps, setMap, setMaps, setActiveFlight, setDataType, setFlightsData } = useContext(AppContext) as AppContextType;

  const [position, setPosition] = useState({ x: 21.017532, y: 52.237049 });
  const [direction, setDirection] = useState(Direction.NORTH);

  const markerRef = useRef < any > (null);

  const handleApiLoaded = (map: unknown, maps: unknown) => {
    setMap(map);
    setMaps(maps);
    pushPlaneMarker(flightsData.active[11]);
  }

  const calculateFlight = () => {
    if (flightsData.active.length >= 100) {
      const departureDate = new Date(`2024-01-12T18:00`);
      const arrivalDate = new Date(`2024-01-12T22:45`);
      const startPosition = {
        lat: flightsData.active[11].departure.airport?.latitude_deg,
        lng: flightsData.active[11].departure.airport?.longitude_deg
      };
      const endPosition = {
        lat: flightsData.active[11].arrival.airport?.latitude_deg,
        lng: flightsData.active[11].arrival.airport?.longitude_deg
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
        setDirection(Direction.NORTHERN_EAST);
      }
      else if (rotationAngle >= directionDeg.east.from && rotationAngle <= directionDeg.east.to) {
        setDirection(Direction.EAST);
      }
      else if (rotationAngle >= directionDeg.southernEast.from && rotationAngle <= directionDeg.southernEast.to) {
        setDirection(Direction.SOUTHERN_EAST);
      }
      else if (rotationAngle >= directionDeg.south.from && rotationAngle <= directionDeg.south.to) {
        setDirection(Direction.SOUTH);
      }
      else if (rotationAngle >= directionDeg.southernWest.from && rotationAngle <= directionDeg.southernWest.to) {
        setDirection(Direction.SOUTHERN_WEST);
      }
      else if (rotationAngle >= directionDeg.west.from && rotationAngle <= directionDeg.west.to) {
        setDirection(Direction.WEST);
      }
      else {
        setDirection(Direction.NORTH);
      }
      // Oblicz aktualną pozycję na podstawie interpolacji liniowej
      const currentLat = startPosition.lat + (endPosition.lat - startPosition.lat) * progress;
      const currentLng = startPosition.lng + (endPosition.lng - startPosition.lng) * progress;

      setPosition({
        y: currentLat,
        x: currentLng
      });
      if (timeDifferenceSystemMs <= 0) {
        removePlaneMarker();
      }
    }
  }


  const pushPlaneMarker = (flight: FlightData) => {
    if (!flight) return;
    const { airline, arrival, date, status, departure, number } = flight;

    const marker = new maps!.Marker({
      position: { lat: position.y, lng: position.x },
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
    markerRef.current = marker;
  }
  const removePlaneMarker = () => {
    markerRef.current.setMap(null);
    setFlightsData((prevFlightsData: Flights) => {
      const updatedActiveFlights = [...prevFlightsData.active];
      updatedActiveFlights[11].status = FlightStatus.LANDED;

      const removedFlight = updatedActiveFlights.splice(11, 1)[0];

      return {
        ...prevFlightsData,
        active: updatedActiveFlights,
        landed: [...prevFlightsData.landed, removedFlight],
      };
    });
  };

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
      })
    }
  }, [position]);

  useEffect(() => {
    const interval = setInterval(() => {
      calculateFlight();
    }, 1000); // Uruchamianie co sekundę

    return () => clearInterval(interval);
  }, [position]);

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