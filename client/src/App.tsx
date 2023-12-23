import { useContext, useEffect, useState } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import Map from './components/Map';
import Footer from './components/Footer';
import './assets/scss/main.scss';
import ControlPanel from './components/ControlPanel';
import { AppContext } from './AppContext';
import { AppContextType } from './ts/types';
import Modal from './components/modals/Modal';

const App = () => {
  const { isModalVisible, setAirportsData } = useContext(AppContext) as AppContextType;

  const [flightData, setFlightData] = useState<[]>();

  // useEffect(() => {
  //   const fetchFlights = async () => {
  //     const url = 'http://localhost:3000/flights';
  //     const options = {
  //       method: 'GET',
  //       mode: 'cors',
  //       dataType: 'jsonp',
  //       crossDomain: true,
  //       headers: { "Content-Type": "application/json" }
  //     };
  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       setFlightData(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchFlights();
  // }, []);


  const getFlights = () => {
    fetch('flights-07-11-2023.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(flights => {
        setFlightData(flights);
      });
  };


  const getAirports = () => {
    fetch('airports.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(airports => {
        setAirportsData(airports);
      });
  }

  useEffect(() => {
    getFlights();
    getAirports();
  }, []);

  // useEffect(() => {
  //   console.log(flightData);
  // }, [flightData]);

  return (
    <>
      <Header />
      <Stats />
      <Map flightData={flightData} />
      <ControlPanel />
      {isModalVisible &&
        <Modal />
      }
      <Footer />
    </>
  );
}

export default App;