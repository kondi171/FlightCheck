import { ModalContent } from "./enums"
import { AirportData, Watch } from "./interfaces"

export type AppContextType = {
  flightData: [],
  setFlightData: (statement: []) => void,
  airportsData: AirportData[],
  setAirportsData: (statement: []) => void,
  darkMode: boolean,
  setDarkMode: (statement: boolean) => void,
  isModalVisible: boolean,
  setIsModalVisible: (statement: boolean) => void,
  modalContent: ModalContent,
  setModalContent: (modalContent: ModalContent) => void,
  currentTimezone: string,
  setCurrentTimezone: (timezone: string) => void,
  currentTime: Watch,
  setCurrentTime: (watch: Watch) => void,
  activeAirport: AirportData,
  setActiveAirport: (airport: AirportData) => void
}

export type Occurrence = {
  name: string,
  code: string
}