import { useContext, useEffect, useState } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import Map from './components/Map';
import Footer from './components/Footer';
import './assets/scss/main.scss';
import { AirportData } from './ts/interfaces';
import ControlPanel from './components/ControlPanel';
import { AppContext } from './AppContext';
import { AppContextType } from './ts/types';
import Modal from './components/Modal';

const App = () => {
  const { isModalVisible } = useContext(AppContext) as AppContextType;

  const [flightData, setFlightData] = useState<[]>();
  // const [routesData, setRoutesData] = useState<[]>();
  const [airportsData, setAirportsData] = useState<AirportData[]>([]);

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
  //   // const fetchRoutes = async () => {
  //   //   const url = 'http://localhost:3000/routes';
  //   //   const options = {
  //   //     method: 'GET',
  //   //     mode: 'cors',
  //   //     dataType: 'jsonp',
  //   //     crossDomain: true,
  //   //     headers: { "Content-Type": "application/json" }
  //   //   };
  //   //   try {
  //   //     const response = await fetch(url, options);
  //   //     const result = await response.json();
  //   //     setRoutesData(result);
  //   //   } catch (error) {
  //   //     console.error(error);
  //   //   }
  //   // }
  //   const fetchAirports = async () => {
  //     const url = 'http://localhost:3000/airports';
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
  //       setAirportsData(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchFlights();
  //   // fetchRoutes();
  //   fetchAirports();
  // }, []);


  const getFlights = () => {
    fetch('flights.json'
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
    console.log(airportsData[0]);
  }, [airportsData]);

  useEffect(() => {
    getFlights();
    getAirports();
  }, []);

  // useEffect(() => {
  //   console.log(flightData);
  // }, [flightData]);

  // useEffect(() => {
  //   console.log(routesData);
  // }, [routesData]);

  // useEffect(() => {
  //   console.log(airportsData);
  // }, [airportsData]);

  return (
    <>
      <Header />
      <Stats airportsData={airportsData} />
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