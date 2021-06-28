# Distributed Delivery Dashboard

## Project Architecture

In the project directory, you can find the React App used as a client, displaying the data retrieved from the mock_backend located in the `mock-backend` subdirectory.

The React App uses Typescript and has been bootstraped using Create React App.

## Setup Instructions

Requirements : Make sure **node** is installed (version >= node12)

### Front-End :

- In the project directory run `npm install` in order to install the project dependancies.
- Once the installation is completed, run `npm start` in order to start the app. It should also open your broswer on [http://localhost:3000](http://localhost:3000)

### Mock Backend :

- Move inside the `mock-backend` directory.
- Run `npm install` to install the backend dependancies.
- Once the installation is completed, run `npm start` in order to start the node application.

*Note:*
- You can also use Docker to run the backend with the provided Dockerfile.
- First run `docker build -t mock_backend_dashboard .` to build the image.
- Then run `docker run -p 5000:5000 mock_backend_dashboard`

## Front-End Features:

