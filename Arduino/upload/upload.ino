#include "AIS_NB_BC95.h"
#include "DHT.h"
DHT dht;

String apnName = "devkit.nb";
String serverIP = "35.213.132.240"; // Your Server IP
String serverPort = "5003"; // Your Server Port
AIS_NB_BC95 AISnb;

const long interval = 5000;  //millisecond
unsigned long previousMillis = 0;
unsigned long tempTime = 0;
unsigned long period = 1;
long cnt = 0;
String dataFromLine;
const int soil_sensor = A2;
int value = 0;
int sensorValue = 0;
int temp;
int toggle = 0;
int setHumidity;
boolean runOnOff = false;

void setup()
{
  AISnb.debug = true;
  Serial.begin(9600);
  pinMode(14, OUTPUT);
  AISnb.setupDevice(serverPort);
  String ip1 = AISnb.getDeviceIP();
  delay(1000);
  pingRESP pingR = AISnb.pingIP(serverIP);
  previousMillis = millis();
  setHumidity = 600;
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    cnt++;
    sensorValue = analogRead(soil_sensor);
    UDPSend udp = AISnb.sendUDPmsgStr(serverIP, serverPort, String(sensorValue));
    Serial.print("Moisture Value = " );
    Serial.println(sensorValue);
    previousMillis = currentMillis;
  }
  UDPReceive resp = AISnb.waitResponse();

  dataFromLine = AISnb.retData;

  if (dataFromLine.substring(0, 2) == "oo") {
    runOnOff = false;
  }

  if (dataFromLine.substring(0, 2) == "oo" && dataFromLine.substring(2, 4) == "00" && runOnOff == false) {
    onOffWater(LOW);
  }

  if (dataFromLine.substring(0, 2) == "oo" && dataFromLine.substring(2, 4) == "01" && runOnOff == false) {
    onOffWater(HIGH);
  }

  if (dataFromLine.substring(0, 2) == "st") {
    runOnOff = true;
  }

  if (runOnOff == true) {
    temp = dataFromLine.substring(2, 3).toInt();
    period = (unsigned long)temp * 3600000;
    if (millis() - tempTime > period) {
      digitalWrite(14, toggle);
      tempTime = millis();
    }
  }
  if (dataFromLine.substring(0, 2) == "hm") {
    setHumidity = dataFromLine.substring(2).toInt();
  }
  
  if (sensorValue < setHumidity) {
    onOffWater(HIGH);
  } else if (sensorValue > setHumidity) {
    runOnOff = false;
    onOffWater(LOW);
  }
}

void onOffWater(int state) {
  digitalWrite(14, state);
}
