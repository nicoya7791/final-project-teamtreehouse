import React, { useState, useEffect, useContext} from 'react';
import { CourseContext } from '../Context';
import { useHistory, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import ValidationErrors from './ValidationErrors';

 const CourseDetail = () => {
     // context and histroy hooks initialized 
     const context = useContext(CourseContext);
     const history = useHistory();
     const { authenticatedUser } = context;

     // course detail variables
     const [courseDetail, setCourseDetail] = useState({});
     const [user, setUser] = useState({});
     const {id} = useParams();
     const [errors, setErrors] = useState([]);

     

    // fetch course details strore results in courseDetail
    useEffect( () => {
        console.log('fetching course detail');
        context.data.getCourse(id)
        .then( response => {
            if (response){
                setCourseDetail(response)
                setUser(response.User)
            } else {
                history.push('/NotFound')
            }
        })
        .catch( () => history.push('/error'));
            
    }, [context.data, history, id]);

    // Delete course
    const handleDeleteCourse = () =>{
        console.log('handle delete called');
        const { emailAddress, password} = authenticatedUser;
        context.data.deleteCourse(id, emailAddress, password)
            .then((errors) => {
                if (errors.length) {
                    setErrors(errors)
                } else {
                    console.log(`course id:${id} deleted`)
                    history.push('/')
                }
            })
            .catch((err) =>{
                console.log('Error:', err);
            });

    }


    return (
        <React.Fragment>
            <div className='actions--bar'>
                <div className='wrap'>
                { authenticatedUser && authenticatedUser.userId === courseDetail.userId ? (
                    <React.Fragment>
                        <a className='button' href={`/courses/${id}/update`}>Update Course</a>
                        <a className='button' onClick={ handleDeleteCourse } href='/'>Delete Course</a>
                        <a className='button button-secondary'  href='/'>Return to List</a>
                    </React.Fragment>
                ):(
                    <React.Fragment>
                        <a className="button" href="/">
                          Return to List
                        </a>
                    </React.Fragment>

                )}
                </div>
            </div>
            <div className='wrap'>
                <h2>Course Details</h2>
                <ValidationErrors errors={ errors }/>
                <form>
                    <div className='main--flex'>
                        <div>
                            <h3 className='course--detail--title'>Course</h3>
                            <h4 className='course--name'>{ courseDetail.title }</h4>
                            <p>By { user.firstName +' ' + user.lastName }</p>
                            <ReactMarkdown>{ courseDetail.description }</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{ courseDetail.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul>
                                <ReactMarkdown className="course--detail--list">
                                    { courseDetail.materialsNeeded }
                                </ReactMarkdown>
                            </ul>

                        </div>

                    </div>
                </form>

            </div>
        </React.Fragment>

    )
}


export default CourseDetail;