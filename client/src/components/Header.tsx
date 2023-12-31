import styles from './../assets/scss/modules/Header.module.scss';
import plane from './../assets/img/plane.png';
import Clock from './Clock';
import ControlPanel from './ControlPanel';
const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>Fligh<img src={plane} alt='plane' /> Check</h1>
                <h2>
                    <hr />
                    Always stay updated!
                    <hr />
                </h2>
            </div>
            <Clock />
            <ControlPanel />
        </header>
    );
}

export default Header;