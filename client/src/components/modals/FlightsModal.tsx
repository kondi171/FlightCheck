import { useContext, useEffect, useState } from 'react';
import styles from './../../assets/scss/modules/Modal.module.scss';
import { AppContext } from '../../AppContext';
import { AppContextType } from '../../ts/types';
import { AirportData, FlightData } from '../../ts/interfaces';
import { DataType, FlightStatus } from '../../ts/enums';

const FlightsModal = () => {

  const { flightsData, setActiveFlight, setDataType } = useContext(AppContext) as AppContextType;

  const [status, setStatus] = useState(FlightStatus.ACTIVE);
  const [data, setData] = useState(flightsData.active);

  const handleChangeStatus = (e: MouseEvent, status: FlightStatus) => {
    const allElements = document.querySelectorAll(`.${styles.status}`);
    allElements.forEach(el => el.classList.remove(styles.active));

    const clickedElement = e.target as HTMLElement;
    clickedElement.classList.add(styles.active);
    setStatus(status);
  }
  const handleSetFlightActive = (e: MouseEvent, flight: FlightData) => {
    const allElements = document.querySelectorAll(`.${styles.row}`);

    allElements.forEach(el => el.classList.remove(styles.activeAirport));

    const clickedElement = e.target?.parentElement as HTMLElement;
    clickedElement.classList.add(styles.activeAirport);
    setActiveFlight(flight);
    setDataType(DataType.FLIGHT);
  }

  useEffect(() => {
    if (status === FlightStatus.ACTIVE) setData(flightsData.active);
    else if (status === FlightStatus.SCHEDULED) setData(flightsData.scheduled);
    else if (status === FlightStatus.CANCELLED) setData(flightsData.cancelled);
    else if (status === FlightStatus.LANDED) setData(flightsData.landed);
    else if (status === FlightStatus.DIVERTED) setData(flightsData.diverted);
  }, [status]);

  return (
    <div className={styles.dataModal}>
      <h2>
        Flights Data
        <div className={styles.flightStatuses}>
          <div onClick={(e: MouseEvent) => handleChangeStatus(e, FlightStatus.ACTIVE)} className={`${styles.status} ${styles.active}`}>Active</div>
          <div onClick={(e: MouseEvent) => handleChangeStatus(e, FlightStatus.SCHEDULED)} className={styles.status}>Scheduled</div>
          <div onClick={(e: MouseEvent) => handleChangeStatus(e, FlightStatus.CANCELLED)} className={styles.status}>Cancelled</div>
          <div onClick={(e: MouseEvent) => handleChangeStatus(e, FlightStatus.LANDED)} className={styles.status}>Landed</div>
          <div onClick={(e: MouseEvent) => handleChangeStatus(e, FlightStatus.DIVERTED)} className={styles.status}>Diverted</div>
        </div>
      </h2>
      <div className={styles.data}>
        <div className={styles.thead}>
          <div className={`${styles.cell} ${styles.info}`}>Number</div>
          <div className={`${styles.cell} ${styles.info}`}>Date</div>
          <div className={`${styles.cell} ${styles.info}`}>Departure Airport</div>
          <div className={`${styles.cell} ${styles.info}`}>Departure Time</div>
          <div className={`${styles.cell} ${styles.info}`}>Arrival Airport</div>
          <div className={`${styles.cell} ${styles.info}`}>Arrival Time</div>
          <div className={`${styles.cell} ${styles.info}`}>Airline</div>
        </div>
        <div className={styles.informations}>
          {data?.map((flight: FlightData, index: number) => {
            const { number, date, departure, arrival, airline } = flight;
            if (!departure.airport || !arrival.airport) return;
            else return (
              <div onClick={(e: MouseEvent) => handleSetFlightActive(e, flight)} id={String(`${index}_${number}`)} key={`${index}_${number}`} className={styles.row}>
                <div className={styles.cell}>{number ? number : <span className={styles.error}>No Data</span>}</div>
                <div className={styles.cell}>{date ? date : <span className={styles.error}>No Data</span>}</div>
                <div className={styles.cell}>{departure.airport.name ? departure.airport.name : <span className={styles.error}>No Data</span>}</div>
                <div className={styles.cell}>{departure.time ? departure.time : <span className={styles.error}>No Data</span>}</div>

                <div className={styles.cell}>{arrival.airport.name ? arrival.airport.name : <span className={styles.error}>No Data</span>}</div>
                <div className={styles.cell}>{arrival.time ? arrival.time : <span className={styles.error}>No Data</span>}</div>

                <div className={styles.cell}>{airline}</div>
              </div>);
          })}
        </div>
      </div>
    </div>
  );
}

export default FlightsModal;