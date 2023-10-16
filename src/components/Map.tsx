import styles from './../assets/scss/modules/Map.module.scss';
import map from './../assets/img/map-test.png';
const Map = () => {
    return (
        <section className={styles.map}>
            <img src={map} alt="map" />
        </section>
    );
}

export default Map;