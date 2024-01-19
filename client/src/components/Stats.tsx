import { useContext, useEffect, useState } from 'react';
import styles from './../assets/scss/modules/Stats.module.scss';
import { AppContext } from '../AppContext';
import { AppContextType } from '../ts/types';
import mapMarker from './../assets/img/marker.png';
import { DataType, FlightStatus } from '../ts/enums';
import { AirportData, AirportMarker, FlightData } from '../ts/interfaces';

const Stats = () => {
  const { activeAirport, activeFlight, map, maps, setMapPosition, dataType, setActiveAirport, setDataType } = useContext(AppContext) as AppContextType;
  const { ident, type, name, latitude_deg, longitude_deg, elevation_ft, continent, iso_country, municipality, wikipedia_link } = activeAirport;
  const [markerTitles, setMarkerTitles] = useState<string[]>([]);

  const pushMarker = (airport: AirportData) => {
    const { name, latitude_deg, longitude_deg, type, elevation_ft, continent, municipality, iso_country } = airport;
    const isMarked = markerTitles.find(markerTitle => markerTitle === name)
    setMapPosition({ lat: Number(latitude_deg), lng: Number(longitude_deg) });
    if (isMarked) return;
    else {
      const marker = new maps.Marker({
        position: { lat: latitude_deg, lng: longitude_deg },
        map,
        title: `
        Name: ${name}
Type: ${type}
Latitude: ${Number(latitude_deg).toFixed(4)}
Longitude: ${Number(longitude_deg).toFixed(4)}
Continent: ${continent}
Country Code: ${iso_country}
City: ${municipality}
Sea Level: ${elevation_ft}
        `,
        icon: {
          url: mapMarker,
          scaledSize: new maps.Size(35, 50),
        }
      });
      setMarkerTitles([...markerTitles, name]);
      marker.addListener('click', function () {
        setActiveAirport(airport);
        setDataType(DataType.AIRPORT)
      });
    }
  }

  const showFlight = () => {

  }

  // useEffect(() => {
  //   console.log('status changed');
  // }, [activeFlight?.status]);

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
            <div className={styles.btnsWrapper}>
              <button onClick={() => pushMarker(activeFlight?.departure.airport)}>Show Departure Airport </button>
            </div>
            <div className={styles.stat}>Departure Time: <strong>{!activeFlight?.departure ? <span className={styles.error}>No Data</span> : activeFlight?.departure.time}</strong></div>
            <div className={styles.stat}>Arrival Airport: <strong>{!activeFlight?.arrival.airport ? <span className={styles.error}>No Data</span> : activeFlight?.arrival.airport?.name}</strong></div>
            <div className={styles.btnsWrapper}>
              <button onClick={() => pushMarker(activeFlight?.arrival.airport)}>Show Arrival Airport </button>
            </div>
            <div className={styles.stat}>Arrival Time: <strong>{!activeFlight?.arrival ? <span className={styles.error}>No Data</span> : activeFlight?.arrival.time}</strong></div>
          </>
        }
      </div>
      <div className={styles.btnsWrapper}>
        {dataType === DataType.AIRPORT && <button onClick={() => pushMarker(activeAirport)}>Show Airport</button>}
        {dataType === DataType.FLIGHT && activeFlight?.status === FlightStatus.ACTIVE && <button onClick={showFlight}>Show Flight</button>}
      </div>
    </section>
  );
}

export default Stats;