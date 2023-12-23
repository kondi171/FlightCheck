import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './../../assets/scss/modules/Modal.module.scss';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../AppContext';
import { AppContextType } from '../../ts/types';
import { ModalContent } from '../../ts/enums';
import TimezoneModal from './TimezoneModal';

const Modal = () => {
    const { setIsModalVisible, modalContent } = useContext(AppContext) as AppContextType;
    const handleCloseModal = () => {
        const overlay = document.querySelector(styles.overlay);
        const modal = document.querySelector(styles.modal);
        modal?.classList.remove(styles.modalActive)
        overlay?.classList.remove(styles.overlayActive);
        setIsModalVisible(false);
    }
    useEffect(() => {
        const overlay = document.querySelector(styles.overlay);
        const modal = document.querySelector(styles.modal);
        modal?.classList.add(styles.modalActive);
        overlay?.classList.add(styles.overlayActive);
    }, []);
    return (
        <section className={styles.overlay}>
            <div className={styles.modal}>
                {modalContent === ModalContent.TIMEZONE && <TimezoneModal />}
                <FontAwesomeIcon onClick={handleCloseModal} className={styles.icon} icon={faTimes} />
            </div>
        </section>
    );
}

export default Modal;