import { useEffect, useState } from 'react';
import plane from './../assets/img/plane.png'
import styles from './../assets/scss/modules/Loader.module.scss';
const Loading = () => {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const dotsTimeout = setTimeout(() => {
      if (dots.length === 3) setDots('');
      else setDots(dots + '.');
    }, 200);

    return () => {
      clearTimeout(dotsTimeout);
    }
  }, [dots]);

  return (
    <div className={styles.loaderWrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Fligh<img src={plane} alt='plane' /> Check</h1>
          <h2>
            <hr />
            Always stay updated!
            <hr />
          </h2>
        </div>
      </header>
      <div className={styles.loader}>
        <span></span>
      </div>
      <span className={styles.message}>Please wait! Application is loading {dots}</span>
    </div>
  );
}

export default Loading;