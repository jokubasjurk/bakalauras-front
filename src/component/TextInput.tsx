import React, {useState} from 'react';
import './TextInput.css';
import {KeyEventData} from "../model/KeyEventData";

interface TextInputProps {
    name: string;
    handleKeyData: any;
    inputValue: string;
    setInputValue: (value: string) => void;
    onSubmit: () => void;
    targetPhrase: string;
    className: string;
}

export const TextInput: React.FC<TextInputProps> = ({handleKeyData, name, inputValue, setInputValue, onSubmit, targetPhrase, className}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSubmit();
            event.preventDefault();
        } else {
            const eventData: KeyEventData = {
                key: event.key,
                eventType: 'down',
                time: event.timeStamp,
            };
            handleKeyData(eventData);
        }
    };

    const renderPhraseWithHighlights = () => {
        const correctChars = [];
        const errorIndex = targetPhrase.split('').findIndex((char, index) => char !== inputValue[index]);

        if (errorIndex === -1) {
            correctChars.push(...inputValue);
        } else {
            correctChars.push(...inputValue.slice(0, errorIndex));
        }

        const remainingChars = targetPhrase.slice(correctChars.length);
        const isError = errorIndex !== -1 && inputValue.length > correctChars.length;

        return (
            <>
                <span className="correct">{correctChars.join('')}</span>
                {isError && <span className="error">{inputValue[errorIndex]}</span>}
                <span className="remaining">{remainingChars}</span>
            </>
        );
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
        <div className="input-container">
            <div className="input-placeholder">{renderPhraseWithHighlights()}</div>
            <input
                type="text"
                name={name}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                autoComplete="off"
                className={className}
                onPaste={e => e.preventDefault()}
                // style={{ opacity: 0, position: 'absolute' }}
            />
        </div>
    );
};

