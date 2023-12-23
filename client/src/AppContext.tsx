import { useState, createContext } from "react";
import { AppContextType } from "./ts/types";
import { AirportData, AppProviderProps, Watch } from "./ts/interfaces";
import { ModalContent } from "./ts/enums";

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {

  const [flightData, setFlightData] = useState<[]>([]);
  const [airportsData, setAirportsData] = useState<AirportData[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(ModalContent.TIMEZONE);
  const [activeAirport, setActiveAirport] = useState<AirportData>({
    id: 2637,
    ident: "EPWA",
    type: "large_airport",
    name: "Warsaw Chopin Airport",
    latitude_deg: 52.1656990051,
    longitude_deg: 20.967100143399996,
    elevation_ft: 362,
    continent: "Europe",
    iso_country: "PL",
    municipality: "Warsaw",
    wikipedia_link: "https://en.wikipedia.org/wiki/Warsaw_Frederic_Chopin_Airport"
  });
  const [currentTimezone, setCurrentTimezone] = useState('UTC+01:00');
  const [currentTime, setCurrentTime] = useState<Watch>({
    hours: 12,
    minutes: 50,
    seconds: 57
  });
  return (
    <AppContext.Provider value={{
      flightData,
      setFlightData,
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
      setActiveAirport
    }}>{children}</AppContext.Provider>
  )
}

export default AppProvider;