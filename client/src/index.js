import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//import styles css
import './styles/reset.css';
import './styles/global.css';

// import context provider class
import { CourseContextProvider } from './Context';

ReactDOM.render(
  <React.StrictMode>
    <CourseContextProvider>
      <App />
    </CourseContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
