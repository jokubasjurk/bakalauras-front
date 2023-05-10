import React from 'react';
import {KeyEventData} from "../model/KeyEventData";

interface TextInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    handleKeyData: any;
}

export const TextInput: React.FC<TextInputProps> = ({name, onChange, handleKeyData}) => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const eventData: KeyEventData = {
            key: event.key,
            eventType: 'down',
            time: event.timeStamp,
        };
        handleKeyData(eventData);
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const eventData: KeyEventData = {
            key: event.key,
            eventType: 'up',
            time: event.timeStamp,
        };
        handleKeyData(eventData);
    };

    return (
        <input
            type="text"
            name={name}
            placeholder="Type here..."
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onChange={onChange}
        />
    );
};

