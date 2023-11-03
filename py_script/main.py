import serial
import aiohttp
import asyncio

ser = serial.Serial('/dev/cu.usbmodem2017_2_251', 9600)

async def post_data(temperature, heart_rate, patientId):
    print(temperature, heart_rate, patientId)
    url = "http://localhost:5050/api/v1/records"
    data = {'bodyTemperature': temperature, 'heartRate': heart_rate, 'patientId': patientId}
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(url, json=data) as response:
                if response.status == 200:
                    print("Data successfully sent to the backend.")
                else:
                    print(f"Failed to send data. Status code: {response.status}")
        except aiohttp.ClientError as e:
            print(f"An error occurred: {e}")

async def main():
    while True:
        data = ser.readline().decode('utf-8').strip()
        if data:
            # Data is coming in the format "Temperature: 25.5 Heart Rate: 80"
            if "Temperature" in data and "Heart Rate" in data:
                hr_start = data.find(":") + 2
                hr_end = data.find(" ", hr_start)
                heart_rate = data[hr_start:hr_end]
                temp_start = data.rfind(":") + 2
                temperature = data[temp_start:]
                await post_data(temperature, heart_rate, 1)

if __name__ == '__main__':
    asyncio.run(main())
