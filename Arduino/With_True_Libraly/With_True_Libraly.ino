int value = 0;

const int soil_sensor = A0;  // Analog input pin that the soil moisture sensor is attached to
int sensorValue = 0;         // store sensor input value


void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600); 
}

void loop() {
  // read the sensor:
  sensorValue = analogRead(soil_sensor);            
  
  // print the sensor results to the serial monitor:
  Serial.print("Moisture Value = " );                       
  Serial.println(sensorValue);      

  // delay of one second
  delay(1000);                     
}
