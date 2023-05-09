import './App.css';
import React, {useEffect, useState} from "react";
import {KeyEventData} from "./model/KeyEventData";
import {DwellTime} from "./model/DwellTime";
import {FlightTime} from "./model/FlightTime";
import {calculateDwellTimesAndFlightTimes} from "./service/calculateDwellAndFlightTimes";
import {TextInput} from "./component/TextInput";

const App: React.FC = () => {
    const [keyData, setKeyData] = useState<KeyEventData[]>([]);

    const [results, setResults] = useState<{
        dwellTimes: DwellTime[];
        flightTimes: FlightTime[];
    } | null>(null);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        phrase: '',
        dwellTimes: [] as DwellTime[],
        flightTimes: [] as FlightTime[],
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const currentTime = new Date().getTime();
            setKeyData((prevData) => [
                ...prevData,
                {key: e.key, eventType: 'down', time: currentTime},
            ]);
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const currentTime = new Date().getTime();
            setKeyData((prevData) => [
                ...prevData,
                {key: e.key, eventType: 'up', time: currentTime},
            ]);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleEnterPress = (keyData: KeyEventData[]) => {
        const dwellAndFlightTimes = calculateDwellTimesAndFlightTimes(keyData);
        setResults(dwellAndFlightTimes);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const dwellAndFlightTimes = calculateDwellTimesAndFlightTimes(keyData);
        setResults(dwellAndFlightTimes);

        formData.dwellTimes = dwellAndFlightTimes.dwellTimes;
        formData.flightTimes = dwellAndFlightTimes.flightTimes;
        // const response = await axios.post('http://localhost:8080/api/login', formData);
        setFormData({
            username: '',
            password: '',
            phrase: '',
            dwellTimes: [] as DwellTime[],
            flightTimes: [] as FlightTime[],
        });
        console.log(formData);
        // console.log(response.data);
    };

    return (
        <div className="App">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input onChange={handleChange} type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input onChange={handleChange} type="password" id="password" name="password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phrase">Enter given phrase:</label>
                        {/*<label htmlFor="phrase">A brown fox jumps over a fence</label>*/}
                        <label htmlFor="phrase">brown fox</label>
                        {/*<TextInput name="phrase" onEnterPress={handleEnterPress} onChange={handleChange}/>*/}
                        <TextInput name="phrase" onEnterPress={() => null} onChange={handleChange}/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>

            {results && (
                <div>
                    <h2>Dwell Times:</h2>
                    <pre>{JSON.stringify(results.dwellTimes, null, 2)}</pre>
                    <h2>Flight Times:</h2>
                    <pre>{JSON.stringify(results.flightTimes, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;