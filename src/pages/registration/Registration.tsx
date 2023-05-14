// Registration.tsx
import './Registration.css';
import React, {useState} from 'react';
import classNames from "classnames";
import {TextInput} from "../../component/TextInput";
import {KeyEventData} from "../../model/KeyEventData";
import {calculateDwellTimesAndFlightTimes} from "../../service/calculateDwellAndFlightTimes";
import {DwellTime} from "../../model/DwellTime";
import {FlightTime} from "../../model/FlightTime";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

interface RegistrationProps {
    // Add any required props for your use case
}

const Registration: React.FC<RegistrationProps> = () => {
    const [keyData, setKeyData] = useState<KeyEventData[]>([]);
    const [counter, setCounter] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [inputType, setInputType] = useState('phrase');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        dwellTimes: [] as DwellTime[],
        flightTimes: [] as FlightTime[][],
    });
    const navigate = useNavigate();

    const phrases = ['the quick brown fox jumps over the lazy dog', 'lazy dog'];
    const words = ['encyclopedia labyrinth zephyr mesmerizing synchronize', 'orange'];
    const targetInput = inputType === 'phrase' ? phrases[0] : words[0];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleKeyData = (newKeyData: KeyEventData) => {
        setKeyData([...keyData, newKeyData]);
    };

    const handlePhraseSubmit = async () => {
        if (inputValue === targetInput) {
            const dwellAndFlightTimes = calculateDwellTimesAndFlightTimes(keyData);
            setFormData((prevFormData) => ({
                ...prevFormData,
                inputType,
                targetValue: targetInput,
                dwellTimes: dwellAndFlightTimes.dwellTimes,
                flightTimes: [...prevFormData.flightTimes, dwellAndFlightTimes.flightTimes],
            }));

            setCounter((prevCounter) => prevCounter + 1);
            setKeyData([]);

            if (counter + 1 >= 10) {
                try {
                    await axios.post('http://146.190.25.169:8080/api/register', formData);
                    navigate('/');
                } catch (error) {
                    console.error('Error during authentication:', error);
                }
            }

            setInputValue(''); // Clear the input field
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData);
        // axios
        // Perform your registration logic here
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputType(event.target.value);
    };

    const isSubmitEnabled = counter >= 10;

    return (
        <div className="registration-container">
            <div className="left-side">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur.</p>
            </div>
            <div className="right-side">
                <h1>Registration</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input onChange={handleChange} type="text" id="username" name="username" className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input onChange={handleChange} type="password" id="password" name="password" className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input onChange={handleChange} type="email" id="email" name="email" className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <label>Type the given phrase:</label>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inputType"
                                id="phrase"
                                value="phrase"
                                checked={inputType === "phrase"}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="phrase">
                                Phrase
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inputType"
                                id="word"
                                value="word"
                                checked={inputType === "word"}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="word">
                                Words
                            </label>
                        </div>
                        <div className="text-input-wrapper">
                            <TextInput
                                handleKeyData={handleKeyData}
                                name="phrase"
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                onSubmit={handlePhraseSubmit}
                                targetPhrase={targetInput}
                                className="form-control"
                            />
                            <div className={classNames("counter-bubble", {completed: counter >= 10})}>
                                {counter}/10
                            </div>
                        </div>
                    </div>
                    <button type="submit"
                            disabled={!isSubmitEnabled}
                            className={classNames(isSubmitEnabled ? "btn btn-primary" : "btn btn-secondary", "register-button")}
                    >
                        {isSubmitEnabled ? "Register" : "Click \"Enter\" to submit the phrase"}
                    </button>
                    <p className="login-redirect">
                        If you already have an account, <Link to="/login">login here</Link>.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Registration;
