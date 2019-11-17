#include "AIS_NB_BC95.h"

String apnName = "devkit.nb";

String serverIP = "61.19.181.29"; // Your Server IP
String serverPort = "5003"; // Your Server Port

AIS_NB_BC95 AISnb;

const long interval = 5000;  //millisecond
unsigned long previousMillis = 0;
int value = 0;

const int soil_sensor = A0;  // Analog input pin that the soil moisture sensor is attached to
int sensorValue = 0;         // store sensor input value

long cnt = 0;
void setup()


{ 
  AISnb.debug = true;
  
  Serial.begin(9600);
 
  AISnb.setupDevice(serverPort);

  String ip1 = AISnb.getDeviceIP();  
  delay(1000);
  
  pingRESP pingR = AISnb.pingIP(serverIP);
  previousMillis = millis();
  pinMode(8, OUTPUT)

}
void loop() {
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= interval){
      cnt++;
      sensorValue = analogRead(soil_sensor);
      UDPSend udp = AISnb.sendUDPmsgStr(serverIP, serverPort, String(sensorValue));
      Serial.print("Moisture Value = " );
      Serial.println(sensorValue);      
      previousMillis = currentMillis;
    }
    UDPReceive resp = AISnb.waitResponse();
  }
