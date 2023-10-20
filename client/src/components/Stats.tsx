import styles from './../assets/scss/modules/Stats.module.scss';
const Stats = () => {
    return (
        <section className={styles.stats}>
            <h3>Title</h3>
            <div className={styles.stat}>Velocity: <strong>1234mph</strong></div>
            <div className={styles.stat}>Distance: <strong>756 mph</strong></div>
            <div className={styles.stat}>Air Temperature: <strong>12&deg;C</strong></div>
            <div className={styles.stat}>Departure Time: <strong>12:35</strong></div>
            <div className={styles.stat}>Estimated Arrive Time: <strong>18:50</strong></div>
        </section>
    );
}

export default Stats;