// Handle request to users and courses then pass the data to Contextjs.
export default class Data {
  api(path, method = 'GET', body = null, requireAuth = false, credentials = null) {
    const apiBaseUrl = 'http://localhost:5000/api';
    const url = apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        //authorization property was added.
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requireAuth){
      // creates a base-64 encoded ASCII string from a "string" of data
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }
  
  // GET request to the protected /users route on the server and returns the user data.
  async getUser(username, password) {
    const response = await this.api('/users', 'GET', null, true, {username, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  /**
   * 
   * @param {user} - this method is called in Context.js
   * @returns []empty array if status code is 201 or [errors] if status code is 400
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  // Get list of courses
  async getCourses() {
    const response = await this.api('/courses', 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
      
    } else if (response.status === 400) {
      return null;

    } else {
      throw new Error();
    }
  }

  /**
   * @param {id} id 
   * @returns course detail
   */
  async getCourse(id) {
    
    const response = await this.api(`/courses/${id}`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error();
    }
  }

    /**
   * @param {course, username, password} 
   * @returns new course
   */
  async createCourse (course, username, password) {
    const response = await this.api('/courses', 'POST', course, true, { username, password });
    if (response.status === 201) {
      return [];
    } else if ( response.status === 400) {
      return response.json().then( data => data.errors);
    } else {
      throw new Error();
    }
  }

  /**
   * @param {course, username, password} 
   * @returns updated course
   */
  async updateCourse (course, id, username, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { username, password } );
    if (response.status === 204) {
      return [];
    } else if ( response.status === 400) {
      return response.json().then(data => data.errors)
    } else {
      throw new Error();
    }

  }

   /**
  * @param {course, username, password} 
  * @returns Delete course
  */
  async deleteCourse (id, username, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { username, password});
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then( data => data.errors);
    } else {
      throw new Error();
    }

  }

}
