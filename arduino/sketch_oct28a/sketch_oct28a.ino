#include <OneWire.h>
#include <DallasTemperature.h>
#define samp_siz 4
#define rise_threshold 5

#define ONE_WIRE_BUS 3
#define samp_siz 10  // Adjust the size as needed

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

int sensorPin = A0;

float offsetCorrection = 4.5;

OneWire ds(2);
byte addr[8];  // To hold 64-bit ROM Codes of DS18B20
byte data[9];  // Buffer to hold data coming from DS18B20
float celsius;

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
          temperature();
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

void temperature() {
  sensors.requestTemperatures();
  float temperatureC = sensors.getTempCByIndex(0) + 7 + offsetCorrection;
  Serial.print(" Temperature: ");
  Serial.println(temperatureC, 2);
}