const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')

const app = express()
const logger = morgan('tiny')

app.use(express.json())
app.use(logger)

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

// Fetch single phonebook entry
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// Delete single phonebook entry
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons= persons.filter(person => person.id !== id)

    response.status(204).end()
})

// Function to generate a random id for new entry
const generateId = () => {
    const id = Math.floor(Math.random() * 100)

    return id
}

// Add new entry
app.post('/api/persons', (request, response) => {
    const body = request.body
    const name = body.name
    const number = body.number

    if (!name && !number) {
        return response.status(400).json({
            error: 'name and number missing'
        })
    } else if (!name) {
        return response.status(400).json({
            error: 'name missing'
        })  
    } else if (!number) {
        return response.status(400).json({
            error: 'number missing'
        })  
    } else if (persons.find(person => person.name === name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })  
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})