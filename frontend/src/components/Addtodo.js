import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Moment from 'react-moment'
import Loader from './Loader'
const Addtodo = () => {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState('')
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const deleteHandler = async (id) => {
    setLoading(true)
    await axios.delete(`/api/deletetask/${id}`)
    setLoading(false)
  }

  const editHandler = async (task, id) => {
    setTask(task)
    setEdit(true)
    setId(id)
  }

  const editTask = async (e) => {
    e.preventDefault()
    setLoading(true)
    await axios.put(`/api/edittask/${id}`, { task }, config)
    setEdit(false)
    setTask('')
    setId('')
    setLoading(false)
  }
  const formHandler = async (e) => {
    setLoading(true)
    await axios.post('/api/addtask', { task }, config)

    setTask('')
    setLoading(false)
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get('/api/tasks')

      setTasks(data)
      setLoading(false)
    }
    fetchTasks()
  }, [loading])

  return (
    <div className='container'>
      <h2 style={{ textAlign: 'center' }}>My Todo Lists</h2>
      <div className='arrange'>
        {edit ? (
          <form onSubmit={editTask}>
            <input
              type='text'
              name='task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            ></input>

            <span>
              <button className='btn' type='submit'>
                Update
              </button>
            </span>

            <span></span>
          </form>
        ) : (
          <form onSubmit={formHandler}>
            <input
              type='text'
              name='task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            ></input>

            <span>
              <button className='btn' type='submit'>
                Add
              </button>
            </span>

            <span></span>
          </form>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div className='task-items' key={task._id}>
                <span className='i'>
                  <Moment format='YY/MM/DD h:mma'>{task.date}</Moment>
                </span>
                <h3 className='ii'>{task.task}</h3>

                <span className='iv'>
                  <button onClick={() => editHandler(task.task, task._id)}>
                    <i className='fas fa-edit'></i>
                  </button>
                </span>
                <span className='iv'>
                  <button onClick={() => deleteHandler(task._id)}>
                    <i className='fas fa-trash'></i>
                  </button>
                </span>
              </div>
            ))
          ) : (
            <h2 style={{ textAlign: 'center', margin: '50px' }}>
              You don't have any tasks yet
            </h2>
          )}
        </div>
      )}
    </div>
  )
}

export default Addtodo
