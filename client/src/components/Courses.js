import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CourseContext } from '../Context';



 const Courses = () => {
     const context = useContext(CourseContext);

    //history object
     const history = useHistory();

     // courseArray will hold all courses data.
     const [coursesArray, setCoursesArray] = useState([]);
    console.log(coursesArray);

    //  fetch courses list
     useEffect(() => {
         context.data.getCourses()
            .then( data => setCoursesArray(data.courseData))
            .catch(() => history.push('/'));
     }, [context.data, history]);

     // Map throught the courses array and display title with a link to course detail.
     let courseList = coursesArray.map( (course, index) => (
        <a key={index} className='course--module course--link' href={`/courses/${course.id}`} > 
            <h2 className='course--label'>Course</h2> */
            <h3 className='course--title'>{course.title}</h3>
        </a>
     ));

    return (
        <div className='wrap main--grid'>

            { courseList }
        
            <a className="course--module course--add--module" href="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
            </a>

        </div>

    )
}

export default Courses;