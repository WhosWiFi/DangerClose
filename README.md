# DangerClose

## DESCRIPTION

DangerClose is a vulnerable web application designed in a CTF format. The goal is to accumlate as many points as you can during your session. Points are obtained through capturing flags found in challenges. Flags have the format of WiFi{}.

## Docker INSTALLATION

1. Clone the repository
```
git clone https://github.com/WhosWiFi/DangerClose.git
```
2. Go to DangerClose directory
```
cd DangerClose
```
3. Start the application
```
docker compose up --build
```
4. The application is hosted at:
```
http://localhost:3000
```

## STANDALONE INSTALLATION

1. Clone the repository
```
git clone https://github.com/WhosWiFi/DangerClose.git
```
2. Go to DangerClose directory
```
cd DangerClose
```
3. Install Node.js v22.8
```
https://nodejs.org/en/download/prebuilt-installer
```
4. Use npm to install the required dependencies
```
npm install
```
5. Start the application
```
node app.js
```
6. The application can be accessed on a web browser at the following URL
```
http://localhost:3000
```
