"use client";

import { ITask } from '@/types/task'
import React, { FormEventHandler, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { BiTrashAlt } from 'react-icons/bi';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';


interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {

    const router = useRouter();

    const [ openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [ openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [ tasktToEdit, setTaskToEdit] = useState<string>(task.text);

    const handleSubmitEditTodo : FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
          id: task.id,
          text: tasktToEdit,
        });
        setOpenModalEdit(false);
        router.refresh();
    };

    const handeDeleteTask = async (id: string) => {
        await deleteTodo(id);
        setOpenModalDeleted(false);
        router.refresh();
    }

  return (
    <tr key={task.id}>
        <td>{task.text}</td>
        <td className='cursor-pointer flex gap-5'>
            {/* Editing Task */}
            <AiOutlineEdit onClick={() => setOpenModalEdit(true) } className='text-yellow-600 hover:text-yellow-500' size={16} />
                <Modal 
                    modalOpen={openModalEdit} 
                    setModalOpen={(newState) => {
                        setOpenModalEdit(newState); 
                        return newState;
                    }}
                >
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className='font-bold text-lg'>Edi task</h3>
                        <div className='modal-action'>
                        <input
                            value={tasktToEdit}
                            onChange={e => setTaskToEdit(e.target.value)}
                            type="text" 
                            placeholder="Type here" 
                            className="input input-bordered w-full" 
                        />
                        <button type='submit' className='btn bg-yellow-500 text-white'>Update</button>
                        </div>
                    </form>
                </Modal>

            {/*  Deleting Task */}
            <BiTrashAlt onClick={() => setOpenModalDeleted(true) }className='text-red-800 hover:text-red-600' size={16} />
                <Modal 
                    modalOpen={openModalDeleted} 
                    setModalOpen={(newState) => {
                        setOpenModalDeleted(newState); 
                        return newState;
                    }}
                >
                    <h3 className='text-lg'>Are you sure, you want to delete this task?</h3>
                    <div className='modal-action'>
                        <button onClick={() => handeDeleteTask(task.id)} className='btn'>Yes</button>
                    </div>
                </Modal>
        </td>
    </tr>
  )
}

export default Task

