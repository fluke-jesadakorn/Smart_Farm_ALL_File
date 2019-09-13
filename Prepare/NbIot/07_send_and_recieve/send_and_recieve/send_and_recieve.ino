/* File              : test.ino
   Codeing By IOXhop : www.ioxhop.com
   Sonthaya Nongnuch : www.fb.me/maxthai */

#include<IOXhop_BC95.h>

IOXhop_BC95 nb;
Socket *soc = NULL;

unsigned long timeSend = 0, timeSend2 = 0;

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);

  // Setup module
  nb.easySetup(true);

  // Socket
  Serial.println("Create new socket");
  if (soc = nb.CreateUDPSocket(8080)) {
    Serial.print("Socket id is ");
    Serial.println(soc->getID());
  } else {
    Serial.println("Create fail !");
  }

  //Create Socket For Send Data
  soc->onReceiver([](String ip, unsigned long port, byte* data, int len) {
    char message[len + 1];
    memcpy(message, data, len);
    message[len] = 0;
    Serial.print("Receiver[" + ip + ":" + String(port) + "]: ");
    Serial.println(message);
    //Convert ByteString to String(for Comparator)
    String Receive_Convert = String(message);
    if (Receive_Convert=="1"){
      Serial.print("Its abc\n");
    }else{
      Serial.print("Not abc\n");
    }
  });
}

void loop() {
  //Reference from Setup Function
  if (soc) {
    //delay loop 10 Sec
    if ((millis() - timeSend) >= 2500) {
      timeSend = millis();

      //Input From Sensor
      //int soi_in = analogRead(A0);
      int soi_in = rand() % 1000;
      //Convert int to String
      String soi = String(soi_in);
      //keep len for set parameter next function
      int str_len = soi.length() + 1;
      //for keep
      char keep_convert[str_len];
      //Convert String to Char[Array]
      soi.toCharArray(keep_convert, str_len);

      //Send to Server
      Serial.print("Sending \n");
      if (soc->send("52.221.184.203", 8080, keep_convert, strlen(keep_convert))) {
        Serial.println("Sent to Server OK");
      } else {
        Serial.println("Sent to Server fail !");
      }
    }
  }
  nb.loop();
}
