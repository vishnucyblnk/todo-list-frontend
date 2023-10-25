import {base_URL} from './baseURL';
import {commonAPI} from './commonAPI';

// uploading video to json server
export const uploadTask = async (addtask)=>{
    // http post request  to http://localhost:4000/maintask for adding  task in json server and return response
    return await commonAPI('POST',`${base_URL}/maintask`,addtask)
}


export const getAllTask = async()=>{
    // http get request  to http://localhost:4000/maintask for getting  task from json server and return response
    return await commonAPI('GET',`${base_URL}/maintask`,'')
}

// Delete a single task from json server 
export const deleteATask = async(id)=>{
    // http get request  to http://localhost:4000/videos/id for deleting a task from json server and return response
    return await commonAPI('DELETE',`${base_URL}/maintask/${id}`,{})
}

// Edit a single task from json server 
export const editATask = async(id,updatedTaskData)=>{
    // http get request  to http://localhost:4000/videos/id for deleting a task from json server and return response
    return await commonAPI('PATCH',`${base_URL}/maintask/${id}`, updatedTaskData)
}