#include "IoTtweetNBIoT.h"
String userid = "005459";
String key = "tdm288j8eqxf";
float data0;
String private_tweet = "AIS NB-IoT";
String public_tweet = "Hello IoTtweet";
IoTtweetNBIoT myNBiot;
myNBiot.sendDashboard(userid,key,sensorValue,private_tweet,public_tweet);
String rssi = myNBiot.readRSSI();

void setup() { 

  Serial.begin(9600); 

}   

void loop() { 

  int sensorValue = analogRead(A0); 

  Serial.println(sensorValue); 

  delay(1000);

}
