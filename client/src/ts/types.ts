import { ModalContent } from "./enums"
import { Watch } from "./interfaces"

export type AppContextType = {
  flightData: [],
  setFlightData: (statement: []) => void,
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
}

export type Occurrence = {
  name: string,
  code: string
}