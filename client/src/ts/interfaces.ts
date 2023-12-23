import { Occurrence } from "./types"

export interface AppProviderProps {
  children: JSX.Element,
}

export interface AirportData {
  id: number,
  ident: string,
  type: string,
  name: string,
  latitude_deg: number,
  longitude_deg: number,
  elevation_ft: number,
  continent: string,
  iso_country: string,
  municipality: string,
  wikipedia_link: string
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