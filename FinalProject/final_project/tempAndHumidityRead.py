import time
import board
import adafruit_dht
from datetime import datetime, timedelta
import requests

#Connect power to pin 2, ground to pin 6, and data to pin 7 /GPIO4
#Initial the dht device, with data pin connected to:
dhtDevice = adafruit_dht.DHT11(board.D4)
time.sleep(2)

#Server info,  change IP address of serverURL to the IP where the server is running
#serverURL = "http://localhost:8081/postTemp"	
serverURL = "http://192.168.1.115:8081/postTemp"	

dataJSON = "";

while True:
	try :
		errorStatus =0
		#Collect data from connected DHT11 sensor
		temperature_c = dhtDevice.temperature
		temperature_f = temperature_c * (9 / 5) + 32
		humidity = dhtDevice.humidity
		currDateTime = datetime.now()
		dataDateTime = currDateTime.strftime("%Y-%m-%d %H:%M:%S") #dateTime format
		
		print("Temp: {:.1f} F / {:.1f} C    Humidity: {}% ".format(temperature_f, temperature_c, humidity))
		
		dataJSON = {
			"DateTime": dataDateTime,
			"Temp_C": temperature_c,
			"Temp_F": temperature_f,
			"Humidity": humidity
		}
		print(dataJSON)
		
	except RuntimeError as error:
		errorStatus =1
		print(error.args[0])
		
		
	time.sleep(2)   
	# Time intervals between samples, uncomment to switch
	#waitTime =3600 #  1 hour
	#waitTime =1800 # 30 minutes
	#waitTime =900  # 15 minutes
	waitTime = 300  #  5 minutes
	
	
	if errorStatus ==0:  
		try:
			response = requests.post(serverURL, json=dataJSON)  #POST request to server
			if response.status_code // 100 == 2:
				print("POST successful")
			else:
				print("POST failed")
				waitTime = 5;  #retry
		except requests.RequestException as e:
			print(f"ERROR making the request: {e}")
			waitTime = 5;  #retry
			
		time.sleep(waitTime)
	else:
		time.sleep(5)
		
		
