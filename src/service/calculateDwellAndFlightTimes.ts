import {KeyEventData} from "../model/KeyEventData";
import {DwellTime} from "../model/DwellTime";
import {FlightTime} from "../model/FlightTime";
import {KeyEventDataBuffer} from "../model/KeyEventDataBuffer";

export const calculateDwellTimesAndFlightTimes = (
    keyData: KeyEventData[]
): { dwellTimes: DwellTime[]; flightTimes: FlightTime[] } => {
    const dwellTimes: DwellTime[] = [];
    const flightTimes: FlightTime[] = [];
    const keyDownBuffer: KeyEventDataBuffer = {};

    console.log(keyData);
    for (let i = 0; i < keyData.length - 1; i++) {
        const currentEvent = keyData[i];
        const nextEvent = keyData[i + 1];

        // DWELL TIMES
        if (currentEvent.eventType === 'down') {
            const existingKeyDownEvent = keyDownBuffer[currentEvent.key];

            if (existingKeyDownEvent) {
                const overlappingDwellTime = currentEvent.time - existingKeyDownEvent.time;
                dwellTimes.push({ key: currentEvent.key, dwellTime: overlappingDwellTime });
            }

            keyDownBuffer[currentEvent.key] = currentEvent;
        } else if (currentEvent.eventType === 'up') {
            const keyDownEvent = keyDownBuffer[currentEvent.key];

            if (keyDownEvent) {
                const dwellTime = currentEvent.time - keyDownEvent.time;
                dwellTimes.push({ key: currentEvent.key, dwellTime });
                keyDownBuffer[currentEvent.key] = null;
            }
        }

        // FLIGHT TIMES
        if (currentEvent.eventType === 'down' && nextEvent.eventType === 'down') {
            const flightTime = nextEvent.time - currentEvent.time;
            const keyPair = currentEvent.key + nextEvent.key;
            flightTimes.push({ keyPair, flightTime, type: 'DD' });
        }

        if (currentEvent.eventType === 'down' && nextEvent.eventType === 'up') {
            const flightTime = nextEvent.time - currentEvent.time;
            const keyPair = currentEvent.key + nextEvent.key;
            flightTimes.push({ keyPair, flightTime, type: 'DU' });
        }

        if (currentEvent.eventType === 'up' && nextEvent.eventType === 'down') {
            const flightTime = nextEvent.time - currentEvent.time;
            const keyPair = currentEvent.key + nextEvent.key;
            flightTimes.push({ keyPair, flightTime, type: 'UD' });
        }
    }

    return { dwellTimes, flightTimes };
};

