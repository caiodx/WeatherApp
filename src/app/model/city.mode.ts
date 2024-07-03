interface City {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: Coord;
  }
  interface Coord {
    lon: number;
    lat: number;
  }