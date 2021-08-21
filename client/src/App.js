import React from "react";
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';

// import components
import Courses from "./components/Courses";
import Header from "./components/Header";
import CourseDetail from './components/CourseDetail';
import UserSignIn from "./components/UserSignIn";
import UserSignUP from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";
import UserSignOut from "./components/UserSignOut";
import NotFound from "./components/NotFound";
import UpdateCourse from "./components/UpdateCourse";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path='/' component={ Courses } />
          <PrivateRoute path='/courses/create' component={ CreateCourse } />
          <PrivateRoute path='/courses/:id/update' component={ UpdateCourse } />
          <Route path='/courses/:id' component={ CourseDetail } />
          <Route path='/signin' component={ UserSignIn } />
          <Route path='/signup' component={ UserSignUP} />
          <Route path='/signout' component={ UserSignOut } />
          <Route component={ NotFound } />

        </Switch>
      </main>
    </Router>
  );
}

export default App;
