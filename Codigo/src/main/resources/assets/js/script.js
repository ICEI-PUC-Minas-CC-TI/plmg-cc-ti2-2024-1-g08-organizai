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
const userIdEditInput = document.getElementById('userIdEditInput');
const titleEditInput = document.getElementById('titleEditInput');
const descriptionEditInput = document.getElementById('descriptionEditInput');
const dateEditInput = document.getElementById('dateEditInput');
const priorityEditInput = document.getElementById('priorityEditInput');
const statusEditInput = document.getElementById('statusEditInput');
const lateEditInput = document.getElementById('lateEditInput');
const deleteId = document.getElementById('inputDeleteId');
const fileInput = document.getElementById('fileInput');
const btnGenerateTask = document.getElementById('btnGenerateTask');
const btnLogout = document.getElementById('btnLogout');

function createTask(task) {
  fetch('http://localhost:4567/tarefas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }) 
    .then(() => carregaCalendario())
    .catch((error) => {
      console.error('Error:', error);
      carregaCalendario();
    });
}

function updateTask(task) {
  fetch('http://localhost:4567/tarefas/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task)
  })
    .then(() => carregaCalendario(undefined, false))
    .catch((error) => {
      console.error('Error:', error);
    });
}

function deleteTask(id) {
  fetch(`http://localhost:4567/tarefas/delete/${id}`)
    .then(() => carregaCalendario(undefined, false))
    .catch((error) => {
      console.error('Error:', error);
    });
}

function updateStatus(taskId, updatedStatus) {
  let task;

  fetch(`http://localhost:4567/tarefas/${taskId}`)
    .then(response => response.json())
    .then(data => {
      task = data;
      task.status = updatedStatus;
      updateTask(task);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function generateTask() {
  toggleLoadingModalAddTask();
  let file = fileInput.files[0];
  let formData = new FormData();
  formData.append('file', file, file.name);

  var reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = function (event) {
    fetch(`http://localhost:4567/gerarTarefa`, {
      method: 'POST',
      body: event.target.result,
    })
      .then(response => response.json())
      .then(data => {
        showSuggestion(data);
        toggleLoadingModalAddTask();
      })
      .catch((error) => {
        console.error('Error:', error);
        toggleLoadingModalAddTask();
      });
  }
}

function showSuggestion(data) {
  titleInput.value = data.title;
  descriptionInput.value = data.description;
  dateInput.value = data.deadline;
}

function toggleLoadingModalAddTask() {
  if (formAddTask.style.display === 'none') {
    formAddTask.style.display = 'block';
    btnGenerateTask.disabled = false;
    document.getElementById('loadingFormAddTask').style.display = 'none';
  } else {
    formAddTask.style.display = 'none';
    btnGenerateTask.disabled = true;
    document.getElementById('loadingFormAddTask').style.display = 'block';
  }
}

btnLogout.addEventListener('click', () => {
  fetch('http://localhost:4567/logout', {
    method: 'GET',
  })
    .catch((error) => {
      console.error('Error:', error);
    });
});

dateInput.addEventListener('input', () => {
  checkIfDateIsPast();
});
 
$('#modalAddTask').on('shown.bs.modal', () => {
  checkIfDateIsPast();
});

function checkIfDateIsPast() {
  if (dateInput.value !== '') {
    const selectedDate = new Date(dateInput.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      document.querySelector('.past-date-feedback').style.display = 'block';
    } else {
      document.querySelector('.past-date-feedback').style.display = 'none';
    }
  }
}

if(fileInput) {
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      btnGenerateTask.disabled = false;
    } else {
      btnGenerateTask.disabled = true;
    }
  }); 
}

function toggleLoadingTasks() {
  var firstLoadingKanban = $(".loadingTasks").first();
  if (firstLoadingKanban.css("display") !== "none") {
    $(".loadingTasks").css("display", "none");
  } else {
    $(".loadingTasks").css("display", "flex");
  }
}

function toggleLoadingTasksInTable() {
  if ($("#loadingTasksTable").css("display") !== "none") {
    $("#loadingTasksTable").css("display", "none");
  } else {
    $("#loadingTasksTable").css("display", "flex");
  }
}

function formatDate(dateValue) {
  let date = new Date(dateValue);
  let month, day, hours, minutes, seconds;

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

  if (date.getHours() < 10) {
    hours = `0${date.getHours()}`;
  } else {
    hours = `${date.getHours()}`;
  }

  if (date.getMinutes() < 10) {
    minutes = `0${date.getMinutes()}`;
  } else {
    minutes = `${date.getMinutes()}`;
  }

  if (date.getSeconds() < 10) {
    seconds = `0${date.getSeconds()}`;
  } else {
    seconds = `${date.getSeconds()}`;
  }

  return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
}

function showReminderModal(){
  $('#modalReminderTab').modal('show');
  fetch('http://localhost:4567/lembretes')
  .then(dados => dados.json())
  .then(dados =>{
    const body = document.getElementById('modal-reminders');
    body.innerHTML = ""
    dados.forEach(element => {
      body.innerHTML +=
      `<li class="reminder-tab">${element.conteudo}</li>`
    });
  })
}

function formatPriority(priority) {
  if (priority == 'Alta') return 'ALTA';
  else if (priority == 'Média') return 'MÉDIA';
  else if (priority == 'Baixa') return 'BAIXA';
}

function addButtonListener(btn, status) {
  status === "Em Progresso" && btn.addEventListener("click", () => {
    const taskContainer = btn.closest('.task');
    let elementoIrmaoAnterior = btn.previousElementSibling;
    while (elementoIrmaoAnterior && !elementoIrmaoAnterior.classList.contains('btn-editar')) {
      elementoIrmaoAnterior = elementoIrmaoAnterior.previousElementSibling;
    }
    let eClick = elementoIrmaoAnterior.onclick.toString().match(/showTask\([^)]*\)/)[0];
    let taskArray = eClick.split(',');
    taskArray[taskArray.length - 2] = ` '${status}'`;
    let modifiedOnclick = taskArray.join(',');
    elementoIrmaoAnterior.setAttribute('onclick', modifiedOnclick);
    taskContainer.remove();
    doing.insertBefore(taskContainer, doing.firstChild);
    btn.innerHTML = '<i class="bi bi-check"></i>';
    btn.classList.add("check");
    btn.classList.remove("start");
    const newButton = btn.cloneNode(true);
    btn.parentNode.replaceChild(newButton, btn);
    addCheckButtonListener();
    //chamo funcao do modal de lembretes
    showReminderModal();
  });
  
  
  status === "Concluída" && btn.addEventListener("click", () => {
    const taskContainer = btn.closest('.task');
    const taskId = taskContainer.querySelector('.id').innerText
    const taskBody = taskContainer.querySelector('.task-body');
    taskBody.classList.remove('border-danger-subtle', 'border-warning-subtle', 'border-success-subtle', 'border-start', 'rounded-start-2', 'border-5');
    taskBody.classList.add("border-5", "border-start", "border-success", "rounded-start-2");
    let elementoIrmaoAnterior = btn.previousElementSibling;
    while (elementoIrmaoAnterior && !elementoIrmaoAnterior.classList.contains('btn-editar')) {
      elementoIrmaoAnterior = elementoIrmaoAnterior.previousElementSibling;
    }
    let eClick = elementoIrmaoAnterior.onclick.toString().match(/showTask\([^)]*\)/)[0];
    let taskArray = eClick.split(',');
    taskArray[taskArray.length - 2] = ` '${status}'`;
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

    updateStatus(taskId, status);
    addButtonListener(btn, status);
  });
}

function addStartButtonListener() {
  const btnsStart = document.querySelectorAll(".start");
  btnsStart.forEach((btnStart) => {
    addButtonListener(btnStart, "Em Progresso");
  });
}

function addCheckButtonListener() {
  const btnsCheck = document.querySelectorAll(".check");
  btnsCheck.forEach((btnCheck) => {
    addButtonListener(btnCheck, "Concluída");
  });
}

function cleanKanban() {
  if (todo !== null)
  todo.innerHTML = '';
  if (doing !== null)
  doing.innerHTML = '';
  if (done !== null)
  done.innerHTML = '';
}

function showTaskInKanban(task) {
  const table = document.getElementById('tasksTable');
  let contentTodo = '';
  let contentDoing = '';
  let contentDone = '';

  let priorityClass = '';

  if (task.prioridade === 'Alta') {
    priorityClass = 'border-start rounded-start-2 border-5 border-danger-subtle';
  } else if (task.prioridade === 'Média') {
    priorityClass = 'border-start rounded-start-2 border-5 border-warning-subtle';
  } else if (task.prioridade === 'Baixa') {
    priorityClass = 'border-start rounded-start-2 border-5 border-success-subtle';
  }

  let lateClass = '';

  if (task.atrasada) {
    lateClass = 'text-danger';
  }

  if (task.status == "Pendente") {
    contentTodo = `<div class="card task">
      <div class="card-body task-body ${priorityClass}">
      <button type="button" class="btn btn-sm float-end m-1 rounded-circle" onclick="deleteConfirm(${task.tarefaID})"><i class="bi bi-trash" title="Excluir"></i></button>
      <button type="button" class="btn btn-sm float-end m-1 rounded-circle btn-editar" onclick="showTask(${task.tarefaID}, ${task.usuarioID}, '${task.titulo}', '${task.descricao}','${task.prazo}','${task.prioridade}', '${task.status}', '${task.atrasada}')"><i class="bi bi-pencil" title="Editar"></i></button>
      <span class="id d-none" id="task${task.tarefaID}">${task.tarefaID}</span>
      <h5 class="card-title">${task.titulo}</h5>
        <p class="card-text">${task.descricao}</p>
        <p class="card-text deadline ${lateClass}">Prazo: ${formatDate(task.prazo)}</p>
        <p class="card-text priority">Prioridade: ${formatPriority(task.prioridade)}</p>
        <button type="button" class="btn btn-sm float-end start"><i class="bi bi-play"></i></button>
      </div>
    </div>` + contentTodo;
  }

  if (task.status == "Em Progresso") {
    contentDoing = `<div class="card task">
      <div class="card-body task-body ${priorityClass}">
      <button type="button" class="btn btn-sm float-end m-1 rounded-circle" onclick="deleteConfirm(${task.tarefaID})"><i class="bi bi-trash" title="Excluir"></i></button>
      <button type="button" class="btn btn-sm float-end m-1 rounded-circle btn-editar" onclick="showTask(${task.tarefaID}, ${task.usuarioID}, '${task.titulo}', '${task.descricao}','${task.prazo}','${task.prioridade}', '${task.status}', '${task.atrasada}')"><i class="bi bi-pencil" title="Editar"></i></button>
      <span class="id d-none" id="task${task.tarefaID}">${task.tarefaID}</span>
      <h5 class="card-title">${task.titulo}</h5>
        <p class="card-text">${task.descricao}</p>
        <p class="card-text deadline ${lateClass}">Prazo: ${formatDate(task.prazo)}</p>
        <p class="card-text priority">Prioridade: ${formatPriority(task.prioridade)}</p>
        <button type="button" class="btn btn-sm float-end check"><i class="bi bi-check"></i></button>
      </div>
    </div>` + contentDoing;
  }

  if (task.status == "Concluída") {
    contentDone = `<div class="card task">
        <div class="card-body task-body border-5 border-start border-success rounded-start-2">
          <button type="button" class="btn btn-sm float-end m-1 rounded-circle" onclick="deleteConfirm(${task.tarefaID})"><i class="bi bi-trash" title="Excluir"></i></button>
          <button type="button" class="btn btn-sm float-end m-1 rounded-circle btn-editar" onclick="showTask(${task.tarefaID}, ${task.usuarioID}, '${task.titulo}', '${task.descricao}','${task.prazo}','${task.prioridade}', '${task.status}', '${task.atrasada}')"><i class="bi bi-pencil" title="Editar"></i></button>
          <span class="id d-none" id="task${task.tarefaID}">${task.tarefaID}</span>
          <h5 class="card-title">${task.titulo}</h5>
          <p class="card-text">${task.descricao}</p>
          <p class="card-text deadline">Prazo: ${formatDate(task.prazo)}</p>
          <p class="card-text priority">Prioridade: ${formatPriority(task.prioridade)}</p>
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

function showTasks(tarefas) {

  const table = document.getElementById('tasksTable');
  let content = '';

  tarefas.forEach(task => {

    content +=
      `<tr>
        <td>${task.tarefaID}</td> 
        <td>${task.titulo}</td> 
        <td>${task.descricao}</td> 
        <td>${formatDate(task.prazo)}</td> 
        <td>${formatPriority(task.prioridade)}</td> 
        <td>${task.status}</td>
        <td class="text-center"><i class="bi bi-pencil" title="Editar" 
        onclick="showTask(${task.tarefaID}, ${task.usuarioID}, '${task.titulo}', '${task.descricao}','${task.prazo}','${task.prioridade}', '${task.status}', '${task.atrasada}')">
        </i></td> 

        <td class="text-center"><i class="bi bi-trash" title="Excluir"
            onclick="deleteConfirm(${task.tarefaID})"></i>
        </td>  
    </tr>`

  })
  if (table != null)
    table.innerHTML = content
}

function showTasksInTable() {

  fetch('http://localhost:4567/tarefas')
    .then(response => response.json())
    .then(data => {
      toggleLoadingTasksInTable();
      showTasks(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function showTask(id, userid, title, description, start, priority, status, late) {

  idEditInput.value = id
  userIdEditInput.value = userid ?? ' '
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

      let status = statusEditInput.value !== '' ? returnValueById('statusEditInput') : "Pendente";

      let task = {
        titulo: returnValueById('title'),
        descricao: returnValueById('description').replace(/(\r\n|\n|\r)/gm, ""),
        prazo: returnValueById('end-date'),
        prioridade: returnValueById('priority'),
        status: status,
        atrasada: moment(returnValueById('end-date')).isBefore(moment())
      };

      createTask(task);
      
      formAddTask.reset();
      $('#modalAddTask').modal('toggle');

      if (document.getElementById('lista') != null) {
        setTimeout(() => {
          showTasksInTable();
          window.scrollTo(0, document.body.scrollHeight)
        }, 2000)
      }
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

      let id = parseInt(returnValueById('idEditInput'))

      let task = {
        tarefaID: id,
        usuarioID: returnValueById('userIdEditInput'),
        titulo: returnValueById('titleEditInput'),
        descricao: returnValueById('descriptionEditInput').replace(/(\r\n|\n|\r)/gm, ""),
        prazo: returnValueById('dateEditInput'),
        prioridade: returnValueById('priorityEditInput'),
        status: returnValueById('statusEditInput'),
        atrasada: moment(returnValueById('dateEditInput')).isBefore(moment())
      }

      updateTask(task)

      formAddTask.reset()
      $('#modalEditTask').modal('toggle')


      if (document.getElementById('lista') != null) {
        setTimeout(() => {
          showTasksInTable();
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

      setTimeout(() => {
        showTasksInTable();
      }, 2000)
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
          taskArray[taskArray.length - 2] = ` 'Pendente'`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          updateStatus(taskId, "Pendente");
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
          taskArray[taskArray.length - 2] = ` 'Em Progresso'`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          updateStatus(taskId, "Em Progresso");
          //chamo funcao do modal de lembretes
          showReminderModal();
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
          taskArray[taskArray.length - 2] = ` 'Concluída'`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          let prazo = droppedTask.querySelector('.deadline');
          prazo.classList.remove('text-danger');
          updateStatus(taskId, "Concluída");
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
          taskArray[taskArray.length - 2] = ` 'Pendente'`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          updateStatus(taskId, "Pendente");
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
          taskArray[taskArray.length - 2] = ` 'Em Progresso'`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          updateStatus(taskId, "Em Progresso");
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
          taskArray[taskArray.length - 2] = ` 'Concluída'`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          let prazo = droppedTask.querySelector('.deadline');
          prazo.classList.remove('text-danger');
          updateStatus(taskId, "Concluída");
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
          taskArray[taskArray.length - 2] = ` 'Pendente'`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          updateStatus(taskId, "Pendente");
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
          taskArray[taskArray.length - 2] = ` 'Em Progresso'`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          updateStatus(taskId, "Em Progresso");
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
          taskArray[taskArray.length - 2] = ` 'Concluída'`;
          let modifiedOnclick = taskArray.join(',');
          btnEditar.setAttribute('onclick', modifiedOnclick);
          let prazo = droppedTask.querySelector('.deadline');
          prazo.classList.remove('text-danger');
          updateStatus(taskId, "Concluída");
        }
      }
    });
  }
  carregaCalendario(true);
});


function carregaCalendario(loading = false, reloadKanban = true) {
  fetch('http://localhost:4567/tarefas')
  .then(response => response.json())
  .then(data => {
      loading && toggleLoadingTasks();
      const calendar = document.getElementById('calendar');
      if (calendar !== null) {
        $('#calendar').fullCalendar('destroy');
      }
      
      reloadKanban && cleanKanban();
      if (data !== null) {
        reloadKanban && data.forEach(task => {
          showTaskInKanban(task);
        });
      } else {
        $('#modalSemTarefasWarning').modal('show');
      }

      if (calendar === null) {
        return;
      }
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
          events: data?.map(task => ({
            id: task.tarefaID,
            title: task.titulo,
            start: task.prazo,
          })),
          eventDrop: function (evento, delta, revertFunc) {
            let eventoAtualizado;
            data.forEach(task => {
              if (task.tarefaID === evento.id) {
                eventoAtualizado = {
                  tarefaID: task.tarefaID,
                  usuarioID: task.usuarioID,
                  titulo: task.titulo,
                  descricao: task.descricao,
                  prioridade: task.prioridade,
                  status: task.status,
                  atrasada: evento.start.isBefore(moment()),
                  prazo: evento.start.format('YYYY-MM-DD HH:mm')
                };
                $(`#task${task.tarefaID}`).closest('.task').remove();
                showTaskInKanban(eventoAtualizado);
              }
            });

            fetch('http://localhost:4567/tarefas/update', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(eventoAtualizado) // Inclui todas as informações necessárias
            })
              .then(response => response.json()) // Converte a resposta para JSON
              .then(updatedEvent => {

                const index = tarefas.findIndex(tarefa => tarefa.id === updatedEvent.id);
                tarefas[index] = updatedEvent;


                jQuery('#calendar').fullCalendar('refetchEvents');
              })
              .catch(error => {
                console.error('Erro ao atualizar a tarefa:', error);
              });
          },
          eventRender: function (event, element) {
            let eventoAtualizado;
            data.forEach(task => {
              if (task.titulo === event.title) {
                eventoAtualizado = {
                  tarefaID: task.tarefaID,
                  usuarioID: task.usuarioID,
                  titulo: task.titulo,
                  descricao: task.descricao,
                  prioridade: task.prioridade,
                  status: task.status,
                  atrasada: task.atrasada,
                  prazo: task.prazo
                }
              }
            });
            if (event.start && event.start.isBefore(moment())) {

              element.css('background-color', 'red');
              if (eventoAtualizado.atrasada !== true) {
                eventoAtualizado.atrasada = true;

                fetch(`http://localhost:4567/tarefas/update`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(eventoAtualizado), // Inclui todas as informações necessárias
                })
              }
            } else if (eventoAtualizado.atrasada !== false) {
              eventoAtualizado.atrasada = false;


              fetch(`http://localhost:4567/tarefas/update`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventoAtualizado), // Inclui todas as informações necessárias
              })
            }
          },
          dayClick: function (date) {
            formAddTask.reset();
            let formattedDate = date.format('YYYY-MM-DD  HH:mm').replace('  ', 'T');
            document.querySelector("#end-date").value = formattedDate;
            $('#modalAddTask').modal('toggle');
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
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}