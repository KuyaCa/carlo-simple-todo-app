"use client";
import React, { FormEventHandler, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import Modal from './Modal';
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {

  const router = useRouter();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    })
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div className='text-end'>
        <button 
            onClick={() => setModalOpen(true)} 
            className='btn btn-md mx-auto text-white text-md bg-[#0369a1] capitalize hover:bg-[#0473af]'
          >
            Add new task
            <FaPlus size={14} />
        </button>

        <Modal 
          modalOpen={modalOpen} 
          setModalOpen={(newState) => {
            setModalOpen(newState); 
            return newState;
        }}
        >
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className='font-bold text-lg text-start text-[#ff9966]'>Add new task</h3>
            <div className='modal-action'>
              <input
                value={newTaskValue}
                onChange={e => setNewTaskValue(e.target.value)}
                type="text" 
                placeholder="Type here" 
                className="input input-bordered w-full focus:outline-none focus:border-[#0473af] focus:ring-2" 
              />
              <button type='submit' className='btn  bg-[#0369a1] capitalize hover:bg-[#0473af] text-white'>Submit</button>
            </div>
          </form>
        </Modal>
    </div>
  )
}

export default AddTask
