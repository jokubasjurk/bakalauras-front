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
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        dwellTimes: [] as DwellTime[],
        flightTimes: [] as FlightTime[][],
    });
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleKeyData = (newKeyData: KeyEventData) => {
        setKeyData([...keyData, newKeyData]);
    };

    const handlePhraseSubmit = async () => {
        if (inputValue === 'the quick brown fox jumps over the lazy dog') {
            const dwellAndFlightTimes = calculateDwellTimesAndFlightTimes(keyData);
            setFormData((prevFormData) => ({
                ...prevFormData,
                dwellTimes: dwellAndFlightTimes.dwellTimes,
                flightTimes: [...prevFormData.flightTimes, dwellAndFlightTimes.flightTimes],
            }));

            setCounter((prevCounter) => prevCounter + 1);
            setKeyData([]);

            if (counter + 1 >= 10) {
                try {
                    await axios.post('http://localhost:8080/api/register', formData);
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

    const isSubmitEnabled = counter >= 10;

    return (
        <div className="registration-container">
            <div className="left-side">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere eu
                </p>
                <p>
                    Quisque at ante quis justo malesuada volutpat. Vivamus vehicula sem sed odio
                </p>
                <p>
                    Proin fringilla arcu eget sapien tempus, ac viverra nisl bibendum. Etiam porttitor, est vel
                    interdum volutpat, nibh sem sodales ligula, vel consequat odio urna eget justo.
                </p>
                <p>
                    Cras in sem mauris. Sed et justo purus. Proin ultricies, ante vitae volutpat interdum, urna
                    lorem tincidunt dui, a venenatis ligula dolor id purus.
                </p>
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
                        <div className="text-input-wrapper">
                            <TextInput
                                handleKeyData={handleKeyData}
                                name="phrase"
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                onSubmit={handlePhraseSubmit}
                                targetPhrase="the quick brown fox jumps over the lazy dog"
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
                        {isSubmitEnabled ? "Register" : "Complete your typing task to proceed"}
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
