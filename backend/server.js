import express from 'express'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'

import connectDB from './config/db.js'
import Task from './models/taskModel.js'
dotenv.config()
connectDB()
const app = express()
app.use(express.json())

app.get(
  '/api/tasks',
  asyncHandler(async (req, res) => {
    const tasks = await Task.find()
    if (tasks) {
      res.json(tasks)
    } else {
      res.status(404)
      throw new Error('No any todos yet.')
    }
  })
)

app.post(
  '/api/addtask',
  asyncHandler(async (req, res) => {
    console.log('hello')
    console.log(req.body)
    const { task } = req.body

    const task_create=new Task({
      task:task,
      date:Date.now()
    
    })
    const task_created = await task_create.save()
    if (task_created) {
      res.status(201).json({
        _id: task_created._id,
        task: task_created.task,
        date:Date.now()
      })
    } else {
      res.status(400)
      throw new Error('Task not created')
    }
  })
)

app.delete(
  '/api/deletetask/:id',
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (task) {
      console.log(task)
      await task.remove()
      res.status(201).json({ message: 'deleted successfully' })
    } else {
      res.status(400)
      throw new Error('No task found')
    }
  })
)

app.put(
  '/api/edittask/:id',
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (task) {
      console.log(req.body.task)
      task.task = req.body.task
      task.date = Date.now()
      const updatedTask = await task.save()
      res.status(201).json({ task: updatedTask.task })
    } else {
      res.status(400)
      throw new Error('No task found')
    }
  })
)
app.listen(5000, console.log('Server running on port 5000'))
