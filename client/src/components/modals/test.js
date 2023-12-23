import { useContext, useEffect, useState } from 'react';
import styles from './../assets/scss/modules/Clock.module.scss';
import { AppContext } from '../AppContext';
import { AppContextType } from '../ts/types';
import { Watch } from '../ts/interfaces';

const Clock = () => {

  const { currentTimezone } = useContext(AppContext) as AppContextType;

  const [watch, setWatch] = useState < Watch > ();
  const hours = 12;
  const minutes = 32;
  let seconds = 16;
  // const time = new Date();
  // const hours = time.getUTCHours();
  // const minutes = time.getUTCMinutes();
  // const seconds = time.getUTCSeconds();

  const calculateTimeInTimezone = () => {
    let hourResult = 0;
    let minuteResult = 0;
    const timezoneHours = Number(currentTimezone.slice(4, 6));
    const timezoneMinutes = Number(currentTimezone.slice(7, 9));
    const sign = currentTimezone.slice(3, 4);
    if (sign === '+') {
      hourResult = hours + timezoneHours;
      if (hourResult === 24) hourResult = 0;
      else if (hourResult > 24) hourResult -= 24;
      minuteResult = minutes + timezoneMinutes;
      if (minuteResult === 60) {
        minuteResult = 0;
        hourResult += 1;
      } else if (minuteResult > 60) {
        minuteResult -= 60;
        hourResult += 1;
      }
    } else if (sign === '-') {
      hourResult = hours - timezoneHours;
      if (hourResult === 24) hourResult = 0;
      else if (hourResult < 0) hourResult += 24;
      minuteResult = minutes - timezoneMinutes;
      if (minuteResult === 60) {
        minuteResult = 0;
        hourResult += 1
      } else if (minuteResult > 60) {
        minuteResult += 60;
        hourResult -= 1;
      }
    }
    if (seconds === 0) {
      minuteResult += 1;
    }
    console.log(`${hourResult} : ${minuteResult} : ${seconds}`);
    setWatch({
      hour: String(hourResult < 10 ? `0${hourResult}` : hourResult),
      minute: String(minuteResult < 10 ? `0${minuteResult}` : minuteResult),
      second: String(seconds < 10 ? `0${seconds}` : seconds),
    });
  }

  useEffect(() => {
    calculateTimeInTimezone();
  }, [currentTimezone]);

  useEffect(() => {
    const secondInterval = setInterval(() => {
      seconds++;
    }, 1000);
  }, []);

  return (
    <div className={styles.clock}>
      {watch && <>
        <p className={styles.watch}>{`${watch?.hour}: ${watch?.minute}: ${watch?.second}`}</p>
        <span className={styles.timeZone}>{currentTimezone}</span>
      </>}
    </div>
  );
}

export default Clock;



import { useContext, useEffect, useState } from 'react';
import styles from './../assets/scss/modules/Clock.module.scss';
import { AppContext } from '../AppContext';
import { AppContextType } from '../ts/types';
import { Watch } from '../ts/interfaces';

const Clock = () => {

  const { currentTimezone } = useContext(AppContext) as AppContextType;

  const [watch, setWatch] = useState < Watch > ();
  const [time, setTime] = useState({
    hours: 12,
    minutes: 30,
    seconds: 55
  });
  const calculateTimeInTimezone = (seconds: number) => {
    let hourResult = 0;
    let minuteResult = 0;
    const timezoneHours = Number(currentTimezone.slice(4, 6));
    const timezoneMinutes = Number(currentTimezone.slice(7, 9));
    const sign = currentTimezone.slice(3, 4);
    if (sign === '+') {
      hourResult = time.hours + timezoneHours;
      if (hourResult === 24) hourResult = 0;
      else if (hourResult > 24) hourResult -= 24;
      minuteResult = time.minutes + timezoneMinutes;
      if (minuteResult === 60) {
        minuteResult = 0;
        hourResult += 1;
      } else if (minuteResult > 60) {
        minuteResult -= 60;
        hourResult += 1;
      }
    } else if (sign === '-') {
      hourResult = time.hours - timezoneHours;
      if (hourResult === 24) hourResult = 0;
      else if (hourResult < 0) hourResult += 24;
      minuteResult = time.minutes - timezoneMinutes;
      if (minuteResult === 60) {
        minuteResult = 0;
        hourResult += 1
      } else if (minuteResult > 60) {
        minuteResult += 60;
        hourResult -= 1;
      }
    }
    // console.log(object);
    if (seconds === 0) {
      minuteResult += 1;
    }
    setTime({
      hours: hourResult,
      minutes: minuteResult,
      seconds: seconds
    })
    console.log(`${hourResult} : ${minuteResult} : ${seconds}`);
    // setWatch({
    //   hours: String(hourResult < 10 ? `0${hourResult}` : hourResult),
    //   minutes: String(minuteResult < 10 ? `0${minuteResult}` : minuteResult),
    //   seconds: String(watch?.seconds < 10 ? `0${seconds}` : seconds),
    // });
  }
  useEffect(() => {
    let seconds = 57;
    const intervalId = setInterval(() => {
      if (seconds >= 59) seconds = 0;
      else ++seconds;
      calculateTimeInTimezone(seconds);
    }, 1000);


    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.clock}>
      {watch && <>
        <p className={styles.watch}>{`${time.hours}: ${time.minutes}: ${time.seconds}`}</p>
        <span className={styles.timeZone}>{currentTimezone}</span>
      </>}
    </div>
  );
}

export default Clock;