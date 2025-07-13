document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const emptyImage=document.querySelector('.empty-image');
  const todosContainer=document.querySelector('.todos-container');
  const progressbar=document.getElementById('progress');
  const progressNumber=document.getElementById('numbers');
  const toggleEmptyState=()=>{
      emptyImage.style.display=taskList.children.length==0?'block':'none';
      todosContainer.style.width=taskList.children.length>0?'100%' : '50%'  ;
  }
  const updateprogres=(checkcompletion=true)=>{
    const totaltask=taskList.children.length;
    const completedtask=taskList.querySelectorAll('.checkbox:checked').length;
    progressbar.style.width=totaltask? `${(completedtask/totaltask)*100}%`:'0%';
    progressNumber.textContent=`${completedtask}/${totaltask}`;
    if(checkcompletion && totaltask>0&& completedtask===totaltask){
        confetti();
    }
  }
const savetasktolocalstorage = () => {
    
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('.checkbox').checked
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
const loadTaskfromlocalstorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(({text,completed})=>addTask(text,completed,false));
    toggleEmptyState();
    updateprogres();
};
  const addTask = (text,completed=false,checkcompletion=true) => {
    const taskText = text || taskInput.value.trim();
    if (!taskText) {
      return;
    }

    const li = document.createElement('li');
    li.innerHTML=`
    <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}/>
    <span>${taskText}</span> 
    <div class="task-buttons">
         <button class="edit-btn"><i class="fa-solid fa-pen"></i> </button>   
         <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    </div>
    `
    const checkbox=li.querySelector('.checkbox');
    const editbtn=li.querySelector('.edit-btn');


    if(completed){
        li.classList.add('completed');
        editbtn.disabled=true;
        editbtn.style.opacity='0.5';
        editbtn.style.pointerEvents='none';
    }
    checkbox.addEventListener('change',()=>{
        const ischecked=checkbox.checked;
        li.classList.toggle('completed',ischecked);
        editbtn.disabled=ischecked;
        editbtn.style.opacity=ischecked?'o.5':'1';
        editbtn.style.pointerEvents=ischecked?'none':'auto';
        updateprogres();
        savetasktolocalstorage();
    })
    editbtn.addEventListener('click' ,()=>{
      if(!checkbox.checked){
        taskInput.value=li.querySelector('span').textContent;
        li.remove();
        toggleEmptyState();
        updateprogres(false);
        savetasktolocalstorage();
      }

    })

    li.querySelector('.delete-btn').addEventListener('click',()=>{
        li.remove();
        toggleEmptyState();
        updateprogres();
        savetasktolocalstorage();
    })
    taskList.appendChild(li);
    taskInput.value = '';
    toggleEmptyState();
    updateprogres(checkcompletion);
    savetasktolocalstorage();
  };

  addTaskBtn.addEventListener('click', ()=>addTask());
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
      addTask();
    }
  });
  loadTaskfromlocalstorage();
});

const cofetti=()=>{
    const count = 500,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 6.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}