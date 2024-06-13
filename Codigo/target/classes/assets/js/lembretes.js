//passando os elementos como objetos
const formAddReminder = document.getElementById('formAddReminder')
const formEditReminder = document.getElementById('formEditReminder')

//botoes
const btnCreateReminder = document.getElementById('btnCreateReminder')
const btnEditReminder = document.getElementById('btnEditReminder')
const btnDeleteReminder = document.getElementById('btnDeleteReminder')

//campos form adicionar
const titleInput = document.getElementById('title')
const contentInput = document.getElementById('content')

//campos form editar
const idEditInput = document.getElementById('inputEditId')
const titleEditInput = document.getElementById('inputEditTitle')
const contentEditInput = document.getElementById('inputEditContent')

//campo form deletar
const deleteId = document.getElementById('inputDeleteId')

//botao de logout
const btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click', () => {
    fetch('http://localhost:4567/logout', {
      method: 'GET',
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }); 

function toggleLoadingRemindersInTable() {
    if ($('#loadingRemindersTable').css("display") !== "none") {
        $("#loadingRemindersTable").css("display", "none")
    } else {
        $("#loadingRemindersTable").css("display", "flex")
    }
}

//chamar funcao de criar lembrete ao clicar no botao
btnCreateReminder.addEventListener('click', event => {

    event.preventDefault()

    if (!formAddReminder.checkValidity()) {

        checkInputValid(titleInput)
        checkInputValid(contentInput)

        return
    }

    let reminder = {
        usuarioID: 1,
        nome: returnValeuById('title'),
        conteudo: returnValeuById('content').replace(/(\r\n|\n|\r)/gm,"")
    }

    createReminder(reminder)

    formAddReminder.reset()
    $('#modalAddReminder').modal('toggle')

    //rolar até o fim da página para mostrar o novo lemrete adicionado
    setTimeout(() => { 
        readReminders()
        window.scrollTo(0, document.body.scrollHeight)
    }, 2000)

})

//chamar funcao de atualizar lembrete ao clicar no botao
btnEditReminder.addEventListener("click", (event) => {

    event.preventDefault()

    if (!formEditReminder.checkValidity()) {

        checkInputValid(titleEditInput)
        checkInputValid(contentEditInput)

        return
    }

    let reminder = {
        usuarioID: 1,
        nome: returnValeuById('inputEditTitle'),
        conteudo: returnValeuById('inputEditContent').replace(/(\r\n|\n|\r)/gm,""),
    }

    let id = parseInt(returnValeuById('inputEditId'))

    updateReminder(id, reminder)

    formEditReminder.reset()
    $('#modalEditReminder').modal('toggle')

    //atualizar a tabela da dados
    setTimeout(() => { 
        readReminders()
    }, 2000)

})

//chamar funcao de deletar lembrete ao clicar no botao
btnDeleteReminder.addEventListener('click', () => {

    let id = parseInt(returnValeuById('inputDeleteId'))

    deleteReminder(id)

    $('#modalDeleteReminder').modal('toggle')

    //atualizar a tabela da dados
    setTimeout(() => { 
        readReminders()
    }, 2000)
})

//retornar o valor de um elemento pelo id
const returnValeuById = id => document.getElementById(id).value

//adicionar ou remover classe invalida
function checkInputValid(input) {

    if (input.value == '')
        input.classList.add('is-invalid')
    else
        input.classList.remove('is-invalid')
}

//funcoes para exibir mensagens na tela
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

//funcoes para exibir dados e modais na tela
function showReminders(reminders) {

    const table = document.getElementById('remindersTable');
    let content = '';

    reminders.forEach(reminder => {

    content +=
    `<tr>
        <td>${reminder.nome}</td> 
        <td>${reminder.conteudo}</td> 
        <td class="text-center"><i class="bi bi-pencil" title="Editar" 
            onclick="showReminder(${reminder.lembreteID}, '${reminder.nome}', '${reminder.conteudo}')">
        </i></td> 

        <td class="text-center"><i class="bi bi-trash" title="Excluir"
            onclick="deleteConfirm(${reminder.lembreteID})"></i>
        </td> 
    </tr>`

    })

    table.innerHTML = content
}

function showReminder(id, title, content) {

    inputEditId.value = id
    titleEditInput.value = title
    contentEditInput.value = content
    $('#modalEditReminder').modal('toggle')
}

function deleteConfirm(id) {

    deleteId.value = id;
    $('#modalDeleteReminder').modal('toggle')
}

function createReminder(reminder) {
    fetch('http://localhost:4567/lembretes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reminder)

    })
    .catch(error => {
        console.error(error)
    })
}

function readReminders() {
    fetch('http://localhost:4567/lembretes')
    .then(response => response.json())
    .then(data => {
        toggleLoadingRemindersInTable();
        showReminders(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function readReminder(id) {
    fetch(`http://localhost:4567/lembretes/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {showReminder(data)})
    .catch(error => {
        console.error(error)
    })
}

function updateReminder(id, reminder) {
    reminder = {lembreteID: id, ...reminder};
    
    fetch('http://localhost:4567/lembretes/update', {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reminder) 
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function deleteReminder(id) {
    fetch(`http://localhost:4567/lembretes/delete/${id}`, {
        method: 'GET'
    })
    .catch(error => {
        console.error(error)
    })
}