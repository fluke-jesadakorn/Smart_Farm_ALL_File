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
bool handleTimeOnOff = false;
bool waterState = false;
bool humidityLogic = false;

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
  //st: settime
  //oo: onOff
  //gt: get Time
  //ws: water state
  
  unsigned long currentMillis = millis();
  sensorValue = analogRead(soil_sensor);

  if (currentMillis - previousMillis >= interval) {
    cnt++;
    UDPSend udp = AISnb.sendUDPmsgStr(serverIP, serverPort, String(sensorValue));
    Serial.print("Moisture Value = " );
    Serial.println(sensorValue);
    Serial.println("Data From Line is : " + dataFromLine);
    previousMillis = currentMillis;
  }

  UDPReceive resp = AISnb.waitResponse();

  //Data from line
  dataFromLine = AISnb.retData;

  //Golbal state water State
  if(waterState == false){
    digitalWrite(14, 0);
  }
  if(waterState == true){
    digitalWrite(14, 1);
  }

  //force off water
  if (dataFromLine.substring(0, 2) == "oo" && dataFromLine.substring(2, 4) == "00") {
    waterState = false;
    handleTimeOnOff = false;
    humidityLogic == false;
  }

  //force on water
  if (dataFromLine.substring(0, 2) == "oo" && dataFromLine.substring(2, 4) == "01") {
    waterState = true;
    handleTimeOnOff = false;
    humidityLogic == false;
  }

  //get time
  if(dataFromLine.substring(0, 2) == "gt"){
    sendData(String(tempTime));
  }

  //get waterState
  if(dataFromLine.substring(0, 2) == "ws"){
    sendData(String(waterState));
  }

  //Set trigger water off time
  if (dataFromLine.substring(0, 2) == "st") {
    handleTimeOnOff = true;
  }
  
  //Set off time
  if (handleTimeOnOff == true) {
    temp = dataFromLine.substring(2, 3).toInt();
    period = (unsigned long)temp * 1000; //3600000 Hr
    if (millis() - tempTime > period) {
      waterState = true;
      tempTime = millis();
    }else{
      waterState = false;
    }
  }

  //Set off when huminity less than value
  if (dataFromLine.substring(0, 2) == "hm") {
    setHumidity = dataFromLine.substring(2).toInt();
  }

  //Huminity logic
  if (sensorValue < setHumidity) {
    waterState = true;
  }else if (sensorValue > setHumidity) {
//    handleTimeOnOff = false;
    waterState = false;
  }
}

//force send data function
void sendData(String value) {
  UDPSend udp = AISnb.sendUDPmsgStr(serverIP, serverPort, String(value));
}

void checkStatus(){
  if(waterState == false)
    sendData("wt00");
  else if(waterState == true)
    sendData("wt01");
}
