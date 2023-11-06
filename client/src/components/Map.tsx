import styles from './../assets/scss/modules/Map.module.scss';
import GoogleMapReact from 'google-map-react';

const defaultMapProps = {
    center: {
        lat: 52.237049,
        lng: 21.017532,
    },
    zoom: 10
};

const Map = () => {

    return (
        <section className={styles.map}>
            <div style={{ height: '83vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyANuXfGFjl3_ovhubG_q38TL13FQUt44FM" }}
                    defaultCenter={defaultMapProps.center}
                    defaultZoom={defaultMapProps.zoom}
                >
                </GoogleMapReact>
            </div>
        </section>

    );
}

export default Map;