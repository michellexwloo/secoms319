const sensor = require('node-dht-sensor');

const sensorType = 11;
const pin =7;
let temperatureStore =0;
let humidityStore =0;

sensor.read(sensorType, pin, (temperature, humidity)=>{

        temperatureStore =temperature;
        humidityStore =humidity;
        console.log(`Temperature: ${temperature.toFixed(1)}°C, Humidity: ${humidity.toFixed(1)}%`);

});


const http = require("http");
const server = http.createServer((req, res) => {
        console.log(req.url);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("READING TEMPERATURES");
        while(1){
                res.end(`Temperature: ${temperature.toFixed(1)}°C, Humidity: ${humidity.toFixed(1)}%`);
        }
});
console.log("Server is listening on port 3000");
server.listen(3000, "127.0.0.1"); // ssh pi@10.26.27.96


