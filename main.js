'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const tempClient = {
    name: "Red",
    email: "red@gmail.com",
    celular: "48999565538",
    cidade: "Araranguá"
    }






const setLocalStorage = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient))

// CRUD
// DELETE
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

// UPDATE
const updateClient = (index, client) => {
    const dbClient = readClient()
    // pegar o index para saber qual será editado
    dbClient[index] = client
    setLocalStorage(dbClient)
}

// READ
const readClient = () => JSON.parse(localStorage.getItem("dbClient")) ?? []

// CREATE
const createClient = (client) => {
    const dbClient = readClient()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

// Validação de campos Modal
const isValidFields = () => {
    return document.getElementById('formClient').reportValidity()
}



// Interação com Layout/usuário
// Botão Salvar
const saveClient = () => {
    // Verificar se os campos preenchidos são validos
    if (isValidFields()){
        const client = {
            name: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if(index == 'new'){
        createClient(client)
        closeModal()
        upDataTable()
        }else{
            updateClient(index, client)
            upDataTable()
            closeModal()
        }
    }
}


// Trazer os dados do LocalStorage

const createRow =(client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.name}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green" id='edit-${index}'>editar</button>
        <button type="button" class="button red" id='delete-${index}'>excluir</button>
    </td>
    `
    document.querySelector('#tbClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tbClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const upDataTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

// Botão Editar/Excluir
const fillFields = (client) => {
    document.getElementById('nome').value = client.name
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (e) => {
    if(e.target.type == 'button'){
        const [action, index] = e.target.id.split('-')
        if(action == 'edit'){
        editClient(index)
        }else{
        const client = readClient()[index]
        const response = confirm(`Deseja Excluir o cliente ${client.nome}?`)
        if(response){
            deleteClient(index)
            upDataTable()
        }
        }
    }
}

upDataTable()

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)
    
document.getElementById('cancelar')
    .addEventListener('click', closeModal)

// Botão Salvar
document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tbClient>tbody')
    .addEventListener('click', editDelete)




