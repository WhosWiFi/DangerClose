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
http://localhost:4123
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
3. Use nvm for managing node version
```
https://github.com/nvm-sh/nvm
or
brew install nvm
```
4. nvm install 18

5. nvm use 18

6. npm rebuild

7. node app.js
```
http://localhost:4123
```
