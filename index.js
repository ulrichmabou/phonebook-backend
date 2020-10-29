const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

// Home page
app.get('/', (request, response) => {
    response.send('<h1>Phonebook</>')
})

// Info page
app.get('/info', (request, response) => {
    const numPersons = persons.length
    const requestTime = new Date()
    response.send(`<p>Phonebook has info for ${numPersons} people</p> 
                   </br> 
                   <p>${requestTime}</p>`)
})

// All persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})