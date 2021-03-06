import React, { useState, useContext } from 'react';
import { CourseContext } from '../Context';
import { useHistory } from 'react-router';
import ValidationErrors from './ValidationErrors';


const CreateCourse = () => {
    //context variables
    const context = useContext(CourseContext);
    const { authenticatedUser } = context;
    const password = authenticatedUser.password;
    const username = authenticatedUser.emailAddress;
    const userId = authenticatedUser.userId;

    const history = useHistory();

    //  update course variables
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription]= useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    

    //  Sets course data value base on user input. Updates courses variable.
    const change = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case "courseTitle":
                setCourseTitle(value);
                break;
            case "courseDescription":
                setCourseDescription(value);
                break;
            case "estimatedTime":
                setEstimatedTime(value);
                break;
            case "materialsNeeded":
                setMaterialsNeeded(value);
                break;
            default:
                return;
        }
    }

    // Submits course payload and crate a new course. Uses authenticated User.
    const handleSubmit = (event) => {
        event.preventDefault();

        const course = {
            title: courseTitle,
            description: courseDescription,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded,
            userId: userId
        };


            //call create course api
            context.data.createCourse(course, username, password )
            .then(errors => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    history.push('/');
                }
            })
            .catch(() => history.push("/error"))


    } //end submit function 





    // cancels task returns user to home page.
    const handleCancel =(e) => {
        e.preventDefault();
        history.push('/');
    }


    return (
        <div className='wrap'>
            <h2>Create Course</h2>
            <ValidationErrors errors={ errors } />
            <form onSubmit={ handleSubmit }>
                <div className="main--flex">
                    <div>
                        <label>Course Title</label>
                        <input 
                        id="courseTitle" 
                        name="courseTitle" 
                        type="text" 
                        onChange={change} 
                        value={courseTitle} />

                        <p>By {authenticatedUser.firstName +" "+ authenticatedUser.lastName} </p>

                        <label>Course Description</label>
                        <textarea 
                        id="courseDescription" 
                        name="courseDescription" 
                        onChange={change} 
                        value={ courseDescription }>
                        </textarea>
                    </div>
                    <div>
                        <label>Estimated Time</label>
                        <input 
                        id="estimatedTime" 
                        name="estimatedTime" 
                        type="text" 
                        onChange={change} 
                        value={estimatedTime} />

                        <label>Materials Needed</label>
                        <textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded" 
                        onChange={change} 
                        value={ materialsNeeded }>
                        </textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={ handleCancel }>Cancel</button>
            </form>
        </div>
    

        
    )
}


export default CreateCourse;