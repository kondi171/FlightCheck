import { useContext, useEffect } from 'react';
import styles from './../assets/scss/modules/Stats.module.scss';
import { AppContext } from '../AppContext';
import { AppContextType } from '../ts/types';

const Stats = () => {
    const { airportsData, activeAirport } = useContext(AppContext) as AppContextType;
    const { ident, type, name, latitude_deg, longitude_deg, elevation_ft, continent, iso_country, municipality, wikipedia_link } = activeAirport;
    useEffect(() => {
        // console.log(airportsData);
    }, [airportsData]);
    return (
        <section className={styles.stats}>
            <h3>Airport</h3>
            <div className={styles.airports}>
                <div className={styles.stat}>ID: <strong>{ident === '' ? <span className={styles.error}>No Data</span> : ident}</strong></div>
                <div className={styles.stat}>Name: <strong>{name === '' ? <span className={styles.error}>No Data</span> : name}</strong></div>
                <div className={styles.stat}>Type: <strong>{type === '' ? <span className={styles.error}> No Data</span> : type}</strong></div>
                <div className={styles.stat}>Latitude degree: <strong>{latitude_deg === '' ? <span className={styles.error}>No Data</span> : Number(latitude_deg).toFixed(4)}</strong></div>
                <div className={styles.stat}>Longitude degree: <strong>{longitude_deg === '' ? <span className={styles.error}>No Data</span> : Number(longitude_deg).toFixed(4)}</strong></div>
                <div className={styles.stat}>Continent: <strong>{continent === '' ? <span className={styles.error}> No Data</span> : continent}</strong></div>
                <div className={styles.stat}>Country Code: <strong>{iso_country === '' ? <span className={styles.error}>No Data</span> : iso_country}</strong></div>
                <div className={styles.stat}>City: <strong>{municipality === '' ? <span className={styles.error}>No Data</span> : municipality}</strong></div>
                <div className={styles.stat}>Sea Level: <strong>{elevation_ft === '' ? <span className={styles.error}>No Data</span> : elevation_ft}</strong></div>
                <div className={styles.stat}>Link: <strong>{wikipedia_link === '' ? <span className={styles.error}>No Data</span> : <a target="_blank" href={wikipedia_link}>Visit</a>}</strong></div>
            </div>
            <div className={styles.btnsWrapper}>
                <button>Show on the map</button>
            </div>
        </section>
    );
}

export default Stats;

// {activeAirport ?
//     <>
//         <div className={styles.stat}>Name: <strong>{airportsData[0]?.name}</strong></div>
//         <div className={styles.stat}>Type: <strong>{airportsData[0]?.type}</strong></div>
//         <div className={styles.stat}>Sea Level: <strong>{airportsData[0]?.elevation_ft}</strong></div>
//         <div className={styles.stat}>Continent: <strong>{airportsData[0]?.continent}</strong></div>
//         <div className={styles.stat}>Country: <strong>{airportsData[0]?.iso_country}</strong></div>
//         <div className={styles.stat}>City: <strong>{airportsData[0]?.municipality}</strong></div>
//         <div className={styles.stat}>Link: <strong>{airportsData[0]?.wikipedia_link}</strong></div>
//     </> : <>
//         <div className={styles.stat}>Name: <strong>{activeAirport?.name}</strong></div>
//         <div className={styles.stat}>Type: <strong>{activeAirport?.type}</strong></div>
//         <div className={styles.stat}>Sea Level: <strong>{activeAirport?.elevation_ft}</strong></div>
//         <div className={styles.stat}>Continent: <strong>{activeAirport?.continent}</strong></div>
//         <div className={styles.stat}>Country: <strong>{activeAirport?.iso_country}</strong></div>
//         <div className={styles.stat}>City: <strong>{activeAirport?.municipality}</strong></div>
//         <div className={styles.stat}>Link: <strong>{activeAirport?.wikipedia_link}</strong></div>
//     </>
// }