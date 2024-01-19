export enum ModalContent {
    FLIGHTS,
    AIRPORTS,
    TIMEZONE
}

export enum FlightStatus {
    SCHEDULED = "scheduled",
    ACTIVE = "active",
    LANDED = "landed",
    CANCELLED = "cancelled",
    DIVERTED = "diverted"
}

export enum DataType {
    AIRPORT = "Airport",
    FLIGHT = "Flight"
}

export enum Direction {
    NORTH,
    EAST,
    WEST,
    SOUTH,
    NORTHERN_EAST,
    NORTHERN_WEST,
    SOUTHERN_EAST,
    SOUTHERN_WEST
}