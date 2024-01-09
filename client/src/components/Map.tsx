import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from './../assets/scss/modules/Map.module.scss';
import GoogleMapReact from 'google-map-react';
import planeIcon from './../assets/img/planeIcon.png';

import { AppContext } from '../AppContext';
import { AppContextType } from '../ts/types';
import { darkModeStyles, defaultMapProps } from '../ts/objects';

const Map = () => {
    const { darkMode, setMap, setMaps, mapPosition } = useContext(AppContext) as AppContextType;
    const handleApiLoaded = (map: unknown, maps: unknown) => {
        setMap(map);
        setMaps(maps);
    }
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
