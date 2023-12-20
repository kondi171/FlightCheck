import { useState, createContext } from "react";
import { AppContextType } from "./ts/types";
import { AppProviderProps } from "./ts/interfaces";
import { ModalContent } from "./ts/enums";

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {

  const [flightData, setFlightData] = useState<[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(ModalContent.TIMEZONE);

  return (
    <AppContext.Provider value={{
      flightData,
      darkMode,
      setDarkMode,
      isModalVisible,
      setIsModalVisible,
      modalContent,
      setModalContent
    }}>{children}</AppContext.Provider>
  )
}

export default AppProvider;