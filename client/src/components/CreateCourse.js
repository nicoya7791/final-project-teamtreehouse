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
    const [matirialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);


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

    const handleSumbit = (event) => {
        event.preventDefault();
        const course = {
            courseTitle,
            courseDescription,
            estimatedTime,
            matirialsNeeded
        }
    }

    //call create course api
    // context.data.createCourse(course);




    const cancel =() => {
        history.push('/');
    }


    return (
        <div className='wrap'>
            <h2>Create Course</h2>

            {/* <form > */}
                {/* <div className='main--flex'> */}
                    {/* <div> */}
                        {/* <label>Course Title</label> */}
                        {/* <input id='courseTitle' name='courseTitle' type='text' ></input> */}
{/*  */}
                        {/* <p>By user name goes here</p> */}
{/*  */}
                        {/* <label>Course Description</label> */}
                        {/* <textarea id='courseDescription' name='courseDescription' ></textarea> */}
                    {/* </div> */}
                    {/* <div> */}
                        {/* <label>Estimated Time</label> */}
                        {/* <input id='estimatedTime' name='estimatedTime' type='text' > </input> */}
{/*  */}
                        {/* <label>Materials Needed</label> */}
                        {/* <textarea id='materialsNeeded' name='materialsNeeded'></textarea> */}
                    {/* </div> */}
                {/* </div> */}
                {/* <button className='button' type='submit'>Create Course</button> */}
                {/* <button className='button button-secondary' >Cancel</button> */}
            {/* </form> */}


        </div>

        
    )
}

export default CreateCourse;