### 1. EDIT ".env-example" FILE IN SERVER FOLDER AND CHANGE IT'S NAME TO ".env"

- API_KEY = "api key"
- SECRET_KEY = "secret api"

### 2. PREPARE NPM FILES

1. RUN "npm install" IN THE "server" FOLDER

2. RUN "npm install" IN THE "client" FOLDER

3. RUN "npm run build" IN THE "client" FOLDER

### 4. BUILD DOCKER IMAGE AND START DOCKER CONTAINER (from console in main folder)

    docker compose up --build -d

### YOU CAN CHECK IF SERVER WORKS CORRECTLY AND BINANCE DATA IS RECEIVED:

Open http://localhost:5000/api and you should see your assets in .json format.
In case of any problem check if:
1. Container in docker is running
2. Your API KEYS in .env file are valid
