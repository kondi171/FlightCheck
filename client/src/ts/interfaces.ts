import { Live, Occurrence } from "./types"

export interface AppProviderProps {
  children: JSX.Element,
}

export interface AirportData {
  id: number,
  ident: string,
  type: string,
  name: string,
  latitude_deg: number | string,
  longitude_deg: number | string,
  elevation_ft: number | string,
  continent: string,
  iso_country: string,
  municipality: string,
  wikipedia_link: string
}

export interface RawFlight {
  flight_date: string,
  flight_status: string,
  departure: {
    airport: string,
    timezone: string,
    iata: string,
    icao: string,
    terminal: string,
    gate: string,
    delay: string,
    scheduled: string,
    estimated: string,
    actual: string,
    estimated_runway: string,
    actual_runway: string
  },
  arrival: {
    airport: string,
    timezone: string,
    iata: string,
    icao: string,
    terminal: string,
    gate: string,
    baggage: string,
    delay: string,
    scheduled: string,
    estimated: string,
    actual: string,
    estimated_runway: string,
    actual_runway: string
  },
  airline: {
    name: string,
    iata: string,
    icao: string
  },
  flight: {
    number: number,
    iata: string,
    icao: string,
    codeshared: string
  },
  aircraft: string,
  live: string
}

export interface FlightData {
  number: number,
  date: string,
  status: string,
  departure: {
    airport: AirportData | undefined,
    time: string,
  },
  arrival: {
    airport: AirportData | undefined,
    time: string
  }
  airline: string,
  live: Live | null
}

export interface TimezoneData {
  name: string,
  occurrence: Occurrence[],
  occurrenceDST: Occurrence[]
}
export interface Watch {
  hours: number,
  minutes: number,
  seconds: number
}

export interface Flights {
  active: FlightData[],
  scheduled: FlightData[],
  cancelled: FlightData[],
  landed: FlightData[],
  diverted: FlightData[]
}