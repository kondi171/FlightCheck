import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './../../assets/scss/modules/Modal.module.scss';
import { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';
import { AppContextType } from '../../ts/types';
import { ModalContent } from '../../ts/enums';
import TimezoneModal from './TimezoneModal';
import AirportsModal from './AirportsModal';
import FlightsModal from './FlightsModal';
import { useSpring, animated } from 'react-spring';

const Modal = () => {
    const { setIsModalVisible, modalContent } = useContext(AppContext) as AppContextType;

    const [isClosing, setIsClosing] = useState(false);

    const overlayFade = useSpring({
        from: { opacity: 0 },
        to: { opacity: isClosing ? 0 : 1 },
        config: { duration: 400 }
    });

    const modalFade = useSpring({
        from: { scale: 0, opacity: 0 },
        to: { scale: isClosing ? 0 : 1, opacity: isClosing ? 0 : 1 },
        delay: 400,
        config: { duration: 400 },
        onRest: () => {
            if (isClosing) {
                setTimeout(() => {
                    setIsModalVisible(false);
                    setIsClosing(false);
                }, 400);
            }
        },
    });

    const handleCloseModal = () => {
        setIsClosing(true);
    };

    return (
        <animated.section className={styles.overlay} style={overlayFade}>
            <animated.div className={styles.modal} style={modalFade}>
                {modalContent === ModalContent.TIMEZONE && <TimezoneModal />}
                {modalContent === ModalContent.FLIGHTS && <FlightsModal />}
                {modalContent === ModalContent.AIRPORTS && <AirportsModal />}
                <FontAwesomeIcon onClick={handleCloseModal} className={styles.icon} icon={faTimes} />
            </animated.div>
        </animated.section>
    );
};

export default Modal;
