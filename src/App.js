import {useEffect, useState} from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import './App.css';

function App() {
  const[isComplete,setIsComplete]=useState(false)
  const [todos,setTodos]=useState([]);
  const [newtitle,setNewTitle]=useState('');
  const [newdescription,setDescription]=useState('');
  const [completedTodos,setCompletedTodos]=useState([])

const handleTodo= ()=>{
  let newTodo ={
    title:newtitle,
    description:newdescription
  }
  let updateToDo =[...todos];
  updateToDo.push(newTodo);
  setTodos(updateToDo);
  localStorage.setItem('todo',JSON.stringify(updateToDo))
}

const handleDelete= index=>{
let reducedToDo =[...todos]
reducedToDo.splice(index);

localStorage.setItem('todo',JSON.stringify(reducedToDo))
setTodos(reducedToDo)
}

// complete
const handleComplete =(index)=>{
  let now = new Date();
  let dd =now.getDate();
  let mm =now.getMonth()+1;
  let yyy= now.getFullYear();
  let h = now.getHours();
  let m= now.getMinutes();

  let complete = dd + '-'+mm+ '-' +yyy + ' at ' + h + ':' + m ;
let filterd ={
 ...todos[index],
  complete:complete
}
let updated=[...completedTodos];
updated.push(filterd)
setCompletedTodos(updated)
localStorage.setItem('completedTodos',JSON.stringify(updated))

handleDelete(index)
}
// deleteComplete
const handleDeleteComplete =(index)=>{
  let reducedToDo =[...completedTodos]
reducedToDo.splice(index);

localStorage.setItem('completedTodos',JSON.stringify(reducedToDo))
setCompletedTodos(reducedToDo)
}

useEffect(()=>{
let savedTodo =JSON.parse(localStorage.getItem('todo'));
let savedCompleted =JSON.parse(localStorage.getItem('completedTodos'));

if(savedTodo){
  setTodos(savedTodo)
}
if(savedCompleted){
  setCompletedTodos(savedCompleted)
}
},[])
  return (
    <div className="App">
      <h1>My <span>ToDo</span></h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
        <div className='todo-input-item'>
        <label>Title</label>
        <input type='text'value={newtitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='What’s the task title?' />
        </div>
        <div className='todo-input-item'>
        <label>Description</label>
        <input type='text'value={newdescription} onChange={(e)=>setDescription(e.target.value)} placeholder='Describe Your Task...' />
        </div>
        <div className='todo-input-item'>
        <button type='button'onClick={handleTodo} className='primaryBtn' >Add</button>
        </div>
        </div>
        <div className='btn-area'>
        <button className={`true ${isComplete===false && 'active'}`} onClick={()=>setIsComplete(false)}>ToDo</button>
        <button className={`true ${isComplete===true && 'active'}`} onClick={()=>setIsComplete(true)}>Completed</button>
        </div>


        <div className='todo-list'>
         {isComplete===false && todos.map((item,index)=>{
          return<>
            <div className='todo-list-item' key={index}>
         <div>
         <h3>{item.title}</h3>
         <p>{item.description}</p>
         </div>
          <div className='icons'>
            <FaCheck className='check-icon' title='Done?' onClick={()=>handleComplete(index)}/>
            <MdDeleteOutline className='icon' title='Delete?' onClick={()=>handleDelete(index)}/>
          </div>
          </div>
          </>
         })}
          {isComplete===true && completedTodos.map((item,index)=>{
          return<>
            <div className='todo-list-item' key={index}>
         <div>
         <h3>{item.title}</h3>
         <p>{item.description}</p>
         <p><small>Completed On: {item.complete}</small></p>
         </div>
          <div className='icons'>
          
            <MdDeleteOutline className='icon' title='Delete?' onClick={()=>handleDeleteComplete(index)}/>
          </div>
          </div>
          </>
         })}
       
        </div>
      </div>
    </div>
  );
}

export default App;
