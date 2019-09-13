/* Example Join LoRa IoT By CAT Using ABP (Access By Personalization)
 * Edited by Alongkot Kingkaew , Phuket Maker Club 
 * https://www.facebook.com/groups/608886809255215 
 * DATE 30 Aug 2018
 *  
 *  In setup() below please replace the argument to LoRaWAN.begin()
 *  with your appropriate region specific band:
 *
 *  AS923 < THAILAND >
 *  AU915
 *  EU868
 *  IN865
 *  KR920
 *  US915
 *
 */

#include "LoRaWAN.h"

#define DeviceAddr "BBBBAAAA"    // LSB (AAAABBBB)      // Device Address 
#define NetworkSSKey "28AED22B7E1516A609CFABF715884F3C" // Network Session Key 
#define AppSSKey "1628AE2B7E15D2A6ABF7CF4F3C158809"      // Application Session Key

int cnt = 0;
void setup( void )
{
  Serial.begin(9600);
  LoRaWAN.begin(AS923);

  if (!LoRaWAN.busy() && !LoRaWAN.joined()) {
    Serial.println("start join ABP");
    int result = LoRaWAN.joinABP(DeviceAddr, NetworkSSKey, AppSSKey);
    if (result) {
      Serial.println("Join success");
    }
    else {
      Serial.println("Join failed");
    }
  }
}

void loop( void )
{
  LoRaWAN.beginPacket();
  LoRaWAN.write(0xef);
  LoRaWAN.write(0xbe);
  LoRaWAN.write(0xad);
  LoRaWAN.write(0xde);
  LoRaWAN.write(cnt++);
  int result = LoRaWAN.endPacket();

  if (result) {
    Serial.print("DR: ");
    Serial.print(LoRaWAN.getDataRate());
    Serial.print(", TxPower: ");
    Serial.print(LoRaWAN.getTxPower());
    Serial.print("dbm, UpLinkCounter: ");
    Serial.print(LoRaWAN.getUpLinkCounter());
    Serial.print(", DownLinkCounter: ");
    Serial.println(LoRaWAN.getDownLinkCounter());
    Serial.print("Payload:: ");
    Serial.println(cnt);
    Serial.print("============================");
    Serial.println("");
  }
  else {
    Serial.println("Send package failed");
  }
  delay(10000);
}
