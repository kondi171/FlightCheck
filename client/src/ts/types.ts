import { DataType, ModalContent } from "./enums"
import { AirportData, FlightData, Watch } from "./interfaces"

export type AppContextType = {
  flightsData: Flights,
  // setFlightsData: (statement: []) => void,
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
  currentTime: Watch | null,
  setCurrentTime: (watch: Watch) => void,
  activeAirport: AirportData,
  setActiveAirport: (airport: AirportData) => void,
  activeFlight: FlightData | null,
  setActiveFlight: (flight: FlightData) => void,
  dataType: DataType,
  setDataType: (dt: DataType) => void,
  map: unknown,
  setMap: (mapObject: unknown) => void,
  maps: unknown,
  setMaps: (mapsObject: unknown) => void,
  mapPosition: Position,
  setMapPosition: (position: Position) => void
}

export type Occurrence = {
  name: string,
  code: string
}

export type Position = {
  lat: number,
  lng: number
}

export type Flights = {
  active: FlightData[],
  scheduled: FlightData[],
  cancelled: FlightData[],
  landed: FlightData[],
  diverted: FlightData[]
}