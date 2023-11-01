import serial

ser = serial.Serial('/dev/cu.usbmodem2017_2_251', 9600)

def main():
    while True:
        data = ser.readline().decode('utf-8').strip()
        if data:
            # ser.write(str(random_seconds).encode())
            print(data)

if __name__ == '__main__':
    main()
