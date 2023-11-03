#include <OneWire.h>
#define samp_siz 4
#define rise_threshold 5
OneWire ds(2);
byte addr[8];  // To hold 64-bit ROM Codes of DS18B20
byte data[9];  // Buffer to hold data coming from DS18B20
float celsius;
int sensorPin = A0;
void setup() {
  Serial.begin(9600);
  ds.reset();
  ds.search(addr);
}
void loop() {
  float reads[samp_siz], sum;
  long int now, ptr;
  float last, reader, start;
  float first, second, third, before, print_value;
  bool rising;
  int rise_count;
  int n;
  long int last_beat;
  for (int i = 0; i < samp_siz; i++)
    reads[i] = 0;
  sum = 0;
  ptr = 0;
  while (1) {
    n = 0;
    start = millis();
    reader = 0.;
    do {
      reader += analogRead(sensorPin);
      n++;
      now = millis();
    } while (now < start + 20);
    reader /= n;
    sum -= reads[ptr];
    sum += reader;
    reads[ptr] = reader;
    last = sum / samp_siz;
    if (last > before) {
      rise_count++;
      if (!rising && rise_count > rise_threshold) {
        rising = true;
        first = millis() - last_beat;
        last_beat = millis();
        print_value = 60000. / (0.4 * first + 0.3 * second + 0.3 * third);
        if (print_value >= 60 && print_value <= 120) {
          Serial.print("Heart Rate: ");
          Serial.print(print_value);
          Serial.print(" ");
          probe();  // Call the probe function to print the temperature
        }
        third = second;
        second = first;
      }
    } else {
      rising = false;
      rise_count = 0;
    }
    before = last;
    ptr++;
    ptr %= samp_siz;
  }
}

void probe() {
  //----------------------------
  ds.reset();       // Bring 1-Wire into the idle state
  ds.select(addr);  // Select the DS18B20 with address addr
  ds.write(0x44);   // Start temperature conversion
  delay(1000);      // Wait for conversion to complete
  //---------------------------
  ds.reset();
  ds.select(addr);         // Select the desired DS18B20
  ds.write(0xBE);          // Read Scratchpad Memory (9 bytes)
  ds.read_bytes(data, 9);  // Data comes from DS18B20 and is saved into the buffer data[8]
  //---------------------------------
  int16_t raw = (data[1] << 8) | data[0];  // Combine data bytes (12-bit resolution)
  celsius = (float)raw * 0.0625;           // Adjust for 12-bit resolution (0.0625 degrees Celsius per bit)
  Serial.print("Temperature: ");
  Serial.println(celsius);
}
