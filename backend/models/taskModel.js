import mongoose from 'mongoose'
const taskSchema=mongoose.Schema(
    {
        task:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now()
        },
        finished:{
            type:Boolean,
            default:false
        }
    }
)

const Task=mongoose.model('Task',taskSchema)
export default Task