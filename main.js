'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {document.getElementById('modal')
    .classList.remove('active')
    clearFields()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

// const tempClient = {
//     name: "Red",
//     email: "red@gmail.com",
//     celular: "48999565538",
//     cidade: "Araranguá"
//     }






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
        createClient(client)
        clearFields()
        closeModal()
    }
}


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