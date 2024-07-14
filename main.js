'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    name: "Abela",
    email: "abela@gmail.com",
    celular: "48999565538",
    cidade: "Araranguá"
    }




const setLocalStorage = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient))

// CRUD

// UPDATE
const updateClient = (client) => {
    
}

// READ
const readClient = () => JSON.parse(localStorage.getItem("dbClient")) ?? []

// CREATE
const createClient = (client) => {
    const dbClient = readClient()
    dbClient.push(client)
    setLocalStorage(dbClient)
}



// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)
    
document.getElementById('modalCancel')
    .addEventListener('click', closeModal)