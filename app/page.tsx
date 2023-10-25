import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { LuListTodo } from 'react-icons/lu';
import Image from 'next/image';

export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks);
  return (
    <main className="max-w-4xl mx-auto mt-10">
      <div className="text-center my-5 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-0">
         
          <div className="col-span-2 flex">
            {/* <Image 
              src={`/png/logo-no-background.png`} 
              alt={"logo"} 
              width={240} 
              height={0}
            /> */}
            <LuListTodo size={50}/>
            <h1 className='text-4xl font-sans font-bold text-[#036396] p-l-5'>Todo List</h1>
          </div>

          <div className="...">
            <AddTask />
          </div>
          
        </div>
      </div>
      <TodoList tasks={tasks} />
    </main>
  )
}
