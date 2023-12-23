import { useContext } from 'react';
import styles from './../../assets/scss/modules/Modal.module.scss';
import { AppContext } from '../../AppContext';
import { AppContextType } from '../../ts/types';
const FlightsModal = () => {
  const { flightsData } = useContext(AppContext) as AppContextType;
  return (
    <div className={styles.flights}>
      <h2>Flights Data</h2>

    </div>
  );
}

export default FlightsModal;