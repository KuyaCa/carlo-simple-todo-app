import { ITask } from '@/types/task'
import React from 'react'
import Task from './Task'

interface TodoListProps {
  tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto rounded-md">
      <table className="table">
        <thead>
          <tr className='bg-gray-100'>
            <th className='uppercase'>Task</th>
            <th className='uppercase'>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => <Task key={task.id} task={task} />)}
        </tbody>
      </table>
    </div>
  )
}

export default TodoList