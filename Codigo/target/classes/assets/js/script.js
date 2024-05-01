// Declaração das tarefas e lembretes
const tarefas = [
  {
    "id": 1,
    "title": "Reunião com cliente",
    "description": "Discutir os detalhes do novo projeto com cliente",
    "start": "2023-09-06T09:00:00",
    "end": "2023-09-06T11:00:00",
    "priority": "high",
    "status": 2,
    "late": true
  },
  {
    "id": 2,
    "title": "Desenvolvimento de Software",
    "description": "Trabalhar no desenvolvimento de novas funcionalidades.",
    "start": "2023-09-05T09:00:00",
    "end": "2023-09-05T11:00:00",
    "priority": "mid",
    "status": 1,
    "late": true
  },
  {
    "id": 3,
    "title": "Revisão de Código",
    "description": "Revisar o código para garantir qualidade e segurança.",
    "start": "2023-09-12T11:00:00",
    "end": "2023-09-12T13:00:00",
    "priority": "high",
    "status": 0,
    "late": true
  },
  {
    "id": 4,
    "title": "Entrevista de Emprego",
    "description": "Realizar entrevista com candidato para posição de desenvolvedor.",
    "start": "2023-09-15T15:30:00",
    "end": "2023-09-15T17:30:00",
    "priority": "mid",
    "status": 0,
    "late": true
  },
  {
    "id": 5,
    "title": "Treinamento da Equipe",
    "description": "Conduzir treinamento sobre novas tecnologias para a equipe.",
    "start": "2023-09-20T10:00:00",
    "end": "2023-09-20T12:00:00",
    "priority": "low",
    "status": 1,
    "late": true
  },
  {
    "id": 6,
    "title": "Apresentação de Vendas",
    "description": "Preparar e realizar apresentação de vendas para clientes.",
    "start": "2023-09-25T14:30:00",
    "end": "2023-09-25T16:30:00",
    "priority": "high",
    "status": 1,
    "late": true
  },
  {
    "id": 7,
    "title": "Manutenção de Sistemas",
    "description": "Realizar manutenção preventiva nos sistemas da empresa.",
    "start": "2023-09-28T09:00:00",
    "end": "2023-09-28T11:00:00",
    "priority": "mid",
    "status": 0,
    "late": true
  },
  {
    "id": 8,
    "title": "Entrega de Relatório",
    "description": "Finalizar e entregar relatório mensal aos superiores.",
    "start": "2023-10-05T16:00:00",
    "end": "2023-10-05T18:00:00",
    "priority": "low",
    "status": 2,
    "late": true
  },
  {
    "id": 9,
    "title": "Planejamento Estratégico",
    "description": "Participar de reunião para discutir o planejamento estratégico da empresa.",
    "start": "2023-10-08T11:30:00",
    "end": "2023-10-08T13:30:00",
    "priority": "high",
    "status": 0,
    "late": true
  }
];
let proximoIdTarefa = 10;

const todo = document.getElementById('to-do');
const doing = document.getElementById('doing');
const done = document.getElementById('done');
const formAddTask = document.getElementById('formAddTask');
const formEditTask = document.getElementById('formEditTask');
const btnCreateTask = document.getElementById('btnCreateTask');
const btnEditTask = document.getElementById('btnEditTask');
const btnDeleteTask = document.getElementById('btnDeleteTask');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dateInput = document.getElementById('end-date');
const priorityInput = document.getElementById('priority');
const idEditInput = document.getElementById('idEditInput');
const titleEditInput = document.getElementById('titleEditInput');
const descriptionEditInput = document.getElementById('descriptionEditInput');
const dateEditInput = document.getElementById('dateEditInput');
const priorityEditInput = document.getElementById('priorityEditInput');
const statusEditInput = document.getElementById('statusEditInput');
const lateEditInput = document.getElementById('lateEditInput');
const deleteId = document.getElementById('inputDeleteId');

function createTask(task) {
  tarefas.push({"id": proximoIdTarefa, ...task });
  proximoIdTarefa++;
}

function updateTask(id, task) {
  const index = tarefas.findIndex(tarefa => tarefa.id == id);
  tarefas[index] = {id: id, ...task};
}

function deleteTask(id) {
  const index = tarefas.findIndex(tarefa => tarefa.id === id);
  tarefas.splice(index, 1);
}

function updateStatus(taskId, updatedStatus) {
  const index = tarefas.findIndex(tarefa => tarefa.id == taskId);
  tarefas[index].status = updatedStatus;
}

function formatDate(dateValue) {

  let date = new Date(dateValue);
  let month, day; 

  if (date.getMonth() + 1 < 10) {
    month = `0${date.getMonth() + 1}`;
  } else {
    month = `${date.getMonth() + 1}`;
  }
  
  if (date.getDate() < 10) {
    day = `0${date.getDate()}`;
  } else {
    day = `${date.getDate()}`;
  }

  return `${day}/${month}/${date.getFullYear()}`;
}

function formatStatus(status) {
  if (status == 0) return 'To-Do'
  else if (status == 1) return 'Doing'
  else if (status == 2) return 'Done'
}

function formatPriority(priority) {
  if (priority == 'high') return 'ALTA';
  else if (priority == 'mid') return 'MÉDIA';
  else if (priority == 'low') return 'BAIXA';
}

function addButtonListener(btn, status) {
  btn.addEventListener("click", () => {
    const taskContainer = btn.closest('.task');
    const taskId = taskContainer.querySelector('.id').innerText;

    if (status === 1) {
      btn.innerHTML = '<i class="bi bi-check"></i>';
      btn.classList.add("check");
      btn.classList.remove("start");
      let elementoIrmaoAnterior = btn.previousElementSibling;
      while (elementoIrmaoAnterior && !elementoIrmaoAnterior.classList.contains('btn-editar')) {
        elementoIrmaoAnterior = elementoIrmaoAnterior.previousElementSibling;
      }
      let eClick = elementoIrmaoAnterior.onclick.toString().match(/showTask\([^)]*\)/)[0];
      let taskArray = eClick.split(',');
      taskArray[taskArray.length - 2] = ` ${status}`;
      let modifiedOnclick = taskArray.join(',');
      elementoIrmaoAnterior.setAttribute('onclick', modifiedOnclick);
      taskContainer.remove();
      doing.insertBefore(taskContainer, doing.firstChild);
      addCheckButtonListener();
    } else if (status === 2) {
      const taskBody = taskContainer.querySelector('.task-body');
      taskBody.classList.remove('border-danger-subtle', 'border-warning-subtle', 'border-success-subtle', 'border-start', 'rounded-start-2', 'border-5');
      taskBody.classList.add("border-5", "border-start", "border-success", "rounded-start-2");
      let elementoIrmaoAnterior = btn.previousElementSibling;
      while (elementoIrmaoAnterior && !elementoIrmaoAnterior.classList.contains('btn-editar')) {
        elementoIrmaoAnterior = elementoIrmaoAnterior.previousElementSibling;
      }
      let eClick = elementoIrmaoAnterior.onclick.toString().match(/showTask\([^)]*\)/)[0];
      let taskArray = eClick.split(',');
      taskArray[taskArray.length - 2] = ` ${status}`;
      let modifiedOnclick = taskArray.join(',');
      elementoIrmaoAnterior.setAttribute('onclick', modifiedOnclick);
      elementoIrmaoAnterior = btn.previousElementSibling;
      while (elementoIrmaoAnterior && !elementoIrmaoAnterior.classList.contains('deadline')) {
        elementoIrmaoAnterior = elementoIrmaoAnterior.previousElementSibling;
      }
      elementoIrmaoAnterior.classList.remove('text-danger');
      btn.remove();
      taskBody.innerHTML += '<p class="float-end m-0 text-success task-status-completed">Tarefa completa!</p>';
      taskContainer.remove();
      done.insertBefore(taskContainer, done.firstChild);
    }

    updateStatus(taskId, status);
    addButtonListener(btn, status);
  });
}

function addStartButtonListener() {
  const btnsStart = document.querySelectorAll(".start");
  btnsStart.forEach((btnStart) => {
    addButtonListener(btnStart, 1);
  });
}

function addCheckButtonListener() {
  const btnsCheck = document.querySelectorAll(".check");
  btnsCheck.forEach((btnCheck) => {
    addButtonListener(btnCheck, 2);
  });
}

function showTaskInKanban(task) {
  const table = document.getElementById('tasksTable');
  let contentTodo = '';
  let contentDoing = '';
  let contentDone = '';

  let priorityClass = '';

  if (task.priority === 'high') {
    priorityClass = 'border-start rounded-start-2 border-5 border-danger-subtle';
  } else if (task.priority === 'mid') {
    priorityClass = 'border-start rounded-start-2 border-5 border-warning-subtle';
  } else if (task.priority === 'low') {
    priorityClass = 'border-start rounded-start-2 border-5 border-success-subtle';
  }

  let lateClass = '';

  if (task.late) {
    lateClass = 'text-danger';
  }

  if (task.status == 0) {
    contentTodo = `<div class="card task">
      <div class="card-body task-body ${priorityClass}">
      <button type="button" class="btn btn-sm float-end m-1 rounded-circle" onclick="deleteConfirm(${task.id})"><i class="bi bi-trash" title="Excluir"></i></button>
      <button type="button" class="btn btn-sm float-end m-1 rounded-circle btn-editar" onclick="showTask(${task.id}, '${task.title}', '${task.description}','${task.start}','${task.priority}', ${task.status}, '${task.late}')"><i class="bi bi-pencil" title="Editar"></i></button>
      <span class="id d-none" id="task${task.id}">${task.id}</span>
      <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text deadline ${lateClass}">Prazo: ${formatDate(task.start)}</p>
        <p class="card-text priority">Prioridade: ${formatPriority(task.priority)}</p>
        <button type="button" class="btn btn-sm float-end start"><i class="bi bi-play"></i></button>
      </div>
    </div>` + contentTodo;
  }

  if (task.status == 1) {
    contentDoing = `<div class="card task">
      <div class="card-body task-body ${priorityClass}">
      <button type="button" class="btn btn-sm float-end m-1 rounded-circle" onclick="deleteConfirm(${task.id})"><i class="bi bi-trash" title="Excluir"></i></button>
      <button type="button" class="btn btn-sm float-end m-1 rounded-circle btn-editar" onclick="showTask(${task.id}, '${task.title}', '${task.description}','${task.start}','${task.priority}', ${task.status}, '${task.late}')"><i class="bi bi-pencil" title="Editar"></i></button>
      <span class="id d-none" id="task${task.id}">${task.id}</span>
      <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text deadline ${lateClass}">Prazo: ${formatDate(task.start)}</p>
        <p class="card-text priority">Prioridade: ${formatPriority(task.priority)}</p>
        <button type="button" class="btn btn-sm float-end check"><i class="bi bi-check"></i></button>
      </div>
    </div>` + contentDoing;
  }

  if (task.status == 2) {
    contentDone = `<div class="card task">
        <div class="card-body task-body border-5 border-start border-success rounded-start-2">
          <button type="button" class="btn btn-sm float-end m-1 rounded-circle" onclick="deleteConfirm(${task.id})"><i class="bi bi-trash" title="Excluir"></i></button>
          <button type="button" class="btn btn-sm float-end m-1 rounded-circle btn-editar" onclick="showTask(${task.id}, '${task.title}', '${task.description}','${task.start}','${task.priority}', ${task.status}, '${task.late}')"><i class="bi bi-pencil" title="Editar"></i></button>
          <span class="id d-none" id="task${task.id}">${task.id}</span>
          <h5 class="card-title">${task.title}</h5>
          <p class="card-text">${task.description}</p>
          <p class="card-text deadline">Prazo: ${formatDate(task.start)}</p>
          <p class="card-text priority">Prioridade: ${formatPriority(task.priority)}</p>
          <p class="float-end m-0 text-success task-status-completed">Tarefa completa!</p>
        </div>
      </div>` + contentDone;
  }

  if (todo !== null) {
    todo.innerHTML = contentTodo + todo.innerHTML;
    doing.innerHTML = contentDoing + doing.innerHTML;
    done.innerHTML = contentDone + done.innerHTML;
  }

  addStartButtonListener();
  addCheckButtonListener();
}

function showTasks() {

  const table = document.getElementById('tasksTable');
  let content = '';

  tarefas.forEach(task => {

    content +=
      `<tr>
        <td>${task.id}</td> 
        <td>${task.title}</td> 
        <td>${task.description}</td> 
        <td>${formatDate(task.start)}</td> 
        <td>${formatPriority(task.priority)}</td> 
        <td>${formatStatus(task.status)}</td>
        <td class="text-center"><i class="bi bi-pencil" title="Editar" 
        onclick="showTask(${task.id}, '${task.title}', '${task.description}','${task.start}','${task.priority}', ${task.status}, '${task.late}')">
        </i></td> 

        <td class="text-center"><i class="bi bi-trash" title="Excluir"
            onclick="deleteConfirm(${task.id})"></i>
        </td>  
    </tr>`

  })
  if (table != null)
    table.innerHTML = content
}

function showTask(id, title, description, start, priority, status, late) {

  idEditInput.value = id
  titleEditInput.value = title
  descriptionEditInput.value = description
  dateEditInput.value = start
  priorityEditInput.value = priority
  statusEditInput.value = status
  lateEditInput.value = late

  $('#modalEditTask').modal('toggle')
}

const returnValueById = id => document.getElementById(id).value;

function checkInputValid(input) {
  if (input.value == '')
    input.classList.add('is-invalid')
  else
    input.classList.remove('is-invalid')
}

function displaySuccsMessage(mensagem) {
  msg = document.getElementById('msg');
  msg.innerHTML =
    `<div class="alert alert-success alert-dismissible fade show" role="alert">
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}

function displayErrMessage(mensagem) {
  msg = document.getElementById('msg');
  msg.innerHTML =
    `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}

function deleteConfirm(id) {
  deleteId.value = id;
  $('#modalDeleteTask').modal('toggle')
}

document.addEventListener('DOMContentLoaded', () => {
  let date = new Date();
  let formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  if (dateInput != null) {
    dateInput.value = `${formatedDate}T23:59`
  }

  if (btnCreateTask != null) {
    btnCreateTask.addEventListener('click', event => {
  
      event.preventDefault()
  
      if (!formAddTask.checkValidity()) {
  
        checkInputValid(titleInput);
        checkInputValid(descriptionInput);
        checkInputValid(dateInput);
  
        return;
      }
  
      let status = statusEditInput.value !== '' ? returnValueById('statusEditInput') : 0;
  
      let task = {
        title: returnValueById('title'),
        description: returnValueById('description').replace(/(\r\n|\n|\r)/gm, ""),
        start: returnValueById('end-date'),
        priority: returnValueById('priority'),
        status: status,
        late: moment(returnValueById('end-date')).isBefore(moment())
      };
  
      createTask(task);
      task.id = proximoIdTarefa - 1;
  
      formAddTask.reset();
      $('#modalAddTask').modal('toggle');
  
  
      if (document.getElementById('lista') != null) {
        setTimeout(() => {
          showTasks();
          window.scrollTo(0, document.body.scrollHeight)
        }, 2000)
      }

      showTaskInKanban(task);
    })
  }

  if (btnEditTask != null) {
    btnEditTask.addEventListener('click', event => {
  
      event.preventDefault()
  
      if (!formEditTask.checkValidity()) {
  
        checkInputValid(titleEditInput);
        checkInputValid(descriptionEditInput);
        checkInputValid(dateEditInput);
  
        return;
      }
  
      let task = {
        title: returnValueById('titleEditInput'),
        description: returnValueById('descriptionEditInput').replace(/(\r\n|\n|\r)/gm, ""),
        start: returnValueById('dateEditInput'),
        priority: returnValueById('priorityEditInput'),
        status: returnValueById('statusEditInput'),
        late: moment(returnValueById('dateEditInput')).isBefore(moment())
      }
  
      let id = parseInt(returnValueById('idEditInput'))
  
      updateTask(id, task)
  
      formAddTask.reset()
      $('#modalEditTask').modal('toggle')
  
  
      if (document.getElementById('lista') != null) {
        setTimeout(() => {
          showTasks();
        }, 2000)
      }
  
      if (document.getElementById('kanban') != null) {
        $(`#task${id}`).closest('.task').remove();
        task.id = id;
        showTaskInKanban(task);
      }
  
    })
  }

  if (btnDeleteTask != null) {
    btnDeleteTask.addEventListener('click', () => {
  
      let id = parseInt(returnValueById('inputDeleteId'))
  
      deleteTask(id)
  
      $(`#task${id}`).closest('.task').remove();
  
      $('#modalDeleteTask').modal('toggle')

      showTasks();
    })
  }

  if (document.querySelector('.linha-kanban') !== null) {
    new Sortable(document.querySelector('.linha-kanban'), {
      animation: 250,
      draggable: '.coluna-kanban',
      delayOnTouchOnly: true,
      handle: '.colummn-header'
    })
  }
  
  if (todo !== null) {
    new Sortable(todo, {
      group: 'shared',
      animation: 300,
      delayOnTouchOnly: true,
      delay: 100,
      dragClass: "sortable-drag",
      ghostClass: "sortable-ghost",
      onStart: function (evt) {
        const draggedTask = evt.item;
        const btnStart = draggedTask.querySelector('.start');
        btnStart.remove();
      },
      onEnd: function (evt) {
        if (evt.to === todo) {
          const droppedTask = evt.item;
          const taskId = droppedTask.querySelector('.id').innerText;
          const taskBody = droppedTask.querySelector('.task-body');
          taskBody.innerHTML += `<button type="button" class="btn btn-light btn-sm float-end start"><i class="bi bi-play"></i></button>`;
          addStartButtonListener();
          let btnEditar = droppedTask.querySelector('.btn-editar');
          let eClick = btnEditar.onclick.toString().match(/showTask\([^)]*\)/)[0];
          let taskArray = eClick.split(',');
          taskArray[taskArray.length - 2] = ` 0`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          updateStatus(taskId, 0);
        }
        if (evt.to === doing) {
          const droppedTask = evt.item;
          const taskId = droppedTask.querySelector('.id').innerText;
          const taskBody = droppedTask.querySelector('.task-body');
          taskBody.innerHTML += `<button type="button" class="btn btn-light btn-sm float-end check"><i class="bi bi-check"></i></button>`;
          addCheckButtonListener();
          let btnEditar = droppedTask.querySelector('.btn-editar');
          let eClick = btnEditar.onclick.toString().match(/showTask\([^)]*\)/)[0];
          let taskArray = eClick.split(',');
          taskArray[taskArray.length - 2] = ` 1`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          updateStatus(taskId, 1);
        }
        if (evt.to === done) {
          const droppedTask = evt.item;
          const taskId = droppedTask.querySelector('.id').innerText;
          const taskBody = droppedTask.querySelector('.task-body');
          taskBody.classList.remove('border-danger-subtle', 'border-warning-subtle', 'border-success-subtle', 'border-start', 'rounded-start-2', 'border-5');
          taskBody.classList.add("border-5", "border-start", "border-success", "rounded-start-2");
          taskBody.innerHTML += `<p class="float-end m-0 text-success task-status-completed">Tarefa completa!</p>`;
          let btnEditar = droppedTask.querySelector('.btn-editar');
          let eClick = btnEditar.onclick.toString().match(/showTask\([^)]*\)/)[0];
          let taskArray = eClick.split(',');
          taskArray[taskArray.length - 2] = ` 2`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          let prazo = droppedTask.querySelector('.deadline');
          prazo.classList.remove('text-danger');
          updateStatus(taskId, 2);
        }
      }
    });
  }
  
  if (doing !== null) {
    new Sortable(doing, {
      group: 'shared',
      animation: 300,
      delayOnTouchOnly: true,
      delay: 100,
      dragClass: "sortable-drag",
      ghostClass: "sortable-ghost",
      onStart: function (evt) {
        const draggedTask = evt.item;
        const btnCheck = draggedTask.querySelector('.check');
        btnCheck.remove();
      },
      onEnd: function (evt) {
        if (evt.to === todo) {
          const droppedTask = evt.item;
          const taskId = droppedTask.querySelector('.id').innerText;
          const taskBody = droppedTask.querySelector('.task-body');
          taskBody.innerHTML += `<button type="button" class="btn btn-light btn-sm float-end start"><i class="bi bi-play"></i></button>`;
          addStartButtonListener();
          let btnEditar = droppedTask.querySelector('.btn-editar');
          let eClick = btnEditar.onclick.toString().match(/showTask\([^)]*\)/)[0];
          let taskArray = eClick.split(',');
          taskArray[taskArray.length - 2] = ` 0`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          updateStatus(taskId, 0);
        }
        if (evt.to === doing) {
          const droppedTask = evt.item;
          const taskId = droppedTask.querySelector('.id').innerText;
          const taskBody = droppedTask.querySelector('.task-body');
          taskBody.innerHTML += `<button type="button" class="btn btn-light btn-sm float-end check"><i class="bi bi-check"></i></button>`;
          addCheckButtonListener();
          let btnEditar = droppedTask.querySelector('.btn-editar');
          let eClick = btnEditar.onclick.toString().match(/showTask\([^)]*\)/)[0];
          let taskArray = eClick.split(',');
          taskArray[taskArray.length - 2] = ` 1`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          updateStatus(taskId, 1);
        }
        if (evt.to === done) {
          const droppedTask = evt.item;
          const taskId = droppedTask.querySelector('.id').innerText;
          const taskBody = droppedTask.querySelector('.task-body');
          taskBody.classList.remove('border-danger-subtle', 'border-warning-subtle', 'border-success-subtle', 'border-start', 'rounded-start-2', 'border-5');
          taskBody.classList.add("border-5", "border-start", "border-success", "rounded-start-2");
          taskBody.innerHTML += `<p class="float-end m-0 text-success task-status-completed">Tarefa completa!</p>`;
          let btnEditar = droppedTask.querySelector('.btn-editar');
          let eClick = btnEditar.onclick.toString().match(/showTask\([^)]*\)/)[0];
          let taskArray = eClick.split(',');
          taskArray[taskArray.length - 2] = ` 2`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          let prazo = droppedTask.querySelector('.deadline');
          prazo.classList.remove('text-danger');
          updateStatus(taskId, 2);
        }
      }
    });
  }
  
  if (done !== null) {
    new Sortable(done, {
      group: 'shared',
      animation: 300,
      delayOnTouchOnly: true,
      delay: 100,
      dragClass: "sortable-drag",
      ghostClass: "sortable-ghost",
      onStart: function (evt) {
        const draggedTask = evt.item;
        const textCheck = draggedTask.querySelector('.task-status-completed');
        textCheck.remove();
        const taskBody = draggedTask.querySelector('.task-body');
        taskBody.classList.remove("border-5", "border-start", "border-success", "rounded-start-2");
      },
      onEnd: function (evt) {
        if (evt.to === todo) {
          const droppedTask = evt.item;
          const taskId = droppedTask.querySelector('.id').innerText;
          const taskBody = droppedTask.querySelector('.task-body');
          const priority = droppedTask.querySelector('.priority').innerHTML;
          if (priority === "Prioridade: BAIXA") {
            taskBody.classList.add("border-start", "rounded-start-2", "border-5", "border-success-subtle");
          }
          else if (priority === "Prioridade: MÉDIA") {
            taskBody.classList.add("border-start", "rounded-start-2", "border-5", "border-warning-subtle");
          }
          else if (priority === "Prioridade: ALTA") {
            taskBody.classList.add("border-start", "rounded-start-2", "border-5", "border-danger-subtle");
          }
          taskBody.innerHTML += `<button type="button" class="btn btn-light btn-sm float-end start"><i class="bi bi-play"></i></button>`;
          addStartButtonListener();
          let btnEditar = droppedTask.querySelector('.btn-editar');
          let eClick = btnEditar.onclick.toString().match(/showTask\([^)]*\)/)[0];
          let taskArray = eClick.split(',');
          taskArray[taskArray.length - 2] = ` 0`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          updateStatus(taskId, 0);
        }
        if (evt.to === doing) {
          const droppedTask = evt.item;
          const taskId = droppedTask.querySelector('.id').innerText;
          const taskBody = droppedTask.querySelector('.task-body');
          const priority = droppedTask.querySelector('.priority').innerHTML;
          if (priority === "Prioridade: BAIXA") {
            taskBody.classList.add("border-start", "rounded-start-2", "border-5", "border-success-subtle");
          }
          else if (priority === "Prioridade: MÉDIA") {
            taskBody.classList.add("border-start", "rounded-start-2", "border-5", "border-warning-subtle");
          }
          else if (priority === "Prioridade: ALTA") {
            taskBody.classList.add("border-start", "rounded-start-2", "border-5", "border-danger-subtle");
          }
          taskBody.innerHTML += `<button type="button" class="btn btn-light btn-sm float-end check"><i class="bi bi-check"></i></button>`;
          addCheckButtonListener();
          let btnEditar = droppedTask.querySelector('.btn-editar');
          let eClick = btnEditar.onclick.toString().match(/showTask\([^)]*\)/)[0];
          let taskArray = eClick.split(',');
          taskArray[taskArray.length - 2] = ` 1`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          updateStatus(taskId, 1);
        }
        if (evt.to === done) {
          const droppedTask = evt.item;
          const taskId = droppedTask.querySelector('.id').innerText;
          const taskBody = droppedTask.querySelector('.task-body');
          taskBody.classList.remove('border-danger-subtle', 'border-warning-subtle', 'border-success-subtle', 'border-start', 'rounded-start-2', 'border-5');
          taskBody.classList.add("border-5", "border-start", "border-success", "rounded-start-2");
          taskBody.innerHTML += `<p class="float-end m-0 text-success task-status-completed">Tarefa completa!</p>`;
          let btnEditar = droppedTask.querySelector('.btn-editar');
          let eClick = btnEditar.onclick.toString().match(/showTask\([^)]*\)/)[0];
          let taskArray = eClick.split(',');
          taskArray[taskArray.length - 2] = ` 2`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          let prazo = droppedTask.querySelector('.deadline');
          prazo.classList.remove('text-danger');
          updateStatus(taskId, 2);
        }
      }
    });
  }

  tarefas.map((task) => showTaskInKanban(task));

  jQuery(function () {
    jQuery('#calendar').fullCalendar({
  
      businessHours: false,
      defaultView: 'month',
      editable: true,
      height: 600,
      header: {
        left: 'title',
        center: 'month,agendaWeek,agendaDay',
        right: 'prev, today, next'
      },
      events: tarefas, // Utiliza o array de tarefas local como eventos
      eventDrop: function (evento, delta, revertFunc) {
        const index = tarefas.findIndex(tarefa => tarefa.id === evento.id);
        if (index !== -1) {
          tarefas[index].start = evento.start.format(); // Atualiza a data de início da tarefa
          if (evento.end) {
            tarefas[index].end = evento.end.format(); // Atualiza a data de término da tarefa, se existir
          }
        }
  
        const eventoAtualizado = {
          start: evento.start.format(), // Atualiza a data de início da tarefa
          end: evento.end ? evento.end.format() : null // Atualiza a data de término da tarefa, se existir
        };
  
        // Simulação de requisição para atualizar evento
        // Aqui você pode colocar sua lógica para atualizar o evento no servidor
        // Esta parte está apenas simulando a atualização localmente
        setTimeout(() => {
          console.log("Evento atualizado:", eventoAtualizado);
          // Aqui você pode adicionar sua lógica para enviar os dados atualizados para o servidor
        }, 1000);
      },
      eventRender: function (event, element) {
        if (event.end && event.end.isBefore(moment())) {
          element.css('background-color', 'red');
        }
  
        // Simulação de requisição para atualizar evento
        // Aqui você pode colocar sua lógica para atualizar o evento no servidor
        // Esta parte está apenas simulando a atualização localmente
        setTimeout(() => {
          if (event.late !== true) {
            const eventoAtualizado = {
              late: true
            };
            console.log("Evento atualizado:", eventoAtualizado);
            // Aqui você pode adicionar sua lógica para enviar os dados atualizados para o servidor
          }
        }, 1000);
      },
      dayClick: function(date) {
        // Aqui você pode adicionar a lógica para lidar com o clique em um dia
      },
  
      locale: 'pt-br', // Define o idioma para português brasileiro
      buttonText: {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
      },
      monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      monthNamesShort: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ],
      dayNames: [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
      ],
      dayNamesShort: [
        'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'
      ]
    });
  });
});