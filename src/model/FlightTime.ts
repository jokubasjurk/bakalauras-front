import {FlightTimeType} from "./FlightTimeType";

export interface FlightTime {
    keyPair: string;
    flightTime: number;
    type: FlightTimeType;
}