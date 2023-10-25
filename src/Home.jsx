import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap'
import { deleteATask, editATask, getAllTask, uploadTask } from './Servicez/allAPI';

function Home() {
    const [show, setShow] = useState(false);
    const [addtask,setAddtask] = useState({
        taskname:'',
        stat: false
    })
    const [allTask,setAllTask] = useState([])
    const [editedTask, setEditedTask] = useState({
        id: null,
        taskname: ''
    });

    useEffect(()=>{
        getAllUploadedTask()
      },[])

    const handleClose = () => setShow(false);
    const handleShow = (task) => {
        setEditedTask({
            id: task.id,
            taskname: task.taskname
        });
        setShow(true);
    }

    const handleUpload = async ()=>{

        const {taskname,stat} = addtask
        if (!taskname){
            console.log(addtask);
            alert("Add a task....")
        }
        else{
            try {
                    const response = await uploadTask(addtask)
                    if(response.status>=200 && response.status <300){
                        // reset state
                            setAddtask({
                                taskname:''
                            })
                            alert('Task Added')
                            getAllUploadedTask();
                    }
                    else{
                        alert('Uploading error!!!')
                    }
                }
            catch (error) {
                console.error('Error Adding task:', error);
                alert('Adding error!!!');
            }
        }      
    }
    const getAllUploadedTask = async ()=>{
        const {data} = await getAllTask()
        setAllTask(data)
      }

      

    // deleting a task
    const deleteTask =  async (id)=>{
        // make api call
        const response = await deleteATask(id)
        getAllUploadedTask();
    }

    // editing a task
    const editTheTask = async ()=>{
        try {
            if (editedTask) {
                // Make a PATCH request to update the task's taskname
                const response = await editATask(editedTask.id, { taskname: editedTask.taskname });
                if (response.status >= 200 && response.status < 300) {
                    alert('Task Updated');
                    setEditedTask(null); // Clear the editing task
                    setShow(false); // Close the modal
                    getAllUploadedTask(); // Refresh the task list
                } else {
                    alert('Editing error!!!');
                }
            }
        } catch (error) {
            console.error('Error editing task:', error);
            alert('Editing error!!!');
        }
        
    }

    // status editing
    const handleStatus = async(id, currentStatus)=>{
        try {
            const response = await editATask(id, { stat: !currentStatus });
            if (response.status >= 200 && response.status < 300) {
                getAllUploadedTask();
            } else {
                alert('Status error!!!');
            }
        } catch (error) {
            console.error('Error editing task:', error);
            alert('Status error!!!');
        }
    }

  return (
    <div className='container text-center bg-dark text-primary p-3'>
        <h1 className='m-3 fw-bold'>TO DO LIST</h1>
        <div className='d-flex m-3'>
            <Form.Control className='bg-white rounded' type="text" placeholder='Enter the todo task' value={addtask.taskname} onChange={(e) => setAddtask({...addtask, taskname: e.target.value})}
            />
            <button type="button" className="btn btn-primary" fdprocessedid="b6e74f" onClick={handleUpload}>ADD TASK</button>
        </div>

        <table className='table  rounded text-center fw-bolder fs-3 table-info'>
            <thead>
            <tr>
                <th >Task Status</th>
                <th >Task Name</th>
                <th>Edit/Delete</th>
            </tr>
            </thead>
            <tbody className='fs-4'>
                {
                    allTask.length>0?
                        allTask.map((task) =>(
                            <tr className={task?.stat ? 'table-success' : 'table-warning'} key={task.id} >
                                <td style={{textDecoration: task?.stat? 'line-through':'none'}}> <Form.Check  onChange={() => handleStatus(task?.id, task?.stat)}/> </td>
                                <td style={{textDecoration: task?.stat? 'line-through':'none'}}>{task?.taskname}</td>
                                <td style={{textDecoration: task?.stat? 'line-through':'none'}}>
                                    <button type='button' className="btn btn-warning me-3" onClick={() => handleShow(task)}><i class="fa-solid fa-pen-to-square"></i></button>
                                    <button type='button' className="btn btn-danger" onClick={()=>deleteTask(task?.id)}><i class="fa-solid fa-trash"></i></button>
                                </td>
                                
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Form.Control className='bg-white' type="text" value={editedTask ? editedTask.taskname : ''} placeholder='Edit the todo task' onChange={(e) => setEditedTask({ ...editedTask, taskname: e.target.value })}/>
                                        <button type="button" className="btn btn-primary"  
                                        fdprocessedid="b6e74f" onClick={()=>editTheTask()}>EDIT TASK</button>
                                    </Modal.Header>
                                </Modal>
                            </tr>
                        ))
                    :<p className='fw-bolder fs-5 text-danger mt-3'>Sorry Nothing to display!!!</p>                   
                }
            </tbody>
        </table>
    </div>
  )
}

export default Home