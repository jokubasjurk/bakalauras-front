import './Login.css';
import React, {useState} from "react";
import {KeyEventData} from "../../model/KeyEventData";
import {DwellTime} from "../../model/DwellTime";
import {FlightTime} from "../../model/FlightTime";
import {calculateDwellTimesAndFlightTimes} from "../../service/calculateDwellAndFlightTimes";
import {TextInput} from "../../component/TextInput";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const [keyData, setKeyData] = useState<KeyEventData[]>([]);
    const [step, setStep] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [inputType, setInputType] = useState('phrase');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        dwellTimes: [] as DwellTime[],
        flightTimes: [] as FlightTime[],
    });
    const navigate = useNavigate();

    const phrases = ['the quick brown fox jumps over the lazy dog', 'lazy dog'];
    const words = ['apple', 'orange'];
    const targetInput = inputType === 'phrase' ? phrases[0] : words[0];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputType(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setStep(1);
    };

    const handleKeyData = (newKeyData: KeyEventData) => {
        setKeyData([...keyData, newKeyData]);
    };

    const handlePhraseSubmit = async () => {
        if (inputValue === targetInput) {
            const dwellAndFlightTimes = calculateDwellTimesAndFlightTimes(keyData);
            console.log(dwellAndFlightTimes);
            setFormData((prevFormData) => ({
                ...prevFormData,
                // dwellTimes: dwellAndFlightTimes.dwellTimes,
                flightTimes: dwellAndFlightTimes.flightTimes,
            }));

            setKeyData([]);
            setInputValue(''); // Clear the input field
            // setStep(2);
            console.log(formData);
            try {
                const response = await axios.post('http://localhost:8080/api/login', formData);
                if (response.data.success) {
                    navigate('/successful-login');
                } else {
                    navigate('/unsuccessful-login');
                }
            } catch (error) {
                console.error('Error during authentication:', error);
            }
        }
    };

    return (
        <div className="LoginPage">
            <div className="left-side">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur.</p>
            </div>
            <div className="right-side">
                {step === 0 && (
                    <div className="login-container">
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input onChange={handleChange} type="text" id="username"
                                       name="username" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input onChange={handleChange} type="password" id="password"
                                       name="password" required/>
                            </div>
                            <button type="submit">Next</button>
                        </form>
                    </div>
                )}

                {step === 1 && (
                    <div>
                        <h1>Type the given {inputType}:</h1>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="phrase"
                                    checked={inputType === 'phrase'}
                                    onChange={handleRadioChange}
                                />
                                Phrase
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="word"
                                    checked={inputType === 'word'}
                                    onChange={handleRadioChange}
                                />
                                Word
                            </label>
                        </div>
                        <p>{targetInput}</p>
                        <TextInput
                            handleKeyData={handleKeyData}
                            name="input"
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            onSubmit={handlePhraseSubmit}
                            targetPhrase={targetInput}
                        />
                        <button onClick={handlePhraseSubmit}>Submit {inputType}</button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2>Completed!</h2>
                        <h2>Dwell Times:</h2>
                        <pre>{JSON.stringify(formData.dwellTimes, null, 2)}</pre>
                        <h2>Flight Times:</h2>
                        <pre>{JSON.stringify(formData.flightTimes, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
