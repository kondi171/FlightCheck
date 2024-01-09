import { useState, createContext } from "react";
import { AppContextType, Flights } from "./ts/types";
import { AirportData, AppProviderProps, FlightData, Watch } from "./ts/interfaces";
import { DataType, ModalContent } from "./ts/enums";
import { defaultAirport, defaultMapProps } from "./ts/objects";


export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {

  const [flightsData, setFlightsData] = useState<Flights>({
    active: [],
    scheduled: [],
    cancelled: [],
    landed: [],
    diverted: []
  });
  const [airportsData, setAirportsData] = useState<AirportData[]>([]);

  const [darkMode, setDarkMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(ModalContent.TIMEZONE);

  const [activeAirport, setActiveAirport] = useState<AirportData>(defaultAirport);
  const [activeFlight, setActiveFlight] = useState<FlightData | null>(null);
  const [dataType, setDataType] = useState(DataType.AIRPORT);
  const [currentTimezone, setCurrentTimezone] = useState('UTC+00:00');
  const [currentTime, setCurrentTime] = useState<Watch | null>(null);

  const [map, setMap] = useState<unknown>(null);
  const [maps, setMaps] = useState<unknown>(null);
  const [mapPosition, setMapPosition] = useState({ lat: defaultMapProps.center.lat, lng: defaultMapProps.center.lng });

  return (
    <AppContext.Provider value={{
      flightsData,
      // setFlightsData,
      airportsData,
      setAirportsData,
      darkMode,
      setDarkMode,
      isModalVisible,
      setIsModalVisible,
      modalContent,
      setModalContent,
      currentTimezone,
      setCurrentTimezone,
      currentTime,
      setCurrentTime,
      activeAirport,
      setActiveAirport,
      activeFlight,
      setActiveFlight,
      dataType,
      setDataType,
      map,
      setMap,
      maps,
      setMaps,
      mapPosition,
      setMapPosition
    }}>{children}</AppContext.Provider>
  )
}

export default AppProvider;