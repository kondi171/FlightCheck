import { useEffect } from 'react';
import { AirportData } from '../ts/interfaces';
import styles from './../assets/scss/modules/Stats.module.scss';

const Stats: React.FC<{ airportsData: AirportData[] }> = ({ airportsData }) => {
    useEffect(() => {
        // console.log(airportsData);
    }, [airportsData]);
    return (
        <section className={styles.stats}>
            <h3>Airports</h3>
            {/* {airportsData.length !== 0 && airportsData.map((airport: AirportData, index: number) => {
                if (index >= 100) return;
                else {
                    <div className="airports">
                        <div className={styles.stat}>Velocity: <strong>1234mph</strong></div>
                        <div className={styles.stat}>Distance: <strong>756 mph</strong></div>
                        <div className={styles.stat}>Air Temperature: <strong>12&deg;C</strong></div>
                        <div className={styles.stat}>Departure Time: <strong>12:35</strong></div>
                        <div className={styles.stat}>Estimated Arrive Time: <strong>18:50</strong></div>
                    </div>
                }

            })} */}
            <div className="airports">
                <div className={styles.stat}>Name: <strong>{airportsData[0]?.name}</strong></div>
                <div className={styles.stat}>Type: <strong>{airportsData[0]?.type}</strong></div>
                <div className={styles.stat}>Sea Level: <strong>{airportsData[0]?.elevation_ft}</strong></div>
                <div className={styles.stat}>Continent: <strong>{airportsData[0]?.continent}</strong></div>
                <div className={styles.stat}>Country: <strong>{airportsData[0]?.iso_country}</strong></div>
                <div className={styles.stat}>City: <strong>{airportsData[0]?.municipality}</strong></div>
                <div className={styles.stat}>Link: <strong>{airportsData[0]?.wikipedia_link}</strong></div>
            </div>
            <div className={styles.btnsWrapper}>
                <button>Show on the map</button>
            </div>
        </section>
    );
}

export default Stats;