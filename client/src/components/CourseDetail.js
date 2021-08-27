import React, { useState, useEffect, useContext} from 'react';
import { CourseContext } from '../Context';
import { useHistory, useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import ValidationErrors from './ValidationErrors';

// Displays course detail.
 const CourseDetail = () => {
     // context and histroy variables initialized 
     const context = useContext(CourseContext);
     const history = useHistory();
     const { authenticatedUser } = context;

     // course detail variables
     const [courseDetail, setCourseDetail] = useState({});
     const [user, setUser] = useState({});
     const {id} = useParams();
     const [errors, setErrors] = useState([]);

     

    // fetch course details stores results in courseDetail. Also gets user data.
    useEffect( () => {
        context.data.getCourse(id)
        .then( response => {
            if (response){
                setCourseDetail(response)
                setUser(response.User)
            } else {
                history.push('/notfound');
            }
        })
        .catch( () => history.push('/error'));
            
    }, [context.data, history, id]);

    // Delete course only if course belongs to user and user is authenticated.
    const handleDeleteCourse = () =>{
        const { emailAddress, password} = authenticatedUser;
        let result = window.confirm(`Do you want to delete ${courseDetail.title} course?`);
            if(result){
                context.data.deleteCourse(id, emailAddress, password)
                .then(errors => {
                    if (errors.length) {
                        setErrors(errors);
                    } else {
                        history.push("/");
                    }
                })
                .catch(() => {
                    history.push("/error")
                });


        } 

    } // END handle delete;

    //  Conditional rendering. If user owns the course, Update course and Delete course button will be available.
    return (
        <React.Fragment>
            <div className='actions--bar'>
                <div className='wrap'>
                { authenticatedUser && authenticatedUser.userId === courseDetail.userId ? (
                    <React.Fragment>
                        <Link className='button' to={`/courses/${id}/update`}>Update Course</Link>
                        <Link className='button' onClick={ handleDeleteCourse } to="#">Delete Course </Link>
                        <Link className='button button-secondary'  to='/'>Return to List</Link>
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
                            <p className='course--author'>By { user.firstName +' ' + user.lastName }</p>
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