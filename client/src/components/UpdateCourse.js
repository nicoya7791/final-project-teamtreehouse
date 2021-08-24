import React, { useContext, useState, useEffect } from 'react';
import { CourseContext } from '../Context';
import { useHistory, useParams } from 'react-router';
import ValidationErrors from './ValidationErrors';


const UpdateCourse = () => {
    // context variables
    const context = useContext(CourseContext);
    const { authenticatedUser } = context;
    const password = authenticatedUser.password;
    const username = authenticatedUser.emailAddress;
    const userId = authenticatedUser.userId;
    console.log(password+ " " + username);

    const history = useHistory();

    //  course fields variables
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription]= useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    
    // const [courseDetail, setCourseDetail] = useState({});
    const [user, setUser] = useState({});
    const { id } = useParams();


            // fetch course details strore results in courseDetail
    useEffect( () => {
        console.log('fetching data to update');
        context.data.getCourse(id)
        .then( response => {
            if (response && response.userId === userId){
                setCourseTitle(response.title);
                setCourseDescription(response.description);
                setEstimatedTime(response.estimatedTime);
                setMaterialsNeeded(response.materialsNeeded);
                setUser(response.User)
            } else {
                history.push('/forbidden');
            }
            if(!response){
                history.push('/NotFound');
            }
        })
        .catch( () => history.push('/error'));
            
    }, [context.data, history, id, userId]);

    // update input fields
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit update course');

        const course = {
            title: courseTitle,
            description: courseDescription,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded,
            userId: userId
        };


            //call update course api
            context.data.updateCourse(course, id, username, password )
            .then(errors => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    history.push(`/courses/${id}`);
                }
            })
            .catch(() => history.push("/error"))


          


    } //end submit function 



    // returns user to p
    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/courses/${id}`);
    }
    


    return (
        <div className='wrap'>
            <h2>Update Course</h2>
            <ValidationErrors errors={ errors } />
            <form onSubmit={ handleSubmit }>
                <div className='main--flex'>
                    <div>
                        <label>Course Title</label>
                        <input 
                            id='courseTitle' 
                            type='text' 
                            name='courseTitle' 
                            onChange={ change }
                            value={ courseTitle }>
                        </input>

                        <p>By { user.firstName +' ' + user.lastName }</p>

                        <label> Course Description</label>
                        <textarea 
                            id='courseDescription' 
                            type='text' 
                            name='courseDescription' 
                            onChange={ change }
                            value={ courseDescription }>
                        </textarea>
                    </div>
                    <div>
                        <label>Estimated Time</label>
                        <input
                            id='estimatedTime'
                            type='text'
                            name='estimatedTime'
                            onChange={ change }
                            value={ estimatedTime }>
                        </input>
                        <label>Materials Needed</label>
                        <textarea
                            id='materialsNeeded'
                            type='text'
                            name='materialsNeeded'
                            onChange={ change }
                            value={ materialsNeeded }
                        >

                        </textarea>
                    </div>
                </div>
                <button className='button' type='submit'>Update Course</button>
                <button className='button button-secondary' onClick={ handleCancel }>Cancel</button>
            </form>
        </div>

    );
}


export default UpdateCourse;
