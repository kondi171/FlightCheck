import styles from './../../assets/scss/modules/Modal.module.scss';
import { TimezoneData } from '../../ts/interfaces';
import { AppContext } from '../../AppContext';
import { AppContextType } from '../../ts/types';
import { useContext, useEffect, useState } from 'react';

const TimezoneModal = () => {

  const { currentTimezone, setCurrentTimezone } = useContext(AppContext) as AppContextType;

  const [timezones, setTimezones] = useState<TimezoneData[]>([]);
  const [currentLocations, setCurrentLocations] = useState<TimezoneData>();

  const getTimezones = () => {
    fetch('timezones.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(res => {
        return res.json()
      })
      .then(timezones => {
        setTimezones(timezones);
      });
  };

  const handleChangeTimezone = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentTimezone(e.target.value);
  };

  useEffect(() => {
    getTimezones();
  }, []);

  useEffect(() => {
    const selectedTimezoneLocations = timezones.find(tz => tz.name === currentTimezone);
    setCurrentLocations(selectedTimezoneLocations);
  }, [currentTimezone, timezones]);

  return (
    <div className={styles.timezone}>
      <h2>Set Timezone</h2>
      <div className={styles.select}>
        <select className={styles.timezoneSelect} value={currentTimezone} onChange={handleChangeTimezone}>
          {timezones.map((timezone: TimezoneData) => (
            <option key={timezone.name} value={timezone.name}>
              {timezone.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.countries}>
        <h3>Locations that do not use DST:</h3>
        <div className={styles.noDST}>
          {currentLocations?.occurrence && currentLocations.occurrence.map(currentCountry => (
            <div key={currentCountry.name} className={styles.location}>
              <img src={`https://flagsapi.com/${currentCountry.code}/shiny/64.png`} alt={currentCountry.name} />
              <span>{currentCountry.name}</span>
            </div>
          ))}
          {currentLocations?.occurrence.length === 0 && <span className={styles.noLocations}>None</span>}
        </div>
        <h3>Locations that use DST:</h3>
        <div className={styles.withDST}>
          {currentLocations?.occurrenceDST && currentLocations.occurrenceDST.map(currentCountry => (
            <div key={currentCountry.name} className={styles.location}>
              <img src={`https://flagsapi.com/${currentCountry.code}/shiny/64.png`} alt={currentCountry.name} />
              <span>{currentCountry.name}</span>
            </div>
          ))}
          {currentLocations?.occurrenceDST.length === 0 && <span className={styles.noLocations}>None</span>}
        </div>
      </div>
    </div>
  );
};

export default TimezoneModal;