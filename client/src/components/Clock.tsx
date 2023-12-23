import { useContext, useEffect, useState } from 'react';
import styles from './../assets/scss/modules/Clock.module.scss';
import { AppContext } from '../AppContext';
import { AppContextType } from '../ts/types';
import { Watch } from '../ts/interfaces';

const Clock = () => {

  const { currentTimezone } = useContext(AppContext) as AppContextType;
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState(new Date());
  const [universalTime, setUniversalTime] = useState({
    hours: time.getUTCHours(),
    minutes: time.getUTCMinutes(),
    seconds: time.getUTCSeconds()
  });
  const [watch, setWatch] = useState({
    hours: time.getUTCHours(),
    minutes: time.getUTCMinutes(),
    seconds: time.getUTCSeconds()
  });

  const calculateTimeInTimezone = ({ hours, minutes, seconds }: Watch) => {
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
      } else if (minuteResult > 59) {
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
      } else if (minuteResult > 59) {
        minuteResult += 60;
        hourResult -= 1;
      }
    }
    setWatch({
      hours: hourResult,
      minutes: minuteResult,
      seconds: seconds
    });
  }

  const calculateTime = () => {
    const hours = universalTime.hours;
    let minutes = universalTime.minutes;
    let seconds = universalTime.seconds;
    const intervalId = setInterval(() => {
      if (seconds >= 59) {
        seconds = 0;
        minutes += 1;
      } else ++seconds;
      calculateTimeInTimezone({ hours, minutes, seconds });
    }, 1000);
    return intervalId;
  }

  useEffect(() => {
    const timezoneInterval = calculateTime();
    const universalTimeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    setTimeInterval(timezoneInterval);
    return () => {
      clearInterval(timezoneInterval);
      clearInterval(universalTimeInterval);
    }
  }, []);

  useEffect(() => {
    // console.log(timeInterval);
    if (timeInterval) {
      clearInterval(timeInterval);
      const intervalId = calculateTime();
      setTimeInterval(intervalId);
    }
  }, [currentTimezone]);

  return (
    <div className={styles.clock}>
      <p className={styles.watch}>
        {watch.hours}:
        {watch.minutes < 10 ? `0${watch.minutes}` : watch.minutes}:
        {watch.seconds < 10 ? `0${watch.seconds}` : watch.seconds}
      </p>
      <span className={styles.timeZone}>{currentTimezone}</span>
    </div>
  );
}

export default Clock;