#include "Magellan.h"
Magellan magel;
char auth[]="2c754720-2faa-11e9-a028-9771a15972bf"; 		//Token Key you can get from magellan platform

String payload;

void setup() {
  Serial.begin(9600);
  magel.begin(auth);           //init Magellan LIB
}

void loop() {

  /*
  	Example send random temperature and humidity to Magellan IoT platform
  */
  String Temperature=String(random(0,100));
  String Humidity=String(random(0,100));

  payload="{\"Temperature\":"+Temperature+",\"Humidity\":"+Humidity+"}";       //please provide payload with json format

  magel.post(payload);                            							   //post payload data to Magellan IoT platform
  
}
