import styles from './../assets/scss/modules/ControlPanel.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPlane, faCartFlatbedSuitcase, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { AppContextType } from '../ts/types';
import { ModalContent } from '../ts/enums';

const ControlPanel = () => {

  const { darkMode, setDarkMode, isModalVisible, setIsModalVisible, setModalContent } = useContext(AppContext) as AppContextType;

  const handleSetModalContent = (modalContent: ModalContent) => {
    setIsModalVisible(!isModalVisible);
    setModalContent(modalContent);
  }

  return (
    <div className={styles.controlPanel}>
      <div onClick={() => handleSetModalContent(ModalContent.FLIGHTS)} className={styles.option}>
        <FontAwesomeIcon className={styles.icon} icon={faPlane} />
        <span className={styles.tooltip}>
          <div className={styles.text}>Flights</div>
        </span>
      </div>
      <div onClick={() => handleSetModalContent(ModalContent.AIRPORTS)} className={styles.option}>
        <FontAwesomeIcon className={styles.icon} icon={faCartFlatbedSuitcase} />
        <span className={styles.tooltip}>
          <div className={styles.text}>Airports</div>
        </span>
      </div>
      <div onClick={() => handleSetModalContent(ModalContent.TIMEZONE)} className={styles.option}>
        <FontAwesomeIcon className={styles.icon} icon={faClock} />
        <span className={styles.tooltip}>
          <div className={styles.text}>Timezone</div>
        </span>
      </div>
      <div onClick={() => setDarkMode(!darkMode)} className={styles.option}>
        <FontAwesomeIcon className={styles.icon} icon={faMoon} />
        <span className={styles.tooltip}>
          <div className={styles.text}>Theme</div>
        </span>
      </div>
    </div>
  );
}

export default ControlPanel;