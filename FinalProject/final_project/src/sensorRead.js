const sensor = require('node-dht-sensor');

const sensorType = 11;
const pin =7;

sensor.read(sensorType, pin, (temperature, humidity)=>{

        console.log(`Temperature: ${temperature.toFixed(1)}°C, Humidity: ${humidity.toFixed(1)}%`);

});


function reactToSensorData(temperature, humidity){


}


