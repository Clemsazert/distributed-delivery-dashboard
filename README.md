# Distributed Delivery Dashboard

*Contact:* [clement.didom@gmailcom](mailto:clement.didom@gmailcom)

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

## Front End Architecture

### Usage

The app opens on the 'Part 1' page with the stacked bandwidth graph. Using the navbar on top the user can navigate to the 'Part 2' where he can login (using a id and the corresponding password available on the back end code in the `clients.json` file) in order to access the dashboard. Then the app displays two charts: the bandwidth one (as in the first part) with a tooltip showing up when hoovering graph points), and the concurrent viewer one.

The user can select two dates with the datepickers at the bottom in order to chose the timespan of the displayed values.

*Note:*
- No logout was implemented yet on the app, so if the backend is stopped, the user shloud clear his local storage for the app (delete the stored `sessionToken`) and reload in order to be able to ligon again.

### Modules Organization

```
├── src
│   ├── App.tsx
│   ├── index.tsx
│   ├── routes.ts
│   ├── pages
│       ├── firstPart.tsx
│       └── secondPart
│   ├── lib
│       └── ...
│   ├── components
│       └── ...
│   └── utils
│       └── ...
└── ...
```

The React App is composed of 2 pages (one for each part of the assignment), which are implemented in the `src/pages` directory. The first part is a standalone file, meanwhile the second part, more complexe, has it's own components and custom hooks declared in the same directory.
Both pages uses components declared in `src/components` and functions that are implemented in the `src/utils` directory.
Finally `src/lib` contains the theme declaration used by the styled-components.

### Libraries

To handle the chart drawing, I used [chart.js](https://www.chartjs.org/). It is highly customizable and I already used it with React in multiple projects before.

I choose to use [axios](https://github.com/axios/axios) to handle the backend request in Part 2. It integrates really well with Typescript and works with json natively.

In the wake of `moment`, [luxon](https://moment.github.io/luxon/) has become my go to when it comes to dates management, specially for parsing and formatting dates from various sources and format.

The routing between the two pages is handled by `react-router-dom` and as requested, I used `styled-components` for styling.

## Observations

- I let the first part code mostly as it was at the end of the implementation, although I could have use components and functions defined after during the implementation of the second part, in order to keep the 2 parts quite independant from a development point of view.

- In the `mock-backend.js`, I added the lines 134 to 138 to handle CORS policies blocking the requests from the frontend.

- I added two environment variables to control the port on which the app listen to, and the rate of request failure.


