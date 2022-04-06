import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [dumb, setDumb] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/WeatherForecast').then(console.log)
    }, []);

    return (
        <div>
            Hello World
        </div>
    )
}

export default App
