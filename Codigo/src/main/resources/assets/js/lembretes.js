const lembretes = [
    {
      "title": "Lembrete 1",
      "content": "Desligar o celular antes de começar",
      "id": 1
    },
    {
      "title": "Lembrete 2",
      "content": "Pegar uma garrafa de água",
      "id": 2
    },
    {
      "id": 3,
      "title": "Corrigir trabalhos",
      "content": "Corrigir trabalhos."
    }
];
let proximoIdLembrete = 4;

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

//chamar funcao de criar lembrete ao clicar no botao
btnCreateReminder.addEventListener('click', event => {

    event.preventDefault()

    if (!formAddReminder.checkValidity()) {

        checkInputValid(titleInput)
        checkInputValid(contentInput)

        return
    }

    let reminder = {
        title: returnValeuById('title'),
        content: returnValeuById('content').replace(/(\r\n|\n|\r)/gm,"")
    }

    createReminder(reminder)

    formAddReminder.reset()
    $('#modalAddReminder').modal('toggle')

    //rolar até o fim da página para mostrar o novo lemrete adicionado
    setTimeout(() => { 
        showReminders()
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
        title: returnValeuById('inputEditTitle'),
        content: returnValeuById('inputEditContent').replace(/(\r\n|\n|\r)/gm,""),
    }

    let id = parseInt(returnValeuById('inputEditId'))

    updateReminder(id, reminder)

    formEditReminder.reset()
    $('#modalEditReminder').modal('toggle')

    //atualizar a tabela da dados
    setTimeout(() => { 
        showReminders()
    }, 2000)

})

//chamar funcao de deletar lembrete ao clicar no botao
btnDeleteReminder.addEventListener('click', () => {

    let id = parseInt(returnValeuById('inputDeleteId'))

    deleteReminder(id)

    $('#modalDeleteReminder').modal('toggle')

    //atualizar a tabela da dados
    setTimeout(() => { 
        showReminders()
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
function showReminders() {

    const table = document.getElementById('remindersTable');
    let content = '';

    lembretes.forEach(lembrete => {

    content +=
    `<tr>
        <td>${lembrete.title}</td> 
        <td>${lembrete.content}</td> 
        <td class="text-center"><i class="bi bi-pencil" title="Editar" 
            onclick="showReminder(${lembrete.id}, '${lembrete.title}', '${lembrete.content}')">
        </i></td> 

        <td class="text-center"><i class="bi bi-trash" title="Excluir"
            onclick="deleteConfirm(${lembrete.id})"></i>
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
    lembretes.push({"id": proximoIdLembrete, ...reminder });
    proximoIdLembrete++;
}

function updateReminder(id, reminder) {
    const index = lembretes.findIndex(lembrete => lembrete.id == id);
    lembretes[index] = {id: id, ...reminder};
}

function deleteReminder(id) {
    const index = lembretes.findIndex(lembrete => lembrete.id === id);
    lembretes.splice(index, 1);
}
