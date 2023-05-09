import React, {useState} from 'react';
import {KeyEventData} from "../model/KeyEventData";

interface TextInputProps {
    onEnterPress: (keyData: KeyEventData[]) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

export const TextInput: React.FC<TextInputProps> = ({name, onEnterPress, onChange}) => {
    const [keyData, setKeyData] = useState<KeyEventData[]>([]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onEnterPress(keyData);
        } else {
            const eventData: KeyEventData = {
                key: event.key,
                eventType: 'down',
                time: event.timeStamp,
            };
            setKeyData((prevKeyData) => [...prevKeyData, eventData]);
        }
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const eventData: KeyEventData = {
            key: event.key,
            eventType: 'up',
            time: event.timeStamp,
        };
        setKeyData((prevKeyData) => [...prevKeyData, eventData]);
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

