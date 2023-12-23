import { useState, createContext } from "react";
import { AppContextType } from "./ts/types";
import { AppProviderProps, Watch } from "./ts/interfaces";
import { ModalContent } from "./ts/enums";

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {

  const [flightData, setFlightData] = useState<[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(ModalContent.TIMEZONE);

  const [currentTimezone, setCurrentTimezone] = useState('UTC+01:00');
  // const [currentTime, setCurrentTime] = useState<Watch>({
  //   hours: new Date().getUTCHours(),
  //   minutes: new Date().getUTCMinutes(),
  //   seconds: new Date().getSeconds()
  // });
  const [currentTime, setCurrentTime] = useState<Watch>({
    hours: 12,
    minutes: 50,
    seconds: 57
  });
  return (
    <AppContext.Provider value={{
      flightData,
      setFlightData,
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
    }}>{children}</AppContext.Provider>
  )
}

export default AppProvider;