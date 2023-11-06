import { useEffect } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import Map from './components/Map';
import Footer from './components/Footer';
import './assets/scss/main.scss';

const App = () => {
  useEffect(() => {
    // const fetchData = async () => {
    //   const url = 'http://localhost:3000/flights';
    //   const options = {
    //     method: 'GET',
    //     mode: 'cors',
    //     dataType: 'jsonp',
    //     crossDomain: true,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },

    //   };

    //   try {
    //     const response = await fetch(url, options);
    //     const result = await response.text();
    //     console.log(result);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    // fetchData();
  }, []);
  return (
    <>
      <Header />
      <section className='wrapper'>
        <Stats />
        <Map />
      </section>
      <Footer />
    </>
  );
}

export default App;