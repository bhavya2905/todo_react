import { useEffect, useState } from 'react';
import './App.css';
import Task from './Task';
import TaskForm from './TaskForm';

function App() {
  const [tasks,setTasks] =useState([]);
  const [lastFlag,setLastFlag] =useState(false);

  useEffect(()=>{
    if(localStorage.getItem('tasks') !== null)
      if(tasks.length===0 && !lastFlag) return;

    localStorage.setItem('tasks',JSON.stringify(tasks));
  },[tasks]);

  useEffect(()=>{
    const tasks= JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks);
  },[]);

  function addTask(name){
    if(name.trim() === '') {alert("Enter the task"); return;}
    setTasks(prev => {
      return [...prev, {name:name,done:false}];
    });
  }

  function removeTask(tId){
    if(tasks.length ===1) {
      setLastFlag(true);
    }
    setTasks(prev=>{
      
      return prev.filter((tobj,id)=> id!==tId);
    })
  }
  function updateTaskDone(tID, newDone){
    setTasks(prev=>{
      const newTasks = [...prev];
      newTasks[tID].done = newDone;
      return newTasks;
    });
  }

  const numComp = tasks?.filter(t => t.done)?.length;
  const numTot= tasks?.length;

  const getMotivation = () => {
    const motivationalQuotes = [
      "🚀 Start where you are. Use what you have. Do what you can. 💪✨",
      "🚀 Believe you can and you're halfway there. -Theodore Roosevelt",
      "🌟 The only way to do great work is to love what you do. -Steve Jobs",
      "🏆 Success is not final, failure is not fatal: It is the courage to continue that counts. -Winston Churchill",
      "⏳ Your time is limited, don't waste it living someone else's life. -Steve Jobs",
      "🌈 The only limit to our realization of tomorrow will be our doubts of today. -Franklin D. Roosevelt",
      "⏰ Don't watch the clock; do what it does. Keep going. -Sam Levenson",
      "🌠 The future belongs to those who believe in the beauty of their dreams. -Eleanor Roosevelt",
      "🌟 Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. -Christian D. Larson",
      "🚀 Success usually comes to those who are too busy to be looking for it. -Henry David Thoreau",
      "🌌 The only person you are destined to become is the person you decide to be. -Ralph Waldo Emerson",
      "🛤️ The road to success and the road to failure are almost exactly the same. -Colin R. Davis",
      "🐢 It does not matter how slowly you go as long as you do not stop. -Confucius",
      "🌈 Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. -Roy T. Bennett",
      "🚀 Success is stumbling from failure to failure with no loss of enthusiasm. -Winston S. Churchill",
      "🚪 The only way to achieve the impossible is to believe it is possible. -Charles Kingsleigh",
      "🌌 You are never too old to set another goal or to dream a new dream. -C.S. Lewis",
      "⚒️ Do not wait to strike till the iron is hot, but make it hot by striking. -William Butler Yeats",
      "🔮 The best way to predict the future is to create it. -Peter Drucker",
      "😎 Your attitude, not your aptitude, will determine your altitude. -Zig Ziglar",
      "🌈 The only limit to our realization of tomorrow will be our doubts of today. -Franklin D. Roosevelt",
    ];
    return motivationalQuotes[numComp % motivationalQuotes.length];
  };

 
 
  function renameTasks(id,newName){
    if(newName.trim() === '') {alert("Enter the task"); return;}

    setTasks(prev=>{
      const newTasks = [...prev];
      newTasks[id].name = newName;
      return newTasks;
    })
  }
  
  return (
    <main>
    <h1>{numComp}/{numTot} Complete</h1>
    <h3>{getMotivation()}</h3>
      {numTot !== 0 && numComp === numTot && <h2>Nice job for today! 😍👌</h2>}
      <TaskForm onAdd={addTask} />
      {
        tasks?.map((task,id)=>(
          <Task {...task} 
          onRename = {newName => renameTasks(id,newName)} 
          onTrash ={()=>removeTask(id)} 
          onToggle={done => updateTaskDone(id,done)} />
        ))
      }
    </main>
  );
}

export default App;
