import { useContext, useEffect, useState } from 'react';
import styles from './../assets/scss/modules/Stats.module.scss';
import { AppContext } from '../AppContext';
import { AppContextType } from '../ts/types';
import mapMarker from './../assets/img/marker.png';
import { DataType } from '../ts/enums';

const Stats = () => {
  const { activeAirport, activeFlight, map, maps, mapPosition, setMapPosition, dataType } = useContext(AppContext) as AppContextType;
  const { ident, type, name, latitude_deg, longitude_deg, elevation_ft, continent, iso_country, municipality, wikipedia_link } = activeAirport;
  const [markerTitles, setMarkerTitles] = useState<string[]>([]);

  const pushMarker = () => {
    const isMarked = markerTitles.find(markerTitle => markerTitle === name)
    if (isMarked) return;
    else {
      new maps.Marker({
        position: { lat: latitude_deg, lng: longitude_deg },
        map,
        title: name,
        icon: {
          url: mapMarker,
          scaledSize: new maps.Size(35, 50),
        }
      });
      setMarkerTitles([...markerTitles, name]);
      setMapPosition({ lat: Number(latitude_deg), lng: Number(longitude_deg) });
    }
  }

  useEffect(() => {
    console.log(activeFlight);
  }, [activeFlight]);

  return (
    <section className={styles.stats}>
      <h3>{dataType}</h3>

      <div className={styles.airports}>
        {dataType === DataType.AIRPORT ? <>
          <div className={styles.stat}>number: <strong>{ident === '' ? <span className={styles.error}>No Data</span> : ident}</strong></div>
          <div className={styles.stat}>Name: <strong>{name === '' ? <span className={styles.error}>No Data</span> : name}</strong></div>
          <div className={styles.stat}>Type: <strong>{type === '' ? <span className={styles.error}> No Data</span> : type}</strong></div>
          <div className={styles.stat}>Latitude degree: <strong>{latitude_deg === '' ? <span className={styles.error}>No Data</span> : Number(latitude_deg).toFixed(4)}</strong></div>
          <div className={styles.stat}>Longitude degree: <strong>{longitude_deg === '' ? <span className={styles.error}>No Data</span> : Number(longitude_deg).toFixed(4)}</strong></div>
          <div className={styles.stat}>Continent: <strong>{continent === '' ? <span className={styles.error}> No Data</span> : continent}</strong></div>
          <div className={styles.stat}>Country Code: <strong>{iso_country === '' ? <span className={styles.error}>No Data</span> : iso_country}</strong></div>
          <div className={styles.stat}>City: <strong>{municipality === '' ? <span className={styles.error}>No Data</span> : municipality}</strong></div>
          <div className={styles.stat}>Sea Level: <strong>{elevation_ft === '' ? <span className={styles.error}>No Data</span> : elevation_ft}</strong></div>
          <div className={styles.stat}>Link: <strong>{wikipedia_link === '' ? <span className={styles.error}>No Data</span> : <a target="_blank" href={wikipedia_link}>Visit</a>}</strong></div>
        </> :
          <>
            <div className={styles.stat}>Number: <strong>{!activeFlight?.number ? <span className={styles.error}>No Data</span> : activeFlight?.number}</strong></div>
            <div className={styles.stat}>Date: <strong>{!activeFlight?.date ? <span className={styles.error}>No Data</span> : activeFlight?.date}</strong></div>
            <div className={styles.stat}>Status: <strong>{!activeFlight?.status ? <span className={styles.error}>No Data</span> : activeFlight?.status}</strong></div>
            <div className={styles.stat}>Airline: <strong>{!activeFlight?.airline ? <span className={styles.error}>No Data</span> : activeFlight?.airline}</strong></div>

            <div className={styles.stat}>Departure Airport: <strong>{!activeFlight?.departure.airport ? <span className={styles.error}>No Data</span> : activeFlight?.departure.airport?.name}</strong></div>
            <div className={styles.stat}>Departure Time: <strong>{!activeFlight?.departure ? <span className={styles.error}>No Data</span> : activeFlight?.departure.time}</strong></div>
            <div className={styles.stat}>Arrival Airport: <strong>{!activeFlight?.arrival.airport ? <span className={styles.error}>No Data</span> : activeFlight?.arrival.airport?.name}</strong></div>
            <div className={styles.stat}>Arrival Time: <strong>{!activeFlight?.arrival ? <span className={styles.error}>No Data</span> : activeFlight?.arrival.time}</strong></div>
          </>
        }
      </div>
      <div className={styles.btnsWrapper}>
        {/* <button onClick={pushMarker}>Show on the map</button> */}
        <button>Show on the map</button>
      </div>
    </section>
  );
}

export default Stats;