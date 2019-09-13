#include "AIS_NB_BC95.h"
String serverIP = "52.221.184.203";
String serverPort = "8080";
String udpData = "HelloWorld";
AIS_NB_BC95 AISnb;
const long interval = 5000;  //millisecond
unsigned long previousMillis = 0;
void setup()
{ 
  AISnb.debug = true;
  
  Serial.begin(9600);
 
  AISnb.setupDevice(serverPort);
String ip1 = AISnb.getDeviceIP();  
  delay(1000);
  
  pingRESP pingR = AISnb.pingIP(serverIP);
  previousMillis = millis();
}
void loop()
{ 
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval)
    {
      UDPSend udp = AISnb.sendUDPmsgStr(serverIP, serverPort, udpData);
      previousMillis = currentMillis;
    }
  UDPReceive resp = AISnb.waitResponse();
}
