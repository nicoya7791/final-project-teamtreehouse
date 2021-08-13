import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';

// import components
import Courses from "./components/Courses";
import Header from "./components/Header";
import CourseDetail from './components/CourseDetail';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path='/'  component={ Courses } />
          <Redirect exact from='/courses' to='/' />
          <Route exact path='/courses/:id' component={ CourseDetail } />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
