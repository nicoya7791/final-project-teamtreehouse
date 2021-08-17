import React, { useState, useEffect, useContext } from 'react';
import { CourseContext } from '../Context';
import { useHistory } from 'react-router';


const CreateCourse = () => {
    const context = useContext(CourseContext);

    const history = useHistory();

    // create course variables
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription]= useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    const { authenticatedUser } = context;

    useEffect( () =>{
        console.log(authenticatedUser);

    }, [authenticatedUser])

    const change = (event) => {
        const value = event.targe.value;
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const course = {
            courseTitle,
            courseDescription,
            estimatedTime,
            materialsNeeded
        }

            //call create course api
        context.data.createCourse(course, authenticatedUser.emailAddress, authenticatedUser.password)
            .then(errors => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    history.push('/');
                }
            })
            .catch(() => history.push("/error"))


    } //end submit function 






    const handleCancel =() => {
        history.push('/');
    }


    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <h3>{authenticatedUser.emailAddress}</h3>
            <errorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label>Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" onChange={change} value={courseTitle} />

                        <p>By Henry </p>

                        <label>Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" onChange={change} value={courseDescription}></textarea>
                    </div>
                    <div>
                        <label>Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" onChange={change} value={estimatedTime} />

                        <label>Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" onChange={change} value={materialsNeeded}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    

        
    )
}

// Handle validation erros
export function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;
  
    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        </div>
      );
    }
  
    return errorsDisplay;
  }


export default CreateCourse;