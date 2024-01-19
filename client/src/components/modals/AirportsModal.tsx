import { useContext, useEffect, useState } from 'react';
import styles from './../../assets/scss/modules/AirportsModal.module.scss';
import { AppContext } from '../../AppContext';
import { AppContextType } from '../../ts/types';
import { AirportData } from '../../ts/interfaces';
import { DataType } from '../../ts/enums';
const AirportsModal = () => {

  const { airportsData, activeAirport, setActiveAirport, setDataType } = useContext(AppContext) as AppContextType;
  const [airportsPage, setAirportsPage] = useState<AirportData[]>([]);
  const [page, setPage] = useState(0);

  const handlePrevious = () => {
    if (page !== 0) setPage(page - 1)
  }
  const handleNext = () => {
    if (page !== airportsPage.length - 1) setPage(page + 1)
  }

  const handleSetAirportActive = (e: MouseEvent, airport: AirportData) => {
    const allElements = document.querySelectorAll(`.${styles.row}`);
    allElements.forEach(el => el.classList.remove(styles.activeAirport));

    const clickedElement = e.target?.parentElement as HTMLElement;
    clickedElement.classList.add(styles.activeAirport);
    setActiveAirport(airport);
    setDataType(DataType.AIRPORT);
  }

  useEffect(() => {
    const airports = [];
    if (airportsPage.length === 0) {
      for (let i = 0; i < airportsData.length; i += 100) {
        const page = airportsData.slice(i, i + 100);
        airports.push(page);
      }
      setAirportsPage(airports);
    }
  }, []);

  useEffect(() => {
    const allElements = document.querySelectorAll(`.${styles.row}`);
    allElements.forEach(el => {
      el.classList.remove(styles.activeAirport);
      if (el.id === String(activeAirport.id))
        el.classList.add(styles.activeAirport);
    });
    console.log(airportsPage[page]);
  }, [airportsPage, page]);

  return (
    <div className={styles.airportsModal}>
      <div className={styles.scrollDown}>
        <h2 className={styles.airportsTitle}>Airports Data</h2>
        <div className={styles.thead}>
          <div className={`${styles.cell} ${styles.info}`}>ID</div>
          <div className={`${styles.cell} ${styles.info}`}>Name</div>
          <div className={`${styles.cell} ${styles.info}`}>Type</div>
          <div className={`${styles.cell} ${styles.info}`}>Lat</div>
          <div className={`${styles.cell} ${styles.info}`}>Long</div>
          <div className={`${styles.cell} ${styles.info}`}>Continent</div>
          <div className={`${styles.cell} ${styles.info}`}>Country Code</div>
          <div className={`${styles.cell} ${styles.info}`}>City</div>
          <div className={`${styles.cell} ${styles.info}`}>Sea Level</div>
          <div className={`${styles.cell} ${styles.info}`}>Link</div>
        </div>
      </div>
      <div className={styles.clearFloat}></div>
      <div className={styles.tmain}>
        {airportsPage[page]?.map((airport: AirportData) => {
          const { id, ident, type, name, latitude_deg, longitude_deg, elevation_ft, continent, iso_country, municipality, wikipedia_link } = airport;
          return (
            <div id={String(id)} key={id} onClick={(e: MouseEvent) => handleSetAirportActive(e, airport)} className={styles.row}>
              <div className={styles.cell}>{ident === '' ? <span className={styles.error}>No Data</span> : ident}</div>
              <div className={styles.cell}>{name === '' ? <span className={styles.error}>No Data</span> : name}</div>
              <div className={styles.cell}>{type === '' ? <span className={styles.error}> No Data</span> : type}</div>
              <div className={styles.cell}>{latitude_deg === '' ? <span className={styles.error}>No Data</span> : Number(latitude_deg).toFixed(4)}</div>
              <div className={styles.cell}>{longitude_deg === '' ? <span className={styles.error}>No Data</span> : Number(longitude_deg).toFixed(4)}</div>
              <div className={styles.cell}>{continent === '' ? <span className={styles.error}> No Data</span> : continent}</div>
              <div className={styles.cell}>{iso_country === '' ? <span className={styles.error}>No Data</span> : iso_country}</div>
              <div className={styles.cell}>{municipality === '' ? <span className={styles.error}>No Data</span> : municipality}</div>
              <div className={styles.cell}>{elevation_ft === '' ? <span className={styles.error}>No Data</span> : elevation_ft}</div>
              <div className={styles.cell}>{wikipedia_link === '' ? <span className={styles.error}>No Data</span> : <a target="_blank" href={wikipedia_link}>Visit</a>}</div>
            </div>);
        })}
      </div>
      <div className={styles.selectPage}>
        <div onClick={handlePrevious} className={styles.change}> <i className="fa fa-arrow-left" aria-hidden="true"></i></div>
        <div className={styles.page}>{page + 1} / {airportsPage.length}</div>
        <div onClick={handleNext} className={styles.change}><i className="fa fa-arrow-right" aria-hidden="true"></i></div>
      </div>
    </div>
  );
}

export default AirportsModal;