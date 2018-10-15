export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

export interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  street?:string;
  city?: string;
  country?: string;
  zipCode?: string;
  state?: string;
  marker?: Marker;
}