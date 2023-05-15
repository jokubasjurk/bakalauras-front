import './Login.css';
import React, {useEffect, useState} from "react";
import {KeyEventData} from "../../model/KeyEventData";
import {DwellTime} from "../../model/DwellTime";
import {FlightTime} from "../../model/FlightTime";
import {calculateDwellTimesAndFlightTimes} from "../../service/calculateDwellAndFlightTimes";
import {TextInput} from "../../component/TextInput";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import lockEye from "../../assets/lock-eye.png";
import typePassword from "../../assets/type-password.png";
import fingerprint from "../../assets/fingerprint.png";

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
    const words = ['encyclopedia labyrinth zephyr mesmerizing synchronize', 'orange'];
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

    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        const submitData = async () => {
            try {
                const response = await axios.post('http://146.190.25.169:8080/api/login', formData);
                if (response.data.success) {
                    navigate('/success', { state: { successType: 'login' } });
                } else {
                    navigate('/failure', { state: { successType: 'login' } });
                }
            } catch (error) {
                console.error('Error during authentication:', error);
            }
        };

        if (submit) {
            submitData().then(_ => setSubmit(false));
        }
    }, [formData, navigate, submit]);

    const handlePhraseSubmit = async () => {
        if (inputValue === targetInput) {
            const dwellAndFlightTimes = calculateDwellTimesAndFlightTimes(keyData);
            console.log(dwellAndFlightTimes);
            setFormData((prevFormData) => ({
                ...prevFormData,
                inputType,
                targetValue: targetInput,
                // dwellTimes: dwellAndFlightTimes.dwellTimes,
                flightTimes: dwellAndFlightTimes.flightTimes,
            }));

            setKeyData([]);
            setInputValue(''); // Clear the input field
            // setStep(2);
            setSubmit(true);
        }
    };

    return (
        <div className="LoginPage">
            <div className="left-side">
                <div className="title">
                    <h1>Keystroke Dynamics Authentication</h1>
                </div>
                <div className="content">
                    <div className="block">
                        <p>Using keystroke dynamics as an authentication method offers a unique and personal approach to securing your account.</p>
                        <img src={lockEye} alt="lockEye"/>
                    </div>
                    <div className="block">
                        <p>
                            During the login phase, you are required to type the same phrase that you entered during the registration.
                            Our system will compare your current typing rhythm with the keystroke signature we captured during your registration.
                        </p>
                        <img src={typePassword} alt="typePassword"/>
                    </div>
                    <div className="block">
                        <p>
                            This consistent approach not only elevates the security measures for your account but also aids in deterring unauthorized access.
                        </p>
                        <p>
                            It's essential to remember that your unique typing rhythm is as distinctive as your fingerprint, making it a reliable security measure!
                        </p>
                        <img src={fingerprint} alt="fingerprint"/>
                    </div>
                </div>
            </div>
            <div className="right-side">
                {step === 0 && (
                    <div className="login-container">
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input className="form-control" onChange={handleChange} type="text" id="username"
                                       name="username" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input className="form-control" onChange={handleChange} type="password" id="password"
                                       name="password" required/>
                            </div>
                            <button className="btn btn-primary" type="submit">Next</button>
                            <p className="register-redirect">
                                Don't have an account yet? <Link to="/">register here</Link>.
                            </p>
                        </form>
                    </div>
                )}

                {step === 1 && (
                    <div>
                        <h1>Type the given {inputType}:</h1>
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
                            className={"form-control"}
                            disabled={false}
                        />
                        <button onClick={handlePhraseSubmit} className="btn btn-primary mt-2">
                            Submit {inputType}
                        </button>
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
