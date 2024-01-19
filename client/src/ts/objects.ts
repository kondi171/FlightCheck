export const darkModeStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }]
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }]
  }
];

export const defaultMapProps = {
  center: {
    lat: 52.237049,
    lng: 21.017532,
  },
  zoom: 10
};

export const defaultAirport = {
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
}

export const directionDeg = {
  north: {
    from: 345,
    to: 15
  },
  northernEast: {
    from: 16,
    to: 74
  },
  east: {
    from: 75,
    to: 105
  },
  southernEast: {
    from: 106,
    to: 164,
  },
  south: {
    from: 165,
    to: 195,
  },
  southernWest: {
    from: 196,
    to: 254,
  },
  west: {
    from: 255,
    to: 285,
  },
  nouthernWest: {
    from: 286,
    to: 344,
  }
}