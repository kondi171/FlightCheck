import { useEffect, useState, useRef, useContext } from 'react';
import styles from './../assets/scss/modules/Map.module.scss';
import GoogleMapReact from 'google-map-react';
import planeIcon from './../assets/img/planeIcon.png';

import { AppContext } from '../AppContext';
import { AppContextType } from '../ts/types';
import { darkModeStyles } from '../ts/objects';

const defaultMapProps = {
  center: {
    lat: 52.237049,
    lng: 21.017532,
  },
  zoom: 10
};

const Map = () => {
  const { darkMode, setMap, setMaps } = useContext(AppContext) as AppContextType;

  const [position, setPosition] = useState({ x: 21.017532, y: 52.237049 });


  // const markerRef = useRef<any>(null);

  const handleApiLoaded = (map: unknown, maps: unknown) => {
    // const marker = new maps.Marker({
    //     position: { lat: position.y, lng: position.x },
    //     map,
    //     title: 'Wylot',
    //     icon: {
    //         url: planeIcon,
    //         scaledSize: new maps.Size(50, 50),
    //     },
    // });
    // markerRef.current = marker;
    setMap(map);
    setMaps(maps);
  };

  // useEffect(() => {
  // console.log(flightData?.data[0]);
  // }, [flightData]);

  // useEffect(() => {
  //     if (markerRef.current) {
  //         markerRef.current.setPosition({ lat: position.y, lng: position.x });
  //     }
  // }, [position]);

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
      <input type="text" />
    </section>
  );
}

export default Map;
