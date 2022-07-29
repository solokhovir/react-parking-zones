// import logo from './logo.svg';
import './App.css';
import MapBox from './components/MapBox.js'
import Car from './components/Car.js'
import ChargingTime from "./components/ChargingTime.js";
import Timer from './components/Timer.js'

function App() {
    return (
        <>
            <h1>Парковки для электромобилей</h1>
            <div id='map'></div>
            <MapBox/>
            <Car/>
            <ChargingTime/>
            <Timer/>
        </>
    );
}

export default App;