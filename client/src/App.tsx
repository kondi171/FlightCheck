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
import { AirportData, RawFlight } from './ts/interfaces';
import { Direction, FlightStatus } from './ts/enums';
import Loader from './components/Loader';

const App = () => {
  const { isModalVisible, setAirportsData, flightsData, airportsData } = useContext(AppContext) as AppContextType;
  const [isLoading, setIsLoading] = useState(true);
  const [activeFlights, setActiveFlights] = useState<RawFlight[]>();
  const [scheduledFlights, setScheduledFlights] = useState<RawFlight[]>();
  const [cancelledFlights, setCancelledFlights] = useState<RawFlight[]>();
  const [landedFlights, setLandedFlights] = useState<RawFlight[]>();
  const [divertedFlights, setDivertedFlights] = useState<RawFlight[]>();

  // useEffect(() => {
  //   const fetchFlights = async (status: FlightStatus) => {
  //     const url = `http://localhost:3000/flights/${status}`;
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
  //       if (status === FlightStatus.ACTIVE) setActiveFlights(result);
  //       else if (status === FlightStatus.SCHEDULED) setScheduledFlights(result);
  //       else if (status === FlightStatus.CANCELLED) setCancelledFlights(result);
  //       else if (status === FlightStatus.LANDED) setLandedFlights(result);
  //       else if (status === FlightStatus.DIVERTED) setDivertedFlights(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchFlights(FlightStatus.ACTIVE);
  //   fetchFlights(FlightStatus.SCHEDULED);
  //   fetchFlights(FlightStatus.CANCELLED);
  //   fetchFlights(FlightStatus.LANDED);
  //   fetchFlights(FlightStatus.DIVERTED);
  // }, []);


  const getFlights = (flightStatus: FlightStatus) => {
    fetch(`ready/${flightStatus}Flights-09-01-2024.json`
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
        if (flightStatus === FlightStatus.ACTIVE) setActiveFlights(flights);
        else if (flightStatus === FlightStatus.SCHEDULED) setScheduledFlights(flights);
        else if (flightStatus === FlightStatus.CANCELLED) setCancelledFlights(flights);
        else if (flightStatus === FlightStatus.LANDED) setLandedFlights(flights);
        else if (flightStatus === FlightStatus.DIVERTED) setDivertedFlights(flights);
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
    getFlights(FlightStatus.ACTIVE);
    getFlights(FlightStatus.SCHEDULED);
    getFlights(FlightStatus.CANCELLED);
    getFlights(FlightStatus.LANDED);
    getFlights(FlightStatus.DIVERTED);
    getAirports();
  }, []);

  // useEffect(() => {
  //   console.log(activeflights);
  //   console.log(scheduledflights);
  //   console.log(cancelledflights);
  //   console.log(landedflights);
  //   console.log(divertedflights);
  // }, [activeflights, scheduledflights, cancelledflights, landedflights, divertedflights]);

  // useEffect(() => {
  //   console.log(liveFlights);
  // }, [liveFlights.length]);

  const pushActiveFlights = () => {
    activeFlights!.forEach((currentFlight: RawFlight) => {
      const { flight_date, flight_status, departure, airline, arrival, flight } = currentFlight;
      const departureAirport = airportsData.find((airport: AirportData) => {
        return airport.name && airport.name.split(' ')[0] === (currentFlight.departure.airport || '').split(' ')[0];
      });
      const arrivalAirport = airportsData.find((airport: AirportData) => {
        return airport.name && airport.name.split(' ')[0] === (currentFlight.arrival.airport || '').split(' ')[0];
      });
      flightsData.active.push({
        number: flight.number,
        date: flight_date,
        status: flight_status,
        departure: {
          airport: departureAirport,
          time: departure.scheduled,
        },
        arrival: {
          airport: arrivalAirport,
          time: arrival.scheduled,
        },
        airline: airline.name,
        live: {
          diretion: Direction.NORTH,
          position: { lat: 0, lng: 0 }
        }
      });
    });
  }
  const pushScheduledFlights = () => {
    scheduledFlights!.forEach((currentFlight: RawFlight) => {
      const { flight_date, flight_status, departure, airline, arrival, flight } = currentFlight;
      const departureAirport = airportsData.find((airport: AirportData) => {
        return airport.name && airport.name.split(' ')[0] === (currentFlight.departure.airport || '').split(' ')[0];
      });
      const arrivalAirport = airportsData.find((airport: AirportData) => {
        return airport.name && airport.name.split(' ')[0] === (currentFlight.arrival.airport || '').split(' ')[0];
      });
      flightsData.scheduled.push({
        number: flight.number,
        date: flight_date,
        status: flight_status,
        departure: {
          airport: departureAirport,
          time: departure.scheduled,
        },
        arrival: {
          airport: arrivalAirport,
          time: arrival.scheduled,
        },
        airline: airline.name,
        live: null,
      });
    });
  }
  const pushCancelledFlights = () => {
    cancelledFlights!.forEach((currentFlight: RawFlight) => {
      const { flight_date, flight_status, departure, airline, arrival, flight } = currentFlight;
      const departureAirport = airportsData.find((airport: AirportData) => {
        return airport.name && airport.name.split(' ')[0] === (currentFlight.departure.airport || '').split(' ')[0];
      });
      const arrivalAirport = airportsData.find((airport: AirportData) => {
        return airport.name && airport.name.split(' ')[0] === (currentFlight.arrival.airport || '').split(' ')[0];
      });
      flightsData.cancelled.push({
        number: flight.number,
        date: flight_date,
        status: flight_status,
        departure: {
          airport: departureAirport,
          time: departure.scheduled,
        },
        arrival: {
          airport: arrivalAirport,
          time: arrival.scheduled,
        },
        airline: airline.name,
        live: null
      });
    });
  }
  const pushLandedFlights = () => {
    landedFlights!.forEach((currentFlight: RawFlight) => {
      const { flight_date, flight_status, departure, airline, arrival, flight } = currentFlight;
      const departureAirport = airportsData.find((airport: AirportData) => {
        return airport.name && airport.name.split(' ')[0] === (currentFlight.departure.airport || '').split(' ')[0];
      });
      const arrivalAirport = airportsData.find((airport: AirportData) => {
        return airport.name && airport.name.split(' ')[0] === (currentFlight.arrival.airport || '').split(' ')[0];
      });
      flightsData.landed.push({
        number: flight.number,
        date: flight_date,
        status: flight_status,
        departure: {
          airport: departureAirport,
          time: departure.scheduled,
        },
        arrival: {
          airport: arrivalAirport,
          time: arrival.scheduled,
        },
        airline: airline.name,
        live: null
      });
    });
  }
  const pushDivertedFlights = () => {
    divertedFlights!.forEach((currentFlight: RawFlight) => {
      const { flight_date, flight_status, departure, airline, arrival, flight } = currentFlight;
      const departureAirport = airportsData.find((airport: AirportData) => {
        return airport.name && airport.name.split(' ')[0] === (currentFlight.departure.airport || '').split(' ')[0];
      });
      const arrivalAirport = airportsData.find((airport: AirportData) => {
        return airport.name && airport.name.split(' ')[0] === (currentFlight.arrival.airport || '').split(' ')[0];
      });
      flightsData.diverted.push({
        number: flight.number,
        date: flight_date,
        status: flight_status,
        departure: {
          airport: departureAirport,
          time: departure.scheduled,
        },
        arrival: {
          airport: arrivalAirport,
          time: arrival.scheduled,
        },
        airline: airline.name,
        live: null
      });
    });
  }

  useEffect(() => {
    if (airportsData && airportsData.length !== 0) {
      if (
        activeFlights && activeFlights.length !== 0 &&
        scheduledFlights && scheduledFlights.length !== 0 &&
        cancelledFlights && cancelledFlights.length !== 0 &&
        landedFlights && landedFlights.length !== 0 &&
        divertedFlights && divertedFlights.length !== 0
      ) {
        pushActiveFlights();
        // pushScheduledFlights();
        // pushCancelledFlights();
        // pushLandedFlights();
        // pushDivertedFlights();
      }
    }
  }, [activeFlights, scheduledFlights, cancelledFlights, landedFlights, divertedFlights, airportsData]);

  useEffect(() => {
    if (
      activeFlights?.length >= 100
      // scheduledFlights?.length >= 100 &&
      // cancelledFlights?.length >= 100 &&
      // landedFlights?.length >= 100 &&
      // divertedFlights?.length >= 100
    ) setIsLoading(false);
  }, [activeFlights, scheduledFlights, cancelledFlights, landedFlights, divertedFlights]);
  return (
    <>
      <Header />
      <Stats />
      <Map />
      <ControlPanel />
      {isModalVisible &&
        <Modal />
      }
      <Footer />
      {isLoading && <Loader />}
    </>
  );
}

export default App;

