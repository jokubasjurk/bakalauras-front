import {KeyEventData} from "./KeyEventData";

export type KeyEventDataBuffer = {
    [key: string]: KeyEventData | null;
};